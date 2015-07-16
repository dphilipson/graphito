(require '[cljs.build.api :as b])

(println "Building ...")

(let [start (System/nanoTime)]
  (b/build "src"
    {:output-to "release/graphito.js"
     :output-dir "release"
     :optimizations :advanced
     :externs ["externs/d3_externs_min.js"
               "externs/rx.all.min.js"
               "externs/hammer.min.js"]
     :verbose true})
  (println "... done. Elapsed" (/ (- (System/nanoTime) start) 1e9) "seconds"))
