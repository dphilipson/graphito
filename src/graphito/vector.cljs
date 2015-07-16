(ns graphito.vector)

(defn create [x y]
  (array x y))

(defn zero []
  (create 0 0))

(defn x [v]
  (aget v 0))

(defn y [v]
  (aget v 1))

(defn copy [v]
  (.slice v))

(defn length-sq [v]
  (let [x (x v)
        y (y v)]
    (+ (* x x) (* y y))))

(def length (comp js/Math.sqrt length-sq))

(defn distance-sq [v1 v2]
  (let [x1 (x v1) y1 (y v1)
        x2 (x v2) y2 (y v2)
        dx (- x2 x1)
        dy (- y2 y1)]
    (+ (* dx dx) (* dy dy))))

(def distance (comp js/Math.sqrt distance-sq))

(defn add
  ([v1 v2]
   (let [x1 (x v1) y1 (y v1)
         x2 (x v2) y2 (y v2)]
     (aset v1 0 (+ x1 x2))
     (aset v1 1 (+ y1 y2))
     v1))
  ([v & vs]
   (doseq [v2 vs]
     (add v v2))
   v))

(defn subtract [v1 v2]
  (let [x1 (x v1) y1 (y v1)
        x2 (x v2) y2 (y v2)]
    (aset v1 0 (- x1 x2))
    (aset v1 1 (- y1 y2))
    v1))

(defn multiply [v c]
  (let [x (x v)
        y (y v)]
    (aset v 0 (* c x))
    (aset v 1 (* c y))
    v))

(defn neg [v]
  (multiply v -1))

(defn set-length [v l]
  (multiply v (/ l (length v))))
