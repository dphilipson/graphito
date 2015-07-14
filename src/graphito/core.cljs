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

(def max-radius 32)
(def min-radius 2)
(def edge-buffer (+ min-radius 3))


;; SVG setup

(defn disable-touchmove! [container]
  (.on container "touchmove" #(-> d3 .-event .preventDefault)))

(defn add-background! [svg width height]
  (-> svg
      (.append "rect")
      (.attr "width" width)
      (.attr "height" height)
      (.attr "fill" "#ccc")
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

(defn dist-sq [v]
  (let [{:keys [x y]} v]
    (+ (* x x) (* y y))))

(def dist (comp sqrt dist-sq))

(defn add-vec [v1 v2]
  (merge-with + v1 v2))

(defn subtract-vec [v1 v2]
  (merge-with - v1 v2))

(defn scalar-multiply [v c]
  (-> v (update :x * c) (update :y * c)))

(defn neg-vec [v]
  (scalar-multiply v -1))

(defn vec-with-length [v l]
  (scalar-multiply v (/ l (dist v))))

;; D3 magic

(defn project-displacement [d view-length]
  (let [t (/ d view-length)]
    (* view-length
       (cond
         (<= t 0.5) t
         (<= 0.5 t 1) (+ 0.5 (/ (- t 0.5) 2))
         (<= 1 t 1.5) (+ 0.75 (/ (- t 1) 4))
         (<= 1.5 t 2) (+ 0.875 (/ (- t 1.5) 8))
         (<= 2 t) 1))))

(defn view-position
  "Given the actual position of a node (in world coordinates), return the
  position of the node in screen coordinates according to the state."
  [state pos]
  (let [{:keys [view-size camera-pos]} state
        view-center (scalar-multiply view-size 0.5)
        view-radius (dist view-center)
        displacement (subtract-vec pos camera-pos)
        r (dist displacement)
        projected-r (project-displacement r view-radius)]
    (add-vec view-center (vec-with-length displacement projected-r))))

(defn project-radius [d view-length]
  (let [t (/ d view-length)]
    (+ min-radius (* (- max-radius min-radius)
                     (cond
                       (<= t 0.5) 1
                       (<= 0.5 t 1.5) (- 1 (/ (- t 0.5) 2))
                       (<= 1.5 t 2) (- 0.5 (- t 1.5))
                       (<= 2 t) 0)))))

(defn view-radius [state pos]
  (let [{:keys [view-size camera-pos]} state
        view-center (scalar-multiply view-size 0.5)
        view-radius (dist view-center)
        displacement (subtract-vec pos camera-pos)
        r (dist displacement)]
    (project-radius r view-radius)))

(defn sync-graph! [state]
  (let [{:keys [svg nodes]} state
        _view-position (fn [d] (view-position state (:pos d)))
        view-x (comp :x _view-position)
        view-y (comp :y _view-position)
        _view-radius (fn [d] (view-radius state (:pos d)))]
    (-> svg
        (.selectAll ".node")
        (.data (apply array nodes))
        (.attr "cx" view-x)
        (.attr "cy" view-y)
        (.attr "r" _view-radius)
        .enter
        (.append "circle")
        (.attr "class" "node")
        (.attr "cx" (comp view-x))
        (.attr "cy" (comp view-y))
        (.attr "r" _view-radius))))

;; State management

(defn initial-state [svg width height]
  {:svg svg
   :view-size (math-vec width height)
   :camera-pos (math-vec 0 0)
   :nodes []})

(defn swap-state! [current-state f & args]
  (apply swap! current-state f args)
  (sync-graph! @current-state))

(defn update-state! [current-state k f & args]
  (apply swap! current-state update k f args)
  (sync-graph! @current-state))

(defn move-camera! [current-state d]
  (update-state! current-state :camera-pos add-vec d))

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

(defn load-nodes [json-file callback]
  (.json d3 json-file
         (fn [data]
           (do-layout! data)
           (let [raw-nodes (js->clj (.-nodes data) :keywordize-keys true)
                 nodes (map (fn [raw-node]
                              (node (:name raw-node)
                                    (:x raw-node)
                                    (:y raw-node))) raw-nodes)]
             (callback nodes)))))

;; Reactive

(def tick-observable (js/Rx.Observable.interval update-interval-ms))

;; Arrow keys

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

(defn move-camera-on-arrow-keys! [current-state]
  (-> arrow-keys-observable
      (.flatMapLatest (fn [arrows] (if (empty? arrows)
                                     (.empty rx-observable)
                                     (-> tick-observable (.map (constantly arrows))))))
      (.subscribe
        (fn [arrows]
          (let [dx (+ (if (arrows :left) -10 0) (if (arrows :right) 10 0))
                dy (+ (if (arrows :up) -10 0) (if (arrows :down) 10 0))]
            (move-camera! current-state (math-vec dx dy)))))))

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

(defn move-camera-on-pan! [manager current-state]
  (.subscribe
    (pan-deltas-observable manager (:svg @current-state))
    (partial move-camera! current-state)))

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
  (let [length (dist v)]
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
              (fn [v] (> (dist-sq v) min-slide-speed-sq))
              dampen
              identity
              (constantly update-interval-ms))))))))

(defn move-camera-on-swipe! [manager current-state]
  (.subscribe
    (swipe-displacements-observable manager (:svg @current-state))
    (partial move-camera! current-state)))

;; Gestures - pinch

(defn pinch-observable
  "Returns a stream of the scale."
  [manager svg]
  (.map (gesture-observable manager svg "pinchmove")
        #(.-scale %)))

(defn zoom-out-on-pinch! [manager current-state]
  (-> (pinch-observable manager (:svg @current-state))
      (.filter #(< % 0.5))
      (.subscribe #(js/alert "TODO: zoom out"))))

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)
        current-state (atom (initial-state svg width height))
        gesture-manager (hammer-manager svg)]
    (sync-graph! @current-state)
    (load-nodes "miserables.json" (fn [nodes]
                                    (swap-state! current-state assoc :nodes nodes)))
    (move-camera-on-arrow-keys! current-state)
    (move-camera-on-pan! gesture-manager current-state)
    (move-camera-on-swipe! gesture-manager current-state)
    (zoom-out-on-pinch! gesture-manager current-state)))
