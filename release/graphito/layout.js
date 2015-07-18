// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.layout');
goog.require('cljs.core');
graphito.layout.force_layout_charge = (-240);
graphito.layout.force_layout_link_distance = (40);
graphito.layout.force_layout_world_width = (1280);
graphito.layout.force_layout_world_height = (800);
graphito.layout.force_layout_num_ticks = (100);
graphito.layout.low_bound = (0);
graphito.layout.high_bound = 0.5;
graphito.layout.target_short_distance = (160);
graphito.layout.average = (function graphito$layout$average(coll){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,coll) / cljs.core.count(coll));
});
graphito.layout.window_average = (function graphito$layout$window_average(){
var G__4562 = arguments.length;
switch (G__4562) {
case 1:
return graphito.layout.window_average.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return graphito.layout.window_average.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

graphito.layout.window_average.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return graphito.layout.window_average.cljs$core$IFn$_invoke$arity$3(coll,graphito.layout.low_bound,graphito.layout.high_bound);
});

graphito.layout.window_average.cljs$core$IFn$_invoke$arity$3 = (function (coll,low_bound,high_bound){
var low_index = ((cljs.core.count(coll) * low_bound) | (0));
var high_index = ((cljs.core.count(coll) * high_bound) | (0));
return graphito.layout.average(cljs.core.take.cljs$core$IFn$_invoke$arity$2(high_index,cljs.core.drop.cljs$core$IFn$_invoke$arity$2(low_index,cljs.core.sort.cljs$core$IFn$_invoke$arity$1(coll))));
});

graphito.layout.window_average.cljs$lang$maxFixedArity = 3;
graphito.layout.distance = (function graphito$layout$distance(node1,node2){
var dx = (cljs.core.constant$keyword$x.cljs$core$IFn$_invoke$arity$1(node2) - cljs.core.constant$keyword$x.cljs$core$IFn$_invoke$arity$1(node1));
var dy = (cljs.core.constant$keyword$y.cljs$core$IFn$_invoke$arity$1(node2) - cljs.core.constant$keyword$y.cljs$core$IFn$_invoke$arity$1(node1));
var G__4565 = ((dx * dx) + (dy * dy));
return Math.sqrt(G__4565);
});
graphito.layout.closest_distance = (function graphito$layout$closest_distance(nodes,node){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.pos_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(graphito.layout.distance,node),nodes)));
});
graphito.layout.get_force_layout = (function graphito$layout$get_force_layout(){
return d3.layout.force().charge(graphito.layout.force_layout_charge).linkDistance(graphito.layout.force_layout_link_distance).size([graphito.layout.force_layout_world_width,graphito.layout.force_layout_world_height]);
});
graphito.layout.run_force_layout_BANG_ = (function graphito$layout$run_force_layout_BANG_(data){
var n = data.nodes.length;
var force_layout = graphito.layout.get_force_layout();
data.nodes.forEach(((function (n,force_layout){
return (function (d,i){
var val = (i * (graphito.layout.force_layout_world_width / n));
(d["x"] = val);

return (d["y"] = val);
});})(n,force_layout))
);

force_layout.nodes(data.nodes).links(data.links).start();

var n__4306__auto___4566 = graphito.layout.force_layout_num_ticks;
var __4567 = (0);
while(true){
if((__4567 < n__4306__auto___4566)){
force_layout.tick();

var G__4568 = (__4567 + (1));
__4567 = G__4568;
continue;
} else {
}
break;
}

return force_layout.stop();
});
graphito.layout.center_nodes_BANG_ = (function graphito$layout$center_nodes_BANG_(data){
var clj_nodes = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data).call(null,"nodes");
var avg_x = graphito.layout.average(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (clj_nodes){
return (function (p1__4569_SHARP_){
var G__4573 = "x";
return (p1__4569_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__4569_SHARP_.cljs$core$IFn$_invoke$arity$1(G__4573) : p1__4569_SHARP_.call(null,G__4573));
});})(clj_nodes))
,clj_nodes));
var avg_y = graphito.layout.average(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (clj_nodes,avg_x){
return (function (p1__4570_SHARP_){
var G__4574 = "y";
return (p1__4570_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__4570_SHARP_.cljs$core$IFn$_invoke$arity$1(G__4574) : p1__4570_SHARP_.call(null,G__4574));
});})(clj_nodes,avg_x))
,clj_nodes));
return data.nodes.forEach(((function (clj_nodes,avg_x,avg_y){
return (function (d){
d.x = (d.x - avg_x);

return d.y = (d.y - avg_y);
});})(clj_nodes,avg_x,avg_y))
);
});
graphito.layout.scale_graph_BANG_ = (function graphito$layout$scale_graph_BANG_(data){
var map__4576 = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(data,cljs.core.array_seq([cljs.core.constant$keyword$keywordize_DASH_keys,true], 0));
var map__4576__$1 = ((cljs.core.seq_QMARK_(map__4576))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4576):map__4576);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4576__$1,cljs.core.constant$keyword$nodes);
var shortest_distances = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(graphito.layout.closest_distance,nodes),nodes);
var window_average_short_distance = graphito.layout.window_average.cljs$core$IFn$_invoke$arity$1(shortest_distances);
var scale = (graphito.layout.target_short_distance / window_average_short_distance);
return data.nodes.forEach(((function (map__4576,map__4576__$1,nodes,shortest_distances,window_average_short_distance,scale){
return (function (d){
d.x = (d.x * scale);

return d.y = (d.y * scale);
});})(map__4576,map__4576__$1,nodes,shortest_distances,window_average_short_distance,scale))
);
});
graphito.layout.do_layout_BANG_ = (function graphito$layout$do_layout_BANG_(data){
graphito.layout.run_force_layout_BANG_(data);

graphito.layout.center_nodes_BANG_(data);

graphito.layout.scale_graph_BANG_(data);

return data;
});
goog.exportSymbol('graphito.layout.do_layout_BANG_', graphito.layout.do_layout_BANG_);
