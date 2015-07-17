// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('clojure.browser.event');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');

clojure.browser.event.IEventType = (function (){var obj10347 = {};
return obj10347;
})();

clojure.browser.event.event_types = (function clojure$browser$event$event_types(this$){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$event$IEventType$event_types$arity$1;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$event$IEventType$event_types$arity$1(this$);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.event.event_types[(function (){var G__10351 = x__4149__auto__;
return goog.typeOf(G__10351);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.event.event_types["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IEventType.event-types",this$);
}
}
})().call(null,this$);
}
});

goog.events.EventTarget.prototype.clojure$browser$event$IEventType$ = true;

goog.events.EventTarget.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__10352){
var vec__10353 = p__10352;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10353,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10353,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
});
if(typeof Element !== 'undefined'){
Element.prototype.clojure$browser$event$IEventType$ = true;

Element.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__10354){
var vec__10355 = p__10354;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10355,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10355,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
});
} else {
}
clojure.browser.event.listen = (function clojure$browser$event$listen(){
var G__10357 = arguments.length;
switch (G__10357) {
case 3:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__10358 = src;
var G__10359 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__10360 = fn;
var G__10361 = capture_QMARK_;
return goog.events.listen(G__10358,G__10359,G__10360,G__10361);
});

clojure.browser.event.listen.cljs$lang$maxFixedArity = 4;
clojure.browser.event.listen_once = (function clojure$browser$event$listen_once(){
var G__10364 = arguments.length;
switch (G__10364) {
case 3:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__10365 = src;
var G__10366 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__10367 = fn;
var G__10368 = capture_QMARK_;
return goog.events.listenOnce(G__10365,G__10366,G__10367,G__10368);
});

clojure.browser.event.listen_once.cljs$lang$maxFixedArity = 4;
clojure.browser.event.unlisten = (function clojure$browser$event$unlisten(){
var G__10371 = arguments.length;
switch (G__10371) {
case 3:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__10372 = src;
var G__10373 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__10374 = fn;
var G__10375 = capture_QMARK_;
return goog.events.unlisten(G__10372,G__10373,G__10374,G__10375);
});

clojure.browser.event.unlisten.cljs$lang$maxFixedArity = 4;
clojure.browser.event.unlisten_by_key = (function clojure$browser$event$unlisten_by_key(key){
var G__10378 = key;
return goog.events.unlistenByKey(G__10378);
});
clojure.browser.event.dispatch_event = (function clojure$browser$event$dispatch_event(src,event){
var G__10381 = src;
var G__10382 = event;
return goog.events.dispatchEvent(G__10381,G__10382);
});
clojure.browser.event.expose = (function clojure$browser$event$expose(e){
var G__10384 = e;
return goog.events.expose(G__10384);
});
clojure.browser.event.fire_listeners = (function clojure$browser$event$fire_listeners(obj,type,capture,event){
return null;
});
clojure.browser.event.total_listener_count = (function clojure$browser$event$total_listener_count(){
return goog.events.getTotalListenerCount();
});
clojure.browser.event.get_listener = (function clojure$browser$event$get_listener(src,type,listener,opt_capt,opt_handler){
return null;
});
clojure.browser.event.all_listeners = (function clojure$browser$event$all_listeners(obj,type,capture){
return null;
});
clojure.browser.event.unique_event_id = (function clojure$browser$event$unique_event_id(event_type){
return null;
});
clojure.browser.event.has_listener = (function clojure$browser$event$has_listener(obj,opt_type,opt_capture){
return null;
});
clojure.browser.event.remove_all = (function clojure$browser$event$remove_all(opt_obj,opt_type,opt_capt){
return null;
});
