(require '[cljs.build.api :as b])

(b/watch "src"
  {:main 'graphito.core
   :output-to "out/graphito.js"
   :output-dir "out"})
