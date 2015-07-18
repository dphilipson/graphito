// Compiled by ClojureScript 0.0-3308 {:static-fns true, :optimize-constants true}
goog.provide('clojure.browser.net');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.net.WebSocket');
goog.require('goog.net.EventType');
goog.require('goog.json');
goog.require('goog.net.xpc.CfgFields');
goog.require('goog.net.XhrIo');
goog.require('clojure.browser.event');
goog.require('goog.net.xpc.CrossPageChannel');
clojure.browser.net._STAR_timeout_STAR_ = (10000);
clojure.browser.net.event_types = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__10504){
var vec__10505 = p__10504;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10505,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10505,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
}),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.net.EventType)], 0))));

clojure.browser.net.IConnection = (function (){var obj10507 = {};
return obj10507;
})();

clojure.browser.net.connect = (function clojure$browser$net$connect(){
var G__10509 = arguments.length;
switch (G__10509) {
case 1:
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$1 = (function (this$){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$connect$arity$1;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$connect$arity$1(this$);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.connect[(function (){var G__10511 = x__4149__auto__;
return goog.typeOf(G__10511);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.connect["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.connect",this$);
}
}
})().call(null,this$);
}
});

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$2 = (function (this$,opt1){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$connect$arity$2;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$connect$arity$2(this$,opt1);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.connect[(function (){var G__10513 = x__4149__auto__;
return goog.typeOf(G__10513);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.connect["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.connect",this$);
}
}
})().call(null,this$,opt1);
}
});

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$3 = (function (this$,opt1,opt2){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$connect$arity$3;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$connect$arity$3(this$,opt1,opt2);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.connect[(function (){var G__10515 = x__4149__auto__;
return goog.typeOf(G__10515);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.connect["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2);
}
});

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$4 = (function (this$,opt1,opt2,opt3){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$connect$arity$4;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$connect$arity$4(this$,opt1,opt2,opt3);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.connect[(function (){var G__10517 = x__4149__auto__;
return goog.typeOf(G__10517);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.connect["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.connect",this$);
}
}
})().call(null,this$,opt1,opt2,opt3);
}
});

clojure.browser.net.connect.cljs$lang$maxFixedArity = 4;

clojure.browser.net.transmit = (function clojure$browser$net$transmit(){
var G__10519 = arguments.length;
switch (G__10519) {
case 2:
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$2 = (function (this$,opt){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$transmit$arity$2;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$transmit$arity$2(this$,opt);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.transmit[(function (){var G__10521 = x__4149__auto__;
return goog.typeOf(G__10521);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.transmit["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.transmit",this$);
}
}
})().call(null,this$,opt);
}
});

clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3 = (function (this$,opt,opt2){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$transmit$arity$3;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$transmit$arity$3(this$,opt,opt2);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.transmit[(function (){var G__10523 = x__4149__auto__;
return goog.typeOf(G__10523);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.transmit["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2);
}
});

clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$4 = (function (this$,opt,opt2,opt3){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$transmit$arity$4;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$transmit$arity$4(this$,opt,opt2,opt3);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.transmit[(function (){var G__10525 = x__4149__auto__;
return goog.typeOf(G__10525);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.transmit["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3);
}
});

clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$5 = (function (this$,opt,opt2,opt3,opt4){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$transmit$arity$5;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$transmit$arity$5(this$,opt,opt2,opt3,opt4);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.transmit[(function (){var G__10527 = x__4149__auto__;
return goog.typeOf(G__10527);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.transmit["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4);
}
});

clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6 = (function (this$,opt,opt2,opt3,opt4,opt5){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$transmit$arity$6;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$transmit$arity$6(this$,opt,opt2,opt3,opt4,opt5);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.transmit[(function (){var G__10529 = x__4149__auto__;
return goog.typeOf(G__10529);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.transmit["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.transmit",this$);
}
}
})().call(null,this$,opt,opt2,opt3,opt4,opt5);
}
});

clojure.browser.net.transmit.cljs$lang$maxFixedArity = 6;

clojure.browser.net.close = (function clojure$browser$net$close(this$){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IConnection$close$arity$1;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IConnection$close$arity$1(this$);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.close[(function (){var G__10533 = x__4149__auto__;
return goog.typeOf(G__10533);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.close["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IConnection.close",this$);
}
}
})().call(null,this$);
}
});

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$ = true;

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$2 = (function (this$,uri){
var this$__$1 = this;
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(this$__$1,uri,"GET",null,null,clojure.browser.net._STAR_timeout_STAR_);
});

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$3 = (function (this$,uri,method){
var this$__$1 = this;
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(this$__$1,uri,method,null,null,clojure.browser.net._STAR_timeout_STAR_);
});

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$4 = (function (this$,uri,method,content){
var this$__$1 = this;
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(this$__$1,uri,method,content,null,clojure.browser.net._STAR_timeout_STAR_);
});

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$5 = (function (this$,uri,method,content,headers){
var this$__$1 = this;
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(this$__$1,uri,method,content,headers,clojure.browser.net._STAR_timeout_STAR_);
});

goog.net.XhrIo.prototype.clojure$browser$net$IConnection$transmit$arity$6 = (function (this$,uri,method,content,headers,timeout){
var this$__$1 = this;
this$__$1.setTimeoutInterval(timeout);

return this$__$1.send(uri,method,content,headers);
});

goog.net.XhrIo.prototype.clojure$browser$event$IEventType$ = true;

goog.net.XhrIo.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__10536){
var vec__10537 = p__10536;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10537,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10537,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.net.EventType)], 0))));
});
clojure.browser.net.xpc_config_fields = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__10538){
var vec__10539 = p__10538;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10539,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10539,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
}),cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.net.xpc.CfgFields)));
/**
 * Returns an XhrIo connection
 */
clojure.browser.net.xhr_connection = (function clojure$browser$net$xhr_connection(){
return (new goog.net.XhrIo());
});

clojure.browser.net.ICrossPageChannel = (function (){var obj10541 = {};
return obj10541;
})();

clojure.browser.net.register_service = (function clojure$browser$net$register_service(){
var G__10543 = arguments.length;
switch (G__10543) {
case 3:
return clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3 = (function (this$,service_name,fn){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$3(this$,service_name,fn);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.register_service[(function (){var G__10545 = x__4149__auto__;
return goog.typeOf(G__10545);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.register_service["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn);
}
});

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$4 = (function (this$,service_name,fn,encode_json_QMARK_){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$ICrossPageChannel$register_service$arity$4(this$,service_name,fn,encode_json_QMARK_);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.register_service[(function (){var G__10547 = x__4149__auto__;
return goog.typeOf(G__10547);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.register_service["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("ICrossPageChannel.register-service",this$);
}
}
})().call(null,this$,service_name,fn,encode_json_QMARK_);
}
});

clojure.browser.net.register_service.cljs$lang$maxFixedArity = 4;

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$ = true;

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$3 = (function (this$,service_name,fn){
var this$__$1 = this;
return clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$4(this$__$1,service_name,fn,false);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$ICrossPageChannel$register_service$arity$4 = (function (this$,service_name,fn,encode_json_QMARK_){
var this$__$1 = this;
return this$__$1.registerService(cljs.core.name(service_name),fn,encode_json_QMARK_);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$ = true;

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$1 = (function (this$){
var this$__$1 = this;
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$2(this$__$1,null);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$2 = (function (this$,on_connect_fn){
var this$__$1 = this;
return this$__$1.connect(on_connect_fn);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$3 = (function (this$,on_connect_fn,config_iframe_fn){
var this$__$1 = this;
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$4(this$__$1,on_connect_fn,config_iframe_fn,document.body);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$connect$arity$4 = (function (this$,on_connect_fn,config_iframe_fn,iframe_parent){
var this$__$1 = this;
this$__$1.createPeerIframe(iframe_parent,config_iframe_fn);

return this$__$1.connect(on_connect_fn);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$transmit$arity$3 = (function (this$,service_name,payload){
var this$__$1 = this;
return this$__$1.send(cljs.core.name(service_name),payload);
});

goog.net.xpc.CrossPageChannel.prototype.clojure$browser$net$IConnection$close$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.close();
});
/**
 * When passed with a config hash-map, returns a parent
 * CrossPageChannel object. Keys in the config hash map are downcased
 * versions of the goog.net.xpc.CfgFields enum keys,
 * e.g. goog.net.xpc.CfgFields.PEER_URI becomes :peer_uri in the config
 * hash.
 * 
 * When passed with no args, creates a child CrossPageChannel object,
 * and the config is automatically taken from the URL param 'xpc', as
 * per the CrossPageChannel API.
 */
clojure.browser.net.xpc_connection = (function clojure$browser$net$xpc_connection(){
var G__10550 = arguments.length;
switch (G__10550) {
case 0:
return clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$0 = (function (){
var temp__4425__auto__ = (new goog.Uri(window.location.href)).getParameterValue("xpc");
if(cljs.core.truth_(temp__4425__auto__)){
var config = temp__4425__auto__;
return (new goog.net.xpc.CrossPageChannel((function (){var G__10551 = config;
return goog.json.parse(G__10551);
})()));
} else {
return null;
}
});

clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$1 = (function (config){
return (new goog.net.xpc.CrossPageChannel(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (sum,p__10552){
var vec__10553 = p__10552;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10553,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10553,(1),null);
var temp__4423__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(clojure.browser.net.xpc_config_fields,k);
if(cljs.core.truth_(temp__4423__auto__)){
var field = temp__4423__auto__;
var G__10554 = sum;
(G__10554[field] = v);

return G__10554;
} else {
return sum;
}
}),(function (){var obj10556 = {};
return obj10556;
})(),config)));
});

clojure.browser.net.xpc_connection.cljs$lang$maxFixedArity = 1;

clojure.browser.net.IWebSocket = (function (){var obj10559 = {};
return obj10559;
})();

clojure.browser.net.open_QMARK_ = (function clojure$browser$net$open_QMARK_(this$){
if((function (){var and__3877__auto__ = this$;
if(and__3877__auto__){
return this$.clojure$browser$net$IWebSocket$open_QMARK_$arity$1;
} else {
return and__3877__auto__;
}
})()){
return this$.clojure$browser$net$IWebSocket$open_QMARK_$arity$1(this$);
} else {
var x__4149__auto__ = (((this$ == null))?null:this$);
return (function (){var or__3885__auto__ = (clojure.browser.net.open_QMARK_[(function (){var G__10563 = x__4149__auto__;
return goog.typeOf(G__10563);
})()]);
if(or__3885__auto__){
return or__3885__auto__;
} else {
var or__3885__auto____$1 = (clojure.browser.net.open_QMARK_["_"]);
if(or__3885__auto____$1){
return or__3885__auto____$1;
} else {
throw cljs.core.missing_protocol("IWebSocket.open?",this$);
}
}
})().call(null,this$);
}
});

goog.net.WebSocket.prototype.clojure$browser$net$IWebSocket$ = true;

goog.net.WebSocket.prototype.clojure$browser$net$IWebSocket$open_QMARK_$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.isOpen(cljs.core.List.EMPTY);
});

goog.net.WebSocket.prototype.clojure$browser$net$IConnection$ = true;

goog.net.WebSocket.prototype.clojure$browser$net$IConnection$connect$arity$2 = (function (this$,url){
var this$__$1 = this;
return clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$3(this$__$1,url,null);
});

goog.net.WebSocket.prototype.clojure$browser$net$IConnection$connect$arity$3 = (function (this$,url,protocol){
var this$__$1 = this;
return this$__$1.open(url,protocol);
});

goog.net.WebSocket.prototype.clojure$browser$net$IConnection$transmit$arity$2 = (function (this$,message){
var this$__$1 = this;
return this$__$1.send(message);
});

goog.net.WebSocket.prototype.clojure$browser$net$IConnection$close$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.close(cljs.core.List.EMPTY);
});

goog.net.WebSocket.prototype.clojure$browser$event$IEventType$ = true;

goog.net.WebSocket.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__10564){
var vec__10565 = p__10564;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10565,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10565,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.net.WebSocket.EventType)], 0))));
});
clojure.browser.net.websocket_connection = (function clojure$browser$net$websocket_connection(){
var G__10567 = arguments.length;
switch (G__10567) {
case 0:
return clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(arguments.length)].join('')));

}
});

clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$0 = (function (){
return clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$2(null,null);
});

clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$1 = (function (auto_reconnect_QMARK_){
return clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$2(auto_reconnect_QMARK_,null);
});

clojure.browser.net.websocket_connection.cljs$core$IFn$_invoke$arity$2 = (function (auto_reconnect_QMARK_,next_reconnect_fn){
return (new goog.net.WebSocket(auto_reconnect_QMARK_,next_reconnect_fn));
});

clojure.browser.net.websocket_connection.cljs$lang$maxFixedArity = 2;
