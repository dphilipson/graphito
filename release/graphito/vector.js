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
var G__4529 = arguments.length;
switch (G__4529) {
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
var seq__4530_4535 = cljs.core.seq(vs);
var chunk__4531_4536 = null;
var count__4532_4537 = (0);
var i__4533_4538 = (0);
while(true){
if((i__4533_4538 < count__4532_4537)){
var v2_4539 = chunk__4531_4536.cljs$core$IIndexed$_nth$arity$2(null,i__4533_4538);
graphito.vector.add.cljs$core$IFn$_invoke$arity$2(v,v2_4539);

var G__4540 = seq__4530_4535;
var G__4541 = chunk__4531_4536;
var G__4542 = count__4532_4537;
var G__4543 = (i__4533_4538 + (1));
seq__4530_4535 = G__4540;
chunk__4531_4536 = G__4541;
count__4532_4537 = G__4542;
i__4533_4538 = G__4543;
continue;
} else {
var temp__4425__auto___4544 = cljs.core.seq(seq__4530_4535);
if(temp__4425__auto___4544){
var seq__4530_4545__$1 = temp__4425__auto___4544;
if(cljs.core.chunked_seq_QMARK_(seq__4530_4545__$1)){
var c__4254__auto___4546 = cljs.core.chunk_first(seq__4530_4545__$1);
var G__4547 = cljs.core.chunk_rest(seq__4530_4545__$1);
var G__4548 = c__4254__auto___4546;
var G__4549 = cljs.core.count(c__4254__auto___4546);
var G__4550 = (0);
seq__4530_4535 = G__4547;
chunk__4531_4536 = G__4548;
count__4532_4537 = G__4549;
i__4533_4538 = G__4550;
continue;
} else {
var v2_4551 = cljs.core.first(seq__4530_4545__$1);
graphito.vector.add.cljs$core$IFn$_invoke$arity$2(v,v2_4551);

var G__4552 = cljs.core.next(seq__4530_4545__$1);
var G__4553 = null;
var G__4554 = (0);
var G__4555 = (0);
seq__4530_4535 = G__4552;
chunk__4531_4536 = G__4553;
count__4532_4537 = G__4554;
i__4533_4538 = G__4555;
continue;
}
} else {
}
}
break;
}

return v;
});

graphito.vector.add.cljs$lang$applyTo = (function (seq4526){
var G__4527 = cljs.core.first(seq4526);
var seq4526__$1 = cljs.core.next(seq4526);
return graphito.vector.add.cljs$core$IFn$_invoke$arity$variadic(G__4527,seq4526__$1);
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
return graphito.vector.multiply(v,(l / (function (){var G__4557 = v;
return (graphito.vector.length.cljs$core$IFn$_invoke$arity$1 ? graphito.vector.length.cljs$core$IFn$_invoke$arity$1(G__4557) : graphito.vector.length.call(null,G__4557));
})()));
});
