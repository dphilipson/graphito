(ns graphito.detail)

(def $ js/$)
(def d3 js/d3)

(defn ^:export show-modal [selector data]
  (let [{:keys [title properties]} data
        modal (.select d3 selector)
        title-field (.select modal ".modal-title")
        property-container (.select modal ".properties")
        property-selection (-> property-container
                               (.selectAll ".property")
                               (.data (apply array properties)))
        new-property-selection (-> property-selection .enter
                                   (.append "div")
                                   (.classed (js-obj "property" true
                                                     "row" true)))]
    (.text title-field title)
    (-> new-property-selection (.append "div")
        (.classed "col-xs-4" true)
        (.append "strong")
        (.classed "property-type" true))
    (-> new-property-selection (.append "div")
        (.classed (js-obj "property-value" true
                          "col-xs-8" true)))
    (-> property-selection (.selectAll ".property-type")
        (.text #(:displayType %)))
    (-> property-selection (.selectAll ".property-value")
        (.text #(:displayValue %)))
    (-> property-selection .exit .remove))
  (.modal ($ selector)))

(defn ^:export show-modal-js [selector js-data]
  (show-modal selector (js->clj js-data :keywordize-keys true)))
