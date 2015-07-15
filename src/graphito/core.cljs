(ns graphito.core
  (:require [clojure.browser.repl :as repl]))

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

(def update-interval-ms 15)

(def swipe-damping-factor 1)
(def min-slide-speed-sq 16)

; A factor of 1 is an ellipse fitting the bounds of the window. Higher factors
; expand the visualization linearly.
(def displacement-factor 1)

(def max-radius 32)

(def zoom-out-scale 0.25)

;; SVG setup

(defn disable-touchmove! [container]
  (.on container "touchmove" #(-> d3 .-event .preventDefault)))

(defn add-background! [svg width height]
  (-> svg
      (.append "rect")
      (.attr "width" width)
      (.attr "height" height)
      (.attr "fill" "#EDF0F2")
      (.attr "stroke" 0)))

(defn setup-svg! [selector width height]
  (let [container (.select d3 selector)
        svg (-> container
                (.append "svg")
                (.attr "width" width)
                (.attr "height" height))]
    (disable-touchmove! container)
    (add-background! svg width height)
    svg))

;; Vector math

(defn math-vec [x y] {:x x :y y})

(def sqrt (.-sqrt js/Math))

(defn vec-length-sq [v]
  (let [{:keys [x y]} v]
    (+ (* x x) (* y y))))

(def vec-length (comp sqrt vec-length-sq))

(defn add-vec [v1 v2]
  (merge-with + v1 v2))

(defn subtract-vec [v1 v2]
  (merge-with - v1 v2))

(defn scalar-multiply [v c]
  (if (= c 1)
    v
    (math-vec (* c (:x v)) (* c (:y v)))))

(defn neg-vec [v]
  (scalar-multiply v -1))

(defn vec-with-length [v l]
  (scalar-multiply v (/ l (vec-length v))))

(def vec-distance (comp vec-length subtract-vec))

;; Geometry

(defn scroll-scale-for-state [state]
  (if (= :zoom-out (:projection state)) zoom-out-scale 1))

(defn zoom-out->world-pos [state pos]
  (let [{:keys [camera-pos view-size]} state
        view-center (scalar-multiply view-size 0.5)
        displacement (subtract-vec pos view-center)]
    (add-vec camera-pos (scalar-multiply displacement (/ zoom-out-scale)))))

(defn scaled-distance-from-camera
  "Returns the distance of the given point from the camera, scaled so that
  points which would be at the corner of the screen are at distance 1"
  [state pos]
  (let [{:keys [camera-pos view-size]} state
        corner-distance (/ (vec-length view-size) 2)]
    (/ (vec-distance (:camera-pos state) pos) corner-distance)))

(defn elliptic-distance-from-camera [state pos]
  "An alternate method of computing distance, currently unused."
  (let [{:keys [view-size camera-pos]} state
        rx (/ (:x view-size) 2)
        ry (/ (:y view-size) 2)
        sq (fn [x] (* x x))
        {:keys [x y]} (subtract-vec pos camera-pos)]
    (sqrt (+ (/ (sq x) (sq rx)) (/ (sq y) (sq ry))))))

(defn project-displacement [t]
  (cond
    (<= t 0.5) t
    (<= 0.5 t 1) (+ 0.5 (/ (- t 0.5) 2))
    (<= 1 t 1.5) (+ 0.75 (/ (- t 1) 4))
    (<= 1.5 t 2.5) (+ 0.875 (/ (- t 1.5) 8))
    :else 1))

(defn view-position [state pos projector]
  (let [{:keys [view-size camera-pos]} state
        view-center (scalar-multiply view-size 0.5)
        corner-distance (vec-length view-center)
        displacement (subtract-vec pos camera-pos)
        r (scaled-distance-from-camera state pos)
        projected-r (projector r)]
    (add-vec view-center
             (scalar-multiply displacement (/ projected-r r)))))

(defn project-radius [t]
  (* max-radius (min 1 (/ 1 (.pow js/Math 2 (* 2 (- t 0.25)))))))

(defn project-opacity [t]
  (cond
    (<= t 1) 1
    (<= 1 t 2) (- 1 (/ (- t 1) 4))
    (<= 2 t 3) (- 0.75 (* 0.75 (- t 2)))
    :else 0))

(def fisheye-projectors {:project-displacement project-displacement
                         :project-radius project-radius
                         :project-opacity project-opacity})

(def zoom-out-projectors {:project-displacement (partial * zoom-out-scale)
                          :project-radius (constantly (* zoom-out-scale max-radius))
                          :project-opacity (constantly 1)})

(defn projectors-for-state [state]
  (if (= (:projection state) :fisheye) fisheye-projectors zoom-out-projectors))

;; D3 magic

(defn sync-graph! [state & {:keys [animation-signaller]}]
  (let [{:keys [svg nodes links camera-pos view-size]} state
        {:keys [project-displacement
                project-radius
                project-opacity]} (projectors-for-state state)
        transition (fn [selection]
                     (animation-signaller true)
                     (-> selection
                         .transition
                         (.duration 500)
                         (.each "end" #(animation-signaller false))))
        maybe-transition (if animation-signaller transition identity)
        positions (mapv (fn [node]
                          (view-position state
                                         (:pos node)
                                         project-displacement)) nodes)
        distances-from-camera
        (mapv (fn [node]
                (scaled-distance-from-camera state (:pos node))) nodes)]
    (let [link-selection (-> svg (.selectAll ".link") (.data (apply array links)))]
      (-> link-selection .enter
          (.append "line")
          (.attr "class" "link")
          (.style "stroke" "#C9CBCB")
          (.style "stroke-width" 3))
      (-> link-selection
          maybe-transition
          (.attr "x1" #(-> % :source positions :x))
          (.attr "y1" #(-> % :source positions :y))
          (.attr "x2" #(-> % :target positions :x))
          (.attr "y2" #(-> % :target positions :y))))
    (let [node-selection (-> svg (.selectAll ".node") (.data (apply array nodes)))]
      (-> node-selection .enter
          (.append "circle")
          (.attr "class" "node")
          (.style "fill" "#777A7A"))
      (-> node-selection
          maybe-transition
          (.attr "cx" (fn [d i] (:x (positions i))))
          (.attr "cy" (fn [d i] (:y (positions i))))
          (.attr "r" (fn [d i] (project-radius (distances-from-camera i))))
          (.style "opacity" (fn [d i] (project-opacity (distances-from-camera i))))))))

;; State management

(defn initial-state [svg width height]
  {:svg svg
   :view-size (math-vec width height)
   :camera-pos (math-vec 0 0)
   :nodes []
   :edges []
   :projection :fisheye}) ; Can be :fisheye or :zoom-out

(defn swap-state! [current-state f & args]
  (apply swap! current-state f args)
  (sync-graph! @current-state))

(defn swap-state-animated! [animation-signaller current-state f & args]
  ; There's no way to arrange the arguments that isn't awkward. Luckily all the
  ; uses will probably be right here.
  (apply swap! current-state f args)
  (sync-graph! @current-state :animation-signaller animation-signaller))

(defn update-state! [current-state k f & args]
  (apply swap! current-state update k f args)
  (sync-graph! @current-state))

(defn move-camera! [current-state d]
  (update-state! current-state :camera-pos add-vec
                 (scalar-multiply d (/ (scroll-scale-for-state @current-state)))))

(defn set-projection! [current-state projection animation-signaller]
  (swap-state-animated! animation-signaller
                        current-state assoc :projection projection))

(defn toggle-projection! [current-state animation-signaller]
  (let [projection (if (= (:projection @current-state) :fisheye)
                     :zoom-out
                     :fisheye)]
    (set-projection! current-state projection animation-signaller)))

(defn zoom-in-to-pos! [current-state pos animation-signaller]
  (swap-state-animated! animation-signaller
                          current-state assoc
                          :projection :fisheye
                          :camera-pos pos))

;; Layout

(defn get-force-layout []
  (-> d3 .-layout .force
      (.charge -240)
      (.linkDistance 40)
      (.size (array world-width world-height))))

(defn do-layout! [data]
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
    (dotimes [_ n]
      (.tick force-layout))
    (.stop force-layout)
    ; Center the nodes in the middle
    (let [sum-x (->> data .-nodes js->clj (map #(% "x")) (apply +))
          sum-y (->> data .-nodes js->clj (map #(% "y")) (apply +))
          avg-x (/ sum-x n)
          avg-y (/ sum-y n)
          ; Nodes are too close together, but the graph has good shape.
          ; Expand everything.
          scale-hack 8] 
      (-> data .-nodes
          (.forEach (fn [d]
                      (aset d "x" (* scale-hack (- (.-x d) avg-x)))
                      (aset d "y" (* scale-hack (- (.-y d) avg-y)))))))
    data))

;; JSON loading and parsing

(defn node [title x y]
  {:title title
   :pos (math-vec x y)})

(defn link
  "Source and target are indexes into the list of nodes."
  [source target]
  {:source source :target target})

(defn load-graph [json-file callback]
  (.json d3 json-file
         (fn [raw-data]
           ;; Running do-layout! modifies the link data to contain full nodes
           ;;  rather than indices. Hence this ugly ordering.
           (let [data-links (js->clj (aget raw-data "links"))
                 links (->> data-links
                            (filter #(>= (% "value") 4))
                            (mapv (fn [l] (link (l "source") (l "target")))))]
             (do-layout! raw-data)
             (let [data-nodes (js->clj (aget raw-data "nodes"))
                   nodes (mapv (fn [data-node]
                                 (node (data-node "name")
                                       (data-node "x")
                                       (data-node "y"))) data-nodes)]
               (callback {:nodes nodes :links links}))))))

;; Reactive

(def tick-observable (js/Rx.Observable.interval update-interval-ms))

(defn animation-observable-and-signaller
  "Returns an observable paired with a function which can be called to emit
  events on the observable. Subscribers to the observable immediately
  receive the most recently emitted value."
  []
  (let [observers (atom [])
        observable (-> rx-observable
                       (.create #(swap! observers conj %))
                       (.startWith :animation-end)
                       (.replay 1))
        bool->event #(if % :animation-start :animation-end)
        animation-signaller (fn [b]
                              (doseq [o @observers]
                                (.onNext o (bool->event b))))]
    (.connect observable) 
    [observable animation-signaller]))

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
            (move-camera! current-state (math-vec dx dy)))))))

(defn switch-zoom-on-spacebar!
  [current-state animation-observable animation-signaller]
  (-> key-up-observable
      (.filter #(= 32 (.-keyCode %)))
      (suppress-while-animating animation-observable)
      (.subscribe #(toggle-projection! current-state animation-signaller))))

;; Gestures

(defn hammer-manager [svg]
  (let [manager (js/Hammer.Manager. (.node svg))]
    (.add manager (js/Hammer.Pan.))
    (-> manager (.add (js/Hammer.Swipe.))
        (.recognizeWith (.get manager "pan")))
    (-> manager (.add (js/Hammer.Pinch.))
        (.recognizeWith (.get manager "pan")))
    manager))

(defn gesture-observable [manager svg gesture]
  (.create rx-observable
           (fn [observer] (.on manager gesture #(.onNext observer %)))))

;; Gestures - pan

(defn pan-observable [manager svg]
  (gesture-observable manager svg "panstart panmove"))

(defn pan-deltas-observable [manager svg]
  (-> (pan-observable manager svg)
      (.bufferWithCount 2 1)
      (.map (fn [es] (let [[e1 e2] es
                           e1-center (.-center e1)
                           e2-center (.-center e2)]
                       (if (= (.-type e2) "panstart")
                         (math-vec 0 0)
                         (math-vec (- (.-x e1-center) (.-x e2-center))
                                   (- (.-y e1-center) (.-y e2-center)))))))))

(defn move-camera-on-pan! [manager current-state animation-observable]
  (-> (pan-deltas-observable manager (:svg @current-state))
      (suppress-while-animating animation-observable)
      (.subscribe (partial move-camera! current-state))))

;; Gestures - swipe

(defn swipe-observable 
  "A stream of velocity vectors, one per swipe."
  [manager svg]
  (.map (gesture-observable manager svg "swipe")
        (fn [e] {:vx (.-velocityX e), :vy (.-velocityY e)})))

(defn scroll-end-observable [svg]
  (let [elem (.node svg)]
    (-> rx-observable (.fromEvent elem "mousedown")
        (.merge (-> rx-observable (.fromEvent elem "touchstart")))
        (.map (constantly :scroll-end)))))

(defn dampen [v]
  (let [length (vec-length v)]
    (vec-with-length v (- length swipe-damping-factor))))

(defn swipe-displacements-observable [manager svg]
  (let [swipes (swipe-observable manager svg)
        scroll-ends (scroll-end-observable svg)
        actions (.merge swipes scroll-ends)]
    (.flatMapLatest
      actions
      (fn [a]
        (if (= a :scroll-end)
          (.empty rx-observable)
          (let [{:keys [vx vy]} a]
            (.generateWithRelativeTime rx-observable
                                       (math-vec (* update-interval-ms (or vx 0))
                                                 (* update-interval-ms (or vy 0)))
                                       (fn [v] (> (vec-length-sq v) min-slide-speed-sq))
                                       dampen
                                       identity
                                       (constantly update-interval-ms))))))))

(defn move-camera-on-swipe! [manager current-state animation-observable]
  (-> (swipe-displacements-observable manager (:svg @current-state))
      (suppress-while-animating animation-observable)
      (.subscribe (partial move-camera! current-state))))

;; Gestures - pinch

(defn pinch-observable [manager svg]
  (.map (gesture-observable manager svg "pinchmove")
        (fn [e] {:center (math-vec (-> e .-center .-x) (-> e .-center .-y))
                 :scale (.-scale e)})))

(defn zoom-on-pinch! [manager
                      current-state
                      animation-observable
                      animation-signaller]
  (let [pinches (pinch-observable manager (:svg @current-state))
        pinch-ins (-> pinches (.filter #(< (:scale %) 0.8))
                      (suppress-while-animating animation-observable))
        pinch-outs (-> pinches (.filter #(> (:scale %) 1.2))
                       (suppress-while-animating animation-observable))]
    (.subscribe
      pinch-ins
      #(if (= (:projection @current-state) :fisheye)
         (set-projection! current-state :zoom-out animation-signaller)))
    (.subscribe
      pinch-outs
      #(if (= (:projection @current-state) :zoom-out)
         (zoom-in-to-pos! current-state
                          (zoom-out->world-pos @current-state (:center %))
                          animation-signaller)))))

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)
        current-state (atom (initial-state svg width height))
        gesture-manager (hammer-manager svg)
        [animation-observable
         animation-signaller] (animation-observable-and-signaller)]
    (sync-graph! @current-state)
    (load-graph "miserables.json"
                (fn [graph]
                  (let [{:keys [nodes links]} graph]
                    (swap-state! current-state assoc :nodes nodes :links links))))
    (move-camera-on-arrow-keys! current-state animation-observable)
    (move-camera-on-pan! gesture-manager current-state animation-observable)
    (move-camera-on-swipe! gesture-manager current-state animation-observable)
    (switch-zoom-on-spacebar!
      current-state animation-observable animation-signaller)
    (zoom-on-pinch!
      gesture-manager current-state animation-observable animation-signaller)))
