// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.generate');
goog.require('cljs.core');
graphito.generate.names = new cljs.core.PersistentVector(null, 25, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bella","Edward","Jacob","Carlisle","Esme","Alice","Emmett","Rosalie","Jasper","Renesmee","James","Victoria","Laurent","Riley","Bree","Aro","Caius","Marcus","Jane","Alec","Demetri","Felix","Heidi","Leah","Seth"], null);
graphito.generate.rands = cljs.core.PersistentVector.fromArray([0.0040871258825063705,0.4585950071923435,0.3363801233936101,0.057653810596093535,0.4806740670464933,0.443930737208575,0.08106743427924812,0.5381493004970253,0.812215648824349,0.29585187532939017,0.17181947198696434,0.8871802329085767,0.8398005936760455,0.8015438728034496,0.7976672041695565,0.907670876942575,0.4927325421012938,0.01939818123355508,0.8079581854399294,0.3957686966750771,0.9051128488499671,0.16268633911386132,0.2603324116207659,0.798268134240061,0.7634163442999125,0.5465437497477978,0.3137345090508461,0.5346399946138263,0.5995599750895053,0.0036616807337850332,0.9176775822415948,0.4752379055134952,0.7392499896232039,0.6739935157820582,0.07562446850351989,0.660168509464711,0.6379899049643427,0.055300734704360366,0.19579238980077207,0.02818756364285946,0.19305834686383605,0.7749646825250238,0.6428308319300413,0.2986525776796043,0.7465545870363712,0.40595135651528835,0.39057257352396846,0.9799706302583218,0.8801821416709572,0.7839054979849607,0.049833460012450814,0.46930040791630745,0.48037735861726105,0.3299860102124512,0.5149423722177744,0.4293165651615709,0.5293896414805204,0.9914559035096318,0.08070048643276095,0.08600690891034901,0.5757961827330291,0.524672559928149,0.7458172875922173], true);
graphito.generate.edge = (function graphito$generate$edge(i,j){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$source,i,cljs.core.constant$keyword$target,j], null);
});
graphito.generate.node = (function graphito$generate$node(name){
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$name,name], null);
});
graphito.generate.gilbert_graph = (function graphito$generate$gilbert_graph(num_nodes,p){
var nodes = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(num_nodes,cljs.core.map.cljs$core$IFn$_invoke$arity$2(graphito.generate.node,cljs.core.cycle(graphito.generate.names))));
var links = cljs.core.vec((function (){var iter__4227__auto__ = ((function (nodes){
return (function graphito$generate$gilbert_graph_$_iter__4501(s__4502){
return (new cljs.core.LazySeq(null,((function (nodes){
return (function (){
var s__4502__$1 = s__4502;
while(true){
var temp__4425__auto__ = cljs.core.seq(s__4502__$1);
if(temp__4425__auto__){
var xs__4977__auto__ = temp__4425__auto__;
var source = cljs.core.first(xs__4977__auto__);
var iterys__4223__auto__ = ((function (s__4502__$1,source,xs__4977__auto__,temp__4425__auto__,nodes){
return (function graphito$generate$gilbert_graph_$_iter__4501_$_iter__4503(s__4504){
return (new cljs.core.LazySeq(null,((function (s__4502__$1,source,xs__4977__auto__,temp__4425__auto__,nodes){
return (function (){
var s__4504__$1 = s__4504;
while(true){
var temp__4425__auto____$1 = cljs.core.seq(s__4504__$1);
if(temp__4425__auto____$1){
var s__4504__$2 = temp__4425__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__4504__$2)){
var c__4225__auto__ = cljs.core.chunk_first(s__4504__$2);
var size__4226__auto__ = cljs.core.count(c__4225__auto__);
var b__4506 = cljs.core.chunk_buffer(size__4226__auto__);
if((function (){var i__4505 = (0);
while(true){
if((i__4505 < size__4226__auto__)){
var target = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4225__auto__,i__4505);
if(((function (){var G__4518 = cljs.core.mod(((num_nodes * source) + target),cljs.core.count(graphito.generate.rands));
return (graphito.generate.rands.cljs$core$IFn$_invoke$arity$1 ? graphito.generate.rands.cljs$core$IFn$_invoke$arity$1(G__4518) : graphito.generate.rands.call(null,G__4518));
})() < p)){
cljs.core.chunk_append(b__4506,graphito.generate.edge(source,target));

var G__4520 = (i__4505 + (1));
i__4505 = G__4520;
continue;
} else {
var G__4521 = (i__4505 + (1));
i__4505 = G__4521;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__4506),graphito$generate$gilbert_graph_$_iter__4501_$_iter__4503(cljs.core.chunk_rest(s__4504__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__4506),null);
}
} else {
var target = cljs.core.first(s__4504__$2);
if(((function (){var G__4519 = cljs.core.mod(((num_nodes * source) + target),cljs.core.count(graphito.generate.rands));
return (graphito.generate.rands.cljs$core$IFn$_invoke$arity$1 ? graphito.generate.rands.cljs$core$IFn$_invoke$arity$1(G__4519) : graphito.generate.rands.call(null,G__4519));
})() < p)){
return cljs.core.cons(graphito.generate.edge(source,target),graphito$generate$gilbert_graph_$_iter__4501_$_iter__4503(cljs.core.rest(s__4504__$2)));
} else {
var G__4522 = cljs.core.rest(s__4504__$2);
s__4504__$1 = G__4522;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__4502__$1,source,xs__4977__auto__,temp__4425__auto__,nodes))
,null,null));
});})(s__4502__$1,source,xs__4977__auto__,temp__4425__auto__,nodes))
;
var fs__4224__auto__ = cljs.core.seq(iterys__4223__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((source + (1)),num_nodes)));
if(fs__4224__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__4224__auto__,graphito$generate$gilbert_graph_$_iter__4501(cljs.core.rest(s__4502__$1)));
} else {
var G__4523 = cljs.core.rest(s__4502__$1);
s__4502__$1 = G__4523;
continue;
}
} else {
return null;
}
break;
}
});})(nodes))
,null,null));
});})(nodes))
;
return iter__4227__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((num_nodes - (1))));
})());
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$nodes,nodes,cljs.core.constant$keyword$links,links], null);
});
goog.exportSymbol('graphito.generate.gilbert_graph', graphito.generate.gilbert_graph);
