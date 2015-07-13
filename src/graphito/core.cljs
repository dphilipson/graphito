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

(def arrow-codes {37 :left, 38 :up, 39 :right, 40 :down})

(defn get-arrow-key-observable []
  (-> rx-observable (.fromEvent js/document "keyup")
      (.map #(arrow-codes (.-keyCode %)))))

;; Exported function to do magic

(defn sync-after [f current-state]
  (fn [& args]
    (apply f args)
    (sync-graph! @current-state)))

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)
        current-state (atom (initial-state svg width height))
        sync-after (fn [f]
                     (fn [& args]
                       (apply f args)
                       (sync-graph! @current-state)))
        update-state! (sync-after (partial swap! current-state update))
        swap-state! (sync-after (partial swap! current-state))]
    (sync-graph! @current-state)
    (load-nodes "miserables.json" (fn [nodes]
                                    (swap-state! assoc :nodes nodes)))
    (.subscribe
      (get-arrow-key-observable)
      (fn [direction]
        (let [[dx dy] (case direction
                        :left [-10 0]
                        :up [0 -10]
                        :right [10 0]
                        :down [0 10])]
          (swap-state! (fn [s]
                         (-> s
                             (update :camera-x + dx)
                             (update :camera-y + dy)))))))))
