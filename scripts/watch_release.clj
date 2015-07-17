(require '[cljs.build.api :as b])

(b/watch
  "src"
  {:output-to "release/graphito.js"
   :output-dir "release"
   :optimizations :advanced
   :externs ["externs/d3_externs.js"
             "externs/rx.all.min.js"
             "externs/hammer.min.js"
             "externs/jquery-1.9.js"
             "externs/bootstrap-modal.js"]})
