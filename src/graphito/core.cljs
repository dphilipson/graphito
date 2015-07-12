(ns graphito.core
  (:require [clojure.browser.repl :as repl]))

;; (defonce conn
;;   (repl/connect "http://localhost:9000/repl"))

(enable-console-print!)

(def $ js/$)
(def Raphael js/Raphael)

(defn disable-touchmove [$element]
  (.on $element "touchmove" #(.preventDefault %)))

(defn add-background [paper width height]
  (let [rect (.rect paper 0 0 width height)]
    (.attr rect (js-obj "fill" "270-#ccc-#888"
                        "stroke" 0))))

(defn setup-paper [$container]
  (disable-touchmove $container)
  (let [width (.width $container)
        height (.height $container)
        containerElem (.get $container 0)
        paper (Raphael containerElem width height)]
    (add-background paper width height)
    paper))

(defn ^:export inhabit [selector]
  (let [$container ($ selector)
        paper (setup-paper $container)]
    nil))
