(ns graphito.layout)

(def force-layout-charge -240)
(def force-layout-link-distance 40)
(def force-layout-world-width 1280)
(def force-layout-world-height 800)
(def force-layout-num-ticks 100)

(def low-bound 0)
(def high-bound 0.5)

(def target-short-distance 160)

;; Math helpers

(defn average [coll]
  (/ (apply + coll) (count coll)))

(defn window-average
  ([coll] (window-average coll low-bound high-bound))
  ([coll low-bound high-bound]
   (let [low-index (-> coll count (* low-bound) int)
         high-index (-> coll count (* high-bound) int)]
     (->> coll sort (drop low-index) (take high-index) average))))

(defn distance [node1 node2]
  (let [dx (- (:x node2) (:x node1))
        dy (- (:y node2) (:y node1))]
    (js/Math.sqrt (+ (* dx dx) (* dy dy)))))

(defn closest-distance [nodes node]
  (->> nodes (map (partial distance node))
       (filter pos?)
       (apply min)))

;; Force layout

(defn get-force-layout []
  (-> js/d3 .-layout .force
      (.charge force-layout-charge)
      (.linkDistance force-layout-link-distance)
      (.size (array force-layout-world-width force-layout-world-height))))

(defn run-force-layout! [data]
  (let [n (-> data .-nodes .-length)
        force-layout (get-force-layout)]
    ; Initialize the positions deterministically, for better results
    (-> data .-nodes
        (.forEach (fn [d i]
                    (let [val (* i (/ force-layout-world-width n))]
                      (aset d "x" val)
                      (aset d "y" val)))))
    (-> force-layout
        (.nodes (.-nodes data))
        (.links (.-links data))
        .start)
    (dotimes [_ force-layout-num-ticks]
      (.tick force-layout))
    (.stop force-layout)))

;; Centering

(defn center-nodes! [data]
  (let [clj-nodes ((js->clj data) "nodes")
        avg-x (->> clj-nodes (map #(% "x")) average)
        avg-y (->> clj-nodes (map #(% "y")) average)]
    (-> data .-nodes
        (.forEach (fn [d]
                    (set! (.-x d) (- (.-x d) avg-x))
                    (set! (.-y d) (- (.-y d) avg-y)))))))

;; Scaling

(defn scale-graph! [data]
  (let [{:keys [nodes]} (js->clj data :keywordize-keys true)
        shortest-distances (map (partial closest-distance nodes) nodes)
        window-average-short-distance (window-average shortest-distances)
        scale (/ target-short-distance window-average-short-distance)]
    (-> data .-nodes
        (.forEach (fn [d]
                    (set! (.-x d) (* (.-x d) scale))
                    (set! (.-y d) (* (.-y d) scale)))))))

;; Exported layout function

(defn ^:export do-layout! [data]
  (run-force-layout! data)
  (center-nodes! data)
  (scale-graph! data)
  data)
