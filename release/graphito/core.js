// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.core');
goog.require('cljs.core');
goog.require('clojure.browser.repl');
goog.require('graphito.vector');
goog.require('graphito.generate');
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

graphito.core.p.cljs$lang$applyTo = (function (seq4748){
var G__4749 = cljs.core.first(seq4748);
var seq4748__$1 = cljs.core.next(seq4748);
var G__4750 = cljs.core.first(seq4748__$1);
var seq4748__$2 = cljs.core.next(seq4748__$1);
return graphito.core.p.cljs$core$IFn$_invoke$arity$variadic(G__4749,G__4750,seq4748__$2);
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
graphito.core.prevent_focus_on_detail_button_BANG_ = (function graphito$core$prevent_focus_on_detail_button_BANG_(detail_button){
return detail_button.on("mouseup",(function (){
return detail_button.node().blur();
}));
});
graphito.core.scroll_scale_for_state = (function graphito$core$scroll_scale_for_state(state){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$zoom_DASH_out,cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1(state))){
return graphito.core.zoom_out_scale;
} else {
return (1);
}
});
graphito.core.zoom_out__GT_world_pos = (function graphito$core$zoom_out__GT_world_pos(state,pos){
var map__4752 = state;
var map__4752__$1 = ((cljs.core.seq_QMARK_(map__4752))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4752):map__4752);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4752__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4752__$1,cljs.core.constant$keyword$view_DASH_size);
var view_center = graphito.vector.multiply(graphito.vector.copy(view_size),0.5);
var displacement = graphito.vector.neg(graphito.vector.subtract(view_center,pos));
return graphito.vector.add.cljs$core$IFn$_invoke$arity$2(graphito.vector.multiply(displacement,((1) / graphito.core.zoom_out_scale)),camera_pos);
});
/**
 * Returns the distance of the given point from the camera, scaled so that
 * points which would be at the corner of the screen are at distance 1
 */
graphito.core.scaled_distance_from_camera = (function graphito$core$scaled_distance_from_camera(state,pos){
var map__4757 = state;
var map__4757__$1 = ((cljs.core.seq_QMARK_(map__4757))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4757):map__4757);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4757__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4757__$1,cljs.core.constant$keyword$view_DASH_size);
var corner_distance = ((function (){var G__4758 = view_size;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__4758) : graphito.vector.length.call(null,G__4758));
})() / (2));
return ((function (){var G__4759 = camera_pos;
var G__4760 = pos;
return (graphito.vector.distance.cljs$core$IFn$_invoke$arity$2 ? graphito.vector.distance.cljs$core$IFn$_invoke$arity$2(G__4759,G__4760) : graphito.vector.distance.call(null,G__4759,G__4760));
})() / corner_distance);
});
graphito.core.elliptic_distance_from_camera = (function graphito$core$elliptic_distance_from_camera(state,pos){

var map__4763 = state;
var map__4763__$1 = ((cljs.core.seq_QMARK_(map__4763))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4763):map__4763);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4763__$1,cljs.core.constant$keyword$view_DASH_size);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4763__$1,cljs.core.constant$keyword$camera_DASH_pos);
var rx = (graphito.vector.x(view_size) / (2));
var ry = (graphito.vector.y(view_size) / (2));
var sq = ((function (map__4763,map__4763__$1,view_size,camera_pos,rx,ry){
return (function (x){
return (x * x);
});})(map__4763,map__4763__$1,view_size,camera_pos,rx,ry))
;
var displacement = graphito.vector.subtract(graphito.vector.copy(pos),camera_pos);
var x = graphito.vector.x(displacement);
var y = graphito.vector.y(displacement);
var G__4764 = ((sq(x) / sq(rx)) + (sq(y) / sq(ry)));
return Math.sqrt(G__4764);
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
var map__4768 = state;
var map__4768__$1 = ((cljs.core.seq_QMARK_(map__4768))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4768):map__4768);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4768__$1,cljs.core.constant$keyword$view_DASH_size);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4768__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_center = graphito.vector.multiply(graphito.vector.copy(view_size),0.5);
var corner_distance = (function (){var G__4769 = view_center;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__4769) : graphito.vector.length.call(null,G__4769));
})();
var displacement = graphito.vector.subtract(graphito.vector.copy(pos),camera_pos);
var r = graphito.core.scaled_distance_from_camera(state,pos);
var projected_r = (function (){var G__4770 = r;
return (projector.cljs$core$IFn$_invoke$arity$1 ? projector.cljs$core$IFn$_invoke$arity$1(G__4770) : projector.call(null,G__4770));
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
var map__4772 = state;
var map__4772__$1 = ((cljs.core.seq_QMARK_(map__4772))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4772):map__4772);
var detail_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4772__$1,cljs.core.constant$keyword$detail_DASH_button);
var selected_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4772__$1,cljs.core.constant$keyword$selected_DASH_node);
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

graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,p__4783){
var map__4784 = p__4783;
var map__4784__$1 = ((cljs.core.seq_QMARK_(map__4784))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4784):map__4784);
var animate_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4784__$1,cljs.core.constant$keyword$animate_QMARK_);
var map__4785 = state;
var map__4785__$1 = ((cljs.core.seq_QMARK_(map__4785))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4785):map__4785);
var svg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$svg);
var detail_button = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$detail_DASH_button);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$nodes);
var links = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$links);
var selected_node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$selected_DASH_node);
var camera_pos = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$camera_DASH_pos);
var view_size = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$view_DASH_size);
var projection = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$projection);
var animation_subject = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4785__$1,cljs.core.constant$keyword$animation_DASH_subject);
var map__4786 = graphito.core.projectors_for_state(state);
var map__4786__$1 = ((cljs.core.seq_QMARK_(map__4786))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4786):map__4786);
var project_displacement = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4786__$1,cljs.core.constant$keyword$project_DASH_displacement);
var project_scale = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4786__$1,cljs.core.constant$keyword$project_DASH_scale);
var project_opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4786__$1,cljs.core.constant$keyword$project_DASH_opacity);
var project_label_opacity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4786__$1,cljs.core.constant$keyword$project_DASH_label_DASH_opacity);
var transition = ((function (map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4773_SHARP_){
return p1__4773_SHARP_.transition().duration(graphito.core.transition_duration_ms);
});})(map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,map__4784,map__4784__$1,animate_QMARK_))
;
var maybe_transition = (cljs.core.truth_(animate_QMARK_)?transition:cljs.core.identity);
var positions = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
return graphito.core.view_position(state,cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node),project_displacement);
});})(map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,map__4784,map__4784__$1,animate_QMARK_))
,nodes);
var distances_from_camera = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
return graphito.core.scaled_distance_from_camera(state,cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node));
});})(map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,map__4784,map__4784__$1,animate_QMARK_))
,nodes);
var distance_for_node = ((function (map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
var G__4787 = cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(node);
return (distances_from_camera.cljs$core$IFn$_invoke$arity$1 ? distances_from_camera.cljs$core$IFn$_invoke$arity$1(G__4787) : distances_from_camera.call(null,G__4787));
});})(map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,map__4784,map__4784__$1,animate_QMARK_))
;
var link_selection_4802 = svg.selectAll(".link").data(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array,links));
link_selection_4802.enter().append("line").attr("class","link").style("stroke",graphito.core.link_color).style("stroke-width",(3));

link_selection_4802.style("stroke",graphito.core.link_color).style("stroke-width",graphito.core.link_width).filter(((function (link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (link){
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(link),cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(selected_node))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(link),cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(selected_node)));
});})(link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).style("stroke",graphito.core.selected_link_color).style("stroke-width",graphito.core.selected_link_width);

(function (){var G__4788 = link_selection_4802;
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__4788) : maybe_transition.call(null,G__4788));
})().attr("x1",((function (link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4774_SHARP_){
return graphito.vector.x((function (){var G__4789 = cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(p1__4774_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4789) : positions.call(null,G__4789));
})());
});})(link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).attr("y1",((function (link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4775_SHARP_){
return graphito.vector.y((function (){var G__4790 = cljs.core.constant$keyword$source.cljs$core$IFn$_invoke$arity$1(p1__4775_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4790) : positions.call(null,G__4790));
})());
});})(link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).attr("x2",((function (link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4776_SHARP_){
return graphito.vector.x((function (){var G__4791 = cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(p1__4776_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4791) : positions.call(null,G__4791));
})());
});})(link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).attr("y2",((function (link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4777_SHARP_){
return graphito.vector.y((function (){var G__4792 = cljs.core.constant$keyword$target.cljs$core$IFn$_invoke$arity$1(p1__4777_SHARP_);
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4792) : positions.call(null,G__4792));
})());
});})(link_selection_4802,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
);

var node_selection_4803 = svg.selectAll(".node").data(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array,nodes));
var new_node_selection_4804 = node_selection_4803.enter().append("g").attr("class","node");
new_node_selection_4804.append("circle").attr("class","node-dot").attr("r",graphito.core.max_radius);

node_selection_4803.filter(((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
var elem = this;
return ((distance_for_node(node) < graphito.core.label_visible_threshold)) && ((elem.querySelector(".node-label") == null));
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).append("text").attr("class","node-label").attr("dy",".6em").style("font-family",graphito.core.label_font).style("font-size",[cljs.core.str(graphito.core.label_font_size)].join('')).style("text-anchor","middle").style("fill",graphito.core.node_label_color).attr("y",graphito.core.label_y);

node_selection_4803.filter(((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4778_SHARP_){
return (distance_for_node(p1__4778_SHARP_) >= graphito.core.label_visible_threshold);
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).selectAll(".node-label").remove();

(function (){var G__4793 = node_selection_4803.style("fill",((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4779_SHARP_){
if((p1__4779_SHARP_ === selected_node)){
return graphito.core.selected_node_color;
} else {
return graphito.core.node_color;
}
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
);
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__4793) : maybe_transition.call(null,G__4793));
})().attr("transform",((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
var i = cljs.core.constant$keyword$index.cljs$core$IFn$_invoke$arity$1(node);
var scale = (function (){var G__4794 = (function (){var G__4795 = i;
return (distances_from_camera.cljs$core$IFn$_invoke$arity$1 ? distances_from_camera.cljs$core$IFn$_invoke$arity$1(G__4795) : distances_from_camera.call(null,G__4795));
})();
return (project_scale.cljs$core$IFn$_invoke$arity$1 ? project_scale.cljs$core$IFn$_invoke$arity$1(G__4794) : project_scale.call(null,G__4794));
})();
var x = graphito.vector.x((function (){var G__4796 = i;
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4796) : positions.call(null,G__4796));
})());
var y = graphito.vector.y((function (){var G__4797 = i;
return (positions.cljs$core$IFn$_invoke$arity$1 ? positions.cljs$core$IFn$_invoke$arity$1(G__4797) : positions.call(null,G__4797));
})());
return [cljs.core.str("translate("),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y),cljs.core.str(") scale("),cljs.core.str(scale),cljs.core.str(")")].join('');
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
);

(function (){var G__4798 = node_selection_4803.selectAll(".node-label");
return (maybe_transition.cljs$core$IFn$_invoke$arity$1 ? maybe_transition.cljs$core$IFn$_invoke$arity$1(G__4798) : maybe_transition.call(null,G__4798));
})().attr("opacity",((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
var G__4799 = distance_for_node(node);
return (project_label_opacity.cljs$core$IFn$_invoke$arity$1 ? project_label_opacity.cljs$core$IFn$_invoke$arity$1(G__4799) : project_label_opacity.call(null,G__4799));
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).attr("font-weight",((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (node){
if((node === selected_node)){
return "bold";
} else {
return "normal";
}
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
).text(((function (node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (p1__4780_SHARP_){
return cljs.core.constant$keyword$title.cljs$core$IFn$_invoke$arity$1(p1__4780_SHARP_);
});})(node_selection_4803,new_node_selection_4804,map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
);

if(cljs.core.truth_(animate_QMARK_)){
animation_subject.onNext(cljs.core.constant$keyword$animation_DASH_start);

var G__4800 = ((function (map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_){
return (function (){
return animation_subject.onNext(cljs.core.constant$keyword$animation_DASH_end);
});})(map__4785,map__4785__$1,svg,detail_button,nodes,links,selected_node,camera_pos,view_size,projection,animation_subject,map__4786,map__4786__$1,project_displacement,project_scale,project_opacity,project_label_opacity,transition,maybe_transition,positions,distances_from_camera,distance_for_node,map__4784,map__4784__$1,animate_QMARK_))
;
var G__4801 = graphito.core.transition_duration_ms;
return setTimeout(G__4800,G__4801);
} else {
return null;
}
});

graphito.core.sync_graph_BANG_.cljs$lang$maxFixedArity = (1);

graphito.core.sync_graph_BANG_.cljs$lang$applyTo = (function (seq4781){
var G__4782 = cljs.core.first(seq4781);
var seq4781__$1 = cljs.core.next(seq4781);
return graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__4782,seq4781__$1);
});
graphito.core.initial_state = (function graphito$core$initial_state(svg,detail_button,animation_subject){
return cljs.core.PersistentHashMap.fromArrays([cljs.core.constant$keyword$view_DASH_size,cljs.core.constant$keyword$detail_DASH_button,cljs.core.constant$keyword$camera_DASH_pos,cljs.core.constant$keyword$nodes,cljs.core.constant$keyword$animation_DASH_subject,cljs.core.constant$keyword$svg,cljs.core.constant$keyword$selected_DASH_node,cljs.core.constant$keyword$projection,cljs.core.constant$keyword$links],[graphito.vector.zero(),detail_button,graphito.vector.zero(),cljs.core.PersistentVector.EMPTY,animation_subject,svg,null,cljs.core.constant$keyword$fisheye,cljs.core.PersistentVector.EMPTY]);
});
graphito.core.deselect_node_if_away_BANG_ = (function graphito$core$deselect_node_if_away_BANG_(current_state){
var temp__4425__auto__ = cljs.core.constant$keyword$selected_DASH_node.cljs$core$IFn$_invoke$arity$1((function (){var G__4810 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4810) : cljs.core.deref.call(null,G__4810));
})());
if(cljs.core.truth_(temp__4425__auto__)){
var selected_node = temp__4425__auto__;
if(((graphito.core.scaled_distance_from_camera((function (){var G__4813 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4813) : cljs.core.deref.call(null,G__4813));
})(),cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(selected_node)) > graphito.core.deselection_distance)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__4814 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4814) : cljs.core.deref.call(null,G__4814));
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

graphito.core.sync_graph_BANG_((function (){var G__4818 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4818) : cljs.core.deref.call(null,G__4818));
})());

return graphito.core.sync_detail_button_BANG_((function (){var G__4819 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4819) : cljs.core.deref.call(null,G__4819));
})());
});

graphito.core.swap_state_BANG_.cljs$lang$maxFixedArity = (2);

graphito.core.swap_state_BANG_.cljs$lang$applyTo = (function (seq4815){
var G__4816 = cljs.core.first(seq4815);
var seq4815__$1 = cljs.core.next(seq4815);
var G__4817 = cljs.core.first(seq4815__$1);
var seq4815__$2 = cljs.core.next(seq4815__$1);
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__4816,G__4817,seq4815__$2);
});
graphito.core.swap_state_animated_BANG_ = (function graphito$core$swap_state_animated_BANG_(){
var argseq__4397__auto__ = ((((2) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(2)),(0))):null);
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4397__auto__);
});

graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (current_state,f,args){
cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.swap_BANG_,current_state,f,args);

graphito.core.enforce_state_invariants_BANG_(current_state);

graphito.core.sync_graph_BANG_.cljs$core$IFn$_invoke$arity$variadic((function (){var G__4823 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4823) : cljs.core.deref.call(null,G__4823));
})(),cljs.core.array_seq([cljs.core.constant$keyword$animate_QMARK_,true], 0));

return graphito.core.sync_detail_button_BANG_((function (){var G__4824 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4824) : cljs.core.deref.call(null,G__4824));
})());
});

graphito.core.swap_state_animated_BANG_.cljs$lang$maxFixedArity = (2);

graphito.core.swap_state_animated_BANG_.cljs$lang$applyTo = (function (seq4820){
var G__4821 = cljs.core.first(seq4820);
var seq4820__$1 = cljs.core.next(seq4820);
var G__4822 = cljs.core.first(seq4820__$1);
var seq4820__$2 = cljs.core.next(seq4820__$1);
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__4821,G__4822,seq4820__$2);
});
graphito.core.set_graph_BANG_ = (function graphito$core$set_graph_BANG_(current_state,p__4825){
var map__4827 = p__4825;
var map__4827__$1 = ((cljs.core.seq_QMARK_(map__4827))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4827):map__4827);
var nodes = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4827__$1,cljs.core.constant$keyword$nodes);
var links = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4827__$1,cljs.core.constant$keyword$links);
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$nodes,nodes,cljs.core.constant$keyword$links,links], 0));
});
graphito.core.move_camera_BANG_ = (function graphito$core$move_camera_BANG_(current_state,d){
return graphito.core.swap_state_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.update,cljs.core.array_seq([cljs.core.constant$keyword$camera_DASH_pos,graphito.vector.add,graphito.vector.multiply(graphito.vector.copy(d),((1) / graphito.core.scroll_scale_for_state((function (){var G__4829 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4829) : cljs.core.deref.call(null,G__4829));
})())))], 0));
});
graphito.core.set_projection_BANG_ = (function graphito$core$set_projection_BANG_(current_state,projection){
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$projection,projection], 0));
});
graphito.core.toggle_projection_BANG_ = (function graphito$core$toggle_projection_BANG_(current_state){
var projection = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__4831 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4831) : cljs.core.deref.call(null,G__4831));
})()),cljs.core.constant$keyword$fisheye))?cljs.core.constant$keyword$zoom_DASH_out:cljs.core.constant$keyword$fisheye);
return graphito.core.set_projection_BANG_(current_state,projection);
});
graphito.core.zoom_in_to_pos_BANG_ = (function graphito$core$zoom_in_to_pos_BANG_(current_state,pos){
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$projection,cljs.core.constant$keyword$fisheye,cljs.core.constant$keyword$camera_DASH_pos,graphito.vector.copy(pos)], 0));
});
graphito.core.select_and_zoom_to_node_BANG_ = (function graphito$core$select_and_zoom_to_node_BANG_(current_state,node){
return graphito.core.swap_state_animated_BANG_.cljs$core$IFn$_invoke$arity$variadic(current_state,cljs.core.assoc,cljs.core.array_seq([cljs.core.constant$keyword$projection,cljs.core.constant$keyword$fisheye,cljs.core.constant$keyword$camera_DASH_pos,graphito.vector.copy(cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(node)),cljs.core.constant$keyword$selected_DASH_node,node], 0));
});
graphito.core.get_force_layout = (function graphito$core$get_force_layout(){
return graphito.core.d3.layout.force().charge((-240)).linkDistance((40)).size([graphito.core.world_width,graphito.core.world_height]);
});
graphito.core.do_layout_BANG_ = (function graphito$core$do_layout_BANG_(data,scale){
var n = data.nodes.length;
var force_layout = graphito.core.get_force_layout();
data.nodes.forEach(((function (n,force_layout){
return (function (d,i){
var val = (i * (graphito.core.world_width / n));
(d["x"] = val);

return (d["y"] = val);
});})(n,force_layout))
);

force_layout.nodes(data.nodes).links(data.links).start();

var n__4306__auto___4838 = graphito.core.graph_force_ticks;
var __4839 = (0);
while(true){
if((__4839 < n__4306__auto___4838)){
force_layout.tick();

var G__4840 = (__4839 + (1));
__4839 = G__4840;
continue;
} else {
}
break;
}

force_layout.stop();

var sum_x_4841 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (n,force_layout){
return (function (p1__4832_SHARP_){
var G__4836 = "x";
return (p1__4832_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__4832_SHARP_.cljs$core$IFn$_invoke$arity$1(G__4836) : p1__4832_SHARP_.call(null,G__4836));
});})(n,force_layout))
,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data.nodes)));
var sum_y_4842 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (sum_x_4841,n,force_layout){
return (function (p1__4833_SHARP_){
var G__4837 = "y";
return (p1__4833_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__4833_SHARP_.cljs$core$IFn$_invoke$arity$1(G__4837) : p1__4833_SHARP_.call(null,G__4837));
});})(sum_x_4841,n,force_layout))
,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(data.nodes)));
var avg_x_4843 = (sum_x_4841 / n);
var avg_y_4844 = (sum_y_4842 / n);
data.nodes.forEach(((function (sum_x_4841,sum_y_4842,avg_x_4843,avg_y_4844,n,force_layout){
return (function (d){
(d["x"] = (scale * (d.x - avg_x_4843)));

return (d["y"] = (scale * (d.y - avg_y_4844)));
});})(sum_x_4841,sum_y_4842,avg_x_4843,avg_y_4844,n,force_layout))
);

return data;
});
graphito.core.node = (function graphito$core$node(index,title,x,y){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$index,index,cljs.core.constant$keyword$title,title,cljs.core.constant$keyword$pos,graphito.vector.create(x,y)], null);
});
/**
 * Source and target are indexes into the list of nodes.
 */
graphito.core.link = (function graphito$core$link(source,target){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$source,source,cljs.core.constant$keyword$target,target], null);
});
graphito.core.parse_js_graph = (function graphito$core$parse_js_graph(js_graph,scale){
var data_links = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1((js_graph["links"]));
var links = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (data_links){
return (function (l){
return graphito.core.link((function (){var G__4854 = "source";
return (l.cljs$core$IFn$_invoke$arity$1 ? l.cljs$core$IFn$_invoke$arity$1(G__4854) : l.call(null,G__4854));
})(),(function (){var G__4855 = "target";
return (l.cljs$core$IFn$_invoke$arity$1 ? l.cljs$core$IFn$_invoke$arity$1(G__4855) : l.call(null,G__4855));
})());
});})(data_links))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (data_links){
return (function (link){
return (((function (){var G__4858 = "value";
return (link.cljs$core$IFn$_invoke$arity$1 ? link.cljs$core$IFn$_invoke$arity$1(G__4858) : link.call(null,G__4858));
})() == null)) || (((function (){var G__4859 = "value";
return (link.cljs$core$IFn$_invoke$arity$1 ? link.cljs$core$IFn$_invoke$arity$1(G__4859) : link.call(null,G__4859));
})() >= (4)));
});})(data_links))
,data_links));
graphito.core.do_layout_BANG_(js_graph,scale);

var data_nodes = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1((js_graph["nodes"]));
var nodes = cljs.core.vec(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (data_nodes,data_links,links){
return (function (i,data_node){
return graphito.core.node(i,(function (){var G__4860 = "name";
return (data_node.cljs$core$IFn$_invoke$arity$1 ? data_node.cljs$core$IFn$_invoke$arity$1(G__4860) : data_node.call(null,G__4860));
})(),(function (){var G__4861 = "x";
return (data_node.cljs$core$IFn$_invoke$arity$1 ? data_node.cljs$core$IFn$_invoke$arity$1(G__4861) : data_node.call(null,G__4861));
})(),(function (){var G__4862 = "y";
return (data_node.cljs$core$IFn$_invoke$arity$1 ? data_node.cljs$core$IFn$_invoke$arity$1(G__4862) : data_node.call(null,G__4862));
})());
});})(data_nodes,data_links,links))
,data_nodes));
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$nodes,nodes,cljs.core.constant$keyword$links,links], null);
});
graphito.core.load_graph = (function graphito$core$load_graph(json_file,scale,callback){
return graphito.core.d3.json(json_file,(function (js_graph){
var G__4864 = graphito.core.parse_js_graph(js_graph,scale);
return (callback.cljs$core$IFn$_invoke$arity$1 ? callback.cljs$core$IFn$_invoke$arity$1(G__4864) : callback.call(null,G__4864));
}));
});
graphito.core.tick_observable = (function (){var G__4865 = graphito.core.update_interval_ms;
return Rx.Observable.interval(G__4865);
})();
graphito.core.set_size_BANG_ = (function graphito$core$set_size_BANG_(current_state,width,height){
var svg = cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1((function (){var G__4867 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4867) : cljs.core.deref.call(null,G__4867));
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
var G__4868 = e.type;
switch (G__4868) {
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
graphito.core.arrow_keys_observable = graphito.core.keys_observable.map((function (p1__4870_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.not,cljs.core.nil_QMARK_),cljs.core.map.cljs$core$IFn$_invoke$arity$2(graphito.core.arrow_codes,p1__4870_SHARP_)));
}));
graphito.core.move_camera_on_arrow_keys_BANG_ = (function graphito$core$move_camera_on_arrow_keys_BANG_(current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.arrow_keys_observable.flatMapLatest((function (arrows){
if(cljs.core.empty_QMARK_(arrows)){
return graphito.core.rx_observable.empty();
} else {
return graphito.core.tick_observable.map(cljs.core.constantly(arrows));
}
})),animation_observable).subscribe((function (arrows){
var dx = ((cljs.core.truth_((function (){var G__4875 = cljs.core.constant$keyword$left;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__4875) : arrows.call(null,G__4875));
})())?(-10):(0)) + (cljs.core.truth_((function (){var G__4876 = cljs.core.constant$keyword$right;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__4876) : arrows.call(null,G__4876));
})())?(10):(0)));
var dy = ((cljs.core.truth_((function (){var G__4877 = cljs.core.constant$keyword$up;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__4877) : arrows.call(null,G__4877));
})())?(-10):(0)) + (cljs.core.truth_((function (){var G__4878 = cljs.core.constant$keyword$down;
return (arrows.cljs$core$IFn$_invoke$arity$1 ? arrows.cljs$core$IFn$_invoke$arity$1(G__4878) : arrows.call(null,G__4878));
})())?(10):(0)));
return graphito.core.move_camera_BANG_(current_state,graphito.vector.create(dx,dy));
}));
});
graphito.core.switch_zoom_on_spacebar_BANG_ = (function graphito$core$switch_zoom_on_spacebar_BANG_(current_state,animation_observable){
return graphito.core.suppress_while_animating(graphito.core.key_up_observable.filter((function (p1__4879_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((32),p1__4879_SHARP_.keyCode);
})),animation_observable).subscribe((function (){
return graphito.core.toggle_projection_BANG_(current_state);
}));
});
graphito.core.hammer_manager = (function graphito$core$hammer_manager(svg){
var manager = (new Hammer.Manager(svg.node()));
manager.add((new Hammer.Pan((function (){var obj4887 = {"threshold":(15)};
return obj4887;
})())));

manager.add((new Hammer.Swipe((function (){var obj4889 = {"threshold":(15),"velocity":(0)};
return obj4889;
})()))).recognizeWith(manager.get("pan"));

manager.add((new Hammer.Pinch())).recognizeWith(manager.get("pan"));

manager.add((new Hammer.Tap((function (){var obj4891 = {"threshold":(15)};
return obj4891;
})())));

return manager;
});
graphito.core.gesture_observable = (function graphito$core$gesture_observable(manager,gesture){
var subject = (new Rx.Subject());
manager.on(gesture,((function (subject){
return (function (p1__4892_SHARP_){
return subject.onNext(p1__4892_SHARP_);
});})(subject))
);

return subject;
});
graphito.core.pan_observable = (function graphito$core$pan_observable(manager){
return graphito.core.gesture_observable(manager,"panstart panmove");
});
graphito.core.pan_deltas_observable = (function graphito$core$pan_deltas_observable(manager){
return graphito.core.pan_observable(manager).bufferWithCount((2),(1)).map((function (es){
var vec__4894 = es;
var e1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__4894,(0),null);
var e2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__4894,(1),null);
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
var length = (function (){var G__4896 = v;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__4896) : graphito.vector.length.call(null,G__4896));
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
return graphito.core.suppress_while_animating(graphito.core.swipe_displacements_observable(manager,cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1((function (){var G__4898 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4898) : cljs.core.deref.call(null,G__4898));
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
return (function (p1__4899_SHARP_){
return (cljs.core.constant$keyword$scale.cljs$core$IFn$_invoke$arity$1(p1__4899_SHARP_) < 0.8);
});})(pinches))
);
var pinch_outs = pinches.filter(((function (pinches,pinch_ins){
return (function (p1__4900_SHARP_){
return (cljs.core.constant$keyword$scale.cljs$core$IFn$_invoke$arity$1(p1__4900_SHARP_) > 1.2);
});})(pinches,pinch_ins))
);
pinch_ins.subscribe(((function (pinches,pinch_ins,pinch_outs){
return (function (){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__4905 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4905) : cljs.core.deref.call(null,G__4905));
})()),cljs.core.constant$keyword$fisheye)){
return graphito.core.set_projection_BANG_(current_state,cljs.core.constant$keyword$zoom_DASH_out);
} else {
return null;
}
});})(pinches,pinch_ins,pinch_outs))
);

return pinch_outs.subscribe(((function (pinches,pinch_ins,pinch_outs){
return (function (p1__4901_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__4906 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4906) : cljs.core.deref.call(null,G__4906));
})()),cljs.core.constant$keyword$zoom_DASH_out)){
return graphito.core.zoom_in_to_pos_BANG_(current_state,graphito.core.zoom_out__GT_world_pos((function (){var G__4907 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4907) : cljs.core.deref.call(null,G__4907));
})(),cljs.core.constant$keyword$center.cljs$core$IFn$_invoke$arity$1(p1__4901_SHARP_)));
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
var closest_node__$1 = (function (){var G__4918 = null;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__4918) : cljs.core.atom.call(null,G__4918));
})();
var closest_distance_sq = (function (){var G__4919 = Infinity;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__4919) : cljs.core.atom.call(null,G__4919));
})();
var svg = cljs.core.constant$keyword$svg.cljs$core$IFn$_invoke$arity$1(state);
svg.selectAll(".node-dot").each(((function (closest_node__$1,closest_distance_sq,svg){
return (function (node){
var elem = this;
var elem_pos = graphito.core.svg_element_position(svg,elem);
var distance_sq = graphito.vector.distance_sq(pos,elem_pos);
if((distance_sq < (function (){var G__4920 = closest_distance_sq;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4920) : cljs.core.deref.call(null,G__4920));
})())){
var G__4921_4928 = closest_distance_sq;
var G__4922_4929 = distance_sq;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__4921_4928,G__4922_4929) : cljs.core.reset_BANG_.call(null,G__4921_4928,G__4922_4929));

var G__4923 = closest_node__$1;
var G__4924 = node;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__4923,G__4924) : cljs.core.reset_BANG_.call(null,G__4923,G__4924));
} else {
return null;
}
});})(closest_node__$1,closest_distance_sq,svg))
);

return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$pos,pos,cljs.core.constant$keyword$node,(function (){var G__4925 = closest_node__$1;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4925) : cljs.core.deref.call(null,G__4925));
})(),cljs.core.constant$keyword$distance,(function (){var G__4926 = (function (){var G__4927 = closest_distance_sq;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4927) : cljs.core.deref.call(null,G__4927));
})();
return Math.sqrt(G__4926);
})()], null);
});
graphito.core.zoom_and_select_on_tap_BANG_ = (function graphito$core$zoom_and_select_on_tap_BANG_(manager,current_state,animation_observable){
var taps = graphito.core.tap_observable(manager);
var partitions = graphito.core.suppress_while_animating(taps,animation_observable).map(((function (taps){
return (function (p1__4930_SHARP_){
return graphito.core.closest_node((function (){var G__4939 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4939) : cljs.core.deref.call(null,G__4939));
})(),p1__4930_SHARP_);
});})(taps))
).partition(((function (taps){
return (function (p1__4931_SHARP_){
return (cljs.core.constant$keyword$distance.cljs$core$IFn$_invoke$arity$1(p1__4931_SHARP_) < (graphito.core.hitbox_size / (2)));
});})(taps))
);
var node_taps = (partitions[(0)]);
var space_taps = (partitions[(1)]).map(((function (taps,partitions,node_taps){
return (function (p1__4932_SHARP_){
return cljs.core.constant$keyword$pos.cljs$core$IFn$_invoke$arity$1(p1__4932_SHARP_);
});})(taps,partitions,node_taps))
);
node_taps.subscribe(((function (taps,partitions,node_taps,space_taps){
return (function (p__4940){
var map__4941 = p__4940;
var map__4941__$1 = ((cljs.core.seq_QMARK_(map__4941))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4941):map__4941);
var node = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4941__$1,cljs.core.constant$keyword$node);
return graphito.core.select_and_zoom_to_node_BANG_(current_state,node);
});})(taps,partitions,node_taps,space_taps))
);

return space_taps.subscribe(((function (taps,partitions,node_taps,space_taps){
return (function (p1__4933_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.constant$keyword$projection.cljs$core$IFn$_invoke$arity$1((function (){var G__4942 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4942) : cljs.core.deref.call(null,G__4942));
})()),cljs.core.constant$keyword$zoom_DASH_out)){
return graphito.core.zoom_in_to_pos_BANG_(current_state,graphito.core.zoom_out__GT_world_pos((function (){var G__4943 = current_state;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__4943) : cljs.core.deref.call(null,G__4943));
})(),p1__4933_SHARP_));
} else {
return null;
}
});})(taps,partitions,node_taps,space_taps))
);
});
graphito.core.inhabit = (function graphito$core$inhabit(container_selector,detail_button_selector,opts){
var map__4947 = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(opts);
var map__4947__$1 = ((cljs.core.seq_QMARK_(map__4947))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__4947):map__4947);
var graph_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4947__$1,"graphFile");
var gilbert_graph = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__4947__$1,"gilbertGraph");
var scale = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__4947__$1,"scale",(1));
var svg = graphito.core.setup_svg_BANG_(container_selector);
var detail_button = graphito.core.d3.select(detail_button_selector);
var gesture_manager = graphito.core.hammer_manager(svg);
var animation_subject = graphito.core.animation_subject();
var current_state = (function (){var G__4948 = graphito.core.initial_state(svg,detail_button,animation_subject);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__4948) : cljs.core.atom.call(null,G__4948));
})();
graphito.core.prevent_focus_on_detail_button_BANG_(detail_button);

graphito.core.sync_on_window_size_BANG_(current_state);

if(cljs.core.truth_(gilbert_graph)){
var vec__4949_4950 = gilbert_graph;
var num_nodes_4951 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__4949_4950,(0),null);
var p_4952 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__4949_4950,(1),null);
var js_graph_4953 = cljs.core.clj__GT_js(graphito.generate.gilbert_graph(num_nodes_4951,p_4952));
graphito.core.set_graph_BANG_(current_state,graphito.core.parse_js_graph(js_graph_4953,scale));
} else {
if(cljs.core.truth_(graph_file)){
graphito.core.load_graph(graph_file,scale,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(graphito.core.set_graph_BANG_,current_state));
} else {
}
}

graphito.core.respond_to_resize_BANG_(current_state);

graphito.core.move_camera_on_arrow_keys_BANG_(current_state,animation_subject);

graphito.core.move_camera_on_pan_BANG_(gesture_manager,current_state,animation_subject);

graphito.core.move_camera_on_swipe_BANG_(gesture_manager,current_state,animation_subject);

graphito.core.switch_zoom_on_spacebar_BANG_(current_state,animation_subject);

graphito.core.zoom_on_pinch_BANG_(gesture_manager,current_state,animation_subject);

return graphito.core.zoom_and_select_on_tap_BANG_(gesture_manager,current_state,animation_subject);
});
goog.exportSymbol('graphito.core.inhabit', graphito.core.inhabit);
