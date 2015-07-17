(ns graphito.detail)

(def $ js/$)

(defn ^:export display-modal! [selector data]
  (.modal ($ selector)))
