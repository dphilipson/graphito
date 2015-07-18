// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('graphito.vector');
goog.require('cljs.core');
graphito.vector.create = (function graphito$vector$create(x,y){
return [x,y];
});
graphito.vector.zero = (function graphito$vector$zero(){
return graphito.vector.create((0),(0));
});
graphito.vector.x = (function graphito$vector$x(v){
return (v[(0)]);
});
graphito.vector.y = (function graphito$vector$y(v){
return (v[(1)]);
});
graphito.vector.copy = (function graphito$vector$copy(v){
return v.slice();
});
graphito.vector.length_sq = (function graphito$vector$length_sq(v){
var x = graphito.vector.x(v);
var y = graphito.vector.y(v);
return ((x * x) + (y * y));
});
graphito.vector.length = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(Math.sqrt,graphito.vector.length_sq);
graphito.vector.distance_sq = (function graphito$vector$distance_sq(v1,v2){
var x1 = graphito.vector.x(v1);
var y1 = graphito.vector.y(v1);
var x2 = graphito.vector.x(v2);
var y2 = graphito.vector.y(v2);
var dx = (x2 - x1);
var dy = (y2 - y1);
return ((dx * dx) + (dy * dy));
});
graphito.vector.distance = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(Math.sqrt,graphito.vector.distance_sq);
graphito.vector.add = (function graphito$vector$add(){
var G__4582 = arguments.length;
switch (G__4582) {
case 2:
return graphito.vector.add.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__4408__auto__ = (new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,2),(0)));
return graphito.vector.add.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4408__auto__);

}
});

graphito.vector.add.cljs$core$IFn$_invoke$arity$2 = (function (v1,v2){
var x1 = graphito.vector.x(v1);
var y1 = graphito.vector.y(v1);
var x2 = graphito.vector.x(v2);
var y2 = graphito.vector.y(v2);
(v1[(0)] = (x1 + x2));

(v1[(1)] = (y1 + y2));

return v1;
});

graphito.vector.add.cljs$core$IFn$_invoke$arity$variadic = (function (v,vs){
var seq__4583_4588 = cljs.core.seq(vs);
var chunk__4584_4589 = null;
var count__4585_4590 = (0);
var i__4586_4591 = (0);
while(true){
if((i__4586_4591 < count__4585_4590)){
var v2_4592 = chunk__4584_4589.cljs$core$IIndexed$_nth$arity$2(null,i__4586_4591);
graphito.vector.add.cljs$core$IFn$_invoke$arity$2(v,v2_4592);

var G__4593 = seq__4583_4588;
var G__4594 = chunk__4584_4589;
var G__4595 = count__4585_4590;
var G__4596 = (i__4586_4591 + (1));
seq__4583_4588 = G__4593;
chunk__4584_4589 = G__4594;
count__4585_4590 = G__4595;
i__4586_4591 = G__4596;
continue;
} else {
var temp__4425__auto___4597 = cljs.core.seq(seq__4583_4588);
if(temp__4425__auto___4597){
var seq__4583_4598__$1 = temp__4425__auto___4597;
if(cljs.core.chunked_seq_QMARK_(seq__4583_4598__$1)){
var c__4254__auto___4599 = cljs.core.chunk_first(seq__4583_4598__$1);
var G__4600 = cljs.core.chunk_rest(seq__4583_4598__$1);
var G__4601 = c__4254__auto___4599;
var G__4602 = cljs.core.count(c__4254__auto___4599);
var G__4603 = (0);
seq__4583_4588 = G__4600;
chunk__4584_4589 = G__4601;
count__4585_4590 = G__4602;
i__4586_4591 = G__4603;
continue;
} else {
var v2_4604 = cljs.core.first(seq__4583_4598__$1);
graphito.vector.add.cljs$core$IFn$_invoke$arity$2(v,v2_4604);

var G__4605 = cljs.core.next(seq__4583_4598__$1);
var G__4606 = null;
var G__4607 = (0);
var G__4608 = (0);
seq__4583_4588 = G__4605;
chunk__4584_4589 = G__4606;
count__4585_4590 = G__4607;
i__4586_4591 = G__4608;
continue;
}
} else {
}
}
break;
}

return v;
});

graphito.vector.add.cljs$lang$applyTo = (function (seq4579){
var G__4580 = cljs.core.first(seq4579);
var seq4579__$1 = cljs.core.next(seq4579);
return graphito.vector.add.cljs$core$IFn$_invoke$arity$variadic(G__4580,seq4579__$1);
});

graphito.vector.add.cljs$lang$maxFixedArity = 2;
graphito.vector.subtract = (function graphito$vector$subtract(v1,v2){
var x1 = graphito.vector.x(v1);
var y1 = graphito.vector.y(v1);
var x2 = graphito.vector.x(v2);
var y2 = graphito.vector.y(v2);
(v1[(0)] = (x1 - x2));

(v1[(1)] = (y1 - y2));

return v1;
});
graphito.vector.multiply = (function graphito$vector$multiply(v,c){
var x = graphito.vector.x(v);
var y = graphito.vector.y(v);
(v[(0)] = (c * x));

(v[(1)] = (c * y));

return v;
});
graphito.vector.neg = (function graphito$vector$neg(v){
return graphito.vector.multiply(v,(-1));
});
graphito.vector.set_length = (function graphito$vector$set_length(v,l){
return graphito.vector.multiply(v,(l / (function (){var G__4610 = v;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__4610) : graphito.vector.length.call(null,G__4610));
})()));
});
