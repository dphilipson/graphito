(require
  '[cljs.build.api :as b]
  '[cljs.repl :as repl]
  '[cljs.repl.browser :as browser])

(b/build "src"
  {:main 'graphito.core
   :output-to "out/graphito.js"
   :output-dir "out"
   :verbose true})

(repl/repl* (browser/repl-env)
  {:output-dir "out"})
