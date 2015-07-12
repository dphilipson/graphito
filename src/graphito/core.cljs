(ns graphito.core
  (:require [clojure.browser.repl :as repl]))

;; (defonce conn
;;   (repl/connect "http://localhost:9000/repl"))

(enable-console-print!)

(def $ js/$)
(def Raphael js/Raphael)

;; Paper setup

(defn disable-touchmove! [$element]
  (.on $element "touchmove" #(.preventDefault %)))

(defn add-background! [paper width height]
  (let [rect (.rect paper 0 0 width height)]
    (.attr rect (js-obj "fill" "270-#ccc-#888"
                        "stroke" 0))))

(defn setup-paper! [$container width height]
  (disable-touchmove! $container)
  (let [containerElem (.get $container 0)
        paper (Raphael containerElem width height)]
    (add-background! paper width height)
    paper))

;; State management

(defn initial-state [paper width height]
  {:paper paper
   :view-width width
   :view-height height
   :camera-x 0
   :camera-y 0
   :nodes []})

(defn create-node-element!
  "Adds a new node element to the paper and returns it."
  [paper]
  (let [elem (.circle paper 20 20 10)]
    (.attr elem (js-obj "fill" "blue"
                        "stroke" "gray"
                        "stroke-width" 2))
    elem))

(defn add-node!
  "Adds a new node element to the paper and returns an updated state which
  references this element." 
  [state title x y]
  (let [elem (create-node-element! (:paper state))
        new-node {:title title
                  :x x
                  :y y
                  :element elem}]
    (update state :nodes conj new-node)))

;; Exported function to do magic

(defn ^:export inhabit [selector]
  (let [$container ($ selector)
        width (.width $container)
        height (.height $container)
        paper (setup-paper! $container width height)
        state (initial-state paper width height)]
    (add-node! state "Hello Node" 0 0)))
