(ns graphito.core
  (:require [clojure.browser.repl :as repl]))

;; (defonce conn
;;   (repl/connect "http://localhost:9000/repl"))

(enable-console-print!)

(def d3 js/d3)

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
        (.attr "r" 32))))

;; State management

(defn initial-state [svg width height]
  {:svg svg
   :view-width width
   :view-height height
   :camera-x 0
   :camera-y 0
   :nodes [{:x 40 :y 40}]})

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [element (-> d3 (.select selector) .node)
        width (.-clientWidth element)
        height (.-clientHeight element)
        svg (setup-svg! selector width height)
        state (initial-state svg width height)]
    (setup-graph! state)))
