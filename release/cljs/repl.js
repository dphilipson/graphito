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
var seq__10399_10411 = cljs.core.seq(cljs.core.constant$keyword$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__10400_10412 = null;
var count__10401_10413 = (0);
var i__10402_10414 = (0);
while(true){
if((i__10402_10414 < count__10401_10413)){
var f_10415 = chunk__10400_10412.cljs$core$IIndexed$_nth$arity$2(null,i__10402_10414);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_10415], 0));

var G__10416 = seq__10399_10411;
var G__10417 = chunk__10400_10412;
var G__10418 = count__10401_10413;
var G__10419 = (i__10402_10414 + (1));
seq__10399_10411 = G__10416;
chunk__10400_10412 = G__10417;
count__10401_10413 = G__10418;
i__10402_10414 = G__10419;
continue;
} else {
var temp__4425__auto___10420 = cljs.core.seq(seq__10399_10411);
if(temp__4425__auto___10420){
var seq__10399_10421__$1 = temp__4425__auto___10420;
if(cljs.core.chunked_seq_QMARK_(seq__10399_10421__$1)){
var c__4254__auto___10422 = cljs.core.chunk_first(seq__10399_10421__$1);
var G__10423 = cljs.core.chunk_rest(seq__10399_10421__$1);
var G__10424 = c__4254__auto___10422;
var G__10425 = cljs.core.count(c__4254__auto___10422);
var G__10426 = (0);
seq__10399_10411 = G__10423;
chunk__10400_10412 = G__10424;
count__10401_10413 = G__10425;
i__10402_10414 = G__10426;
continue;
} else {
var f_10427 = cljs.core.first(seq__10399_10421__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_10427], 0));

var G__10428 = cljs.core.next(seq__10399_10421__$1);
var G__10429 = null;
var G__10430 = (0);
var G__10431 = (0);
seq__10399_10411 = G__10428;
chunk__10400_10412 = G__10429;
count__10401_10413 = G__10430;
i__10402_10414 = G__10431;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.constant$keyword$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_10432 = cljs.core.constant$keyword$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__3885__auto__ = cljs.core.constant$keyword$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return cljs.core.constant$keyword$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_10432], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_10432)))?cljs.core.second(arglists_10432):arglists_10432)], 0));
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
var seq__10403 = cljs.core.seq(cljs.core.constant$keyword$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__10404 = null;
var count__10405 = (0);
var i__10406 = (0);
while(true){
if((i__10406 < count__10405)){
var vec__10407 = chunk__10404.cljs$core$IIndexed$_nth$arity$2(null,i__10406);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10407,(0),null);
var map__10408 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10407,(1),null);
var map__10408__$1 = ((cljs.core.seq_QMARK_(map__10408))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10408):map__10408);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10408__$1,cljs.core.constant$keyword$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10408__$1,cljs.core.constant$keyword$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__10433 = seq__10403;
var G__10434 = chunk__10404;
var G__10435 = count__10405;
var G__10436 = (i__10406 + (1));
seq__10403 = G__10433;
chunk__10404 = G__10434;
count__10405 = G__10435;
i__10406 = G__10436;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq(seq__10403);
if(temp__4425__auto__){
var seq__10403__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__10403__$1)){
var c__4254__auto__ = cljs.core.chunk_first(seq__10403__$1);
var G__10437 = cljs.core.chunk_rest(seq__10403__$1);
var G__10438 = c__4254__auto__;
var G__10439 = cljs.core.count(c__4254__auto__);
var G__10440 = (0);
seq__10403 = G__10437;
chunk__10404 = G__10438;
count__10405 = G__10439;
i__10406 = G__10440;
continue;
} else {
var vec__10409 = cljs.core.first(seq__10403__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10409,(0),null);
var map__10410 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10409,(1),null);
var map__10410__$1 = ((cljs.core.seq_QMARK_(map__10410))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10410):map__10410);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10410__$1,cljs.core.constant$keyword$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10410__$1,cljs.core.constant$keyword$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__10441 = cljs.core.next(seq__10403__$1);
var G__10442 = null;
var G__10443 = (0);
var G__10444 = (0);
seq__10403 = G__10441;
chunk__10404 = G__10442;
count__10405 = G__10443;
i__10406 = G__10444;
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
