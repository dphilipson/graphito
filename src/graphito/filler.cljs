(ns graphito.filler)

(def properties
  [["Eye Color" ["Brown" "Black" "Green" "Hazel"]]
   ["Hair Color" ["Black" "Brown" "Blond" "Red" "Aubergine"]]
   ["Age" (vec (range 16 60))]
   ["Height" (mapv #(str % " in") (range 60 72))]
   ["Weight" (mapv #(str % " lbs") (range 110 225))]
   ["Type" ["Normal" "Fighting" "Flying" "Poison" "Ground" "Rock" "Bug" "Ghost"
           "Steel" "Fire" "Water" "Grass" "Electric" "Psychic" "Ice" "Dragon"
           "Dark" "Fairy"]]])

(def mugshot
  "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")

(defn data-for-title [title]
  (let [title-hash (hash title)]
    {:title title
     :mugshot mugshot
     :properties (mapv (fn [[k v]]
                         {:displayType k
                          :displayValue (v (mod title-hash (count v)))})
                       properties)}))
