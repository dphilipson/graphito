// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.detail');
goog.require('cljs.core');
graphito.detail.$ = $;
graphito.detail.d3 = d3;
graphito.detail.show_modal = (function graphito$detail$show_modal(selector,data){
var map__4488_4494 = data;
var map__4488_4495__$1 = ((cljs.core.seq_QMARK_(map__4488_4494))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4488_4494):map__4488_4494);
var title_4496 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4488_4495__$1,cljs.core.constant$keyword$title);
var properties_4497 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4488_4495__$1,cljs.core.constant$keyword$properties);
var mugshot_4498 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4488_4495__$1,cljs.core.constant$keyword$mugshot);
var modal_4499 = graphito.detail.d3.select(selector);
var title_field_4500 = modal_4499.select(".modal-title");
var mugshot_field_4501 = modal_4499.select(".mugshot");
var property_container_4502 = modal_4499.select(".properties");
var property_selection_4503 = property_container_4502.selectAll(".property").data(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array,properties_4497));
var new_property_selection_4504 = property_selection_4503.enter().append("div").classed((function (){var obj4490 = {"property":true,"row":true};
return obj4490;
})());
title_field_4500.text(title_4496);

mugshot_field_4501.classed("hidden",(mugshot_4498 == null)).attr("src",(cljs.core.truth_(mugshot_4498)?[cljs.core.str("data:image/png;base64, "),cljs.core.str(mugshot_4498)].join(''):null));

new_property_selection_4504.append("div").classed("col-xs-4",true).append("strong").classed("property-type",true);

new_property_selection_4504.append("div").classed((function (){var obj4492 = {"property-value":true,"col-xs-7":true,"col-xs-offset-1":true};
return obj4492;
})());

property_selection_4503.select(".property-type").text(((function (map__4488_4494,map__4488_4495__$1,title_4496,properties_4497,mugshot_4498,modal_4499,title_field_4500,mugshot_field_4501,property_container_4502,property_selection_4503,new_property_selection_4504){
return (function (p1__4480_SHARP_){
return cljs.core.constant$keyword$displayType.cljs$core$IFn$_invoke$arity$1(p1__4480_SHARP_);
});})(map__4488_4494,map__4488_4495__$1,title_4496,properties_4497,mugshot_4498,modal_4499,title_field_4500,mugshot_field_4501,property_container_4502,property_selection_4503,new_property_selection_4504))
);

property_selection_4503.select(".property-value").text(((function (map__4488_4494,map__4488_4495__$1,title_4496,properties_4497,mugshot_4498,modal_4499,title_field_4500,mugshot_field_4501,property_container_4502,property_selection_4503,new_property_selection_4504){
return (function (p1__4481_SHARP_){
return cljs.core.constant$keyword$displayValue.cljs$core$IFn$_invoke$arity$1(p1__4481_SHARP_);
});})(map__4488_4494,map__4488_4495__$1,title_4496,properties_4497,mugshot_4498,modal_4499,title_field_4500,mugshot_field_4501,property_container_4502,property_selection_4503,new_property_selection_4504))
);

property_selection_4503.exit().remove();

return (function (){var G__4493 = selector;
return (graphito.detail.$.cljs$core$IFn$_invoke$arity$1 ? graphito.detail.$.cljs$core$IFn$_invoke$arity$1(G__4493) : graphito.detail.$.call(null,G__4493));
})().modal();
});
goog.exportSymbol('graphito.detail.show_modal', graphito.detail.show_modal);
graphito.detail.show_modal_js = (function graphito$detail$show_modal_js(selector,js_data){
return graphito.detail.show_modal(selector,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(js_data,cljs.core.array_seq([cljs.core.constant$keyword$keywordize_DASH_keys,true], 0)));
});
goog.exportSymbol('graphito.detail.show_modal_js', graphito.detail.show_modal_js);
