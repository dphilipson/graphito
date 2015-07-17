// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('clojure.browser.repl');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.userAgent.product');
goog.require('goog.object');
goog.require('clojure.browser.net');
goog.require('clojure.browser.event');
goog.require('cljs.repl');
clojure.browser.repl.xpc_connection = (function (){var G__10254 = null;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__10254) : cljs.core.atom.call(null,G__10254));
})();
clojure.browser.repl.repl_print = (function clojure$browser$repl$repl_print(data){
var temp__4423__auto__ = (function (){var G__10256 = clojure.browser.repl.xpc_connection;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__10256) : cljs.core.deref.call(null,G__10256));
})();
if(cljs.core.truth_(temp__4423__auto__)){
var conn = temp__4423__auto__;
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(conn,cljs.core.constant$keyword$print,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data], 0)));
} else {
return null;
}
});
clojure.browser.repl.get_ua_product = (function clojure$browser$repl$get_ua_product(){
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return cljs.core.constant$keyword$safari;
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return cljs.core.constant$keyword$chrome;
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return cljs.core.constant$keyword$firefox;
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return cljs.core.constant$keyword$ie;
} else {
return null;
}
}
}
}
});
/**
 * Process a single block of JavaScript received from the server
 */
clojure.browser.repl.evaluate_javascript = (function clojure$browser$repl$evaluate_javascript(conn,block){
var result = (function (){try{return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.constant$keyword$status,cljs.core.constant$keyword$success,cljs.core.constant$keyword$value,[cljs.core.str(eval(block))].join('')], null);
}catch (e10258){var e = e10258;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.constant$keyword$status,cljs.core.constant$keyword$exception,cljs.core.constant$keyword$ua_DASH_product,clojure.browser.repl.get_ua_product(),cljs.core.constant$keyword$value,[cljs.core.str(e)].join(''),cljs.core.constant$keyword$stacktrace,(cljs.core.truth_(e.hasOwnProperty("stack"))?e.stack:"No stacktrace available.")], null);
}})();
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([result], 0));
});
clojure.browser.repl.send_result = (function clojure$browser$repl$send_result(connection,url,data){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(connection,url,"POST",data,null,(0));
});
/**
 * Send data to be printed in the REPL. If there is an error, try again
 * up to 10 times.
 */
clojure.browser.repl.send_print = (function clojure$browser$repl$send_print(){
var G__10260 = arguments.length;
switch (G__10260) {
case 2:
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2 = (function (url,data){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3(url,data,(0));
});

clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3 = (function (url,data,n){
var conn = clojure.browser.net.xhr_connection();
clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3(conn,cljs.core.constant$keyword$error,((function (conn){
return (function (_){
if((n < (10))){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3(url,data,(n + (1)));
} else {
return console.log([cljs.core.str("Could not send "),cljs.core.str(data),cljs.core.str(" after "),cljs.core.str(n),cljs.core.str(" attempts.")].join(''));
}
});})(conn))
);

return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(conn,url,"POST",data,null,(0));
});

clojure.browser.repl.send_print.cljs$lang$maxFixedArity = 3;
clojure.browser.repl.order = (function (){var G__10262 = (0);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__10262) : cljs.core.atom.call(null,G__10262));
})();
clojure.browser.repl.wrap_message = (function clojure$browser$repl$wrap_message(t,data){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.constant$keyword$type,t,cljs.core.constant$keyword$content,data,cljs.core.constant$keyword$order,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(clojure.browser.repl.order,cljs.core.inc)], null)], 0));
});
/**
 * Start the REPL server connection.
 */
clojure.browser.repl.start_evaluator = (function clojure$browser$repl$start_evaluator(url){
var temp__4423__auto__ = clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4423__auto__)){
var repl_connection = temp__4423__auto__;
var connection = clojure.browser.net.xhr_connection();
clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3(connection,cljs.core.constant$keyword$success,((function (connection,repl_connection,temp__4423__auto__){
return (function (e){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constant$keyword$evaluate_DASH_javascript,e.currentTarget.getResponseText(cljs.core.List.EMPTY));
});})(connection,repl_connection,temp__4423__auto__))
);

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constant$keyword$send_DASH_result,((function (connection,repl_connection,temp__4423__auto__){
return (function (data){
return clojure.browser.repl.send_result(connection,url,clojure.browser.repl.wrap_message(cljs.core.constant$keyword$result,data));
});})(connection,repl_connection,temp__4423__auto__))
);

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constant$keyword$print,((function (connection,repl_connection,temp__4423__auto__){
return (function (data){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2(url,clojure.browser.repl.wrap_message(cljs.core.constant$keyword$print,data));
});})(connection,repl_connection,temp__4423__auto__))
);

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$2(repl_connection,cljs.core.constantly(null));

var G__10266 = ((function (connection,repl_connection,temp__4423__auto__){
return (function (){
return clojure.browser.repl.send_result(connection,url,clojure.browser.repl.wrap_message(cljs.core.constant$keyword$ready,"ready"));
});})(connection,repl_connection,temp__4423__auto__))
;
var G__10267 = (50);
return setTimeout(G__10266,G__10267);
} else {
var G__10268 = "No 'xpc' param provided to child iframe.";
return alert(G__10268);
}
});
clojure.browser.repl.load_queue = null;
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 * in goog.base to support re-loading of namespaces after page load.
 */
clojure.browser.repl.bootstrap = (function clojure$browser$repl$bootstrap(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require__ = goog.require;

goog.isProvided_ = (function (name){
return false;
});

goog.writeScriptTag__ = (function (src,opt_sourceText){
var loaded = (function (){var G__10296 = false;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__10296) : cljs.core.atom.call(null,G__10296));
})();
var onload = ((function (loaded){
return (function (){
if(cljs.core.truth_((function (){var and__3877__auto__ = clojure.browser.repl.load_queue;
if(cljs.core.truth_(and__3877__auto__)){
return (function (){var G__10297 = loaded;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__10297) : cljs.core.deref.call(null,G__10297));
})() === false;
} else {
return and__3877__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(loaded,cljs.core.not);

if((clojure.browser.repl.load_queue.length === (0))){
return clojure.browser.repl.load_queue = null;
} else {
return goog.writeScriptTag__.apply(null,clojure.browser.repl.load_queue.shift());
}
} else {
return null;
}
});})(loaded))
;
return document.body.appendChild((function (){var script = document.createElement("script");
var script__$1 = (function (){var G__10298 = script;
var G__10299_10323 = G__10298;
var G__10300_10324 = "type";
var G__10301_10325 = "text/javascript";
goog.object.set(G__10299_10323,G__10300_10324,G__10301_10325);

var G__10302_10326 = G__10298;
var G__10303_10327 = "onload";
var G__10304_10328 = onload;
goog.object.set(G__10302_10326,G__10303_10327,G__10304_10328);

var G__10305_10329 = G__10298;
var G__10306_10330 = "onreadystatechange";
var G__10307_10331 = onload;
goog.object.set(G__10305_10329,G__10306_10330,G__10307_10331);

return G__10298;
})();
var script__$2 = (((opt_sourceText == null))?(function (){var G__10308 = script__$1;
var G__10309_10332 = G__10308;
var G__10310_10333 = "src";
var G__10311_10334 = src;
goog.object.set(G__10309_10332,G__10310_10333,G__10311_10334);

return G__10308;
})():(function (){var G__10312 = script__$1;
var G__10313_10335 = G__10312;
var G__10314_10336 = opt_sourceText;
goog.dom.setTextContext(G__10313_10335,G__10314_10336);

return G__10312;
})());
return script__$2;
})());
});

goog.writeScriptTag_ = (function (src,opt_sourceText){
if(cljs.core.truth_(clojure.browser.repl.load_queue)){
return clojure.browser.repl.load_queue.push([src,opt_sourceText]);
} else {
clojure.browser.repl.load_queue = [];

var G__10315 = src;
var G__10316 = opt_sourceText;
return goog.writeScriptTag__(G__10315,G__10316);
}
});

return goog.require = (function (src,reload){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(reload,"reload-all")){
goog.cljsReloadAll_ = true;
} else {
}

var reload_QMARK_ = (function (){var or__3885__auto__ = reload;
if(cljs.core.truth_(or__3885__auto__)){
return or__3885__auto__;
} else {
return goog.cljsReloadAll__;
}
})();
if(cljs.core.truth_(reload_QMARK_)){
var path_10337 = (goog.dependencies_.nameToPath[src]);
var G__10317_10338 = goog.dependencies_.visited;
var G__10318_10339 = path_10337;
goog.object.remove(G__10317_10338,G__10318_10339);

var G__10319_10340 = goog.dependencies_.written;
var G__10320_10341 = path_10337;
goog.object.remove(G__10319_10340,G__10320_10341);

var G__10321_10342 = goog.dependencies_.written;
var G__10322_10343 = [cljs.core.str(goog.basePath),cljs.core.str(path_10337)].join('');
goog.object.remove(G__10321_10342,G__10322_10343);
} else {
}

var ret = goog.require__(src);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(reload,"reload-all")){
goog.cljsReloadAll_ = false;
} else {
}

return ret;
});
}
});
/**
 * Connects to a REPL server from an HTML document. After the
 * connection is made, the REPL will evaluate forms in the context of
 * the document that called this function.
 */
clojure.browser.repl.connect = (function clojure$browser$repl$connect(repl_server_url){
var repl_connection = clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.constant$keyword$peer_uri,repl_server_url], null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(clojure.browser.repl.xpc_connection,cljs.core.constantly(repl_connection));

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constant$keyword$evaluate_DASH_javascript,((function (repl_connection){
return (function (js){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constant$keyword$send_DASH_result,clojure.browser.repl.evaluate_javascript(repl_connection,js));
});})(repl_connection))
);

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constantly(null),((function (repl_connection){
return (function (iframe){
return iframe.style.display = "none";
});})(repl_connection))
);

clojure.browser.repl.bootstrap();

return repl_connection;
});
