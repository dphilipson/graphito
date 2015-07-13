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

;; D3 magic

(defn view-position
  "Given the actual position of a node (in world coordinates), return the
  position of the node in screen coordinates according to the state."
  [state x y]
  (let [{:keys [view-width view-height camera-x camera-y]} state
        view-center-x (/ view-width 2)
        view-center-y (/ view-height 2)]
    {:x (+ view-center-x (- x camera-x))
     :y (+ view-center-y (- y camera-y))}))

(defn view-radius [state x y] 10)

(defn sync-graph! [state]
  (let [{:keys [svg nodes]} state
        _view-position (fn [d] (view-position state (:x d) (:y d)))
        view-x (comp :x _view-position)
        view-y (comp :y _view-position)
        _view-radius (fn [d] (view-radius state (:x d) (:y d)))]
    (-> svg
        (.selectAll ".node")
        (.data (apply array nodes))
        (.attr "cx" view-x)
        (.attr "cy" view-y)
        (.attr "r" view-radius)
        .enter
        (.append "circle")
        (.attr "class" "node")
        (.attr "cx" (comp view-x))
        (.attr "cy" (comp view-y))
        (.attr "r" view-radius))))

;; State management

(defn initial-state [svg width height]
  {:svg svg
   :view-width width
   :view-height height
   :camera-x 0
   :camera-y 0
   :nodes []})

(defn swap-state! [current-state f & args]
  (apply swap! current-state f args)
  (sync-graph! @current-state))

(defn update-state! [current-state k f & args]
  (apply swap! current-state update k f args)
  (sync-graph! @current-state))

(defn move-camera! [current-state dx dy]
  (swap-state! current-state #(-> %
                                  (update :camera-x + dx)
                                  (update :camera-y + dy))))

;; Layout

(defn get-force-layout []
  (-> d3 .-layout .force
      (.charge -240)
      (.linkDistance 100)
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
          avg-y (/ sum-y n)]
      (-> data .-nodes
          (.forEach (fn [d]
                      (aset d "x" (- (.-x d) avg-x))
                      (aset d "y" (- (.-y d) avg-y))))))
    data))

;; JSON loading and parsing

(defn node [title x y]
  {:title title
   :x x
   :y y})

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
                                     (-> rx-observable (.interval 15) (.map (constantly arrows))))))
      (.subscribe
        (fn [arrows]
          (let [dx (+ (if (arrows :left) -10 0) (if (arrows :right) 10 0))
                dy (+ (if (arrows :up) -10 0) (if (arrows :down) 10 0))]
            (move-camera! current-state dx dy))))))

;; Gestures

(defn hammer-manager [svg]
  (let [manager (js/Hammer.Manager. (.node svg))]
    (.add manager (js/Hammer.Pan.))
    manager))

(defn pan-observable [svg]
  (let [manager (hammer-manager svg)]
    (.create
      rx-observable
      (fn [observer]
        (.on manager "panstart panmove"
             (fn [e] (.onNext observer e)))))))

(defn pan-deltas-observable [svg]
  (-> (pan-observable svg)
      (.bufferWithCount 2 1)
      (.map (fn [es] (let [[e1 e2] es
                           e1-center (.-center e1)
                           e2-center (.-center e2)]
                       (if (= (.-type e2) "panstart")
                         {:dx 0 :dy 0}
                         {:dx (- (.-x e1-center) (.-x e2-center))
                          :dy (- (.-y e1-center) (.-y e2-center))}))))))

(defn move-camera-on-pan! [current-state]
  (.subscribe
    (pan-deltas-observable (:svg @current-state))
    (fn [d] (let [{:keys [dx dy]} d] (move-camera! current-state dx dy)))))

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)
        current-state (atom (initial-state svg width height))]
    (sync-graph! @current-state)
    (load-nodes "miserables.json" (fn [nodes]
                                    (swap-state! current-state assoc :nodes nodes)))
    (move-camera-on-arrow-keys! current-state)
    (move-camera-on-pan! current-state)))
