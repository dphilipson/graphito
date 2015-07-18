// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.core');
goog.require('cljs.core');
goog.require('graphito.detail');
goog.require('clojure.browser.repl');
goog.require('graphito.vector');
goog.require('graphito.generate');
goog.require('graphito.layout');
goog.require('graphito.filler');
cljs.core.enable_console_print_BANG_();
graphito.core.p = (function graphito$core$p(){
var argseq__4397__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return graphito.core.p.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4397__auto__);
});

graphito.core.p.cljs$core$IFn$_invoke$arity$variadic = (function (message,f,args){
var ret = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,args);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([message,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,args)], 0));

return ret;
});

graphito.core.p.cljs$lang$maxFixedArity = (2);

graphito.core.p.cljs$lang$applyTo = (function (seq12069){
var G__12070 = cljs.core.first(seq12069);
var seq12069__$1 = cljs.core.next(seq12069);
var G__12071 = cljs.core.first(seq12069__$1);
var seq12069__$2 = cljs.core.next(seq12069__$1);
return graphito.core.p.cljs$core$IFn$_invoke$arity$variadic(G__12070,G__12071,seq12069__$2);
});
graphito.core.d3 = d3;
graphito.core.rx_observable = Rx.Observable;
graphito.core.world_width = (1280);
graphito.core.world_height = (800);
graphito.core.graph_force_ticks = (100);
graphito.core.update_interval_ms = (15);
graphito.core.transition_duration_ms = (500);
graphito.core.swipe_damping_factor = 0.75;
graphito.core.min_slide_speed_sq = (16);
graphito.core.displacement_factor = (1);
graphito.core.max_radius = (32);
graphito.core.link_width = (3);
graphito.core.selected_link_width = (5);
graphito.core.label_font = "Verdana";
graphito.core.label_font_size = (24);
graphito.core.hitbox_size = (96);
graphito.core.deselection_distance = 0.4;
graphito.core.background_color = "#EDF0F2";
graphito.core.link_color = "#C9CBCB";
graphito.core.selected_link_color = "#a7b6c2";
graphito.core.node_color = "#777A7A";
graphito.core.node_label_color = graphito.core.node_color;
graphito.core.selected_node_color = "#FE9F51";
graphito.core.label_y = (42);
graphito.core.label_y_transform = [cljs.core.str("translate(0,"),cljs.core.str(graphito.core.label_y),cljs.core.str(")")].join('');
graphito.core.label_visible_threshold = 1.5;
graphito.core.zoom_out_scale = 0.25;
graphito.core.resize_delay_ms = (100);
graphito.core.disable_touchmove_BANG_ = (function graphito$core$disable_touchmove_BANG_(container){
return container.on("touchmove",(function (){
return graphito.core.d3.event.preventDefault();
}));
});
graphito.core.add_background_BANG_ = (function graphito$core$add_background_BANG_(svg){
return svg.append("rect").attr("class","background").attr("fill",graphito.core.background_color).attr("stroke",(0));
});
graphito.core.setup_svg_BANG_ = (function graphito$core$setup_svg_BANG_(selector){
var container = graphito.core.d3.select(selector);
var svg = container.append("svg");
graphito.core.disable_touchmove_BANG_(container);

graphito.core.add_background_BANG_(svg);

return svg;
});
graphito.core.scroll_scale_for_state = (function graphito$core$scroll_scale_for_state(state){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$zoom_DASH_out,cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1(state))){
return graphito.core.zoom_out_scale;
} else {
return (1);
}
});
graphito.core.zoom_out__GT_world_pos = (function graphito$core$zoom_out__GT_world_pos(state,pos){
var map__12073 = state;
var map__12073__$1 = ((cljs.core.seq_QMARK_(map__12073))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12073):map__12073);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12073__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12073__$1,cljs.core.constant$keyword$view_DASH_size);
var view_center = graphito.vector.multiply(graphito.vector.copy(view_size),0.5);
var displacement = graphito.vector.neg(graphito.vector.subtract(view_center,pos));
return graphito.vector.add.cljs$core$IFn$_invoke$arity$2(graphito.vector.multiply(displacement,((1) / graphito.core.zoom_out_scale)),camera_pos);
});
/**
 * Returns the distance of the given point from the camera, scaled so that
 * points which would be at the corner of the screen are at distance 1
 */
graphito.core.scaled_distance_from_camera = (function graphito$core$scaled_distance_from_camera(state,pos){
var map__12078 = state;
var map__12078__$1 = ((cljs.core.seq_QMARK_(map__12078))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12078):map__12078);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12078__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12078__$1,cljs.core.constant$keyword$view_DASH_size);
var corner_distance = ((function (){var G__12079 = view_size;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__12079) : graphito.vector.length.call(null,G__12079));
})() / (2));
return ((function (){var G__12080 = camera_pos;
var G__12081 = pos;
return (graphito.vector.distance.cljs$core$IFn$_invoke$arity$2 ? graphito.vector.distance.cljs$core$IFn$_invoke$arity$2(G__12080,G__12081) : graphito.vector.distance.call(null,G__12080,G__12081));
})() / corner_distance);
});
graphito.core.elliptic_distance_from_camera = (function graphito$core$elliptic_distance_from_camera(state,pos){

var map__12084 = state;
var map__12084__$1 = ((cljs.core.seq_QMARK_(map__12084))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12084):map__12084);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12084__$1,cljs.core.constant$keyword$view_DASH_size);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12084__$1,cljs.core.constant$keyword$camera_DASH_pos);
var rx = (graphito.vector.x(view_size) / (2));
var ry = (graphito.vector.y(view_size) / (2));
var sq = ((function (map__12084,map__12084__$1,view_size,camera_pos,rx,ry){
return (function (x){
return (x * x);
});})(map__12084,map__12084__$1,view_size,camera_pos,rx,ry))
;
var displacement = graphito.vector.subtract(graphito.vector.copy(pos),camera_pos);
var x = graphito.vector.x(displacement);
var y = graphito.vector.y(displacement);
var G__12085 = ((sq(x) / sq(rx)) + (sq(y) / sq(ry)));
return Math.sqrt(G__12085);
});
graphito.core.project_displacement = (function graphito$core$project_displacement(t){
if((t <= 0.5)){
return t;
} else {
if(((0.5 <= t)) && ((t <= (1)))){
return (0.5 + ((t - 0.5) / (2)));
} else {
if((((1) <= t)) && ((t <= 1.5))){
return (0.75 + ((t - (1)) / (4)));
} else {
if(((1.5 <= t)) && ((t <= 2.5))){
return (0.875 + ((t - 1.5) / (8)));
} else {
return (1);

}
}
}
}
});
graphito.core.view_position = (function graphito$core$view_position(state,pos,projector){
var map__12089 = state;
var map__12089__$1 = ((cljs.core.seq_QMARK_(map__12089))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12089):map__12089);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12089__$1,cljs.core.constant$keyword$view_DASH_size);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12089__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_center = graphito.vector.multiply(graphito.vector.copy(view_size),0.5);
var corner_distance = (function (){var G__12090 = view_center;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__12090) : graphito.vector.length.call(null,G__12090));
})();
var displacement = graphito.vector.subtract(graphito.vector.copy(pos),camera_pos);
var r = graphito.core.scaled_distance_from_camera(state,pos);
var projected_r = (function (){var G__12091 = r;
return (projector.cljs$core$IFn$_invoke$arity$1 ? projector.cljs$core$IFn$_invoke$arity$1(G__12091) : projector.call(null,G__12091));
})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(r,(0))){
return view_center;
} else {
return graphito.vector.add.cljs$core$IFn$_invoke$arity$2(view_center,graphito.vector.multiply(displacement,(projected_r / r)));
}
});
graphito.core.project_scale = (function graphito$core$project_scale(t){
var x__3956__auto__ = (1);
var y__3957__auto__ = ((1) / Math.pow((2),((2) * (t - 0.25))));
return ((x__3956__auto__ < y__3957__auto__) ? x__3956__auto__ : y__3957__auto__);
});
graphito.core.project_opacity = (function graphito$core$project_opacity(t){
if((t <= (1))){
return (1);
} else {
if((((1) <= t)) && ((t <= (2)))){
return ((1) - ((t - (1)) / (4)));
} else {
if((((2) <= t)) && ((t <= (3)))){
return (0.75 - (0.75 * (t - (2))));
} else {
return (0);

}
}
}
});
graphito.core.project_label_opacity = (function graphito$core$project_label_opacity(t){
if((t <= (1))){
return (1);
} else {
if((((1) <= t)) && ((t <= 1.5))){
return ((3) - ((2) * t));
} else {
return (0);

}
}
});
graphito.core.fisheye_projectors = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.constant$keyword$project_DASH_displacement,graphito.core.project_displacement,cljs.core.constant$keyword$project_DASH_scale,graphito.core.project_scale,cljs.core.constant$keyword$project_DASH_opacity,graphito.core.project_opacity,cljs.core.constant$keyword$project_DASH_label_DASH_opacity,graphito.core.project_label_opacity], null);
graphito.core.zoom_out_projectors = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.constant$keyword$project_DASH_displacement,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,graphito.core.zoom_out_scale),cljs.core.constant$keyword$project_DASH_scale,cljs.core.constantly(graphito.core.zoom_out_scale),cljs.core.constant$keyword$project_DASH_opacity,cljs.core.constantly((1)),cljs.core.constant$keyword$project_DASH_label_DASH_opacity,cljs.core.constantly((0))], null);
graphito.core.projectors_for_state = (function graphito$core$projectors_for_state(state){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1(state),cljs.core.constant$keyword$fisheye)){
return graphito.core.fisheye_projectors;
} else {
return graphito.core.zoom_out_projectors;
}
});
graphito.core.center_detail_button_BANG_ = (function graphito$core$center_detail_button_BANG_(detail_button){
var width = detail_button.node().offsetWidth;
return detail_button.style("margin-left",[cljs.core.str((width / (-2))),cljs.core.str("px")].join(''));
});
graphito.core.sync_detail_button_BANG_ = (function graphito$core$sync_detail_button_BANG_(state){
var map__12093 = state;
var map__12093__$1 = ((cljs.core.seq_QMARK_(map__12093))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12093):map__12093);
var detail_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12093__$1,cljs.core.constant$keyword$detail_DASH_button);
var selected_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12093__$1,cljs.core.constant$keyword$selected_DASH_node);
detail_button.classed("hidden",(selected_node == null));

if((selected_node == null)){
return null;
} else {
detail_button.text([cljs.core.str("View \""),cljs.core.str(cljs.core.constant$keyword$title.cljs$core$IFn$_invoke$arity$1(selected_node)),cljs.core.str("\"")].join(''));

return graphito.core.center_detail_button_BANG_(detail_button);
}
});
graphito.core.sync_graph_BANG_ = (function graphito$core$sync_graph_BANG_(){
var argseq__4397__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4397__auto__);
});

graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,p__12104){
var map__12105 = p__12104;
var map__12105__$1 = ((cljs.core.seq_QMARK_(map__12105))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12105):map__12105);
var animate_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12105__$1,cljs.core.constant$keyword$animate_QMARK_);
var map__12106 = state;
var map__12106__$1 = ((cljs.core.seq_QMARK_(map__12106))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12106):map__12106);
var svg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$svg);
var detail_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$detail_DASH_button);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$nodes);
var links = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$links);
var selected_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$selected_DASH_node);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$view_DASH_size);
var projection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$projection);
var animation_subject = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12106__$1,cljs.core.constant$keyword$animation_DASH_subject);
var map__12107 = graphito.core.projectors_for_state(state);
var map__12107__$1 = ((cljs.core.seq_QMARK_(map__12107))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12107):map__12107);
var project_displacement = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12107__$1,cljs.core.constant$keyword$project_DASH_displacement);
var project_scale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12107__$1,cljs.core.constant$keyword$project_DASH_scale);
var project_opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12107__$1,cljs.core.constant$keyword$project_DASH_opacity);
var project_label_opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12107__$1,cljs.core.constant$keyword$project_DASH_label_DASH_opacity);
var transition = ((function (map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12094_SHARP_){
return p1__12094_SHARP_.transition().duration(graphito.core.transition_duration_ms);
});})(map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,map__12105,map__12105__$1,animate_QMARK_))
;
var maybe_transition = (cljs.core.truth_(animate_QMARK_)?transition:cljs.core.identity);
var positions = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
return graphito.core.view_position(state,cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node),project_displacement);
});})(map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,map__12105,map__12105__$1,animate_QMARK_))
,nodes);
var distances_from_camera = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
return graphito.core.scaled_distance_from_camera(state,cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node));
});})(map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,map__12105,map__12105__$1,animate_QMARK_))
,nodes);
var distance_for_node = ((function (map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
var G__12108 = cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(node);
return (distances_from_camera.cljs$core$IFn$_invoke$arity$1 ? distances_from_camera.cljs$core$IFn$_invoke$arity$1(G__12108) : distances_from_camera.call(null,G__12108));
});})(map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,map__12105,map__12105__$1,animate_QMARK_))
;
var link_selection_12123 = svg.selectAll(".link").data(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array,links));
link_selection_12123.enter().append("line").attr("class","link").style("stroke",graphito.core.link_color).style("stroke-width",(3));

link_selection_12123.style("stroke",graphito.core.link_color).style("stroke-width",graphito.core.link_width).filter(((function (link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (link){
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(link),cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(selected_node))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(link),cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(selected_node)));
});})(link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).style("stroke",graphito.core.selected_link_color).style("stroke-width",graphito.core.selected_link_width);

(function (){var G__12109 = link_selection_12123;
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__12109) : maybe_transition.call(null,G__12109));
})().attr("x1",((function (link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12095_SHARP_){
return graphito.vector.x((function (){var G__12110 = cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(p1__12095_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12110) : positions.call(null,G__12110));
})());
});})(link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).attr("y1",((function (link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12096_SHARP_){
return graphito.vector.y((function (){var G__12111 = cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(p1__12096_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12111) : positions.call(null,G__12111));
})());
});})(link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).attr("x2",((function (link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12097_SHARP_){
return graphito.vector.x((function (){var G__12112 = cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(p1__12097_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12112) : positions.call(null,G__12112));
})());
});})(link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).attr("y2",((function (link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12098_SHARP_){
return graphito.vector.y((function (){var G__12113 = cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(p1__12098_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12113) : positions.call(null,G__12113));
})());
});})(link_selection_12123,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
);

var node_selection_12124 = svg.selectAll(".node").data(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array,nodes));
var new_node_selection_12125 = node_selection_12124.enter().append("g").attr("class","node");
new_node_selection_12125.append("circle").attr("class","node-dot").attr("r",graphito.core.max_radius);

node_selection_12124.filter(((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
var elem = this;
return ((distance_for_node(node) < graphito.core.label_visible_threshold)) && ((elem.querySelector(".node-label") == null));
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).append("text").attr("class","node-label").attr("dy",".6em").style("font-family",graphito.core.label_font).style("font-size",[cljs.core.str(graphito.core.label_font_size)].join('')).style("text-anchor","middle").style("fill",graphito.core.node_label_color).attr("y",graphito.core.label_y);

node_selection_12124.filter(((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12099_SHARP_){
return (distance_for_node(p1__12099_SHARP_) >= graphito.core.label_visible_threshold);
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).selectAll(".node-label").remove();

(function (){var G__12114 = node_selection_12124.style("fill",((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12100_SHARP_){
if((p1__12100_SHARP_ === selected_node)){
return graphito.core.selected_node_color;
} else {
return graphito.core.node_color;
}
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
);
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__12114) : maybe_transition.call(null,G__12114));
})().attr("transform",((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
var i = cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(node);
var scale = (function (){var G__12115 = (function (){var G__12116 = i;
return (distances_from_camera.cljs$core$IFn$_invoke$arity$1 ? distances_from_camera.cljs$core$IFn$_invoke$arity$1(G__12116) : distances_from_camera.call(null,G__12116));
})();
return (project_scale.cljs$core$IFn$_invoke$arity$1 ? project_scale.cljs$core$IFn$_invoke$arity$1(G__12115) : project_scale.call(null,G__12115));
})();
var x = graphito.vector.x((function (){var G__12117 = i;
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12117) : positions.call(null,G__12117));
})());
var y = graphito.vector.y((function (){var G__12118 = i;
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__12118) : positions.call(null,G__12118));
})());
return [cljs.core.str("translate("),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y),cljs.core.str(") scale("),cljs.core.str(scale),cljs.core.str(")")].join('');
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
);

(function (){var G__12119 = node_selection_12124.selectAll(".node-label");
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__12119) : maybe_transition.call(null,G__12119));
})().attr("opacity",((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
var G__12120 = distance_for_node(node);
return (project_label_opacity.cljs$core$IFn$_invoke$arity$1 ? project_label_opacity.cljs$core$IFn$_invoke$arity$1(G__12120) : project_label_opacity.call(null,G__12120));
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).attr("font-weight",((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (node){
if((node === selected_node)){
return "bold";
} else {
return "normal";
}
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
).text(((function (node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (p1__12101_SHARP_){
return cljs.core.constant$keyword$title.cljs$core$IFn$_invoke$arity$1(p1__12101_SHARP_);
});})(node_selection_12124,new_node_selection_12125,map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
);

if(cljs.core.truth_(animate_QMARK_)){
animation_subject.onNext(cljs.core.constant$keyword$animation_DASH_start);

var G__12121 = ((function (map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_){
return (function (){
return animation_subject.onNext(cljs.core.constant$keyword$animation_DASH_end);
});})(map__12106,map__12106__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__12107,map__12107__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__12105,map__12105__$1,animate_QMARK_))
;
var G__12122 = graphito.core.transition_duration_ms;
return setTimeout(G__12121,G__12122);
} else {
return null;
}
});

graphito.core.sync_graph_BANG_.cljs$lang$maxFixedArity = (1);

graphito.core.sync_graph_BANG_.cljs$lang$applyTo = (function (seq12102){
var G__12103 = cljs.core.first(seq12102);
var seq12102__$1 = cljs.core.next(seq12102);
return graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12103,seq12102__$1);
});
graphito.core.initial_state = (function graphito$core$initial_state(svg,detail_button,animation_subject){
return cljs.core.PersistentHashMap.fromArrays([cljs.core.constant$keyword$view_DASH_size,cljs.core.constant$keyword$detail_DASH_button,cljs.core.constant$keyword$camera_DASH_pos,cljs.core.constant$keyword$nodes,cljs.core.constant$keyword$animation_DASH_subject,cljs.core.constant$keyword$svg,cljs.core.constant$keyword$selected_DASH_node,cljs.core.constant$keyword$projection,cljs.core.constant$keyword$links],[graphito.vector.zero(),detail_button,graphito.vector.zero(),cljs.core.PersistentVector.EMPTY,animation_subject,svg,null,cljs.core.constant$keyword$fisheye,cljs.core.PersistentVector.EMPTY]);
});
graphito.core.deselect_node_if_away_BANG_ = (function graphito$core$deselect_node_if_away_BANG_(current_state){
var temp__4425__auto__ = cljs.core.constant$keyword$selected_DASH_node.cljs$core$IFn$_invoke$arity$1((function (){var G__12131 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12131) : cljs.core.deref.call(null,G__12131));
})());
if(cljs.core.truth_(temp__4425__auto__)){
var selected_node = temp__4425__auto__;
if(((graphito.core.scaled_distance_from_camera((function (){var G__12134 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12134) : cljs.core.deref.call(null,G__12134));
})(),cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(selected_node)) > graphito.core.deselection_distance)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__12135 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12135) : cljs.core.deref.call(null,G__12135));
})()),cljs.core.constant$keyword$fisheye))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(current_state,cljs.core.assoc,cljs.core.constant$keyword$selected_DASH_node,null);
} else {
return null;
}
} else {
return null;
}
});
graphito.core.enforce_state_invariants_BANG_ = (function graphito$core$enforce_state_invariants_BANG_(current_state){
return graphito.core.deselect_node_if_away_BANG_(current_state);
});
graphito.core.swap_state_BANG_ = (function graphito$core$swap_state_BANG_(){
var argseq__4397__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4397__auto__);
});

graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (current_state,f,args){
cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.swap_BANG_,current_state,f,args);

graphito.core.enforce_state_invariants_BANG_(current_state);

graphito.core.sync_graph_BANG_((function (){var G__12139 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12139) : cljs.core.deref.call(null,G__12139));
})());

return graphito.core.sync_detail_button_BANG_((function (){var G__12140 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12140) : cljs.core.deref.call(null,G__12140));
})());
});

graphito.core.swap_state_BANG_.cljs$lang$maxFixedArity = (2);

graphito.core.swap_state_BANG_.cljs$lang$applyTo = (function (seq12136){
var G__12137 = cljs.core.first(seq12136);
var seq12136__$1 = cljs.core.next(seq12136);
var G__12138 = cljs.core.first(seq12136__$1);
var seq12136__$2 = cljs.core.next(seq12136__$1);
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12137,G__12138,seq12136__$2);
});
graphito.core.swap_state_animated_BANG_ = (function graphito$core$swap_state_animated_BANG_(){
var argseq__4397__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4397__auto__);
});

graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (current_state,f,args){
cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.swap_BANG_,current_state,f,args);

graphito.core.enforce_state_invariants_BANG_(current_state);

graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic((function (){var G__12144 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12144) : cljs.core.deref.call(null,G__12144));
})(),cljs.core.array_seq([cljs.core.constant$keyword$animate_QMARK_,true], 0));

return graphito.core.sync_detail_button_BANG_((function (){var G__12145 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12145) : cljs.core.deref.call(null,G__12145));
})());
});

graphito.core.swap_state_animated_BANG_.cljs$lang$maxFixedArity = (2);

graphito.core.swap_state_animated_BANG_.cljs$lang$applyTo = (function (seq12141){
var G__12142 = cljs.core.first(seq12141);
var seq12141__$1 = cljs.core.next(seq12141);
var G__12143 = cljs.core.first(seq12141__$1);
var seq12141__$2 = cljs.core.next(seq12141__$1);
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12142,G__12143,seq12141__$2);
});
graphito.core.set_graph_BANG_ = (function graphito$core$set_graph_BANG_(current_state,p__12146){
var map__12148 = p__12146;
var map__12148__$1 = ((cljs.core.seq_QMARK_(map__12148))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12148):map__12148);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12148__$1,cljs.core.constant$keyword$nodes);
var links = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12148__$1,cljs.core.constant$keyword$links);
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$nodes,nodes,cljs.core.constant$keyword$links,links], 0));
});
graphito.core.move_camera_BANG_ = (function graphito$core$move_camera_BANG_(current_state,d){
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.update,cljs.core.array_seq([cljs.core.constant$keyword$camera_DASH_pos,graphito.vector.add,graphito.vector.multiply(graphito.vector.copy(d),((1) / graphito.core.scroll_scale_for_state((function (){var G__12150 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12150) : cljs.core.deref.call(null,G__12150));
})())))], 0));
});
graphito.core.set_projection_BANG_ = (function graphito$core$set_projection_BANG_(current_state,projection){
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$projection,projection], 0));
});
graphito.core.toggle_projection_BANG_ = (function graphito$core$toggle_projection_BANG_(current_state){
var projection = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__12152 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12152) : cljs.core.deref.call(null,G__12152));
})()),cljs.core.constant$keyword$fisheye))?cljs.core.constant$keyword$zoom_DASH_out:cljs.core.constant$keyword$fisheye);
return graphito.core.set_projection_BANG_(current_state,projection);
});
graphito.core.zoom_in_to_pos_BANG_ = (function graphito$core$zoom_in_to_pos_BANG_(current_state,pos){
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$projection,cljs.core.constant$keyword$fisheye,cljs.core.constant$keyword$camera_DASH_pos,graphito.vector.copy(pos)], 0));
});
graphito.core.select_and_zoom_to_node_BANG_ = (function graphito$core$select_and_zoom_to_node_BANG_(){
var argseq__4397__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return graphito.core.select_and_zoom_to_node_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4397__auto__);
});

graphito.core.select_and_zoom_to_node_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (current_state,node,p__12156){
var map__12157 = p__12156;
var map__12157__$1 = ((cljs.core.seq_QMARK_(map__12157))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12157):map__12157);
var disable_animation_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12157__$1,cljs.core.constant$keyword$disable_DASH_animation_QMARK_);
var swap_fn = (cljs.core.truth_(disable_animation_QMARK_)?graphito.core.swap_state_BANG_:graphito.core.swap_state_animated_BANG_);
var G__12158 = current_state;
var G__12159 = cljs.core.assoc;
var G__12160 = cljs.core.constant$keyword$projection;
var G__12161 = cljs.core.constant$keyword$fisheye;
var G__12162 = cljs.core.constant$keyword$camera_DASH_pos;
var G__12163 = graphito.vector.copy(cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node));
var G__12164 = cljs.core.constant$keyword$selected_DASH_node;
var G__12165 = node;
return (swap_fn.cljs$core$IFn$_invoke$arity$8 ? swap_fn.cljs$core$IFn$_invoke$arity$8(G__12158,G__12159,G__12160,G__12161,G__12162,G__12163,G__12164,G__12165) : swap_fn.call(null,G__12158,G__12159,G__12160,G__12161,G__12162,G__12163,G__12164,G__12165));
});

graphito.core.select_and_zoom_to_node_BANG_.cljs$lang$maxFixedArity = (2);

graphito.core.select_and_zoom_to_node_BANG_.cljs$lang$applyTo = (function (seq12153){
var G__12154 = cljs.core.first(seq12153);
var seq12153__$1 = cljs.core.next(seq12153);
var G__12155 = cljs.core.first(seq12153__$1);
var seq12153__$2 = cljs.core.next(seq12153__$1);
return graphito.core.select_and_zoom_to_node_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__12154,G__12155,seq12153__$2);
});
graphito.core.node = (function graphito$core$node(index,title,data,x,y){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.constant$keyword$index,index,cljs.core.constant$keyword$title,title,cljs.core.constant$keyword$data,data,cljs.core.constant$keyword$pos,graphito.vector.create(x,y)], null);
});
/**
 * Source and target are indexes into the list of nodes.
 */
graphito.core.link = (function graphito$core$link(source,target){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$source,source,cljs.core.constant$keyword$target,target], null);
});
graphito.core.parse_js_graph = (function graphito$core$parse_js_graph(js_graph){
var data_links = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1((js_graph["links"]));
var links = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (data_links){
return (function (l){
return graphito.core.link((function (){var G__12172 = "source";
return (l.cljs$core$IFn$_invoke$arity$1 ? l.cljs$core$IFn$_invoke$arity$1(G__12172) : l.call(null,G__12172));
})(),(function (){var G__12173 = "target";
return (l.cljs$core$IFn$_invoke$arity$1 ? l.cljs$core$IFn$_invoke$arity$1(G__12173) : l.call(null,G__12173));
})());
});})(data_links))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (data_links){
return (function (link){
return (((function (){var G__12176 = "value";
return (link.cljs$core$IFn$_invoke$arity$1 ? link.cljs$core$IFn$_invoke$arity$1(G__12176) : link.call(null,G__12176));
})() == null)) || (((function (){var G__12177 = "value";
return (link.cljs$core$IFn$_invoke$arity$1 ? link.cljs$core$IFn$_invoke$arity$1(G__12177) : link.call(null,G__12177));
})() >= (4)));
});})(data_links))
,data_links));
graphito.layout.do_layout_BANG_(js_graph);

var data_nodes = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic((js_graph["nodes"]),cljs.core.array_seq([cljs.core.constant$keyword$keywordize_DASH_keys,true], 0));
var nodes = cljs.core.vec(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (data_nodes,data_links,links){
return (function (i,data_node){
return graphito.core.node(i,cljs.core.constant$keyword$name.cljs$core$IFn$_invoke$arity$1(data_node),cljs.core.constant$keyword$data.cljs$core$IFn$_invoke$arity$1(data_node),cljs.core.constant$keyword$x.cljs$core$IFn$_invoke$arity$1(data_node),cljs.core.constant$keyword$y.cljs$core$IFn$_invoke$arity$1(data_node));
});})(data_nodes,data_links,links))
,data_nodes));
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$nodes,nodes,cljs.core.constant$keyword$links,links], null);
});
graphito.core.load_graph = (function graphito$core$load_graph(json_file,callback){
return graphito.core.d3.json(json_file,(function (js_graph){
var G__12179 = js_graph;
return (callback.cljs$core$IFn$_invoke$arity$1 ? callback.cljs$core$IFn$_invoke$arity$1(G__12179) : callback.call(null,G__12179));
}));
});
graphito.core.tick_observable = (function (){var G__12180 = graphito.core.update_interval_ms;
return Rx.Observable.interval(G__12180);
})();
graphito.core.set_size_BANG_ = (function graphito$core$set_size_BANG_(current_state,width,height){
var svg = cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1((function (){var G__12182 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12182) : cljs.core.deref.call(null,G__12182));
})());
var background = svg.select(".background");
svg.attr("width",width).attr("height",height);

return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$view_DASH_size,graphito.vector.create(width,height)], 0));
});
graphito.core.sync_on_window_size_BANG_ = (function graphito$core$sync_on_window_size_BANG_(current_state){
return graphito.core.set_size_BANG_(current_state,window.innerWidth,window.innerHeight);
});
graphito.core.sync_on_container_size_BANG_ = (function graphito$core$sync_on_container_size_BANG_(current_state,selector){
var container = graphito.core.d3.select(selector);
var element = container.node();
var width = element.clientWidth;
var height = element.clientHeight;
return graphito.core.set_size_BANG_(current_state,width,height);
});
graphito.core.resize_observable = graphito.core.rx_observable.fromEvent(window,"resize").debounce(graphito.core.resize_delay_ms);
graphito.core.respond_to_resize_BANG_ = (function graphito$core$respond_to_resize_BANG_(current_state){
return graphito.core.resize_observable.subscribe((function (){
return graphito.core.sync_on_window_size_BANG_(current_state);
}));
});
graphito.core.animation_subject = (function graphito$core$animation_subject(){
return (new Rx.BehaviorSubject(cljs.core.constant$keyword$animation_DASH_end));
});
graphito.core.suppress_while_animating = (function graphito$core$suppress_while_animating(observable,animation_observable){
return animation_observable.flatMapLatest((function (e){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e,cljs.core.constant$keyword$animation_DASH_start)){
return graphito.core.rx_observable.empty();
} else {
return observable;
}
}));
});
graphito.core.key_down_observable = graphito.core.rx_observable.fromEvent(document,"keydown");
graphito.core.key_up_observable = graphito.core.rx_observable.fromEvent(document,"keyup");
/**
 * An observable of what keys are currently pressed
 */
graphito.core.keys_observable = graphito.core.key_down_observable.merge(graphito.core.key_up_observable).scan((function (ks,e){
var G__12183 = e.type;
switch (G__12183) {
case "keydown":
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ks,e.keyCode);

break;
case "keyup":
return cljs.core.disj.cljs$core$IFn$_invoke$arity$2(ks,e.keyCode);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(e.type)].join('')));

}
}),cljs.core.PersistentHashSet.EMPTY).distinctUntilChanged();
graphito.core.arrow_codes = new cljs.core.PersistentArrayMap(null, 8, [(37),cljs.core.constant$keyword$left,(38),cljs.core.constant$keyword$up,(39),cljs.core.constant$keyword$right,(40),cljs.core.constant$keyword$down,(65),cljs.core.constant$keyword$left,(87),cljs.core.constant$keyword$up,(68),cljs.core.constant$keyword$right,(83),cljs.core.constant$keyword$down], null);
graphito.core.arrow_keys_observable = graphito.core.keys_observable.map((function (p1__12185_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.not,cljs.core.nil_QMARK_),cljs.core.map.cljs$core$IFn$_invoke$arity$2(graphito.core.arrow_codes,p1__12185_SHARP_)));
}));
graphito.core.move_camera_on_arrow_keys_BANG_ = (function graphito$core$move_camera_on_arrow_keys_BANG_(current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.arrow_keys_observable.flatMapLatest((function (arrows){
if(cljs.core.empty_QMARK_(arrows)){
return graphito.core.rx_observable.empty();
} else {
return graphito.core.tick_observable.map(cljs.core.constantly(arrows));
}
})),animation_observable).subscribe((function (arrows){
var dx = ((cljs.core.truth_((function (){var G__12190 = cljs.core.constant$keyword$left;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__12190) : arrows.call(null,G__12190));
})())?(-10):(0)) + (cljs.core.truth_((function (){var G__12191 = cljs.core.constant$keyword$right;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__12191) : arrows.call(null,G__12191));
})())?(10):(0)));
var dy = ((cljs.core.truth_((function (){var G__12192 = cljs.core.constant$keyword$up;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__12192) : arrows.call(null,G__12192));
})())?(-10):(0)) + (cljs.core.truth_((function (){var G__12193 = cljs.core.constant$keyword$down;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__12193) : arrows.call(null,G__12193));
})())?(10):(0)));
return graphito.core.move_camera_BANG_(current_state,graphito.vector.create(dx,dy));
}));
});
graphito.core.switch_zoom_on_spacebar_BANG_ = (function graphito$core$switch_zoom_on_spacebar_BANG_(current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.key_up_observable.filter((function (p1__12194_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((32),p1__12194_SHARP_.keyCode);
})),animation_observable).subscribe((function (){
return graphito.core.toggle_projection_BANG_(current_state);
}));
});
graphito.core.hammer_manager = (function graphito$core$hammer_manager(svg){
var manager = (new Hammer.Manager(svg.node()));
manager.add((new Hammer.Pan((function (){var obj12202 = {"threshold":(15)};
return obj12202;
})())));

manager.add((new Hammer.Swipe((function (){var obj12204 = {"threshold":(15),"velocity":(0)};
return obj12204;
})()))).recognizeWith(manager.get("pan"));

manager.add((new Hammer.Pinch())).recognizeWith(manager.get("pan"));

manager.add((new Hammer.Tap((function (){var obj12206 = {"threshold":(15)};
return obj12206;
})())));

return manager;
});
graphito.core.gesture_observable = (function graphito$core$gesture_observable(manager,gesture){
var subject = (new Rx.Subject());
manager.on(gesture,((function (subject){
return (function (p1__12207_SHARP_){
return subject.onNext(p1__12207_SHARP_);
});})(subject))
);

return subject;
});
graphito.core.pan_observable = (function graphito$core$pan_observable(manager){
return graphito.core.gesture_observable(manager,"panstart panmove");
});
graphito.core.pan_deltas_observable = (function graphito$core$pan_deltas_observable(manager){
return graphito.core.pan_observable(manager).bufferWithCount((2),(1)).map((function (es){
var vec__12209 = es;
var e1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12209,(0),null);
var e2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12209,(1),null);
var e1_center = e1.center;
var e2_center = e2.center;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e2.type,"panstart")){
return graphito.vector.create((0),(0));
} else {
return graphito.vector.create((e1_center.x - e2_center.x),(e1_center.y - e2_center.y));
}
}));
});
graphito.core.move_camera_on_pan_BANG_ = (function graphito$core$move_camera_on_pan_BANG_(manager,current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.pan_deltas_observable(manager),animation_observable).subscribe(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(graphito.core.move_camera_BANG_,current_state));
});
/**
 * A stream of velocity vectors, one per swipe.
 */
graphito.core.swipe_observable = (function graphito$core$swipe_observable(manager){
return graphito.core.gesture_observable(manager,"swipe").map((function (e){
return graphito.vector.create(e.velocityX,e.velocityY);
}));
});
graphito.core.scroll_end_observable = (function graphito$core$scroll_end_observable(svg){
var elem = svg.node();
return graphito.core.rx_observable.fromEvent(elem,"mousedown").merge(graphito.core.rx_observable.fromEvent(elem,"touchstart")).map(cljs.core.constantly(cljs.core.constant$keyword$scroll_DASH_end));
});
graphito.core.dampen = (function graphito$core$dampen(v){
var length = (function (){var G__12211 = v;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__12211) : graphito.vector.length.call(null,G__12211));
})();
return graphito.vector.set_length(graphito.vector.copy(v),(length - graphito.core.swipe_damping_factor));
});
graphito.core.swipe_displacements_observable = (function graphito$core$swipe_displacements_observable(manager,svg){
var swipes = graphito.core.swipe_observable(manager);
var scroll_ends = graphito.core.scroll_end_observable(svg);
var actions = swipes.merge(scroll_ends);
return actions.flatMapLatest(((function (swipes,scroll_ends,actions){
return (function (a){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,cljs.core.constant$keyword$scroll_DASH_end)){
return graphito.core.rx_observable.empty();
} else {
var vx = graphito.vector.x(a);
var vy = graphito.vector.y(a);
return graphito.core.rx_observable.generateWithRelativeTime(graphito.vector.create((graphito.core.update_interval_ms * (function (){var or__3885__auto__ = vx;
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return (0);
}
})()),(graphito.core.update_interval_ms * (function (){var or__3885__auto__ = vy;
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return (0);
}
})())),((function (vx,vy,swipes,scroll_ends,actions){
return (function (v){
return (graphito.vector.length_sq(v) > graphito.core.min_slide_speed_sq);
});})(vx,vy,swipes,scroll_ends,actions))
,graphito.core.dampen,cljs.core.identity,cljs.core.constantly(graphito.core.update_interval_ms));
}
});})(swipes,scroll_ends,actions))
);
});
graphito.core.move_camera_on_swipe_BANG_ = (function graphito$core$move_camera_on_swipe_BANG_(manager,current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.swipe_displacements_observable(manager,cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1((function (){var G__12213 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12213) : cljs.core.deref.call(null,G__12213));
})())),animation_observable).subscribe(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(graphito.core.move_camera_BANG_,current_state));
});
graphito.core.pinch_observable = (function graphito$core$pinch_observable(manager){
return graphito.core.gesture_observable(manager,"pinchmove").map((function (e){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$center,graphito.vector.create(e.center.x,e.center.y),cljs.core.constant$keyword$scale,e.scale], null);
}));
});
graphito.core.zoom_on_pinch_BANG_ = (function graphito$core$zoom_on_pinch_BANG_(manager,current_state,animation_observable){
var pinches = graphito.core.pinch_observable(manager);
var pinch_ins = pinches.filter(((function (pinches){
return (function (p1__12214_SHARP_){
return (cljs.core.constant$keyword$scale.cljs$core$IFn$_invoke$arity$1(p1__12214_SHARP_) < 0.8);
});})(pinches))
);
var pinch_outs = pinches.filter(((function (pinches,pinch_ins){
return (function (p1__12215_SHARP_){
return (cljs.core.constant$keyword$scale.cljs$core$IFn$_invoke$arity$1(p1__12215_SHARP_) > 1.2);
});})(pinches,pinch_ins))
);
pinch_ins.subscribe(((function (pinches,pinch_ins,pinch_outs){
return (function (){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__12220 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12220) : cljs.core.deref.call(null,G__12220));
})()),cljs.core.constant$keyword$fisheye)){
return graphito.core.set_projection_BANG_(current_state,cljs.core.constant$keyword$zoom_DASH_out);
} else {
return null;
}
});})(pinches,pinch_ins,pinch_outs))
);

return pinch_outs.subscribe(((function (pinches,pinch_ins,pinch_outs){
return (function (p1__12216_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__12221 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12221) : cljs.core.deref.call(null,G__12221));
})()),cljs.core.constant$keyword$zoom_DASH_out)){
return graphito.core.zoom_in_to_pos_BANG_(current_state,graphito.core.zoom_out__GT_world_pos((function (){var G__12222 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12222) : cljs.core.deref.call(null,G__12222));
})(),cljs.core.constant$keyword$center.cljs$core$IFn$_invoke$arity$1(p1__12216_SHARP_)));
} else {
return null;
}
});})(pinches,pinch_ins,pinch_outs))
);
});
/**
 * Stream of locations as math vectors.
 */
graphito.core.tap_observable = (function graphito$core$tap_observable(manager){
return graphito.core.gesture_observable(manager,"tap").map((function (e){
return graphito.vector.create(e.center.x,e.center.y);
}));
});
graphito.core.svg_element_position = (function graphito$core$svg_element_position(svg,elem){
var box = elem.getBoundingClientRect();
var center_x = (box.left + (box.width / (2)));
var center_y = (box.top + (box.height / (2)));
var svg_box = svg.node().getBoundingClientRect();
var svg_x = svg_box.left;
var svg_y = svg_box.top;
return graphito.vector.create((center_x - svg_x),(center_y - svg_y));
});
graphito.core.closest_node = (function graphito$core$closest_node(state,pos){
var closest_node__$1 = (function (){var G__12233 = null;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12233) : cljs.core.atom.call(null,G__12233));
})();
var closest_distance_sq = (function (){var G__12234 = Infinity;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12234) : cljs.core.atom.call(null,G__12234));
})();
var svg = cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1(state);
svg.selectAll(".node-dot").each(((function (closest_node__$1,closest_distance_sq,svg){
return (function (node){
var elem = this;
var elem_pos = graphito.core.svg_element_position(svg,elem);
var distance_sq = graphito.vector.distance_sq(pos,elem_pos);
if((distance_sq < (function (){var G__12235 = closest_distance_sq;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12235) : cljs.core.deref.call(null,G__12235));
})())){
var G__12236_12243 = closest_distance_sq;
var G__12237_12244 = distance_sq;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__12236_12243,G__12237_12244) : cljs.core.reset_BANG_.call(null,G__12236_12243,G__12237_12244));

var G__12238 = closest_node__$1;
var G__12239 = node;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__12238,G__12239) : cljs.core.reset_BANG_.call(null,G__12238,G__12239));
} else {
return null;
}
});})(closest_node__$1,closest_distance_sq,svg))
);

return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$pos,pos,cljs.core.constant$keyword$node,(function (){var G__12240 = closest_node__$1;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12240) : cljs.core.deref.call(null,G__12240));
})(),cljs.core.constant$keyword$distance,(function (){var G__12241 = (function (){var G__12242 = closest_distance_sq;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12242) : cljs.core.deref.call(null,G__12242));
})();
return Math.sqrt(G__12241);
})()], null);
});
graphito.core.zoom_and_select_on_tap_BANG_ = (function graphito$core$zoom_and_select_on_tap_BANG_(manager,current_state,animation_observable){
var taps = graphito.core.tap_observable(manager);
var partitions = graphito.core.suppress_while_animating(taps,animation_observable).map(((function (taps){
return (function (p1__12245_SHARP_){
return graphito.core.closest_node((function (){var G__12254 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12254) : cljs.core.deref.call(null,G__12254));
})(),p1__12245_SHARP_);
});})(taps))
).partition(((function (taps){
return (function (p1__12246_SHARP_){
return (cljs.core.constant$keyword$distance.cljs$core$IFn$_invoke$arity$1(p1__12246_SHARP_) < (graphito.core.hitbox_size / (2)));
});})(taps))
);
var node_taps = (partitions[(0)]);
var space_taps = (partitions[(1)]).map(((function (taps,partitions,node_taps){
return (function (p1__12247_SHARP_){
return cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(p1__12247_SHARP_);
});})(taps,partitions,node_taps))
);
node_taps.subscribe(((function (taps,partitions,node_taps,space_taps){
return (function (p__12255){
var map__12256 = p__12255;
var map__12256__$1 = ((cljs.core.seq_QMARK_(map__12256))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12256):map__12256);
var node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12256__$1,cljs.core.constant$keyword$node);
return graphito.core.select_and_zoom_to_node_BANG_(current_state,node);
});})(taps,partitions,node_taps,space_taps))
);

return space_taps.subscribe(((function (taps,partitions,node_taps,space_taps){
return (function (p1__12248_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__12257 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12257) : cljs.core.deref.call(null,G__12257));
})()),cljs.core.constant$keyword$zoom_DASH_out)){
return graphito.core.zoom_in_to_pos_BANG_(current_state,graphito.core.zoom_out__GT_world_pos((function (){var G__12258 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12258) : cljs.core.deref.call(null,G__12258));
})(),p1__12248_SHARP_));
} else {
return null;
}
});})(taps,partitions,node_taps,space_taps))
);
});
graphito.core.show_details_on_button_click_BANG_ = (function graphito$core$show_details_on_button_click_BANG_(current_state,modal_selector){
var detail_button = cljs.core.constant$keyword$detail_DASH_button.cljs$core$IFn$_invoke$arity$1((function (){var G__12263 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12263) : cljs.core.deref.call(null,G__12263));
})());
var click_fn = ((function (detail_button){
return (function (){
var map__12264 = (function (){var G__12266 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12266) : cljs.core.deref.call(null,G__12266));
})();
var map__12264__$1 = ((cljs.core.seq_QMARK_(map__12264))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12264):map__12264);
var map__12265 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12264__$1,cljs.core.constant$keyword$selected_DASH_node);
var map__12265__$1 = ((cljs.core.seq_QMARK_(map__12265))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12265):map__12265);
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12265__$1,cljs.core.constant$keyword$title);
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12265__$1,cljs.core.constant$keyword$data);
var display_data = (function (){var or__3885__auto__ = data;
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return graphito.filler.data_for_title(title);
}
})();
return graphito.detail.show_modal(modal_selector,display_data);
});})(detail_button))
;
detail_button.on("mouseup",click_fn);

return detail_button.on("touchend",((function (detail_button,click_fn){
return (function (){
return window.timeout(click_fn,(100));
});})(detail_button,click_fn))
);
});
graphito.core.inhabit = (function graphito$core$inhabit(container_selector,detail_button_selector,modal_selector,opts){
var map__12271 = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(opts);
var map__12271__$1 = ((cljs.core.seq_QMARK_(map__12271))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12271):map__12271);
var graph_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12271__$1,"graphFile");
var gilbert_graph = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12271__$1,"gilbertGraph");
var graph_object = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12271__$1,"graphObject");
var initial_selection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12271__$1,"initialSelection");
var svg = graphito.core.setup_svg_BANG_(container_selector);
var detail_button = graphito.core.d3.select(detail_button_selector);
var gesture_manager = graphito.core.hammer_manager(svg);
var animation_subject = graphito.core.animation_subject();
var current_state = (function (){var G__12272 = graphito.core.initial_state(svg,detail_button,animation_subject);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__12272) : cljs.core.atom.call(null,G__12272));
})();
var set_state_for_graph_fn = ((function (map__12271,map__12271__$1,graph_file,gilbert_graph,graph_object,initial_selection,svg,detail_button,gesture_manager,animation_subject,current_state){
return (function (js_graph){
graphito.core.set_graph_BANG_(current_state,graphito.core.parse_js_graph(js_graph));

if(cljs.core.truth_(initial_selection)){
return graphito.core.select_and_zoom_to_node_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.constant$keyword$nodes.cljs$core$IFn$_invoke$arity$1((function (){var G__12273 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__12273) : cljs.core.deref.call(null,G__12273));
})()).call(null,initial_selection),cljs.core.array_seq([cljs.core.constant$keyword$disable_DASH_animation_QMARK_,true], 0));
} else {
return null;
}
});})(map__12271,map__12271__$1,graph_file,gilbert_graph,graph_object,initial_selection,svg,detail_button,gesture_manager,animation_subject,current_state))
;
graphito.core.sync_on_window_size_BANG_(current_state);

if(cljs.core.truth_(gilbert_graph)){
var vec__12274_12275 = gilbert_graph;
var num_nodes_12276 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12274_12275,(0),null);
var p_12277 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12274_12275,(1),null);
var js_graph_12278 = cljs.core.clj__GT_js(graphito.generate.gilbert_graph(num_nodes_12276,p_12277));
set_state_for_graph_fn(js_graph_12278);
} else {
if(cljs.core.truth_(graph_file)){
graphito.core.load_graph(graph_file,set_state_for_graph_fn);
} else {
if(cljs.core.truth_(graph_object)){
set_state_for_graph_fn(cljs.core.clj__GT_js(graph_object));
} else {
}
}
}

graphito.core.respond_to_resize_BANG_(current_state);

graphito.core.move_camera_on_arrow_keys_BANG_(current_state,animation_subject);

graphito.core.move_camera_on_pan_BANG_(gesture_manager,current_state,animation_subject);

graphito.core.move_camera_on_swipe_BANG_(gesture_manager,current_state,animation_subject);

graphito.core.switch_zoom_on_spacebar_BANG_(current_state,animation_subject);

graphito.core.zoom_on_pinch_BANG_(gesture_manager,current_state,animation_subject);

graphito.core.zoom_and_select_on_tap_BANG_(gesture_manager,current_state,animation_subject);

return graphito.core.show_details_on_button_click_BANG_(current_state,modal_selector);
});
goog.exportSymbol('graphito.core.inhabit', graphito.core.inhabit);
