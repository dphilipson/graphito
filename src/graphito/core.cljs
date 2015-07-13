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

(def d3 js/d3)

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

(defn setup-graph! [state]
  (let [{:keys [svg nodes]} state]
    (-> svg
        (.selectAll ".node")
        (.data (apply array nodes))
        .enter
        (.append "circle")
        (.attr "class" "node")
        (.attr "cx" #(:x %))
        (.attr "cy" #(:y %))
        (.attr "r" 10))))

;; State management

(defn initial-state [svg width height nodes]
  {:svg svg
   :view-width width
   :view-height height
   :camera-x 0
   :camera-y 0
   :nodes nodes})

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
           (let [raw-nodes (p "raw-nodes:" js->clj (.-nodes data) :keywordize-keys true)
                 nodes (p "nodes:" map (fn [raw-node]
                              (node (:name raw-node)
                                    (:x raw-node)
                                    (:y raw-node))) raw-nodes)]
             (callback nodes)))))

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)]
    (load-nodes "miserables.json"
                (fn [nodes]
                  (let [state (initial-state svg width height nodes)]
                    (setup-graph! state))))))
