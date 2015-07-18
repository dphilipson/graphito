// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str((function (){var temp__4425__auto__ = cljs.core.constant$keyword$ns.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(cljs.core.constant$keyword$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(cljs.core.constant$keyword$protocol.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.constant$keyword$forms.cljs$core$IFn$_invoke$arity$1(m))){
var seq__10456_10468 = cljs.core.seq(cljs.core.constant$keyword$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__10457_10469 = null;
var count__10458_10470 = (0);
var i__10459_10471 = (0);
while(true){
if((i__10459_10471 < count__10458_10470)){
var f_10472 = chunk__10457_10469.cljs$core$IIndexed$_nth$arity$2(null,i__10459_10471);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_10472], 0));

var G__10473 = seq__10456_10468;
var G__10474 = chunk__10457_10469;
var G__10475 = count__10458_10470;
var G__10476 = (i__10459_10471 + (1));
seq__10456_10468 = G__10473;
chunk__10457_10469 = G__10474;
count__10458_10470 = G__10475;
i__10459_10471 = G__10476;
continue;
} else {
var temp__4425__auto___10477 = cljs.core.seq(seq__10456_10468);
if(temp__4425__auto___10477){
var seq__10456_10478__$1 = temp__4425__auto___10477;
if(cljs.core.chunked_seq_QMARK_(seq__10456_10478__$1)){
var c__4254__auto___10479 = cljs.core.chunk_first(seq__10456_10478__$1);
var G__10480 = cljs.core.chunk_rest(seq__10456_10478__$1);
var G__10481 = c__4254__auto___10479;
var G__10482 = cljs.core.count(c__4254__auto___10479);
var G__10483 = (0);
seq__10456_10468 = G__10480;
chunk__10457_10469 = G__10481;
count__10458_10470 = G__10482;
i__10459_10471 = G__10483;
continue;
} else {
var f_10484 = cljs.core.first(seq__10456_10478__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_10484], 0));

var G__10485 = cljs.core.next(seq__10456_10478__$1);
var G__10486 = null;
var G__10487 = (0);
var G__10488 = (0);
seq__10456_10468 = G__10485;
chunk__10457_10469 = G__10486;
count__10458_10470 = G__10487;
i__10459_10471 = G__10488;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.constant$keyword$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_10489 = cljs.core.constant$keyword$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__3885__auto__ = cljs.core.constant$keyword$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return cljs.core.constant$keyword$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_10489], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_10489)))?cljs.core.second(arglists_10489):arglists_10489)], 0));
}
} else {
}
}

if(cljs.core.truth_(cljs.core.constant$keyword$special_DASH_form.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.constant$keyword$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,cljs.core.constant$keyword$url)){
if(cljs.core.truth_(cljs.core.constant$keyword$url.cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(cljs.core.constant$keyword$url.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(cljs.core.constant$keyword$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(cljs.core.constant$keyword$macro.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.constant$keyword$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.constant$keyword$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(cljs.core.constant$keyword$protocol.cljs$core$IFn$_invoke$arity$1(m))){
var seq__10460 = cljs.core.seq(cljs.core.constant$keyword$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__10461 = null;
var count__10462 = (0);
var i__10463 = (0);
while(true){
if((i__10463 < count__10462)){
var vec__10464 = chunk__10461.cljs$core$IIndexed$_nth$arity$2(null,i__10463);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10464,(0),null);
var map__10465 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10464,(1),null);
var map__10465__$1 = ((cljs.core.seq_QMARK_(map__10465))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10465):map__10465);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10465__$1,cljs.core.constant$keyword$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10465__$1,cljs.core.constant$keyword$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__10490 = seq__10460;
var G__10491 = chunk__10461;
var G__10492 = count__10462;
var G__10493 = (i__10463 + (1));
seq__10460 = G__10490;
chunk__10461 = G__10491;
count__10462 = G__10492;
i__10463 = G__10493;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__10460);
if(temp__4425__auto__){
var seq__10460__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10460__$1)){
var c__4254__auto__ = cljs.core.chunk_first(seq__10460__$1);
var G__10494 = cljs.core.chunk_rest(seq__10460__$1);
var G__10495 = c__4254__auto__;
var G__10496 = cljs.core.count(c__4254__auto__);
var G__10497 = (0);
seq__10460 = G__10494;
chunk__10461 = G__10495;
count__10462 = G__10496;
i__10463 = G__10497;
continue;
} else {
var vec__10466 = cljs.core.first(seq__10460__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10466,(0),null);
var map__10467 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10466,(1),null);
var map__10467__$1 = ((cljs.core.seq_QMARK_(map__10467))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10467):map__10467);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10467__$1,cljs.core.constant$keyword$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10467__$1,cljs.core.constant$keyword$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__10498 = cljs.core.next(seq__10460__$1);
var G__10499 = null;
var G__10500 = (0);
var G__10501 = (0);
seq__10460 = G__10498;
chunk__10461 = G__10499;
count__10462 = G__10500;
i__10463 = G__10501;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});
