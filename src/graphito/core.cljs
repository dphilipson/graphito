(ns graphito.core
  (:require [clojure.browser.repl :as repl]
            [graphito.vector :as v]
            [graphito.generate :as gen]
            [graphito.detail :as detail]))

;; (defonce conn
;;   (repl/connect "http://localhost:9000/repl"))

;; Debug

(enable-console-print!)

(defn p [message f & args]
  (let [ret (apply f args)]
    (println message (apply f args))
    ret))

;; External library modules

(def d3 js/d3)
(def rx-observable (.-Observable js/Rx))

;; Constants

(def world-width 1280)
(def world-height 800)

(def graph-force-ticks 100)

(def update-interval-ms 15)

(def transition-duration-ms 500)

(def swipe-damping-factor 0.75)
(def min-slide-speed-sq 16)

; A factor of 1 is an ellipse fitting the bounds of the window. Higher factors
; expand the visualization linearly.
(def displacement-factor 1)

(def max-radius 32)
(def link-width 3)
(def selected-link-width 5)
(def label-font "Verdana")
(def label-font-size 24)
(def hitbox-size 96)

(def deselection-distance 0.4)

(def background-color "#EDF0F2")
(def link-color "#C9CBCB")
(def selected-link-color "#a7b6c2")
(def node-color "#777A7A")
(def node-label-color node-color)
(def selected-node-color "#FE9F51")

(def label-y 42)
(def label-y-transform (str "translate(0," label-y ")"))
(def label-visible-threshold 1.5)

(def zoom-out-scale 0.25)

(def resize-delay-ms 100)

;; DOM setup

(defn disable-touchmove! [container]
  (.on container "touchmove" #(-> d3 .-event .preventDefault)))

(defn add-background! [svg]
  (-> svg
      (.append "rect")
      (.attr "class" "background")
      (.attr "fill" background-color)
      (.attr "stroke" 0)))

(defn setup-svg! [selector]
  (let [container (.select d3 selector)
        svg (-> container
                (.append "svg"))]
    (disable-touchmove! container)
    (add-background! svg)
    svg))

(defn prevent-focus-on-detail-button! [detail-button]
  (.on detail-button "mouseup" #(-> detail-button .node .blur)))

;; Geometry

(defn scroll-scale-for-state [state]
  (if (= :zoom-out (:projection state)) zoom-out-scale 1))

(defn zoom-out->world-pos [state pos]
  (let [{:keys [camera-pos view-size]} state
        view-center (-> view-size v/copy (v/multiply 0.5))
        displacement (-> view-center (v/subtract pos) v/neg)]
    (-> displacement (v/multiply (/ zoom-out-scale)) (v/add camera-pos))))

(defn scaled-distance-from-camera
  "Returns the distance of the given point from the camera, scaled so that
  points which would be at the corner of the screen are at distance 1"
  [state pos]
  (let [{:keys [camera-pos view-size]} state
        corner-distance (/ (v/length view-size) 2)]
    (/ (v/distance camera-pos pos) corner-distance)))

(defn elliptic-distance-from-camera [state pos]
  "An alternate method of computing distance, currently unused."
  (let [{:keys [view-size camera-pos]} state
        rx (/ (v/x view-size) 2)
        ry (/ (v/y view-size) 2)
        sq (fn [x] (* x x))
        displacement (-> pos v/copy (v/subtract camera-pos))
        x (v/x displacement)
        y (v/y displacement)]
    (js/Math.sqrt (+ (/ (sq x) (sq rx)) (/ (sq y) (sq ry))))))

(defn project-displacement [t]
  (cond
    (<= t 0.5) t
    (<= 0.5 t 1) (+ 0.5 (/ (- t 0.5) 2))
    (<= 1 t 1.5) (+ 0.75 (/ (- t 1) 4))
    (<= 1.5 t 2.5) (+ 0.875 (/ (- t 1.5) 8))
    :else 1))

(defn view-position [state pos projector]
  (let [{:keys [view-size camera-pos]} state
        view-center (-> view-size v/copy (v/multiply 0.5))
        corner-distance (v/length view-center)
        displacement (-> pos v/copy (v/subtract camera-pos))
        r (scaled-distance-from-camera state pos)
        projected-r (projector r)]
    (if (= r 0)
      view-center
      (v/add view-center
             (v/multiply displacement (/ projected-r r))))))

(defn project-scale [t]
  (min 1 (/ 1 (.pow js/Math 2 (* 2 (- t 0.25))))))

(defn project-opacity [t]
  (cond
    (<= t 1) 1
    (<= 1 t 2) (- 1 (/ (- t 1) 4))
    (<= 2 t 3) (- 0.75 (* 0.75 (- t 2)))
    :else 0))

(defn project-label-opacity [t]
  (cond
    (<= t 1) 1
    (<= 1 t 1.5) (- 3 (* 2 t))
    :else 0))

(def fisheye-projectors {:project-displacement project-displacement
                         :project-scale project-scale
                         :project-opacity project-opacity
                         :project-label-opacity project-label-opacity})

(def zoom-out-projectors {:project-displacement (partial * zoom-out-scale)
                          :project-scale (constantly zoom-out-scale)
                          :project-opacity (constantly 1)
                          :project-label-opacity (constantly 0)})

(defn projectors-for-state [state]
  (if (= (:projection state) :fisheye) fisheye-projectors zoom-out-projectors))

;; Button syncing

(defn center-detail-button! [detail-button]
  (let [width (-> detail-button .node .-offsetWidth)]
    (.style detail-button "margin-left" (str (/ width -2) "px"))))

(defn sync-detail-button! [state]
  (let [{:keys [detail-button selected-node]} state]
    (.classed detail-button "hidden" (nil? selected-node))
    (when-not (nil? selected-node)
      (.text detail-button (str "View \"" (:title selected-node) "\""))
      (center-detail-button! detail-button))))

;; D3 magic

(defn sync-graph! [state & {:keys [animate?]}]
  (let [{:keys [svg
                detail-button
                nodes
                links
                selected-node
                camera-pos
                view-size
                projection
                animation-subject]} state
        {:keys [project-displacement
                project-scale
                project-opacity
                project-label-opacity]} (projectors-for-state state)
        transition #(-> %
                        .transition
                        (.duration transition-duration-ms))
        maybe-transition (if animate? transition identity)
        positions (mapv (fn [node]
                          (view-position state
                                         (:pos node)
                                         project-displacement)) nodes)
        distances-from-camera
        (mapv (fn [node]
                (scaled-distance-from-camera state (:pos node))) nodes)

        distance-for-node (fn [node] (distances-from-camera (:index node)))]
    (let [link-selection (-> svg (.selectAll ".link") (.data (apply array links)))]
      (-> link-selection .enter
          (.append "line")
          (.attr "class" "link")
          (.style "stroke" link-color)
          (.style "stroke-width" 3))
      (-> link-selection
          (.style "stroke" link-color)
          (.style "stroke-width" link-width)
          (.filter (fn [link] (or (= (:source link) (:index selected-node))
                                  (= (:target link) (:index selected-node)))))
          (.style "stroke" selected-link-color)
          (.style "stroke-width" selected-link-width))
      (-> link-selection
          maybe-transition
          (.attr "x1" #(-> % :source positions v/x))
          (.attr "y1" #(-> % :source positions v/y))
          (.attr "x2" #(-> % :target positions v/x))
          (.attr "y2" #(-> % :target positions v/y))))
    (let [node-selection (-> svg (.selectAll ".node")
                             (.data (apply array nodes)))
          new-node-selection (-> node-selection .enter
                                 (.append "g")
                                 (.attr "class" "node"))]
      (-> new-node-selection (.append "circle")
          (.attr "class" "node-dot")
          (.attr "r" max-radius))
      ; Having too many labels at once hurts performance. Add/remove labels as
      ; they move in and out of view.
      (-> node-selection
          ; Nodes within a distance threshold which do not have labels
          (.filter
            (fn [node]
              (this-as elem (and (< (distance-for-node node) label-visible-threshold)
                                 (nil? (.querySelector elem ".node-label"))))))
          (.append "text")
          (.attr "class" "node-label")
          (.attr "dy" ".6em")
          (.style "font-family" label-font)
          (.style "font-size" (str label-font-size))
          (.style "text-anchor" "middle")
          (.style "fill" node-label-color)
          (.attr "y" label-y))
      (-> node-selection
          ; Nodes beyond a distance threshold which do have labels
          (.filter #(>= (distance-for-node %) label-visible-threshold))
          (.selectAll ".node-label")
          (.remove))
      (-> node-selection
          (.style "fill"
                  #(if (identical? % selected-node) selected-node-color node-color))
          maybe-transition
          (.attr "transform"
                 (fn [node]
                   (let [i (:index node)
                         scale (project-scale (distances-from-camera i))
                         x (v/x (positions i))
                         y (v/y (positions i))]
                     (str "translate(" x "," y ") scale(" scale ")")))))
      (-> node-selection (.selectAll ".node-label")
          maybe-transition
          (.attr "opacity" (fn [node]
                             (project-label-opacity (distance-for-node node))))
          (.attr "font-weight" (fn [node]
                                 (if (identical? node selected-node) "bold" "normal")))
          (.text #(:title %))))
    (when animate?
      (.onNext animation-subject :animation-start)
      (js/setTimeout
        #(.onNext animation-subject :animation-end) transition-duration-ms))))

;; State management

(defn initial-state [svg
                     detail-button
                     animation-subject]
  {:svg svg
   :detail-button detail-button
   :view-size (v/zero)
   :camera-pos (v/zero)
   :nodes []
   :links []
   :selected-node nil
   :projection :fisheye ; Can be :fisheye or :zoom-out
   ; Subject is part of state because it is needed to render the graph.
   :animation-subject animation-subject})

(defn deselect-node-if-away! [current-state]
  (when-let [selected-node (:selected-node @current-state)]
    (when (and (> (scaled-distance-from-camera @current-state (:pos selected-node))
                  deselection-distance)
               (= (:projection @current-state) :fisheye))
      (swap! current-state assoc :selected-node nil))))

(defn enforce-state-invariants! [current-state]
  (deselect-node-if-away! current-state)) ; The only invariant for now

(defn swap-state! [current-state f & args]
  (apply swap! current-state f args)
  (enforce-state-invariants! current-state)
  (sync-graph! @current-state)
  (sync-detail-button! @current-state))

(defn swap-state-animated! [current-state f & args]
  (apply swap! current-state f args)
  (enforce-state-invariants! current-state)
  (sync-graph! @current-state :animate? true)
  (sync-detail-button! @current-state))

(defn set-graph! [current-state {:keys [nodes links]}]
  (swap-state! current-state assoc
               :nodes nodes
               :links links))

(defn move-camera! [current-state d]
  (swap-state! current-state update :camera-pos v/add
               (-> d v/copy (v/multiply
                              (/ (scroll-scale-for-state @current-state))))))

(defn set-projection! [current-state projection]
  (swap-state-animated! current-state assoc :projection projection))

(defn toggle-projection! [current-state]
  (let [projection (if (= (:projection @current-state) :fisheye)
                     :zoom-out
                     :fisheye)]
    (set-projection! current-state projection)))

(defn zoom-in-to-pos! [current-state pos]
  (swap-state-animated! current-state assoc
                        :projection :fisheye
                        :camera-pos (v/copy pos)))

(defn select-and-zoom-to-node! [current-state node]
  (swap-state-animated! current-state assoc
                        :projection :fisheye
                        :camera-pos (v/copy (:pos node))
                        :selected-node node))

;; Layout

(defn get-force-layout []
  (-> d3 .-layout .force
      (.charge -240)
      (.linkDistance 40)
      (.size (array world-width world-height))))

(defn do-layout! [data scale]
  (let [n (-> data .-nodes .-length)
        force-layout (get-force-layout)]
    ; Initialize the positions deterministically, for better results
    (-> data .-nodes
        (.forEach (fn [d i]
                    (let [val (* i (/ world-width n))]
                      (aset d "x" val)
                      (aset d "y" val)))))
    (-> force-layout
        (.nodes (.-nodes data))
        (.links (.-links data))
        .start)
    (dotimes [_ graph-force-ticks]
      (.tick force-layout))
    (.stop force-layout)
    ; Center the nodes in the middle
    (let [sum-x (->> data .-nodes js->clj (map #(% "x")) (apply +))
          sum-y (->> data .-nodes js->clj (map #(% "y")) (apply +))
          avg-x (/ sum-x n)
          avg-y (/ sum-y n)]
      (-> data .-nodes
          (.forEach (fn [d]
                      (aset d "x" (* scale (- (.-x d) avg-x)))
                      (aset d "y" (* scale (- (.-y d) avg-y)))))))
    data))

;; JSON loading and parsing

(defn node [index title data x y]
  {:index index
   :title title
   :data data
   :pos (v/create x y)})

(defn link
  "Source and target are indexes into the list of nodes."
  [source target]
  {:source source :target target})

(defn parse-js-graph [js-graph scale]
  ;; Running do-layout! modifies the link data to contain full nodes
  ;;  rather than indices. Hence this ugly ordering.
  (let [data-links (js->clj (aget js-graph "links"))
        links (->> data-links
                   ; Hack for "miserables.json" dataset, which has too many
                   ; links so we remove the less important ones.
                   (filter (fn [link]
                             (or (nil? (link "value"))
                                 (>= (link "value") 4))))
                   (mapv (fn [l] (link (l "source") (l "target")))))]
    (do-layout! js-graph scale)
    (let [data-nodes (js->clj (aget js-graph "nodes") :keywordize-keys true)
          nodes (vec (map-indexed (fn [i data-node]
                                    (node i
                                          (:name data-node)
                                          (:data data-node)
                                          (:x data-node)
                                          (:y data-node))) data-nodes))]
      {:nodes nodes :links links})))

(defn load-graph [json-file scale callback]
  (.json d3 json-file
         (fn [js-graph]
           (callback (parse-js-graph js-graph scale)))))

;; Reactive

(def tick-observable (js/Rx.Observable.interval update-interval-ms))

;; Resize

(defn set-size! [current-state width height]
  (let [svg (:svg @current-state)
        background (.select svg ".background")]
    (-> svg (.attr "width" width) (.attr "height" height))
    (swap-state! current-state assoc :view-size (v/create width height))))

; Syncing on window size rather than the size of the surrounding container
; avoids a layout bug on iOS in which the new container size's height is larger
; than the screen. However, it assumes we are filling the whole screen, so if
; we ever decide to fill less of the screen instead then we should use
; sync-on-container-size! instead.

(defn sync-on-window-size! [current-state]
  (set-size! current-state (.-innerWidth js/window) (.-innerHeight js/window)))

(defn sync-on-container-size! [current-state selector]
  (let [container (.select d3 selector)
        element (.node container)
        width (.-clientWidth element)
        height (.-clientHeight element)]
    (set-size! current-state width height)))

(def resize-observable
  (-> rx-observable (.fromEvent js/window "resize")
      (.debounce resize-delay-ms)))

(defn respond-to-resize! [current-state]
  (.subscribe resize-observable
              #(sync-on-window-size! current-state)))

;; Animation

(defn animation-subject []
  (js/Rx.BehaviorSubject. :animation-end))

(defn suppress-while-animating [observable animation-observable]
  (.flatMapLatest animation-observable
                  (fn [e] (if (= e :animation-start)
                            (.empty rx-observable)
                            observable))))

;; Keyboard

(def key-down-observable (.fromEvent rx-observable js/document "keydown"))
(def key-up-observable (.fromEvent rx-observable js/document "keyup"))

(def keys-observable
  "An observable of what keys are currently pressed"
  (-> key-down-observable (.merge key-up-observable)
      (.scan (fn [ks, e]
               (case (.-type e)
                 "keydown" (conj ks (.-keyCode e))
                 "keyup" (disj ks (.-keyCode e))))
             #{})
      (.distinctUntilChanged)))

(def arrow-codes {37 :left, 38 :up, 39 :right, 40 :down
                  65 :left, 87 :up, 68 :right, 83 :down})

(def arrow-keys-observable
  (.map keys-observable #(->> % (map arrow-codes) (filter (comp not nil?)) (into #{}))))

(defn move-camera-on-arrow-keys! [current-state animation-observable]
  (-> arrow-keys-observable
      (.flatMapLatest (fn [arrows] (if (empty? arrows)
                                     (.empty rx-observable)
                                     (-> tick-observable (.map (constantly arrows))))))
      (suppress-while-animating animation-observable)
      (.subscribe
        (fn [arrows]
          (let [dx (+ (if (arrows :left) -10 0) (if (arrows :right) 10 0))
                dy (+ (if (arrows :up) -10 0) (if (arrows :down) 10 0))]
            (move-camera! current-state (v/create dx dy)))))))

(defn switch-zoom-on-spacebar!
  [current-state animation-observable]
  (-> key-up-observable
      (.filter #(= 32 (.-keyCode %)))
      (suppress-while-animating animation-observable)
      (.subscribe #(toggle-projection! current-state))))

;; Gestures

(defn hammer-manager [svg]
  (let [manager (js/Hammer.Manager. (.node svg))]
    (.add manager (js/Hammer.Pan.
                    (js-obj "threshold" 15)))
    (-> manager (.add (js/Hammer.Swipe.
                        (js-obj "threshold" 15
                                "velocity" 0)))
        (.recognizeWith (.get manager "pan")))
    (-> manager (.add (js/Hammer.Pinch.))
        (.recognizeWith (.get manager "pan")))
    (.add manager (js/Hammer.Tap.
                    (js-obj "threshold" 15)))
    manager))

(defn gesture-observable [manager gesture]
  (let [subject (js/Rx.Subject.)]
    (.on manager gesture #(.onNext subject %))
    subject))

;; Gestures - pan

(defn pan-observable [manager]
  (gesture-observable manager "panstart panmove"))

(defn pan-deltas-observable [manager]
  (-> (pan-observable manager)
      (.bufferWithCount 2 1)
      (.map (fn [es] (let [[e1 e2] es
                           e1-center (.-center e1)
                           e2-center (.-center e2)]
                       (if (= (.-type e2) "panstart")
                         (v/create 0 0)
                         (v/create (- (.-x e1-center) (.-x e2-center))
                                   (- (.-y e1-center) (.-y e2-center)))))))))

(defn move-camera-on-pan! [manager current-state animation-observable]
  (-> (pan-deltas-observable manager)
      (suppress-while-animating animation-observable)
      (.subscribe (partial move-camera! current-state))))

;; Gestures - swipe

(defn swipe-observable 
  "A stream of velocity vectors, one per swipe."
  [manager]
  (.map (gesture-observable manager "swipe")
        (fn [e] (v/create (.-velocityX e) (.-velocityY e)))))

(defn scroll-end-observable [svg]
  (let [elem (.node svg)]
    (-> rx-observable (.fromEvent elem "mousedown")
        (.merge (-> rx-observable (.fromEvent elem "touchstart")))
        (.map (constantly :scroll-end)))))

(defn dampen [v]
  (let [length (v/length v)]
    (-> v v/copy (v/set-length (- length swipe-damping-factor)))))

(defn swipe-displacements-observable [manager svg]
  (let [swipes (swipe-observable manager)
        scroll-ends (scroll-end-observable svg)
        actions (.merge swipes scroll-ends)]
    (.flatMapLatest
      actions
      (fn [a]
        (if (= a :scroll-end)
          (.empty rx-observable)
          (let [vx (v/x a)
                vy (v/y a)]
            (.generateWithRelativeTime rx-observable
                                       (v/create (* update-interval-ms (or vx 0))
                                                 (* update-interval-ms (or vy 0)))
                                       (fn [v] (> (v/length-sq v) min-slide-speed-sq))
                                       dampen
                                       identity
                                       (constantly update-interval-ms))))))))

(defn move-camera-on-swipe! [manager current-state animation-observable]
  (-> (swipe-displacements-observable manager (:svg @current-state))
      (suppress-while-animating animation-observable)
      (.subscribe (partial move-camera! current-state))))

;; Gestures - pinch

(defn pinch-observable [manager]
  (.map (gesture-observable manager "pinchmove")
        (fn [e] {:center (v/create (-> e .-center .-x) (-> e .-center .-y))
                 :scale (.-scale e)})))

(defn zoom-on-pinch! [manager
                      current-state
                      animation-observable]
  (let [pinches (pinch-observable manager)
        pinch-ins (-> pinches (.filter #(< (:scale %) 0.8)))
        pinch-outs (-> pinches (.filter #(> (:scale %) 1.2)))]
    (.subscribe
      pinch-ins
      #(if (= (:projection @current-state) :fisheye)
         (set-projection! current-state :zoom-out)))
    (.subscribe
      pinch-outs
      #(if (= (:projection @current-state) :zoom-out)
         (zoom-in-to-pos! current-state
                          (zoom-out->world-pos @current-state (:center %)))))))

;; Gestures - tap

(defn tap-observable
  "Stream of locations as math vectors."
  [manager]
  (.map (gesture-observable manager "tap")
        (fn [e] (v/create (-> e .-center .-x) (-> e .-center .-y)))))

(defn svg-element-position [svg elem]
  (let [box (.getBoundingClientRect elem)
        center-x (+ (.-left box) (/ (.-width box) 2))
        center-y (+ (.-top box) (/ (.-height box) 2))
        svg-box (-> svg .node .getBoundingClientRect)
        svg-x (.-left svg-box)
        svg-y (.-top svg-box)]
    (v/create (- center-x svg-x) (- center-y svg-y))))

(defn closest-node
  [state pos]
  (let [closest-node (atom nil)
        closest-distance-sq (atom js/Infinity)
        svg (:svg state)]
    (-> svg (.selectAll ".node-dot")
        (.each
          (fn [node]
            (this-as elem
                     (let [elem-pos (svg-element-position svg elem)
                           distance-sq (v/distance-sq pos elem-pos)]
                       (when (< distance-sq @closest-distance-sq)
                         (reset! closest-distance-sq distance-sq)
                         (reset! closest-node node)))))))
    {:pos pos
     :node @closest-node
     :distance (js/Math.sqrt @closest-distance-sq)}))

(defn zoom-and-select-on-tap! [manager current-state animation-observable]
  (let [taps (tap-observable manager)
        partitions (-> taps
                       (suppress-while-animating animation-observable)
                       (.map #(closest-node @current-state %))
                       (.partition #(< (:distance %) (/ hitbox-size 2))))
        node-taps (aget partitions 0)
        space-taps (.map (aget partitions 1) #(:pos %))]
    (.subscribe node-taps
                (fn [{:keys [node]}]
                  (select-and-zoom-to-node! current-state node)))
    (.subscribe space-taps
                #(if (= (:projection @current-state) :zoom-out)
                   (zoom-in-to-pos! current-state
                                    (zoom-out->world-pos @current-state %))))))

;; Detail button

(defn show-details-on-button-click! [current-state modal-selector]
  (let [detail-button (:detail-button @current-state)]
    (.on detail-button "click"
         #(detail/show-modal modal-selector
                             (get-in @current-state [:selected-node :data])))))

;; Exported function to do magic

(defn ^:export inhabit [container-selector
                        detail-button-selector
                        modal-selector
                        opts]
  (let [{graph-file "graphFile"
         gilbert-graph "gilbertGraph"
         graph-json "graphJson"
         scale "scale"
         :or {scale 1}} (js->clj opts)
        svg (setup-svg! container-selector)
        detail-button (.select d3 detail-button-selector)
        gesture-manager (hammer-manager svg)
        animation-subject (animation-subject)
        current-state (atom (initial-state svg
                                           detail-button
                                           animation-subject))]
    (prevent-focus-on-detail-button! detail-button)
    (sync-on-window-size! current-state)
    (cond
      gilbert-graph
      (let [[num-nodes p] gilbert-graph
            js-graph (clj->js (gen/gilbert-graph num-nodes p))]
        (set-graph! current-state (parse-js-graph js-graph scale)))

      graph-file
      (load-graph graph-file scale (partial set-graph! current-state))
      
      graph-json
      (let [js-graph (js/JSON.parse graph-json)]
        (set-graph! current-state (parse-js-graph js-graph scale))))
    (respond-to-resize! current-state)
    (move-camera-on-arrow-keys! current-state animation-subject)
    (move-camera-on-pan! gesture-manager current-state animation-subject)
    (move-camera-on-swipe! gesture-manager current-state animation-subject)
    (switch-zoom-on-spacebar! current-state animation-subject)
    (zoom-on-pinch! gesture-manager current-state animation-subject)
    (zoom-and-select-on-tap! gesture-manager current-state animation-subject)
    (show-details-on-button-click! current-state modal-selector)))
