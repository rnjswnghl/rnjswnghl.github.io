function K4(t,e){for(var i=0;i<e.length;i++){const a=e[i];if(typeof a!="string"&&!Array.isArray(a)){for(const s in a)if(s!=="default"&&!(s in t)){const l=Object.getOwnPropertyDescriptor(a,s);l&&Object.defineProperty(t,s,l.get?l:{enumerable:!0,get:()=>a[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=i(s);fetch(s.href,l)}})();function y5(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Wp={exports:{}},Pl={};var yv;function Z4(){if(yv)return Pl;yv=1;var t=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(a,s,l){var c=null;if(l!==void 0&&(c=""+l),s.key!==void 0&&(c=""+s.key),"key"in s){l={};for(var d in s)d!=="key"&&(l[d]=s[d])}else l=s;return s=l.ref,{$$typeof:t,type:a,key:c,ref:s!==void 0?s:null,props:l}}return Pl.Fragment=e,Pl.jsx=i,Pl.jsxs=i,Pl}var xv;function Q4(){return xv||(xv=1,Wp.exports=Z4()),Wp.exports}var b=Q4(),Jp={exports:{}},Ul={},em={exports:{}},tm={};var bv;function W4(){return bv||(bv=1,(function(t){function e(z,B){var $=z.length;z.push(B);e:for(;0<$;){var se=$-1>>>1,ce=z[se];if(0<s(ce,B))z[se]=B,z[$]=ce,$=se;else break e}}function i(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var B=z[0],$=z.pop();if($!==B){z[0]=$;e:for(var se=0,ce=z.length,P=ce>>>1;se<P;){var q=2*(se+1)-1,G=z[q],ne=q+1,ye=z[ne];if(0>s(G,$))ne<ce&&0>s(ye,G)?(z[se]=ye,z[ne]=$,se=ne):(z[se]=G,z[q]=$,se=q);else if(ne<ce&&0>s(ye,$))z[se]=ye,z[ne]=$,se=ne;else break e}}return B}function s(z,B){var $=z.sortIndex-B.sortIndex;return $!==0?$:z.id-B.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var l=performance;t.unstable_now=function(){return l.now()}}else{var c=Date,d=c.now();t.unstable_now=function(){return c.now()-d}}var f=[],h=[],m=1,g=null,x=3,_=!1,w=!1,v=!1,S=!1,C=typeof setTimeout=="function"?setTimeout:null,M=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;function L(z){for(var B=i(h);B!==null;){if(B.callback===null)a(h);else if(B.startTime<=z)a(h),B.sortIndex=B.expirationTime,e(f,B);else break;B=i(h)}}function O(z){if(v=!1,L(z),!w)if(i(f)!==null)w=!0,j||(j=!0,te());else{var B=i(h);B!==null&&Se(O,B.startTime-z)}}var j=!1,k=-1,U=5,I=-1;function Y(){return S?!0:!(t.unstable_now()-I<U)}function W(){if(S=!1,j){var z=t.unstable_now();I=z;var B=!0;try{e:{w=!1,v&&(v=!1,M(k),k=-1),_=!0;var $=x;try{t:{for(L(z),g=i(f);g!==null&&!(g.expirationTime>z&&Y());){var se=g.callback;if(typeof se=="function"){g.callback=null,x=g.priorityLevel;var ce=se(g.expirationTime<=z);if(z=t.unstable_now(),typeof ce=="function"){g.callback=ce,L(z),B=!0;break t}g===i(f)&&a(f),L(z)}else a(f);g=i(f)}if(g!==null)B=!0;else{var P=i(h);P!==null&&Se(O,P.startTime-z),B=!1}}break e}finally{g=null,x=$,_=!1}B=void 0}}finally{B?te():j=!1}}}var te;if(typeof R=="function")te=function(){R(W)};else if(typeof MessageChannel<"u"){var me=new MessageChannel,we=me.port2;me.port1.onmessage=W,te=function(){we.postMessage(null)}}else te=function(){C(W,0)};function Se(z,B){k=C(function(){z(t.unstable_now())},B)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return x},t.unstable_next=function(z){switch(x){case 1:case 2:case 3:var B=3;break;default:B=x}var $=x;x=B;try{return z()}finally{x=$}},t.unstable_requestPaint=function(){S=!0},t.unstable_runWithPriority=function(z,B){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var $=x;x=z;try{return B()}finally{x=$}},t.unstable_scheduleCallback=function(z,B,$){var se=t.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?se+$:se):$=se,z){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=$+ce,z={id:m++,callback:B,priorityLevel:z,startTime:$,expirationTime:ce,sortIndex:-1},$>se?(z.sortIndex=$,e(h,z),i(f)===null&&z===i(h)&&(v?(M(k),k=-1):v=!0,Se(O,$-se))):(z.sortIndex=ce,e(f,z),w||_||(w=!0,j||(j=!0,te()))),z},t.unstable_shouldYield=Y,t.unstable_wrapCallback=function(z){var B=x;return function(){var $=x;x=B;try{return z.apply(this,arguments)}finally{x=$}}}})(tm)),tm}var vv;function J4(){return vv||(vv=1,em.exports=W4()),em.exports}var nm={exports:{}},Pe={};var wv;function ek(){if(wv)return Pe;wv=1;var t=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),l=Symbol.for("react.consumer"),c=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),m=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function _(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var w={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},v=Object.assign,S={};function C(P,q,G){this.props=P,this.context=q,this.refs=S,this.updater=G||w}C.prototype.isReactComponent={},C.prototype.setState=function(P,q){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,q,"setState")},C.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function M(){}M.prototype=C.prototype;function R(P,q,G){this.props=P,this.context=q,this.refs=S,this.updater=G||w}var L=R.prototype=new M;L.constructor=R,v(L,C.prototype),L.isPureReactComponent=!0;var O=Array.isArray;function j(){}var k={H:null,A:null,T:null,S:null},U=Object.prototype.hasOwnProperty;function I(P,q,G){var ne=G.ref;return{$$typeof:t,type:P,key:q,ref:ne!==void 0?ne:null,props:G}}function Y(P,q){return I(P.type,q,P.props)}function W(P){return typeof P=="object"&&P!==null&&P.$$typeof===t}function te(P){var q={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(G){return q[G]})}var me=/\/+/g;function we(P,q){return typeof P=="object"&&P!==null&&P.key!=null?te(""+P.key):q.toString(36)}function Se(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(j,j):(P.status="pending",P.then(function(q){P.status==="pending"&&(P.status="fulfilled",P.value=q)},function(q){P.status==="pending"&&(P.status="rejected",P.reason=q)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function z(P,q,G,ne,ye){var ue=typeof P;(ue==="undefined"||ue==="boolean")&&(P=null);var Te=!1;if(P===null)Te=!0;else switch(ue){case"bigint":case"string":case"number":Te=!0;break;case"object":switch(P.$$typeof){case t:case e:Te=!0;break;case m:return Te=P._init,z(Te(P._payload),q,G,ne,ye)}}if(Te)return ye=ye(P),Te=ne===""?"."+we(P,0):ne,O(ye)?(G="",Te!=null&&(G=Te.replace(me,"$&/")+"/"),z(ye,q,G,"",function(Ue){return Ue})):ye!=null&&(W(ye)&&(ye=Y(ye,G+(ye.key==null||P&&P.key===ye.key?"":(""+ye.key).replace(me,"$&/")+"/")+Te)),q.push(ye)),1;Te=0;var he=ne===""?".":ne+":";if(O(P))for(var Ce=0;Ce<P.length;Ce++)ne=P[Ce],ue=he+we(ne,Ce),Te+=z(ne,q,G,ue,ye);else if(Ce=_(P),typeof Ce=="function")for(P=Ce.call(P),Ce=0;!(ne=P.next()).done;)ne=ne.value,ue=he+we(ne,Ce++),Te+=z(ne,q,G,ue,ye);else if(ue==="object"){if(typeof P.then=="function")return z(Se(P),q,G,ne,ye);throw q=String(P),Error("Objects are not valid as a React child (found: "+(q==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":q)+"). If you meant to render a collection of children, use an array instead.")}return Te}function B(P,q,G){if(P==null)return P;var ne=[],ye=0;return z(P,ne,"","",function(ue){return q.call(G,ue,ye++)}),ne}function $(P){if(P._status===-1){var q=P._result;q=q(),q.then(function(G){(P._status===0||P._status===-1)&&(P._status=1,P._result=G)},function(G){(P._status===0||P._status===-1)&&(P._status=2,P._result=G)}),P._status===-1&&(P._status=0,P._result=q)}if(P._status===1)return P._result.default;throw P._result}var se=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},ce={map:B,forEach:function(P,q,G){B(P,function(){q.apply(this,arguments)},G)},count:function(P){var q=0;return B(P,function(){q++}),q},toArray:function(P){return B(P,function(q){return q})||[]},only:function(P){if(!W(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return Pe.Activity=g,Pe.Children=ce,Pe.Component=C,Pe.Fragment=i,Pe.Profiler=s,Pe.PureComponent=R,Pe.StrictMode=a,Pe.Suspense=f,Pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,Pe.__COMPILER_RUNTIME={__proto__:null,c:function(P){return k.H.useMemoCache(P)}},Pe.cache=function(P){return function(){return P.apply(null,arguments)}},Pe.cacheSignal=function(){return null},Pe.cloneElement=function(P,q,G){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var ne=v({},P.props),ye=P.key;if(q!=null)for(ue in q.key!==void 0&&(ye=""+q.key),q)!U.call(q,ue)||ue==="key"||ue==="__self"||ue==="__source"||ue==="ref"&&q.ref===void 0||(ne[ue]=q[ue]);var ue=arguments.length-2;if(ue===1)ne.children=G;else if(1<ue){for(var Te=Array(ue),he=0;he<ue;he++)Te[he]=arguments[he+2];ne.children=Te}return I(P.type,ye,ne)},Pe.createContext=function(P){return P={$$typeof:c,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:l,_context:P},P},Pe.createElement=function(P,q,G){var ne,ye={},ue=null;if(q!=null)for(ne in q.key!==void 0&&(ue=""+q.key),q)U.call(q,ne)&&ne!=="key"&&ne!=="__self"&&ne!=="__source"&&(ye[ne]=q[ne]);var Te=arguments.length-2;if(Te===1)ye.children=G;else if(1<Te){for(var he=Array(Te),Ce=0;Ce<Te;Ce++)he[Ce]=arguments[Ce+2];ye.children=he}if(P&&P.defaultProps)for(ne in Te=P.defaultProps,Te)ye[ne]===void 0&&(ye[ne]=Te[ne]);return I(P,ue,ye)},Pe.createRef=function(){return{current:null}},Pe.forwardRef=function(P){return{$$typeof:d,render:P}},Pe.isValidElement=W,Pe.lazy=function(P){return{$$typeof:m,_payload:{_status:-1,_result:P},_init:$}},Pe.memo=function(P,q){return{$$typeof:h,type:P,compare:q===void 0?null:q}},Pe.startTransition=function(P){var q=k.T,G={};k.T=G;try{var ne=P(),ye=k.S;ye!==null&&ye(G,ne),typeof ne=="object"&&ne!==null&&typeof ne.then=="function"&&ne.then(j,se)}catch(ue){se(ue)}finally{q!==null&&G.types!==null&&(q.types=G.types),k.T=q}},Pe.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},Pe.use=function(P){return k.H.use(P)},Pe.useActionState=function(P,q,G){return k.H.useActionState(P,q,G)},Pe.useCallback=function(P,q){return k.H.useCallback(P,q)},Pe.useContext=function(P){return k.H.useContext(P)},Pe.useDebugValue=function(){},Pe.useDeferredValue=function(P,q){return k.H.useDeferredValue(P,q)},Pe.useEffect=function(P,q){return k.H.useEffect(P,q)},Pe.useEffectEvent=function(P){return k.H.useEffectEvent(P)},Pe.useId=function(){return k.H.useId()},Pe.useImperativeHandle=function(P,q,G){return k.H.useImperativeHandle(P,q,G)},Pe.useInsertionEffect=function(P,q){return k.H.useInsertionEffect(P,q)},Pe.useLayoutEffect=function(P,q){return k.H.useLayoutEffect(P,q)},Pe.useMemo=function(P,q){return k.H.useMemo(P,q)},Pe.useOptimistic=function(P,q){return k.H.useOptimistic(P,q)},Pe.useReducer=function(P,q,G){return k.H.useReducer(P,q,G)},Pe.useRef=function(P){return k.H.useRef(P)},Pe.useState=function(P){return k.H.useState(P)},Pe.useSyncExternalStore=function(P,q,G){return k.H.useSyncExternalStore(P,q,G)},Pe.useTransition=function(){return k.H.useTransition()},Pe.version="19.2.5",Pe}var Sv;function ig(){return Sv||(Sv=1,nm.exports=ek()),nm.exports}var im={exports:{}},Rn={};var _v;function tk(){if(_v)return Rn;_v=1;var t=ig();function e(f){var h="https://react.dev/errors/"+f;if(1<arguments.length){h+="?args[]="+encodeURIComponent(arguments[1]);for(var m=2;m<arguments.length;m++)h+="&args[]="+encodeURIComponent(arguments[m])}return"Minified React error #"+f+"; visit "+h+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var a={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},s=Symbol.for("react.portal");function l(f,h,m){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:s,key:g==null?null:""+g,children:f,containerInfo:h,implementation:m}}var c=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(f,h){if(f==="font")return"";if(typeof h=="string")return h==="use-credentials"?h:""}return Rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Rn.createPortal=function(f,h){var m=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!h||h.nodeType!==1&&h.nodeType!==9&&h.nodeType!==11)throw Error(e(299));return l(f,h,null,m)},Rn.flushSync=function(f){var h=c.T,m=a.p;try{if(c.T=null,a.p=2,f)return f()}finally{c.T=h,a.p=m,a.d.f()}},Rn.preconnect=function(f,h){typeof f=="string"&&(h?(h=h.crossOrigin,h=typeof h=="string"?h==="use-credentials"?h:"":void 0):h=null,a.d.C(f,h))},Rn.prefetchDNS=function(f){typeof f=="string"&&a.d.D(f)},Rn.preinit=function(f,h){if(typeof f=="string"&&h&&typeof h.as=="string"){var m=h.as,g=d(m,h.crossOrigin),x=typeof h.integrity=="string"?h.integrity:void 0,_=typeof h.fetchPriority=="string"?h.fetchPriority:void 0;m==="style"?a.d.S(f,typeof h.precedence=="string"?h.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:_}):m==="script"&&a.d.X(f,{crossOrigin:g,integrity:x,fetchPriority:_,nonce:typeof h.nonce=="string"?h.nonce:void 0})}},Rn.preinitModule=function(f,h){if(typeof f=="string")if(typeof h=="object"&&h!==null){if(h.as==null||h.as==="script"){var m=d(h.as,h.crossOrigin);a.d.M(f,{crossOrigin:m,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0})}}else h==null&&a.d.M(f)},Rn.preload=function(f,h){if(typeof f=="string"&&typeof h=="object"&&h!==null&&typeof h.as=="string"){var m=h.as,g=d(m,h.crossOrigin);a.d.L(f,m,{crossOrigin:g,integrity:typeof h.integrity=="string"?h.integrity:void 0,nonce:typeof h.nonce=="string"?h.nonce:void 0,type:typeof h.type=="string"?h.type:void 0,fetchPriority:typeof h.fetchPriority=="string"?h.fetchPriority:void 0,referrerPolicy:typeof h.referrerPolicy=="string"?h.referrerPolicy:void 0,imageSrcSet:typeof h.imageSrcSet=="string"?h.imageSrcSet:void 0,imageSizes:typeof h.imageSizes=="string"?h.imageSizes:void 0,media:typeof h.media=="string"?h.media:void 0})}},Rn.preloadModule=function(f,h){if(typeof f=="string")if(h){var m=d(h.as,h.crossOrigin);a.d.m(f,{as:typeof h.as=="string"&&h.as!=="script"?h.as:void 0,crossOrigin:m,integrity:typeof h.integrity=="string"?h.integrity:void 0})}else a.d.m(f)},Rn.requestFormReset=function(f){a.d.r(f)},Rn.unstable_batchedUpdates=function(f,h){return f(h)},Rn.useFormState=function(f,h,m){return c.H.useFormState(f,h,m)},Rn.useFormStatus=function(){return c.H.useHostTransitionStatus()},Rn.version="19.2.5",Rn}var Tv;function x5(){if(Tv)return im.exports;Tv=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(e){console.error(e)}}return t(),im.exports=tk(),im.exports}var Ev;function nk(){if(Ev)return Ul;Ev=1;var t=J4(),e=ig(),i=x5();function a(n){var r="https://react.dev/errors/"+n;if(1<arguments.length){r+="?args[]="+encodeURIComponent(arguments[1]);for(var o=2;o<arguments.length;o++)r+="&args[]="+encodeURIComponent(arguments[o])}return"Minified React error #"+n+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function l(n){var r=n,o=n;if(n.alternate)for(;r.return;)r=r.return;else{n=r;do r=n,(r.flags&4098)!==0&&(o=r.return),n=r.return;while(n)}return r.tag===3?o:null}function c(n){if(n.tag===13){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function d(n){if(n.tag===31){var r=n.memoizedState;if(r===null&&(n=n.alternate,n!==null&&(r=n.memoizedState)),r!==null)return r.dehydrated}return null}function f(n){if(l(n)!==n)throw Error(a(188))}function h(n){var r=n.alternate;if(!r){if(r=l(n),r===null)throw Error(a(188));return r!==n?null:n}for(var o=n,u=r;;){var p=o.return;if(p===null)break;var y=p.alternate;if(y===null){if(u=p.return,u!==null){o=u;continue}break}if(p.child===y.child){for(y=p.child;y;){if(y===o)return f(p),n;if(y===u)return f(p),r;y=y.sibling}throw Error(a(188))}if(o.return!==u.return)o=p,u=y;else{for(var T=!1,D=p.child;D;){if(D===o){T=!0,o=p,u=y;break}if(D===u){T=!0,u=p,o=y;break}D=D.sibling}if(!T){for(D=y.child;D;){if(D===o){T=!0,o=y,u=p;break}if(D===u){T=!0,u=y,o=p;break}D=D.sibling}if(!T)throw Error(a(189))}}if(o.alternate!==u)throw Error(a(190))}if(o.tag!==3)throw Error(a(188));return o.stateNode.current===o?n:r}function m(n){var r=n.tag;if(r===5||r===26||r===27||r===6)return n;for(n=n.child;n!==null;){if(r=m(n),r!==null)return r;n=n.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),_=Symbol.for("react.transitional.element"),w=Symbol.for("react.portal"),v=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),M=Symbol.for("react.consumer"),R=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),O=Symbol.for("react.suspense"),j=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),U=Symbol.for("react.lazy"),I=Symbol.for("react.activity"),Y=Symbol.for("react.memo_cache_sentinel"),W=Symbol.iterator;function te(n){return n===null||typeof n!="object"?null:(n=W&&n[W]||n["@@iterator"],typeof n=="function"?n:null)}var me=Symbol.for("react.client.reference");function we(n){if(n==null)return null;if(typeof n=="function")return n.$$typeof===me?null:n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case v:return"Fragment";case C:return"Profiler";case S:return"StrictMode";case O:return"Suspense";case j:return"SuspenseList";case I:return"Activity"}if(typeof n=="object")switch(n.$$typeof){case w:return"Portal";case R:return n.displayName||"Context";case M:return(n._context.displayName||"Context")+".Consumer";case L:var r=n.render;return n=n.displayName,n||(n=r.displayName||r.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case k:return r=n.displayName||null,r!==null?r:we(n.type)||"Memo";case U:r=n._payload,n=n._init;try{return we(n(r))}catch{}}return null}var Se=Array.isArray,z=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$={pending:!1,data:null,method:null,action:null},se=[],ce=-1;function P(n){return{current:n}}function q(n){0>ce||(n.current=se[ce],se[ce]=null,ce--)}function G(n,r){ce++,se[ce]=n.current,n.current=r}var ne=P(null),ye=P(null),ue=P(null),Te=P(null);function he(n,r){switch(G(ue,r),G(ye,n),G(ne,null),r.nodeType){case 9:case 11:n=(n=r.documentElement)&&(n=n.namespaceURI)?Bb(n):0;break;default:if(n=r.tagName,r=r.namespaceURI)r=Bb(r),n=Vb(r,n);else switch(n){case"svg":n=1;break;case"math":n=2;break;default:n=0}}q(ne),G(ne,n)}function Ce(){q(ne),q(ye),q(ue)}function Ue(n){n.memoizedState!==null&&G(Te,n);var r=ne.current,o=Vb(r,n.type);r!==o&&(G(ye,n),G(ne,o))}function Le(n){ye.current===n&&(q(ne),q(ye)),Te.current===n&&(q(Te),Ll._currentValue=$)}var ze,ot;function nt(n){if(ze===void 0)try{throw Error()}catch(o){var r=o.stack.trim().match(/\n( *(at )?)/);ze=r&&r[1]||"",ot=-1<o.stack.indexOf(`
    at`)?" (<anonymous>)":-1<o.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ze+n+ot}var ct=!1;function ut(n,r){if(!n||ct)return"";ct=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var u={DetermineComponentFrameRoot:function(){try{if(r){var ge=function(){throw Error()};if(Object.defineProperty(ge.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ge,[])}catch(ie){var J=ie}Reflect.construct(n,[],ge)}else{try{ge.call()}catch(ie){J=ie}n.call(ge.prototype)}}else{try{throw Error()}catch(ie){J=ie}(ge=n())&&typeof ge.catch=="function"&&ge.catch(function(){})}}catch(ie){if(ie&&J&&typeof ie.stack=="string")return[ie.stack,J.stack]}return[null,null]}};u.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var p=Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot,"name");p&&p.configurable&&Object.defineProperty(u.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var y=u.DetermineComponentFrameRoot(),T=y[0],D=y[1];if(T&&D){var V=T.split(`
`),Q=D.split(`
`);for(p=u=0;u<V.length&&!V[u].includes("DetermineComponentFrameRoot");)u++;for(;p<Q.length&&!Q[p].includes("DetermineComponentFrameRoot");)p++;if(u===V.length||p===Q.length)for(u=V.length-1,p=Q.length-1;1<=u&&0<=p&&V[u]!==Q[p];)p--;for(;1<=u&&0<=p;u--,p--)if(V[u]!==Q[p]){if(u!==1||p!==1)do if(u--,p--,0>p||V[u]!==Q[p]){var le=`
`+V[u].replace(" at new "," at ");return n.displayName&&le.includes("<anonymous>")&&(le=le.replace("<anonymous>",n.displayName)),le}while(1<=u&&0<=p);break}}}finally{ct=!1,Error.prepareStackTrace=o}return(o=n?n.displayName||n.name:"")?nt(o):""}function ae(n,r){switch(n.tag){case 26:case 27:case 5:return nt(n.type);case 16:return nt("Lazy");case 13:return n.child!==r&&r!==null?nt("Suspense Fallback"):nt("Suspense");case 19:return nt("SuspenseList");case 0:case 15:return ut(n.type,!1);case 11:return ut(n.type.render,!1);case 1:return ut(n.type,!0);case 31:return nt("Activity");default:return""}}function Tt(n){try{var r="",o=null;do r+=ae(n,o),o=n,n=n.return;while(n);return r}catch(u){return`
Error generating stack: `+u.message+`
`+u.stack}}var Je=Object.prototype.hasOwnProperty,ht=t.unstable_scheduleCallback,pt=t.unstable_cancelCallback,Ie=t.unstable_shouldYield,Et=t.unstable_requestPaint,Ze=t.unstable_now,Vn=t.unstable_getCurrentPriorityLevel,an=t.unstable_ImmediatePriority,mt=t.unstable_UserBlockingPriority,sn=t.unstable_NormalPriority,yn=t.unstable_LowPriority,kn=t.unstable_IdlePriority,Fn=t.log,Kt=t.unstable_setDisableYieldValue,ai=null,Ct=null;function hn(n){if(typeof Fn=="function"&&Kt(n),Ct&&typeof Ct.setStrictMode=="function")try{Ct.setStrictMode(ai,n)}catch{}}var zt=Math.clz32?Math.clz32:on,Qi=Math.log,si=Math.LN2;function on(n){return n>>>=0,n===0?32:31-(Qi(n)/si|0)|0}var oi=256,li=262144,Hn=4194304;function ln(n){var r=n&42;if(r!==0)return r;switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return n&261888;case 262144:case 524288:case 1048576:case 2097152:return n&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return n&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return n}}function Oe(n,r,o){var u=n.pendingLanes;if(u===0)return 0;var p=0,y=n.suspendedLanes,T=n.pingedLanes;n=n.warmLanes;var D=u&134217727;return D!==0?(u=D&~y,u!==0?p=ln(u):(T&=D,T!==0?p=ln(T):o||(o=D&~n,o!==0&&(p=ln(o))))):(D=u&~y,D!==0?p=ln(D):T!==0?p=ln(T):o||(o=u&~n,o!==0&&(p=ln(o)))),p===0?0:r!==0&&r!==p&&(r&y)===0&&(y=p&-p,o=r&-r,y>=o||y===32&&(o&4194048)!==0)?r:p}function it(n,r){return(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&r)===0}function kt(n,r){switch(n){case 1:case 2:case 4:case 8:case 64:return r+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function de(){var n=Hn;return Hn<<=1,(Hn&62914560)===0&&(Hn=4194304),n}function be(n){for(var r=[],o=0;31>o;o++)r.push(n);return r}function pe(n,r){n.pendingLanes|=r,r!==268435456&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function xe(n,r,o,u,p,y){var T=n.pendingLanes;n.pendingLanes=o,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=o,n.entangledLanes&=o,n.errorRecoveryDisabledLanes&=o,n.shellSuspendCounter=0;var D=n.entanglements,V=n.expirationTimes,Q=n.hiddenUpdates;for(o=T&~o;0<o;){var le=31-zt(o),ge=1<<le;D[le]=0,V[le]=-1;var J=Q[le];if(J!==null)for(Q[le]=null,le=0;le<J.length;le++){var ie=J[le];ie!==null&&(ie.lane&=-536870913)}o&=~ge}u!==0&&Be(n,u,0),y!==0&&p===0&&n.tag!==0&&(n.suspendedLanes|=y&~(T&~r))}function Be(n,r,o){n.pendingLanes|=r,n.suspendedLanes&=~r;var u=31-zt(r);n.entangledLanes|=r,n.entanglements[u]=n.entanglements[u]|1073741824|o&261930}function K(n,r){var o=n.entangledLanes|=r;for(n=n.entanglements;o;){var u=31-zt(o),p=1<<u;p&r|n[u]&r&&(n[u]|=r),o&=~p}}function oe(n,r){var o=r&-r;return o=(o&42)!==0?1:ve(o),(o&(n.suspendedLanes|r))!==0?0:o}function ve(n){switch(n){case 2:n=1;break;case 8:n=4;break;case 32:n=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:n=128;break;case 268435456:n=134217728;break;default:n=0}return n}function Ee(n){return n&=-n,2<n?8<n?(n&134217727)!==0?32:268435456:8:2}function Ve(){var n=B.p;return n!==0?n:(n=window.event,n===void 0?32:uv(n.type))}function je(n,r){var o=B.p;try{return B.p=n,r()}finally{B.p=o}}var gt=Math.random().toString(36).slice(2),$e="__reactFiber$"+gt,Ge="__reactProps$"+gt,An="__reactContainer$"+gt,cn="__reactEvents$"+gt,UE="__reactListeners$"+gt,IE="__reactHandles$"+gt,ky="__reactResources$"+gt,Xo="__reactMarker$"+gt;function $f(n){delete n[$e],delete n[Ge],delete n[cn],delete n[UE],delete n[IE]}function Rs(n){var r=n[$e];if(r)return r;for(var o=n.parentNode;o;){if(r=o[An]||o[$e]){if(o=r.alternate,r.child!==null||o!==null&&o.child!==null)for(n=Xb(n);n!==null;){if(o=n[$e])return o;n=Xb(n)}return r}n=o,o=n.parentNode}return null}function Ds(n){if(n=n[$e]||n[An]){var r=n.tag;if(r===5||r===6||r===13||r===31||r===26||r===27||r===3)return n}return null}function Ko(n){var r=n.tag;if(r===5||r===26||r===27||r===6)return n.stateNode;throw Error(a(33))}function Os(n){var r=n[ky];return r||(r=n[ky]={hoistableStyles:new Map,hoistableScripts:new Map}),r}function pn(n){n[Xo]=!0}var Ay=new Set,Ry={};function Ha(n,r){Ms(n,r),Ms(n+"Capture",r)}function Ms(n,r){for(Ry[n]=r,n=0;n<r.length;n++)Ay.add(r[n])}var BE=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Dy={},Oy={};function VE(n){return Je.call(Oy,n)?!0:Je.call(Dy,n)?!1:BE.test(n)?Oy[n]=!0:(Dy[n]=!0,!1)}function qc(n,r,o){if(VE(r))if(o===null)n.removeAttribute(r);else{switch(typeof o){case"undefined":case"function":case"symbol":n.removeAttribute(r);return;case"boolean":var u=r.toLowerCase().slice(0,5);if(u!=="data-"&&u!=="aria-"){n.removeAttribute(r);return}}n.setAttribute(r,""+o)}}function Yc(n,r,o){if(o===null)n.removeAttribute(r);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(r);return}n.setAttribute(r,""+o)}}function Or(n,r,o,u){if(u===null)n.removeAttribute(o);else{switch(typeof u){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(o);return}n.setAttributeNS(r,o,""+u)}}function Di(n){switch(typeof n){case"bigint":case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function My(n){var r=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function FE(n,r,o){var u=Object.getOwnPropertyDescriptor(n.constructor.prototype,r);if(!n.hasOwnProperty(r)&&typeof u<"u"&&typeof u.get=="function"&&typeof u.set=="function"){var p=u.get,y=u.set;return Object.defineProperty(n,r,{configurable:!0,get:function(){return p.call(this)},set:function(T){o=""+T,y.call(this,T)}}),Object.defineProperty(n,r,{enumerable:u.enumerable}),{getValue:function(){return o},setValue:function(T){o=""+T},stopTracking:function(){n._valueTracker=null,delete n[r]}}}}function qf(n){if(!n._valueTracker){var r=My(n)?"checked":"value";n._valueTracker=FE(n,r,""+n[r])}}function Ly(n){if(!n)return!1;var r=n._valueTracker;if(!r)return!0;var o=r.getValue(),u="";return n&&(u=My(n)?n.checked?"true":"false":n.value),n=u,n!==o?(r.setValue(n),!0):!1}function Gc(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}var HE=/[\n"\\]/g;function Oi(n){return n.replace(HE,function(r){return"\\"+r.charCodeAt(0).toString(16)+" "})}function Yf(n,r,o,u,p,y,T,D){n.name="",T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"?n.type=T:n.removeAttribute("type"),r!=null?T==="number"?(r===0&&n.value===""||n.value!=r)&&(n.value=""+Di(r)):n.value!==""+Di(r)&&(n.value=""+Di(r)):T!=="submit"&&T!=="reset"||n.removeAttribute("value"),r!=null?Gf(n,T,Di(r)):o!=null?Gf(n,T,Di(o)):u!=null&&n.removeAttribute("value"),p==null&&y!=null&&(n.defaultChecked=!!y),p!=null&&(n.checked=p&&typeof p!="function"&&typeof p!="symbol"),D!=null&&typeof D!="function"&&typeof D!="symbol"&&typeof D!="boolean"?n.name=""+Di(D):n.removeAttribute("name")}function jy(n,r,o,u,p,y,T,D){if(y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(n.type=y),r!=null||o!=null){if(!(y!=="submit"&&y!=="reset"||r!=null)){qf(n);return}o=o!=null?""+Di(o):"",r=r!=null?""+Di(r):o,D||r===n.value||(n.value=r),n.defaultValue=r}u=u??p,u=typeof u!="function"&&typeof u!="symbol"&&!!u,n.checked=D?n.checked:!!u,n.defaultChecked=!!u,T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"&&(n.name=T),qf(n)}function Gf(n,r,o){r==="number"&&Gc(n.ownerDocument)===n||n.defaultValue===""+o||(n.defaultValue=""+o)}function Ls(n,r,o,u){if(n=n.options,r){r={};for(var p=0;p<o.length;p++)r["$"+o[p]]=!0;for(o=0;o<n.length;o++)p=r.hasOwnProperty("$"+n[o].value),n[o].selected!==p&&(n[o].selected=p),p&&u&&(n[o].defaultSelected=!0)}else{for(o=""+Di(o),r=null,p=0;p<n.length;p++){if(n[p].value===o){n[p].selected=!0,u&&(n[p].defaultSelected=!0);return}r!==null||n[p].disabled||(r=n[p])}r!==null&&(r.selected=!0)}}function Ny(n,r,o){if(r!=null&&(r=""+Di(r),r!==n.value&&(n.value=r),o==null)){n.defaultValue!==r&&(n.defaultValue=r);return}n.defaultValue=o!=null?""+Di(o):""}function zy(n,r,o,u){if(r==null){if(u!=null){if(o!=null)throw Error(a(92));if(Se(u)){if(1<u.length)throw Error(a(93));u=u[0]}o=u}o==null&&(o=""),r=o}o=Di(r),n.defaultValue=o,u=n.textContent,u===o&&u!==""&&u!==null&&(n.value=u),qf(n)}function js(n,r){if(r){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=r;return}}n.textContent=r}var $E=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Py(n,r,o){var u=r.indexOf("--")===0;o==null||typeof o=="boolean"||o===""?u?n.setProperty(r,""):r==="float"?n.cssFloat="":n[r]="":u?n.setProperty(r,o):typeof o!="number"||o===0||$E.has(r)?r==="float"?n.cssFloat=o:n[r]=(""+o).trim():n[r]=o+"px"}function Uy(n,r,o){if(r!=null&&typeof r!="object")throw Error(a(62));if(n=n.style,o!=null){for(var u in o)!o.hasOwnProperty(u)||r!=null&&r.hasOwnProperty(u)||(u.indexOf("--")===0?n.setProperty(u,""):u==="float"?n.cssFloat="":n[u]="");for(var p in r)u=r[p],r.hasOwnProperty(p)&&o[p]!==u&&Py(n,p,u)}else for(var y in r)r.hasOwnProperty(y)&&Py(n,y,r[y])}function Xf(n){if(n.indexOf("-")===-1)return!1;switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qE=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),YE=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xc(n){return YE.test(""+n)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":n}function Mr(){}var Kf=null;function Zf(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var Ns=null,zs=null;function Iy(n){var r=Ds(n);if(r&&(n=r.stateNode)){var o=n[Ge]||null;e:switch(n=r.stateNode,r.type){case"input":if(Yf(n,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name),r=o.name,o.type==="radio"&&r!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll('input[name="'+Oi(""+r)+'"][type="radio"]'),r=0;r<o.length;r++){var u=o[r];if(u!==n&&u.form===n.form){var p=u[Ge]||null;if(!p)throw Error(a(90));Yf(u,p.value,p.defaultValue,p.defaultValue,p.checked,p.defaultChecked,p.type,p.name)}}for(r=0;r<o.length;r++)u=o[r],u.form===n.form&&Ly(u)}break e;case"textarea":Ny(n,o.value,o.defaultValue);break e;case"select":r=o.value,r!=null&&Ls(n,!!o.multiple,r,!1)}}}var Qf=!1;function By(n,r,o){if(Qf)return n(r,o);Qf=!0;try{var u=n(r);return u}finally{if(Qf=!1,(Ns!==null||zs!==null)&&(Nu(),Ns&&(r=Ns,n=zs,zs=Ns=null,Iy(r),n)))for(r=0;r<n.length;r++)Iy(n[r])}}function Zo(n,r){var o=n.stateNode;if(o===null)return null;var u=o[Ge]||null;if(u===null)return null;o=u[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(a(231,r,typeof o));return o}var Lr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Wf=!1;if(Lr)try{var Qo={};Object.defineProperty(Qo,"passive",{get:function(){Wf=!0}}),window.addEventListener("test",Qo,Qo),window.removeEventListener("test",Qo,Qo)}catch{Wf=!1}var ia=null,Jf=null,Kc=null;function Vy(){if(Kc)return Kc;var n,r=Jf,o=r.length,u,p="value"in ia?ia.value:ia.textContent,y=p.length;for(n=0;n<o&&r[n]===p[n];n++);var T=o-n;for(u=1;u<=T&&r[o-u]===p[y-u];u++);return Kc=p.slice(n,1<u?1-u:void 0)}function Zc(n){var r=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&r===13&&(n=13)):n=r,n===10&&(n=13),32<=n||n===13?n:0}function Qc(){return!0}function Fy(){return!1}function $n(n){function r(o,u,p,y,T){this._reactName=o,this._targetInst=p,this.type=u,this.nativeEvent=y,this.target=T,this.currentTarget=null;for(var D in n)n.hasOwnProperty(D)&&(o=n[D],this[D]=o?o(y):y[D]);return this.isDefaultPrevented=(y.defaultPrevented!=null?y.defaultPrevented:y.returnValue===!1)?Qc:Fy,this.isPropagationStopped=Fy,this}return g(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Qc)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Qc)},persist:function(){},isPersistent:Qc}),r}var $a={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wc=$n($a),Wo=g({},$a,{view:0,detail:0}),GE=$n(Wo),eh,th,Jo,Jc=g({},Wo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ih,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Jo&&(Jo&&n.type==="mousemove"?(eh=n.screenX-Jo.screenX,th=n.screenY-Jo.screenY):th=eh=0,Jo=n),eh)},movementY:function(n){return"movementY"in n?n.movementY:th}}),Hy=$n(Jc),XE=g({},Jc,{dataTransfer:0}),KE=$n(XE),ZE=g({},Wo,{relatedTarget:0}),nh=$n(ZE),QE=g({},$a,{animationName:0,elapsedTime:0,pseudoElement:0}),WE=$n(QE),JE=g({},$a,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),eC=$n(JE),tC=g({},$a,{data:0}),$y=$n(tC),nC={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},iC={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rC={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function aC(n){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(n):(n=rC[n])?!!r[n]:!1}function ih(){return aC}var sC=g({},Wo,{key:function(n){if(n.key){var r=nC[n.key]||n.key;if(r!=="Unidentified")return r}return n.type==="keypress"?(n=Zc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?iC[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ih,charCode:function(n){return n.type==="keypress"?Zc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Zc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),oC=$n(sC),lC=g({},Jc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qy=$n(lC),cC=g({},Wo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ih}),uC=$n(cC),dC=g({},$a,{propertyName:0,elapsedTime:0,pseudoElement:0}),fC=$n(dC),hC=g({},Jc,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),pC=$n(hC),mC=g({},$a,{newState:0,oldState:0}),gC=$n(mC),yC=[9,13,27,32],rh=Lr&&"CompositionEvent"in window,el=null;Lr&&"documentMode"in document&&(el=document.documentMode);var xC=Lr&&"TextEvent"in window&&!el,Yy=Lr&&(!rh||el&&8<el&&11>=el),Gy=" ",Xy=!1;function Ky(n,r){switch(n){case"keyup":return yC.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zy(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ps=!1;function bC(n,r){switch(n){case"compositionend":return Zy(r);case"keypress":return r.which!==32?null:(Xy=!0,Gy);case"textInput":return n=r.data,n===Gy&&Xy?null:n;default:return null}}function vC(n,r){if(Ps)return n==="compositionend"||!rh&&Ky(n,r)?(n=Vy(),Kc=Jf=ia=null,Ps=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Yy&&r.locale!=="ko"?null:r.data;default:return null}}var wC={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qy(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r==="input"?!!wC[n.type]:r==="textarea"}function Wy(n,r,o,u){Ns?zs?zs.push(u):zs=[u]:Ns=u,r=Fu(r,"onChange"),0<r.length&&(o=new Wc("onChange","change",null,o,u),n.push({event:o,listeners:r}))}var tl=null,nl=null;function SC(n){jb(n,0)}function eu(n){var r=Ko(n);if(Ly(r))return n}function Jy(n,r){if(n==="change")return r}var ex=!1;if(Lr){var ah;if(Lr){var sh="oninput"in document;if(!sh){var tx=document.createElement("div");tx.setAttribute("oninput","return;"),sh=typeof tx.oninput=="function"}ah=sh}else ah=!1;ex=ah&&(!document.documentMode||9<document.documentMode)}function nx(){tl&&(tl.detachEvent("onpropertychange",ix),nl=tl=null)}function ix(n){if(n.propertyName==="value"&&eu(nl)){var r=[];Wy(r,nl,n,Zf(n)),By(SC,r)}}function _C(n,r,o){n==="focusin"?(nx(),tl=r,nl=o,tl.attachEvent("onpropertychange",ix)):n==="focusout"&&nx()}function TC(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return eu(nl)}function EC(n,r){if(n==="click")return eu(r)}function CC(n,r){if(n==="input"||n==="change")return eu(r)}function kC(n,r){return n===r&&(n!==0||1/n===1/r)||n!==n&&r!==r}var ci=typeof Object.is=="function"?Object.is:kC;function il(n,r){if(ci(n,r))return!0;if(typeof n!="object"||n===null||typeof r!="object"||r===null)return!1;var o=Object.keys(n),u=Object.keys(r);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var p=o[u];if(!Je.call(r,p)||!ci(n[p],r[p]))return!1}return!0}function rx(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function ax(n,r){var o=rx(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=r&&u>=r)return{node:o,offset:r-n};n=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=rx(o)}}function sx(n,r){return n&&r?n===r?!0:n&&n.nodeType===3?!1:r&&r.nodeType===3?sx(n,r.parentNode):"contains"in n?n.contains(r):n.compareDocumentPosition?!!(n.compareDocumentPosition(r)&16):!1:!1}function ox(n){n=n!=null&&n.ownerDocument!=null&&n.ownerDocument.defaultView!=null?n.ownerDocument.defaultView:window;for(var r=Gc(n.document);r instanceof n.HTMLIFrameElement;){try{var o=typeof r.contentWindow.location.href=="string"}catch{o=!1}if(o)n=r.contentWindow;else break;r=Gc(n.document)}return r}function oh(n){var r=n&&n.nodeName&&n.nodeName.toLowerCase();return r&&(r==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||r==="textarea"||n.contentEditable==="true")}var AC=Lr&&"documentMode"in document&&11>=document.documentMode,Us=null,lh=null,rl=null,ch=!1;function lx(n,r,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;ch||Us==null||Us!==Gc(u)||(u=Us,"selectionStart"in u&&oh(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),rl&&il(rl,u)||(rl=u,u=Fu(lh,"onSelect"),0<u.length&&(r=new Wc("onSelect","select",null,r,o),n.push({event:r,listeners:u}),r.target=Us)))}function qa(n,r){var o={};return o[n.toLowerCase()]=r.toLowerCase(),o["Webkit"+n]="webkit"+r,o["Moz"+n]="moz"+r,o}var Is={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},uh={},cx={};Lr&&(cx=document.createElement("div").style,"AnimationEvent"in window||(delete Is.animationend.animation,delete Is.animationiteration.animation,delete Is.animationstart.animation),"TransitionEvent"in window||delete Is.transitionend.transition);function Ya(n){if(uh[n])return uh[n];if(!Is[n])return n;var r=Is[n],o;for(o in r)if(r.hasOwnProperty(o)&&o in cx)return uh[n]=r[o];return n}var ux=Ya("animationend"),dx=Ya("animationiteration"),fx=Ya("animationstart"),RC=Ya("transitionrun"),DC=Ya("transitionstart"),OC=Ya("transitioncancel"),hx=Ya("transitionend"),px=new Map,dh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");dh.push("scrollEnd");function Wi(n,r){px.set(n,r),Ha(r,[n])}var tu=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var r=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(r))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)},Mi=[],Bs=0,fh=0;function nu(){for(var n=Bs,r=fh=Bs=0;r<n;){var o=Mi[r];Mi[r++]=null;var u=Mi[r];Mi[r++]=null;var p=Mi[r];Mi[r++]=null;var y=Mi[r];if(Mi[r++]=null,u!==null&&p!==null){var T=u.pending;T===null?p.next=p:(p.next=T.next,T.next=p),u.pending=p}y!==0&&mx(o,p,y)}}function iu(n,r,o,u){Mi[Bs++]=n,Mi[Bs++]=r,Mi[Bs++]=o,Mi[Bs++]=u,fh|=u,n.lanes|=u,n=n.alternate,n!==null&&(n.lanes|=u)}function hh(n,r,o,u){return iu(n,r,o,u),ru(n)}function Ga(n,r){return iu(n,null,null,r),ru(n)}function mx(n,r,o){n.lanes|=o;var u=n.alternate;u!==null&&(u.lanes|=o);for(var p=!1,y=n.return;y!==null;)y.childLanes|=o,u=y.alternate,u!==null&&(u.childLanes|=o),y.tag===22&&(n=y.stateNode,n===null||n._visibility&1||(p=!0)),n=y,y=y.return;return n.tag===3?(y=n.stateNode,p&&r!==null&&(p=31-zt(o),n=y.hiddenUpdates,u=n[p],u===null?n[p]=[r]:u.push(r),r.lane=o|536870912),y):null}function ru(n){if(50<Cl)throw Cl=0,Sp=null,Error(a(185));for(var r=n.return;r!==null;)n=r,r=n.return;return n.tag===3?n.stateNode:null}var Vs={};function MC(n,r,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(n,r,o,u){return new MC(n,r,o,u)}function ph(n){return n=n.prototype,!(!n||!n.isReactComponent)}function jr(n,r){var o=n.alternate;return o===null?(o=ui(n.tag,r,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=r,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&65011712,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,r=n.dependencies,o.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o.refCleanup=n.refCleanup,o}function gx(n,r){n.flags&=65011714;var o=n.alternate;return o===null?(n.childLanes=0,n.lanes=r,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=o.childLanes,n.lanes=o.lanes,n.child=o.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=o.memoizedProps,n.memoizedState=o.memoizedState,n.updateQueue=o.updateQueue,n.type=o.type,r=o.dependencies,n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext}),n}function au(n,r,o,u,p,y){var T=0;if(u=n,typeof n=="function")ph(n)&&(T=1);else if(typeof n=="string")T=P4(n,o,ne.current)?26:n==="html"||n==="head"||n==="body"?27:5;else e:switch(n){case I:return n=ui(31,o,r,p),n.elementType=I,n.lanes=y,n;case v:return Xa(o.children,p,y,r);case S:T=8,p|=24;break;case C:return n=ui(12,o,r,p|2),n.elementType=C,n.lanes=y,n;case O:return n=ui(13,o,r,p),n.elementType=O,n.lanes=y,n;case j:return n=ui(19,o,r,p),n.elementType=j,n.lanes=y,n;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:T=10;break e;case M:T=9;break e;case L:T=11;break e;case k:T=14;break e;case U:T=16,u=null;break e}T=29,o=Error(a(130,n===null?"null":typeof n,"")),u=null}return r=ui(T,o,r,p),r.elementType=n,r.type=u,r.lanes=y,r}function Xa(n,r,o,u){return n=ui(7,n,u,r),n.lanes=o,n}function mh(n,r,o){return n=ui(6,n,null,r),n.lanes=o,n}function yx(n){var r=ui(18,null,null,0);return r.stateNode=n,r}function gh(n,r,o){return r=ui(4,n.children!==null?n.children:[],n.key,r),r.lanes=o,r.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},r}var xx=new WeakMap;function Li(n,r){if(typeof n=="object"&&n!==null){var o=xx.get(n);return o!==void 0?o:(r={value:n,source:r,stack:Tt(r)},xx.set(n,r),r)}return{value:n,source:r,stack:Tt(r)}}var Fs=[],Hs=0,su=null,al=0,ji=[],Ni=0,ra=null,cr=1,ur="";function Nr(n,r){Fs[Hs++]=al,Fs[Hs++]=su,su=n,al=r}function bx(n,r,o){ji[Ni++]=cr,ji[Ni++]=ur,ji[Ni++]=ra,ra=n;var u=cr;n=ur;var p=32-zt(u)-1;u&=~(1<<p),o+=1;var y=32-zt(r)+p;if(30<y){var T=p-p%5;y=(u&(1<<T)-1).toString(32),u>>=T,p-=T,cr=1<<32-zt(r)+p|o<<p|u,ur=y+n}else cr=1<<y|o<<p|u,ur=n}function yh(n){n.return!==null&&(Nr(n,1),bx(n,1,0))}function xh(n){for(;n===su;)su=Fs[--Hs],Fs[Hs]=null,al=Fs[--Hs],Fs[Hs]=null;for(;n===ra;)ra=ji[--Ni],ji[Ni]=null,ur=ji[--Ni],ji[Ni]=null,cr=ji[--Ni],ji[Ni]=null}function vx(n,r){ji[Ni++]=cr,ji[Ni++]=ur,ji[Ni++]=ra,cr=r.id,ur=r.overflow,ra=n}var xn=null,At=null,Qe=!1,aa=null,zi=!1,bh=Error(a(519));function sa(n){var r=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw sl(Li(r,n)),bh}function wx(n){var r=n.stateNode,o=n.type,u=n.memoizedProps;switch(r[$e]=n,r[Ge]=u,o){case"dialog":Ye("cancel",r),Ye("close",r);break;case"iframe":case"object":case"embed":Ye("load",r);break;case"video":case"audio":for(o=0;o<Al.length;o++)Ye(Al[o],r);break;case"source":Ye("error",r);break;case"img":case"image":case"link":Ye("error",r),Ye("load",r);break;case"details":Ye("toggle",r);break;case"input":Ye("invalid",r),jy(r,u.value,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name,!0);break;case"select":Ye("invalid",r);break;case"textarea":Ye("invalid",r),zy(r,u.value,u.defaultValue,u.children)}o=u.children,typeof o!="string"&&typeof o!="number"&&typeof o!="bigint"||r.textContent===""+o||u.suppressHydrationWarning===!0||Ub(r.textContent,o)?(u.popover!=null&&(Ye("beforetoggle",r),Ye("toggle",r)),u.onScroll!=null&&Ye("scroll",r),u.onScrollEnd!=null&&Ye("scrollend",r),u.onClick!=null&&(r.onclick=Mr),r=!0):r=!1,r||sa(n,!0)}function Sx(n){for(xn=n.return;xn;)switch(xn.tag){case 5:case 31:case 13:zi=!1;return;case 27:case 3:zi=!0;return;default:xn=xn.return}}function $s(n){if(n!==xn)return!1;if(!Qe)return Sx(n),Qe=!0,!1;var r=n.tag,o;if((o=r!==3&&r!==27)&&((o=r===5)&&(o=n.type,o=!(o!=="form"&&o!=="button")||Pp(n.type,n.memoizedProps)),o=!o),o&&At&&sa(n),Sx(n),r===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(a(317));At=Gb(n)}else if(r===31){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(a(317));At=Gb(n)}else r===27?(r=At,va(n.type)?(n=Fp,Fp=null,At=n):At=r):At=xn?Ui(n.stateNode.nextSibling):null;return!0}function Ka(){At=xn=null,Qe=!1}function vh(){var n=aa;return n!==null&&(Xn===null?Xn=n:Xn.push.apply(Xn,n),aa=null),n}function sl(n){aa===null?aa=[n]:aa.push(n)}var wh=P(null),Za=null,zr=null;function oa(n,r,o){G(wh,r._currentValue),r._currentValue=o}function Pr(n){n._currentValue=wh.current,q(wh)}function Sh(n,r,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&r)!==r?(n.childLanes|=r,u!==null&&(u.childLanes|=r)):u!==null&&(u.childLanes&r)!==r&&(u.childLanes|=r),n===o)break;n=n.return}}function _h(n,r,o,u){var p=n.child;for(p!==null&&(p.return=n);p!==null;){var y=p.dependencies;if(y!==null){var T=p.child;y=y.firstContext;e:for(;y!==null;){var D=y;y=p;for(var V=0;V<r.length;V++)if(D.context===r[V]){y.lanes|=o,D=y.alternate,D!==null&&(D.lanes|=o),Sh(y.return,o,n),u||(T=null);break e}y=D.next}}else if(p.tag===18){if(T=p.return,T===null)throw Error(a(341));T.lanes|=o,y=T.alternate,y!==null&&(y.lanes|=o),Sh(T,o,n),T=null}else T=p.child;if(T!==null)T.return=p;else for(T=p;T!==null;){if(T===n){T=null;break}if(p=T.sibling,p!==null){p.return=T.return,T=p;break}T=T.return}p=T}}function qs(n,r,o,u){n=null;for(var p=r,y=!1;p!==null;){if(!y){if((p.flags&524288)!==0)y=!0;else if((p.flags&262144)!==0)break}if(p.tag===10){var T=p.alternate;if(T===null)throw Error(a(387));if(T=T.memoizedProps,T!==null){var D=p.type;ci(p.pendingProps.value,T.value)||(n!==null?n.push(D):n=[D])}}else if(p===Te.current){if(T=p.alternate,T===null)throw Error(a(387));T.memoizedState.memoizedState!==p.memoizedState.memoizedState&&(n!==null?n.push(Ll):n=[Ll])}p=p.return}n!==null&&_h(r,n,o,u),r.flags|=262144}function ou(n){for(n=n.firstContext;n!==null;){if(!ci(n.context._currentValue,n.memoizedValue))return!0;n=n.next}return!1}function Qa(n){Za=n,zr=null,n=n.dependencies,n!==null&&(n.firstContext=null)}function bn(n){return _x(Za,n)}function lu(n,r){return Za===null&&Qa(n),_x(n,r)}function _x(n,r){var o=r._currentValue;if(r={context:r,memoizedValue:o,next:null},zr===null){if(n===null)throw Error(a(308));zr=r,n.dependencies={lanes:0,firstContext:r},n.flags|=524288}else zr=zr.next=r;return o}var LC=typeof AbortController<"u"?AbortController:function(){var n=[],r=this.signal={aborted:!1,addEventListener:function(o,u){n.push(u)}};this.abort=function(){r.aborted=!0,n.forEach(function(o){return o()})}},jC=t.unstable_scheduleCallback,NC=t.unstable_NormalPriority,Zt={$$typeof:R,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Th(){return{controller:new LC,data:new Map,refCount:0}}function ol(n){n.refCount--,n.refCount===0&&jC(NC,function(){n.controller.abort()})}var ll=null,Eh=0,Ys=0,Gs=null;function zC(n,r){if(ll===null){var o=ll=[];Eh=0,Ys=Ap(),Gs={status:"pending",value:void 0,then:function(u){o.push(u)}}}return Eh++,r.then(Tx,Tx),r}function Tx(){if(--Eh===0&&ll!==null){Gs!==null&&(Gs.status="fulfilled");var n=ll;ll=null,Ys=0,Gs=null;for(var r=0;r<n.length;r++)(0,n[r])()}}function PC(n,r){var o=[],u={status:"pending",value:null,reason:null,then:function(p){o.push(p)}};return n.then(function(){u.status="fulfilled",u.value=r;for(var p=0;p<o.length;p++)(0,o[p])(r)},function(p){for(u.status="rejected",u.reason=p,p=0;p<o.length;p++)(0,o[p])(void 0)}),u}var Ex=z.S;z.S=function(n,r){lb=Ze(),typeof r=="object"&&r!==null&&typeof r.then=="function"&&zC(n,r),Ex!==null&&Ex(n,r)};var Wa=P(null);function Ch(){var n=Wa.current;return n!==null?n:vt.pooledCache}function cu(n,r){r===null?G(Wa,Wa.current):G(Wa,r.pool)}function Cx(){var n=Ch();return n===null?null:{parent:Zt._currentValue,pool:n}}var Xs=Error(a(460)),kh=Error(a(474)),uu=Error(a(542)),du={then:function(){}};function kx(n){return n=n.status,n==="fulfilled"||n==="rejected"}function Ax(n,r,o){switch(o=n[o],o===void 0?n.push(r):o!==r&&(r.then(Mr,Mr),r=o),r.status){case"fulfilled":return r.value;case"rejected":throw n=r.reason,Dx(n),n;default:if(typeof r.status=="string")r.then(Mr,Mr);else{if(n=vt,n!==null&&100<n.shellSuspendCounter)throw Error(a(482));n=r,n.status="pending",n.then(function(u){if(r.status==="pending"){var p=r;p.status="fulfilled",p.value=u}},function(u){if(r.status==="pending"){var p=r;p.status="rejected",p.reason=u}})}switch(r.status){case"fulfilled":return r.value;case"rejected":throw n=r.reason,Dx(n),n}throw es=r,Xs}}function Ja(n){try{var r=n._init;return r(n._payload)}catch(o){throw o!==null&&typeof o=="object"&&typeof o.then=="function"?(es=o,Xs):o}}var es=null;function Rx(){if(es===null)throw Error(a(459));var n=es;return es=null,n}function Dx(n){if(n===Xs||n===uu)throw Error(a(483))}var Ks=null,cl=0;function fu(n){var r=cl;return cl+=1,Ks===null&&(Ks=[]),Ax(Ks,n,r)}function ul(n,r){r=r.props.ref,n.ref=r!==void 0?r:null}function hu(n,r){throw r.$$typeof===x?Error(a(525)):(n=Object.prototype.toString.call(r),Error(a(31,n==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":n)))}function Ox(n){function r(X,H){if(n){var Z=X.deletions;Z===null?(X.deletions=[H],X.flags|=16):Z.push(H)}}function o(X,H){if(!n)return null;for(;H!==null;)r(X,H),H=H.sibling;return null}function u(X){for(var H=new Map;X!==null;)X.key!==null?H.set(X.key,X):H.set(X.index,X),X=X.sibling;return H}function p(X,H){return X=jr(X,H),X.index=0,X.sibling=null,X}function y(X,H,Z){return X.index=Z,n?(Z=X.alternate,Z!==null?(Z=Z.index,Z<H?(X.flags|=67108866,H):Z):(X.flags|=67108866,H)):(X.flags|=1048576,H)}function T(X){return n&&X.alternate===null&&(X.flags|=67108866),X}function D(X,H,Z,fe){return H===null||H.tag!==6?(H=mh(Z,X.mode,fe),H.return=X,H):(H=p(H,Z),H.return=X,H)}function V(X,H,Z,fe){var De=Z.type;return De===v?le(X,H,Z.props.children,fe,Z.key):H!==null&&(H.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===U&&Ja(De)===H.type)?(H=p(H,Z.props),ul(H,Z),H.return=X,H):(H=au(Z.type,Z.key,Z.props,null,X.mode,fe),ul(H,Z),H.return=X,H)}function Q(X,H,Z,fe){return H===null||H.tag!==4||H.stateNode.containerInfo!==Z.containerInfo||H.stateNode.implementation!==Z.implementation?(H=gh(Z,X.mode,fe),H.return=X,H):(H=p(H,Z.children||[]),H.return=X,H)}function le(X,H,Z,fe,De){return H===null||H.tag!==7?(H=Xa(Z,X.mode,fe,De),H.return=X,H):(H=p(H,Z),H.return=X,H)}function ge(X,H,Z){if(typeof H=="string"&&H!==""||typeof H=="number"||typeof H=="bigint")return H=mh(""+H,X.mode,Z),H.return=X,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case _:return Z=au(H.type,H.key,H.props,null,X.mode,Z),ul(Z,H),Z.return=X,Z;case w:return H=gh(H,X.mode,Z),H.return=X,H;case U:return H=Ja(H),ge(X,H,Z)}if(Se(H)||te(H))return H=Xa(H,X.mode,Z,null),H.return=X,H;if(typeof H.then=="function")return ge(X,fu(H),Z);if(H.$$typeof===R)return ge(X,lu(X,H),Z);hu(X,H)}return null}function J(X,H,Z,fe){var De=H!==null?H.key:null;if(typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint")return De!==null?null:D(X,H,""+Z,fe);if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case _:return Z.key===De?V(X,H,Z,fe):null;case w:return Z.key===De?Q(X,H,Z,fe):null;case U:return Z=Ja(Z),J(X,H,Z,fe)}if(Se(Z)||te(Z))return De!==null?null:le(X,H,Z,fe,null);if(typeof Z.then=="function")return J(X,H,fu(Z),fe);if(Z.$$typeof===R)return J(X,H,lu(X,Z),fe);hu(X,Z)}return null}function ie(X,H,Z,fe,De){if(typeof fe=="string"&&fe!==""||typeof fe=="number"||typeof fe=="bigint")return X=X.get(Z)||null,D(H,X,""+fe,De);if(typeof fe=="object"&&fe!==null){switch(fe.$$typeof){case _:return X=X.get(fe.key===null?Z:fe.key)||null,V(H,X,fe,De);case w:return X=X.get(fe.key===null?Z:fe.key)||null,Q(H,X,fe,De);case U:return fe=Ja(fe),ie(X,H,Z,fe,De)}if(Se(fe)||te(fe))return X=X.get(Z)||null,le(H,X,fe,De,null);if(typeof fe.then=="function")return ie(X,H,Z,fu(fe),De);if(fe.$$typeof===R)return ie(X,H,Z,lu(H,fe),De);hu(H,fe)}return null}function ke(X,H,Z,fe){for(var De=null,et=null,Re=H,He=H=0,Ke=null;Re!==null&&He<Z.length;He++){Re.index>He?(Ke=Re,Re=null):Ke=Re.sibling;var tt=J(X,Re,Z[He],fe);if(tt===null){Re===null&&(Re=Ke);break}n&&Re&&tt.alternate===null&&r(X,Re),H=y(tt,H,He),et===null?De=tt:et.sibling=tt,et=tt,Re=Ke}if(He===Z.length)return o(X,Re),Qe&&Nr(X,He),De;if(Re===null){for(;He<Z.length;He++)Re=ge(X,Z[He],fe),Re!==null&&(H=y(Re,H,He),et===null?De=Re:et.sibling=Re,et=Re);return Qe&&Nr(X,He),De}for(Re=u(Re);He<Z.length;He++)Ke=ie(Re,X,He,Z[He],fe),Ke!==null&&(n&&Ke.alternate!==null&&Re.delete(Ke.key===null?He:Ke.key),H=y(Ke,H,He),et===null?De=Ke:et.sibling=Ke,et=Ke);return n&&Re.forEach(function(Ea){return r(X,Ea)}),Qe&&Nr(X,He),De}function Me(X,H,Z,fe){if(Z==null)throw Error(a(151));for(var De=null,et=null,Re=H,He=H=0,Ke=null,tt=Z.next();Re!==null&&!tt.done;He++,tt=Z.next()){Re.index>He?(Ke=Re,Re=null):Ke=Re.sibling;var Ea=J(X,Re,tt.value,fe);if(Ea===null){Re===null&&(Re=Ke);break}n&&Re&&Ea.alternate===null&&r(X,Re),H=y(Ea,H,He),et===null?De=Ea:et.sibling=Ea,et=Ea,Re=Ke}if(tt.done)return o(X,Re),Qe&&Nr(X,He),De;if(Re===null){for(;!tt.done;He++,tt=Z.next())tt=ge(X,tt.value,fe),tt!==null&&(H=y(tt,H,He),et===null?De=tt:et.sibling=tt,et=tt);return Qe&&Nr(X,He),De}for(Re=u(Re);!tt.done;He++,tt=Z.next())tt=ie(Re,X,He,tt.value,fe),tt!==null&&(n&&tt.alternate!==null&&Re.delete(tt.key===null?He:tt.key),H=y(tt,H,He),et===null?De=tt:et.sibling=tt,et=tt);return n&&Re.forEach(function(X4){return r(X,X4)}),Qe&&Nr(X,He),De}function bt(X,H,Z,fe){if(typeof Z=="object"&&Z!==null&&Z.type===v&&Z.key===null&&(Z=Z.props.children),typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case _:e:{for(var De=Z.key;H!==null;){if(H.key===De){if(De=Z.type,De===v){if(H.tag===7){o(X,H.sibling),fe=p(H,Z.props.children),fe.return=X,X=fe;break e}}else if(H.elementType===De||typeof De=="object"&&De!==null&&De.$$typeof===U&&Ja(De)===H.type){o(X,H.sibling),fe=p(H,Z.props),ul(fe,Z),fe.return=X,X=fe;break e}o(X,H);break}else r(X,H);H=H.sibling}Z.type===v?(fe=Xa(Z.props.children,X.mode,fe,Z.key),fe.return=X,X=fe):(fe=au(Z.type,Z.key,Z.props,null,X.mode,fe),ul(fe,Z),fe.return=X,X=fe)}return T(X);case w:e:{for(De=Z.key;H!==null;){if(H.key===De)if(H.tag===4&&H.stateNode.containerInfo===Z.containerInfo&&H.stateNode.implementation===Z.implementation){o(X,H.sibling),fe=p(H,Z.children||[]),fe.return=X,X=fe;break e}else{o(X,H);break}else r(X,H);H=H.sibling}fe=gh(Z,X.mode,fe),fe.return=X,X=fe}return T(X);case U:return Z=Ja(Z),bt(X,H,Z,fe)}if(Se(Z))return ke(X,H,Z,fe);if(te(Z)){if(De=te(Z),typeof De!="function")throw Error(a(150));return Z=De.call(Z),Me(X,H,Z,fe)}if(typeof Z.then=="function")return bt(X,H,fu(Z),fe);if(Z.$$typeof===R)return bt(X,H,lu(X,Z),fe);hu(X,Z)}return typeof Z=="string"&&Z!==""||typeof Z=="number"||typeof Z=="bigint"?(Z=""+Z,H!==null&&H.tag===6?(o(X,H.sibling),fe=p(H,Z),fe.return=X,X=fe):(o(X,H),fe=mh(Z,X.mode,fe),fe.return=X,X=fe),T(X)):o(X,H)}return function(X,H,Z,fe){try{cl=0;var De=bt(X,H,Z,fe);return Ks=null,De}catch(Re){if(Re===Xs||Re===uu)throw Re;var et=ui(29,Re,null,X.mode);return et.lanes=fe,et.return=X,et}}}var ts=Ox(!0),Mx=Ox(!1),la=!1;function Ah(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Rh(n,r){n=n.updateQueue,r.updateQueue===n&&(r.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function ca(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function ua(n,r,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(rt&2)!==0){var p=u.pending;return p===null?r.next=r:(r.next=p.next,p.next=r),u.pending=r,r=ru(n),mx(n,null,o),r}return iu(n,u,r,o),ru(n)}function dl(n,r,o){if(r=r.updateQueue,r!==null&&(r=r.shared,(o&4194048)!==0)){var u=r.lanes;u&=n.pendingLanes,o|=u,r.lanes=o,K(n,o)}}function Dh(n,r){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var p=null,y=null;if(o=o.firstBaseUpdate,o!==null){do{var T={lane:o.lane,tag:o.tag,payload:o.payload,callback:null,next:null};y===null?p=y=T:y=y.next=T,o=o.next}while(o!==null);y===null?p=y=r:y=y.next=r}else p=y=r;o={baseState:u.baseState,firstBaseUpdate:p,lastBaseUpdate:y,shared:u.shared,callbacks:u.callbacks},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=r:n.next=r,o.lastBaseUpdate=r}var Oh=!1;function fl(){if(Oh){var n=Gs;if(n!==null)throw n}}function hl(n,r,o,u){Oh=!1;var p=n.updateQueue;la=!1;var y=p.firstBaseUpdate,T=p.lastBaseUpdate,D=p.shared.pending;if(D!==null){p.shared.pending=null;var V=D,Q=V.next;V.next=null,T===null?y=Q:T.next=Q,T=V;var le=n.alternate;le!==null&&(le=le.updateQueue,D=le.lastBaseUpdate,D!==T&&(D===null?le.firstBaseUpdate=Q:D.next=Q,le.lastBaseUpdate=V))}if(y!==null){var ge=p.baseState;T=0,le=Q=V=null,D=y;do{var J=D.lane&-536870913,ie=J!==D.lane;if(ie?(Xe&J)===J:(u&J)===J){J!==0&&J===Ys&&(Oh=!0),le!==null&&(le=le.next={lane:0,tag:D.tag,payload:D.payload,callback:null,next:null});e:{var ke=n,Me=D;J=r;var bt=o;switch(Me.tag){case 1:if(ke=Me.payload,typeof ke=="function"){ge=ke.call(bt,ge,J);break e}ge=ke;break e;case 3:ke.flags=ke.flags&-65537|128;case 0:if(ke=Me.payload,J=typeof ke=="function"?ke.call(bt,ge,J):ke,J==null)break e;ge=g({},ge,J);break e;case 2:la=!0}}J=D.callback,J!==null&&(n.flags|=64,ie&&(n.flags|=8192),ie=p.callbacks,ie===null?p.callbacks=[J]:ie.push(J))}else ie={lane:J,tag:D.tag,payload:D.payload,callback:D.callback,next:null},le===null?(Q=le=ie,V=ge):le=le.next=ie,T|=J;if(D=D.next,D===null){if(D=p.shared.pending,D===null)break;ie=D,D=ie.next,ie.next=null,p.lastBaseUpdate=ie,p.shared.pending=null}}while(!0);le===null&&(V=ge),p.baseState=V,p.firstBaseUpdate=Q,p.lastBaseUpdate=le,y===null&&(p.shared.lanes=0),ma|=T,n.lanes=T,n.memoizedState=ge}}function Lx(n,r){if(typeof n!="function")throw Error(a(191,n));n.call(r)}function jx(n,r){var o=n.callbacks;if(o!==null)for(n.callbacks=null,n=0;n<o.length;n++)Lx(o[n],r)}var Zs=P(null),pu=P(0);function Nx(n,r){n=Yr,G(pu,n),G(Zs,r),Yr=n|r.baseLanes}function Mh(){G(pu,Yr),G(Zs,Zs.current)}function Lh(){Yr=pu.current,q(Zs),q(pu)}var di=P(null),Pi=null;function da(n){var r=n.alternate;G(qt,qt.current&1),G(di,n),Pi===null&&(r===null||Zs.current!==null||r.memoizedState!==null)&&(Pi=n)}function jh(n){G(qt,qt.current),G(di,n),Pi===null&&(Pi=n)}function zx(n){n.tag===22?(G(qt,qt.current),G(di,n),Pi===null&&(Pi=n)):fa()}function fa(){G(qt,qt.current),G(di,di.current)}function fi(n){q(di),Pi===n&&(Pi=null),q(qt)}var qt=P(0);function mu(n){for(var r=n;r!==null;){if(r.tag===13){var o=r.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||Bp(o)||Vp(o)))return r}else if(r.tag===19&&(r.memoizedProps.revealOrder==="forwards"||r.memoizedProps.revealOrder==="backwards"||r.memoizedProps.revealOrder==="unstable_legacy-backwards"||r.memoizedProps.revealOrder==="together")){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Ur=0,Fe=null,yt=null,Qt=null,gu=!1,Qs=!1,ns=!1,yu=0,pl=0,Ws=null,UC=0;function Vt(){throw Error(a(321))}function Nh(n,r){if(r===null)return!1;for(var o=0;o<r.length&&o<n.length;o++)if(!ci(n[o],r[o]))return!1;return!0}function zh(n,r,o,u,p,y){return Ur=y,Fe=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,z.H=n===null||n.memoizedState===null?b1:Qh,ns=!1,y=o(u,p),ns=!1,Qs&&(y=Ux(r,o,u,p)),Px(n),y}function Px(n){z.H=yl;var r=yt!==null&&yt.next!==null;if(Ur=0,Qt=yt=Fe=null,gu=!1,pl=0,Ws=null,r)throw Error(a(300));n===null||Wt||(n=n.dependencies,n!==null&&ou(n)&&(Wt=!0))}function Ux(n,r,o,u){Fe=n;var p=0;do{if(Qs&&(Ws=null),pl=0,Qs=!1,25<=p)throw Error(a(301));if(p+=1,Qt=yt=null,n.updateQueue!=null){var y=n.updateQueue;y.lastEffect=null,y.events=null,y.stores=null,y.memoCache!=null&&(y.memoCache.index=0)}z.H=v1,y=r(o,u)}while(Qs);return y}function IC(){var n=z.H,r=n.useState()[0];return r=typeof r.then=="function"?ml(r):r,n=n.useState()[0],(yt!==null?yt.memoizedState:null)!==n&&(Fe.flags|=1024),r}function Ph(){var n=yu!==0;return yu=0,n}function Uh(n,r,o){r.updateQueue=n.updateQueue,r.flags&=-2053,n.lanes&=~o}function Ih(n){if(gu){for(n=n.memoizedState;n!==null;){var r=n.queue;r!==null&&(r.pending=null),n=n.next}gu=!1}Ur=0,Qt=yt=Fe=null,Qs=!1,pl=yu=0,Ws=null}function Nn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qt===null?Fe.memoizedState=Qt=n:Qt=Qt.next=n,Qt}function Yt(){if(yt===null){var n=Fe.alternate;n=n!==null?n.memoizedState:null}else n=yt.next;var r=Qt===null?Fe.memoizedState:Qt.next;if(r!==null)Qt=r,yt=n;else{if(n===null)throw Fe.alternate===null?Error(a(467)):Error(a(310));yt=n,n={memoizedState:yt.memoizedState,baseState:yt.baseState,baseQueue:yt.baseQueue,queue:yt.queue,next:null},Qt===null?Fe.memoizedState=Qt=n:Qt=Qt.next=n}return Qt}function xu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ml(n){var r=pl;return pl+=1,Ws===null&&(Ws=[]),n=Ax(Ws,n,r),r=Fe,(Qt===null?r.memoizedState:Qt.next)===null&&(r=r.alternate,z.H=r===null||r.memoizedState===null?b1:Qh),n}function bu(n){if(n!==null&&typeof n=="object"){if(typeof n.then=="function")return ml(n);if(n.$$typeof===R)return bn(n)}throw Error(a(438,String(n)))}function Bh(n){var r=null,o=Fe.updateQueue;if(o!==null&&(r=o.memoCache),r==null){var u=Fe.alternate;u!==null&&(u=u.updateQueue,u!==null&&(u=u.memoCache,u!=null&&(r={data:u.data.map(function(p){return p.slice()}),index:0})))}if(r==null&&(r={data:[],index:0}),o===null&&(o=xu(),Fe.updateQueue=o),o.memoCache=r,o=r.data[r.index],o===void 0)for(o=r.data[r.index]=Array(n),u=0;u<n;u++)o[u]=Y;return r.index++,o}function Ir(n,r){return typeof r=="function"?r(n):r}function vu(n){var r=Yt();return Vh(r,yt,n)}function Vh(n,r,o){var u=n.queue;if(u===null)throw Error(a(311));u.lastRenderedReducer=o;var p=n.baseQueue,y=u.pending;if(y!==null){if(p!==null){var T=p.next;p.next=y.next,y.next=T}r.baseQueue=p=y,u.pending=null}if(y=n.baseState,p===null)n.memoizedState=y;else{r=p.next;var D=T=null,V=null,Q=r,le=!1;do{var ge=Q.lane&-536870913;if(ge!==Q.lane?(Xe&ge)===ge:(Ur&ge)===ge){var J=Q.revertLane;if(J===0)V!==null&&(V=V.next={lane:0,revertLane:0,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null}),ge===Ys&&(le=!0);else if((Ur&J)===J){Q=Q.next,J===Ys&&(le=!0);continue}else ge={lane:0,revertLane:Q.revertLane,gesture:null,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},V===null?(D=V=ge,T=y):V=V.next=ge,Fe.lanes|=J,ma|=J;ge=Q.action,ns&&o(y,ge),y=Q.hasEagerState?Q.eagerState:o(y,ge)}else J={lane:ge,revertLane:Q.revertLane,gesture:Q.gesture,action:Q.action,hasEagerState:Q.hasEagerState,eagerState:Q.eagerState,next:null},V===null?(D=V=J,T=y):V=V.next=J,Fe.lanes|=ge,ma|=ge;Q=Q.next}while(Q!==null&&Q!==r);if(V===null?T=y:V.next=D,!ci(y,n.memoizedState)&&(Wt=!0,le&&(o=Gs,o!==null)))throw o;n.memoizedState=y,n.baseState=T,n.baseQueue=V,u.lastRenderedState=y}return p===null&&(u.lanes=0),[n.memoizedState,u.dispatch]}function Fh(n){var r=Yt(),o=r.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=n;var u=o.dispatch,p=o.pending,y=r.memoizedState;if(p!==null){o.pending=null;var T=p=p.next;do y=n(y,T.action),T=T.next;while(T!==p);ci(y,r.memoizedState)||(Wt=!0),r.memoizedState=y,r.baseQueue===null&&(r.baseState=y),o.lastRenderedState=y}return[y,u]}function Ix(n,r,o){var u=Fe,p=Yt(),y=Qe;if(y){if(o===void 0)throw Error(a(407));o=o()}else o=r();var T=!ci((yt||p).memoizedState,o);if(T&&(p.memoizedState=o,Wt=!0),p=p.queue,qh(Fx.bind(null,u,p,n),[n]),p.getSnapshot!==r||T||Qt!==null&&Qt.memoizedState.tag&1){if(u.flags|=2048,Js(9,{destroy:void 0},Vx.bind(null,u,p,o,r),null),vt===null)throw Error(a(349));y||(Ur&127)!==0||Bx(u,r,o)}return o}function Bx(n,r,o){n.flags|=16384,n={getSnapshot:r,value:o},r=Fe.updateQueue,r===null?(r=xu(),Fe.updateQueue=r,r.stores=[n]):(o=r.stores,o===null?r.stores=[n]:o.push(n))}function Vx(n,r,o,u){r.value=o,r.getSnapshot=u,Hx(r)&&$x(n)}function Fx(n,r,o){return o(function(){Hx(r)&&$x(n)})}function Hx(n){var r=n.getSnapshot;n=n.value;try{var o=r();return!ci(n,o)}catch{return!0}}function $x(n){var r=Ga(n,2);r!==null&&Kn(r,n,2)}function Hh(n){var r=Nn();if(typeof n=="function"){var o=n;if(n=o(),ns){hn(!0);try{o()}finally{hn(!1)}}}return r.memoizedState=r.baseState=n,r.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ir,lastRenderedState:n},r}function qx(n,r,o,u){return n.baseState=o,Vh(n,yt,typeof u=="function"?u:Ir)}function BC(n,r,o,u,p){if(_u(n))throw Error(a(485));if(n=r.action,n!==null){var y={payload:p,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(T){y.listeners.push(T)}};z.T!==null?o(!0):y.isTransition=!1,u(y),o=r.pending,o===null?(y.next=r.pending=y,Yx(r,y)):(y.next=o.next,r.pending=o.next=y)}}function Yx(n,r){var o=r.action,u=r.payload,p=n.state;if(r.isTransition){var y=z.T,T={};z.T=T;try{var D=o(p,u),V=z.S;V!==null&&V(T,D),Gx(n,r,D)}catch(Q){$h(n,r,Q)}finally{y!==null&&T.types!==null&&(y.types=T.types),z.T=y}}else try{y=o(p,u),Gx(n,r,y)}catch(Q){$h(n,r,Q)}}function Gx(n,r,o){o!==null&&typeof o=="object"&&typeof o.then=="function"?o.then(function(u){Xx(n,r,u)},function(u){return $h(n,r,u)}):Xx(n,r,o)}function Xx(n,r,o){r.status="fulfilled",r.value=o,Kx(r),n.state=o,r=n.pending,r!==null&&(o=r.next,o===r?n.pending=null:(o=o.next,r.next=o,Yx(n,o)))}function $h(n,r,o){var u=n.pending;if(n.pending=null,u!==null){u=u.next;do r.status="rejected",r.reason=o,Kx(r),r=r.next;while(r!==u)}n.action=null}function Kx(n){n=n.listeners;for(var r=0;r<n.length;r++)(0,n[r])()}function Zx(n,r){return r}function Qx(n,r){if(Qe){var o=vt.formState;if(o!==null){e:{var u=Fe;if(Qe){if(At){t:{for(var p=At,y=zi;p.nodeType!==8;){if(!y){p=null;break t}if(p=Ui(p.nextSibling),p===null){p=null;break t}}y=p.data,p=y==="F!"||y==="F"?p:null}if(p){At=Ui(p.nextSibling),u=p.data==="F!";break e}}sa(u)}u=!1}u&&(r=o[0])}}return o=Nn(),o.memoizedState=o.baseState=r,u={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zx,lastRenderedState:r},o.queue=u,o=g1.bind(null,Fe,u),u.dispatch=o,u=Hh(!1),y=Zh.bind(null,Fe,!1,u.queue),u=Nn(),p={state:r,dispatch:null,action:n,pending:null},u.queue=p,o=BC.bind(null,Fe,p,y,o),p.dispatch=o,u.memoizedState=n,[r,o,!1]}function Wx(n){var r=Yt();return Jx(r,yt,n)}function Jx(n,r,o){if(r=Vh(n,r,Zx)[0],n=vu(Ir)[0],typeof r=="object"&&r!==null&&typeof r.then=="function")try{var u=ml(r)}catch(T){throw T===Xs?uu:T}else u=r;r=Yt();var p=r.queue,y=p.dispatch;return o!==r.memoizedState&&(Fe.flags|=2048,Js(9,{destroy:void 0},VC.bind(null,p,o),null)),[u,y,n]}function VC(n,r){n.action=r}function e1(n){var r=Yt(),o=yt;if(o!==null)return Jx(r,o,n);Yt(),r=r.memoizedState,o=Yt();var u=o.queue.dispatch;return o.memoizedState=n,[r,u,!1]}function Js(n,r,o,u){return n={tag:n,create:o,deps:u,inst:r,next:null},r=Fe.updateQueue,r===null&&(r=xu(),Fe.updateQueue=r),o=r.lastEffect,o===null?r.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,r.lastEffect=n),n}function t1(){return Yt().memoizedState}function wu(n,r,o,u){var p=Nn();Fe.flags|=n,p.memoizedState=Js(1|r,{destroy:void 0},o,u===void 0?null:u)}function Su(n,r,o,u){var p=Yt();u=u===void 0?null:u;var y=p.memoizedState.inst;yt!==null&&u!==null&&Nh(u,yt.memoizedState.deps)?p.memoizedState=Js(r,y,o,u):(Fe.flags|=n,p.memoizedState=Js(1|r,y,o,u))}function n1(n,r){wu(8390656,8,n,r)}function qh(n,r){Su(2048,8,n,r)}function FC(n){Fe.flags|=4;var r=Fe.updateQueue;if(r===null)r=xu(),Fe.updateQueue=r,r.events=[n];else{var o=r.events;o===null?r.events=[n]:o.push(n)}}function i1(n){var r=Yt().memoizedState;return FC({ref:r,nextImpl:n}),function(){if((rt&2)!==0)throw Error(a(440));return r.impl.apply(void 0,arguments)}}function r1(n,r){return Su(4,2,n,r)}function a1(n,r){return Su(4,4,n,r)}function s1(n,r){if(typeof r=="function"){n=n();var o=r(n);return function(){typeof o=="function"?o():r(null)}}if(r!=null)return n=n(),r.current=n,function(){r.current=null}}function o1(n,r,o){o=o!=null?o.concat([n]):null,Su(4,4,s1.bind(null,r,n),o)}function Yh(){}function l1(n,r){var o=Yt();r=r===void 0?null:r;var u=o.memoizedState;return r!==null&&Nh(r,u[1])?u[0]:(o.memoizedState=[n,r],n)}function c1(n,r){var o=Yt();r=r===void 0?null:r;var u=o.memoizedState;if(r!==null&&Nh(r,u[1]))return u[0];if(u=n(),ns){hn(!0);try{n()}finally{hn(!1)}}return o.memoizedState=[u,r],u}function Gh(n,r,o){return o===void 0||(Ur&1073741824)!==0&&(Xe&261930)===0?n.memoizedState=r:(n.memoizedState=o,n=ub(),Fe.lanes|=n,ma|=n,o)}function u1(n,r,o,u){return ci(o,r)?o:Zs.current!==null?(n=Gh(n,o,u),ci(n,r)||(Wt=!0),n):(Ur&42)===0||(Ur&1073741824)!==0&&(Xe&261930)===0?(Wt=!0,n.memoizedState=o):(n=ub(),Fe.lanes|=n,ma|=n,r)}function d1(n,r,o,u,p){var y=B.p;B.p=y!==0&&8>y?y:8;var T=z.T,D={};z.T=D,Zh(n,!1,r,o);try{var V=p(),Q=z.S;if(Q!==null&&Q(D,V),V!==null&&typeof V=="object"&&typeof V.then=="function"){var le=PC(V,u);gl(n,r,le,mi(n))}else gl(n,r,u,mi(n))}catch(ge){gl(n,r,{then:function(){},status:"rejected",reason:ge},mi())}finally{B.p=y,T!==null&&D.types!==null&&(T.types=D.types),z.T=T}}function HC(){}function Xh(n,r,o,u){if(n.tag!==5)throw Error(a(476));var p=f1(n).queue;d1(n,p,r,$,o===null?HC:function(){return h1(n),o(u)})}function f1(n){var r=n.memoizedState;if(r!==null)return r;r={memoizedState:$,baseState:$,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ir,lastRenderedState:$},next:null};var o={};return r.next={memoizedState:o,baseState:o,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ir,lastRenderedState:o},next:null},n.memoizedState=r,n=n.alternate,n!==null&&(n.memoizedState=r),r}function h1(n){var r=f1(n);r.next===null&&(r=n.alternate.memoizedState),gl(n,r.next.queue,{},mi())}function Kh(){return bn(Ll)}function p1(){return Yt().memoizedState}function m1(){return Yt().memoizedState}function $C(n){for(var r=n.return;r!==null;){switch(r.tag){case 24:case 3:var o=mi();n=ca(o);var u=ua(r,n,o);u!==null&&(Kn(u,r,o),dl(u,r,o)),r={cache:Th()},n.payload=r;return}r=r.return}}function qC(n,r,o){var u=mi();o={lane:u,revertLane:0,gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},_u(n)?y1(r,o):(o=hh(n,r,o,u),o!==null&&(Kn(o,n,u),x1(o,r,u)))}function g1(n,r,o){var u=mi();gl(n,r,o,u)}function gl(n,r,o,u){var p={lane:u,revertLane:0,gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null};if(_u(n))y1(r,p);else{var y=n.alternate;if(n.lanes===0&&(y===null||y.lanes===0)&&(y=r.lastRenderedReducer,y!==null))try{var T=r.lastRenderedState,D=y(T,o);if(p.hasEagerState=!0,p.eagerState=D,ci(D,T))return iu(n,r,p,0),vt===null&&nu(),!1}catch{}if(o=hh(n,r,p,u),o!==null)return Kn(o,n,u),x1(o,r,u),!0}return!1}function Zh(n,r,o,u){if(u={lane:2,revertLane:Ap(),gesture:null,action:u,hasEagerState:!1,eagerState:null,next:null},_u(n)){if(r)throw Error(a(479))}else r=hh(n,o,u,2),r!==null&&Kn(r,n,2)}function _u(n){var r=n.alternate;return n===Fe||r!==null&&r===Fe}function y1(n,r){Qs=gu=!0;var o=n.pending;o===null?r.next=r:(r.next=o.next,o.next=r),n.pending=r}function x1(n,r,o){if((o&4194048)!==0){var u=r.lanes;u&=n.pendingLanes,o|=u,r.lanes=o,K(n,o)}}var yl={readContext:bn,use:bu,useCallback:Vt,useContext:Vt,useEffect:Vt,useImperativeHandle:Vt,useLayoutEffect:Vt,useInsertionEffect:Vt,useMemo:Vt,useReducer:Vt,useRef:Vt,useState:Vt,useDebugValue:Vt,useDeferredValue:Vt,useTransition:Vt,useSyncExternalStore:Vt,useId:Vt,useHostTransitionStatus:Vt,useFormState:Vt,useActionState:Vt,useOptimistic:Vt,useMemoCache:Vt,useCacheRefresh:Vt};yl.useEffectEvent=Vt;var b1={readContext:bn,use:bu,useCallback:function(n,r){return Nn().memoizedState=[n,r===void 0?null:r],n},useContext:bn,useEffect:n1,useImperativeHandle:function(n,r,o){o=o!=null?o.concat([n]):null,wu(4194308,4,s1.bind(null,r,n),o)},useLayoutEffect:function(n,r){return wu(4194308,4,n,r)},useInsertionEffect:function(n,r){wu(4,2,n,r)},useMemo:function(n,r){var o=Nn();r=r===void 0?null:r;var u=n();if(ns){hn(!0);try{n()}finally{hn(!1)}}return o.memoizedState=[u,r],u},useReducer:function(n,r,o){var u=Nn();if(o!==void 0){var p=o(r);if(ns){hn(!0);try{o(r)}finally{hn(!1)}}}else p=r;return u.memoizedState=u.baseState=p,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:p},u.queue=n,n=n.dispatch=qC.bind(null,Fe,n),[u.memoizedState,n]},useRef:function(n){var r=Nn();return n={current:n},r.memoizedState=n},useState:function(n){n=Hh(n);var r=n.queue,o=g1.bind(null,Fe,r);return r.dispatch=o,[n.memoizedState,o]},useDebugValue:Yh,useDeferredValue:function(n,r){var o=Nn();return Gh(o,n,r)},useTransition:function(){var n=Hh(!1);return n=d1.bind(null,Fe,n.queue,!0,!1),Nn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,r,o){var u=Fe,p=Nn();if(Qe){if(o===void 0)throw Error(a(407));o=o()}else{if(o=r(),vt===null)throw Error(a(349));(Xe&127)!==0||Bx(u,r,o)}p.memoizedState=o;var y={value:o,getSnapshot:r};return p.queue=y,n1(Fx.bind(null,u,y,n),[n]),u.flags|=2048,Js(9,{destroy:void 0},Vx.bind(null,u,y,o,r),null),o},useId:function(){var n=Nn(),r=vt.identifierPrefix;if(Qe){var o=ur,u=cr;o=(u&~(1<<32-zt(u)-1)).toString(32)+o,r="_"+r+"R_"+o,o=yu++,0<o&&(r+="H"+o.toString(32)),r+="_"}else o=UC++,r="_"+r+"r_"+o.toString(32)+"_";return n.memoizedState=r},useHostTransitionStatus:Kh,useFormState:Qx,useActionState:Qx,useOptimistic:function(n){var r=Nn();r.memoizedState=r.baseState=n;var o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return r.queue=o,r=Zh.bind(null,Fe,!0,o),o.dispatch=r,[n,r]},useMemoCache:Bh,useCacheRefresh:function(){return Nn().memoizedState=$C.bind(null,Fe)},useEffectEvent:function(n){var r=Nn(),o={impl:n};return r.memoizedState=o,function(){if((rt&2)!==0)throw Error(a(440));return o.impl.apply(void 0,arguments)}}},Qh={readContext:bn,use:bu,useCallback:l1,useContext:bn,useEffect:qh,useImperativeHandle:o1,useInsertionEffect:r1,useLayoutEffect:a1,useMemo:c1,useReducer:vu,useRef:t1,useState:function(){return vu(Ir)},useDebugValue:Yh,useDeferredValue:function(n,r){var o=Yt();return u1(o,yt.memoizedState,n,r)},useTransition:function(){var n=vu(Ir)[0],r=Yt().memoizedState;return[typeof n=="boolean"?n:ml(n),r]},useSyncExternalStore:Ix,useId:p1,useHostTransitionStatus:Kh,useFormState:Wx,useActionState:Wx,useOptimistic:function(n,r){var o=Yt();return qx(o,yt,n,r)},useMemoCache:Bh,useCacheRefresh:m1};Qh.useEffectEvent=i1;var v1={readContext:bn,use:bu,useCallback:l1,useContext:bn,useEffect:qh,useImperativeHandle:o1,useInsertionEffect:r1,useLayoutEffect:a1,useMemo:c1,useReducer:Fh,useRef:t1,useState:function(){return Fh(Ir)},useDebugValue:Yh,useDeferredValue:function(n,r){var o=Yt();return yt===null?Gh(o,n,r):u1(o,yt.memoizedState,n,r)},useTransition:function(){var n=Fh(Ir)[0],r=Yt().memoizedState;return[typeof n=="boolean"?n:ml(n),r]},useSyncExternalStore:Ix,useId:p1,useHostTransitionStatus:Kh,useFormState:e1,useActionState:e1,useOptimistic:function(n,r){var o=Yt();return yt!==null?qx(o,yt,n,r):(o.baseState=n,[n,o.queue.dispatch])},useMemoCache:Bh,useCacheRefresh:m1};v1.useEffectEvent=i1;function Wh(n,r,o,u){r=n.memoizedState,o=o(u,r),o=o==null?r:g({},r,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var Jh={enqueueSetState:function(n,r,o){n=n._reactInternals;var u=mi(),p=ca(u);p.payload=r,o!=null&&(p.callback=o),r=ua(n,p,u),r!==null&&(Kn(r,n,u),dl(r,n,u))},enqueueReplaceState:function(n,r,o){n=n._reactInternals;var u=mi(),p=ca(u);p.tag=1,p.payload=r,o!=null&&(p.callback=o),r=ua(n,p,u),r!==null&&(Kn(r,n,u),dl(r,n,u))},enqueueForceUpdate:function(n,r){n=n._reactInternals;var o=mi(),u=ca(o);u.tag=2,r!=null&&(u.callback=r),r=ua(n,u,o),r!==null&&(Kn(r,n,o),dl(r,n,o))}};function w1(n,r,o,u,p,y,T){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,y,T):r.prototype&&r.prototype.isPureReactComponent?!il(o,u)||!il(p,y):!0}function S1(n,r,o,u){n=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(o,u),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(o,u),r.state!==n&&Jh.enqueueReplaceState(r,r.state,null)}function is(n,r){var o=r;if("ref"in r){o={};for(var u in r)u!=="ref"&&(o[u]=r[u])}if(n=n.defaultProps){o===r&&(o=g({},o));for(var p in n)o[p]===void 0&&(o[p]=n[p])}return o}function _1(n){tu(n)}function T1(n){console.error(n)}function E1(n){tu(n)}function Tu(n,r){try{var o=n.onUncaughtError;o(r.value,{componentStack:r.stack})}catch(u){setTimeout(function(){throw u})}}function C1(n,r,o){try{var u=n.onCaughtError;u(o.value,{componentStack:o.stack,errorBoundary:r.tag===1?r.stateNode:null})}catch(p){setTimeout(function(){throw p})}}function ep(n,r,o){return o=ca(o),o.tag=3,o.payload={element:null},o.callback=function(){Tu(n,r)},o}function k1(n){return n=ca(n),n.tag=3,n}function A1(n,r,o,u){var p=o.type.getDerivedStateFromError;if(typeof p=="function"){var y=u.value;n.payload=function(){return p(y)},n.callback=function(){C1(r,o,u)}}var T=o.stateNode;T!==null&&typeof T.componentDidCatch=="function"&&(n.callback=function(){C1(r,o,u),typeof p!="function"&&(ga===null?ga=new Set([this]):ga.add(this));var D=u.stack;this.componentDidCatch(u.value,{componentStack:D!==null?D:""})})}function YC(n,r,o,u,p){if(o.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){if(r=o.alternate,r!==null&&qs(r,o,p,!0),o=di.current,o!==null){switch(o.tag){case 31:case 13:return Pi===null?zu():o.alternate===null&&Ft===0&&(Ft=3),o.flags&=-257,o.flags|=65536,o.lanes=p,u===du?o.flags|=16384:(r=o.updateQueue,r===null?o.updateQueue=new Set([u]):r.add(u),Ep(n,u,p)),!1;case 22:return o.flags|=65536,u===du?o.flags|=16384:(r=o.updateQueue,r===null?(r={transitions:null,markerInstances:null,retryQueue:new Set([u])},o.updateQueue=r):(o=r.retryQueue,o===null?r.retryQueue=new Set([u]):o.add(u)),Ep(n,u,p)),!1}throw Error(a(435,o.tag))}return Ep(n,u,p),zu(),!1}if(Qe)return r=di.current,r!==null?((r.flags&65536)===0&&(r.flags|=256),r.flags|=65536,r.lanes=p,u!==bh&&(n=Error(a(422),{cause:u}),sl(Li(n,o)))):(u!==bh&&(r=Error(a(423),{cause:u}),sl(Li(r,o))),n=n.current.alternate,n.flags|=65536,p&=-p,n.lanes|=p,u=Li(u,o),p=ep(n.stateNode,u,p),Dh(n,p),Ft!==4&&(Ft=2)),!1;var y=Error(a(520),{cause:u});if(y=Li(y,o),El===null?El=[y]:El.push(y),Ft!==4&&(Ft=2),r===null)return!0;u=Li(u,o),o=r;do{switch(o.tag){case 3:return o.flags|=65536,n=p&-p,o.lanes|=n,n=ep(o.stateNode,u,n),Dh(o,n),!1;case 1:if(r=o.type,y=o.stateNode,(o.flags&128)===0&&(typeof r.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(ga===null||!ga.has(y))))return o.flags|=65536,p&=-p,o.lanes|=p,p=k1(p),A1(p,n,o,u),Dh(o,p),!1}o=o.return}while(o!==null);return!1}var tp=Error(a(461)),Wt=!1;function vn(n,r,o,u){r.child=n===null?Mx(r,null,o,u):ts(r,n.child,o,u)}function R1(n,r,o,u,p){o=o.render;var y=r.ref;if("ref"in u){var T={};for(var D in u)D!=="ref"&&(T[D]=u[D])}else T=u;return Qa(r),u=zh(n,r,o,T,y,p),D=Ph(),n!==null&&!Wt?(Uh(n,r,p),Br(n,r,p)):(Qe&&D&&yh(r),r.flags|=1,vn(n,r,u,p),r.child)}function D1(n,r,o,u,p){if(n===null){var y=o.type;return typeof y=="function"&&!ph(y)&&y.defaultProps===void 0&&o.compare===null?(r.tag=15,r.type=y,O1(n,r,y,u,p)):(n=au(o.type,null,u,r,r.mode,p),n.ref=r.ref,n.return=r,r.child=n)}if(y=n.child,!cp(n,p)){var T=y.memoizedProps;if(o=o.compare,o=o!==null?o:il,o(T,u)&&n.ref===r.ref)return Br(n,r,p)}return r.flags|=1,n=jr(y,u),n.ref=r.ref,n.return=r,r.child=n}function O1(n,r,o,u,p){if(n!==null){var y=n.memoizedProps;if(il(y,u)&&n.ref===r.ref)if(Wt=!1,r.pendingProps=u=y,cp(n,p))(n.flags&131072)!==0&&(Wt=!0);else return r.lanes=n.lanes,Br(n,r,p)}return np(n,r,o,u,p)}function M1(n,r,o,u){var p=u.children,y=n!==null?n.memoizedState:null;if(n===null&&r.stateNode===null&&(r.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),u.mode==="hidden"){if((r.flags&128)!==0){if(y=y!==null?y.baseLanes|o:o,n!==null){for(u=r.child=n.child,p=0;u!==null;)p=p|u.lanes|u.childLanes,u=u.sibling;u=p&~y}else u=0,r.child=null;return L1(n,r,y,o,u)}if((o&536870912)!==0)r.memoizedState={baseLanes:0,cachePool:null},n!==null&&cu(r,y!==null?y.cachePool:null),y!==null?Nx(r,y):Mh(),zx(r);else return u=r.lanes=536870912,L1(n,r,y!==null?y.baseLanes|o:o,o,u)}else y!==null?(cu(r,y.cachePool),Nx(r,y),fa(),r.memoizedState=null):(n!==null&&cu(r,null),Mh(),fa());return vn(n,r,p,o),r.child}function xl(n,r){return n!==null&&n.tag===22||r.stateNode!==null||(r.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.sibling}function L1(n,r,o,u,p){var y=Ch();return y=y===null?null:{parent:Zt._currentValue,pool:y},r.memoizedState={baseLanes:o,cachePool:y},n!==null&&cu(r,null),Mh(),zx(r),n!==null&&qs(n,r,u,!0),r.childLanes=p,null}function Eu(n,r){return r=ku({mode:r.mode,children:r.children},n.mode),r.ref=n.ref,n.child=r,r.return=n,r}function j1(n,r,o){return ts(r,n.child,null,o),n=Eu(r,r.pendingProps),n.flags|=2,fi(r),r.memoizedState=null,n}function GC(n,r,o){var u=r.pendingProps,p=(r.flags&128)!==0;if(r.flags&=-129,n===null){if(Qe){if(u.mode==="hidden")return n=Eu(r,u),r.lanes=536870912,xl(null,n);if(jh(r),(n=At)?(n=Yb(n,zi),n=n!==null&&n.data==="&"?n:null,n!==null&&(r.memoizedState={dehydrated:n,treeContext:ra!==null?{id:cr,overflow:ur}:null,retryLane:536870912,hydrationErrors:null},o=yx(n),o.return=r,r.child=o,xn=r,At=null)):n=null,n===null)throw sa(r);return r.lanes=536870912,null}return Eu(r,u)}var y=n.memoizedState;if(y!==null){var T=y.dehydrated;if(jh(r),p)if(r.flags&256)r.flags&=-257,r=j1(n,r,o);else if(r.memoizedState!==null)r.child=n.child,r.flags|=128,r=null;else throw Error(a(558));else if(Wt||qs(n,r,o,!1),p=(o&n.childLanes)!==0,Wt||p){if(u=vt,u!==null&&(T=oe(u,o),T!==0&&T!==y.retryLane))throw y.retryLane=T,Ga(n,T),Kn(u,n,T),tp;zu(),r=j1(n,r,o)}else n=y.treeContext,At=Ui(T.nextSibling),xn=r,Qe=!0,aa=null,zi=!1,n!==null&&vx(r,n),r=Eu(r,u),r.flags|=4096;return r}return n=jr(n.child,{mode:u.mode,children:u.children}),n.ref=r.ref,r.child=n,n.return=r,n}function Cu(n,r){var o=r.ref;if(o===null)n!==null&&n.ref!==null&&(r.flags|=4194816);else{if(typeof o!="function"&&typeof o!="object")throw Error(a(284));(n===null||n.ref!==o)&&(r.flags|=4194816)}}function np(n,r,o,u,p){return Qa(r),o=zh(n,r,o,u,void 0,p),u=Ph(),n!==null&&!Wt?(Uh(n,r,p),Br(n,r,p)):(Qe&&u&&yh(r),r.flags|=1,vn(n,r,o,p),r.child)}function N1(n,r,o,u,p,y){return Qa(r),r.updateQueue=null,o=Ux(r,u,o,p),Px(n),u=Ph(),n!==null&&!Wt?(Uh(n,r,y),Br(n,r,y)):(Qe&&u&&yh(r),r.flags|=1,vn(n,r,o,y),r.child)}function z1(n,r,o,u,p){if(Qa(r),r.stateNode===null){var y=Vs,T=o.contextType;typeof T=="object"&&T!==null&&(y=bn(T)),y=new o(u,y),r.memoizedState=y.state!==null&&y.state!==void 0?y.state:null,y.updater=Jh,r.stateNode=y,y._reactInternals=r,y=r.stateNode,y.props=u,y.state=r.memoizedState,y.refs={},Ah(r),T=o.contextType,y.context=typeof T=="object"&&T!==null?bn(T):Vs,y.state=r.memoizedState,T=o.getDerivedStateFromProps,typeof T=="function"&&(Wh(r,o,T,u),y.state=r.memoizedState),typeof o.getDerivedStateFromProps=="function"||typeof y.getSnapshotBeforeUpdate=="function"||typeof y.UNSAFE_componentWillMount!="function"&&typeof y.componentWillMount!="function"||(T=y.state,typeof y.componentWillMount=="function"&&y.componentWillMount(),typeof y.UNSAFE_componentWillMount=="function"&&y.UNSAFE_componentWillMount(),T!==y.state&&Jh.enqueueReplaceState(y,y.state,null),hl(r,u,y,p),fl(),y.state=r.memoizedState),typeof y.componentDidMount=="function"&&(r.flags|=4194308),u=!0}else if(n===null){y=r.stateNode;var D=r.memoizedProps,V=is(o,D);y.props=V;var Q=y.context,le=o.contextType;T=Vs,typeof le=="object"&&le!==null&&(T=bn(le));var ge=o.getDerivedStateFromProps;le=typeof ge=="function"||typeof y.getSnapshotBeforeUpdate=="function",D=r.pendingProps!==D,le||typeof y.UNSAFE_componentWillReceiveProps!="function"&&typeof y.componentWillReceiveProps!="function"||(D||Q!==T)&&S1(r,y,u,T),la=!1;var J=r.memoizedState;y.state=J,hl(r,u,y,p),fl(),Q=r.memoizedState,D||J!==Q||la?(typeof ge=="function"&&(Wh(r,o,ge,u),Q=r.memoizedState),(V=la||w1(r,o,V,u,J,Q,T))?(le||typeof y.UNSAFE_componentWillMount!="function"&&typeof y.componentWillMount!="function"||(typeof y.componentWillMount=="function"&&y.componentWillMount(),typeof y.UNSAFE_componentWillMount=="function"&&y.UNSAFE_componentWillMount()),typeof y.componentDidMount=="function"&&(r.flags|=4194308)):(typeof y.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=u,r.memoizedState=Q),y.props=u,y.state=Q,y.context=T,u=V):(typeof y.componentDidMount=="function"&&(r.flags|=4194308),u=!1)}else{y=r.stateNode,Rh(n,r),T=r.memoizedProps,le=is(o,T),y.props=le,ge=r.pendingProps,J=y.context,Q=o.contextType,V=Vs,typeof Q=="object"&&Q!==null&&(V=bn(Q)),D=o.getDerivedStateFromProps,(Q=typeof D=="function"||typeof y.getSnapshotBeforeUpdate=="function")||typeof y.UNSAFE_componentWillReceiveProps!="function"&&typeof y.componentWillReceiveProps!="function"||(T!==ge||J!==V)&&S1(r,y,u,V),la=!1,J=r.memoizedState,y.state=J,hl(r,u,y,p),fl();var ie=r.memoizedState;T!==ge||J!==ie||la||n!==null&&n.dependencies!==null&&ou(n.dependencies)?(typeof D=="function"&&(Wh(r,o,D,u),ie=r.memoizedState),(le=la||w1(r,o,le,u,J,ie,V)||n!==null&&n.dependencies!==null&&ou(n.dependencies))?(Q||typeof y.UNSAFE_componentWillUpdate!="function"&&typeof y.componentWillUpdate!="function"||(typeof y.componentWillUpdate=="function"&&y.componentWillUpdate(u,ie,V),typeof y.UNSAFE_componentWillUpdate=="function"&&y.UNSAFE_componentWillUpdate(u,ie,V)),typeof y.componentDidUpdate=="function"&&(r.flags|=4),typeof y.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof y.componentDidUpdate!="function"||T===n.memoizedProps&&J===n.memoizedState||(r.flags|=4),typeof y.getSnapshotBeforeUpdate!="function"||T===n.memoizedProps&&J===n.memoizedState||(r.flags|=1024),r.memoizedProps=u,r.memoizedState=ie),y.props=u,y.state=ie,y.context=V,u=le):(typeof y.componentDidUpdate!="function"||T===n.memoizedProps&&J===n.memoizedState||(r.flags|=4),typeof y.getSnapshotBeforeUpdate!="function"||T===n.memoizedProps&&J===n.memoizedState||(r.flags|=1024),u=!1)}return y=u,Cu(n,r),u=(r.flags&128)!==0,y||u?(y=r.stateNode,o=u&&typeof o.getDerivedStateFromError!="function"?null:y.render(),r.flags|=1,n!==null&&u?(r.child=ts(r,n.child,null,p),r.child=ts(r,null,o,p)):vn(n,r,o,p),r.memoizedState=y.state,n=r.child):n=Br(n,r,p),n}function P1(n,r,o,u){return Ka(),r.flags|=256,vn(n,r,o,u),r.child}var ip={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function rp(n){return{baseLanes:n,cachePool:Cx()}}function ap(n,r,o){return n=n!==null?n.childLanes&~o:0,r&&(n|=pi),n}function U1(n,r,o){var u=r.pendingProps,p=!1,y=(r.flags&128)!==0,T;if((T=y)||(T=n!==null&&n.memoizedState===null?!1:(qt.current&2)!==0),T&&(p=!0,r.flags&=-129),T=(r.flags&32)!==0,r.flags&=-33,n===null){if(Qe){if(p?da(r):fa(),(n=At)?(n=Yb(n,zi),n=n!==null&&n.data!=="&"?n:null,n!==null&&(r.memoizedState={dehydrated:n,treeContext:ra!==null?{id:cr,overflow:ur}:null,retryLane:536870912,hydrationErrors:null},o=yx(n),o.return=r,r.child=o,xn=r,At=null)):n=null,n===null)throw sa(r);return Vp(n)?r.lanes=32:r.lanes=536870912,null}var D=u.children;return u=u.fallback,p?(fa(),p=r.mode,D=ku({mode:"hidden",children:D},p),u=Xa(u,p,o,null),D.return=r,u.return=r,D.sibling=u,r.child=D,u=r.child,u.memoizedState=rp(o),u.childLanes=ap(n,T,o),r.memoizedState=ip,xl(null,u)):(da(r),sp(r,D))}var V=n.memoizedState;if(V!==null&&(D=V.dehydrated,D!==null)){if(y)r.flags&256?(da(r),r.flags&=-257,r=op(n,r,o)):r.memoizedState!==null?(fa(),r.child=n.child,r.flags|=128,r=null):(fa(),D=u.fallback,p=r.mode,u=ku({mode:"visible",children:u.children},p),D=Xa(D,p,o,null),D.flags|=2,u.return=r,D.return=r,u.sibling=D,r.child=u,ts(r,n.child,null,o),u=r.child,u.memoizedState=rp(o),u.childLanes=ap(n,T,o),r.memoizedState=ip,r=xl(null,u));else if(da(r),Vp(D)){if(T=D.nextSibling&&D.nextSibling.dataset,T)var Q=T.dgst;T=Q,u=Error(a(419)),u.stack="",u.digest=T,sl({value:u,source:null,stack:null}),r=op(n,r,o)}else if(Wt||qs(n,r,o,!1),T=(o&n.childLanes)!==0,Wt||T){if(T=vt,T!==null&&(u=oe(T,o),u!==0&&u!==V.retryLane))throw V.retryLane=u,Ga(n,u),Kn(T,n,u),tp;Bp(D)||zu(),r=op(n,r,o)}else Bp(D)?(r.flags|=192,r.child=n.child,r=null):(n=V.treeContext,At=Ui(D.nextSibling),xn=r,Qe=!0,aa=null,zi=!1,n!==null&&vx(r,n),r=sp(r,u.children),r.flags|=4096);return r}return p?(fa(),D=u.fallback,p=r.mode,V=n.child,Q=V.sibling,u=jr(V,{mode:"hidden",children:u.children}),u.subtreeFlags=V.subtreeFlags&65011712,Q!==null?D=jr(Q,D):(D=Xa(D,p,o,null),D.flags|=2),D.return=r,u.return=r,u.sibling=D,r.child=u,xl(null,u),u=r.child,D=n.child.memoizedState,D===null?D=rp(o):(p=D.cachePool,p!==null?(V=Zt._currentValue,p=p.parent!==V?{parent:V,pool:V}:p):p=Cx(),D={baseLanes:D.baseLanes|o,cachePool:p}),u.memoizedState=D,u.childLanes=ap(n,T,o),r.memoizedState=ip,xl(n.child,u)):(da(r),o=n.child,n=o.sibling,o=jr(o,{mode:"visible",children:u.children}),o.return=r,o.sibling=null,n!==null&&(T=r.deletions,T===null?(r.deletions=[n],r.flags|=16):T.push(n)),r.child=o,r.memoizedState=null,o)}function sp(n,r){return r=ku({mode:"visible",children:r},n.mode),r.return=n,n.child=r}function ku(n,r){return n=ui(22,n,null,r),n.lanes=0,n}function op(n,r,o){return ts(r,n.child,null,o),n=sp(r,r.pendingProps.children),n.flags|=2,r.memoizedState=null,n}function I1(n,r,o){n.lanes|=r;var u=n.alternate;u!==null&&(u.lanes|=r),Sh(n.return,r,o)}function lp(n,r,o,u,p,y){var T=n.memoizedState;T===null?n.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:p,treeForkCount:y}:(T.isBackwards=r,T.rendering=null,T.renderingStartTime=0,T.last=u,T.tail=o,T.tailMode=p,T.treeForkCount=y)}function B1(n,r,o){var u=r.pendingProps,p=u.revealOrder,y=u.tail;u=u.children;var T=qt.current,D=(T&2)!==0;if(D?(T=T&1|2,r.flags|=128):T&=1,G(qt,T),vn(n,r,u,o),u=Qe?al:0,!D&&n!==null&&(n.flags&128)!==0)e:for(n=r.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&I1(n,o,r);else if(n.tag===19)I1(n,o,r);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===r)break e;for(;n.sibling===null;){if(n.return===null||n.return===r)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}switch(p){case"forwards":for(o=r.child,p=null;o!==null;)n=o.alternate,n!==null&&mu(n)===null&&(p=o),o=o.sibling;o=p,o===null?(p=r.child,r.child=null):(p=o.sibling,o.sibling=null),lp(r,!1,p,o,y,u);break;case"backwards":case"unstable_legacy-backwards":for(o=null,p=r.child,r.child=null;p!==null;){if(n=p.alternate,n!==null&&mu(n)===null){r.child=p;break}n=p.sibling,p.sibling=o,o=p,p=n}lp(r,!0,o,null,y,u);break;case"together":lp(r,!1,null,null,void 0,u);break;default:r.memoizedState=null}return r.child}function Br(n,r,o){if(n!==null&&(r.dependencies=n.dependencies),ma|=r.lanes,(o&r.childLanes)===0)if(n!==null){if(qs(n,r,o,!1),(o&r.childLanes)===0)return null}else return null;if(n!==null&&r.child!==n.child)throw Error(a(153));if(r.child!==null){for(n=r.child,o=jr(n,n.pendingProps),r.child=o,o.return=r;n.sibling!==null;)n=n.sibling,o=o.sibling=jr(n,n.pendingProps),o.return=r;o.sibling=null}return r.child}function cp(n,r){return(n.lanes&r)!==0?!0:(n=n.dependencies,!!(n!==null&&ou(n)))}function XC(n,r,o){switch(r.tag){case 3:he(r,r.stateNode.containerInfo),oa(r,Zt,n.memoizedState.cache),Ka();break;case 27:case 5:Ue(r);break;case 4:he(r,r.stateNode.containerInfo);break;case 10:oa(r,r.type,r.memoizedProps.value);break;case 31:if(r.memoizedState!==null)return r.flags|=128,jh(r),null;break;case 13:var u=r.memoizedState;if(u!==null)return u.dehydrated!==null?(da(r),r.flags|=128,null):(o&r.child.childLanes)!==0?U1(n,r,o):(da(r),n=Br(n,r,o),n!==null?n.sibling:null);da(r);break;case 19:var p=(n.flags&128)!==0;if(u=(o&r.childLanes)!==0,u||(qs(n,r,o,!1),u=(o&r.childLanes)!==0),p){if(u)return B1(n,r,o);r.flags|=128}if(p=r.memoizedState,p!==null&&(p.rendering=null,p.tail=null,p.lastEffect=null),G(qt,qt.current),u)break;return null;case 22:return r.lanes=0,M1(n,r,o,r.pendingProps);case 24:oa(r,Zt,n.memoizedState.cache)}return Br(n,r,o)}function V1(n,r,o){if(n!==null)if(n.memoizedProps!==r.pendingProps)Wt=!0;else{if(!cp(n,o)&&(r.flags&128)===0)return Wt=!1,XC(n,r,o);Wt=(n.flags&131072)!==0}else Wt=!1,Qe&&(r.flags&1048576)!==0&&bx(r,al,r.index);switch(r.lanes=0,r.tag){case 16:e:{var u=r.pendingProps;if(n=Ja(r.elementType),r.type=n,typeof n=="function")ph(n)?(u=is(n,u),r.tag=1,r=z1(null,r,n,u,o)):(r.tag=0,r=np(null,r,n,u,o));else{if(n!=null){var p=n.$$typeof;if(p===L){r.tag=11,r=R1(null,r,n,u,o);break e}else if(p===k){r.tag=14,r=D1(null,r,n,u,o);break e}}throw r=we(n)||n,Error(a(306,r,""))}}return r;case 0:return np(n,r,r.type,r.pendingProps,o);case 1:return u=r.type,p=is(u,r.pendingProps),z1(n,r,u,p,o);case 3:e:{if(he(r,r.stateNode.containerInfo),n===null)throw Error(a(387));u=r.pendingProps;var y=r.memoizedState;p=y.element,Rh(n,r),hl(r,u,null,o);var T=r.memoizedState;if(u=T.cache,oa(r,Zt,u),u!==y.cache&&_h(r,[Zt],o,!0),fl(),u=T.element,y.isDehydrated)if(y={element:u,isDehydrated:!1,cache:T.cache},r.updateQueue.baseState=y,r.memoizedState=y,r.flags&256){r=P1(n,r,u,o);break e}else if(u!==p){p=Li(Error(a(424)),r),sl(p),r=P1(n,r,u,o);break e}else for(n=r.stateNode.containerInfo,n.nodeType===9?n=n.body:n=n.nodeName==="HTML"?n.ownerDocument.body:n,At=Ui(n.firstChild),xn=r,Qe=!0,aa=null,zi=!0,o=Mx(r,null,u,o),r.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Ka(),u===p){r=Br(n,r,o);break e}vn(n,r,u,o)}r=r.child}return r;case 26:return Cu(n,r),n===null?(o=Wb(r.type,null,r.pendingProps,null))?r.memoizedState=o:Qe||(o=r.type,n=r.pendingProps,u=Hu(ue.current).createElement(o),u[$e]=r,u[Ge]=n,wn(u,o,n),pn(u),r.stateNode=u):r.memoizedState=Wb(r.type,n.memoizedProps,r.pendingProps,n.memoizedState),null;case 27:return Ue(r),n===null&&Qe&&(u=r.stateNode=Kb(r.type,r.pendingProps,ue.current),xn=r,zi=!0,p=At,va(r.type)?(Fp=p,At=Ui(u.firstChild)):At=p),vn(n,r,r.pendingProps.children,o),Cu(n,r),n===null&&(r.flags|=4194304),r.child;case 5:return n===null&&Qe&&((p=u=At)&&(u=T4(u,r.type,r.pendingProps,zi),u!==null?(r.stateNode=u,xn=r,At=Ui(u.firstChild),zi=!1,p=!0):p=!1),p||sa(r)),Ue(r),p=r.type,y=r.pendingProps,T=n!==null?n.memoizedProps:null,u=y.children,Pp(p,y)?u=null:T!==null&&Pp(p,T)&&(r.flags|=32),r.memoizedState!==null&&(p=zh(n,r,IC,null,null,o),Ll._currentValue=p),Cu(n,r),vn(n,r,u,o),r.child;case 6:return n===null&&Qe&&((n=o=At)&&(o=E4(o,r.pendingProps,zi),o!==null?(r.stateNode=o,xn=r,At=null,n=!0):n=!1),n||sa(r)),null;case 13:return U1(n,r,o);case 4:return he(r,r.stateNode.containerInfo),u=r.pendingProps,n===null?r.child=ts(r,null,u,o):vn(n,r,u,o),r.child;case 11:return R1(n,r,r.type,r.pendingProps,o);case 7:return vn(n,r,r.pendingProps,o),r.child;case 8:return vn(n,r,r.pendingProps.children,o),r.child;case 12:return vn(n,r,r.pendingProps.children,o),r.child;case 10:return u=r.pendingProps,oa(r,r.type,u.value),vn(n,r,u.children,o),r.child;case 9:return p=r.type._context,u=r.pendingProps.children,Qa(r),p=bn(p),u=u(p),r.flags|=1,vn(n,r,u,o),r.child;case 14:return D1(n,r,r.type,r.pendingProps,o);case 15:return O1(n,r,r.type,r.pendingProps,o);case 19:return B1(n,r,o);case 31:return GC(n,r,o);case 22:return M1(n,r,o,r.pendingProps);case 24:return Qa(r),u=bn(Zt),n===null?(p=Ch(),p===null&&(p=vt,y=Th(),p.pooledCache=y,y.refCount++,y!==null&&(p.pooledCacheLanes|=o),p=y),r.memoizedState={parent:u,cache:p},Ah(r),oa(r,Zt,p)):((n.lanes&o)!==0&&(Rh(n,r),hl(r,null,null,o),fl()),p=n.memoizedState,y=r.memoizedState,p.parent!==u?(p={parent:u,cache:u},r.memoizedState=p,r.lanes===0&&(r.memoizedState=r.updateQueue.baseState=p),oa(r,Zt,u)):(u=y.cache,oa(r,Zt,u),u!==p.cache&&_h(r,[Zt],o,!0))),vn(n,r,r.pendingProps.children,o),r.child;case 29:throw r.pendingProps}throw Error(a(156,r.tag))}function Vr(n){n.flags|=4}function up(n,r,o,u,p){if((r=(n.mode&32)!==0)&&(r=!1),r){if(n.flags|=16777216,(p&335544128)===p)if(n.stateNode.complete)n.flags|=8192;else if(pb())n.flags|=8192;else throw es=du,kh}else n.flags&=-16777217}function F1(n,r){if(r.type!=="stylesheet"||(r.state.loading&4)!==0)n.flags&=-16777217;else if(n.flags|=16777216,!iv(r))if(pb())n.flags|=8192;else throw es=du,kh}function Au(n,r){r!==null&&(n.flags|=4),n.flags&16384&&(r=n.tag!==22?de():536870912,n.lanes|=r,io|=r)}function bl(n,r){if(!Qe)switch(n.tailMode){case"hidden":r=n.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?r||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function Rt(n){var r=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(r)for(var p=n.child;p!==null;)o|=p.lanes|p.childLanes,u|=p.subtreeFlags&65011712,u|=p.flags&65011712,p.return=n,p=p.sibling;else for(p=n.child;p!==null;)o|=p.lanes|p.childLanes,u|=p.subtreeFlags,u|=p.flags,p.return=n,p=p.sibling;return n.subtreeFlags|=u,n.childLanes=o,r}function KC(n,r,o){var u=r.pendingProps;switch(xh(r),r.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Rt(r),null;case 1:return Rt(r),null;case 3:return o=r.stateNode,u=null,n!==null&&(u=n.memoizedState.cache),r.memoizedState.cache!==u&&(r.flags|=2048),Pr(Zt),Ce(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(n===null||n.child===null)&&($s(r)?Vr(r):n===null||n.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,vh())),Rt(r),null;case 26:var p=r.type,y=r.memoizedState;return n===null?(Vr(r),y!==null?(Rt(r),F1(r,y)):(Rt(r),up(r,p,null,u,o))):y?y!==n.memoizedState?(Vr(r),Rt(r),F1(r,y)):(Rt(r),r.flags&=-16777217):(n=n.memoizedProps,n!==u&&Vr(r),Rt(r),up(r,p,n,u,o)),null;case 27:if(Le(r),o=ue.current,p=r.type,n!==null&&r.stateNode!=null)n.memoizedProps!==u&&Vr(r);else{if(!u){if(r.stateNode===null)throw Error(a(166));return Rt(r),null}n=ne.current,$s(r)?wx(r):(n=Kb(p,u,o),r.stateNode=n,Vr(r))}return Rt(r),null;case 5:if(Le(r),p=r.type,n!==null&&r.stateNode!=null)n.memoizedProps!==u&&Vr(r);else{if(!u){if(r.stateNode===null)throw Error(a(166));return Rt(r),null}if(y=ne.current,$s(r))wx(r);else{var T=Hu(ue.current);switch(y){case 1:y=T.createElementNS("http://www.w3.org/2000/svg",p);break;case 2:y=T.createElementNS("http://www.w3.org/1998/Math/MathML",p);break;default:switch(p){case"svg":y=T.createElementNS("http://www.w3.org/2000/svg",p);break;case"math":y=T.createElementNS("http://www.w3.org/1998/Math/MathML",p);break;case"script":y=T.createElement("div"),y.innerHTML="<script><\/script>",y=y.removeChild(y.firstChild);break;case"select":y=typeof u.is=="string"?T.createElement("select",{is:u.is}):T.createElement("select"),u.multiple?y.multiple=!0:u.size&&(y.size=u.size);break;default:y=typeof u.is=="string"?T.createElement(p,{is:u.is}):T.createElement(p)}}y[$e]=r,y[Ge]=u;e:for(T=r.child;T!==null;){if(T.tag===5||T.tag===6)y.appendChild(T.stateNode);else if(T.tag!==4&&T.tag!==27&&T.child!==null){T.child.return=T,T=T.child;continue}if(T===r)break e;for(;T.sibling===null;){if(T.return===null||T.return===r)break e;T=T.return}T.sibling.return=T.return,T=T.sibling}r.stateNode=y;e:switch(wn(y,p,u),p){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}u&&Vr(r)}}return Rt(r),up(r,r.type,n===null?null:n.memoizedProps,r.pendingProps,o),null;case 6:if(n&&r.stateNode!=null)n.memoizedProps!==u&&Vr(r);else{if(typeof u!="string"&&r.stateNode===null)throw Error(a(166));if(n=ue.current,$s(r)){if(n=r.stateNode,o=r.memoizedProps,u=null,p=xn,p!==null)switch(p.tag){case 27:case 5:u=p.memoizedProps}n[$e]=r,n=!!(n.nodeValue===o||u!==null&&u.suppressHydrationWarning===!0||Ub(n.nodeValue,o)),n||sa(r,!0)}else n=Hu(n).createTextNode(u),n[$e]=r,r.stateNode=n}return Rt(r),null;case 31:if(o=r.memoizedState,n===null||n.memoizedState!==null){if(u=$s(r),o!==null){if(n===null){if(!u)throw Error(a(318));if(n=r.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(a(557));n[$e]=r}else Ka(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Rt(r),n=!1}else o=vh(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=o),n=!0;if(!n)return r.flags&256?(fi(r),r):(fi(r),null);if((r.flags&128)!==0)throw Error(a(558))}return Rt(r),null;case 13:if(u=r.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(p=$s(r),u!==null&&u.dehydrated!==null){if(n===null){if(!p)throw Error(a(318));if(p=r.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(a(317));p[$e]=r}else Ka(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;Rt(r),p=!1}else p=vh(),n!==null&&n.memoizedState!==null&&(n.memoizedState.hydrationErrors=p),p=!0;if(!p)return r.flags&256?(fi(r),r):(fi(r),null)}return fi(r),(r.flags&128)!==0?(r.lanes=o,r):(o=u!==null,n=n!==null&&n.memoizedState!==null,o&&(u=r.child,p=null,u.alternate!==null&&u.alternate.memoizedState!==null&&u.alternate.memoizedState.cachePool!==null&&(p=u.alternate.memoizedState.cachePool.pool),y=null,u.memoizedState!==null&&u.memoizedState.cachePool!==null&&(y=u.memoizedState.cachePool.pool),y!==p&&(u.flags|=2048)),o!==n&&o&&(r.child.flags|=8192),Au(r,r.updateQueue),Rt(r),null);case 4:return Ce(),n===null&&Mp(r.stateNode.containerInfo),Rt(r),null;case 10:return Pr(r.type),Rt(r),null;case 19:if(q(qt),u=r.memoizedState,u===null)return Rt(r),null;if(p=(r.flags&128)!==0,y=u.rendering,y===null)if(p)bl(u,!1);else{if(Ft!==0||n!==null&&(n.flags&128)!==0)for(n=r.child;n!==null;){if(y=mu(n),y!==null){for(r.flags|=128,bl(u,!1),n=y.updateQueue,r.updateQueue=n,Au(r,n),r.subtreeFlags=0,n=o,o=r.child;o!==null;)gx(o,n),o=o.sibling;return G(qt,qt.current&1|2),Qe&&Nr(r,u.treeForkCount),r.child}n=n.sibling}u.tail!==null&&Ze()>Lu&&(r.flags|=128,p=!0,bl(u,!1),r.lanes=4194304)}else{if(!p)if(n=mu(y),n!==null){if(r.flags|=128,p=!0,n=n.updateQueue,r.updateQueue=n,Au(r,n),bl(u,!0),u.tail===null&&u.tailMode==="hidden"&&!y.alternate&&!Qe)return Rt(r),null}else 2*Ze()-u.renderingStartTime>Lu&&o!==536870912&&(r.flags|=128,p=!0,bl(u,!1),r.lanes=4194304);u.isBackwards?(y.sibling=r.child,r.child=y):(n=u.last,n!==null?n.sibling=y:r.child=y,u.last=y)}return u.tail!==null?(n=u.tail,u.rendering=n,u.tail=n.sibling,u.renderingStartTime=Ze(),n.sibling=null,o=qt.current,G(qt,p?o&1|2:o&1),Qe&&Nr(r,u.treeForkCount),n):(Rt(r),null);case 22:case 23:return fi(r),Lh(),u=r.memoizedState!==null,n!==null?n.memoizedState!==null!==u&&(r.flags|=8192):u&&(r.flags|=8192),u?(o&536870912)!==0&&(r.flags&128)===0&&(Rt(r),r.subtreeFlags&6&&(r.flags|=8192)):Rt(r),o=r.updateQueue,o!==null&&Au(r,o.retryQueue),o=null,n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),u=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==o&&(r.flags|=2048),n!==null&&q(Wa),null;case 24:return o=null,n!==null&&(o=n.memoizedState.cache),r.memoizedState.cache!==o&&(r.flags|=2048),Pr(Zt),Rt(r),null;case 25:return null;case 30:return null}throw Error(a(156,r.tag))}function ZC(n,r){switch(xh(r),r.tag){case 1:return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 3:return Pr(Zt),Ce(),n=r.flags,(n&65536)!==0&&(n&128)===0?(r.flags=n&-65537|128,r):null;case 26:case 27:case 5:return Le(r),null;case 31:if(r.memoizedState!==null){if(fi(r),r.alternate===null)throw Error(a(340));Ka()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 13:if(fi(r),n=r.memoizedState,n!==null&&n.dehydrated!==null){if(r.alternate===null)throw Error(a(340));Ka()}return n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 19:return q(qt),null;case 4:return Ce(),null;case 10:return Pr(r.type),null;case 22:case 23:return fi(r),Lh(),n!==null&&q(Wa),n=r.flags,n&65536?(r.flags=n&-65537|128,r):null;case 24:return Pr(Zt),null;case 25:return null;default:return null}}function H1(n,r){switch(xh(r),r.tag){case 3:Pr(Zt),Ce();break;case 26:case 27:case 5:Le(r);break;case 4:Ce();break;case 31:r.memoizedState!==null&&fi(r);break;case 13:fi(r);break;case 19:q(qt);break;case 10:Pr(r.type);break;case 22:case 23:fi(r),Lh(),n!==null&&q(Wa);break;case 24:Pr(Zt)}}function vl(n,r){try{var o=r.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var p=u.next;o=p;do{if((o.tag&n)===n){u=void 0;var y=o.create,T=o.inst;u=y(),T.destroy=u}o=o.next}while(o!==p)}}catch(D){ft(r,r.return,D)}}function ha(n,r,o){try{var u=r.updateQueue,p=u!==null?u.lastEffect:null;if(p!==null){var y=p.next;u=y;do{if((u.tag&n)===n){var T=u.inst,D=T.destroy;if(D!==void 0){T.destroy=void 0,p=r;var V=o,Q=D;try{Q()}catch(le){ft(p,V,le)}}}u=u.next}while(u!==y)}}catch(le){ft(r,r.return,le)}}function $1(n){var r=n.updateQueue;if(r!==null){var o=n.stateNode;try{jx(r,o)}catch(u){ft(n,n.return,u)}}}function q1(n,r,o){o.props=is(n.type,n.memoizedProps),o.state=n.memoizedState;try{o.componentWillUnmount()}catch(u){ft(n,r,u)}}function wl(n,r){try{var o=n.ref;if(o!==null){switch(n.tag){case 26:case 27:case 5:var u=n.stateNode;break;case 30:u=n.stateNode;break;default:u=n.stateNode}typeof o=="function"?n.refCleanup=o(u):o.current=u}}catch(p){ft(n,r,p)}}function dr(n,r){var o=n.ref,u=n.refCleanup;if(o!==null)if(typeof u=="function")try{u()}catch(p){ft(n,r,p)}finally{n.refCleanup=null,n=n.alternate,n!=null&&(n.refCleanup=null)}else if(typeof o=="function")try{o(null)}catch(p){ft(n,r,p)}else o.current=null}function Y1(n){var r=n.type,o=n.memoizedProps,u=n.stateNode;try{e:switch(r){case"button":case"input":case"select":case"textarea":o.autoFocus&&u.focus();break e;case"img":o.src?u.src=o.src:o.srcSet&&(u.srcset=o.srcSet)}}catch(p){ft(n,n.return,p)}}function dp(n,r,o){try{var u=n.stateNode;x4(u,n.type,o,r),u[Ge]=r}catch(p){ft(n,n.return,p)}}function G1(n){return n.tag===5||n.tag===3||n.tag===26||n.tag===27&&va(n.type)||n.tag===4}function fp(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||G1(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.tag===27&&va(n.type)||n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function hp(n,r,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?(o.nodeType===9?o.body:o.nodeName==="HTML"?o.ownerDocument.body:o).insertBefore(n,r):(r=o.nodeType===9?o.body:o.nodeName==="HTML"?o.ownerDocument.body:o,r.appendChild(n),o=o._reactRootContainer,o!=null||r.onclick!==null||(r.onclick=Mr));else if(u!==4&&(u===27&&va(n.type)&&(o=n.stateNode,r=null),n=n.child,n!==null))for(hp(n,r,o),n=n.sibling;n!==null;)hp(n,r,o),n=n.sibling}function Ru(n,r,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,r?o.insertBefore(n,r):o.appendChild(n);else if(u!==4&&(u===27&&va(n.type)&&(o=n.stateNode),n=n.child,n!==null))for(Ru(n,r,o),n=n.sibling;n!==null;)Ru(n,r,o),n=n.sibling}function X1(n){var r=n.stateNode,o=n.memoizedProps;try{for(var u=n.type,p=r.attributes;p.length;)r.removeAttributeNode(p[0]);wn(r,u,o),r[$e]=n,r[Ge]=o}catch(y){ft(n,n.return,y)}}var Fr=!1,Jt=!1,pp=!1,K1=typeof WeakSet=="function"?WeakSet:Set,mn=null;function QC(n,r){if(n=n.containerInfo,Np=Zu,n=ox(n),oh(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var p=u.anchorOffset,y=u.focusNode;u=u.focusOffset;try{o.nodeType,y.nodeType}catch{o=null;break e}var T=0,D=-1,V=-1,Q=0,le=0,ge=n,J=null;t:for(;;){for(var ie;ge!==o||p!==0&&ge.nodeType!==3||(D=T+p),ge!==y||u!==0&&ge.nodeType!==3||(V=T+u),ge.nodeType===3&&(T+=ge.nodeValue.length),(ie=ge.firstChild)!==null;)J=ge,ge=ie;for(;;){if(ge===n)break t;if(J===o&&++Q===p&&(D=T),J===y&&++le===u&&(V=T),(ie=ge.nextSibling)!==null)break;ge=J,J=ge.parentNode}ge=ie}o=D===-1||V===-1?null:{start:D,end:V}}else o=null}o=o||{start:0,end:0}}else o=null;for(zp={focusedElem:n,selectionRange:o},Zu=!1,mn=r;mn!==null;)if(r=mn,n=r.child,(r.subtreeFlags&1028)!==0&&n!==null)n.return=r,mn=n;else for(;mn!==null;){switch(r=mn,y=r.alternate,n=r.flags,r.tag){case 0:if((n&4)!==0&&(n=r.updateQueue,n=n!==null?n.events:null,n!==null))for(o=0;o<n.length;o++)p=n[o],p.ref.impl=p.nextImpl;break;case 11:case 15:break;case 1:if((n&1024)!==0&&y!==null){n=void 0,o=r,p=y.memoizedProps,y=y.memoizedState,u=o.stateNode;try{var ke=is(o.type,p);n=u.getSnapshotBeforeUpdate(ke,y),u.__reactInternalSnapshotBeforeUpdate=n}catch(Me){ft(o,o.return,Me)}}break;case 3:if((n&1024)!==0){if(n=r.stateNode.containerInfo,o=n.nodeType,o===9)Ip(n);else if(o===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Ip(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((n&1024)!==0)throw Error(a(163))}if(n=r.sibling,n!==null){n.return=r.return,mn=n;break}mn=r.return}}function Z1(n,r,o){var u=o.flags;switch(o.tag){case 0:case 11:case 15:$r(n,o),u&4&&vl(5,o);break;case 1:if($r(n,o),u&4)if(n=o.stateNode,r===null)try{n.componentDidMount()}catch(T){ft(o,o.return,T)}else{var p=is(o.type,r.memoizedProps);r=r.memoizedState;try{n.componentDidUpdate(p,r,n.__reactInternalSnapshotBeforeUpdate)}catch(T){ft(o,o.return,T)}}u&64&&$1(o),u&512&&wl(o,o.return);break;case 3:if($r(n,o),u&64&&(n=o.updateQueue,n!==null)){if(r=null,o.child!==null)switch(o.child.tag){case 27:case 5:r=o.child.stateNode;break;case 1:r=o.child.stateNode}try{jx(n,r)}catch(T){ft(o,o.return,T)}}break;case 27:r===null&&u&4&&X1(o);case 26:case 5:$r(n,o),r===null&&u&4&&Y1(o),u&512&&wl(o,o.return);break;case 12:$r(n,o);break;case 31:$r(n,o),u&4&&J1(n,o);break;case 13:$r(n,o),u&4&&eb(n,o),u&64&&(n=o.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&(o=s4.bind(null,o),C4(n,o))));break;case 22:if(u=o.memoizedState!==null||Fr,!u){r=r!==null&&r.memoizedState!==null||Jt,p=Fr;var y=Jt;Fr=u,(Jt=r)&&!y?qr(n,o,(o.subtreeFlags&8772)!==0):$r(n,o),Fr=p,Jt=y}break;case 30:break;default:$r(n,o)}}function Q1(n){var r=n.alternate;r!==null&&(n.alternate=null,Q1(r)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(r=n.stateNode,r!==null&&$f(r)),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}var Lt=null,qn=!1;function Hr(n,r,o){for(o=o.child;o!==null;)W1(n,r,o),o=o.sibling}function W1(n,r,o){if(Ct&&typeof Ct.onCommitFiberUnmount=="function")try{Ct.onCommitFiberUnmount(ai,o)}catch{}switch(o.tag){case 26:Jt||dr(o,r),Hr(n,r,o),o.memoizedState?o.memoizedState.count--:o.stateNode&&(o=o.stateNode,o.parentNode.removeChild(o));break;case 27:Jt||dr(o,r);var u=Lt,p=qn;va(o.type)&&(Lt=o.stateNode,qn=!1),Hr(n,r,o),Dl(o.stateNode),Lt=u,qn=p;break;case 5:Jt||dr(o,r);case 6:if(u=Lt,p=qn,Lt=null,Hr(n,r,o),Lt=u,qn=p,Lt!==null)if(qn)try{(Lt.nodeType===9?Lt.body:Lt.nodeName==="HTML"?Lt.ownerDocument.body:Lt).removeChild(o.stateNode)}catch(y){ft(o,r,y)}else try{Lt.removeChild(o.stateNode)}catch(y){ft(o,r,y)}break;case 18:Lt!==null&&(qn?(n=Lt,$b(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,o.stateNode),fo(n)):$b(Lt,o.stateNode));break;case 4:u=Lt,p=qn,Lt=o.stateNode.containerInfo,qn=!0,Hr(n,r,o),Lt=u,qn=p;break;case 0:case 11:case 14:case 15:ha(2,o,r),Jt||ha(4,o,r),Hr(n,r,o);break;case 1:Jt||(dr(o,r),u=o.stateNode,typeof u.componentWillUnmount=="function"&&q1(o,r,u)),Hr(n,r,o);break;case 21:Hr(n,r,o);break;case 22:Jt=(u=Jt)||o.memoizedState!==null,Hr(n,r,o),Jt=u;break;default:Hr(n,r,o)}}function J1(n,r){if(r.memoizedState===null&&(n=r.alternate,n!==null&&(n=n.memoizedState,n!==null))){n=n.dehydrated;try{fo(n)}catch(o){ft(r,r.return,o)}}}function eb(n,r){if(r.memoizedState===null&&(n=r.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null))))try{fo(n)}catch(o){ft(r,r.return,o)}}function WC(n){switch(n.tag){case 31:case 13:case 19:var r=n.stateNode;return r===null&&(r=n.stateNode=new K1),r;case 22:return n=n.stateNode,r=n._retryCache,r===null&&(r=n._retryCache=new K1),r;default:throw Error(a(435,n.tag))}}function Du(n,r){var o=WC(n);r.forEach(function(u){if(!o.has(u)){o.add(u);var p=o4.bind(null,n,u);u.then(p,p)}})}function Yn(n,r){var o=r.deletions;if(o!==null)for(var u=0;u<o.length;u++){var p=o[u],y=n,T=r,D=T;e:for(;D!==null;){switch(D.tag){case 27:if(va(D.type)){Lt=D.stateNode,qn=!1;break e}break;case 5:Lt=D.stateNode,qn=!1;break e;case 3:case 4:Lt=D.stateNode.containerInfo,qn=!0;break e}D=D.return}if(Lt===null)throw Error(a(160));W1(y,T,p),Lt=null,qn=!1,y=p.alternate,y!==null&&(y.return=null),p.return=null}if(r.subtreeFlags&13886)for(r=r.child;r!==null;)tb(r,n),r=r.sibling}var Ji=null;function tb(n,r){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:Yn(r,n),Gn(n),u&4&&(ha(3,n,n.return),vl(3,n),ha(5,n,n.return));break;case 1:Yn(r,n),Gn(n),u&512&&(Jt||o===null||dr(o,o.return)),u&64&&Fr&&(n=n.updateQueue,n!==null&&(u=n.callbacks,u!==null&&(o=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=o===null?u:o.concat(u))));break;case 26:var p=Ji;if(Yn(r,n),Gn(n),u&512&&(Jt||o===null||dr(o,o.return)),u&4){var y=o!==null?o.memoizedState:null;if(u=n.memoizedState,o===null)if(u===null)if(n.stateNode===null){e:{u=n.type,o=n.memoizedProps,p=p.ownerDocument||p;t:switch(u){case"title":y=p.getElementsByTagName("title")[0],(!y||y[Xo]||y[$e]||y.namespaceURI==="http://www.w3.org/2000/svg"||y.hasAttribute("itemprop"))&&(y=p.createElement(u),p.head.insertBefore(y,p.querySelector("head > title"))),wn(y,u,o),y[$e]=n,pn(y),u=y;break e;case"link":var T=tv("link","href",p).get(u+(o.href||""));if(T){for(var D=0;D<T.length;D++)if(y=T[D],y.getAttribute("href")===(o.href==null||o.href===""?null:o.href)&&y.getAttribute("rel")===(o.rel==null?null:o.rel)&&y.getAttribute("title")===(o.title==null?null:o.title)&&y.getAttribute("crossorigin")===(o.crossOrigin==null?null:o.crossOrigin)){T.splice(D,1);break t}}y=p.createElement(u),wn(y,u,o),p.head.appendChild(y);break;case"meta":if(T=tv("meta","content",p).get(u+(o.content||""))){for(D=0;D<T.length;D++)if(y=T[D],y.getAttribute("content")===(o.content==null?null:""+o.content)&&y.getAttribute("name")===(o.name==null?null:o.name)&&y.getAttribute("property")===(o.property==null?null:o.property)&&y.getAttribute("http-equiv")===(o.httpEquiv==null?null:o.httpEquiv)&&y.getAttribute("charset")===(o.charSet==null?null:o.charSet)){T.splice(D,1);break t}}y=p.createElement(u),wn(y,u,o),p.head.appendChild(y);break;default:throw Error(a(468,u))}y[$e]=n,pn(y),u=y}n.stateNode=u}else nv(p,n.type,n.stateNode);else n.stateNode=ev(p,u,n.memoizedProps);else y!==u?(y===null?o.stateNode!==null&&(o=o.stateNode,o.parentNode.removeChild(o)):y.count--,u===null?nv(p,n.type,n.stateNode):ev(p,u,n.memoizedProps)):u===null&&n.stateNode!==null&&dp(n,n.memoizedProps,o.memoizedProps)}break;case 27:Yn(r,n),Gn(n),u&512&&(Jt||o===null||dr(o,o.return)),o!==null&&u&4&&dp(n,n.memoizedProps,o.memoizedProps);break;case 5:if(Yn(r,n),Gn(n),u&512&&(Jt||o===null||dr(o,o.return)),n.flags&32){p=n.stateNode;try{js(p,"")}catch(ke){ft(n,n.return,ke)}}u&4&&n.stateNode!=null&&(p=n.memoizedProps,dp(n,p,o!==null?o.memoizedProps:p)),u&1024&&(pp=!0);break;case 6:if(Yn(r,n),Gn(n),u&4){if(n.stateNode===null)throw Error(a(162));u=n.memoizedProps,o=n.stateNode;try{o.nodeValue=u}catch(ke){ft(n,n.return,ke)}}break;case 3:if(Yu=null,p=Ji,Ji=$u(r.containerInfo),Yn(r,n),Ji=p,Gn(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{fo(r.containerInfo)}catch(ke){ft(n,n.return,ke)}pp&&(pp=!1,nb(n));break;case 4:u=Ji,Ji=$u(n.stateNode.containerInfo),Yn(r,n),Gn(n),Ji=u;break;case 12:Yn(r,n),Gn(n);break;case 31:Yn(r,n),Gn(n),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,Du(n,u)));break;case 13:Yn(r,n),Gn(n),n.child.flags&8192&&n.memoizedState!==null!=(o!==null&&o.memoizedState!==null)&&(Mu=Ze()),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,Du(n,u)));break;case 22:p=n.memoizedState!==null;var V=o!==null&&o.memoizedState!==null,Q=Fr,le=Jt;if(Fr=Q||p,Jt=le||V,Yn(r,n),Jt=le,Fr=Q,Gn(n),u&8192)e:for(r=n.stateNode,r._visibility=p?r._visibility&-2:r._visibility|1,p&&(o===null||V||Fr||Jt||rs(n)),o=null,r=n;;){if(r.tag===5||r.tag===26){if(o===null){V=o=r;try{if(y=V.stateNode,p)T=y.style,typeof T.setProperty=="function"?T.setProperty("display","none","important"):T.display="none";else{D=V.stateNode;var ge=V.memoizedProps.style,J=ge!=null&&ge.hasOwnProperty("display")?ge.display:null;D.style.display=J==null||typeof J=="boolean"?"":(""+J).trim()}}catch(ke){ft(V,V.return,ke)}}}else if(r.tag===6){if(o===null){V=r;try{V.stateNode.nodeValue=p?"":V.memoizedProps}catch(ke){ft(V,V.return,ke)}}}else if(r.tag===18){if(o===null){V=r;try{var ie=V.stateNode;p?qb(ie,!0):qb(V.stateNode,!1)}catch(ke){ft(V,V.return,ke)}}}else if((r.tag!==22&&r.tag!==23||r.memoizedState===null||r===n)&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break e;for(;r.sibling===null;){if(r.return===null||r.return===n)break e;o===r&&(o=null),r=r.return}o===r&&(o=null),r.sibling.return=r.return,r=r.sibling}u&4&&(u=n.updateQueue,u!==null&&(o=u.retryQueue,o!==null&&(u.retryQueue=null,Du(n,o))));break;case 19:Yn(r,n),Gn(n),u&4&&(u=n.updateQueue,u!==null&&(n.updateQueue=null,Du(n,u)));break;case 30:break;case 21:break;default:Yn(r,n),Gn(n)}}function Gn(n){var r=n.flags;if(r&2){try{for(var o,u=n.return;u!==null;){if(G1(u)){o=u;break}u=u.return}if(o==null)throw Error(a(160));switch(o.tag){case 27:var p=o.stateNode,y=fp(n);Ru(n,y,p);break;case 5:var T=o.stateNode;o.flags&32&&(js(T,""),o.flags&=-33);var D=fp(n);Ru(n,D,T);break;case 3:case 4:var V=o.stateNode.containerInfo,Q=fp(n);hp(n,Q,V);break;default:throw Error(a(161))}}catch(le){ft(n,n.return,le)}n.flags&=-3}r&4096&&(n.flags&=-4097)}function nb(n){if(n.subtreeFlags&1024)for(n=n.child;n!==null;){var r=n;nb(r),r.tag===5&&r.flags&1024&&r.stateNode.reset(),n=n.sibling}}function $r(n,r){if(r.subtreeFlags&8772)for(r=r.child;r!==null;)Z1(n,r.alternate,r),r=r.sibling}function rs(n){for(n=n.child;n!==null;){var r=n;switch(r.tag){case 0:case 11:case 14:case 15:ha(4,r,r.return),rs(r);break;case 1:dr(r,r.return);var o=r.stateNode;typeof o.componentWillUnmount=="function"&&q1(r,r.return,o),rs(r);break;case 27:Dl(r.stateNode);case 26:case 5:dr(r,r.return),rs(r);break;case 22:r.memoizedState===null&&rs(r);break;case 30:rs(r);break;default:rs(r)}n=n.sibling}}function qr(n,r,o){for(o=o&&(r.subtreeFlags&8772)!==0,r=r.child;r!==null;){var u=r.alternate,p=n,y=r,T=y.flags;switch(y.tag){case 0:case 11:case 15:qr(p,y,o),vl(4,y);break;case 1:if(qr(p,y,o),u=y,p=u.stateNode,typeof p.componentDidMount=="function")try{p.componentDidMount()}catch(Q){ft(u,u.return,Q)}if(u=y,p=u.updateQueue,p!==null){var D=u.stateNode;try{var V=p.shared.hiddenCallbacks;if(V!==null)for(p.shared.hiddenCallbacks=null,p=0;p<V.length;p++)Lx(V[p],D)}catch(Q){ft(u,u.return,Q)}}o&&T&64&&$1(y),wl(y,y.return);break;case 27:X1(y);case 26:case 5:qr(p,y,o),o&&u===null&&T&4&&Y1(y),wl(y,y.return);break;case 12:qr(p,y,o);break;case 31:qr(p,y,o),o&&T&4&&J1(p,y);break;case 13:qr(p,y,o),o&&T&4&&eb(p,y);break;case 22:y.memoizedState===null&&qr(p,y,o),wl(y,y.return);break;case 30:break;default:qr(p,y,o)}r=r.sibling}}function mp(n,r){var o=null;n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),n=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(n=r.memoizedState.cachePool.pool),n!==o&&(n!=null&&n.refCount++,o!=null&&ol(o))}function gp(n,r){n=null,r.alternate!==null&&(n=r.alternate.memoizedState.cache),r=r.memoizedState.cache,r!==n&&(r.refCount++,n!=null&&ol(n))}function er(n,r,o,u){if(r.subtreeFlags&10256)for(r=r.child;r!==null;)ib(n,r,o,u),r=r.sibling}function ib(n,r,o,u){var p=r.flags;switch(r.tag){case 0:case 11:case 15:er(n,r,o,u),p&2048&&vl(9,r);break;case 1:er(n,r,o,u);break;case 3:er(n,r,o,u),p&2048&&(n=null,r.alternate!==null&&(n=r.alternate.memoizedState.cache),r=r.memoizedState.cache,r!==n&&(r.refCount++,n!=null&&ol(n)));break;case 12:if(p&2048){er(n,r,o,u),n=r.stateNode;try{var y=r.memoizedProps,T=y.id,D=y.onPostCommit;typeof D=="function"&&D(T,r.alternate===null?"mount":"update",n.passiveEffectDuration,-0)}catch(V){ft(r,r.return,V)}}else er(n,r,o,u);break;case 31:er(n,r,o,u);break;case 13:er(n,r,o,u);break;case 23:break;case 22:y=r.stateNode,T=r.alternate,r.memoizedState!==null?y._visibility&2?er(n,r,o,u):Sl(n,r):y._visibility&2?er(n,r,o,u):(y._visibility|=2,eo(n,r,o,u,(r.subtreeFlags&10256)!==0||!1)),p&2048&&mp(T,r);break;case 24:er(n,r,o,u),p&2048&&gp(r.alternate,r);break;default:er(n,r,o,u)}}function eo(n,r,o,u,p){for(p=p&&((r.subtreeFlags&10256)!==0||!1),r=r.child;r!==null;){var y=n,T=r,D=o,V=u,Q=T.flags;switch(T.tag){case 0:case 11:case 15:eo(y,T,D,V,p),vl(8,T);break;case 23:break;case 22:var le=T.stateNode;T.memoizedState!==null?le._visibility&2?eo(y,T,D,V,p):Sl(y,T):(le._visibility|=2,eo(y,T,D,V,p)),p&&Q&2048&&mp(T.alternate,T);break;case 24:eo(y,T,D,V,p),p&&Q&2048&&gp(T.alternate,T);break;default:eo(y,T,D,V,p)}r=r.sibling}}function Sl(n,r){if(r.subtreeFlags&10256)for(r=r.child;r!==null;){var o=n,u=r,p=u.flags;switch(u.tag){case 22:Sl(o,u),p&2048&&mp(u.alternate,u);break;case 24:Sl(o,u),p&2048&&gp(u.alternate,u);break;default:Sl(o,u)}r=r.sibling}}var _l=8192;function to(n,r,o){if(n.subtreeFlags&_l)for(n=n.child;n!==null;)rb(n,r,o),n=n.sibling}function rb(n,r,o){switch(n.tag){case 26:to(n,r,o),n.flags&_l&&n.memoizedState!==null&&U4(o,Ji,n.memoizedState,n.memoizedProps);break;case 5:to(n,r,o);break;case 3:case 4:var u=Ji;Ji=$u(n.stateNode.containerInfo),to(n,r,o),Ji=u;break;case 22:n.memoizedState===null&&(u=n.alternate,u!==null&&u.memoizedState!==null?(u=_l,_l=16777216,to(n,r,o),_l=u):to(n,r,o));break;default:to(n,r,o)}}function ab(n){var r=n.alternate;if(r!==null&&(n=r.child,n!==null)){r.child=null;do r=n.sibling,n.sibling=null,n=r;while(n!==null)}}function Tl(n){var r=n.deletions;if((n.flags&16)!==0){if(r!==null)for(var o=0;o<r.length;o++){var u=r[o];mn=u,ob(u,n)}ab(n)}if(n.subtreeFlags&10256)for(n=n.child;n!==null;)sb(n),n=n.sibling}function sb(n){switch(n.tag){case 0:case 11:case 15:Tl(n),n.flags&2048&&ha(9,n,n.return);break;case 3:Tl(n);break;case 12:Tl(n);break;case 22:var r=n.stateNode;n.memoizedState!==null&&r._visibility&2&&(n.return===null||n.return.tag!==13)?(r._visibility&=-3,Ou(n)):Tl(n);break;default:Tl(n)}}function Ou(n){var r=n.deletions;if((n.flags&16)!==0){if(r!==null)for(var o=0;o<r.length;o++){var u=r[o];mn=u,ob(u,n)}ab(n)}for(n=n.child;n!==null;){switch(r=n,r.tag){case 0:case 11:case 15:ha(8,r,r.return),Ou(r);break;case 22:o=r.stateNode,o._visibility&2&&(o._visibility&=-3,Ou(r));break;default:Ou(r)}n=n.sibling}}function ob(n,r){for(;mn!==null;){var o=mn;switch(o.tag){case 0:case 11:case 15:ha(8,o,r);break;case 23:case 22:if(o.memoizedState!==null&&o.memoizedState.cachePool!==null){var u=o.memoizedState.cachePool.pool;u!=null&&u.refCount++}break;case 24:ol(o.memoizedState.cache)}if(u=o.child,u!==null)u.return=o,mn=u;else e:for(o=n;mn!==null;){u=mn;var p=u.sibling,y=u.return;if(Q1(u),u===o){mn=null;break e}if(p!==null){p.return=y,mn=p;break e}mn=y}}}var JC={getCacheForType:function(n){var r=bn(Zt),o=r.data.get(n);return o===void 0&&(o=n(),r.data.set(n,o)),o},cacheSignal:function(){return bn(Zt).controller.signal}},e4=typeof WeakMap=="function"?WeakMap:Map,rt=0,vt=null,qe=null,Xe=0,dt=0,hi=null,pa=!1,no=!1,yp=!1,Yr=0,Ft=0,ma=0,as=0,xp=0,pi=0,io=0,El=null,Xn=null,bp=!1,Mu=0,lb=0,Lu=1/0,ju=null,ga=null,un=0,ya=null,ro=null,Gr=0,vp=0,wp=null,cb=null,Cl=0,Sp=null;function mi(){return(rt&2)!==0&&Xe!==0?Xe&-Xe:z.T!==null?Ap():Ve()}function ub(){if(pi===0)if((Xe&536870912)===0||Qe){var n=li;li<<=1,(li&3932160)===0&&(li=262144),pi=n}else pi=536870912;return n=di.current,n!==null&&(n.flags|=32),pi}function Kn(n,r,o){(n===vt&&(dt===2||dt===9)||n.cancelPendingCommit!==null)&&(ao(n,0),xa(n,Xe,pi,!1)),pe(n,o),((rt&2)===0||n!==vt)&&(n===vt&&((rt&2)===0&&(as|=o),Ft===4&&xa(n,Xe,pi,!1)),fr(n))}function db(n,r,o){if((rt&6)!==0)throw Error(a(327));var u=!o&&(r&127)===0&&(r&n.expiredLanes)===0||it(n,r),p=u?i4(n,r):Tp(n,r,!0),y=u;do{if(p===0){no&&!u&&xa(n,r,0,!1);break}else{if(o=n.current.alternate,y&&!t4(o)){p=Tp(n,r,!1),y=!1;continue}if(p===2){if(y=r,n.errorRecoveryDisabledLanes&y)var T=0;else T=n.pendingLanes&-536870913,T=T!==0?T:T&536870912?536870912:0;if(T!==0){r=T;e:{var D=n;p=El;var V=D.current.memoizedState.isDehydrated;if(V&&(ao(D,T).flags|=256),T=Tp(D,T,!1),T!==2){if(yp&&!V){D.errorRecoveryDisabledLanes|=y,as|=y,p=4;break e}y=Xn,Xn=p,y!==null&&(Xn===null?Xn=y:Xn.push.apply(Xn,y))}p=T}if(y=!1,p!==2)continue}}if(p===1){ao(n,0),xa(n,r,0,!0);break}e:{switch(u=n,y=p,y){case 0:case 1:throw Error(a(345));case 4:if((r&4194048)!==r)break;case 6:xa(u,r,pi,!pa);break e;case 2:Xn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((r&62914560)===r&&(p=Mu+300-Ze(),10<p)){if(xa(u,r,pi,!pa),Oe(u,0,!0)!==0)break e;Gr=r,u.timeoutHandle=Fb(fb.bind(null,u,o,Xn,ju,bp,r,pi,as,io,pa,y,"Throttled",-0,0),p);break e}fb(u,o,Xn,ju,bp,r,pi,as,io,pa,y,null,-0,0)}}break}while(!0);fr(n)}function fb(n,r,o,u,p,y,T,D,V,Q,le,ge,J,ie){if(n.timeoutHandle=-1,ge=r.subtreeFlags,ge&8192||(ge&16785408)===16785408){ge={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Mr},rb(r,y,ge);var ke=(y&62914560)===y?Mu-Ze():(y&4194048)===y?lb-Ze():0;if(ke=I4(ge,ke),ke!==null){Gr=y,n.cancelPendingCommit=ke(vb.bind(null,n,r,y,o,u,p,T,D,V,le,ge,null,J,ie)),xa(n,y,T,!Q);return}}vb(n,r,y,o,u,p,T,D,V)}function t4(n){for(var r=n;;){var o=r.tag;if((o===0||o===11||o===15)&&r.flags&16384&&(o=r.updateQueue,o!==null&&(o=o.stores,o!==null)))for(var u=0;u<o.length;u++){var p=o[u],y=p.getSnapshot;p=p.value;try{if(!ci(y(),p))return!1}catch{return!1}}if(o=r.child,r.subtreeFlags&16384&&o!==null)o.return=r,r=o;else{if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function xa(n,r,o,u){r&=~xp,r&=~as,n.suspendedLanes|=r,n.pingedLanes&=~r,u&&(n.warmLanes|=r),u=n.expirationTimes;for(var p=r;0<p;){var y=31-zt(p),T=1<<y;u[y]=-1,p&=~T}o!==0&&Be(n,o,r)}function Nu(){return(rt&6)===0?(kl(0),!1):!0}function _p(){if(qe!==null){if(dt===0)var n=qe.return;else n=qe,zr=Za=null,Ih(n),Ks=null,cl=0,n=qe;for(;n!==null;)H1(n.alternate,n),n=n.return;qe=null}}function ao(n,r){var o=n.timeoutHandle;o!==-1&&(n.timeoutHandle=-1,w4(o)),o=n.cancelPendingCommit,o!==null&&(n.cancelPendingCommit=null,o()),Gr=0,_p(),vt=n,qe=o=jr(n.current,null),Xe=r,dt=0,hi=null,pa=!1,no=it(n,r),yp=!1,io=pi=xp=as=ma=Ft=0,Xn=El=null,bp=!1,(r&8)!==0&&(r|=r&32);var u=n.entangledLanes;if(u!==0)for(n=n.entanglements,u&=r;0<u;){var p=31-zt(u),y=1<<p;r|=n[p],u&=~y}return Yr=r,nu(),o}function hb(n,r){Fe=null,z.H=yl,r===Xs||r===uu?(r=Rx(),dt=3):r===kh?(r=Rx(),dt=4):dt=r===tp?8:r!==null&&typeof r=="object"&&typeof r.then=="function"?6:1,hi=r,qe===null&&(Ft=1,Tu(n,Li(r,n.current)))}function pb(){var n=di.current;return n===null?!0:(Xe&4194048)===Xe?Pi===null:(Xe&62914560)===Xe||(Xe&536870912)!==0?n===Pi:!1}function mb(){var n=z.H;return z.H=yl,n===null?yl:n}function gb(){var n=z.A;return z.A=JC,n}function zu(){Ft=4,pa||(Xe&4194048)!==Xe&&di.current!==null||(no=!0),(ma&134217727)===0&&(as&134217727)===0||vt===null||xa(vt,Xe,pi,!1)}function Tp(n,r,o){var u=rt;rt|=2;var p=mb(),y=gb();(vt!==n||Xe!==r)&&(ju=null,ao(n,r)),r=!1;var T=Ft;e:do try{if(dt!==0&&qe!==null){var D=qe,V=hi;switch(dt){case 8:_p(),T=6;break e;case 3:case 2:case 9:case 6:di.current===null&&(r=!0);var Q=dt;if(dt=0,hi=null,so(n,D,V,Q),o&&no){T=0;break e}break;default:Q=dt,dt=0,hi=null,so(n,D,V,Q)}}n4(),T=Ft;break}catch(le){hb(n,le)}while(!0);return r&&n.shellSuspendCounter++,zr=Za=null,rt=u,z.H=p,z.A=y,qe===null&&(vt=null,Xe=0,nu()),T}function n4(){for(;qe!==null;)yb(qe)}function i4(n,r){var o=rt;rt|=2;var u=mb(),p=gb();vt!==n||Xe!==r?(ju=null,Lu=Ze()+500,ao(n,r)):no=it(n,r);e:do try{if(dt!==0&&qe!==null){r=qe;var y=hi;t:switch(dt){case 1:dt=0,hi=null,so(n,r,y,1);break;case 2:case 9:if(kx(y)){dt=0,hi=null,xb(r);break}r=function(){dt!==2&&dt!==9||vt!==n||(dt=7),fr(n)},y.then(r,r);break e;case 3:dt=7;break e;case 4:dt=5;break e;case 7:kx(y)?(dt=0,hi=null,xb(r)):(dt=0,hi=null,so(n,r,y,7));break;case 5:var T=null;switch(qe.tag){case 26:T=qe.memoizedState;case 5:case 27:var D=qe;if(T?iv(T):D.stateNode.complete){dt=0,hi=null;var V=D.sibling;if(V!==null)qe=V;else{var Q=D.return;Q!==null?(qe=Q,Pu(Q)):qe=null}break t}}dt=0,hi=null,so(n,r,y,5);break;case 6:dt=0,hi=null,so(n,r,y,6);break;case 8:_p(),Ft=6;break e;default:throw Error(a(462))}}r4();break}catch(le){hb(n,le)}while(!0);return zr=Za=null,z.H=u,z.A=p,rt=o,qe!==null?0:(vt=null,Xe=0,nu(),Ft)}function r4(){for(;qe!==null&&!Ie();)yb(qe)}function yb(n){var r=V1(n.alternate,n,Yr);n.memoizedProps=n.pendingProps,r===null?Pu(n):qe=r}function xb(n){var r=n,o=r.alternate;switch(r.tag){case 15:case 0:r=N1(o,r,r.pendingProps,r.type,void 0,Xe);break;case 11:r=N1(o,r,r.pendingProps,r.type.render,r.ref,Xe);break;case 5:Ih(r);default:H1(o,r),r=qe=gx(r,Yr),r=V1(o,r,Yr)}n.memoizedProps=n.pendingProps,r===null?Pu(n):qe=r}function so(n,r,o,u){zr=Za=null,Ih(r),Ks=null,cl=0;var p=r.return;try{if(YC(n,p,r,o,Xe)){Ft=1,Tu(n,Li(o,n.current)),qe=null;return}}catch(y){if(p!==null)throw qe=p,y;Ft=1,Tu(n,Li(o,n.current)),qe=null;return}r.flags&32768?(Qe||u===1?n=!0:no||(Xe&536870912)!==0?n=!1:(pa=n=!0,(u===2||u===9||u===3||u===6)&&(u=di.current,u!==null&&u.tag===13&&(u.flags|=16384))),bb(r,n)):Pu(r)}function Pu(n){var r=n;do{if((r.flags&32768)!==0){bb(r,pa);return}n=r.return;var o=KC(r.alternate,r,Yr);if(o!==null){qe=o;return}if(r=r.sibling,r!==null){qe=r;return}qe=r=n}while(r!==null);Ft===0&&(Ft=5)}function bb(n,r){do{var o=ZC(n.alternate,n);if(o!==null){o.flags&=32767,qe=o;return}if(o=n.return,o!==null&&(o.flags|=32768,o.subtreeFlags=0,o.deletions=null),!r&&(n=n.sibling,n!==null)){qe=n;return}qe=n=o}while(n!==null);Ft=6,qe=null}function vb(n,r,o,u,p,y,T,D,V){n.cancelPendingCommit=null;do Uu();while(un!==0);if((rt&6)!==0)throw Error(a(327));if(r!==null){if(r===n.current)throw Error(a(177));if(y=r.lanes|r.childLanes,y|=fh,xe(n,o,y,T,D,V),n===vt&&(qe=vt=null,Xe=0),ro=r,ya=n,Gr=o,vp=y,wp=p,cb=u,(r.subtreeFlags&10256)!==0||(r.flags&10256)!==0?(n.callbackNode=null,n.callbackPriority=0,l4(sn,function(){return Eb(),null})):(n.callbackNode=null,n.callbackPriority=0),u=(r.flags&13878)!==0,(r.subtreeFlags&13878)!==0||u){u=z.T,z.T=null,p=B.p,B.p=2,T=rt,rt|=4;try{QC(n,r,o)}finally{rt=T,B.p=p,z.T=u}}un=1,wb(),Sb(),_b()}}function wb(){if(un===1){un=0;var n=ya,r=ro,o=(r.flags&13878)!==0;if((r.subtreeFlags&13878)!==0||o){o=z.T,z.T=null;var u=B.p;B.p=2;var p=rt;rt|=4;try{tb(r,n);var y=zp,T=ox(n.containerInfo),D=y.focusedElem,V=y.selectionRange;if(T!==D&&D&&D.ownerDocument&&sx(D.ownerDocument.documentElement,D)){if(V!==null&&oh(D)){var Q=V.start,le=V.end;if(le===void 0&&(le=Q),"selectionStart"in D)D.selectionStart=Q,D.selectionEnd=Math.min(le,D.value.length);else{var ge=D.ownerDocument||document,J=ge&&ge.defaultView||window;if(J.getSelection){var ie=J.getSelection(),ke=D.textContent.length,Me=Math.min(V.start,ke),bt=V.end===void 0?Me:Math.min(V.end,ke);!ie.extend&&Me>bt&&(T=bt,bt=Me,Me=T);var X=ax(D,Me),H=ax(D,bt);if(X&&H&&(ie.rangeCount!==1||ie.anchorNode!==X.node||ie.anchorOffset!==X.offset||ie.focusNode!==H.node||ie.focusOffset!==H.offset)){var Z=ge.createRange();Z.setStart(X.node,X.offset),ie.removeAllRanges(),Me>bt?(ie.addRange(Z),ie.extend(H.node,H.offset)):(Z.setEnd(H.node,H.offset),ie.addRange(Z))}}}}for(ge=[],ie=D;ie=ie.parentNode;)ie.nodeType===1&&ge.push({element:ie,left:ie.scrollLeft,top:ie.scrollTop});for(typeof D.focus=="function"&&D.focus(),D=0;D<ge.length;D++){var fe=ge[D];fe.element.scrollLeft=fe.left,fe.element.scrollTop=fe.top}}Zu=!!Np,zp=Np=null}finally{rt=p,B.p=u,z.T=o}}n.current=r,un=2}}function Sb(){if(un===2){un=0;var n=ya,r=ro,o=(r.flags&8772)!==0;if((r.subtreeFlags&8772)!==0||o){o=z.T,z.T=null;var u=B.p;B.p=2;var p=rt;rt|=4;try{Z1(n,r.alternate,r)}finally{rt=p,B.p=u,z.T=o}}un=3}}function _b(){if(un===4||un===3){un=0,Et();var n=ya,r=ro,o=Gr,u=cb;(r.subtreeFlags&10256)!==0||(r.flags&10256)!==0?un=5:(un=0,ro=ya=null,Tb(n,n.pendingLanes));var p=n.pendingLanes;if(p===0&&(ga=null),Ee(o),r=r.stateNode,Ct&&typeof Ct.onCommitFiberRoot=="function")try{Ct.onCommitFiberRoot(ai,r,void 0,(r.current.flags&128)===128)}catch{}if(u!==null){r=z.T,p=B.p,B.p=2,z.T=null;try{for(var y=n.onRecoverableError,T=0;T<u.length;T++){var D=u[T];y(D.value,{componentStack:D.stack})}}finally{z.T=r,B.p=p}}(Gr&3)!==0&&Uu(),fr(n),p=n.pendingLanes,(o&261930)!==0&&(p&42)!==0?n===Sp?Cl++:(Cl=0,Sp=n):Cl=0,kl(0)}}function Tb(n,r){(n.pooledCacheLanes&=r)===0&&(r=n.pooledCache,r!=null&&(n.pooledCache=null,ol(r)))}function Uu(){return wb(),Sb(),_b(),Eb()}function Eb(){if(un!==5)return!1;var n=ya,r=vp;vp=0;var o=Ee(Gr),u=z.T,p=B.p;try{B.p=32>o?32:o,z.T=null,o=wp,wp=null;var y=ya,T=Gr;if(un=0,ro=ya=null,Gr=0,(rt&6)!==0)throw Error(a(331));var D=rt;if(rt|=4,sb(y.current),ib(y,y.current,T,o),rt=D,kl(0,!1),Ct&&typeof Ct.onPostCommitFiberRoot=="function")try{Ct.onPostCommitFiberRoot(ai,y)}catch{}return!0}finally{B.p=p,z.T=u,Tb(n,r)}}function Cb(n,r,o){r=Li(o,r),r=ep(n.stateNode,r,2),n=ua(n,r,2),n!==null&&(pe(n,2),fr(n))}function ft(n,r,o){if(n.tag===3)Cb(n,n,o);else for(;r!==null;){if(r.tag===3){Cb(r,n,o);break}else if(r.tag===1){var u=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(ga===null||!ga.has(u))){n=Li(o,n),o=k1(2),u=ua(r,o,2),u!==null&&(A1(o,u,r,n),pe(u,2),fr(u));break}}r=r.return}}function Ep(n,r,o){var u=n.pingCache;if(u===null){u=n.pingCache=new e4;var p=new Set;u.set(r,p)}else p=u.get(r),p===void 0&&(p=new Set,u.set(r,p));p.has(o)||(yp=!0,p.add(o),n=a4.bind(null,n,r,o),r.then(n,n))}function a4(n,r,o){var u=n.pingCache;u!==null&&u.delete(r),n.pingedLanes|=n.suspendedLanes&o,n.warmLanes&=~o,vt===n&&(Xe&o)===o&&(Ft===4||Ft===3&&(Xe&62914560)===Xe&&300>Ze()-Mu?(rt&2)===0&&ao(n,0):xp|=o,io===Xe&&(io=0)),fr(n)}function kb(n,r){r===0&&(r=de()),n=Ga(n,r),n!==null&&(pe(n,r),fr(n))}function s4(n){var r=n.memoizedState,o=0;r!==null&&(o=r.retryLane),kb(n,o)}function o4(n,r){var o=0;switch(n.tag){case 31:case 13:var u=n.stateNode,p=n.memoizedState;p!==null&&(o=p.retryLane);break;case 19:u=n.stateNode;break;case 22:u=n.stateNode._retryCache;break;default:throw Error(a(314))}u!==null&&u.delete(r),kb(n,o)}function l4(n,r){return ht(n,r)}var Iu=null,oo=null,Cp=!1,Bu=!1,kp=!1,ba=0;function fr(n){n!==oo&&n.next===null&&(oo===null?Iu=oo=n:oo=oo.next=n),Bu=!0,Cp||(Cp=!0,u4())}function kl(n,r){if(!kp&&Bu){kp=!0;do for(var o=!1,u=Iu;u!==null;){if(n!==0){var p=u.pendingLanes;if(p===0)var y=0;else{var T=u.suspendedLanes,D=u.pingedLanes;y=(1<<31-zt(42|n)+1)-1,y&=p&~(T&~D),y=y&201326741?y&201326741|1:y?y|2:0}y!==0&&(o=!0,Ob(u,y))}else y=Xe,y=Oe(u,u===vt?y:0,u.cancelPendingCommit!==null||u.timeoutHandle!==-1),(y&3)===0||it(u,y)||(o=!0,Ob(u,y));u=u.next}while(o);kp=!1}}function c4(){Ab()}function Ab(){Bu=Cp=!1;var n=0;ba!==0&&v4()&&(n=ba);for(var r=Ze(),o=null,u=Iu;u!==null;){var p=u.next,y=Rb(u,r);y===0?(u.next=null,o===null?Iu=p:o.next=p,p===null&&(oo=o)):(o=u,(n!==0||(y&3)!==0)&&(Bu=!0)),u=p}un!==0&&un!==5||kl(n),ba!==0&&(ba=0)}function Rb(n,r){for(var o=n.suspendedLanes,u=n.pingedLanes,p=n.expirationTimes,y=n.pendingLanes&-62914561;0<y;){var T=31-zt(y),D=1<<T,V=p[T];V===-1?((D&o)===0||(D&u)!==0)&&(p[T]=kt(D,r)):V<=r&&(n.expiredLanes|=D),y&=~D}if(r=vt,o=Xe,o=Oe(n,n===r?o:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u=n.callbackNode,o===0||n===r&&(dt===2||dt===9)||n.cancelPendingCommit!==null)return u!==null&&u!==null&&pt(u),n.callbackNode=null,n.callbackPriority=0;if((o&3)===0||it(n,o)){if(r=o&-o,r===n.callbackPriority)return r;switch(u!==null&&pt(u),Ee(o)){case 2:case 8:o=mt;break;case 32:o=sn;break;case 268435456:o=kn;break;default:o=sn}return u=Db.bind(null,n),o=ht(o,u),n.callbackPriority=r,n.callbackNode=o,r}return u!==null&&u!==null&&pt(u),n.callbackPriority=2,n.callbackNode=null,2}function Db(n,r){if(un!==0&&un!==5)return n.callbackNode=null,n.callbackPriority=0,null;var o=n.callbackNode;if(Uu()&&n.callbackNode!==o)return null;var u=Xe;return u=Oe(n,n===vt?u:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),u===0?null:(db(n,u,r),Rb(n,Ze()),n.callbackNode!=null&&n.callbackNode===o?Db.bind(null,n):null)}function Ob(n,r){if(Uu())return null;db(n,r,!0)}function u4(){S4(function(){(rt&6)!==0?ht(an,c4):Ab()})}function Ap(){if(ba===0){var n=Ys;n===0&&(n=oi,oi<<=1,(oi&261888)===0&&(oi=256)),ba=n}return ba}function Mb(n){return n==null||typeof n=="symbol"||typeof n=="boolean"?null:typeof n=="function"?n:Xc(""+n)}function Lb(n,r){var o=r.ownerDocument.createElement("input");return o.name=r.name,o.value=r.value,n.id&&o.setAttribute("form",n.id),r.parentNode.insertBefore(o,r),n=new FormData(n),o.parentNode.removeChild(o),n}function d4(n,r,o,u,p){if(r==="submit"&&o&&o.stateNode===p){var y=Mb((p[Ge]||null).action),T=u.submitter;T&&(r=(r=T[Ge]||null)?Mb(r.formAction):T.getAttribute("formAction"),r!==null&&(y=r,T=null));var D=new Wc("action","action",null,u,p);n.push({event:D,listeners:[{instance:null,listener:function(){if(u.defaultPrevented){if(ba!==0){var V=T?Lb(p,T):new FormData(p);Xh(o,{pending:!0,data:V,method:p.method,action:y},null,V)}}else typeof y=="function"&&(D.preventDefault(),V=T?Lb(p,T):new FormData(p),Xh(o,{pending:!0,data:V,method:p.method,action:y},y,V))},currentTarget:p}]})}}for(var Rp=0;Rp<dh.length;Rp++){var Dp=dh[Rp],f4=Dp.toLowerCase(),h4=Dp[0].toUpperCase()+Dp.slice(1);Wi(f4,"on"+h4)}Wi(ux,"onAnimationEnd"),Wi(dx,"onAnimationIteration"),Wi(fx,"onAnimationStart"),Wi("dblclick","onDoubleClick"),Wi("focusin","onFocus"),Wi("focusout","onBlur"),Wi(RC,"onTransitionRun"),Wi(DC,"onTransitionStart"),Wi(OC,"onTransitionCancel"),Wi(hx,"onTransitionEnd"),Ms("onMouseEnter",["mouseout","mouseover"]),Ms("onMouseLeave",["mouseout","mouseover"]),Ms("onPointerEnter",["pointerout","pointerover"]),Ms("onPointerLeave",["pointerout","pointerover"]),Ha("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ha("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ha("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ha("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ha("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ha("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Al="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),p4=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Al));function jb(n,r){r=(r&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],p=u.event;u=u.listeners;e:{var y=void 0;if(r)for(var T=u.length-1;0<=T;T--){var D=u[T],V=D.instance,Q=D.currentTarget;if(D=D.listener,V!==y&&p.isPropagationStopped())break e;y=D,p.currentTarget=Q;try{y(p)}catch(le){tu(le)}p.currentTarget=null,y=V}else for(T=0;T<u.length;T++){if(D=u[T],V=D.instance,Q=D.currentTarget,D=D.listener,V!==y&&p.isPropagationStopped())break e;y=D,p.currentTarget=Q;try{y(p)}catch(le){tu(le)}p.currentTarget=null,y=V}}}}function Ye(n,r){var o=r[cn];o===void 0&&(o=r[cn]=new Set);var u=n+"__bubble";o.has(u)||(Nb(r,n,2,!1),o.add(u))}function Op(n,r,o){var u=0;r&&(u|=4),Nb(o,n,u,r)}var Vu="_reactListening"+Math.random().toString(36).slice(2);function Mp(n){if(!n[Vu]){n[Vu]=!0,Ay.forEach(function(o){o!=="selectionchange"&&(p4.has(o)||Op(o,!1,n),Op(o,!0,n))});var r=n.nodeType===9?n:n.ownerDocument;r===null||r[Vu]||(r[Vu]=!0,Op("selectionchange",!1,r))}}function Nb(n,r,o,u){switch(uv(r)){case 2:var p=F4;break;case 8:p=H4;break;default:p=Gp}o=p.bind(null,r,o,n),p=void 0,!Wf||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(p=!0),u?p!==void 0?n.addEventListener(r,o,{capture:!0,passive:p}):n.addEventListener(r,o,!0):p!==void 0?n.addEventListener(r,o,{passive:p}):n.addEventListener(r,o,!1)}function Lp(n,r,o,u,p){var y=u;if((r&1)===0&&(r&2)===0&&u!==null)e:for(;;){if(u===null)return;var T=u.tag;if(T===3||T===4){var D=u.stateNode.containerInfo;if(D===p)break;if(T===4)for(T=u.return;T!==null;){var V=T.tag;if((V===3||V===4)&&T.stateNode.containerInfo===p)return;T=T.return}for(;D!==null;){if(T=Rs(D),T===null)return;if(V=T.tag,V===5||V===6||V===26||V===27){u=y=T;continue e}D=D.parentNode}}u=u.return}By(function(){var Q=y,le=Zf(o),ge=[];e:{var J=px.get(n);if(J!==void 0){var ie=Wc,ke=n;switch(n){case"keypress":if(Zc(o)===0)break e;case"keydown":case"keyup":ie=oC;break;case"focusin":ke="focus",ie=nh;break;case"focusout":ke="blur",ie=nh;break;case"beforeblur":case"afterblur":ie=nh;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ie=Hy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ie=KE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ie=uC;break;case ux:case dx:case fx:ie=WE;break;case hx:ie=fC;break;case"scroll":case"scrollend":ie=GE;break;case"wheel":ie=pC;break;case"copy":case"cut":case"paste":ie=eC;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ie=qy;break;case"toggle":case"beforetoggle":ie=gC}var Me=(r&4)!==0,bt=!Me&&(n==="scroll"||n==="scrollend"),X=Me?J!==null?J+"Capture":null:J;Me=[];for(var H=Q,Z;H!==null;){var fe=H;if(Z=fe.stateNode,fe=fe.tag,fe!==5&&fe!==26&&fe!==27||Z===null||X===null||(fe=Zo(H,X),fe!=null&&Me.push(Rl(H,fe,Z))),bt)break;H=H.return}0<Me.length&&(J=new ie(J,ke,null,o,le),ge.push({event:J,listeners:Me}))}}if((r&7)===0){e:{if(J=n==="mouseover"||n==="pointerover",ie=n==="mouseout"||n==="pointerout",J&&o!==Kf&&(ke=o.relatedTarget||o.fromElement)&&(Rs(ke)||ke[An]))break e;if((ie||J)&&(J=le.window===le?le:(J=le.ownerDocument)?J.defaultView||J.parentWindow:window,ie?(ke=o.relatedTarget||o.toElement,ie=Q,ke=ke?Rs(ke):null,ke!==null&&(bt=l(ke),Me=ke.tag,ke!==bt||Me!==5&&Me!==27&&Me!==6)&&(ke=null)):(ie=null,ke=Q),ie!==ke)){if(Me=Hy,fe="onMouseLeave",X="onMouseEnter",H="mouse",(n==="pointerout"||n==="pointerover")&&(Me=qy,fe="onPointerLeave",X="onPointerEnter",H="pointer"),bt=ie==null?J:Ko(ie),Z=ke==null?J:Ko(ke),J=new Me(fe,H+"leave",ie,o,le),J.target=bt,J.relatedTarget=Z,fe=null,Rs(le)===Q&&(Me=new Me(X,H+"enter",ke,o,le),Me.target=Z,Me.relatedTarget=bt,fe=Me),bt=fe,ie&&ke)t:{for(Me=m4,X=ie,H=ke,Z=0,fe=X;fe;fe=Me(fe))Z++;fe=0;for(var De=H;De;De=Me(De))fe++;for(;0<Z-fe;)X=Me(X),Z--;for(;0<fe-Z;)H=Me(H),fe--;for(;Z--;){if(X===H||H!==null&&X===H.alternate){Me=X;break t}X=Me(X),H=Me(H)}Me=null}else Me=null;ie!==null&&zb(ge,J,ie,Me,!1),ke!==null&&bt!==null&&zb(ge,bt,ke,Me,!0)}}e:{if(J=Q?Ko(Q):window,ie=J.nodeName&&J.nodeName.toLowerCase(),ie==="select"||ie==="input"&&J.type==="file")var et=Jy;else if(Qy(J))if(ex)et=CC;else{et=TC;var Re=_C}else ie=J.nodeName,!ie||ie.toLowerCase()!=="input"||J.type!=="checkbox"&&J.type!=="radio"?Q&&Xf(Q.elementType)&&(et=Jy):et=EC;if(et&&(et=et(n,Q))){Wy(ge,et,o,le);break e}Re&&Re(n,J,Q),n==="focusout"&&Q&&J.type==="number"&&Q.memoizedProps.value!=null&&Gf(J,"number",J.value)}switch(Re=Q?Ko(Q):window,n){case"focusin":(Qy(Re)||Re.contentEditable==="true")&&(Us=Re,lh=Q,rl=null);break;case"focusout":rl=lh=Us=null;break;case"mousedown":ch=!0;break;case"contextmenu":case"mouseup":case"dragend":ch=!1,lx(ge,o,le);break;case"selectionchange":if(AC)break;case"keydown":case"keyup":lx(ge,o,le)}var He;if(rh)e:{switch(n){case"compositionstart":var Ke="onCompositionStart";break e;case"compositionend":Ke="onCompositionEnd";break e;case"compositionupdate":Ke="onCompositionUpdate";break e}Ke=void 0}else Ps?Ky(n,o)&&(Ke="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(Ke="onCompositionStart");Ke&&(Yy&&o.locale!=="ko"&&(Ps||Ke!=="onCompositionStart"?Ke==="onCompositionEnd"&&Ps&&(He=Vy()):(ia=le,Jf="value"in ia?ia.value:ia.textContent,Ps=!0)),Re=Fu(Q,Ke),0<Re.length&&(Ke=new $y(Ke,n,null,o,le),ge.push({event:Ke,listeners:Re}),He?Ke.data=He:(He=Zy(o),He!==null&&(Ke.data=He)))),(He=xC?bC(n,o):vC(n,o))&&(Ke=Fu(Q,"onBeforeInput"),0<Ke.length&&(Re=new $y("onBeforeInput","beforeinput",null,o,le),ge.push({event:Re,listeners:Ke}),Re.data=He)),d4(ge,n,Q,o,le)}jb(ge,r)})}function Rl(n,r,o){return{instance:n,listener:r,currentTarget:o}}function Fu(n,r){for(var o=r+"Capture",u=[];n!==null;){var p=n,y=p.stateNode;if(p=p.tag,p!==5&&p!==26&&p!==27||y===null||(p=Zo(n,o),p!=null&&u.unshift(Rl(n,p,y)),p=Zo(n,r),p!=null&&u.push(Rl(n,p,y))),n.tag===3)return u;n=n.return}return[]}function m4(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5&&n.tag!==27);return n||null}function zb(n,r,o,u,p){for(var y=r._reactName,T=[];o!==null&&o!==u;){var D=o,V=D.alternate,Q=D.stateNode;if(D=D.tag,V!==null&&V===u)break;D!==5&&D!==26&&D!==27||Q===null||(V=Q,p?(Q=Zo(o,y),Q!=null&&T.unshift(Rl(o,Q,V))):p||(Q=Zo(o,y),Q!=null&&T.push(Rl(o,Q,V)))),o=o.return}T.length!==0&&n.push({event:r,listeners:T})}var g4=/\r\n?/g,y4=/\u0000|\uFFFD/g;function Pb(n){return(typeof n=="string"?n:""+n).replace(g4,`
`).replace(y4,"")}function Ub(n,r){return r=Pb(r),Pb(n)===r}function xt(n,r,o,u,p,y){switch(o){case"children":typeof u=="string"?r==="body"||r==="textarea"&&u===""||js(n,u):(typeof u=="number"||typeof u=="bigint")&&r!=="body"&&js(n,""+u);break;case"className":Yc(n,"class",u);break;case"tabIndex":Yc(n,"tabindex",u);break;case"dir":case"role":case"viewBox":case"width":case"height":Yc(n,o,u);break;case"style":Uy(n,u,y);break;case"data":if(r!=="object"){Yc(n,"data",u);break}case"src":case"href":if(u===""&&(r!=="a"||o!=="href")){n.removeAttribute(o);break}if(u==null||typeof u=="function"||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(o);break}u=Xc(""+u),n.setAttribute(o,u);break;case"action":case"formAction":if(typeof u=="function"){n.setAttribute(o,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof y=="function"&&(o==="formAction"?(r!=="input"&&xt(n,r,"name",p.name,p,null),xt(n,r,"formEncType",p.formEncType,p,null),xt(n,r,"formMethod",p.formMethod,p,null),xt(n,r,"formTarget",p.formTarget,p,null)):(xt(n,r,"encType",p.encType,p,null),xt(n,r,"method",p.method,p,null),xt(n,r,"target",p.target,p,null)));if(u==null||typeof u=="symbol"||typeof u=="boolean"){n.removeAttribute(o);break}u=Xc(""+u),n.setAttribute(o,u);break;case"onClick":u!=null&&(n.onclick=Mr);break;case"onScroll":u!=null&&Ye("scroll",n);break;case"onScrollEnd":u!=null&&Ye("scrollend",n);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(a(61));if(o=u.__html,o!=null){if(p.children!=null)throw Error(a(60));n.innerHTML=o}}break;case"multiple":n.multiple=u&&typeof u!="function"&&typeof u!="symbol";break;case"muted":n.muted=u&&typeof u!="function"&&typeof u!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(u==null||typeof u=="function"||typeof u=="boolean"||typeof u=="symbol"){n.removeAttribute("xlink:href");break}o=Xc(""+u),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",o);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,""+u):n.removeAttribute(o);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":u&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,""):n.removeAttribute(o);break;case"capture":case"download":u===!0?n.setAttribute(o,""):u!==!1&&u!=null&&typeof u!="function"&&typeof u!="symbol"?n.setAttribute(o,u):n.removeAttribute(o);break;case"cols":case"rows":case"size":case"span":u!=null&&typeof u!="function"&&typeof u!="symbol"&&!isNaN(u)&&1<=u?n.setAttribute(o,u):n.removeAttribute(o);break;case"rowSpan":case"start":u==null||typeof u=="function"||typeof u=="symbol"||isNaN(u)?n.removeAttribute(o):n.setAttribute(o,u);break;case"popover":Ye("beforetoggle",n),Ye("toggle",n),qc(n,"popover",u);break;case"xlinkActuate":Or(n,"http://www.w3.org/1999/xlink","xlink:actuate",u);break;case"xlinkArcrole":Or(n,"http://www.w3.org/1999/xlink","xlink:arcrole",u);break;case"xlinkRole":Or(n,"http://www.w3.org/1999/xlink","xlink:role",u);break;case"xlinkShow":Or(n,"http://www.w3.org/1999/xlink","xlink:show",u);break;case"xlinkTitle":Or(n,"http://www.w3.org/1999/xlink","xlink:title",u);break;case"xlinkType":Or(n,"http://www.w3.org/1999/xlink","xlink:type",u);break;case"xmlBase":Or(n,"http://www.w3.org/XML/1998/namespace","xml:base",u);break;case"xmlLang":Or(n,"http://www.w3.org/XML/1998/namespace","xml:lang",u);break;case"xmlSpace":Or(n,"http://www.w3.org/XML/1998/namespace","xml:space",u);break;case"is":qc(n,"is",u);break;case"innerText":case"textContent":break;default:(!(2<o.length)||o[0]!=="o"&&o[0]!=="O"||o[1]!=="n"&&o[1]!=="N")&&(o=qE.get(o)||o,qc(n,o,u))}}function jp(n,r,o,u,p,y){switch(o){case"style":Uy(n,u,y);break;case"dangerouslySetInnerHTML":if(u!=null){if(typeof u!="object"||!("__html"in u))throw Error(a(61));if(o=u.__html,o!=null){if(p.children!=null)throw Error(a(60));n.innerHTML=o}}break;case"children":typeof u=="string"?js(n,u):(typeof u=="number"||typeof u=="bigint")&&js(n,""+u);break;case"onScroll":u!=null&&Ye("scroll",n);break;case"onScrollEnd":u!=null&&Ye("scrollend",n);break;case"onClick":u!=null&&(n.onclick=Mr);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ry.hasOwnProperty(o))e:{if(o[0]==="o"&&o[1]==="n"&&(p=o.endsWith("Capture"),r=o.slice(2,p?o.length-7:void 0),y=n[Ge]||null,y=y!=null?y[o]:null,typeof y=="function"&&n.removeEventListener(r,y,p),typeof u=="function")){typeof y!="function"&&y!==null&&(o in n?n[o]=null:n.hasAttribute(o)&&n.removeAttribute(o)),n.addEventListener(r,u,p);break e}o in n?n[o]=u:u===!0?n.setAttribute(o,""):qc(n,o,u)}}}function wn(n,r,o){switch(r){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ye("error",n),Ye("load",n);var u=!1,p=!1,y;for(y in o)if(o.hasOwnProperty(y)){var T=o[y];if(T!=null)switch(y){case"src":u=!0;break;case"srcSet":p=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,r));default:xt(n,r,y,T,o,null)}}p&&xt(n,r,"srcSet",o.srcSet,o,null),u&&xt(n,r,"src",o.src,o,null);return;case"input":Ye("invalid",n);var D=y=T=p=null,V=null,Q=null;for(u in o)if(o.hasOwnProperty(u)){var le=o[u];if(le!=null)switch(u){case"name":p=le;break;case"type":T=le;break;case"checked":V=le;break;case"defaultChecked":Q=le;break;case"value":y=le;break;case"defaultValue":D=le;break;case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(a(137,r));break;default:xt(n,r,u,le,o,null)}}jy(n,y,D,V,Q,T,p,!1);return;case"select":Ye("invalid",n),u=T=y=null;for(p in o)if(o.hasOwnProperty(p)&&(D=o[p],D!=null))switch(p){case"value":y=D;break;case"defaultValue":T=D;break;case"multiple":u=D;default:xt(n,r,p,D,o,null)}r=y,o=T,n.multiple=!!u,r!=null?Ls(n,!!u,r,!1):o!=null&&Ls(n,!!u,o,!0);return;case"textarea":Ye("invalid",n),y=p=u=null;for(T in o)if(o.hasOwnProperty(T)&&(D=o[T],D!=null))switch(T){case"value":u=D;break;case"defaultValue":p=D;break;case"children":y=D;break;case"dangerouslySetInnerHTML":if(D!=null)throw Error(a(91));break;default:xt(n,r,T,D,o,null)}zy(n,u,p,y);return;case"option":for(V in o)o.hasOwnProperty(V)&&(u=o[V],u!=null)&&(V==="selected"?n.selected=u&&typeof u!="function"&&typeof u!="symbol":xt(n,r,V,u,o,null));return;case"dialog":Ye("beforetoggle",n),Ye("toggle",n),Ye("cancel",n),Ye("close",n);break;case"iframe":case"object":Ye("load",n);break;case"video":case"audio":for(u=0;u<Al.length;u++)Ye(Al[u],n);break;case"image":Ye("error",n),Ye("load",n);break;case"details":Ye("toggle",n);break;case"embed":case"source":case"link":Ye("error",n),Ye("load",n);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(Q in o)if(o.hasOwnProperty(Q)&&(u=o[Q],u!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,r));default:xt(n,r,Q,u,o,null)}return;default:if(Xf(r)){for(le in o)o.hasOwnProperty(le)&&(u=o[le],u!==void 0&&jp(n,r,le,u,o,void 0));return}}for(D in o)o.hasOwnProperty(D)&&(u=o[D],u!=null&&xt(n,r,D,u,o,null))}function x4(n,r,o,u){switch(r){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var p=null,y=null,T=null,D=null,V=null,Q=null,le=null;for(ie in o){var ge=o[ie];if(o.hasOwnProperty(ie)&&ge!=null)switch(ie){case"checked":break;case"value":break;case"defaultValue":V=ge;default:u.hasOwnProperty(ie)||xt(n,r,ie,null,u,ge)}}for(var J in u){var ie=u[J];if(ge=o[J],u.hasOwnProperty(J)&&(ie!=null||ge!=null))switch(J){case"type":y=ie;break;case"name":p=ie;break;case"checked":Q=ie;break;case"defaultChecked":le=ie;break;case"value":T=ie;break;case"defaultValue":D=ie;break;case"children":case"dangerouslySetInnerHTML":if(ie!=null)throw Error(a(137,r));break;default:ie!==ge&&xt(n,r,J,ie,u,ge)}}Yf(n,T,D,V,Q,le,y,p);return;case"select":ie=T=D=J=null;for(y in o)if(V=o[y],o.hasOwnProperty(y)&&V!=null)switch(y){case"value":break;case"multiple":ie=V;default:u.hasOwnProperty(y)||xt(n,r,y,null,u,V)}for(p in u)if(y=u[p],V=o[p],u.hasOwnProperty(p)&&(y!=null||V!=null))switch(p){case"value":J=y;break;case"defaultValue":D=y;break;case"multiple":T=y;default:y!==V&&xt(n,r,p,y,u,V)}r=D,o=T,u=ie,J!=null?Ls(n,!!o,J,!1):!!u!=!!o&&(r!=null?Ls(n,!!o,r,!0):Ls(n,!!o,o?[]:"",!1));return;case"textarea":ie=J=null;for(D in o)if(p=o[D],o.hasOwnProperty(D)&&p!=null&&!u.hasOwnProperty(D))switch(D){case"value":break;case"children":break;default:xt(n,r,D,null,u,p)}for(T in u)if(p=u[T],y=o[T],u.hasOwnProperty(T)&&(p!=null||y!=null))switch(T){case"value":J=p;break;case"defaultValue":ie=p;break;case"children":break;case"dangerouslySetInnerHTML":if(p!=null)throw Error(a(91));break;default:p!==y&&xt(n,r,T,p,u,y)}Ny(n,J,ie);return;case"option":for(var ke in o)J=o[ke],o.hasOwnProperty(ke)&&J!=null&&!u.hasOwnProperty(ke)&&(ke==="selected"?n.selected=!1:xt(n,r,ke,null,u,J));for(V in u)J=u[V],ie=o[V],u.hasOwnProperty(V)&&J!==ie&&(J!=null||ie!=null)&&(V==="selected"?n.selected=J&&typeof J!="function"&&typeof J!="symbol":xt(n,r,V,J,u,ie));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Me in o)J=o[Me],o.hasOwnProperty(Me)&&J!=null&&!u.hasOwnProperty(Me)&&xt(n,r,Me,null,u,J);for(Q in u)if(J=u[Q],ie=o[Q],u.hasOwnProperty(Q)&&J!==ie&&(J!=null||ie!=null))switch(Q){case"children":case"dangerouslySetInnerHTML":if(J!=null)throw Error(a(137,r));break;default:xt(n,r,Q,J,u,ie)}return;default:if(Xf(r)){for(var bt in o)J=o[bt],o.hasOwnProperty(bt)&&J!==void 0&&!u.hasOwnProperty(bt)&&jp(n,r,bt,void 0,u,J);for(le in u)J=u[le],ie=o[le],!u.hasOwnProperty(le)||J===ie||J===void 0&&ie===void 0||jp(n,r,le,J,u,ie);return}}for(var X in o)J=o[X],o.hasOwnProperty(X)&&J!=null&&!u.hasOwnProperty(X)&&xt(n,r,X,null,u,J);for(ge in u)J=u[ge],ie=o[ge],!u.hasOwnProperty(ge)||J===ie||J==null&&ie==null||xt(n,r,ge,J,u,ie)}function Ib(n){switch(n){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function b4(){if(typeof performance.getEntriesByType=="function"){for(var n=0,r=0,o=performance.getEntriesByType("resource"),u=0;u<o.length;u++){var p=o[u],y=p.transferSize,T=p.initiatorType,D=p.duration;if(y&&D&&Ib(T)){for(T=0,D=p.responseEnd,u+=1;u<o.length;u++){var V=o[u],Q=V.startTime;if(Q>D)break;var le=V.transferSize,ge=V.initiatorType;le&&Ib(ge)&&(V=V.responseEnd,T+=le*(V<D?1:(D-Q)/(V-Q)))}if(--u,r+=8*(y+T)/(p.duration/1e3),n++,10<n)break}}if(0<n)return r/n/1e6}return navigator.connection&&(n=navigator.connection.downlink,typeof n=="number")?n:5}var Np=null,zp=null;function Hu(n){return n.nodeType===9?n:n.ownerDocument}function Bb(n){switch(n){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Vb(n,r){if(n===0)switch(r){case"svg":return 1;case"math":return 2;default:return 0}return n===1&&r==="foreignObject"?0:n}function Pp(n,r){return n==="textarea"||n==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.children=="bigint"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var Up=null;function v4(){var n=window.event;return n&&n.type==="popstate"?n===Up?!1:(Up=n,!0):(Up=null,!1)}var Fb=typeof setTimeout=="function"?setTimeout:void 0,w4=typeof clearTimeout=="function"?clearTimeout:void 0,Hb=typeof Promise=="function"?Promise:void 0,S4=typeof queueMicrotask=="function"?queueMicrotask:typeof Hb<"u"?function(n){return Hb.resolve(null).then(n).catch(_4)}:Fb;function _4(n){setTimeout(function(){throw n})}function va(n){return n==="head"}function $b(n,r){var o=r,u=0;do{var p=o.nextSibling;if(n.removeChild(o),p&&p.nodeType===8)if(o=p.data,o==="/$"||o==="/&"){if(u===0){n.removeChild(p),fo(r);return}u--}else if(o==="$"||o==="$?"||o==="$~"||o==="$!"||o==="&")u++;else if(o==="html")Dl(n.ownerDocument.documentElement);else if(o==="head"){o=n.ownerDocument.head,Dl(o);for(var y=o.firstChild;y;){var T=y.nextSibling,D=y.nodeName;y[Xo]||D==="SCRIPT"||D==="STYLE"||D==="LINK"&&y.rel.toLowerCase()==="stylesheet"||o.removeChild(y),y=T}}else o==="body"&&Dl(n.ownerDocument.body);o=p}while(o);fo(r)}function qb(n,r){var o=n;n=0;do{var u=o.nextSibling;if(o.nodeType===1?r?(o._stashedDisplay=o.style.display,o.style.display="none"):(o.style.display=o._stashedDisplay||"",o.getAttribute("style")===""&&o.removeAttribute("style")):o.nodeType===3&&(r?(o._stashedText=o.nodeValue,o.nodeValue=""):o.nodeValue=o._stashedText||""),u&&u.nodeType===8)if(o=u.data,o==="/$"){if(n===0)break;n--}else o!=="$"&&o!=="$?"&&o!=="$~"&&o!=="$!"||n++;o=u}while(o)}function Ip(n){var r=n.firstChild;for(r&&r.nodeType===10&&(r=r.nextSibling);r;){var o=r;switch(r=r.nextSibling,o.nodeName){case"HTML":case"HEAD":case"BODY":Ip(o),$f(o);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(o.rel.toLowerCase()==="stylesheet")continue}n.removeChild(o)}}function T4(n,r,o,u){for(;n.nodeType===1;){var p=o;if(n.nodeName.toLowerCase()!==r.toLowerCase()){if(!u&&(n.nodeName!=="INPUT"||n.type!=="hidden"))break}else if(u){if(!n[Xo])switch(r){case"meta":if(!n.hasAttribute("itemprop"))break;return n;case"link":if(y=n.getAttribute("rel"),y==="stylesheet"&&n.hasAttribute("data-precedence"))break;if(y!==p.rel||n.getAttribute("href")!==(p.href==null||p.href===""?null:p.href)||n.getAttribute("crossorigin")!==(p.crossOrigin==null?null:p.crossOrigin)||n.getAttribute("title")!==(p.title==null?null:p.title))break;return n;case"style":if(n.hasAttribute("data-precedence"))break;return n;case"script":if(y=n.getAttribute("src"),(y!==(p.src==null?null:p.src)||n.getAttribute("type")!==(p.type==null?null:p.type)||n.getAttribute("crossorigin")!==(p.crossOrigin==null?null:p.crossOrigin))&&y&&n.hasAttribute("async")&&!n.hasAttribute("itemprop"))break;return n;default:return n}}else if(r==="input"&&n.type==="hidden"){var y=p.name==null?null:""+p.name;if(p.type==="hidden"&&n.getAttribute("name")===y)return n}else return n;if(n=Ui(n.nextSibling),n===null)break}return null}function E4(n,r,o){if(r==="")return null;for(;n.nodeType!==3;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!o||(n=Ui(n.nextSibling),n===null))return null;return n}function Yb(n,r){for(;n.nodeType!==8;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!r||(n=Ui(n.nextSibling),n===null))return null;return n}function Bp(n){return n.data==="$?"||n.data==="$~"}function Vp(n){return n.data==="$!"||n.data==="$?"&&n.ownerDocument.readyState!=="loading"}function C4(n,r){var o=n.ownerDocument;if(n.data==="$~")n._reactRetry=r;else if(n.data!=="$?"||o.readyState!=="loading")r();else{var u=function(){r(),o.removeEventListener("DOMContentLoaded",u)};o.addEventListener("DOMContentLoaded",u),n._reactRetry=u}}function Ui(n){for(;n!=null;n=n.nextSibling){var r=n.nodeType;if(r===1||r===3)break;if(r===8){if(r=n.data,r==="$"||r==="$!"||r==="$?"||r==="$~"||r==="&"||r==="F!"||r==="F")break;if(r==="/$"||r==="/&")return null}}return n}var Fp=null;function Gb(n){n=n.nextSibling;for(var r=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"||o==="/&"){if(r===0)return Ui(n.nextSibling);r--}else o!=="$"&&o!=="$!"&&o!=="$?"&&o!=="$~"&&o!=="&"||r++}n=n.nextSibling}return null}function Xb(n){n=n.previousSibling;for(var r=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"||o==="$~"||o==="&"){if(r===0)return n;r--}else o!=="/$"&&o!=="/&"||r++}n=n.previousSibling}return null}function Kb(n,r,o){switch(r=Hu(o),n){case"html":if(n=r.documentElement,!n)throw Error(a(452));return n;case"head":if(n=r.head,!n)throw Error(a(453));return n;case"body":if(n=r.body,!n)throw Error(a(454));return n;default:throw Error(a(451))}}function Dl(n){for(var r=n.attributes;r.length;)n.removeAttributeNode(r[0]);$f(n)}var Ii=new Map,Zb=new Set;function $u(n){return typeof n.getRootNode=="function"?n.getRootNode():n.nodeType===9?n:n.ownerDocument}var Xr=B.d;B.d={f:k4,r:A4,D:R4,C:D4,L:O4,m:M4,X:j4,S:L4,M:N4};function k4(){var n=Xr.f(),r=Nu();return n||r}function A4(n){var r=Ds(n);r!==null&&r.tag===5&&r.type==="form"?h1(r):Xr.r(n)}var lo=typeof document>"u"?null:document;function Qb(n,r,o){var u=lo;if(u&&typeof r=="string"&&r){var p=Oi(r);p='link[rel="'+n+'"][href="'+p+'"]',typeof o=="string"&&(p+='[crossorigin="'+o+'"]'),Zb.has(p)||(Zb.add(p),n={rel:n,crossOrigin:o,href:r},u.querySelector(p)===null&&(r=u.createElement("link"),wn(r,"link",n),pn(r),u.head.appendChild(r)))}}function R4(n){Xr.D(n),Qb("dns-prefetch",n,null)}function D4(n,r){Xr.C(n,r),Qb("preconnect",n,r)}function O4(n,r,o){Xr.L(n,r,o);var u=lo;if(u&&n&&r){var p='link[rel="preload"][as="'+Oi(r)+'"]';r==="image"&&o&&o.imageSrcSet?(p+='[imagesrcset="'+Oi(o.imageSrcSet)+'"]',typeof o.imageSizes=="string"&&(p+='[imagesizes="'+Oi(o.imageSizes)+'"]')):p+='[href="'+Oi(n)+'"]';var y=p;switch(r){case"style":y=co(n);break;case"script":y=uo(n)}Ii.has(y)||(n=g({rel:"preload",href:r==="image"&&o&&o.imageSrcSet?void 0:n,as:r},o),Ii.set(y,n),u.querySelector(p)!==null||r==="style"&&u.querySelector(Ol(y))||r==="script"&&u.querySelector(Ml(y))||(r=u.createElement("link"),wn(r,"link",n),pn(r),u.head.appendChild(r)))}}function M4(n,r){Xr.m(n,r);var o=lo;if(o&&n){var u=r&&typeof r.as=="string"?r.as:"script",p='link[rel="modulepreload"][as="'+Oi(u)+'"][href="'+Oi(n)+'"]',y=p;switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":y=uo(n)}if(!Ii.has(y)&&(n=g({rel:"modulepreload",href:n},r),Ii.set(y,n),o.querySelector(p)===null)){switch(u){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(o.querySelector(Ml(y)))return}u=o.createElement("link"),wn(u,"link",n),pn(u),o.head.appendChild(u)}}}function L4(n,r,o){Xr.S(n,r,o);var u=lo;if(u&&n){var p=Os(u).hoistableStyles,y=co(n);r=r||"default";var T=p.get(y);if(!T){var D={loading:0,preload:null};if(T=u.querySelector(Ol(y)))D.loading=5;else{n=g({rel:"stylesheet",href:n,"data-precedence":r},o),(o=Ii.get(y))&&Hp(n,o);var V=T=u.createElement("link");pn(V),wn(V,"link",n),V._p=new Promise(function(Q,le){V.onload=Q,V.onerror=le}),V.addEventListener("load",function(){D.loading|=1}),V.addEventListener("error",function(){D.loading|=2}),D.loading|=4,qu(T,r,u)}T={type:"stylesheet",instance:T,count:1,state:D},p.set(y,T)}}}function j4(n,r){Xr.X(n,r);var o=lo;if(o&&n){var u=Os(o).hoistableScripts,p=uo(n),y=u.get(p);y||(y=o.querySelector(Ml(p)),y||(n=g({src:n,async:!0},r),(r=Ii.get(p))&&$p(n,r),y=o.createElement("script"),pn(y),wn(y,"link",n),o.head.appendChild(y)),y={type:"script",instance:y,count:1,state:null},u.set(p,y))}}function N4(n,r){Xr.M(n,r);var o=lo;if(o&&n){var u=Os(o).hoistableScripts,p=uo(n),y=u.get(p);y||(y=o.querySelector(Ml(p)),y||(n=g({src:n,async:!0,type:"module"},r),(r=Ii.get(p))&&$p(n,r),y=o.createElement("script"),pn(y),wn(y,"link",n),o.head.appendChild(y)),y={type:"script",instance:y,count:1,state:null},u.set(p,y))}}function Wb(n,r,o,u){var p=(p=ue.current)?$u(p):null;if(!p)throw Error(a(446));switch(n){case"meta":case"title":return null;case"style":return typeof o.precedence=="string"&&typeof o.href=="string"?(r=co(o.href),o=Os(p).hoistableStyles,u=o.get(r),u||(u={type:"style",instance:null,count:0,state:null},o.set(r,u)),u):{type:"void",instance:null,count:0,state:null};case"link":if(o.rel==="stylesheet"&&typeof o.href=="string"&&typeof o.precedence=="string"){n=co(o.href);var y=Os(p).hoistableStyles,T=y.get(n);if(T||(p=p.ownerDocument||p,T={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},y.set(n,T),(y=p.querySelector(Ol(n)))&&!y._p&&(T.instance=y,T.state.loading=5),Ii.has(n)||(o={rel:"preload",as:"style",href:o.href,crossOrigin:o.crossOrigin,integrity:o.integrity,media:o.media,hrefLang:o.hrefLang,referrerPolicy:o.referrerPolicy},Ii.set(n,o),y||z4(p,n,o,T.state))),r&&u===null)throw Error(a(528,""));return T}if(r&&u!==null)throw Error(a(529,""));return null;case"script":return r=o.async,o=o.src,typeof o=="string"&&r&&typeof r!="function"&&typeof r!="symbol"?(r=uo(o),o=Os(p).hoistableScripts,u=o.get(r),u||(u={type:"script",instance:null,count:0,state:null},o.set(r,u)),u):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,n))}}function co(n){return'href="'+Oi(n)+'"'}function Ol(n){return'link[rel="stylesheet"]['+n+"]"}function Jb(n){return g({},n,{"data-precedence":n.precedence,precedence:null})}function z4(n,r,o,u){n.querySelector('link[rel="preload"][as="style"]['+r+"]")?u.loading=1:(r=n.createElement("link"),u.preload=r,r.addEventListener("load",function(){return u.loading|=1}),r.addEventListener("error",function(){return u.loading|=2}),wn(r,"link",o),pn(r),n.head.appendChild(r))}function uo(n){return'[src="'+Oi(n)+'"]'}function Ml(n){return"script[async]"+n}function ev(n,r,o){if(r.count++,r.instance===null)switch(r.type){case"style":var u=n.querySelector('style[data-href~="'+Oi(o.href)+'"]');if(u)return r.instance=u,pn(u),u;var p=g({},o,{"data-href":o.href,"data-precedence":o.precedence,href:null,precedence:null});return u=(n.ownerDocument||n).createElement("style"),pn(u),wn(u,"style",p),qu(u,o.precedence,n),r.instance=u;case"stylesheet":p=co(o.href);var y=n.querySelector(Ol(p));if(y)return r.state.loading|=4,r.instance=y,pn(y),y;u=Jb(o),(p=Ii.get(p))&&Hp(u,p),y=(n.ownerDocument||n).createElement("link"),pn(y);var T=y;return T._p=new Promise(function(D,V){T.onload=D,T.onerror=V}),wn(y,"link",u),r.state.loading|=4,qu(y,o.precedence,n),r.instance=y;case"script":return y=uo(o.src),(p=n.querySelector(Ml(y)))?(r.instance=p,pn(p),p):(u=o,(p=Ii.get(y))&&(u=g({},o),$p(u,p)),n=n.ownerDocument||n,p=n.createElement("script"),pn(p),wn(p,"link",u),n.head.appendChild(p),r.instance=p);case"void":return null;default:throw Error(a(443,r.type))}else r.type==="stylesheet"&&(r.state.loading&4)===0&&(u=r.instance,r.state.loading|=4,qu(u,o.precedence,n));return r.instance}function qu(n,r,o){for(var u=o.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),p=u.length?u[u.length-1]:null,y=p,T=0;T<u.length;T++){var D=u[T];if(D.dataset.precedence===r)y=D;else if(y!==p)break}y?y.parentNode.insertBefore(n,y.nextSibling):(r=o.nodeType===9?o.head:o,r.insertBefore(n,r.firstChild))}function Hp(n,r){n.crossOrigin==null&&(n.crossOrigin=r.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=r.referrerPolicy),n.title==null&&(n.title=r.title)}function $p(n,r){n.crossOrigin==null&&(n.crossOrigin=r.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=r.referrerPolicy),n.integrity==null&&(n.integrity=r.integrity)}var Yu=null;function tv(n,r,o){if(Yu===null){var u=new Map,p=Yu=new Map;p.set(o,u)}else p=Yu,u=p.get(o),u||(u=new Map,p.set(o,u));if(u.has(n))return u;for(u.set(n,null),o=o.getElementsByTagName(n),p=0;p<o.length;p++){var y=o[p];if(!(y[Xo]||y[$e]||n==="link"&&y.getAttribute("rel")==="stylesheet")&&y.namespaceURI!=="http://www.w3.org/2000/svg"){var T=y.getAttribute(r)||"";T=n+T;var D=u.get(T);D?D.push(y):u.set(T,[y])}}return u}function nv(n,r,o){n=n.ownerDocument||n,n.head.insertBefore(o,r==="title"?n.querySelector("head > title"):null)}function P4(n,r,o){if(o===1||r.itemProp!=null)return!1;switch(n){case"meta":case"title":return!0;case"style":if(typeof r.precedence!="string"||typeof r.href!="string"||r.href==="")break;return!0;case"link":if(typeof r.rel!="string"||typeof r.href!="string"||r.href===""||r.onLoad||r.onError)break;return r.rel==="stylesheet"?(n=r.disabled,typeof r.precedence=="string"&&n==null):!0;case"script":if(r.async&&typeof r.async!="function"&&typeof r.async!="symbol"&&!r.onLoad&&!r.onError&&r.src&&typeof r.src=="string")return!0}return!1}function iv(n){return!(n.type==="stylesheet"&&(n.state.loading&3)===0)}function U4(n,r,o,u){if(o.type==="stylesheet"&&(typeof u.media!="string"||matchMedia(u.media).matches!==!1)&&(o.state.loading&4)===0){if(o.instance===null){var p=co(u.href),y=r.querySelector(Ol(p));if(y){r=y._p,r!==null&&typeof r=="object"&&typeof r.then=="function"&&(n.count++,n=Gu.bind(n),r.then(n,n)),o.state.loading|=4,o.instance=y,pn(y);return}y=r.ownerDocument||r,u=Jb(u),(p=Ii.get(p))&&Hp(u,p),y=y.createElement("link"),pn(y);var T=y;T._p=new Promise(function(D,V){T.onload=D,T.onerror=V}),wn(y,"link",u),o.instance=y}n.stylesheets===null&&(n.stylesheets=new Map),n.stylesheets.set(o,r),(r=o.state.preload)&&(o.state.loading&3)===0&&(n.count++,o=Gu.bind(n),r.addEventListener("load",o),r.addEventListener("error",o))}}var qp=0;function I4(n,r){return n.stylesheets&&n.count===0&&Ku(n,n.stylesheets),0<n.count||0<n.imgCount?function(o){var u=setTimeout(function(){if(n.stylesheets&&Ku(n,n.stylesheets),n.unsuspend){var y=n.unsuspend;n.unsuspend=null,y()}},6e4+r);0<n.imgBytes&&qp===0&&(qp=62500*b4());var p=setTimeout(function(){if(n.waitingForImages=!1,n.count===0&&(n.stylesheets&&Ku(n,n.stylesheets),n.unsuspend)){var y=n.unsuspend;n.unsuspend=null,y()}},(n.imgBytes>qp?50:800)+r);return n.unsuspend=o,function(){n.unsuspend=null,clearTimeout(u),clearTimeout(p)}}:null}function Gu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ku(this,this.stylesheets);else if(this.unsuspend){var n=this.unsuspend;this.unsuspend=null,n()}}}var Xu=null;function Ku(n,r){n.stylesheets=null,n.unsuspend!==null&&(n.count++,Xu=new Map,r.forEach(B4,n),Xu=null,Gu.call(n))}function B4(n,r){if(!(r.state.loading&4)){var o=Xu.get(n);if(o)var u=o.get(null);else{o=new Map,Xu.set(n,o);for(var p=n.querySelectorAll("link[data-precedence],style[data-precedence]"),y=0;y<p.length;y++){var T=p[y];(T.nodeName==="LINK"||T.getAttribute("media")!=="not all")&&(o.set(T.dataset.precedence,T),u=T)}u&&o.set(null,u)}p=r.instance,T=p.getAttribute("data-precedence"),y=o.get(T)||u,y===u&&o.set(null,p),o.set(T,p),this.count++,u=Gu.bind(this),p.addEventListener("load",u),p.addEventListener("error",u),y?y.parentNode.insertBefore(p,y.nextSibling):(n=n.nodeType===9?n.head:n,n.insertBefore(p,n.firstChild)),r.state.loading|=4}}var Ll={$$typeof:R,Provider:null,Consumer:null,_currentValue:$,_currentValue2:$,_threadCount:0};function V4(n,r,o,u,p,y,T,D,V){this.tag=1,this.containerInfo=n,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=be(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=be(0),this.hiddenUpdates=be(null),this.identifierPrefix=u,this.onUncaughtError=p,this.onCaughtError=y,this.onRecoverableError=T,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=V,this.incompleteTransitions=new Map}function rv(n,r,o,u,p,y,T,D,V,Q,le,ge){return n=new V4(n,r,o,T,V,Q,le,ge,D),r=1,y===!0&&(r|=24),y=ui(3,null,null,r),n.current=y,y.stateNode=n,r=Th(),r.refCount++,n.pooledCache=r,r.refCount++,y.memoizedState={element:u,isDehydrated:o,cache:r},Ah(y),n}function av(n){return n?(n=Vs,n):Vs}function sv(n,r,o,u,p,y){p=av(p),u.context===null?u.context=p:u.pendingContext=p,u=ca(r),u.payload={element:o},y=y===void 0?null:y,y!==null&&(u.callback=y),o=ua(n,u,r),o!==null&&(Kn(o,n,r),dl(o,n,r))}function ov(n,r){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<r?o:r}}function Yp(n,r){ov(n,r),(n=n.alternate)&&ov(n,r)}function lv(n){if(n.tag===13||n.tag===31){var r=Ga(n,67108864);r!==null&&Kn(r,n,67108864),Yp(n,67108864)}}function cv(n){if(n.tag===13||n.tag===31){var r=mi();r=ve(r);var o=Ga(n,r);o!==null&&Kn(o,n,r),Yp(n,r)}}var Zu=!0;function F4(n,r,o,u){var p=z.T;z.T=null;var y=B.p;try{B.p=2,Gp(n,r,o,u)}finally{B.p=y,z.T=p}}function H4(n,r,o,u){var p=z.T;z.T=null;var y=B.p;try{B.p=8,Gp(n,r,o,u)}finally{B.p=y,z.T=p}}function Gp(n,r,o,u){if(Zu){var p=Xp(u);if(p===null)Lp(n,r,u,Qu,o),dv(n,u);else if(q4(p,n,r,o,u))u.stopPropagation();else if(dv(n,u),r&4&&-1<$4.indexOf(n)){for(;p!==null;){var y=Ds(p);if(y!==null)switch(y.tag){case 3:if(y=y.stateNode,y.current.memoizedState.isDehydrated){var T=ln(y.pendingLanes);if(T!==0){var D=y;for(D.pendingLanes|=2,D.entangledLanes|=2;T;){var V=1<<31-zt(T);D.entanglements[1]|=V,T&=~V}fr(y),(rt&6)===0&&(Lu=Ze()+500,kl(0))}}break;case 31:case 13:D=Ga(y,2),D!==null&&Kn(D,y,2),Nu(),Yp(y,2)}if(y=Xp(u),y===null&&Lp(n,r,u,Qu,o),y===p)break;p=y}p!==null&&u.stopPropagation()}else Lp(n,r,u,null,o)}}function Xp(n){return n=Zf(n),Kp(n)}var Qu=null;function Kp(n){if(Qu=null,n=Rs(n),n!==null){var r=l(n);if(r===null)n=null;else{var o=r.tag;if(o===13){if(n=c(r),n!==null)return n;n=null}else if(o===31){if(n=d(r),n!==null)return n;n=null}else if(o===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;n=null}else r!==n&&(n=null)}}return Qu=n,null}function uv(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Vn()){case an:return 2;case mt:return 8;case sn:case yn:return 32;case kn:return 268435456;default:return 32}default:return 32}}var Zp=!1,wa=null,Sa=null,_a=null,jl=new Map,Nl=new Map,Ta=[],$4="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function dv(n,r){switch(n){case"focusin":case"focusout":wa=null;break;case"dragenter":case"dragleave":Sa=null;break;case"mouseover":case"mouseout":_a=null;break;case"pointerover":case"pointerout":jl.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":Nl.delete(r.pointerId)}}function zl(n,r,o,u,p,y){return n===null||n.nativeEvent!==y?(n={blockedOn:r,domEventName:o,eventSystemFlags:u,nativeEvent:y,targetContainers:[p]},r!==null&&(r=Ds(r),r!==null&&lv(r)),n):(n.eventSystemFlags|=u,r=n.targetContainers,p!==null&&r.indexOf(p)===-1&&r.push(p),n)}function q4(n,r,o,u,p){switch(r){case"focusin":return wa=zl(wa,n,r,o,u,p),!0;case"dragenter":return Sa=zl(Sa,n,r,o,u,p),!0;case"mouseover":return _a=zl(_a,n,r,o,u,p),!0;case"pointerover":var y=p.pointerId;return jl.set(y,zl(jl.get(y)||null,n,r,o,u,p)),!0;case"gotpointercapture":return y=p.pointerId,Nl.set(y,zl(Nl.get(y)||null,n,r,o,u,p)),!0}return!1}function fv(n){var r=Rs(n.target);if(r!==null){var o=l(r);if(o!==null){if(r=o.tag,r===13){if(r=c(o),r!==null){n.blockedOn=r,je(n.priority,function(){cv(o)});return}}else if(r===31){if(r=d(o),r!==null){n.blockedOn=r,je(n.priority,function(){cv(o)});return}}else if(r===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Wu(n){if(n.blockedOn!==null)return!1;for(var r=n.targetContainers;0<r.length;){var o=Xp(n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);Kf=u,o.target.dispatchEvent(u),Kf=null}else return r=Ds(o),r!==null&&lv(r),n.blockedOn=o,!1;r.shift()}return!0}function hv(n,r,o){Wu(n)&&o.delete(r)}function Y4(){Zp=!1,wa!==null&&Wu(wa)&&(wa=null),Sa!==null&&Wu(Sa)&&(Sa=null),_a!==null&&Wu(_a)&&(_a=null),jl.forEach(hv),Nl.forEach(hv)}function Ju(n,r){n.blockedOn===r&&(n.blockedOn=null,Zp||(Zp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Y4)))}var ed=null;function pv(n){ed!==n&&(ed=n,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){ed===n&&(ed=null);for(var r=0;r<n.length;r+=3){var o=n[r],u=n[r+1],p=n[r+2];if(typeof u!="function"){if(Kp(u||o)===null)continue;break}var y=Ds(o);y!==null&&(n.splice(r,3),r-=3,Xh(y,{pending:!0,data:p,method:o.method,action:u},u,p))}}))}function fo(n){function r(V){return Ju(V,n)}wa!==null&&Ju(wa,n),Sa!==null&&Ju(Sa,n),_a!==null&&Ju(_a,n),jl.forEach(r),Nl.forEach(r);for(var o=0;o<Ta.length;o++){var u=Ta[o];u.blockedOn===n&&(u.blockedOn=null)}for(;0<Ta.length&&(o=Ta[0],o.blockedOn===null);)fv(o),o.blockedOn===null&&Ta.shift();if(o=(n.ownerDocument||n).$$reactFormReplay,o!=null)for(u=0;u<o.length;u+=3){var p=o[u],y=o[u+1],T=p[Ge]||null;if(typeof y=="function")T||pv(o);else if(T){var D=null;if(y&&y.hasAttribute("formAction")){if(p=y,T=y[Ge]||null)D=T.formAction;else if(Kp(p)!==null)continue}else D=T.action;typeof D=="function"?o[u+1]=D:(o.splice(u,3),u-=3),pv(o)}}}function mv(){function n(y){y.canIntercept&&y.info==="react-transition"&&y.intercept({handler:function(){return new Promise(function(T){return p=T})},focusReset:"manual",scroll:"manual"})}function r(){p!==null&&(p(),p=null),u||setTimeout(o,20)}function o(){if(!u&&!navigation.transition){var y=navigation.currentEntry;y&&y.url!=null&&navigation.navigate(y.url,{state:y.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var u=!1,p=null;return navigation.addEventListener("navigate",n),navigation.addEventListener("navigatesuccess",r),navigation.addEventListener("navigateerror",r),setTimeout(o,100),function(){u=!0,navigation.removeEventListener("navigate",n),navigation.removeEventListener("navigatesuccess",r),navigation.removeEventListener("navigateerror",r),p!==null&&(p(),p=null)}}}function Qp(n){this._internalRoot=n}td.prototype.render=Qp.prototype.render=function(n){var r=this._internalRoot;if(r===null)throw Error(a(409));var o=r.current,u=mi();sv(o,u,n,r,null,null)},td.prototype.unmount=Qp.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var r=n.containerInfo;sv(n.current,2,null,n,null,null),Nu(),r[An]=null}};function td(n){this._internalRoot=n}td.prototype.unstable_scheduleHydration=function(n){if(n){var r=Ve();n={blockedOn:null,target:n,priority:r};for(var o=0;o<Ta.length&&r!==0&&r<Ta[o].priority;o++);Ta.splice(o,0,n),o===0&&fv(n)}};var gv=e.version;if(gv!=="19.2.5")throw Error(a(527,gv,"19.2.5"));B.findDOMNode=function(n){var r=n._reactInternals;if(r===void 0)throw typeof n.render=="function"?Error(a(188)):(n=Object.keys(n).join(","),Error(a(268,n)));return n=h(r),n=n!==null?m(n):null,n=n===null?null:n.stateNode,n};var G4={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var nd=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!nd.isDisabled&&nd.supportsFiber)try{ai=nd.inject(G4),Ct=nd}catch{}}return Ul.createRoot=function(n,r){if(!s(n))throw Error(a(299));var o=!1,u="",p=_1,y=T1,T=E1;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onUncaughtError!==void 0&&(p=r.onUncaughtError),r.onCaughtError!==void 0&&(y=r.onCaughtError),r.onRecoverableError!==void 0&&(T=r.onRecoverableError)),r=rv(n,1,!1,null,null,o,u,null,p,y,T,mv),n[An]=r.current,Mp(n),new Qp(r)},Ul.hydrateRoot=function(n,r,o){if(!s(n))throw Error(a(299));var u=!1,p="",y=_1,T=T1,D=E1,V=null;return o!=null&&(o.unstable_strictMode===!0&&(u=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onUncaughtError!==void 0&&(y=o.onUncaughtError),o.onCaughtError!==void 0&&(T=o.onCaughtError),o.onRecoverableError!==void 0&&(D=o.onRecoverableError),o.formState!==void 0&&(V=o.formState)),r=rv(n,1,!0,r,o??null,u,p,V,y,T,D,mv),r.context=av(null),o=r.current,u=mi(),u=ve(u),p=ca(u),p.callback=null,ua(o,p,u),o=u,r.current.lanes=o,pe(r,o),fr(r),n[An]=r.current,Mp(n),new td(r)},Ul.version="19.2.5",Ul}var Cv;function ik(){if(Cv)return Jp.exports;Cv=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(e){console.error(e)}}return t(),Jp.exports=nk(),Jp.exports}var rk=ik(),E=ig();const _e=y5(E),kv=K4({__proto__:null,default:_e},[E]),rg=E.createContext({});function ag(t){const e=E.useRef(null);return e.current===null&&(e.current=t()),e.current}const ak=typeof window<"u",b5=ak?E.useLayoutEffect:E.useEffect,xf=E.createContext(null);function sg(t,e){t.indexOf(e)===-1&&t.push(e)}function Kd(t,e){const i=t.indexOf(e);i>-1&&t.splice(i,1)}const Rr=(t,e,i)=>i>e?e:i<t?t:i;let og=()=>{};const za={},v5=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);function w5(t){return typeof t=="object"&&t!==null}const S5=t=>/^0[^.\s]+$/u.test(t);function _5(t){let e;return()=>(e===void 0&&(e=t()),e)}const Ki=t=>t,sk=(t,e)=>i=>e(t(i)),Rc=(...t)=>t.reduce(sk),fc=(t,e,i)=>{const a=e-t;return a===0?1:(i-t)/a};class lg{constructor(){this.subscriptions=[]}add(e){return sg(this.subscriptions,e),()=>Kd(this.subscriptions,e)}notify(e,i,a){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,i,a);else for(let l=0;l<s;l++){const c=this.subscriptions[l];c&&c(e,i,a)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const _i=t=>t*1e3,Yi=t=>t/1e3;function T5(t,e){return e?t*(1e3/e):0}const E5=(t,e,i)=>(((1-3*i+3*e)*t+(3*i-6*e))*t+3*e)*t,ok=1e-7,lk=12;function ck(t,e,i,a,s){let l,c,d=0;do c=e+(i-e)/2,l=E5(c,a,s)-t,l>0?i=c:e=c;while(Math.abs(l)>ok&&++d<lk);return c}function Dc(t,e,i,a){if(t===e&&i===a)return Ki;const s=l=>ck(l,0,1,t,i);return l=>l===0||l===1?l:E5(s(l),e,a)}const C5=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,k5=t=>e=>1-t(1-e),A5=Dc(.33,1.53,.69,.99),cg=k5(A5),R5=C5(cg),D5=t=>t>=1?1:(t*=2)<1?.5*cg(t):.5*(2-Math.pow(2,-10*(t-1))),ug=t=>1-Math.sin(Math.acos(t)),O5=k5(ug),M5=C5(ug),uk=Dc(.42,0,1,1),dk=Dc(0,0,.58,1),L5=Dc(.42,0,.58,1),fk=t=>Array.isArray(t)&&typeof t[0]!="number",j5=t=>Array.isArray(t)&&typeof t[0]=="number",hk={linear:Ki,easeIn:uk,easeInOut:L5,easeOut:dk,circIn:ug,circInOut:M5,circOut:O5,backIn:cg,backInOut:R5,backOut:A5,anticipate:D5},pk=t=>typeof t=="string",Av=t=>{if(j5(t)){og(t.length===4);const[e,i,a,s]=t;return Dc(e,i,a,s)}else if(pk(t))return hk[t];return t},id=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function mk(t,e){let i=new Set,a=new Set,s=!1,l=!1;const c=new WeakSet;let d={delta:0,timestamp:0,isProcessing:!1};function f(m){c.has(m)&&(h.schedule(m),t()),m(d)}const h={schedule:(m,g=!1,x=!1)=>{const w=x&&s?i:a;return g&&c.add(m),w.add(m),m},cancel:m=>{a.delete(m),c.delete(m)},process:m=>{if(d=m,s){l=!0;return}s=!0;const g=i;i=a,a=g,i.forEach(f),i.clear(),s=!1,l&&(l=!1,h.process(m))}};return h}const gk=40;function N5(t,e){let i=!1,a=!0;const s={delta:0,timestamp:0,isProcessing:!1},l=()=>i=!0,c=id.reduce((R,L)=>(R[L]=mk(l),R),{}),{setup:d,read:f,resolveKeyframes:h,preUpdate:m,update:g,preRender:x,render:_,postRender:w}=c,v=()=>{const R=za.useManualTiming,L=R?s.timestamp:performance.now();i=!1,R||(s.delta=a?1e3/60:Math.max(Math.min(L-s.timestamp,gk),1)),s.timestamp=L,s.isProcessing=!0,d.process(s),f.process(s),h.process(s),m.process(s),g.process(s),x.process(s),_.process(s),w.process(s),s.isProcessing=!1,i&&e&&(a=!1,t(v))},S=()=>{i=!0,a=!0,s.isProcessing||t(v)};return{schedule:id.reduce((R,L)=>{const O=c[L];return R[L]=(j,k=!1,U=!1)=>(i||S(),O.schedule(j,k,U)),R},{}),cancel:R=>{for(let L=0;L<id.length;L++)c[id[L]].cancel(R)},state:s,steps:c}}const{schedule:_t,cancel:Pa,state:Sn,steps:rm}=N5(typeof requestAnimationFrame<"u"?requestAnimationFrame:Ki,!0);let kd;function yk(){kd=void 0}const In={now:()=>(kd===void 0&&In.set(Sn.isProcessing||za.useManualTiming?Sn.timestamp:performance.now()),kd),set:t=>{kd=t,queueMicrotask(yk)}},z5=t=>e=>typeof e=="string"&&e.startsWith(t),P5=z5("--"),xk=z5("var(--"),dg=t=>xk(t)?bk.test(t.split("/*")[0].trim()):!1,bk=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Rv(t){return typeof t!="string"?!1:t.split("/*")[0].includes("var(--")}const Uo={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},hc={...Uo,transform:t=>Rr(0,1,t)},rd={...Uo,default:1},tc=t=>Math.round(t*1e5)/1e5,fg=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function vk(t){return t==null}const wk=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,hg=(t,e)=>i=>!!(typeof i=="string"&&wk.test(i)&&i.startsWith(t)||e&&!vk(i)&&Object.prototype.hasOwnProperty.call(i,e)),U5=(t,e,i)=>a=>{if(typeof a!="string")return a;const[s,l,c,d]=a.match(fg);return{[t]:parseFloat(s),[e]:parseFloat(l),[i]:parseFloat(c),alpha:d!==void 0?parseFloat(d):1}},Sk=t=>Rr(0,255,t),am={...Uo,transform:t=>Math.round(Sk(t))},hs={test:hg("rgb","red"),parse:U5("red","green","blue"),transform:({red:t,green:e,blue:i,alpha:a=1})=>"rgba("+am.transform(t)+", "+am.transform(e)+", "+am.transform(i)+", "+tc(hc.transform(a))+")"};function _k(t){let e="",i="",a="",s="";return t.length>5?(e=t.substring(1,3),i=t.substring(3,5),a=t.substring(5,7),s=t.substring(7,9)):(e=t.substring(1,2),i=t.substring(2,3),a=t.substring(3,4),s=t.substring(4,5),e+=e,i+=i,a+=a,s+=s),{red:parseInt(e,16),green:parseInt(i,16),blue:parseInt(a,16),alpha:s?parseInt(s,16)/255:1}}const Jm={test:hg("#"),parse:_k,transform:hs.transform},Oc=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),ka=Oc("deg"),Er=Oc("%"),Ae=Oc("px"),Tk=Oc("vh"),Ek=Oc("vw"),Dv={...Er,parse:t=>Er.parse(t)/100,transform:t=>Er.transform(t*100)},yo={test:hg("hsl","hue"),parse:U5("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:i,alpha:a=1})=>"hsla("+Math.round(t)+", "+Er.transform(tc(e))+", "+Er.transform(tc(i))+", "+tc(hc.transform(a))+")"},en={test:t=>hs.test(t)||Jm.test(t)||yo.test(t),parse:t=>hs.test(t)?hs.parse(t):yo.test(t)?yo.parse(t):Jm.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?hs.transform(t):yo.transform(t),getAnimatableNone:t=>{const e=en.parse(t);return e.alpha=0,en.transform(e)}},Ck=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function kk(t){return isNaN(t)&&typeof t=="string"&&(t.match(fg)?.length||0)+(t.match(Ck)?.length||0)>0}const I5="number",B5="color",Ak="var",Rk="var(",Ov="${}",Dk=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Ao(t){const e=t.toString(),i=[],a={color:[],number:[],var:[]},s=[];let l=0;const d=e.replace(Dk,f=>(en.test(f)?(a.color.push(l),s.push(B5),i.push(en.parse(f))):f.startsWith(Rk)?(a.var.push(l),s.push(Ak),i.push(f)):(a.number.push(l),s.push(I5),i.push(parseFloat(f))),++l,Ov)).split(Ov);return{values:i,split:d,indexes:a,types:s}}function Ok(t){return Ao(t).values}function V5({split:t,types:e}){const i=t.length;return a=>{let s="";for(let l=0;l<i;l++)if(s+=t[l],a[l]!==void 0){const c=e[l];c===I5?s+=tc(a[l]):c===B5?s+=en.transform(a[l]):s+=a[l]}return s}}function Mk(t){return V5(Ao(t))}const Lk=t=>typeof t=="number"?0:en.test(t)?en.getAnimatableNone(t):t,jk=(t,e)=>typeof t=="number"?e?.trim().endsWith("/")?t:0:Lk(t);function Nk(t){const e=Ao(t);return V5(e)(e.values.map((a,s)=>jk(a,e.split[s])))}const rr={test:kk,parse:Ok,createTransformer:Mk,getAnimatableNone:Nk};function sm(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+(e-t)*6*i:i<1/2?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function zk({hue:t,saturation:e,lightness:i,alpha:a}){t/=360,e/=100,i/=100;let s=0,l=0,c=0;if(!e)s=l=c=i;else{const d=i<.5?i*(1+e):i+e-i*e,f=2*i-d;s=sm(f,d,t+1/3),l=sm(f,d,t),c=sm(f,d,t-1/3)}return{red:Math.round(s*255),green:Math.round(l*255),blue:Math.round(c*255),alpha:a}}function Zd(t,e){return i=>i>0?e:t}const Ot=(t,e,i)=>t+(e-t)*i,om=(t,e,i)=>{const a=t*t,s=i*(e*e-a)+a;return s<0?0:Math.sqrt(s)},Pk=[Jm,hs,yo],Uk=t=>Pk.find(e=>e.test(t));function Mv(t){const e=Uk(t);if(!e)return!1;let i=e.parse(t);return e===yo&&(i=zk(i)),i}const Lv=(t,e)=>{const i=Mv(t),a=Mv(e);if(!i||!a)return Zd(t,e);const s={...i};return l=>(s.red=om(i.red,a.red,l),s.green=om(i.green,a.green,l),s.blue=om(i.blue,a.blue,l),s.alpha=Ot(i.alpha,a.alpha,l),hs.transform(s))},e0=new Set(["none","hidden"]);function Ik(t,e){return e0.has(t)?i=>i<=0?t:e:i=>i>=1?e:t}function Bk(t,e){return i=>Ot(t,e,i)}function pg(t){return typeof t=="number"?Bk:typeof t=="string"?dg(t)?Zd:en.test(t)?Lv:Hk:Array.isArray(t)?F5:typeof t=="object"?en.test(t)?Lv:Vk:Zd}function F5(t,e){const i=[...t],a=i.length,s=t.map((l,c)=>pg(l)(l,e[c]));return l=>{for(let c=0;c<a;c++)i[c]=s[c](l);return i}}function Vk(t,e){const i={...t,...e},a={};for(const s in i)t[s]!==void 0&&e[s]!==void 0&&(a[s]=pg(t[s])(t[s],e[s]));return s=>{for(const l in a)i[l]=a[l](s);return i}}function Fk(t,e){const i=[],a={color:0,var:0,number:0};for(let s=0;s<e.values.length;s++){const l=e.types[s],c=t.indexes[l][a[l]],d=t.values[c]??0;i[s]=d,a[l]++}return i}const Hk=(t,e)=>{const i=rr.createTransformer(e),a=Ao(t),s=Ao(e);return a.indexes.var.length===s.indexes.var.length&&a.indexes.color.length===s.indexes.color.length&&a.indexes.number.length>=s.indexes.number.length?e0.has(t)&&!s.values.length||e0.has(e)&&!a.values.length?Ik(t,e):Rc(F5(Fk(a,s),s.values),i):Zd(t,e)};function H5(t,e,i){return typeof t=="number"&&typeof e=="number"&&typeof i=="number"?Ot(t,e,i):pg(t)(t,e)}const $k=t=>{const e=({timestamp:i})=>t(i);return{start:(i=!0)=>_t.update(e,i),stop:()=>Pa(e),now:()=>Sn.isProcessing?Sn.timestamp:In.now()}},$5=(t,e,i=10)=>{let a="";const s=Math.max(Math.round(e/i),2);for(let l=0;l<s;l++)a+=Math.round(t(l/(s-1))*1e4)/1e4+", ";return`linear(${a.substring(0,a.length-2)})`},Qd=2e4;function mg(t){let e=0;const i=50;let a=t.next(e);for(;!a.done&&e<Qd;)e+=i,a=t.next(e);return e>=Qd?1/0:e}function qk(t,e=100,i){const a=i({...t,keyframes:[0,e]}),s=Math.min(mg(a),Qd);return{type:"keyframes",ease:l=>a.next(s*l).value/e,duration:Yi(s)}}const Ht={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function t0(t,e){return t*Math.sqrt(1-e*e)}const Yk=12;function Gk(t,e,i){let a=i;for(let s=1;s<Yk;s++)a=a-t(a)/e(a);return a}const lm=.001;function Xk({duration:t=Ht.duration,bounce:e=Ht.bounce,velocity:i=Ht.velocity,mass:a=Ht.mass}){let s,l,c=1-e;c=Rr(Ht.minDamping,Ht.maxDamping,c),t=Rr(Ht.minDuration,Ht.maxDuration,Yi(t)),c<1?(s=h=>{const m=h*c,g=m*t,x=m-i,_=t0(h,c),w=Math.exp(-g);return lm-x/_*w},l=h=>{const g=h*c*t,x=g*i+i,_=Math.pow(c,2)*Math.pow(h,2)*t,w=Math.exp(-g),v=t0(Math.pow(h,2),c);return(-s(h)+lm>0?-1:1)*((x-_)*w)/v}):(s=h=>{const m=Math.exp(-h*t),g=(h-i)*t+1;return-lm+m*g},l=h=>{const m=Math.exp(-h*t),g=(i-h)*(t*t);return m*g});const d=5/t,f=Gk(s,l,d);if(t=_i(t),isNaN(f))return{stiffness:Ht.stiffness,damping:Ht.damping,duration:t};{const h=Math.pow(f,2)*a;return{stiffness:h,damping:c*2*Math.sqrt(a*h),duration:t}}}const Kk=["duration","bounce"],Zk=["stiffness","damping","mass"];function jv(t,e){return e.some(i=>t[i]!==void 0)}function Qk(t){let e={velocity:Ht.velocity,stiffness:Ht.stiffness,damping:Ht.damping,mass:Ht.mass,isResolvedFromDuration:!1,...t};if(!jv(t,Zk)&&jv(t,Kk))if(e.velocity=0,t.visualDuration){const i=t.visualDuration,a=2*Math.PI/(i*1.2),s=a*a,l=2*Rr(.05,1,1-(t.bounce||0))*Math.sqrt(s);e={...e,mass:Ht.mass,stiffness:s,damping:l}}else{const i=Xk({...t,velocity:0});e={...e,...i,mass:Ht.mass},e.isResolvedFromDuration=!0}return e}function Wd(t=Ht.visualDuration,e=Ht.bounce){const i=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t;let{restSpeed:a,restDelta:s}=i;const l=i.keyframes[0],c=i.keyframes[i.keyframes.length-1],d={done:!1,value:l},{stiffness:f,damping:h,mass:m,duration:g,velocity:x,isResolvedFromDuration:_}=Qk({...i,velocity:-Yi(i.velocity||0)}),w=x||0,v=h/(2*Math.sqrt(f*m)),S=c-l,C=Yi(Math.sqrt(f/m)),M=Math.abs(S)<5;a||(a=M?Ht.restSpeed.granular:Ht.restSpeed.default),s||(s=M?Ht.restDelta.granular:Ht.restDelta.default);let R,L,O,j,k,U;if(v<1)O=t0(C,v),j=(w+v*C*S)/O,R=Y=>{const W=Math.exp(-v*C*Y);return c-W*(j*Math.sin(O*Y)+S*Math.cos(O*Y))},k=v*C*j+S*O,U=v*C*S-j*O,L=Y=>Math.exp(-v*C*Y)*(k*Math.sin(O*Y)+U*Math.cos(O*Y));else if(v===1){R=W=>c-Math.exp(-C*W)*(S+(w+C*S)*W);const Y=w+C*S;L=W=>Math.exp(-C*W)*(C*Y*W-w)}else{const Y=C*Math.sqrt(v*v-1);R=we=>{const Se=Math.exp(-v*C*we),z=Math.min(Y*we,300);return c-Se*((w+v*C*S)*Math.sinh(z)+Y*S*Math.cosh(z))/Y};const W=(w+v*C*S)/Y,te=v*C*W-S*Y,me=v*C*S-W*Y;L=we=>{const Se=Math.exp(-v*C*we),z=Math.min(Y*we,300);return Se*(te*Math.sinh(z)+me*Math.cosh(z))}}const I={calculatedDuration:_&&g||null,velocity:Y=>_i(L(Y)),next:Y=>{if(!_&&v<1){const te=Math.exp(-v*C*Y),me=Math.sin(O*Y),we=Math.cos(O*Y),Se=c-te*(j*me+S*we),z=_i(te*(k*me+U*we));return d.done=Math.abs(z)<=a&&Math.abs(c-Se)<=s,d.value=d.done?c:Se,d}const W=R(Y);if(_)d.done=Y>=g;else{const te=_i(L(Y));d.done=Math.abs(te)<=a&&Math.abs(c-W)<=s}return d.value=d.done?c:W,d},toString:()=>{const Y=Math.min(mg(I),Qd),W=$5(te=>I.next(Y*te).value,Y,30);return Y+"ms "+W},toTransition:()=>{}};return I}Wd.applyToOptions=t=>{const e=qk(t,100,Wd);return t.ease=e.ease,t.duration=_i(e.duration),t.type="keyframes",t};const Wk=5;function q5(t,e,i){const a=Math.max(e-Wk,0);return T5(i-t(a),e-a)}function n0({keyframes:t,velocity:e=0,power:i=.8,timeConstant:a=325,bounceDamping:s=10,bounceStiffness:l=500,modifyTarget:c,min:d,max:f,restDelta:h=.5,restSpeed:m}){const g=t[0],x={done:!1,value:g},_=U=>d!==void 0&&U<d||f!==void 0&&U>f,w=U=>d===void 0?f:f===void 0||Math.abs(d-U)<Math.abs(f-U)?d:f;let v=i*e;const S=g+v,C=c===void 0?S:c(S);C!==S&&(v=C-g);const M=U=>-v*Math.exp(-U/a),R=U=>C+M(U),L=U=>{const I=M(U),Y=R(U);x.done=Math.abs(I)<=h,x.value=x.done?C:Y};let O,j;const k=U=>{_(x.value)&&(O=U,j=Wd({keyframes:[x.value,w(x.value)],velocity:q5(R,U,x.value),damping:s,stiffness:l,restDelta:h,restSpeed:m}))};return k(0),{calculatedDuration:null,next:U=>{let I=!1;return!j&&O===void 0&&(I=!0,L(U),k(U)),O!==void 0&&U>=O?j.next(U-O):(!I&&L(U),x)}}}function Jk(t,e,i){const a=[],s=i||za.mix||H5,l=t.length-1;for(let c=0;c<l;c++){let d=s(t[c],t[c+1]);if(e){const f=Array.isArray(e)?e[c]||Ki:e;d=Rc(f,d)}a.push(d)}return a}function eA(t,e,{clamp:i=!0,ease:a,mixer:s}={}){const l=t.length;if(og(l===e.length),l===1)return()=>e[0];if(l===2&&e[0]===e[1])return()=>e[1];const c=t[0]===t[1];t[0]>t[l-1]&&(t=[...t].reverse(),e=[...e].reverse());const d=Jk(e,a,s),f=d.length,h=m=>{if(c&&m<t[0])return e[0];let g=0;if(f>1)for(;g<t.length-2&&!(m<t[g+1]);g++);const x=fc(t[g],t[g+1],m);return d[g](x)};return i?m=>h(Rr(t[0],t[l-1],m)):h}function tA(t,e){const i=t[t.length-1];for(let a=1;a<=e;a++){const s=fc(0,e,a);t.push(Ot(i,1,s))}}function nA(t){const e=[0];return tA(e,t.length-1),e}function iA(t,e){return t.map(i=>i*e)}function rA(t,e){return t.map(()=>e||L5).splice(0,t.length-1)}function nc({duration:t=300,keyframes:e,times:i,ease:a="easeInOut"}){const s=fk(a)?a.map(Av):Av(a),l={done:!1,value:e[0]},c=iA(i&&i.length===e.length?i:nA(e),t),d=eA(c,e,{ease:Array.isArray(s)?s:rA(e,s)});return{calculatedDuration:t,next:f=>(l.value=d(f),l.done=f>=t,l)}}const aA=t=>t!==null;function bf(t,{repeat:e,repeatType:i="loop"},a,s=1){const l=t.filter(aA),d=s<0||e&&i!=="loop"&&e%2===1?0:l.length-1;return!d||a===void 0?l[d]:a}const sA={decay:n0,inertia:n0,tween:nc,keyframes:nc,spring:Wd};function Y5(t){typeof t.type=="string"&&(t.type=sA[t.type])}class gg{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,i){return this.finished.then(e,i)}}const oA=t=>t/100;class Jd extends gg{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{const{motionValue:i}=this.options;i&&i.updatedAt!==In.now()&&this.tick(In.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){const{options:e}=this;Y5(e);const{type:i=nc,repeat:a=0,repeatDelay:s=0,repeatType:l,velocity:c=0}=e;let{keyframes:d}=e;const f=i||nc;f!==nc&&typeof d[0]!="number"&&(this.mixKeyframes=Rc(oA,H5(d[0],d[1])),d=[0,100]);const h=f({...e,keyframes:d});l==="mirror"&&(this.mirroredGenerator=f({...e,keyframes:[...d].reverse(),velocity:-c})),h.calculatedDuration===null&&(h.calculatedDuration=mg(h));const{calculatedDuration:m}=h;this.calculatedDuration=m,this.resolvedDuration=m+s,this.totalDuration=this.resolvedDuration*(a+1)-s,this.generator=h}updateTime(e){const i=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=i}tick(e,i=!1){const{generator:a,totalDuration:s,mixKeyframes:l,mirroredGenerator:c,resolvedDuration:d,calculatedDuration:f}=this;if(this.startTime===null)return a.next(0);const{delay:h=0,keyframes:m,repeat:g,repeatType:x,repeatDelay:_,type:w,onUpdate:v,finalKeyframe:S}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-s/this.speed,this.startTime)),i?this.currentTime=e:this.updateTime(e);const C=this.currentTime-h*(this.playbackSpeed>=0?1:-1),M=this.playbackSpeed>=0?C<0:C>s;this.currentTime=Math.max(C,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=s);let R=this.currentTime,L=a;if(g){const U=Math.min(this.currentTime,s)/d;let I=Math.floor(U),Y=U%1;!Y&&U>=1&&(Y=1),Y===1&&I--,I=Math.min(I,g+1),I%2&&(x==="reverse"?(Y=1-Y,_&&(Y-=_/d)):x==="mirror"&&(L=c)),R=Rr(0,1,Y)*d}let O;M?(this.delayState.value=m[0],O=this.delayState):O=L.next(R),l&&!M&&(O.value=l(O.value));let{done:j}=O;!M&&f!==null&&(j=this.playbackSpeed>=0?this.currentTime>=s:this.currentTime<=0);const k=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&j);return k&&w!==n0&&(O.value=bf(m,this.options,S,this.speed)),v&&v(O.value),k&&this.finish(),O}then(e,i){return this.finished.then(e,i)}get duration(){return Yi(this.calculatedDuration)}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+Yi(e)}get time(){return Yi(this.currentTime)}set time(e){e=_i(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){const e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);const i=this.generator.next(e).value;return q5(a=>this.generator.next(a).value,e,i)}get speed(){return this.playbackSpeed}set speed(e){const i=this.playbackSpeed!==e;i&&this.driver&&this.updateTime(In.now()),this.playbackSpeed=e,i&&this.driver&&(this.time=Yi(this.currentTime))}play(){if(this.isStopped)return;const{driver:e=$k,startTime:i}=this.options;this.driver||(this.driver=e(s=>this.tick(s))),this.options.onPlay?.();const a=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=a):this.holdTime!==null?this.startTime=a-this.holdTime:this.startTime||(this.startTime=i??a),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(In.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}}function lA(t){for(let e=1;e<t.length;e++)t[e]??(t[e]=t[e-1])}const ps=t=>t*180/Math.PI,i0=t=>{const e=ps(Math.atan2(t[1],t[0]));return r0(e)},cA={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:t=>(Math.abs(t[0])+Math.abs(t[3]))/2,rotate:i0,rotateZ:i0,skewX:t=>ps(Math.atan(t[1])),skewY:t=>ps(Math.atan(t[2])),skew:t=>(Math.abs(t[1])+Math.abs(t[2]))/2},r0=t=>(t=t%360,t<0&&(t+=360),t),Nv=i0,zv=t=>Math.sqrt(t[0]*t[0]+t[1]*t[1]),Pv=t=>Math.sqrt(t[4]*t[4]+t[5]*t[5]),uA={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:zv,scaleY:Pv,scale:t=>(zv(t)+Pv(t))/2,rotateX:t=>r0(ps(Math.atan2(t[6],t[5]))),rotateY:t=>r0(ps(Math.atan2(-t[2],t[0]))),rotateZ:Nv,rotate:Nv,skewX:t=>ps(Math.atan(t[4])),skewY:t=>ps(Math.atan(t[1])),skew:t=>(Math.abs(t[1])+Math.abs(t[4]))/2};function a0(t){return t.includes("scale")?1:0}function s0(t,e){if(!t||t==="none")return a0(e);const i=t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let a,s;if(i)a=uA,s=i;else{const d=t.match(/^matrix\(([-\d.e\s,]+)\)$/u);a=cA,s=d}if(!s)return a0(e);const l=a[e],c=s[1].split(",").map(fA);return typeof l=="function"?l(c):c[l]}const dA=(t,e)=>{const{transform:i="none"}=getComputedStyle(t);return s0(i,e)};function fA(t){return parseFloat(t.trim())}const Io=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Bo=new Set(Io),Uv=t=>t===Uo||t===Ae,hA=new Set(["x","y","z"]),pA=Io.filter(t=>!hA.has(t));function mA(t){const e=[];return pA.forEach(i=>{const a=t.getValue(i);a!==void 0&&(e.push([i,a.get()]),a.set(i.startsWith("scale")?1:0))}),e}const Aa={width:({x:t},{paddingLeft:e="0",paddingRight:i="0",boxSizing:a})=>{const s=t.max-t.min;return a==="border-box"?s:s-parseFloat(e)-parseFloat(i)},height:({y:t},{paddingTop:e="0",paddingBottom:i="0",boxSizing:a})=>{const s=t.max-t.min;return a==="border-box"?s:s-parseFloat(e)-parseFloat(i)},top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:(t,{transform:e})=>s0(e,"x"),y:(t,{transform:e})=>s0(e,"y")};Aa.translateX=Aa.x;Aa.translateY=Aa.y;const xs=new Set;let o0=!1,l0=!1,c0=!1;function G5(){if(l0){const t=Array.from(xs).filter(a=>a.needsMeasurement),e=new Set(t.map(a=>a.element)),i=new Map;e.forEach(a=>{const s=mA(a);s.length&&(i.set(a,s),a.render())}),t.forEach(a=>a.measureInitialState()),e.forEach(a=>{a.render();const s=i.get(a);s&&s.forEach(([l,c])=>{a.getValue(l)?.set(c)})}),t.forEach(a=>a.measureEndState()),t.forEach(a=>{a.suspendedScrollY!==void 0&&window.scrollTo(0,a.suspendedScrollY)})}l0=!1,o0=!1,xs.forEach(t=>t.complete(c0)),xs.clear()}function X5(){xs.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(l0=!0)})}function gA(){c0=!0,X5(),G5(),c0=!1}class yg{constructor(e,i,a,s,l,c=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=i,this.name=a,this.motionValue=s,this.element=l,this.isAsync=c}scheduleResolve(){this.state="scheduled",this.isAsync?(xs.add(this),o0||(o0=!0,_t.read(X5),_t.resolveKeyframes(G5))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:i,element:a,motionValue:s}=this;if(e[0]===null){const l=s?.get(),c=e[e.length-1];if(l!==void 0)e[0]=l;else if(a&&i){const d=a.readValue(i,c);d!=null&&(e[0]=d)}e[0]===void 0&&(e[0]=c),s&&l===void 0&&s.set(e[0])}lA(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),xs.delete(this)}cancel(){this.state==="scheduled"&&(xs.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const yA=t=>t.startsWith("--");function K5(t,e,i){yA(e)?t.style.setProperty(e,i):t.style[e]=i}const xA={};function Z5(t,e){const i=_5(t);return()=>xA[e]??i()}const bA=Z5(()=>window.ScrollTimeline!==void 0,"scrollTimeline"),Q5=Z5(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Wl=([t,e,i,a])=>`cubic-bezier(${t}, ${e}, ${i}, ${a})`,Iv={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Wl([0,.65,.55,1]),circOut:Wl([.55,0,1,.45]),backIn:Wl([.31,.01,.66,-.59]),backOut:Wl([.33,1.53,.69,.99])};function W5(t,e){if(t)return typeof t=="function"?Q5()?$5(t,e):"ease-out":j5(t)?Wl(t):Array.isArray(t)?t.map(i=>W5(i,e)||Iv.easeOut):Iv[t]}function vA(t,e,i,{delay:a=0,duration:s=300,repeat:l=0,repeatType:c="loop",ease:d="easeOut",times:f}={},h=void 0){const m={[e]:i};f&&(m.offset=f);const g=W5(d,s);Array.isArray(g)&&(m.easing=g);const x={delay:a,duration:s,easing:Array.isArray(g)?"linear":g,fill:"both",iterations:l+1,direction:c==="reverse"?"alternate":"normal"};return h&&(x.pseudoElement=h),t.animate(m,x)}function J5(t){return typeof t=="function"&&"applyToOptions"in t}function wA({type:t,...e}){return J5(t)&&Q5()?t.applyToOptions(e):(e.duration??(e.duration=300),e.ease??(e.ease="easeOut"),e)}class e_ extends gg{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;const{element:i,name:a,keyframes:s,pseudoElement:l,allowFlatten:c=!1,finalKeyframe:d,onComplete:f}=e;this.isPseudoElement=!!l,this.allowFlatten=c,this.options=e,og(typeof e.type!="string");const h=wA(e);this.animation=vA(i,a,s,h,l),h.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!l){const m=bf(s,this.options,d,this.speed);this.updateMotionValue&&this.updateMotionValue(m),K5(i,a,m),this.animation.cancel()}f?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:e}=this;e==="idle"||e==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){const e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){const e=this.animation.effect?.getComputedTiming?.().duration||0;return Yi(Number(e))}get iterationDuration(){const{delay:e=0}=this.options||{};return this.duration+Yi(e)}get time(){return Yi(Number(this.animation.currentTime)||0)}set time(e){const i=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=_i(e),i&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:i,rangeEnd:a,observe:s}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,e&&bA()?(this.animation.timeline=e,i&&(this.animation.rangeStart=i),a&&(this.animation.rangeEnd=a),Ki):s(this)}}const t_={anticipate:D5,backInOut:R5,circInOut:M5};function SA(t){return t in t_}function _A(t){typeof t.ease=="string"&&SA(t.ease)&&(t.ease=t_[t.ease])}const cm=10;class TA extends e_{constructor(e){_A(e),Y5(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){const{motionValue:i,onUpdate:a,onComplete:s,element:l,...c}=this.options;if(!i)return;if(e!==void 0){i.set(e);return}const d=new Jd({...c,autoplay:!1}),f=Math.max(cm,In.now()-this.startTime),h=Rr(0,cm,f-cm),m=d.sample(f).value,{name:g}=this.options;l&&g&&K5(l,g,m),i.setWithVelocity(d.sample(Math.max(0,f-h)).value,m,h),d.stop()}}const Bv=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(rr.test(t)||t==="0")&&!t.startsWith("url("));function EA(t){const e=t[0];if(t.length===1)return!0;for(let i=0;i<t.length;i++)if(t[i]!==e)return!0}function CA(t,e,i,a){const s=t[0];if(s===null)return!1;if(e==="display"||e==="visibility")return!0;const l=t[t.length-1],c=Bv(s,e),d=Bv(l,e);return!c||!d?!1:EA(t)||(i==="spring"||J5(i))&&a}function u0(t){t.duration=0,t.type="keyframes"}const n_=new Set(["opacity","clipPath","filter","transform"]),kA=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function AA(t){for(let e=0;e<t.length;e++)if(typeof t[e]=="string"&&kA.test(t[e]))return!0;return!1}const RA=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),DA=_5(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function OA(t){const{motionValue:e,name:i,repeatDelay:a,repeatType:s,damping:l,type:c,keyframes:d}=t;if(!(e?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:h,transformTemplate:m}=e.owner.getProps();return DA()&&i&&(n_.has(i)||RA.has(i)&&AA(d))&&(i!=="transform"||!m)&&!h&&!a&&s!=="mirror"&&l!==0&&c!=="inertia"}const MA=40;class LA extends gg{constructor({autoplay:e=!0,delay:i=0,type:a="keyframes",repeat:s=0,repeatDelay:l=0,repeatType:c="loop",keyframes:d,name:f,motionValue:h,element:m,...g}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=In.now();const x={autoplay:e,delay:i,type:a,repeat:s,repeatDelay:l,repeatType:c,name:f,motionValue:h,element:m,...g},_=m?.KeyframeResolver||yg;this.keyframeResolver=new _(d,(w,v,S)=>this.onKeyframesResolved(w,v,x,!S),f,h,m),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,i,a,s){this.keyframeResolver=void 0;const{name:l,type:c,velocity:d,delay:f,isHandoff:h,onUpdate:m}=a;this.resolvedAt=In.now();let g=!0;CA(e,l,c,d)||(g=!1,(za.instantAnimations||!f)&&m?.(bf(e,a,i)),e[0]=e[e.length-1],u0(a),a.repeat=0);const _={startTime:s?this.resolvedAt?this.resolvedAt-this.createdAt>MA?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:i,...a,keyframes:e},w=g&&!h&&OA(_),v=_.motionValue?.owner?.current;let S;if(w)try{S=new TA({..._,element:v})}catch{S=new Jd(_)}else S=new Jd(_);S.finished.then(()=>{this.notifyFinished()}).catch(Ki),this.pendingTimeline&&(this.stopTimeline=S.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=S}get finished(){return this._animation?this.animation.finished:this._finished}then(e,i){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),gA()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}function i_(t,e,i,a=0,s=1){const l=Array.from(t).sort((h,m)=>h.sortNodePosition(m)).indexOf(e),c=t.size,d=(c-1)*a;return typeof i=="function"?i(l,c):s===1?l*a:d-l*a}const jA=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function NA(t){const e=jA.exec(t);if(!e)return[,];const[,i,a,s]=e;return[`--${i??a}`,s]}function r_(t,e,i=1){const[a,s]=NA(t);if(!a)return;const l=window.getComputedStyle(e).getPropertyValue(a);if(l){const c=l.trim();return v5(c)?parseFloat(c):c}return dg(s)?r_(s,e,i+1):s}const zA={type:"spring",stiffness:500,damping:25,restSpeed:10},PA=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),UA={type:"keyframes",duration:.8},IA={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},BA=(t,{keyframes:e})=>e.length>2?UA:Bo.has(t)?t.startsWith("scale")?PA(e[1]):zA:IA;function a_(t,e){if(t?.inherit&&e){const{inherit:i,...a}=t;return{...e,...a}}return t}function xg(t,e){const i=t?.[e]??t?.default??t;return i!==t?a_(i,t):i}const VA=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed"]);function FA(t){for(const e in t)if(!VA.has(e))return!0;return!1}const bg=(t,e,i,a={},s,l)=>c=>{const d=xg(a,t)||{},f=d.delay||a.delay||0;let{elapsed:h=0}=a;h=h-_i(f);const m={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:e.getVelocity(),...d,delay:-h,onUpdate:x=>{e.set(x),d.onUpdate&&d.onUpdate(x)},onComplete:()=>{c(),d.onComplete&&d.onComplete()},name:t,motionValue:e,element:l?void 0:s};FA(d)||Object.assign(m,BA(t,m)),m.duration&&(m.duration=_i(m.duration)),m.repeatDelay&&(m.repeatDelay=_i(m.repeatDelay)),m.from!==void 0&&(m.keyframes[0]=m.from);let g=!1;if((m.type===!1||m.duration===0&&!m.repeatDelay)&&(u0(m),m.delay===0&&(g=!0)),(za.instantAnimations||za.skipAnimations||s?.shouldSkipAnimations)&&(g=!0,u0(m),m.delay=0),m.allowFlatten=!d.type&&!d.ease,g&&!l&&e.get()!==void 0){const x=bf(m.keyframes,d);if(x!==void 0){_t.update(()=>{m.onUpdate(x),m.onComplete()});return}}return d.isSync?new Jd(m):new LA(m)};function Vv(t){const e=[{},{}];return t?.values.forEach((i,a)=>{e[0][a]=i.get(),e[1][a]=i.getVelocity()}),e}function vg(t,e,i,a){if(typeof e=="function"){const[s,l]=Vv(a);e=e(i!==void 0?i:t.custom,s,l)}if(typeof e=="string"&&(e=t.variants&&t.variants[e]),typeof e=="function"){const[s,l]=Vv(a);e=e(i!==void 0?i:t.custom,s,l)}return e}function bs(t,e,i){const a=t.getProps();return vg(a,e,i!==void 0?i:a.custom,t)}const s_=new Set(["width","height","top","left","right","bottom",...Io]),Fv=30,HA=t=>!isNaN(parseFloat(t));class $A{constructor(e,i={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=a=>{const s=In.now();if(this.updatedAt!==s&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(a),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const l of this.dependents)l.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=i.owner}setCurrent(e){this.current=e,this.updatedAt=In.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=HA(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,i){this.events[e]||(this.events[e]=new lg);const a=this.events[e].add(i);return e==="change"?()=>{a(),_t.read(()=>{this.events.change.getSize()||this.stop()})}:a}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,i){this.passiveEffect=e,this.stopPassiveEffect=i}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,i,a){this.set(i),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-a}jump(e,i=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,i&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||(this.dependents=new Set),this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=In.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>Fv)return 0;const i=Math.min(this.updatedAt-this.prevUpdatedAt,Fv);return T5(parseFloat(this.current)-parseFloat(this.prevFrameValue),i)}start(e){return this.stop(),new Promise(i=>{this.hasAnimated=!0,this.animation=e(i),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function Ro(t,e){return new $A(t,e)}const d0=t=>Array.isArray(t);function qA(t,e,i){t.hasValue(e)?t.getValue(e).set(i):t.addValue(e,Ro(i))}function YA(t){return d0(t)?t[t.length-1]||0:t}function GA(t,e){const i=bs(t,e);let{transitionEnd:a={},transition:s={},...l}=i||{};l={...l,...a};for(const c in l){const d=YA(l[c]);qA(t,c,d)}}const Tn=t=>!!(t&&t.getVelocity);function XA(t){return!!(Tn(t)&&t.add)}function f0(t,e){const i=t.getValue("willChange");if(XA(i))return i.add(e);if(!i&&za.WillChange){const a=new za.WillChange("auto");t.addValue("willChange",a),a.add(e)}}function wg(t){return t.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}const KA="framerAppearId",o_="data-"+wg(KA);function l_(t){return t.props[o_]}function ZA({protectedKeys:t,needsAnimating:e},i){const a=t.hasOwnProperty(i)&&e[i]!==!0;return e[i]=!1,a}function c_(t,e,{delay:i=0,transitionOverride:a,type:s}={}){let{transition:l,transitionEnd:c,...d}=e;const f=t.getDefaultTransition();l=l?a_(l,f):f;const h=l?.reduceMotion;a&&(l=a);const m=[],g=s&&t.animationState&&t.animationState.getState()[s];for(const x in d){const _=t.getValue(x,t.latestValues[x]??null),w=d[x];if(w===void 0||g&&ZA(g,x))continue;const v={delay:i,...xg(l||{},x)},S=_.get();if(S!==void 0&&!_.isAnimating()&&!Array.isArray(w)&&w===S&&!v.velocity){_t.update(()=>_.set(w));continue}let C=!1;if(window.MotionHandoffAnimation){const L=l_(t);if(L){const O=window.MotionHandoffAnimation(L,x,_t);O!==null&&(v.startTime=O,C=!0)}}f0(t,x);const M=h??t.shouldReduceMotion;_.start(bg(x,_,w,M&&s_.has(x)?{type:!1}:v,t,C));const R=_.animation;R&&m.push(R)}if(c){const x=()=>_t.update(()=>{c&&GA(t,c)});m.length?Promise.all(m).then(x):x()}return m}function h0(t,e,i={}){const a=bs(t,e,i.type==="exit"?t.presenceContext?.custom:void 0);let{transition:s=t.getDefaultTransition()||{}}=a||{};i.transitionOverride&&(s=i.transitionOverride);const l=a?()=>Promise.all(c_(t,a,i)):()=>Promise.resolve(),c=t.variantChildren&&t.variantChildren.size?(f=0)=>{const{delayChildren:h=0,staggerChildren:m,staggerDirection:g}=s;return QA(t,e,f,h,m,g,i)}:()=>Promise.resolve(),{when:d}=s;if(d){const[f,h]=d==="beforeChildren"?[l,c]:[c,l];return f().then(()=>h())}else return Promise.all([l(),c(i.delay)])}function QA(t,e,i=0,a=0,s=0,l=1,c){const d=[];for(const f of t.variantChildren)f.notify("AnimationStart",e),d.push(h0(f,e,{...c,delay:i+(typeof a=="function"?0:a)+i_(t.variantChildren,f,a,s,l)}).then(()=>f.notify("AnimationComplete",e)));return Promise.all(d)}function WA(t,e,i={}){t.notify("AnimationStart",e);let a;if(Array.isArray(e)){const s=e.map(l=>h0(t,l,i));a=Promise.all(s)}else if(typeof e=="string")a=h0(t,e,i);else{const s=typeof e=="function"?bs(t,e,i.custom):e;a=Promise.all(c_(t,s,i))}return a.then(()=>{t.notify("AnimationComplete",e)})}const JA={test:t=>t==="auto",parse:t=>t},u_=t=>e=>e.test(t),d_=[Uo,Ae,Er,ka,Ek,Tk,JA],Hv=t=>d_.find(u_(t));function e6(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||S5(t):!0}const t6=new Set(["brightness","contrast","saturate","opacity"]);function n6(t){const[e,i]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;const[a]=i.match(fg)||[];if(!a)return t;const s=i.replace(a,"");let l=t6.has(e)?1:0;return a!==i&&(l*=100),e+"("+l+s+")"}const i6=/\b([a-z-]*)\(.*?\)/gu,p0={...rr,getAnimatableNone:t=>{const e=t.match(i6);return e?e.map(n6).join(" "):t}},m0={...rr,getAnimatableNone:t=>{const e=rr.parse(t);return rr.createTransformer(t)(e.map(a=>typeof a=="number"?0:typeof a=="object"?{...a,alpha:1}:a))}},$v={...Uo,transform:Math.round},r6={rotate:ka,rotateX:ka,rotateY:ka,rotateZ:ka,scale:rd,scaleX:rd,scaleY:rd,scaleZ:rd,skew:ka,skewX:ka,skewY:ka,distance:Ae,translateX:Ae,translateY:Ae,translateZ:Ae,x:Ae,y:Ae,z:Ae,perspective:Ae,transformPerspective:Ae,opacity:hc,originX:Dv,originY:Dv,originZ:Ae},Sg={borderWidth:Ae,borderTopWidth:Ae,borderRightWidth:Ae,borderBottomWidth:Ae,borderLeftWidth:Ae,borderRadius:Ae,borderTopLeftRadius:Ae,borderTopRightRadius:Ae,borderBottomRightRadius:Ae,borderBottomLeftRadius:Ae,width:Ae,maxWidth:Ae,height:Ae,maxHeight:Ae,top:Ae,right:Ae,bottom:Ae,left:Ae,inset:Ae,insetBlock:Ae,insetBlockStart:Ae,insetBlockEnd:Ae,insetInline:Ae,insetInlineStart:Ae,insetInlineEnd:Ae,padding:Ae,paddingTop:Ae,paddingRight:Ae,paddingBottom:Ae,paddingLeft:Ae,paddingBlock:Ae,paddingBlockStart:Ae,paddingBlockEnd:Ae,paddingInline:Ae,paddingInlineStart:Ae,paddingInlineEnd:Ae,margin:Ae,marginTop:Ae,marginRight:Ae,marginBottom:Ae,marginLeft:Ae,marginBlock:Ae,marginBlockStart:Ae,marginBlockEnd:Ae,marginInline:Ae,marginInlineStart:Ae,marginInlineEnd:Ae,fontSize:Ae,backgroundPositionX:Ae,backgroundPositionY:Ae,...r6,zIndex:$v,fillOpacity:hc,strokeOpacity:hc,numOctaves:$v},a6={...Sg,color:en,backgroundColor:en,outlineColor:en,fill:en,stroke:en,borderColor:en,borderTopColor:en,borderRightColor:en,borderBottomColor:en,borderLeftColor:en,filter:p0,WebkitFilter:p0,mask:m0,WebkitMask:m0},f_=t=>a6[t],s6=new Set([p0,m0]);function h_(t,e){let i=f_(t);return s6.has(i)||(i=rr),i.getAnimatableNone?i.getAnimatableNone(e):void 0}const o6=new Set(["auto","none","0"]);function l6(t,e,i){let a=0,s;for(;a<t.length&&!s;){const l=t[a];typeof l=="string"&&!o6.has(l)&&Ao(l).values.length&&(s=t[a]),a++}if(s&&i)for(const l of e)t[l]=h_(i,s)}class c6 extends yg{constructor(e,i,a,s,l){super(e,i,a,s,l,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:i,name:a}=this;if(!i||!i.current)return;super.readKeyframes();for(let m=0;m<e.length;m++){let g=e[m];if(typeof g=="string"&&(g=g.trim(),dg(g))){const x=r_(g,i.current);x!==void 0&&(e[m]=x),m===e.length-1&&(this.finalKeyframe=g)}}if(this.resolveNoneKeyframes(),!s_.has(a)||e.length!==2)return;const[s,l]=e,c=Hv(s),d=Hv(l),f=Rv(s),h=Rv(l);if(f!==h&&Aa[a]){this.needsMeasurement=!0;return}if(c!==d)if(Uv(c)&&Uv(d))for(let m=0;m<e.length;m++){const g=e[m];typeof g=="string"&&(e[m]=parseFloat(g))}else Aa[a]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:i}=this,a=[];for(let s=0;s<e.length;s++)(e[s]===null||e6(e[s]))&&a.push(s);a.length&&l6(e,a,i)}measureInitialState(){const{element:e,unresolvedKeyframes:i,name:a}=this;if(!e||!e.current)return;a==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Aa[a](e.measureViewportBox(),window.getComputedStyle(e.current)),i[0]=this.measuredOrigin;const s=i[i.length-1];s!==void 0&&e.getValue(a,s).jump(s,!1)}measureEndState(){const{element:e,name:i,unresolvedKeyframes:a}=this;if(!e||!e.current)return;const s=e.getValue(i);s&&s.jump(this.measuredOrigin,!1);const l=a.length-1,c=a[l];a[l]=Aa[i](e.measureViewportBox(),window.getComputedStyle(e.current)),c!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=c),this.removedTransforms?.length&&this.removedTransforms.forEach(([d,f])=>{e.getValue(d).set(f)}),this.resolveNoneKeyframes()}}function _g(t,e,i){if(t==null)return[];if(t instanceof EventTarget)return[t];if(typeof t=="string"){const s=document.querySelectorAll(t);return s?Array.from(s):[]}return Array.from(t).filter(a=>a!=null)}const p_=(t,e)=>e&&typeof t=="number"?e.transform(t):t;function Ad(t){return w5(t)&&"offsetHeight"in t&&!("ownerSVGElement"in t)}const{schedule:Tg}=N5(queueMicrotask,!1),ir={x:!1,y:!1};function m_(){return ir.x||ir.y}function u6(t){return t==="x"||t==="y"?ir[t]?null:(ir[t]=!0,()=>{ir[t]=!1}):ir.x||ir.y?null:(ir.x=ir.y=!0,()=>{ir.x=ir.y=!1})}function g_(t,e){const i=_g(t),a=new AbortController,s={passive:!0,...e,signal:a.signal};return[i,s,()=>a.abort()]}function d6(t){return!(t.pointerType==="touch"||m_())}function f6(t,e,i={}){const[a,s,l]=g_(t,i);return a.forEach(c=>{let d=!1,f=!1,h;const m=()=>{c.removeEventListener("pointerleave",w)},g=S=>{h&&(h(S),h=void 0),m()},x=S=>{d=!1,window.removeEventListener("pointerup",x),window.removeEventListener("pointercancel",x),f&&(f=!1,g(S))},_=()=>{d=!0,window.addEventListener("pointerup",x,s),window.addEventListener("pointercancel",x,s)},w=S=>{if(S.pointerType!=="touch"){if(d){f=!0;return}g(S)}},v=S=>{if(!d6(S))return;f=!1;const C=e(c,S);typeof C=="function"&&(h=C,c.addEventListener("pointerleave",w,s))};c.addEventListener("pointerenter",v,s),c.addEventListener("pointerdown",_,s)}),l}const y_=(t,e)=>e?t===e?!0:y_(t,e.parentElement):!1,Eg=t=>t.pointerType==="mouse"?typeof t.button!="number"||t.button<=0:t.isPrimary!==!1,h6=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function p6(t){return h6.has(t.tagName)||t.isContentEditable===!0}const m6=new Set(["INPUT","SELECT","TEXTAREA"]);function g6(t){return m6.has(t.tagName)||t.isContentEditable===!0}const Rd=new WeakSet;function qv(t){return e=>{e.key==="Enter"&&t(e)}}function um(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const y6=(t,e)=>{const i=t.currentTarget;if(!i)return;const a=qv(()=>{if(Rd.has(i))return;um(i,"down");const s=qv(()=>{um(i,"up")}),l=()=>um(i,"cancel");i.addEventListener("keyup",s,e),i.addEventListener("blur",l,e)});i.addEventListener("keydown",a,e),i.addEventListener("blur",()=>i.removeEventListener("keydown",a),e)};function Yv(t){return Eg(t)&&!m_()}const Gv=new WeakSet;function x6(t,e,i={}){const[a,s,l]=g_(t,i),c=d=>{const f=d.currentTarget;if(!Yv(d)||Gv.has(d))return;Rd.add(f),i.stopPropagation&&Gv.add(d);const h=e(f,d),m=(_,w)=>{window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",x),Rd.has(f)&&Rd.delete(f),Yv(_)&&typeof h=="function"&&h(_,{success:w})},g=_=>{m(_,f===window||f===document||i.useGlobalTarget||y_(f,_.target))},x=_=>{m(_,!1)};window.addEventListener("pointerup",g,s),window.addEventListener("pointercancel",x,s)};return a.forEach(d=>{(i.useGlobalTarget?window:d).addEventListener("pointerdown",c,s),Ad(d)&&(d.addEventListener("focus",h=>y6(h,s)),!p6(d)&&!d.hasAttribute("tabindex")&&(d.tabIndex=0))}),l}function Cg(t){return w5(t)&&"ownerSVGElement"in t}const Dd=new WeakMap;let Od;const x_=(t,e,i)=>(a,s)=>s&&s[0]?s[0][t+"Size"]:Cg(a)&&"getBBox"in a?a.getBBox()[e]:a[i],b6=x_("inline","width","offsetWidth"),v6=x_("block","height","offsetHeight");function w6({target:t,borderBoxSize:e}){Dd.get(t)?.forEach(i=>{i(t,{get width(){return b6(t,e)},get height(){return v6(t,e)}})})}function S6(t){t.forEach(w6)}function _6(){typeof ResizeObserver>"u"||(Od=new ResizeObserver(S6))}function T6(t,e){Od||_6();const i=_g(t);return i.forEach(a=>{let s=Dd.get(a);s||(s=new Set,Dd.set(a,s)),s.add(e),Od?.observe(a)}),()=>{i.forEach(a=>{const s=Dd.get(a);s?.delete(e),s?.size||Od?.unobserve(a)})}}const Md=new Set;let xo;function E6(){xo=()=>{const t={get width(){return window.innerWidth},get height(){return window.innerHeight}};Md.forEach(e=>e(t))},window.addEventListener("resize",xo)}function C6(t){return Md.add(t),xo||E6(),()=>{Md.delete(t),!Md.size&&typeof xo=="function"&&(window.removeEventListener("resize",xo),xo=void 0)}}function Xv(t,e){return typeof t=="function"?C6(t):T6(t,e)}function k6(t){return Cg(t)&&t.tagName==="svg"}const A6=[...d_,en,rr],R6=t=>A6.find(u_(t)),Kv=()=>({translate:0,scale:1,origin:0,originPoint:0}),bo=()=>({x:Kv(),y:Kv()}),Zv=()=>({min:0,max:0}),dn=()=>({x:Zv(),y:Zv()}),D6=new WeakMap;function vf(t){return t!==null&&typeof t=="object"&&typeof t.start=="function"}function pc(t){return typeof t=="string"||Array.isArray(t)}const kg=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Ag=["initial",...kg];function wf(t){return vf(t.animate)||Ag.some(e=>pc(t[e]))}function b_(t){return!!(wf(t)||t.variants)}function O6(t,e,i){for(const a in e){const s=e[a],l=i[a];if(Tn(s))t.addValue(a,s);else if(Tn(l))t.addValue(a,Ro(s,{owner:t}));else if(l!==s)if(t.hasValue(a)){const c=t.getValue(a);c.liveStyle===!0?c.jump(s):c.hasAnimated||c.set(s)}else{const c=t.getStaticValue(a);t.addValue(a,Ro(c!==void 0?c:s,{owner:t}))}}for(const a in i)e[a]===void 0&&t.removeValue(a);return e}const g0={current:null},v_={current:!1},M6=typeof window<"u";function L6(){if(v_.current=!0,!!M6)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>g0.current=t.matches;t.addEventListener("change",e),e()}else g0.current=!1}const Qv=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];let ef={};function w_(t){ef=t}function j6(){return ef}class N6{scrapeMotionValuesFromProps(e,i,a){return{}}constructor({parent:e,props:i,presenceContext:a,reducedMotionConfig:s,skipAnimations:l,blockInitialAnimation:c,visualState:d},f={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=yg,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const _=In.now();this.renderScheduledAt<_&&(this.renderScheduledAt=_,_t.render(this.render,!1,!0))};const{latestValues:h,renderState:m}=d;this.latestValues=h,this.baseTarget={...h},this.initialValues=i.initial?{...h}:{},this.renderState=m,this.parent=e,this.props=i,this.presenceContext=a,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.skipAnimationsConfig=l,this.options=f,this.blockInitialAnimation=!!c,this.isControllingVariants=wf(i),this.isVariantNode=b_(i),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:g,...x}=this.scrapeMotionValuesFromProps(i,{},this);for(const _ in x){const w=x[_];h[_]!==void 0&&Tn(w)&&w.set(h[_])}}mount(e){if(this.hasBeenMounted)for(const i in this.initialValues)this.values.get(i)?.jump(this.initialValues[i]),this.latestValues[i]=this.initialValues[i];this.current=e,D6.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((i,a)=>this.bindToMotionValue(a,i)),this.reducedMotionConfig==="never"?this.shouldReduceMotion=!1:this.reducedMotionConfig==="always"?this.shouldReduceMotion=!0:(v_.current||L6(),this.shouldReduceMotion=g0.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),Pa(this.notifyUpdate),Pa(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const e in this.events)this.events[e].clear();for(const e in this.features){const i=this.features[e];i&&(i.unmount(),i.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,i){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),i.accelerate&&n_.has(e)&&this.current instanceof HTMLElement){const{factory:c,keyframes:d,times:f,ease:h,duration:m}=i.accelerate,g=new e_({element:this.current,name:e,keyframes:d,times:f,ease:h,duration:_i(m)}),x=c(g);this.valueSubscriptions.set(e,()=>{x(),g.cancel()});return}const a=Bo.has(e);a&&this.onBindTransform&&this.onBindTransform();const s=i.on("change",c=>{this.latestValues[e]=c,this.props.onUpdate&&_t.preRender(this.notifyUpdate),a&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let l;typeof window<"u"&&window.MotionCheckAppearSync&&(l=window.MotionCheckAppearSync(this,e,i)),this.valueSubscriptions.set(e,()=>{s(),l&&l(),i.owner&&i.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in ef){const i=ef[e];if(!i)continue;const{isEnabled:a,Feature:s}=i;if(!this.features[e]&&s&&a(this.props)&&(this.features[e]=new s(this)),this.features[e]){const l=this.features[e];l.isMounted?l.update():(l.mount(),l.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):dn()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,i){this.latestValues[e]=i}update(e,i){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=i;for(let a=0;a<Qv.length;a++){const s=Qv[a];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const l="on"+s,c=e[l];c&&(this.propEventSubscriptions[s]=this.on(s,c))}this.prevMotionValues=O6(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const i=this.getClosestVariantNode();if(i)return i.variantChildren&&i.variantChildren.add(e),()=>i.variantChildren.delete(e)}addValue(e,i){const a=this.values.get(e);i!==a&&(a&&this.removeValue(e),this.bindToMotionValue(e,i),this.values.set(e,i),this.latestValues[e]=i.get())}removeValue(e){this.values.delete(e);const i=this.valueSubscriptions.get(e);i&&(i(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,i){if(this.props.values&&this.props.values[e])return this.props.values[e];let a=this.values.get(e);return a===void 0&&i!==void 0&&(a=Ro(i===null?void 0:i,{owner:this}),this.addValue(e,a)),a}readValue(e,i){let a=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return a!=null&&(typeof a=="string"&&(v5(a)||S5(a))?a=parseFloat(a):!R6(a)&&rr.test(i)&&(a=h_(e,i)),this.setBaseTarget(e,Tn(a)?a.get():a)),Tn(a)?a.get():a}setBaseTarget(e,i){this.baseTarget[e]=i}getBaseTarget(e){const{initial:i}=this.props;let a;if(typeof i=="string"||typeof i=="object"){const l=vg(this.props,i,this.presenceContext?.custom);l&&(a=l[e])}if(i&&a!==void 0)return a;const s=this.getBaseTargetFromProps(this.props,e);return s!==void 0&&!Tn(s)?s:this.initialValues[e]!==void 0&&a===void 0?void 0:this.baseTarget[e]}on(e,i){return this.events[e]||(this.events[e]=new lg),this.events[e].add(i)}notify(e,...i){this.events[e]&&this.events[e].notify(...i)}scheduleRenderMicrotask(){Tg.render(this.render)}}class S_ extends N6{constructor(){super(...arguments),this.KeyframeResolver=c6}sortInstanceNodePosition(e,i){return e.compareDocumentPosition(i)&2?1:-1}getBaseTargetFromProps(e,i){const a=e.style;return a?a[i]:void 0}removeValueFromRenderState(e,{vars:i,style:a}){delete i[e],delete a[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;Tn(e)&&(this.childSubscription=e.on("change",i=>{this.current&&(this.current.textContent=`${i}`)}))}}class Va{constructor(e){this.isMounted=!1,this.node=e}update(){}}function __({top:t,left:e,right:i,bottom:a}){return{x:{min:e,max:i},y:{min:t,max:a}}}function z6({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}function P6(t,e){if(!e)return t;const i=e({x:t.left,y:t.top}),a=e({x:t.right,y:t.bottom});return{top:i.y,left:i.x,bottom:a.y,right:a.x}}function dm(t){return t===void 0||t===1}function y0({scale:t,scaleX:e,scaleY:i}){return!dm(t)||!dm(e)||!dm(i)}function us(t){return y0(t)||T_(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function T_(t){return Wv(t.x)||Wv(t.y)}function Wv(t){return t&&t!=="0%"}function tf(t,e,i){const a=t-i,s=e*a;return i+s}function Jv(t,e,i,a,s){return s!==void 0&&(t=tf(t,s,a)),tf(t,i,a)+e}function x0(t,e=0,i=1,a,s){t.min=Jv(t.min,e,i,a,s),t.max=Jv(t.max,e,i,a,s)}function E_(t,{x:e,y:i}){x0(t.x,e.translate,e.scale,e.originPoint),x0(t.y,i.translate,i.scale,i.originPoint)}const e2=.999999999999,t2=1.0000000000001;function U6(t,e,i,a=!1){const s=i.length;if(!s)return;e.x=e.y=1;let l,c;for(let d=0;d<s;d++){l=i[d],c=l.projectionDelta;const{visualElement:f}=l.options;f&&f.props.style&&f.props.style.display==="contents"||(a&&l.options.layoutScroll&&l.scroll&&l!==l.root&&(xr(t.x,-l.scroll.offset.x),xr(t.y,-l.scroll.offset.y)),c&&(e.x*=c.x.scale,e.y*=c.y.scale,E_(t,c)),a&&us(l.latestValues)&&Ld(t,l.latestValues,l.layout?.layoutBox))}e.x<t2&&e.x>e2&&(e.x=1),e.y<t2&&e.y>e2&&(e.y=1)}function xr(t,e){t.min+=e,t.max+=e}function n2(t,e,i,a,s=.5){const l=Ot(t.min,t.max,s);x0(t,e,i,l,a)}function i2(t,e){return typeof t=="string"?parseFloat(t)/100*(e.max-e.min):t}function Ld(t,e,i){const a=i??t;n2(t.x,i2(e.x,a.x),e.scaleX,e.scale,e.originX),n2(t.y,i2(e.y,a.y),e.scaleY,e.scale,e.originY)}function C_(t,e){return __(P6(t.getBoundingClientRect(),e))}function I6(t,e,i){const a=C_(t,i),{scroll:s}=e;return s&&(xr(a.x,s.offset.x),xr(a.y,s.offset.y)),a}const B6={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},V6=Io.length;function F6(t,e,i){let a="",s=!0;for(let l=0;l<V6;l++){const c=Io[l],d=t[c];if(d===void 0)continue;let f=!0;if(typeof d=="number")f=d===(c.startsWith("scale")?1:0);else{const h=parseFloat(d);f=c.startsWith("scale")?h===1:h===0}if(!f||i){const h=p_(d,Sg[c]);if(!f){s=!1;const m=B6[c]||c;a+=`${m}(${h}) `}i&&(e[c]=h)}}return a=a.trim(),i?a=i(e,s?"":a):s&&(a="none"),a}function Rg(t,e,i){const{style:a,vars:s,transformOrigin:l}=t;let c=!1,d=!1;for(const f in e){const h=e[f];if(Bo.has(f)){c=!0;continue}else if(P5(f)){s[f]=h;continue}else{const m=p_(h,Sg[f]);f.startsWith("origin")?(d=!0,l[f]=m):a[f]=m}}if(e.transform||(c||i?a.transform=F6(e,t.transform,i):a.transform&&(a.transform="none")),d){const{originX:f="50%",originY:h="50%",originZ:m=0}=l;a.transformOrigin=`${f} ${h} ${m}`}}function k_(t,{style:e,vars:i},a,s){const l=t.style;let c;for(c in e)l[c]=e[c];s?.applyProjectionStyles(l,a);for(c in i)l.setProperty(c,i[c])}function r2(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}const Il={correct:(t,e)=>{if(!e.target)return t;if(typeof t=="string")if(Ae.test(t))t=parseFloat(t);else return t;const i=r2(t,e.target.x),a=r2(t,e.target.y);return`${i}% ${a}%`}},H6={correct:(t,{treeScale:e,projectionDelta:i})=>{const a=t,s=rr.parse(t);if(s.length>5)return a;const l=rr.createTransformer(t),c=typeof s[0]!="number"?1:0,d=i.x.scale*e.x,f=i.y.scale*e.y;s[0+c]/=d,s[1+c]/=f;const h=Ot(d,f,.5);return typeof s[2+c]=="number"&&(s[2+c]/=h),typeof s[3+c]=="number"&&(s[3+c]/=h),l(s)}},b0={borderRadius:{...Il,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Il,borderTopRightRadius:Il,borderBottomLeftRadius:Il,borderBottomRightRadius:Il,boxShadow:H6};function A_(t,{layout:e,layoutId:i}){return Bo.has(t)||t.startsWith("origin")||(e||i!==void 0)&&(!!b0[t]||t==="opacity")}function Dg(t,e,i){const a=t.style,s=e?.style,l={};if(!a)return l;for(const c in a)(Tn(a[c])||s&&Tn(s[c])||A_(c,t)||i?.getValue(c)?.liveStyle!==void 0)&&(l[c]=a[c]);return l}function $6(t){return window.getComputedStyle(t)}class q6 extends S_{constructor(){super(...arguments),this.type="html",this.renderInstance=k_}readValueFromInstance(e,i){if(Bo.has(i))return this.projection?.isProjecting?a0(i):dA(e,i);{const a=$6(e),s=(P5(i)?a.getPropertyValue(i):a[i])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:i}){return C_(e,i)}build(e,i,a){Rg(e,i,a.transformTemplate)}scrapeMotionValuesFromProps(e,i,a){return Dg(e,i,a)}}const Y6={offset:"stroke-dashoffset",array:"stroke-dasharray"},G6={offset:"strokeDashoffset",array:"strokeDasharray"};function X6(t,e,i=1,a=0,s=!0){t.pathLength=1;const l=s?Y6:G6;t[l.offset]=`${-a}`,t[l.array]=`${e} ${i}`}const K6=["offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function R_(t,{attrX:e,attrY:i,attrScale:a,pathLength:s,pathSpacing:l=1,pathOffset:c=0,...d},f,h,m){if(Rg(t,d,h),f){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};const{attrs:g,style:x}=t;g.transform&&(x.transform=g.transform,delete g.transform),(x.transform||g.transformOrigin)&&(x.transformOrigin=g.transformOrigin??"50% 50%",delete g.transformOrigin),x.transform&&(x.transformBox=m?.transformBox??"fill-box",delete g.transformBox);for(const _ of K6)g[_]!==void 0&&(x[_]=g[_],delete g[_]);e!==void 0&&(g.x=e),i!==void 0&&(g.y=i),a!==void 0&&(g.scale=a),s!==void 0&&X6(g,s,l,c,!1)}const D_=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),O_=t=>typeof t=="string"&&t.toLowerCase()==="svg";function Z6(t,e,i,a){k_(t,e,void 0,a);for(const s in e.attrs)t.setAttribute(D_.has(s)?s:wg(s),e.attrs[s])}function M_(t,e,i){const a=Dg(t,e,i);for(const s in t)if(Tn(t[s])||Tn(e[s])){const l=Io.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;a[l]=t[s]}return a}class Q6 extends S_{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=dn}getBaseTargetFromProps(e,i){return e[i]}readValueFromInstance(e,i){if(Bo.has(i)){const a=f_(i);return a&&a.default||0}return i=D_.has(i)?i:wg(i),e.getAttribute(i)}scrapeMotionValuesFromProps(e,i,a){return M_(e,i,a)}build(e,i,a){R_(e,i,this.isSVGTag,a.transformTemplate,a.style)}renderInstance(e,i,a,s){Z6(e,i,a,s)}mount(e){this.isSVGTag=O_(e.tagName),super.mount(e)}}const W6=Ag.length;function L_(t){if(!t)return;if(!t.isControllingVariants){const i=t.parent?L_(t.parent)||{}:{};return t.props.initial!==void 0&&(i.initial=t.props.initial),i}const e={};for(let i=0;i<W6;i++){const a=Ag[i],s=t.props[a];(pc(s)||s===!1)&&(e[a]=s)}return e}function j_(t,e){if(!Array.isArray(e))return!1;const i=e.length;if(i!==t.length)return!1;for(let a=0;a<i;a++)if(e[a]!==t[a])return!1;return!0}const J6=[...kg].reverse(),e8=kg.length;function t8(t){return e=>Promise.all(e.map(({animation:i,options:a})=>WA(t,i,a)))}function n8(t){let e=t8(t),i=a2(),a=!0,s=!1;const l=h=>(m,g)=>{const x=bs(t,g,h==="exit"?t.presenceContext?.custom:void 0);if(x){const{transition:_,transitionEnd:w,...v}=x;m={...m,...v,...w}}return m};function c(h){e=h(t)}function d(h){const{props:m}=t,g=L_(t.parent)||{},x=[],_=new Set;let w={},v=1/0;for(let C=0;C<e8;C++){const M=J6[C],R=i[M],L=m[M]!==void 0?m[M]:g[M],O=pc(L),j=M===h?R.isActive:null;j===!1&&(v=C);let k=L===g[M]&&L!==m[M]&&O;if(k&&(a||s)&&t.manuallyAnimateOnMount&&(k=!1),R.protectedKeys={...w},!R.isActive&&j===null||!L&&!R.prevProp||vf(L)||typeof L=="boolean")continue;if(M==="exit"&&R.isActive&&j!==!0){R.prevResolvedValues&&(w={...w,...R.prevResolvedValues});continue}const U=i8(R.prevProp,L);let I=U||M===h&&R.isActive&&!k&&O||C>v&&O,Y=!1;const W=Array.isArray(L)?L:[L];let te=W.reduce(l(M),{});j===!1&&(te={});const{prevResolvedValues:me={}}=R,we={...me,...te},Se=$=>{I=!0,_.has($)&&(Y=!0,_.delete($)),R.needsAnimating[$]=!0;const se=t.getValue($);se&&(se.liveStyle=!1)};for(const $ in we){const se=te[$],ce=me[$];if(w.hasOwnProperty($))continue;let P=!1;d0(se)&&d0(ce)?P=!j_(se,ce):P=se!==ce,P?se!=null?Se($):_.add($):se!==void 0&&_.has($)?Se($):R.protectedKeys[$]=!0}R.prevProp=L,R.prevResolvedValues=te,R.isActive&&(w={...w,...te}),(a||s)&&t.blockInitialAnimation&&(I=!1);const z=k&&U;I&&(!z||Y)&&x.push(...W.map($=>{const se={type:M};if(typeof $=="string"&&(a||s)&&!z&&t.manuallyAnimateOnMount&&t.parent){const{parent:ce}=t,P=bs(ce,$);if(ce.enteringChildren&&P){const{delayChildren:q}=P.transition||{};se.delay=i_(ce.enteringChildren,t,q)}}return{animation:$,options:se}}))}if(_.size){const C={};if(typeof m.initial!="boolean"){const M=bs(t,Array.isArray(m.initial)?m.initial[0]:m.initial);M&&M.transition&&(C.transition=M.transition)}_.forEach(M=>{const R=t.getBaseTarget(M),L=t.getValue(M);L&&(L.liveStyle=!0),C[M]=R??null}),x.push({animation:C})}let S=!!x.length;return a&&(m.initial===!1||m.initial===m.animate)&&!t.manuallyAnimateOnMount&&(S=!1),a=!1,s=!1,S?e(x):Promise.resolve()}function f(h,m){if(i[h].isActive===m)return Promise.resolve();t.variantChildren?.forEach(x=>x.animationState?.setActive(h,m)),i[h].isActive=m;const g=d(h);for(const x in i)i[x].protectedKeys={};return g}return{animateChanges:d,setActive:f,setAnimateFunction:c,getState:()=>i,reset:()=>{i=a2(),s=!0}}}function i8(t,e){return typeof e=="string"?e!==t:Array.isArray(e)?!j_(e,t):!1}function ss(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function a2(){return{animate:ss(!0),whileInView:ss(),whileHover:ss(),whileTap:ss(),whileDrag:ss(),whileFocus:ss(),exit:ss()}}function v0(t,e){t.min=e.min,t.max=e.max}function tr(t,e){v0(t.x,e.x),v0(t.y,e.y)}function s2(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}const N_=1e-4,r8=1-N_,a8=1+N_,z_=.01,s8=0-z_,o8=0+z_;function Bn(t){return t.max-t.min}function l8(t,e,i){return Math.abs(t-e)<=i}function o2(t,e,i,a=.5){t.origin=a,t.originPoint=Ot(e.min,e.max,t.origin),t.scale=Bn(i)/Bn(e),t.translate=Ot(i.min,i.max,t.origin)-t.originPoint,(t.scale>=r8&&t.scale<=a8||isNaN(t.scale))&&(t.scale=1),(t.translate>=s8&&t.translate<=o8||isNaN(t.translate))&&(t.translate=0)}function ic(t,e,i,a){o2(t.x,e.x,i.x,a?a.originX:void 0),o2(t.y,e.y,i.y,a?a.originY:void 0)}function l2(t,e,i,a=0){const s=a?Ot(i.min,i.max,a):i.min;t.min=s+e.min,t.max=t.min+Bn(e)}function c8(t,e,i,a){l2(t.x,e.x,i.x,a?.x),l2(t.y,e.y,i.y,a?.y)}function c2(t,e,i,a=0){const s=a?Ot(i.min,i.max,a):i.min;t.min=e.min-s,t.max=t.min+Bn(e)}function nf(t,e,i,a){c2(t.x,e.x,i.x,a?.x),c2(t.y,e.y,i.y,a?.y)}function u2(t,e,i,a,s){return t-=e,t=tf(t,1/i,a),s!==void 0&&(t=tf(t,1/s,a)),t}function u8(t,e=0,i=1,a=.5,s,l=t,c=t){if(Er.test(e)&&(e=parseFloat(e),e=Ot(c.min,c.max,e/100)-c.min),typeof e!="number")return;let d=Ot(l.min,l.max,a);t===l&&(d-=e),t.min=u2(t.min,e,i,d,s),t.max=u2(t.max,e,i,d,s)}function d2(t,e,[i,a,s],l,c){u8(t,e[i],e[a],e[s],e.scale,l,c)}const d8=["x","scaleX","originX"],f8=["y","scaleY","originY"];function f2(t,e,i,a){d2(t.x,e,d8,i?i.x:void 0,a?a.x:void 0),d2(t.y,e,f8,i?i.y:void 0,a?a.y:void 0)}function h2(t){return t.translate===0&&t.scale===1}function P_(t){return h2(t.x)&&h2(t.y)}function p2(t,e){return t.min===e.min&&t.max===e.max}function h8(t,e){return p2(t.x,e.x)&&p2(t.y,e.y)}function m2(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function U_(t,e){return m2(t.x,e.x)&&m2(t.y,e.y)}function g2(t){return Bn(t.x)/Bn(t.y)}function y2(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}function gr(t){return[t("x"),t("y")]}function p8(t,e,i){let a="";const s=t.x.translate/e.x,l=t.y.translate/e.y,c=i?.z||0;if((s||l||c)&&(a=`translate3d(${s}px, ${l}px, ${c}px) `),(e.x!==1||e.y!==1)&&(a+=`scale(${1/e.x}, ${1/e.y}) `),i){const{transformPerspective:h,rotate:m,rotateX:g,rotateY:x,skewX:_,skewY:w}=i;h&&(a=`perspective(${h}px) ${a}`),m&&(a+=`rotate(${m}deg) `),g&&(a+=`rotateX(${g}deg) `),x&&(a+=`rotateY(${x}deg) `),_&&(a+=`skewX(${_}deg) `),w&&(a+=`skewY(${w}deg) `)}const d=t.x.scale*e.x,f=t.y.scale*e.y;return(d!==1||f!==1)&&(a+=`scale(${d}, ${f})`),a||"none"}const I_=["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"],m8=I_.length,x2=t=>typeof t=="string"?parseFloat(t):t,b2=t=>typeof t=="number"||Ae.test(t);function g8(t,e,i,a,s,l){s?(t.opacity=Ot(0,i.opacity??1,y8(a)),t.opacityExit=Ot(e.opacity??1,0,x8(a))):l&&(t.opacity=Ot(e.opacity??1,i.opacity??1,a));for(let c=0;c<m8;c++){const d=I_[c];let f=v2(e,d),h=v2(i,d);if(f===void 0&&h===void 0)continue;f||(f=0),h||(h=0),f===0||h===0||b2(f)===b2(h)?(t[d]=Math.max(Ot(x2(f),x2(h),a),0),(Er.test(h)||Er.test(f))&&(t[d]+="%")):t[d]=h}(e.rotate||i.rotate)&&(t.rotate=Ot(e.rotate||0,i.rotate||0,a))}function v2(t,e){return t[e]!==void 0?t[e]:t.borderRadius}const y8=B_(0,.5,O5),x8=B_(.5,.95,Ki);function B_(t,e,i){return a=>a<t?0:a>e?1:i(fc(t,e,a))}function b8(t,e,i){const a=Tn(t)?t:Ro(t);return a.start(bg("",a,e,i)),a.animation}function mc(t,e,i,a={passive:!0}){return t.addEventListener(e,i,a),()=>t.removeEventListener(e,i)}const v8=(t,e)=>t.depth-e.depth;class w8{constructor(){this.children=[],this.isDirty=!1}add(e){sg(this.children,e),this.isDirty=!0}remove(e){Kd(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(v8),this.isDirty=!1,this.children.forEach(e)}}function S8(t,e){const i=In.now(),a=({timestamp:s})=>{const l=s-i;l>=e&&(Pa(a),t(l-e))};return _t.setup(a,!0),()=>Pa(a)}function jd(t){return Tn(t)?t.get():t}class _8{constructor(){this.members=[]}add(e){sg(this.members,e);for(let i=this.members.length-1;i>=0;i--){const a=this.members[i];if(a===e||a===this.lead||a===this.prevLead)continue;const s=a.instance;(!s||s.isConnected===!1)&&!a.snapshot&&(Kd(this.members,a),a.unmount())}e.scheduleRender()}remove(e){if(Kd(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const i=this.members[this.members.length-1];i&&this.promote(i)}}relegate(e){for(let i=this.members.indexOf(e)-1;i>=0;i--){const a=this.members[i];if(a.isPresent!==!1&&a.instance?.isConnected!==!1)return this.promote(a),!0}return!1}promote(e,i){const a=this.lead;if(e!==a&&(this.prevLead=a,this.lead=e,e.show(),a)){a.updateSnapshot(),e.scheduleRender();const{layoutDependency:s}=a.options,{layoutDependency:l}=e.options;(s===void 0||s!==l)&&(e.resumeFrom=a,i&&(a.preserveOpacity=!0),a.snapshot&&(e.snapshot=a.snapshot,e.snapshot.latestValues=a.animationValues||a.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&a.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}}const Nd={hasAnimatedSinceResize:!0,hasEverUpdated:!1},fm=["","X","Y","Z"],T8=1e3;let E8=0;function hm(t,e,i,a){const{latestValues:s}=e;s[t]&&(i[t]=s[t],e.setStaticValue(t,0),a&&(a[t]=0))}function V_(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const i=l_(e);if(window.MotionHasOptimisedAnimation(i,"transform")){const{layout:s,layoutId:l}=t.options;window.MotionCancelOptimisedAnimation(i,"transform",_t,!(s||l))}const{parent:a}=t;a&&!a.hasCheckedOptimisedAppear&&V_(a)}function F_({attachResizeListener:t,defaultParent:e,measureScroll:i,checkIsScrollRoot:a,resetTransform:s}){return class{constructor(c={},d=e?.()){this.id=E8++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(A8),this.nodes.forEach(j8),this.nodes.forEach(N8),this.nodes.forEach(R8)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=c,this.root=d?d.root||d:this,this.path=d?[...d.path,d]:[],this.parent=d,this.depth=d?d.depth+1:0;for(let f=0;f<this.path.length;f++)this.path[f].shouldResetTransform=!0;this.root===this&&(this.nodes=new w8)}addEventListener(c,d){return this.eventHandlers.has(c)||this.eventHandlers.set(c,new lg),this.eventHandlers.get(c).add(d)}notifyListeners(c,...d){const f=this.eventHandlers.get(c);f&&f.notify(...d)}hasListeners(c){return this.eventHandlers.has(c)}mount(c){if(this.instance)return;this.isSVG=Cg(c)&&!k6(c),this.instance=c;const{layoutId:d,layout:f,visualElement:h}=this.options;if(h&&!h.current&&h.mount(c),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(f||d)&&(this.isLayoutDirty=!0),t){let m,g=0;const x=()=>this.root.updateBlockedByResize=!1;_t.read(()=>{g=window.innerWidth}),t(c,()=>{const _=window.innerWidth;_!==g&&(g=_,this.root.updateBlockedByResize=!0,m&&m(),m=S8(x,250),Nd.hasAnimatedSinceResize&&(Nd.hasAnimatedSinceResize=!1,this.nodes.forEach(_2)))})}d&&this.root.registerSharedNode(d,this),this.options.animate!==!1&&h&&(d||f)&&this.addEventListener("didUpdate",({delta:m,hasLayoutChanged:g,hasRelativeLayoutChanged:x,layout:_})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||h.getDefaultTransition()||B8,{onLayoutAnimationStart:v,onLayoutAnimationComplete:S}=h.getProps(),C=!this.targetLayout||!U_(this.targetLayout,_),M=!g&&x;if(this.options.layoutRoot||this.resumeFrom||M||g&&(C||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const R={...xg(w,"layout"),onPlay:v,onComplete:S};(h.shouldReduceMotion||this.options.layoutRoot)&&(R.delay=0,R.type=!1),this.startAnimation(R),this.setAnimationOrigin(m,M)}else g||_2(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=_})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const c=this.getStack();c&&c.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Pa(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(z8),this.animationId++)}getTransformTemplate(){const{visualElement:c}=this.options;return c&&c.getProps().transformTemplate}willUpdate(c=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&V_(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let m=0;m<this.path.length;m++){const g=this.path[m];g.shouldResetTransform=!0,(typeof g.latestValues.x=="string"||typeof g.latestValues.y=="string")&&(g.isLayoutDirty=!0),g.updateScroll("snapshot"),g.options.layoutRoot&&g.willUpdate(!1)}const{layoutId:d,layout:f}=this.options;if(d===void 0&&!f)return;const h=this.getTransformTemplate();this.prevTransformTemplateValue=h?h(this.latestValues,""):void 0,this.updateSnapshot(),c&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){const f=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),f&&this.nodes.forEach(O8),this.nodes.forEach(w2);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(S2);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(M8),this.nodes.forEach(L8),this.nodes.forEach(C8),this.nodes.forEach(k8)):this.nodes.forEach(S2),this.clearAllSnapshots();const d=In.now();Sn.delta=Rr(0,1e3/60,d-Sn.timestamp),Sn.timestamp=d,Sn.isProcessing=!0,rm.update.process(Sn),rm.preRender.process(Sn),rm.render.process(Sn),Sn.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Tg.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(D8),this.sharedNodes.forEach(P8)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,_t.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){_t.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Bn(this.snapshot.measuredBox.x)&&!Bn(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let f=0;f<this.path.length;f++)this.path[f].updateScroll();const c=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||(this.layoutCorrected=dn()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:d}=this.options;d&&d.notify("LayoutMeasure",this.layout.layoutBox,c?c.layoutBox:void 0)}updateScroll(c="measure"){let d=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===c&&(d=!1),d&&this.instance){const f=a(this.instance);this.scroll={animationId:this.root.animationId,phase:c,isRoot:f,offset:i(this.instance),wasRoot:this.scroll?this.scroll.isRoot:f}}}resetTransform(){if(!s)return;const c=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,d=this.projectionDelta&&!P_(this.projectionDelta),f=this.getTransformTemplate(),h=f?f(this.latestValues,""):void 0,m=h!==this.prevTransformTemplateValue;c&&this.instance&&(d||us(this.latestValues)||m)&&(s(this.instance,h),this.shouldResetTransform=!1,this.scheduleRender())}measure(c=!0){const d=this.measurePageBox();let f=this.removeElementScroll(d);return c&&(f=this.removeTransform(f)),V8(f),{animationId:this.root.animationId,measuredBox:d,layoutBox:f,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:c}=this.options;if(!c)return dn();const d=c.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(F8))){const{scroll:h}=this.root;h&&(xr(d.x,h.offset.x),xr(d.y,h.offset.y))}return d}removeElementScroll(c){const d=dn();if(tr(d,c),this.scroll?.wasRoot)return d;for(let f=0;f<this.path.length;f++){const h=this.path[f],{scroll:m,options:g}=h;h!==this.root&&m&&g.layoutScroll&&(m.wasRoot&&tr(d,c),xr(d.x,m.offset.x),xr(d.y,m.offset.y))}return d}applyTransform(c,d=!1,f){const h=f||dn();tr(h,c);for(let m=0;m<this.path.length;m++){const g=this.path[m];!d&&g.options.layoutScroll&&g.scroll&&g!==g.root&&(xr(h.x,-g.scroll.offset.x),xr(h.y,-g.scroll.offset.y)),us(g.latestValues)&&Ld(h,g.latestValues,g.layout?.layoutBox)}return us(this.latestValues)&&Ld(h,this.latestValues,this.layout?.layoutBox),h}removeTransform(c){const d=dn();tr(d,c);for(let f=0;f<this.path.length;f++){const h=this.path[f];if(!us(h.latestValues))continue;let m;h.instance&&(y0(h.latestValues)&&h.updateSnapshot(),m=dn(),tr(m,h.measurePageBox())),f2(d,h.latestValues,h.snapshot?.layoutBox,m)}return us(this.latestValues)&&f2(d,this.latestValues),d}setTargetDelta(c){this.targetDelta=c,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(c){this.options={...this.options,...c,crossfade:c.crossfade!==void 0?c.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Sn.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(c=!1){const d=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=d.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=d.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=d.isSharedProjectionDirty);const f=!!this.resumingFrom||this!==d;if(!(c||f&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:m,layoutId:g}=this.options;if(!this.layout||!(m||g))return;this.resolvedRelativeTargetAt=Sn.timestamp;const x=this.getClosestProjectingParent();x&&this.linkedParentVersion!==x.layoutVersion&&!x.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&x&&x.layout?this.createRelativeTarget(x,this.layout.layoutBox,x.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=dn(),this.targetWithTransforms=dn()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),c8(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):tr(this.target,this.layout.layoutBox),E_(this.target,this.targetDelta)):tr(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&x&&!!x.resumingFrom==!!this.resumingFrom&&!x.options.layoutScroll&&x.target&&this.animationProgress!==1?this.createRelativeTarget(x,this.target,x.target):this.relativeParent=this.relativeTarget=void 0))}getClosestProjectingParent(){if(!(!this.parent||y0(this.parent.latestValues)||T_(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(c,d,f){this.relativeParent=c,this.linkedParentVersion=c.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=dn(),this.relativeTargetOrigin=dn(),nf(this.relativeTargetOrigin,d,f,this.options.layoutAnchor||void 0),tr(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){const c=this.getLead(),d=!!this.resumingFrom||this!==c;let f=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(f=!1),d&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(f=!1),this.resolvedRelativeTargetAt===Sn.timestamp&&(f=!1),f)return;const{layout:h,layoutId:m}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(h||m))return;tr(this.layoutCorrected,this.layout.layoutBox);const g=this.treeScale.x,x=this.treeScale.y;U6(this.layoutCorrected,this.treeScale,this.path,d),c.layout&&!c.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(c.target=c.layout.layoutBox,c.targetWithTransforms=dn());const{target:_}=c;if(!_){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(s2(this.prevProjectionDelta.x,this.projectionDelta.x),s2(this.prevProjectionDelta.y,this.projectionDelta.y)),ic(this.projectionDelta,this.layoutCorrected,_,this.latestValues),(this.treeScale.x!==g||this.treeScale.y!==x||!y2(this.projectionDelta.x,this.prevProjectionDelta.x)||!y2(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",_))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(c=!0){if(this.options.visualElement?.scheduleRender(),c){const d=this.getStack();d&&d.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=bo(),this.projectionDelta=bo(),this.projectionDeltaWithTransform=bo()}setAnimationOrigin(c,d=!1){const f=this.snapshot,h=f?f.latestValues:{},m={...this.latestValues},g=bo();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!d;const x=dn(),_=f?f.source:void 0,w=this.layout?this.layout.source:void 0,v=_!==w,S=this.getStack(),C=!S||S.members.length<=1,M=!!(v&&!C&&this.options.crossfade===!0&&!this.path.some(I8));this.animationProgress=0;let R;this.mixTargetDelta=L=>{const O=L/1e3;T2(g.x,c.x,O),T2(g.y,c.y,O),this.setTargetDelta(g),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(nf(x,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),U8(this.relativeTarget,this.relativeTargetOrigin,x,O),R&&h8(this.relativeTarget,R)&&(this.isProjectionDirty=!1),R||(R=dn()),tr(R,this.relativeTarget)),v&&(this.animationValues=m,g8(m,h,this.latestValues,O,M,C)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=O},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(c){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(Pa(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=_t.update(()=>{Nd.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=Ro(0)),this.motionValue.jump(0,!1),this.currentAnimation=b8(this.motionValue,[0,1e3],{...c,velocity:0,isSync:!0,onUpdate:d=>{this.mixTargetDelta(d),c.onUpdate&&c.onUpdate(d)},onStop:()=>{},onComplete:()=>{c.onComplete&&c.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const c=this.getStack();c&&c.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(T8),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const c=this.getLead();let{targetWithTransforms:d,target:f,layout:h,latestValues:m}=c;if(!(!d||!f||!h)){if(this!==c&&this.layout&&h&&H_(this.options.animationType,this.layout.layoutBox,h.layoutBox)){f=this.target||dn();const g=Bn(this.layout.layoutBox.x);f.x.min=c.target.x.min,f.x.max=f.x.min+g;const x=Bn(this.layout.layoutBox.y);f.y.min=c.target.y.min,f.y.max=f.y.min+x}tr(d,f),Ld(d,m),ic(this.projectionDeltaWithTransform,this.layoutCorrected,d,m)}}registerSharedNode(c,d){this.sharedNodes.has(c)||this.sharedNodes.set(c,new _8),this.sharedNodes.get(c).add(d);const h=d.options.initialPromotionConfig;d.promote({transition:h?h.transition:void 0,preserveFollowOpacity:h&&h.shouldPreserveFollowOpacity?h.shouldPreserveFollowOpacity(d):void 0})}isLead(){const c=this.getStack();return c?c.lead===this:!0}getLead(){const{layoutId:c}=this.options;return c?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:c}=this.options;return c?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:c}=this.options;if(c)return this.root.sharedNodes.get(c)}promote({needsReset:c,transition:d,preserveFollowOpacity:f}={}){const h=this.getStack();h&&h.promote(this,f),c&&(this.projectionDelta=void 0,this.needsReset=!0),d&&this.setOptions({transition:d})}relegate(){const c=this.getStack();return c?c.relegate(this):!1}resetSkewAndRotation(){const{visualElement:c}=this.options;if(!c)return;let d=!1;const{latestValues:f}=c;if((f.z||f.rotate||f.rotateX||f.rotateY||f.rotateZ||f.skewX||f.skewY)&&(d=!0),!d)return;const h={};f.z&&hm("z",c,h,this.animationValues);for(let m=0;m<fm.length;m++)hm(`rotate${fm[m]}`,c,h,this.animationValues),hm(`skew${fm[m]}`,c,h,this.animationValues);c.render();for(const m in h)c.setStaticValue(m,h[m]),this.animationValues&&(this.animationValues[m]=h[m]);c.scheduleRender()}applyProjectionStyles(c,d){if(!this.instance||this.isSVG)return;if(!this.isVisible){c.visibility="hidden";return}const f=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,c.visibility="",c.opacity="",c.pointerEvents=jd(d?.pointerEvents)||"",c.transform=f?f(this.latestValues,""):"none";return}const h=this.getLead();if(!this.projectionDelta||!this.layout||!h.target){this.options.layoutId&&(c.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,c.pointerEvents=jd(d?.pointerEvents)||""),this.hasProjected&&!us(this.latestValues)&&(c.transform=f?f({},""):"none",this.hasProjected=!1);return}c.visibility="";const m=h.animationValues||h.latestValues;this.applyTransformsToTarget();let g=p8(this.projectionDeltaWithTransform,this.treeScale,m);f&&(g=f(m,g)),c.transform=g;const{x,y:_}=this.projectionDelta;c.transformOrigin=`${x.origin*100}% ${_.origin*100}% 0`,h.animationValues?c.opacity=h===this?m.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:m.opacityExit:c.opacity=h===this?m.opacity!==void 0?m.opacity:"":m.opacityExit!==void 0?m.opacityExit:0;for(const w in b0){if(m[w]===void 0)continue;const{correct:v,applyTo:S,isCSSVariable:C}=b0[w],M=g==="none"?m[w]:v(m[w],h);if(S){const R=S.length;for(let L=0;L<R;L++)c[S[L]]=M}else C?this.options.visualElement.renderState.vars[w]=M:c[w]=M}this.options.layoutId&&(c.pointerEvents=h===this?jd(d?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(c=>c.currentAnimation?.stop()),this.root.nodes.forEach(w2),this.root.sharedNodes.clear()}}}function C8(t){t.updateLayout()}function k8(t){const e=t.resumeFrom?.snapshot||t.snapshot;if(t.isLead()&&t.layout&&e&&t.hasListeners("didUpdate")){const{layoutBox:i,measuredBox:a}=t.layout,{animationType:s}=t.options,l=e.source!==t.layout.source;if(s==="size")gr(m=>{const g=l?e.measuredBox[m]:e.layoutBox[m],x=Bn(g);g.min=i[m].min,g.max=g.min+x});else if(s==="x"||s==="y"){const m=s==="x"?"y":"x";v0(l?e.measuredBox[m]:e.layoutBox[m],i[m])}else H_(s,e.layoutBox,i)&&gr(m=>{const g=l?e.measuredBox[m]:e.layoutBox[m],x=Bn(i[m]);g.max=g.min+x,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[m].max=t.relativeTarget[m].min+x)});const c=bo();ic(c,i,e.layoutBox);const d=bo();l?ic(d,t.applyTransform(a,!0),e.measuredBox):ic(d,i,e.layoutBox);const f=!P_(c);let h=!1;if(!t.resumeFrom){const m=t.getClosestProjectingParent();if(m&&!m.resumeFrom){const{snapshot:g,layout:x}=m;if(g&&x){const _=t.options.layoutAnchor||void 0,w=dn();nf(w,e.layoutBox,g.layoutBox,_);const v=dn();nf(v,i,x.layoutBox,_),U_(w,v)||(h=!0),m.options.layoutRoot&&(t.relativeTarget=v,t.relativeTargetOrigin=w,t.relativeParent=m)}}}t.notifyListeners("didUpdate",{layout:i,snapshot:e,delta:d,layoutDelta:c,hasLayoutChanged:f,hasRelativeLayoutChanged:h})}else if(t.isLead()){const{onExitComplete:i}=t.options;i&&i()}t.options.transition=void 0}function A8(t){t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function R8(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function D8(t){t.clearSnapshot()}function w2(t){t.clearMeasurements()}function O8(t){t.isLayoutDirty=!0,t.updateLayout()}function S2(t){t.isLayoutDirty=!1}function M8(t){t.isAnimationBlocked&&t.layout&&!t.isLayoutDirty&&(t.snapshot=t.layout,t.isLayoutDirty=!0)}function L8(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function _2(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function j8(t){t.resolveTargetDelta()}function N8(t){t.calcProjection()}function z8(t){t.resetSkewAndRotation()}function P8(t){t.removeLeadSnapshot()}function T2(t,e,i){t.translate=Ot(e.translate,0,i),t.scale=Ot(e.scale,1,i),t.origin=e.origin,t.originPoint=e.originPoint}function E2(t,e,i,a){t.min=Ot(e.min,i.min,a),t.max=Ot(e.max,i.max,a)}function U8(t,e,i,a){E2(t.x,e.x,i.x,a),E2(t.y,e.y,i.y,a)}function I8(t){return t.animationValues&&t.animationValues.opacityExit!==void 0}const B8={duration:.45,ease:[.4,0,.1,1]},C2=t=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),k2=C2("applewebkit/")&&!C2("chrome/")?Math.round:Ki;function A2(t){t.min=k2(t.min),t.max=k2(t.max)}function V8(t){A2(t.x),A2(t.y)}function H_(t,e,i){return t==="position"||t==="preserve-aspect"&&!l8(g2(e),g2(i),.2)}function F8(t){return t!==t.root&&t.scroll?.wasRoot}const H8=F_({attachResizeListener:(t,e)=>mc(t,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),pm={current:void 0},$_=F_({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!pm.current){const t=new H8({});t.mount(window),t.setOptions({layoutScroll:!0}),pm.current=t}return pm.current},resetTransform:(t,e)=>{t.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:t=>window.getComputedStyle(t).position==="fixed"}),Og=E.createContext({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"});function R2(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}function $8(...t){return e=>{let i=!1;const a=t.map(s=>{const l=R2(s,e);return!i&&typeof l=="function"&&(i=!0),l});if(i)return()=>{for(let s=0;s<a.length;s++){const l=a[s];typeof l=="function"?l():R2(t[s],null)}}}}function q8(...t){return E.useCallback($8(...t),t)}class Y8 extends E.Component{getSnapshotBeforeUpdate(e){const i=this.props.childRef.current;if(Ad(i)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){const a=i.offsetParent,s=Ad(a)&&a.offsetWidth||0,l=Ad(a)&&a.offsetHeight||0,c=getComputedStyle(i),d=this.props.sizeRef.current;d.height=parseFloat(c.height),d.width=parseFloat(c.width),d.top=i.offsetTop,d.left=i.offsetLeft,d.right=s-d.width-d.left,d.bottom=l-d.height-d.top}return null}componentDidUpdate(){}render(){return this.props.children}}function G8({children:t,isPresent:e,anchorX:i,anchorY:a,root:s,pop:l}){const c=E.useId(),d=E.useRef(null),f=E.useRef({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:h}=E.useContext(Og),m=t.props?.ref??t?.ref,g=q8(d,m);return E.useInsertionEffect(()=>{const{width:x,height:_,top:w,left:v,right:S,bottom:C}=f.current;if(e||l===!1||!d.current||!x||!_)return;const M=i==="left"?`left: ${v}`:`right: ${S}`,R=a==="bottom"?`bottom: ${C}`:`top: ${w}`;d.current.dataset.motionPopId=c;const L=document.createElement("style");h&&(L.nonce=h);const O=s??document.head;return O.appendChild(L),L.sheet&&L.sheet.insertRule(`
          [data-motion-pop-id="${c}"] {
            position: absolute !important;
            width: ${x}px !important;
            height: ${_}px !important;
            ${M}px !important;
            ${R}px !important;
          }
        `),()=>{d.current?.removeAttribute("data-motion-pop-id"),O.contains(L)&&O.removeChild(L)}},[e]),b.jsx(Y8,{isPresent:e,childRef:d,sizeRef:f,pop:l,children:l===!1?t:E.cloneElement(t,{ref:g})})}const X8=({children:t,initial:e,isPresent:i,onExitComplete:a,custom:s,presenceAffectsLayout:l,mode:c,anchorX:d,anchorY:f,root:h})=>{const m=ag(K8),g=E.useId();let x=!0,_=E.useMemo(()=>(x=!1,{id:g,initial:e,isPresent:i,custom:s,onExitComplete:w=>{m.set(w,!0);for(const v of m.values())if(!v)return;a&&a()},register:w=>(m.set(w,!1),()=>m.delete(w))}),[i,m,a]);return l&&x&&(_={..._}),E.useMemo(()=>{m.forEach((w,v)=>m.set(v,!1))},[i]),E.useEffect(()=>{!i&&!m.size&&a&&a()},[i]),t=b.jsx(G8,{pop:c==="popLayout",isPresent:i,anchorX:d,anchorY:f,root:h,children:t}),b.jsx(xf.Provider,{value:_,children:t})};function K8(){return new Map}function q_(t=!0){const e=E.useContext(xf);if(e===null)return[!0,null];const{isPresent:i,onExitComplete:a,register:s}=e,l=E.useId();E.useEffect(()=>{if(t)return s(l)},[t]);const c=E.useCallback(()=>t&&a&&a(l),[l,a,t]);return!i&&a?[!1,c]:[!0]}const ad=t=>t.key||"";function D2(t){const e=[];return E.Children.forEach(t,i=>{E.isValidElement(i)&&e.push(i)}),e}const Mg=({children:t,custom:e,initial:i=!0,onExitComplete:a,presenceAffectsLayout:s=!0,mode:l="sync",propagate:c=!1,anchorX:d="left",anchorY:f="top",root:h})=>{const[m,g]=q_(c),x=E.useMemo(()=>D2(t),[t]),_=c&&!m?[]:x.map(ad),w=E.useRef(!0),v=E.useRef(x),S=ag(()=>new Map),C=E.useRef(new Set),[M,R]=E.useState(x),[L,O]=E.useState(x);b5(()=>{w.current=!1,v.current=x;for(let U=0;U<L.length;U++){const I=ad(L[U]);_.includes(I)?(S.delete(I),C.current.delete(I)):S.get(I)!==!0&&S.set(I,!1)}},[L,_.length,_.join("-")]);const j=[];if(x!==M){let U=[...x];for(let I=0;I<L.length;I++){const Y=L[I],W=ad(Y);_.includes(W)||(U.splice(I,0,Y),j.push(Y))}return l==="wait"&&j.length&&(U=j),O(D2(U)),R(x),null}const{forceRender:k}=E.useContext(rg);return b.jsx(b.Fragment,{children:L.map(U=>{const I=ad(U),Y=c&&!m?!1:x===L||_.includes(I),W=()=>{if(C.current.has(I))return;if(S.has(I))C.current.add(I),S.set(I,!0);else return;let te=!0;S.forEach(me=>{me||(te=!1)}),te&&(k?.(),O(v.current),c&&g?.(),a&&a())};return b.jsx(X8,{isPresent:Y,initial:!w.current||i?void 0:!1,custom:e,presenceAffectsLayout:s,mode:l,root:h,onExitComplete:Y?void 0:W,anchorX:d,anchorY:f,children:U},I)})})},Y_=E.createContext({strict:!1}),O2={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]};let M2=!1;function Z8(){if(M2)return;const t={};for(const e in O2)t[e]={isEnabled:i=>O2[e].some(a=>!!i[a])};w_(t),M2=!0}function G_(){return Z8(),j6()}function Q8(t){const e=G_();for(const i in t)e[i]={...e[i],...t[i]};w_(e)}const W8=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","propagate","ignoreStrict","viewport"]);function rf(t){return t.startsWith("while")||t.startsWith("drag")&&t!=="draggable"||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||W8.has(t)}let X_=t=>!rf(t);function J8(t){typeof t=="function"&&(X_=e=>e.startsWith("on")?!rf(e):t(e))}try{J8(require("@emotion/is-prop-valid").default)}catch{}function eR(t,e,i){const a={};for(const s in t)s==="values"&&typeof t.values=="object"||Tn(t[s])||(X_(s)||i===!0&&rf(s)||!e&&!rf(s)||t.draggable&&s.startsWith("onDrag"))&&(a[s]=t[s]);return a}const Sf=E.createContext({});function tR(t,e){if(wf(t)){const{initial:i,animate:a}=t;return{initial:i===!1||pc(i)?i:void 0,animate:pc(a)?a:void 0}}return t.inherit!==!1?e:{}}function nR(t){const{initial:e,animate:i}=tR(t,E.useContext(Sf));return E.useMemo(()=>({initial:e,animate:i}),[L2(e),L2(i)])}function L2(t){return Array.isArray(t)?t.join(" "):t}const Lg=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function K_(t,e,i){for(const a in e)!Tn(e[a])&&!A_(a,i)&&(t[a]=e[a])}function iR({transformTemplate:t},e){return E.useMemo(()=>{const i=Lg();return Rg(i,e,t),Object.assign({},i.vars,i.style)},[e])}function rR(t,e){const i=t.style||{},a={};return K_(a,i,t),Object.assign(a,iR(t,e)),a}function aR(t,e){const i={},a=rR(t,e);return t.drag&&t.dragListener!==!1&&(i.draggable=!1,a.userSelect=a.WebkitUserSelect=a.WebkitTouchCallout="none",a.touchAction=t.drag===!0?"none":`pan-${t.drag==="x"?"y":"x"}`),t.tabIndex===void 0&&(t.onTap||t.onTapStart||t.whileTap)&&(i.tabIndex=0),i.style=a,i}const Z_=()=>({...Lg(),attrs:{}});function sR(t,e,i,a){const s=E.useMemo(()=>{const l=Z_();return R_(l,e,O_(a),t.transformTemplate,t.style),{...l.attrs,style:{...l.style}}},[e]);if(t.style){const l={};K_(l,t.style,t),s.style={...l,...s.style}}return s}const oR=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function jg(t){return typeof t!="string"||t.includes("-")?!1:!!(oR.indexOf(t)>-1||/[A-Z]/u.test(t))}function lR(t,e,i,{latestValues:a},s,l=!1,c){const f=(c??jg(t)?sR:aR)(e,a,s,t),h=eR(e,typeof t=="string",l),m=t!==E.Fragment?{...h,...f,ref:i}:{},{children:g}=e,x=E.useMemo(()=>Tn(g)?g.get():g,[g]);return E.createElement(t,{...m,children:x})}function cR({scrapeMotionValuesFromProps:t,createRenderState:e},i,a,s){return{latestValues:uR(i,a,s,t),renderState:e()}}function uR(t,e,i,a){const s={},l=a(t,{});for(const x in l)s[x]=jd(l[x]);let{initial:c,animate:d}=t;const f=wf(t),h=b_(t);e&&h&&!f&&t.inherit!==!1&&(c===void 0&&(c=e.initial),d===void 0&&(d=e.animate));let m=i?i.initial===!1:!1;m=m||c===!1;const g=m?d:c;if(g&&typeof g!="boolean"&&!vf(g)){const x=Array.isArray(g)?g:[g];for(let _=0;_<x.length;_++){const w=vg(t,x[_]);if(w){const{transitionEnd:v,transition:S,...C}=w;for(const M in C){let R=C[M];if(Array.isArray(R)){const L=m?R.length-1:0;R=R[L]}R!==null&&(s[M]=R)}for(const M in v)s[M]=v[M]}}}return s}const Q_=t=>(e,i)=>{const a=E.useContext(Sf),s=E.useContext(xf),l=()=>cR(t,e,a,s);return i?l():ag(l)},dR=Q_({scrapeMotionValuesFromProps:Dg,createRenderState:Lg}),fR=Q_({scrapeMotionValuesFromProps:M_,createRenderState:Z_}),hR=Symbol.for("motionComponentSymbol");function pR(t,e,i){const a=E.useRef(i);E.useInsertionEffect(()=>{a.current=i});const s=E.useRef(null);return E.useCallback(l=>{l&&t.onMount?.(l);const c=a.current;if(typeof c=="function")if(l){const d=c(l);typeof d=="function"&&(s.current=d)}else s.current?(s.current(),s.current=null):c(l);else c&&(c.current=l);e&&(l?e.mount(l):e.unmount())},[e])}const W_=E.createContext({});function go(t){return t&&typeof t=="object"&&Object.prototype.hasOwnProperty.call(t,"current")}function mR(t,e,i,a,s,l){const{visualElement:c}=E.useContext(Sf),d=E.useContext(Y_),f=E.useContext(xf),h=E.useContext(Og),m=h.reducedMotion,g=h.skipAnimations,x=E.useRef(null),_=E.useRef(!1);a=a||d.renderer,!x.current&&a&&(x.current=a(t,{visualState:e,parent:c,props:i,presenceContext:f,blockInitialAnimation:f?f.initial===!1:!1,reducedMotionConfig:m,skipAnimations:g,isSVG:l}),_.current&&x.current&&(x.current.manuallyAnimateOnMount=!0));const w=x.current,v=E.useContext(W_);w&&!w.projection&&s&&(w.type==="html"||w.type==="svg")&&gR(x.current,i,s,v);const S=E.useRef(!1);E.useInsertionEffect(()=>{w&&S.current&&w.update(i,f)});const C=i[o_],M=E.useRef(!!C&&typeof window<"u"&&!window.MotionHandoffIsComplete?.(C)&&window.MotionHasOptimisedAnimation?.(C));return b5(()=>{_.current=!0,w&&(S.current=!0,window.MotionIsMounted=!0,w.updateFeatures(),w.scheduleRenderMicrotask(),M.current&&w.animationState&&w.animationState.animateChanges())}),E.useEffect(()=>{w&&(!M.current&&w.animationState&&w.animationState.animateChanges(),M.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(C)}),M.current=!1),w.enteringChildren=void 0)}),w}function gR(t,e,i,a){const{layoutId:s,layout:l,drag:c,dragConstraints:d,layoutScroll:f,layoutRoot:h,layoutAnchor:m,layoutCrossfade:g}=e;t.projection=new i(t.latestValues,e["data-framer-portal-id"]?void 0:J_(t.parent)),t.projection.setOptions({layoutId:s,layout:l,alwaysMeasureLayout:!!c||d&&go(d),visualElement:t,animationType:typeof l=="string"?l:"both",initialPromotionConfig:a,crossfade:g,layoutScroll:f,layoutRoot:h,layoutAnchor:m})}function J_(t){if(t)return t.options.allowProjection!==!1?t.projection:J_(t.parent)}function mm(t,{forwardMotionProps:e=!1,type:i}={},a,s){a&&Q8(a);const l=i?i==="svg":jg(t),c=l?fR:dR;function d(h,m){let g;const x={...E.useContext(Og),...h,layoutId:yR(h)},{isStatic:_}=x,w=nR(h),v=c(h,_);if(!_&&typeof window<"u"){xR();const S=bR(x);g=S.MeasureLayout,w.visualElement=mR(t,v,x,s,S.ProjectionNode,l)}return b.jsxs(Sf.Provider,{value:w,children:[g&&w.visualElement?b.jsx(g,{visualElement:w.visualElement,...x}):null,lR(t,h,pR(v,w.visualElement,m),v,_,e,l)]})}d.displayName=`motion.${typeof t=="string"?t:`create(${t.displayName??t.name??""})`}`;const f=E.forwardRef(d);return f[hR]=t,f}function yR({layoutId:t}){const e=E.useContext(rg).id;return e&&t!==void 0?e+"-"+t:t}function xR(t,e){E.useContext(Y_).strict}function bR(t){const e=G_(),{drag:i,layout:a}=e;if(!i&&!a)return{};const s={...i,...a};return{MeasureLayout:i?.isEnabled(t)||a?.isEnabled(t)?s.MeasureLayout:void 0,ProjectionNode:s.ProjectionNode}}function vR(t,e){if(typeof Proxy>"u")return mm;const i=new Map,a=(l,c)=>mm(l,c,t,e),s=(l,c)=>a(l,c);return new Proxy(s,{get:(l,c)=>c==="create"?a:(i.has(c)||i.set(c,mm(c,void 0,t,e)),i.get(c))})}const wR=(t,e)=>e.isSVG??jg(t)?new Q6(e):new q6(e,{allowProjection:t!==E.Fragment});class SR extends Va{constructor(e){super(e),e.animationState||(e.animationState=n8(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();vf(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:i}=this.node.prevProps||{};e!==i&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}let _R=0;class TR extends Va{constructor(){super(...arguments),this.id=_R++,this.isExitComplete=!1}update(){if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:i}=this.node.presenceContext,{isPresent:a}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===a)return;if(e&&a===!1){if(this.isExitComplete){const{initial:l,custom:c}=this.node.getProps();if(typeof l=="string"){const d=bs(this.node,l,c);if(d){const{transition:f,transitionEnd:h,...m}=d;for(const g in m)this.node.getValue(g)?.jump(m[g])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive("exit",!1);this.isExitComplete=!1;return}const s=this.node.animationState.setActive("exit",!e);i&&!e&&s.then(()=>{this.isExitComplete=!0,i(this.id)})}mount(){const{register:e,onExitComplete:i}=this.node.presenceContext||{};i&&i(this.id),e&&(this.unmount=e(this.id))}unmount(){}}const ER={animation:{Feature:SR},exit:{Feature:TR}};function Mc(t){return{point:{x:t.pageX,y:t.pageY}}}const CR=t=>e=>Eg(e)&&t(e,Mc(e));function rc(t,e,i,a){return mc(t,e,CR(i),a)}const eT=({current:t})=>t?t.ownerDocument.defaultView:null,j2=(t,e)=>Math.abs(t-e);function kR(t,e){const i=j2(t.x,e.x),a=j2(t.y,e.y);return Math.sqrt(i**2+a**2)}const N2=new Set(["auto","scroll"]);class tT{constructor(e,i,{transformPagePoint:a,contextWindow:s=window,dragSnapToOrigin:l=!1,distanceThreshold:c=3,element:d}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=_=>{this.handleScroll(_.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=sd(this.lastRawMoveEventInfo,this.transformPagePoint));const _=gm(this.lastMoveEventInfo,this.history),w=this.startEvent!==null,v=kR(_.offset,{x:0,y:0})>=this.distanceThreshold;if(!w&&!v)return;const{point:S}=_,{timestamp:C}=Sn;this.history.push({...S,timestamp:C});const{onStart:M,onMove:R}=this.handlers;w||(M&&M(this.lastMoveEvent,_),this.startEvent=this.lastMoveEvent),R&&R(this.lastMoveEvent,_)},this.handlePointerMove=(_,w)=>{this.lastMoveEvent=_,this.lastRawMoveEventInfo=w,this.lastMoveEventInfo=sd(w,this.transformPagePoint),_t.update(this.updatePoint,!0)},this.handlePointerUp=(_,w)=>{this.end();const{onEnd:v,onSessionEnd:S,resumeAnimation:C}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&C&&C(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const M=gm(_.type==="pointercancel"?this.lastMoveEventInfo:sd(w,this.transformPagePoint),this.history);this.startEvent&&v&&v(_,M),S&&S(_,M)},!Eg(e))return;this.dragSnapToOrigin=l,this.handlers=i,this.transformPagePoint=a,this.distanceThreshold=c,this.contextWindow=s||window;const f=Mc(e),h=sd(f,this.transformPagePoint),{point:m}=h,{timestamp:g}=Sn;this.history=[{...m,timestamp:g}];const{onSessionStart:x}=i;x&&x(e,gm(h,this.history)),this.removeListeners=Rc(rc(this.contextWindow,"pointermove",this.handlePointerMove),rc(this.contextWindow,"pointerup",this.handlePointerUp),rc(this.contextWindow,"pointercancel",this.handlePointerUp)),d&&this.startScrollTracking(d)}startScrollTracking(e){let i=e.parentElement;for(;i;){const a=getComputedStyle(i);(N2.has(a.overflowX)||N2.has(a.overflowY))&&this.scrollPositions.set(i,{x:i.scrollLeft,y:i.scrollTop}),i=i.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener("scroll",this.onElementScroll,{capture:!0}),window.addEventListener("scroll",this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener("scroll",this.onElementScroll,{capture:!0}),window.removeEventListener("scroll",this.onWindowScroll)}}handleScroll(e){const i=this.scrollPositions.get(e);if(!i)return;const a=e===window,s=a?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},l={x:s.x-i.x,y:s.y-i.y};l.x===0&&l.y===0||(a?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=l.x,this.lastMoveEventInfo.point.y+=l.y):this.history.length>0&&(this.history[0].x-=l.x,this.history[0].y-=l.y),this.scrollPositions.set(e,s),_t.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Pa(this.updatePoint)}}function sd(t,e){return e?{point:e(t.point)}:t}function z2(t,e){return{x:t.x-e.x,y:t.y-e.y}}function gm({point:t},e){return{point:t,delta:z2(t,nT(e)),offset:z2(t,AR(e)),velocity:RR(e,.1)}}function AR(t){return t[0]}function nT(t){return t[t.length-1]}function RR(t,e){if(t.length<2)return{x:0,y:0};let i=t.length-1,a=null;const s=nT(t);for(;i>=0&&(a=t[i],!(s.timestamp-a.timestamp>_i(e)));)i--;if(!a)return{x:0,y:0};a===t[0]&&t.length>2&&s.timestamp-a.timestamp>_i(e)*2&&(a=t[1]);const l=Yi(s.timestamp-a.timestamp);if(l===0)return{x:0,y:0};const c={x:(s.x-a.x)/l,y:(s.y-a.y)/l};return c.x===1/0&&(c.x=0),c.y===1/0&&(c.y=0),c}function DR(t,{min:e,max:i},a){return e!==void 0&&t<e?t=a?Ot(e,t,a.min):Math.max(t,e):i!==void 0&&t>i&&(t=a?Ot(i,t,a.max):Math.min(t,i)),t}function P2(t,e,i){return{min:e!==void 0?t.min+e:void 0,max:i!==void 0?t.max+i-(t.max-t.min):void 0}}function OR(t,{top:e,left:i,bottom:a,right:s}){return{x:P2(t.x,i,s),y:P2(t.y,e,a)}}function U2(t,e){let i=e.min-t.min,a=e.max-t.max;return e.max-e.min<t.max-t.min&&([i,a]=[a,i]),{min:i,max:a}}function MR(t,e){return{x:U2(t.x,e.x),y:U2(t.y,e.y)}}function LR(t,e){let i=.5;const a=Bn(t),s=Bn(e);return s>a?i=fc(e.min,e.max-a,t.min):a>s&&(i=fc(t.min,t.max-s,e.min)),Rr(0,1,i)}function jR(t,e){const i={};return e.min!==void 0&&(i.min=e.min-t.min),e.max!==void 0&&(i.max=e.max-t.min),i}const w0=.35;function NR(t=w0){return t===!1?t=0:t===!0&&(t=w0),{x:I2(t,"left","right"),y:I2(t,"top","bottom")}}function I2(t,e,i){return{min:B2(t,e),max:B2(t,i)}}function B2(t,e){return typeof t=="number"?t:t[e]||0}const zR=new WeakMap;class PR{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=dn(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:i=!1,distanceThreshold:a}={}){const{presenceContext:s}=this.visualElement;if(s&&s.isPresent===!1)return;const l=g=>{i&&this.snapToCursor(Mc(g).point),this.stopAnimation()},c=(g,x)=>{const{drag:_,dragPropagation:w,onDragStart:v}=this.getProps();if(_&&!w&&(this.openDragLock&&this.openDragLock(),this.openDragLock=u6(_),!this.openDragLock))return;this.latestPointerEvent=g,this.latestPanInfo=x,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gr(C=>{let M=this.getAxisMotionValue(C).get()||0;if(Er.test(M)){const{projection:R}=this.visualElement;if(R&&R.layout){const L=R.layout.layoutBox[C];L&&(M=Bn(L)*(parseFloat(M)/100))}}this.originPoint[C]=M}),v&&_t.update(()=>v(g,x),!1,!0),f0(this.visualElement,"transform");const{animationState:S}=this.visualElement;S&&S.setActive("whileDrag",!0)},d=(g,x)=>{this.latestPointerEvent=g,this.latestPanInfo=x;const{dragPropagation:_,dragDirectionLock:w,onDirectionLock:v,onDrag:S}=this.getProps();if(!_&&!this.openDragLock)return;const{offset:C}=x;if(w&&this.currentDirection===null){this.currentDirection=IR(C),this.currentDirection!==null&&v&&v(this.currentDirection);return}this.updateAxis("x",x.point,C),this.updateAxis("y",x.point,C),this.visualElement.render(),S&&_t.update(()=>S(g,x),!1,!0)},f=(g,x)=>{this.latestPointerEvent=g,this.latestPanInfo=x,this.stop(g,x),this.latestPointerEvent=null,this.latestPanInfo=null},h=()=>{const{dragSnapToOrigin:g}=this.getProps();(g||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:m}=this.getProps();this.panSession=new tT(e,{onSessionStart:l,onStart:c,onMove:d,onSessionEnd:f,resumeAnimation:h},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:m,distanceThreshold:a,contextWindow:eT(this.visualElement),element:this.visualElement.current})}stop(e,i){const a=e||this.latestPointerEvent,s=i||this.latestPanInfo,l=this.isDragging;if(this.cancel(),!l||!s||!a)return;const{velocity:c}=s;this.startAnimation(c);const{onDragEnd:d}=this.getProps();d&&_t.postRender(()=>d(a,s))}cancel(){this.isDragging=!1;const{projection:e,animationState:i}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:a}=this.getProps();!a&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),i&&i.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,i,a){const{drag:s}=this.getProps();if(!a||!od(e,s,this.currentDirection))return;const l=this.getAxisMotionValue(e);let c=this.originPoint[e]+a[e];this.constraints&&this.constraints[e]&&(c=DR(c,this.constraints[e],this.elastic[e])),l.set(c)}resolveConstraints(){const{dragConstraints:e,dragElastic:i}=this.getProps(),a=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,s=this.constraints;e&&go(e)?this.constraints||(this.constraints=this.resolveRefConstraints()):e&&a?this.constraints=OR(a.layoutBox,e):this.constraints=!1,this.elastic=NR(i),s!==this.constraints&&!go(e)&&a&&this.constraints&&!this.hasMutatedConstraints&&gr(l=>{this.constraints!==!1&&this.getAxisMotionValue(l)&&(this.constraints[l]=jR(a.layoutBox[l],this.constraints[l]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:i}=this.getProps();if(!e||!go(e))return!1;const a=e.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const l=I6(a,s.root,this.visualElement.getTransformPagePoint());let c=MR(s.layout.layoutBox,l);if(i){const d=i(z6(c));this.hasMutatedConstraints=!!d,d&&(c=__(d))}return c}startAnimation(e){const{drag:i,dragMomentum:a,dragElastic:s,dragTransition:l,dragSnapToOrigin:c,onDragTransitionEnd:d}=this.getProps(),f=this.constraints||{},h=gr(m=>{if(!od(m,i,this.currentDirection))return;let g=f&&f[m]||{};(c===!0||c===m)&&(g={min:0,max:0});const x=s?200:1e6,_=s?40:1e7,w={type:"inertia",velocity:a?e[m]:0,bounceStiffness:x,bounceDamping:_,timeConstant:750,restDelta:1,restSpeed:10,...l,...g};return this.startAxisValueAnimation(m,w)});return Promise.all(h).then(d)}startAxisValueAnimation(e,i){const a=this.getAxisMotionValue(e);return f0(this.visualElement,e),a.start(bg(e,a,0,i,this.visualElement,!1))}stopAnimation(){gr(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){const i=`_drag${e.toUpperCase()}`,a=this.visualElement.getProps(),s=a[i];return s||this.visualElement.getValue(e,(a.initial?a.initial[e]:void 0)||0)}snapToCursor(e){gr(i=>{const{drag:a}=this.getProps();if(!od(i,a,this.currentDirection))return;const{projection:s}=this.visualElement,l=this.getAxisMotionValue(i);if(s&&s.layout){const{min:c,max:d}=s.layout.layoutBox[i],f=l.get()||0;l.set(e[i]-Ot(c,d,.5)+f)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:i}=this.getProps(),{projection:a}=this.visualElement;if(!go(i)||!a||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};gr(c=>{const d=this.getAxisMotionValue(c);if(d&&this.constraints!==!1){const f=d.get();s[c]=LR({min:f,max:f},this.constraints[c])}});const{transformTemplate:l}=this.visualElement.getProps();this.visualElement.current.style.transform=l?l({},""):"none",a.root&&a.root.updateScroll(),a.updateLayout(),this.constraints=!1,this.resolveConstraints(),gr(c=>{if(!od(c,e,null))return;const d=this.getAxisMotionValue(c),{min:f,max:h}=this.constraints[c];d.set(Ot(f,h,s[c]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;zR.set(this.visualElement,this);const e=this.visualElement.current,i=rc(e,"pointerdown",h=>{const{drag:m,dragListener:g=!0}=this.getProps(),x=h.target,_=x!==e&&g6(x);m&&g&&!_&&this.start(h)});let a;const s=()=>{const{dragConstraints:h}=this.getProps();go(h)&&h.current&&(this.constraints=this.resolveRefConstraints(),a||(a=UR(e,h.current,()=>this.scalePositionWithinConstraints())))},{projection:l}=this.visualElement,c=l.addEventListener("measure",s);l&&!l.layout&&(l.root&&l.root.updateScroll(),l.updateLayout()),_t.read(s);const d=mc(window,"resize",()=>this.scalePositionWithinConstraints()),f=l.addEventListener("didUpdate",(({delta:h,hasLayoutChanged:m})=>{this.isDragging&&m&&(gr(g=>{const x=this.getAxisMotionValue(g);x&&(this.originPoint[g]+=h[g].translate,x.set(x.get()+h[g].translate))}),this.visualElement.render())}));return()=>{d(),i(),c(),f&&f(),a&&a()}}getProps(){const e=this.visualElement.getProps(),{drag:i=!1,dragDirectionLock:a=!1,dragPropagation:s=!1,dragConstraints:l=!1,dragElastic:c=w0,dragMomentum:d=!0}=e;return{...e,drag:i,dragDirectionLock:a,dragPropagation:s,dragConstraints:l,dragElastic:c,dragMomentum:d}}}function V2(t){let e=!0;return()=>{if(e){e=!1;return}t()}}function UR(t,e,i){const a=Xv(t,V2(i)),s=Xv(e,V2(i));return()=>{a(),s()}}function od(t,e,i){return(e===!0||e===t)&&(i===null||i===t)}function IR(t,e=10){let i=null;return Math.abs(t.y)>e?i="y":Math.abs(t.x)>e&&(i="x"),i}class BR extends Va{constructor(e){super(e),this.removeGroupControls=Ki,this.removeListeners=Ki,this.controls=new PR(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Ki}update(){const{dragControls:e}=this.node.getProps(),{dragControls:i}=this.node.prevProps||{};e!==i&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const ym=t=>(e,i)=>{t&&_t.update(()=>t(e,i),!1,!0)};class VR extends Va{constructor(){super(...arguments),this.removePointerDownListener=Ki}onPointerDown(e){this.session=new tT(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:eT(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:i,onPan:a,onPanEnd:s}=this.node.getProps();return{onSessionStart:ym(e),onStart:ym(i),onMove:ym(a),onEnd:(l,c)=>{delete this.session,s&&_t.postRender(()=>s(l,c))}}}mount(){this.removePointerDownListener=rc(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let xm=!1;class FR extends E.Component{componentDidMount(){const{visualElement:e,layoutGroup:i,switchLayoutGroup:a,layoutId:s}=this.props,{projection:l}=e;l&&(i.group&&i.group.add(l),a&&a.register&&s&&a.register(l),xm&&l.root.didUpdate(),l.addEventListener("animationComplete",()=>{this.safeToRemove()}),l.setOptions({...l.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Nd.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:i,visualElement:a,drag:s,isPresent:l}=this.props,{projection:c}=a;return c&&(c.isPresent=l,e.layoutDependency!==i&&c.setOptions({...c.options,layoutDependency:i}),xm=!0,s||e.layoutDependency!==i||i===void 0||e.isPresent!==l?c.willUpdate():this.safeToRemove(),e.isPresent!==l&&(l?c.promote():c.relegate()||_t.postRender(()=>{const d=c.getStack();(!d||!d.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:e,layoutAnchor:i}=this.props,{projection:a}=e;a&&(a.options.layoutAnchor=i,a.root.didUpdate(),Tg.postRender(()=>{!a.currentAnimation&&a.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:i,switchLayoutGroup:a}=this.props,{projection:s}=e;xm=!0,s&&(s.scheduleCheckAfterUnmount(),i&&i.group&&i.group.remove(s),a&&a.deregister&&a.deregister(s))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function iT(t){const[e,i]=q_(),a=E.useContext(rg);return b.jsx(FR,{...t,layoutGroup:a,switchLayoutGroup:E.useContext(W_),isPresent:e,safeToRemove:i})}const HR={pan:{Feature:VR},drag:{Feature:BR,ProjectionNode:$_,MeasureLayout:iT}};function F2(t,e,i){const{props:a}=t;t.animationState&&a.whileHover&&t.animationState.setActive("whileHover",i==="Start");const s="onHover"+i,l=a[s];l&&_t.postRender(()=>l(e,Mc(e)))}class $R extends Va{mount(){const{current:e}=this.node;e&&(this.unmount=f6(e,(i,a)=>(F2(this.node,a,"Start"),s=>F2(this.node,s,"End"))))}unmount(){}}class qR extends Va{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=Rc(mc(this.node.current,"focus",()=>this.onFocus()),mc(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function H2(t,e,i){const{props:a}=t;if(t.current instanceof HTMLButtonElement&&t.current.disabled)return;t.animationState&&a.whileTap&&t.animationState.setActive("whileTap",i==="Start");const s="onTap"+(i==="End"?"":i),l=a[s];l&&_t.postRender(()=>l(e,Mc(e)))}class YR extends Va{mount(){const{current:e}=this.node;if(!e)return;const{globalTapTarget:i,propagate:a}=this.node.props;this.unmount=x6(e,(s,l)=>(H2(this.node,l,"Start"),(c,{success:d})=>H2(this.node,c,d?"End":"Cancel")),{useGlobalTarget:i,stopPropagation:a?.tap===!1})}unmount(){}}const S0=new WeakMap,bm=new WeakMap,GR=t=>{const e=S0.get(t.target);e&&e(t)},XR=t=>{t.forEach(GR)};function KR({root:t,...e}){const i=t||document;bm.has(i)||bm.set(i,{});const a=bm.get(i),s=JSON.stringify(e);return a[s]||(a[s]=new IntersectionObserver(XR,{root:t,...e})),a[s]}function ZR(t,e,i){const a=KR(e);return S0.set(t,i),a.observe(t),()=>{S0.delete(t),a.unobserve(t)}}const QR={some:0,all:1};class WR extends Va{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.stopObserver?.();const{viewport:e={}}=this.node.getProps(),{root:i,margin:a,amount:s="some",once:l}=e,c={root:i?i.current:void 0,rootMargin:a,threshold:typeof s=="number"?s:QR[s]},d=f=>{const{isIntersecting:h}=f;if(this.isInView===h||(this.isInView=h,l&&!h&&this.hasEnteredView))return;h&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",h);const{onViewportEnter:m,onViewportLeave:g}=this.node.getProps(),x=h?m:g;x&&x(f)};this.stopObserver=ZR(this.node.current,c,d)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:i}=this.node;["amount","margin","root"].some(JR(e,i))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}}function JR({viewport:t={}},{viewport:e={}}={}){return i=>t[i]!==e[i]}const eD={inView:{Feature:WR},tap:{Feature:YR},focus:{Feature:qR},hover:{Feature:$R}},tD={layout:{ProjectionNode:$_,MeasureLayout:iT}},nD={...ER,...eD,...HR,...tD},nn=vR(nD,wR),iD={some:0,all:1};function rD(t,e,{root:i,margin:a,amount:s="some"}={}){const l=_g(t),c=new WeakMap,d=h=>{h.forEach(m=>{const g=c.get(m.target);if(m.isIntersecting!==!!g)if(m.isIntersecting){const x=e(m.target,m);typeof x=="function"?c.set(m.target,x):f.unobserve(m.target)}else typeof g=="function"&&(g(m),c.delete(m.target))})},f=new IntersectionObserver(d,{root:i,rootMargin:a,threshold:typeof s=="number"?s:iD[s]});return l.forEach(h=>f.observe(h)),()=>f.disconnect()}function rT(t,{root:e,margin:i,amount:a,once:s=!1,initial:l=!1}={}){const[c,d]=E.useState(l);return E.useEffect(()=>{if(!t.current||s&&c)return;const f=()=>(d(!0),s?void 0:()=>d(!1)),h={root:e&&e.current||void 0,margin:i,amount:a};return rD(t.current,f,h)},[e,t,i,s,a]),c}const aD=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),aT=(...t)=>t.filter((e,i,a)=>!!e&&a.indexOf(e)===i).join(" ");var sD={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const oD=E.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:s="",children:l,iconNode:c,...d},f)=>E.createElement("svg",{ref:f,...sD,width:e,height:e,stroke:t,strokeWidth:a?Number(i)*24/Number(e):i,className:aT("lucide",s),...d},[...c.map(([h,m])=>E.createElement(h,m)),...Array.isArray(l)?l:[l]]));const Mt=(t,e)=>{const i=E.forwardRef(({className:a,...s},l)=>E.createElement(oD,{ref:l,iconNode:e,className:aT(`lucide-${aD(t)}`,a),...s}));return i.displayName=`${t}`,i};const sT=Mt("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);const Ng=Mt("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);const zg=Mt("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);const _f=Mt("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);const $2=Mt("Compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);const lD=Mt("Crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);const cD=Mt("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);const uD=Mt("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);const dD=Mt("FolderUp",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"m9 13 3-3 3 3",key:"1pxg3c"}]]);const oT=Mt("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);const fD=Mt("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);const hD=Mt("LockKeyhole",[["circle",{cx:"12",cy:"16",r:"1",key:"1au0dj"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2",key:"6s8ecr"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3",key:"1pqi11"}]]);const pD=Mt("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);const mD=Mt("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);const lT=Mt("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);const gD=Mt("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);const gc=Mt("Plane",[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",key:"1v9wt8"}]]);const yD=Mt("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);const xD=Mt("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);const bD=Mt("Send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);const cT=Mt("Shirt",[["path",{d:"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",key:"1wgbhj"}]]);const vD=Mt("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);const wD=Mt("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);const SD=Mt("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);const Sr=Mt("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function uT(t){const e=t.match(/\d{4}/g);if(!e?.length)return t;const i=[...new Set(e)];return i.length===1?i[0]:`${i[0]}–${i.at(-1)}`}function _D(t){const e=String(t.id).padStart(3,"0"),i=uT(t.period).replace(/–/g,"-"),a=`pjt-${e}-${i}`,s=t.teamName?.trim();return s?`${a}-${s}`:a}function TD({project:t,onOpenDemo:e,onOpenGithub:i}){const a=t.comingSoon||!t.demoUrl,s=t.comingSoon||!t.githubUrl,l=t.logoPresentation==="large",c=_D(t);return b.jsxs("div",{className:"project-ticket relative overflow-hidden",children:[b.jsx("div",{className:"project-ticket__stripe","aria-hidden":!0}),b.jsx("div",{className:"project-ticket__stripe project-ticket__stripe--bottom","aria-hidden":!0}),b.jsxs("div",{className:"project-ticket__inner grid gap-0 lg:grid-cols-[1fr_6fr_3fr]",children:[b.jsx("div",{className:"project-ticket__barcode-col relative hidden lg:block",children:b.jsx("div",{className:"project-ticket__barcode-vert","aria-hidden":!0})}),b.jsxs("div",{className:"project-ticket__main relative min-w-0 p-6 lg:p-8",children:[b.jsxs("div",{className:"flex items-center justify-between gap-6 lg:gap-8",children:[b.jsxs("div",{className:"min-w-0",children:[b.jsxs("div",{className:"flex items-center gap-3",children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#B8654B]",children:"TRAVEL EVENT"}),b.jsxs("div",{className:"project-ticket__meta font-mono-custom text-[11px] tracking-[0.22em] text-[#1A3A52]/70",children:["FLIGHT: PRJ-",String(t.id).padStart(3,"0")," · GATE: A"]})]}),b.jsx("div",{className:"font-display text-3xl lg:text-4xl text-[#1A3A52] truncate",children:t.name}),b.jsx("div",{className:"mt-2 font-mono-custom text-xs leading-relaxed text-[#999]",children:t.period})]}),b.jsx("div",{className:"shrink-0",children:t.logoImageUrl?b.jsx("div",{className:"flex h-[5.25rem] w-[5.25rem] sm:h-24 sm:w-24 items-center justify-center overflow-hidden border border-[#1A3A52]/25 bg-white p-3 shadow-sm",children:b.jsx("img",{src:t.logoImageUrl,alt:`${t.name} logo`,className:l?"max-h-full max-w-full object-contain scale-[1.2] origin-center":"max-h-full max-w-full object-contain",loading:"lazy"})}):b.jsx("div",{className:"grid h-[5.25rem] w-[5.25rem] place-items-center border border-[#1A3A52]/25 bg-white text-5xl shadow-sm sm:h-24 sm:w-24",children:t.logoText??"✈️"})})]}),b.jsxs("div",{className:"mt-7",children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"ABOUT"}),b.jsx("p",{className:"mt-2 font-body text-[15px] leading-6 text-[#5A5A5A]",children:t.summary})]}),b.jsxs("div",{className:"mt-7",children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"STACK"}),b.jsx("div",{className:"mt-3 flex flex-wrap gap-2",children:t.tech.map(d=>b.jsx("span",{className:"font-mono-custom text-[11px] px-3 py-1 border border-[#D4AF37] text-[#1A3A52] bg-[#F5F5DC]/60",children:d},d))})]}),b.jsx("div",{className:"mt-7 flex items-end justify-between gap-6",children:b.jsxs("div",{className:"min-w-0",children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"SERIAL"}),b.jsx("div",{className:"mt-1 font-mono-custom text-xs tracking-wide text-[#1A3A52] break-all",title:c,children:c})]})})]}),b.jsxs("div",{className:"project-ticket__stub min-w-0 p-6 lg:p-8 flex flex-col justify-center",children:[b.jsx("span",{className:"project-ticket__perforation","aria-hidden":!0}),b.jsxs("div",{className:"border border-[#1A3A52]/15 bg-white/55 px-5 py-6 backdrop-blur-[2px] flex flex-col gap-5 w-full",children:[b.jsxs("div",{className:"flex items-center justify-between",children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"BOARDING PASS"}),b.jsx(gc,{size:18,color:"#1A3A52"})]}),b.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[b.jsxs("div",{children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"YEAR"}),b.jsx("div",{className:"mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]",children:uT(t.period)})]}),b.jsxs("div",{children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"STACK"}),b.jsxs("div",{className:"mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]",children:[t.mainStackCount,"+ TECH"]})]}),b.jsxs("div",{children:[b.jsx("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:"STATUS"}),b.jsx("div",{className:"mt-1 inline-flex font-mono-custom text-[11px] tracking-widest px-2 py-1 border",style:{borderColor:t.comingSoon?"#B8654B":"#1A3A52",color:t.comingSoon?"#B8654B":"#1A3A52"},children:t.comingSoon?"SOON":"READY"})]})]}),b.jsxs("div",{className:"grid gap-3",children:[b.jsxs("button",{type:"button",onClick:e,disabled:a,className:"w-full inline-flex items-center justify-center gap-2 px-5 py-3 border-2 transition-colors duration-200 font-mono-custom text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1A3A52] hover:text-[#F5F5DC]",style:{borderColor:"#1A3A52",backgroundColor:"transparent",color:"#1A3A52"},children:[b.jsx(uD,{size:16}),"VIEW DEMO"]}),b.jsxs("button",{type:"button",onClick:i,disabled:s,className:"w-full inline-flex items-center justify-center gap-2 px-5 py-3 border-2 transition-colors duration-200 font-mono-custom text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#D4AF37] hover:border-[#D4AF37]",style:{borderColor:"#D4AF37",backgroundColor:"#D4AF37",color:"#1A3A52"},children:[b.jsx(oT,{size:16}),"GITHUB"]})]}),b.jsx("div",{className:"flex items-center justify-between gap-4",children:b.jsxs("div",{className:"font-mono-custom text-[11px] tracking-[0.28em] text-[#999]",children:["CHECK-IN ",b.jsx("span",{className:"ml-2 text-[#1A3A52] tracking-widest",children:t.comingSoon?"TBD":"OPEN"})]})})]})]})]})]})}const Bl=[{id:1,name:"요리의 정원",period:"2024.10.07 ~ 2024.12.24",summary:"재료 사진 인식 레시피 추천 웹 서비스. YOLOv11로 재료를 인식하고 Gemini API로 레시피를 추천합니다.",tech:["Flask","Python","YOLOv11","Gemini API"],mainStackCount:3,githubUrl:"https://github.com/ggabaegii/RecipeRecommendation",demoUrl:"/projects/project1/index.html",logoImageUrl:"/projects/project1/static/images/mascot.jpg",teamName:"ojo"},{id:2,name:"한페이지",period:"2025.05.22 ~ 2025.05.28",summary:"Django + Vue로 만든 도서 추천 웹 서비스. 맞춤 추천, 커뮤니티, AI 기능(gTTS/이미지 생성)을 제공합니다.",tech:["Django","Vue.js","DRF","AI"],mainStackCount:3,demoUrl:"/projects/project2/front/dist/index.html",logoImageUrl:"/projects/project2/front/src/assets/lib.jpg"},{id:3,name:"FocusMate",period:"2025.07.07 ~ 2025.08.22",summary:"온라인 스터디 메이트 매칭 + 실시간 화상회의 플랫폼. WebRTC(OpenVidu) 기반 통화/화면공유/화이트보드/뽀모도로 제공.",tech:["Vue 3","TypeScript","OpenVidu","WebRTC"],mainStackCount:3,demoUrl:"/projects/project3/dist/index.html",logoImageUrl:"/projects/project3/src/assets/images/FMlogo.png",logoPresentation:"large",teamName:"ChillySource"},{id:4,name:"ON-WEAR",period:"2025.08 ~ 2026.04",summary:"가상 피팅·이미지 검색·맞춤 추천·인기 아이템을 한 화면에서. React + Zustand + Emotion 기반 프론트 (포트폴리오 데모는 정적 목 데이터).",tech:["React 19","TypeScript","Vite","Zustand","Emotion","GSAP"],mainStackCount:4,demoUrl:"/demos/fashion/main",logoImageUrl:"/demos/fashion/img/logo.png",logoPresentation:"large"}];function ED({project:t,onClose:e}){return t.demoUrl?b.jsx(Mg,{children:b.jsx(nn.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",onClick:e,children:b.jsxs(nn.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden",onClick:i=>i.stopPropagation(),children:[b.jsxs("div",{className:"flex justify-between items-center p-4 border-b",style:{borderColor:"#EEE"},children:[b.jsxs("div",{className:"font-display text-lg",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:[t.name," · Demo"]}),b.jsx("button",{onClick:e,className:"p-2 hover:bg-gray-100 rounded transition-colors","aria-label":"Close",children:b.jsx(Sr,{size:20,color:"#1A3A52"})})]}),b.jsx("iframe",{title:`${t.name} demo`,src:t.demoUrl,className:"w-full h-[75vh]"})]})})}):null}function CD(){const[t,e]=E.useState(0),[i,a]=E.useState(null),s=E.useRef(null),l=()=>e(f=>(f+1)%Bl.length),c=()=>e(f=>(f-1+Bl.length)%Bl.length),d=Bl[t];return b.jsxs("section",{id:"journey",className:"py-24 lg:py-40",style:{backgroundColor:"#F5F5DC"},children:[b.jsxs("div",{className:"max-w-6xl mx-auto px-6",children:[b.jsxs(nn.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6},viewport:{once:!0},className:"mb-16 text-center",children:[b.jsx("span",{className:"font-mono-custom text-sm tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#B8654B"},children:"MAIN JOURNEY"}),b.jsx("h2",{className:"font-display text-5xl lg:text-6xl mt-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"Featured Projects"})]}),b.jsxs("div",{ref:s,className:"relative",children:[b.jsx(Mg,{mode:"wait",children:b.jsxs(nn.div,{initial:{opacity:0,x:100},animate:{opacity:1,x:0},exit:{opacity:0,x:-100},transition:{duration:.5},className:"relative",children:[b.jsx(TD,{project:d,onOpenDemo:()=>a(d),onOpenGithub:()=>{d.githubUrl&&window.open(d.githubUrl,"_blank","noopener,noreferrer")}}),b.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 -bottom-7 flex items-center gap-2",children:Bl.map((f,h)=>b.jsx("button",{onClick:()=>e(h),className:"h-2.5 rounded-full transition-all duration-200",style:{width:h===t?"18px":"10px",backgroundColor:h===t?"#D4AF37":"rgba(26,58,82,0.25)"},"aria-label":`Go to project ${h+1}`},h))})]},d.id)}),b.jsx("div",{className:"pointer-events-none absolute inset-y-0 -left-14 -right-14 hidden lg:block group",children:b.jsxs("div",{className:"relative h-full",children:[b.jsx("div",{className:"absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto group/left",children:b.jsx("button",{type:"button",onClick:c,className:"px-1 py-2 text-[#1A3A52] opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100","aria-label":"Previous project",children:b.jsx(Ng,{size:36,strokeWidth:1.6})})}),b.jsx("div",{className:"absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto group/right",children:b.jsx("button",{type:"button",onClick:l,className:"px-1 py-2 text-[#1A3A52] opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100","aria-label":"Next project",children:b.jsx(zg,{size:36,strokeWidth:1.6})})})]})})]})]}),i&&b.jsx(ED,{project:i,onClose:()=>a(null)})]})}const kD="https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/passport-page-FVDrJSCdXt6FT97Pfj2RaX.webp",q2=[{name:"React",emoji:"⚛️",color:"#61DAFB"},{name:"Vue",emoji:"🟩",color:"#42B883"},{name:"Node.js",emoji:"🟢",color:"#68A063"},{name:"Python",emoji:"🐍",color:"#3776AB"},{name:"TypeScript",emoji:"📘",color:"#3178C6"},{name:"Django",emoji:"🛠️",color:"#0C4B33"},{name:"Docker",emoji:"🐳",color:"#2496ED"},{name:"Git",emoji:"🔀",color:"#F05032"}];function AD(){const t=E.useRef(null),e=rT(t,{once:!0,margin:"-100px"}),i=E.useMemo(()=>q2.map(()=>`${Math.random()*6-3}deg`),[]);return b.jsx("section",{id:"passport",ref:t,className:"py-24 lg:py-40",style:{backgroundColor:"#F5F5DC"},children:b.jsxs("div",{className:"max-w-6xl mx-auto px-6",children:[b.jsxs(nn.div,{initial:{opacity:0,y:20},animate:e?{opacity:1,y:0}:{},transition:{duration:.6},className:"mb-16 text-center",children:[b.jsx("span",{className:"font-mono-custom text-sm tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#B8654B"},children:"PASSPORT & STAMPS"}),b.jsx("h2",{className:"font-display text-5xl lg:text-6xl mt-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"My Developer Profile"})]}),b.jsxs("div",{className:"grid lg:grid-cols-2 gap-12 items-center",children:[b.jsx(nn.div,{initial:{opacity:0,x:-40},animate:e?{opacity:1,x:0}:{},transition:{duration:.6,delay:.1},className:"relative",children:b.jsx("div",{className:"w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4",style:{backgroundImage:`url(${kD})`,backgroundSize:"cover",backgroundPosition:"center",borderColor:"#1A3A52"},children:b.jsxs("div",{className:"absolute inset-0 p-8 flex flex-col justify-between",children:[b.jsxs("div",{children:[b.jsx("h3",{className:"font-display text-3xl",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"DEVELOPER"}),b.jsx("p",{className:"font-mono-custom text-sm mt-2",style:{fontFamily:"'Courier Prime', monospace",color:"#5A5A5A"},children:"Full Stack Engineer"})]}),b.jsx("div",{children:b.jsx("p",{className:"font-body text-sm leading-relaxed mb-6",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"사용자 경험을 최우선으로 두고, 유지보수성과 확장성을 갖춘 웹 서비스를 만드는 걸 좋아합니다."})})]})})}),b.jsxs(nn.div,{initial:{opacity:0,x:40},animate:e?{opacity:1,x:0}:{},transition:{duration:.6,delay:.2},children:[b.jsxs("div",{className:"mb-12",children:[b.jsx("h3",{className:"font-display text-3xl mb-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"About This Journey"}),b.jsx("p",{className:"font-body text-base leading-relaxed mb-4",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"여러 기술 스택과 도메인을 넘나들며 프로젝트를 만들었습니다. 각 프로젝트는 목적지이고, 각 기술은 새로운 스탬프입니다."}),b.jsxs("p",{className:"font-body text-base leading-relaxed",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:["나의 철학:"," ",b.jsx("span",{style:{color:"#D4AF37",fontWeight:700},children:"여행하듯 오래 쓰이는 코드"}),"— 유지보수 가능하고, 확장 가능하며, 환경 변화에 유연한 코드."]})]}),b.jsxs("div",{children:[b.jsx("h4",{className:"font-display text-xl mb-6",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"Visited Technologies"}),b.jsx("div",{className:"grid grid-cols-2 gap-4",children:q2.map((a,s)=>b.jsxs(nn.div,{initial:{opacity:0,scale:.8,rotate:-15},animate:e?{opacity:1,scale:1,rotate:0}:{},transition:{duration:.5,delay:s*.08+.3},className:"vintage-stamp p-4 text-center",style:{borderColor:a.color,backgroundColor:"rgba(245,245,220,0.5)",transform:`rotate(${i[s]})`},children:[b.jsx("div",{className:"text-3xl mb-2",children:a.emoji}),b.jsx("span",{className:"font-mono-custom text-xs tracking-widest block",style:{fontFamily:"'Courier Prime', monospace",color:a.color},children:a.name})]},a.name))})]})]})]})]})})}var Lc=x5();const RD=y5(Lc);function DD(t){if(typeof document>"u")return;let e=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",e.appendChild(i),i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t))}const OD=t=>{switch(t){case"success":return jD;case"info":return zD;case"warning":return ND;case"error":return PD;default:return null}},MD=Array(12).fill(0),LD=({visible:t,className:e})=>_e.createElement("div",{className:["sonner-loading-wrapper",e].filter(Boolean).join(" "),"data-visible":t},_e.createElement("div",{className:"sonner-spinner"},MD.map((i,a)=>_e.createElement("div",{className:"sonner-loading-bar",key:`spinner-bar-${a}`})))),jD=_e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},_e.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",clipRule:"evenodd"})),ND=_e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",height:"20",width:"20"},_e.createElement("path",{fillRule:"evenodd",d:"M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",clipRule:"evenodd"})),zD=_e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},_e.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",clipRule:"evenodd"})),PD=_e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",height:"20",width:"20"},_e.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",clipRule:"evenodd"})),UD=_e.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"},_e.createElement("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),_e.createElement("line",{x1:"6",y1:"6",x2:"18",y2:"18"})),ID=()=>{const[t,e]=_e.useState(document.hidden);return _e.useEffect(()=>{const i=()=>{e(document.hidden)};return document.addEventListener("visibilitychange",i),()=>window.removeEventListener("visibilitychange",i)},[]),t};let _0=1,BD=class{constructor(){this.subscribe=e=>(this.subscribers.push(e),()=>{const i=this.subscribers.indexOf(e);this.subscribers.splice(i,1)}),this.publish=e=>{this.subscribers.forEach(i=>i(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e]},this.create=e=>{var i;const{message:a,...s}=e,l=typeof e?.id=="number"||((i=e.id)==null?void 0:i.length)>0?e.id:_0++,c=this.toasts.find(f=>f.id===l),d=e.dismissible===void 0?!0:e.dismissible;return this.dismissedToasts.has(l)&&this.dismissedToasts.delete(l),c?this.toasts=this.toasts.map(f=>f.id===l?(this.publish({...f,...e,id:l,title:a}),{...f,...e,id:l,dismissible:d,title:a}):f):this.addToast({title:a,...s,dismissible:d,id:l}),l},this.dismiss=e=>(e?(this.dismissedToasts.add(e),requestAnimationFrame(()=>this.subscribers.forEach(i=>i({id:e,dismiss:!0})))):this.toasts.forEach(i=>{this.subscribers.forEach(a=>a({id:i.id,dismiss:!0}))}),e),this.message=(e,i)=>this.create({...i,message:e}),this.error=(e,i)=>this.create({...i,message:e,type:"error"}),this.success=(e,i)=>this.create({...i,type:"success",message:e}),this.info=(e,i)=>this.create({...i,type:"info",message:e}),this.warning=(e,i)=>this.create({...i,type:"warning",message:e}),this.loading=(e,i)=>this.create({...i,type:"loading",message:e}),this.promise=(e,i)=>{if(!i)return;let a;i.loading!==void 0&&(a=this.create({...i,promise:e,type:"loading",message:i.loading,description:typeof i.description!="function"?i.description:void 0}));const s=Promise.resolve(e instanceof Function?e():e);let l=a!==void 0,c;const d=s.then(async h=>{if(c=["resolve",h],_e.isValidElement(h))l=!1,this.create({id:a,type:"default",message:h});else if(FD(h)&&!h.ok){l=!1;const g=typeof i.error=="function"?await i.error(`HTTP error! status: ${h.status}`):i.error,x=typeof i.description=="function"?await i.description(`HTTP error! status: ${h.status}`):i.description,w=typeof g=="object"&&!_e.isValidElement(g)?g:{message:g};this.create({id:a,type:"error",description:x,...w})}else if(h instanceof Error){l=!1;const g=typeof i.error=="function"?await i.error(h):i.error,x=typeof i.description=="function"?await i.description(h):i.description,w=typeof g=="object"&&!_e.isValidElement(g)?g:{message:g};this.create({id:a,type:"error",description:x,...w})}else if(i.success!==void 0){l=!1;const g=typeof i.success=="function"?await i.success(h):i.success,x=typeof i.description=="function"?await i.description(h):i.description,w=typeof g=="object"&&!_e.isValidElement(g)?g:{message:g};this.create({id:a,type:"success",description:x,...w})}}).catch(async h=>{if(c=["reject",h],i.error!==void 0){l=!1;const m=typeof i.error=="function"?await i.error(h):i.error,g=typeof i.description=="function"?await i.description(h):i.description,_=typeof m=="object"&&!_e.isValidElement(m)?m:{message:m};this.create({id:a,type:"error",description:g,..._})}}).finally(()=>{l&&(this.dismiss(a),a=void 0),i.finally==null||i.finally.call(i)}),f=()=>new Promise((h,m)=>d.then(()=>c[0]==="reject"?m(c[1]):h(c[1])).catch(m));return typeof a!="string"&&typeof a!="number"?{unwrap:f}:Object.assign(a,{unwrap:f})},this.custom=(e,i)=>{const a=i?.id||_0++;return this.create({jsx:e(a),id:a,...i}),a},this.getActiveToasts=()=>this.toasts.filter(e=>!this.dismissedToasts.has(e.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set}};const Zn=new BD,VD=(t,e)=>{const i=e?.id||_0++;return Zn.addToast({title:t,...e,id:i}),i},FD=t=>t&&typeof t=="object"&&"ok"in t&&typeof t.ok=="boolean"&&"status"in t&&typeof t.status=="number",HD=VD,$D=()=>Zn.toasts,qD=()=>Zn.getActiveToasts(),YD=Object.assign(HD,{success:Zn.success,info:Zn.info,warning:Zn.warning,error:Zn.error,custom:Zn.custom,message:Zn.message,promise:Zn.promise,dismiss:Zn.dismiss,loading:Zn.loading},{getHistory:$D,getToasts:qD});DD("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");function ld(t){return t.label!==void 0}const GD=3,XD="24px",KD="16px",Y2=4e3,ZD=356,QD=14,WD=45,JD=200;function hr(...t){return t.filter(Boolean).join(" ")}function eO(t){const[e,i]=t.split("-"),a=[];return e&&a.push(e),i&&a.push(i),a}const tO=t=>{var e,i,a,s,l,c,d,f,h;const{invert:m,toast:g,unstyled:x,interacting:_,setHeights:w,visibleToasts:v,heights:S,index:C,toasts:M,expanded:R,removeToast:L,defaultRichColors:O,closeButton:j,style:k,cancelButtonStyle:U,actionButtonStyle:I,className:Y="",descriptionClassName:W="",duration:te,position:me,gap:we,expandByDefault:Se,classNames:z,icons:B,closeButtonAriaLabel:$="Close toast"}=t,[se,ce]=_e.useState(null),[P,q]=_e.useState(null),[G,ne]=_e.useState(!1),[ye,ue]=_e.useState(!1),[Te,he]=_e.useState(!1),[Ce,Ue]=_e.useState(!1),[Le,ze]=_e.useState(!1),[ot,nt]=_e.useState(0),[ct,ut]=_e.useState(0),ae=_e.useRef(g.duration||te||Y2),Tt=_e.useRef(null),Je=_e.useRef(null),ht=C===0,pt=C+1<=v,Ie=g.type,Et=g.dismissible!==!1,Ze=g.className||"",Vn=g.descriptionClassName||"",an=_e.useMemo(()=>S.findIndex(Oe=>Oe.toastId===g.id)||0,[S,g.id]),mt=_e.useMemo(()=>{var Oe;return(Oe=g.closeButton)!=null?Oe:j},[g.closeButton,j]),sn=_e.useMemo(()=>g.duration||te||Y2,[g.duration,te]),yn=_e.useRef(0),kn=_e.useRef(0),Fn=_e.useRef(0),Kt=_e.useRef(null),[ai,Ct]=me.split("-"),hn=_e.useMemo(()=>S.reduce((Oe,it,kt)=>kt>=an?Oe:Oe+it.height,0),[S,an]),zt=ID(),Qi=g.invert||m,si=Ie==="loading";kn.current=_e.useMemo(()=>an*we+hn,[an,hn]),_e.useEffect(()=>{ae.current=sn},[sn]),_e.useEffect(()=>{ne(!0)},[]),_e.useEffect(()=>{const Oe=Je.current;if(Oe){const it=Oe.getBoundingClientRect().height;return ut(it),w(kt=>[{toastId:g.id,height:it,position:g.position},...kt]),()=>w(kt=>kt.filter(de=>de.toastId!==g.id))}},[w,g.id]),_e.useLayoutEffect(()=>{if(!G)return;const Oe=Je.current,it=Oe.style.height;Oe.style.height="auto";const kt=Oe.getBoundingClientRect().height;Oe.style.height=it,ut(kt),w(de=>de.find(pe=>pe.toastId===g.id)?de.map(pe=>pe.toastId===g.id?{...pe,height:kt}:pe):[{toastId:g.id,height:kt,position:g.position},...de])},[G,g.title,g.description,w,g.id,g.jsx,g.action,g.cancel]);const on=_e.useCallback(()=>{ue(!0),nt(kn.current),w(Oe=>Oe.filter(it=>it.toastId!==g.id)),setTimeout(()=>{L(g)},JD)},[g,L,w,kn]);_e.useEffect(()=>{if(g.promise&&Ie==="loading"||g.duration===1/0||g.type==="loading")return;let Oe;return R||_||zt?(()=>{if(Fn.current<yn.current){const de=new Date().getTime()-yn.current;ae.current=ae.current-de}Fn.current=new Date().getTime()})():ae.current!==1/0&&(yn.current=new Date().getTime(),Oe=setTimeout(()=>{g.onAutoClose==null||g.onAutoClose.call(g,g),on()},ae.current)),()=>clearTimeout(Oe)},[R,_,g,Ie,zt,on]),_e.useEffect(()=>{g.delete&&(on(),g.onDismiss==null||g.onDismiss.call(g,g))},[on,g.delete]);function oi(){var Oe;if(B?.loading){var it;return _e.createElement("div",{className:hr(z?.loader,g==null||(it=g.classNames)==null?void 0:it.loader,"sonner-loader"),"data-visible":Ie==="loading"},B.loading)}return _e.createElement(LD,{className:hr(z?.loader,g==null||(Oe=g.classNames)==null?void 0:Oe.loader),visible:Ie==="loading"})}const li=g.icon||B?.[Ie]||OD(Ie);var Hn,ln;return _e.createElement("li",{tabIndex:0,ref:Je,className:hr(Y,Ze,z?.toast,g==null||(e=g.classNames)==null?void 0:e.toast,z?.default,z?.[Ie],g==null||(i=g.classNames)==null?void 0:i[Ie]),"data-sonner-toast":"","data-rich-colors":(Hn=g.richColors)!=null?Hn:O,"data-styled":!(g.jsx||g.unstyled||x),"data-mounted":G,"data-promise":!!g.promise,"data-swiped":Le,"data-removed":ye,"data-visible":pt,"data-y-position":ai,"data-x-position":Ct,"data-index":C,"data-front":ht,"data-swiping":Te,"data-dismissible":Et,"data-type":Ie,"data-invert":Qi,"data-swipe-out":Ce,"data-swipe-direction":P,"data-expanded":!!(R||Se&&G),"data-testid":g.testId,style:{"--index":C,"--toasts-before":C,"--z-index":M.length-C,"--offset":`${ye?ot:kn.current}px`,"--initial-height":Se?"auto":`${ct}px`,...k,...g.style},onDragEnd:()=>{he(!1),ce(null),Kt.current=null},onPointerDown:Oe=>{Oe.button!==2&&(si||!Et||(Tt.current=new Date,nt(kn.current),Oe.target.setPointerCapture(Oe.pointerId),Oe.target.tagName!=="BUTTON"&&(he(!0),Kt.current={x:Oe.clientX,y:Oe.clientY})))},onPointerUp:()=>{var Oe,it,kt;if(Ce||!Et)return;Kt.current=null;const de=Number(((Oe=Je.current)==null?void 0:Oe.style.getPropertyValue("--swipe-amount-x").replace("px",""))||0),be=Number(((it=Je.current)==null?void 0:it.style.getPropertyValue("--swipe-amount-y").replace("px",""))||0),pe=new Date().getTime()-((kt=Tt.current)==null?void 0:kt.getTime()),xe=se==="x"?de:be,Be=Math.abs(xe)/pe;if(Math.abs(xe)>=WD||Be>.11){nt(kn.current),g.onDismiss==null||g.onDismiss.call(g,g),q(se==="x"?de>0?"right":"left":be>0?"down":"up"),on(),Ue(!0);return}else{var K,oe;(K=Je.current)==null||K.style.setProperty("--swipe-amount-x","0px"),(oe=Je.current)==null||oe.style.setProperty("--swipe-amount-y","0px")}ze(!1),he(!1),ce(null)},onPointerMove:Oe=>{var it,kt,de;if(!Kt.current||!Et||((it=window.getSelection())==null?void 0:it.toString().length)>0)return;const pe=Oe.clientY-Kt.current.y,xe=Oe.clientX-Kt.current.x;var Be;const K=(Be=t.swipeDirections)!=null?Be:eO(me);!se&&(Math.abs(xe)>1||Math.abs(pe)>1)&&ce(Math.abs(xe)>Math.abs(pe)?"x":"y");let oe={x:0,y:0};const ve=Ee=>1/(1.5+Math.abs(Ee)/20);if(se==="y"){if(K.includes("top")||K.includes("bottom"))if(K.includes("top")&&pe<0||K.includes("bottom")&&pe>0)oe.y=pe;else{const Ee=pe*ve(pe);oe.y=Math.abs(Ee)<Math.abs(pe)?Ee:pe}}else if(se==="x"&&(K.includes("left")||K.includes("right")))if(K.includes("left")&&xe<0||K.includes("right")&&xe>0)oe.x=xe;else{const Ee=xe*ve(xe);oe.x=Math.abs(Ee)<Math.abs(xe)?Ee:xe}(Math.abs(oe.x)>0||Math.abs(oe.y)>0)&&ze(!0),(kt=Je.current)==null||kt.style.setProperty("--swipe-amount-x",`${oe.x}px`),(de=Je.current)==null||de.style.setProperty("--swipe-amount-y",`${oe.y}px`)}},mt&&!g.jsx&&Ie!=="loading"?_e.createElement("button",{"aria-label":$,"data-disabled":si,"data-close-button":!0,onClick:si||!Et?()=>{}:()=>{on(),g.onDismiss==null||g.onDismiss.call(g,g)},className:hr(z?.closeButton,g==null||(a=g.classNames)==null?void 0:a.closeButton)},(ln=B?.close)!=null?ln:UD):null,(Ie||g.icon||g.promise)&&g.icon!==null&&(B?.[Ie]!==null||g.icon)?_e.createElement("div",{"data-icon":"",className:hr(z?.icon,g==null||(s=g.classNames)==null?void 0:s.icon)},g.promise||g.type==="loading"&&!g.icon?g.icon||oi():null,g.type!=="loading"?li:null):null,_e.createElement("div",{"data-content":"",className:hr(z?.content,g==null||(l=g.classNames)==null?void 0:l.content)},_e.createElement("div",{"data-title":"",className:hr(z?.title,g==null||(c=g.classNames)==null?void 0:c.title)},g.jsx?g.jsx:typeof g.title=="function"?g.title():g.title),g.description?_e.createElement("div",{"data-description":"",className:hr(W,Vn,z?.description,g==null||(d=g.classNames)==null?void 0:d.description)},typeof g.description=="function"?g.description():g.description):null),_e.isValidElement(g.cancel)?g.cancel:g.cancel&&ld(g.cancel)?_e.createElement("button",{"data-button":!0,"data-cancel":!0,style:g.cancelButtonStyle||U,onClick:Oe=>{ld(g.cancel)&&Et&&(g.cancel.onClick==null||g.cancel.onClick.call(g.cancel,Oe),on())},className:hr(z?.cancelButton,g==null||(f=g.classNames)==null?void 0:f.cancelButton)},g.cancel.label):null,_e.isValidElement(g.action)?g.action:g.action&&ld(g.action)?_e.createElement("button",{"data-button":!0,"data-action":!0,style:g.actionButtonStyle||I,onClick:Oe=>{ld(g.action)&&(g.action.onClick==null||g.action.onClick.call(g.action,Oe),!Oe.defaultPrevented&&on())},className:hr(z?.actionButton,g==null||(h=g.classNames)==null?void 0:h.actionButton)},g.action.label):null)};function G2(){if(typeof window>"u"||typeof document>"u")return"ltr";const t=document.documentElement.getAttribute("dir");return t==="auto"||!t?window.getComputedStyle(document.documentElement).direction:t}function nO(t,e){const i={};return[t,e].forEach((a,s)=>{const l=s===1,c=l?"--mobile-offset":"--offset",d=l?KD:XD;function f(h){["top","right","bottom","left"].forEach(m=>{i[`${c}-${m}`]=typeof h=="number"?`${h}px`:h})}typeof a=="number"||typeof a=="string"?f(a):typeof a=="object"?["top","right","bottom","left"].forEach(h=>{a[h]===void 0?i[`${c}-${h}`]=d:i[`${c}-${h}`]=typeof a[h]=="number"?`${a[h]}px`:a[h]}):f(d)}),i}const iO=_e.forwardRef(function(e,i){const{id:a,invert:s,position:l="bottom-right",hotkey:c=["altKey","KeyT"],expand:d,closeButton:f,className:h,offset:m,mobileOffset:g,theme:x="light",richColors:_,duration:w,style:v,visibleToasts:S=GD,toastOptions:C,dir:M=G2(),gap:R=QD,icons:L,containerAriaLabel:O="Notifications"}=e,[j,k]=_e.useState([]),U=_e.useMemo(()=>a?j.filter(G=>G.toasterId===a):j.filter(G=>!G.toasterId),[j,a]),I=_e.useMemo(()=>Array.from(new Set([l].concat(U.filter(G=>G.position).map(G=>G.position)))),[U,l]),[Y,W]=_e.useState([]),[te,me]=_e.useState(!1),[we,Se]=_e.useState(!1),[z,B]=_e.useState(x!=="system"?x:typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),$=_e.useRef(null),se=c.join("+").replace(/Key/g,"").replace(/Digit/g,""),ce=_e.useRef(null),P=_e.useRef(!1),q=_e.useCallback(G=>{k(ne=>{var ye;return(ye=ne.find(ue=>ue.id===G.id))!=null&&ye.delete||Zn.dismiss(G.id),ne.filter(({id:ue})=>ue!==G.id)})},[]);return _e.useEffect(()=>Zn.subscribe(G=>{if(G.dismiss){requestAnimationFrame(()=>{k(ne=>ne.map(ye=>ye.id===G.id?{...ye,delete:!0}:ye))});return}setTimeout(()=>{RD.flushSync(()=>{k(ne=>{const ye=ne.findIndex(ue=>ue.id===G.id);return ye!==-1?[...ne.slice(0,ye),{...ne[ye],...G},...ne.slice(ye+1)]:[G,...ne]})})})}),[j]),_e.useEffect(()=>{if(x!=="system"){B(x);return}if(x==="system"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?B("dark"):B("light")),typeof window>"u")return;const G=window.matchMedia("(prefers-color-scheme: dark)");try{G.addEventListener("change",({matches:ne})=>{B(ne?"dark":"light")})}catch{G.addListener(({matches:ye})=>{try{B(ye?"dark":"light")}catch(ue){console.error(ue)}})}},[x]),_e.useEffect(()=>{j.length<=1&&me(!1)},[j]),_e.useEffect(()=>{const G=ne=>{var ye;if(c.every(he=>ne[he]||ne.code===he)){var Te;me(!0),(Te=$.current)==null||Te.focus()}ne.code==="Escape"&&(document.activeElement===$.current||(ye=$.current)!=null&&ye.contains(document.activeElement))&&me(!1)};return document.addEventListener("keydown",G),()=>document.removeEventListener("keydown",G)},[c]),_e.useEffect(()=>{if($.current)return()=>{ce.current&&(ce.current.focus({preventScroll:!0}),ce.current=null,P.current=!1)}},[$.current]),_e.createElement("section",{ref:i,"aria-label":`${O} ${se}`,tabIndex:-1,"aria-live":"polite","aria-relevant":"additions text","aria-atomic":"false",suppressHydrationWarning:!0},I.map((G,ne)=>{var ye;const[ue,Te]=G.split("-");return U.length?_e.createElement("ol",{key:G,dir:M==="auto"?G2():M,tabIndex:-1,ref:$,className:h,"data-sonner-toaster":!0,"data-sonner-theme":z,"data-y-position":ue,"data-x-position":Te,style:{"--front-toast-height":`${((ye=Y[0])==null?void 0:ye.height)||0}px`,"--width":`${ZD}px`,"--gap":`${R}px`,...v,...nO(m,g)},onBlur:he=>{P.current&&!he.currentTarget.contains(he.relatedTarget)&&(P.current=!1,ce.current&&(ce.current.focus({preventScroll:!0}),ce.current=null))},onFocus:he=>{he.target instanceof HTMLElement&&he.target.dataset.dismissible==="false"||P.current||(P.current=!0,ce.current=he.relatedTarget)},onMouseEnter:()=>me(!0),onMouseMove:()=>me(!0),onMouseLeave:()=>{we||me(!1)},onDragEnd:()=>me(!1),onPointerDown:he=>{he.target instanceof HTMLElement&&he.target.dataset.dismissible==="false"||Se(!0)},onPointerUp:()=>Se(!1)},U.filter(he=>!he.position&&ne===0||he.position===G).map((he,Ce)=>{var Ue,Le;return _e.createElement(tO,{key:he.id,icons:L,index:Ce,toast:he,defaultRichColors:_,duration:(Ue=C?.duration)!=null?Ue:w,className:C?.className,descriptionClassName:C?.descriptionClassName,invert:s,visibleToasts:S,closeButton:(Le=C?.closeButton)!=null?Le:f,interacting:we,position:G,style:C?.style,unstyled:C?.unstyled,classNames:C?.classNames,cancelButtonStyle:C?.cancelButtonStyle,actionButtonStyle:C?.actionButtonStyle,closeButtonAriaLabel:C?.closeButtonAriaLabel,removeToast:q,toasts:U.filter(ze=>ze.position==he.position),heights:Y.filter(ze=>ze.position==he.position),setHeights:W,expandByDefault:d,gap:R,expanded:te,swipeDirections:e.swipeDirections})})):null}))}),rO="https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/postcard-bg-bxQeJ3Wd69ByxTmx6biS5C.webp";function aO(){const t=E.useRef(null),e=rT(t,{once:!0,margin:"-100px"}),[i,a]=E.useState({name:"",email:"",message:""}),s=l=>{l.preventDefault(),YD.success("메시지 전송 완료! 곧 답장드릴게요."),a({name:"",email:"",message:""})};return b.jsx("section",{id:"contact",ref:t,className:"py-24 lg:py-40",style:{backgroundColor:"#F5F5DC"},children:b.jsxs("div",{className:"max-w-6xl mx-auto px-6",children:[b.jsxs(nn.div,{initial:{opacity:0,y:20},animate:e?{opacity:1,y:0}:{},transition:{duration:.6},className:"mb-16 text-center",children:[b.jsx("span",{className:"font-mono-custom text-sm tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#B8654B"},children:"SEND A POSTCARD"}),b.jsx("h2",{className:"font-display text-5xl lg:text-6xl mt-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"Let's Connect"})]}),b.jsxs(nn.div,{initial:{opacity:0,y:40},animate:e?{opacity:1,y:0}:{},transition:{duration:.7,delay:.1},className:"grid lg:grid-cols-2 gap-0 border-4 shadow-2xl overflow-hidden",style:{borderColor:"#1A3A52"},children:[b.jsx("div",{className:"h-96 lg:h-auto",style:{backgroundImage:`url(${rO})`,backgroundSize:"cover",backgroundPosition:"center"}}),b.jsxs("div",{className:"p-8 lg:p-12 flex flex-col justify-between",style:{backgroundColor:"#F5F5DC"},children:[b.jsxs("div",{className:"mb-8 pb-8 border-b-2",style:{borderColor:"#D4AF37"},children:[b.jsx("p",{className:"font-body text-sm mb-4",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"디지털 여행지에서 인사드려요. 새로운 프로젝트, 협업, 채용 제안 모두 환영합니다."}),b.jsxs("div",{className:"space-y-2",children:[b.jsx("div",{className:"h-px",style:{backgroundColor:"#DDD"}}),b.jsx("div",{className:"h-px",style:{backgroundColor:"#DDD"}})]})]}),b.jsxs("div",{className:"mb-8",children:[b.jsx("h3",{className:"font-display text-2xl mb-6",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"Quick Links"}),b.jsxs("div",{className:"space-y-3",children:[b.jsxs("a",{href:"mailto:your.email@example.com",className:"flex items-center gap-3 transition-all duration-200 group",children:[b.jsx(mD,{size:20,color:"#B8654B"}),b.jsx("span",{className:"font-body text-sm",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"your.email@example.com"})]}),b.jsxs("a",{href:"https://github.com/rnjswnghl",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-3 transition-all duration-200 group",children:[b.jsx(oT,{size:20,color:"#B8654B"}),b.jsx("span",{className:"font-body text-sm",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"github.com/rnjswnghl"})]}),b.jsxs("a",{href:"#",className:"flex items-center gap-3 transition-all duration-200 group","aria-disabled":"true",onClick:l=>l.preventDefault(),children:[b.jsx(fD,{size:20,color:"#B8654B"}),b.jsx("span",{className:"font-body text-sm",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"linkedin.com/in/yourname"})]})]})]}),b.jsxs("div",{className:"flex justify-between items-end",children:[b.jsxs("div",{children:[b.jsx("p",{className:"font-mono-custom text-xs tracking-widest mb-2",style:{fontFamily:"'Courier Prime', monospace",color:"#999"},children:"STATUS"}),b.jsxs("div",{className:"inline-flex items-center gap-2 px-3 py-1 border-2",style:{borderColor:"#D4AF37"},children:[b.jsx("span",{className:"w-2 h-2 rounded-full",style:{backgroundColor:"#22C55E"}}),b.jsx("span",{className:"font-mono-custom text-xs",style:{fontFamily:"'Courier Prime', monospace",color:"#1A3A52"},children:"AVAILABLE"})]})]}),b.jsx("div",{className:"w-20 h-20 border-2 flex items-center justify-center",style:{borderColor:"#B8654B",transform:"rotate(-15deg)"},children:b.jsxs("span",{className:"font-mono-custom text-xs text-center tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#B8654B"},children:["POSTAGE",b.jsx("br",{}),"PAID"]})})]})]})]}),b.jsx(nn.div,{initial:{opacity:0,y:30},animate:e?{opacity:1,y:0}:{},transition:{duration:.6,delay:.3},className:"mt-16 max-w-2xl mx-auto",children:b.jsxs("div",{className:"bg-white p-8 border-2",style:{borderColor:"#1A3A52"},children:[b.jsx("h3",{className:"font-display text-2xl mb-6",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"Send Me a Message"}),b.jsxs("form",{onSubmit:s,className:"space-y-4",children:[b.jsx("input",{type:"text",placeholder:"Your Name",value:i.name,onChange:l=>a({...i,name:l.target.value}),required:!0,className:"w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200",style:{fontFamily:"'Poppins', sans-serif",borderColor:"#DDD",color:"#1A3A52"},onFocus:l=>{l.currentTarget.style.borderColor="#D4AF37"},onBlur:l=>{l.currentTarget.style.borderColor="#DDD"}}),b.jsx("input",{type:"email",placeholder:"Your Email",value:i.email,onChange:l=>a({...i,email:l.target.value}),required:!0,className:"w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200",style:{fontFamily:"'Poppins', sans-serif",borderColor:"#DDD",color:"#1A3A52"},onFocus:l=>{l.currentTarget.style.borderColor="#D4AF37"},onBlur:l=>{l.currentTarget.style.borderColor="#DDD"}}),b.jsx("textarea",{placeholder:"Your Message",value:i.message,onChange:l=>a({...i,message:l.target.value}),required:!0,rows:4,className:"w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200 resize-none",style:{fontFamily:"'Poppins', sans-serif",borderColor:"#DDD",color:"#1A3A52"},onFocus:l=>{l.currentTarget.style.borderColor="#D4AF37"},onBlur:l=>{l.currentTarget.style.borderColor="#DDD"}}),b.jsxs("button",{type:"submit",className:"w-full flex items-center justify-center gap-2 py-3 font-mono-custom tracking-widest transition-all duration-200 border-2",style:{fontFamily:"'Courier Prime', monospace",backgroundColor:"#D4AF37",color:"#1A3A52",borderColor:"#D4AF37",fontSize:"12px"},onMouseEnter:l=>{const c=l.currentTarget;c.style.backgroundColor="#1A3A52",c.style.color="#F5F5DC",c.style.borderColor="#1A3A52"},onMouseLeave:l=>{const c=l.currentTarget;c.style.backgroundColor="#D4AF37",c.style.color="#1A3A52",c.style.borderColor="#D4AF37"},children:[b.jsx(bD,{size:16}),"SEND MESSAGE"]})]})]})})]})})}function sO(){const t=new Date().getFullYear();return b.jsx("footer",{className:"py-12 border-t-4",style:{backgroundColor:"#F5F5DC",borderColor:"#1A3A52"},children:b.jsxs("div",{className:"max-w-6xl mx-auto px-6",children:[b.jsxs("div",{className:"grid lg:grid-cols-3 gap-12 mb-12",children:[b.jsxs("div",{children:[b.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[b.jsx(gc,{size:24,color:"#B8654B"}),b.jsx("span",{className:"font-display text-2xl",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"TRAVELER"})]}),b.jsx("p",{className:"font-body text-sm",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"A developer's journey through code and creativity."})]}),b.jsxs("div",{children:[b.jsx("h4",{className:"font-display text-sm mb-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"DESTINATIONS"}),b.jsx("div",{className:"space-y-2",children:["Journey","Passport","Contact"].map(e=>b.jsx("a",{href:`#${e.toLowerCase()}`,className:"block font-body text-sm transition-colors duration-200",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},onMouseEnter:i=>{i.currentTarget.style.color="#D4AF37"},onMouseLeave:i=>{i.currentTarget.style.color="#5A5A5A"},children:e},e))})]}),b.jsxs("div",{children:[b.jsx("h4",{className:"font-display text-sm mb-4",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52"},children:"FOLLOW"}),b.jsx("div",{className:"flex gap-4",children:[{label:"GitHub",href:"https://github.com/rnjswnghl"},{label:"LinkedIn",href:"#"}].map(e=>b.jsx("a",{href:e.href,className:"font-body text-sm transition-colors duration-200",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},target:e.href.startsWith("http")?"_blank":void 0,rel:e.href.startsWith("http")?"noopener noreferrer":void 0,onMouseEnter:i=>{i.currentTarget.style.color="#D4AF37"},onMouseLeave:i=>{i.currentTarget.style.color="#5A5A5A"},onClick:i=>{e.href==="#"&&i.preventDefault()},children:e.label},e.label))})]})]}),b.jsx("div",{className:"h-px mb-8",style:{backgroundColor:"#DDD"}}),b.jsxs("div",{className:"flex flex-col lg:flex-row justify-between items-center gap-4",children:[b.jsxs("p",{className:"font-mono-custom text-xs tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#999"},children:["© ",t," DEVELOPER TRAVELER. ALL RIGHTS RESERVED."]}),b.jsxs("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"flex items-center gap-2 font-mono-custom text-xs tracking-widest transition-colors duration-200",style:{fontFamily:"'Courier Prime', monospace",color:"#1A3A52"},onMouseEnter:e=>{e.currentTarget.style.color="#D4AF37"},onMouseLeave:e=>{e.currentTarget.style.color="#1A3A52"},children:["BACK TO TOP",b.jsx(lT,{size:14})]})]})]})})}const oO="https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/travel-hero-bg-gDwFJ3Tv72YAWx6iA3Y8iE.webp";function lO(){const t=()=>{document.getElementById("journey")?.scrollIntoView({behavior:"smooth"})};return b.jsxs("section",{className:"relative min-h-screen overflow-hidden flex items-center justify-center",style:{backgroundColor:"#F5F5DC"},children:[b.jsx("div",{className:"absolute inset-0 opacity-40",style:{backgroundImage:`url(${oO})`,backgroundSize:"cover",backgroundPosition:"center"}}),b.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, rgba(245,245,220,0.95) 0%, rgba(245,245,220,0.85) 100%)"}}),b.jsxs("div",{className:"relative z-10 max-w-4xl mx-auto px-6 text-center",children:[b.jsxs(nn.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},className:"flex items-center justify-center gap-3 mb-8",children:[b.jsx(gc,{size:20,color:"#B8654B"}),b.jsx("span",{className:"font-mono-custom text-sm tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#B8654B"},children:"WELCOME ABOARD"}),b.jsx($2,{size:20,color:"#B8654B"})]}),b.jsxs(nn.h1,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.7,delay:.2},className:"font-display text-6xl lg:text-8xl leading-tight mb-6",style:{fontFamily:"'Playfair Display', serif",color:"#1A3A52",fontWeight:700},children:["A DEVELOPER'S",b.jsx("br",{}),b.jsx("span",{style:{color:"#D4AF37"},children:"JOURNEY"})]}),b.jsx(nn.p,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"font-body text-lg lg:text-xl max-w-2xl mx-auto mb-12",style:{fontFamily:"'Poppins', sans-serif",color:"#5A5A5A"},children:"프로젝트, 기술, 경험을 여행의 렌즈로 풀어낸 개발자 포트폴리오입니다. 코드라는 지도를 따라 새로운 목적지를 탐험해보세요."}),b.jsxs(nn.button,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5,delay:.6},onClick:t,className:"inline-flex items-center gap-3 px-8 py-4 border-2 transition-all duration-300 hover:shadow-lg",style:{borderColor:"#1A3A52",backgroundColor:"#1A3A52",color:"#F5F5DC",fontFamily:"'Courier Prime', monospace",fontSize:"14px",letterSpacing:"2px"},onMouseEnter:e=>{const i=e.currentTarget;i.style.backgroundColor="#F5F5DC",i.style.color="#1A3A52"},onMouseLeave:e=>{const i=e.currentTarget;i.style.backgroundColor="#1A3A52",i.style.color="#F5F5DC"},children:["START JOURNEY",b.jsx(gc,{size:16})]}),b.jsx(nn.div,{animate:{y:[0,10,0]},transition:{repeat:1/0,duration:2},className:"absolute bottom-8 left-1/2 transform -translate-x-1/2",children:b.jsx("div",{className:"text-sm tracking-widest",style:{fontFamily:"'Courier Prime', monospace",color:"#1A3A52"},children:"↓"})})]}),b.jsx(nn.div,{animate:{rotate:360},transition:{repeat:1/0,duration:20,ease:"linear"},className:"absolute top-20 right-20 opacity-10 hidden lg:block",children:b.jsx($2,{size:100,color:"#1A3A52"})}),b.jsx(nn.div,{animate:{y:[0,20,0]},transition:{repeat:1/0,duration:3},className:"absolute bottom-20 left-20 opacity-10 hidden lg:block",children:b.jsx(lT,{size:80,color:"#D4AF37"})})]})}const X2=[{label:"JOURNEY",href:"#journey"},{label:"PASSPORT",href:"#passport"},{label:"CONTACT",href:"#contact"}];function cO(){const[t,e]=E.useState(!1),[i,a]=E.useState(!1);E.useEffect(()=>{const l=()=>e(window.scrollY>20);return window.addEventListener("scroll",l),()=>window.removeEventListener("scroll",l)},[]);const s=l=>{a(!1);const c=l.replace("#","");document.getElementById(c)?.scrollIntoView({behavior:"smooth"})};return b.jsxs(b.Fragment,{children:[b.jsx("nav",{className:"fixed top-0 left-0 right-0 z-50 transition-all duration-300",style:{backgroundColor:t?"#1A3A52":"transparent",borderBottom:t?"2px solid #D4AF37":"none"},children:b.jsxs("div",{className:"max-w-6xl mx-auto px-6 flex items-center justify-between h-16",children:[b.jsxs("a",{href:"#",onClick:l=>{l.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},className:"flex items-center gap-2 transition-all duration-200",children:[b.jsx(gc,{size:24,color:t?"#D4AF37":"#B8654B"}),b.jsx("span",{className:"font-display text-xl tracking-wider",style:{fontFamily:"'Playfair Display', serif",color:t?"#F5F5DC":"#1A3A52"},children:"TRAVELER"})]}),b.jsx("div",{className:"hidden md:flex items-center gap-8",children:X2.map(l=>b.jsx("button",{onClick:()=>s(l.href),className:"font-mono-custom text-xs tracking-widest transition-all duration-200",style:{fontFamily:"'Courier Prime', monospace",color:t?"#F5F5DC":"#1A3A52"},onMouseEnter:c=>{c.currentTarget.style.color="#D4AF37"},onMouseLeave:c=>{c.currentTarget.style.color=t?"#F5F5DC":"#1A3A52"},children:l.label},l.label))}),b.jsx("button",{className:"md:hidden p-2",onClick:()=>a(!i),"aria-label":"Menu",children:i?b.jsx(Sr,{size:24,color:t?"#F5F5DC":"#1A3A52"}):b.jsx(gD,{size:24,color:t?"#F5F5DC":"#1A3A52"})})]})}),b.jsx(Mg,{children:i&&b.jsx(nn.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2},className:"fixed top-16 left-0 right-0 z-40 md:hidden",style:{backgroundColor:"#1A3A52",borderBottom:"2px solid #D4AF37"},children:X2.map((l,c)=>b.jsx(nn.button,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:c*.05},onClick:()=>s(l.href),className:"w-full text-left px-6 py-4 font-display text-lg tracking-wider border-b transition-colors duration-200",style:{fontFamily:"'Playfair Display', serif",color:"#F5F5DC",borderColor:"rgba(212,175,55,0.2)"},onMouseEnter:d=>{d.currentTarget.style.color="#D4AF37"},onMouseLeave:d=>{d.currentTarget.style.color="#F5F5DC"},children:l.label},l.label))})})]})}function uO(){return b.jsxs("div",{className:"min-h-screen paper-texture",style:{backgroundColor:"#F5F5DC"},children:[b.jsx(cO,{}),b.jsx(lO,{}),b.jsx(CD,{}),b.jsx(AD,{}),b.jsx(aO,{}),b.jsx(sO,{})]})}var K2="popstate";function Z2(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function dO(t={}){function e(a,s){let l=s.state?.masked,{pathname:c,search:d,hash:f}=l||a.location;return T0("",{pathname:c,search:d,hash:f},s.state&&s.state.usr||null,s.state&&s.state.key||"default",l?{pathname:a.location.pathname,search:a.location.search,hash:a.location.hash}:void 0)}function i(a,s){return typeof s=="string"?s:yc(s)}return hO(e,i,null,t)}function Nt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Zi(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function fO(){return Math.random().toString(36).substring(2,10)}function Q2(t,e){return{usr:t.state,key:t.key,idx:e,masked:t.unstable_mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function T0(t,e,i=null,a,s){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Vo(e):e,state:i,key:e&&e.key||a||fO(),unstable_mask:s}}function yc({pathname:t="/",search:e="",hash:i=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),i&&i!=="#"&&(t+=i.charAt(0)==="#"?i:"#"+i),t}function Vo(t){let e={};if(t){let i=t.indexOf("#");i>=0&&(e.hash=t.substring(i),t=t.substring(0,i));let a=t.indexOf("?");a>=0&&(e.search=t.substring(a),t=t.substring(0,a)),t&&(e.pathname=t)}return e}function hO(t,e,i,a={}){let{window:s=document.defaultView,v5Compat:l=!1}=a,c=s.history,d="POP",f=null,h=m();h==null&&(h=0,c.replaceState({...c.state,idx:h},""));function m(){return(c.state||{idx:null}).idx}function g(){d="POP";let S=m(),C=S==null?null:S-h;h=S,f&&f({action:d,location:v.location,delta:C})}function x(S,C){d="PUSH";let M=Z2(S)?S:T0(v.location,S,C);h=m()+1;let R=Q2(M,h),L=v.createHref(M.unstable_mask||M);try{c.pushState(R,"",L)}catch(O){if(O instanceof DOMException&&O.name==="DataCloneError")throw O;s.location.assign(L)}l&&f&&f({action:d,location:v.location,delta:1})}function _(S,C){d="REPLACE";let M=Z2(S)?S:T0(v.location,S,C);h=m();let R=Q2(M,h),L=v.createHref(M.unstable_mask||M);c.replaceState(R,"",L),l&&f&&f({action:d,location:v.location,delta:0})}function w(S){return pO(S)}let v={get action(){return d},get location(){return t(s,c)},listen(S){if(f)throw new Error("A history only accepts one active listener");return s.addEventListener(K2,g),f=S,()=>{s.removeEventListener(K2,g),f=null}},createHref(S){return e(s,S)},createURL:w,encodeLocation(S){let C=w(S);return{pathname:C.pathname,search:C.search,hash:C.hash}},push:x,replace:_,go(S){return c.go(S)}};return v}function pO(t,e=!1){let i="http://localhost";typeof window<"u"&&(i=window.location.origin!=="null"?window.location.origin:window.location.href),Nt(i,"No window.location.(origin|href) available to create URL");let a=typeof t=="string"?t:yc(t);return a=a.replace(/ $/,"%20"),!e&&a.startsWith("//")&&(a=i+a),new URL(a,i)}function dT(t,e,i="/"){return mO(t,e,i,!1)}function mO(t,e,i,a){let s=typeof e=="string"?Vo(e):e,l=Wr(s.pathname||"/",i);if(l==null)return null;let c=fT(t);gO(c);let d=null;for(let f=0;d==null&&f<c.length;++f){let h=kO(l);d=EO(c[f],h,a)}return d}function fT(t,e=[],i=[],a="",s=!1){let l=(c,d,f=s,h)=>{let m={relativePath:h===void 0?c.path||"":h,caseSensitive:c.caseSensitive===!0,childrenIndex:d,route:c};if(m.relativePath.startsWith("/")){if(!m.relativePath.startsWith(a)&&f)return;Nt(m.relativePath.startsWith(a),`Absolute route path "${m.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(a.length)}let g=Cr([a,m.relativePath]),x=i.concat(m);c.children&&c.children.length>0&&(Nt(c.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),fT(c.children,e,x,g,f)),!(c.path==null&&!c.index)&&e.push({path:g,score:_O(g,c.index),routesMeta:x})};return t.forEach((c,d)=>{if(c.path===""||!c.path?.includes("?"))l(c,d);else for(let f of hT(c.path))l(c,d,!0,f)}),e}function hT(t){let e=t.split("/");if(e.length===0)return[];let[i,...a]=e,s=i.endsWith("?"),l=i.replace(/\?$/,"");if(a.length===0)return s?[l,""]:[l];let c=hT(a.join("/")),d=[];return d.push(...c.map(f=>f===""?l:[l,f].join("/"))),s&&d.push(...c),d.map(f=>t.startsWith("/")&&f===""?"/":f)}function gO(t){t.sort((e,i)=>e.score!==i.score?i.score-e.score:TO(e.routesMeta.map(a=>a.childrenIndex),i.routesMeta.map(a=>a.childrenIndex)))}var yO=/^:[\w-]+$/,xO=3,bO=2,vO=1,wO=10,SO=-2,W2=t=>t==="*";function _O(t,e){let i=t.split("/"),a=i.length;return i.some(W2)&&(a+=SO),e&&(a+=bO),i.filter(s=>!W2(s)).reduce((s,l)=>s+(yO.test(l)?xO:l===""?vO:wO),a)}function TO(t,e){return t.length===e.length&&t.slice(0,-1).every((a,s)=>a===e[s])?t[t.length-1]-e[e.length-1]:0}function EO(t,e,i=!1){let{routesMeta:a}=t,s={},l="/",c=[];for(let d=0;d<a.length;++d){let f=a[d],h=d===a.length-1,m=l==="/"?e:e.slice(l.length)||"/",g=af({path:f.relativePath,caseSensitive:f.caseSensitive,end:h},m),x=f.route;if(!g&&h&&i&&!a[a.length-1].route.index&&(g=af({path:f.relativePath,caseSensitive:f.caseSensitive,end:!1},m)),!g)return null;Object.assign(s,g.params),c.push({params:s,pathname:Cr([l,g.pathname]),pathnameBase:OO(Cr([l,g.pathnameBase])),route:x}),g.pathnameBase!=="/"&&(l=Cr([l,g.pathnameBase]))}return c}function af(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[i,a]=CO(t.path,t.caseSensitive,t.end),s=e.match(i);if(!s)return null;let l=s[0],c=l.replace(/(.)\/+$/,"$1"),d=s.slice(1);return{params:a.reduce((h,{paramName:m,isOptional:g},x)=>{if(m==="*"){let w=d[x]||"";c=l.slice(0,l.length-w.length).replace(/(.)\/+$/,"$1")}const _=d[x];return g&&!_?h[m]=void 0:h[m]=(_||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:c,pattern:t}}function CO(t,e=!1,i=!0){Zi(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let a=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(c,d,f,h,m)=>{if(a.push({paramName:d,isOptional:f!=null}),f){let g=m.charAt(h+c.length);return g&&g!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(a.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),a]}function kO(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Zi(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Wr(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let i=e.endsWith("/")?e.length-1:e.length,a=t.charAt(i);return a&&a!=="/"?null:t.slice(i)||"/"}var AO=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function RO(t,e="/"){let{pathname:i,search:a="",hash:s=""}=typeof t=="string"?Vo(t):t,l;return i?(i=i.replace(/\/\/+/g,"/"),i.startsWith("/")?l=J2(i.substring(1),"/"):l=J2(i,e)):l=e,{pathname:l,search:MO(a),hash:LO(s)}}function J2(t,e){let i=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?i.length>1&&i.pop():s!=="."&&i.push(s)}),i.length>1?i.join("/"):"/"}function vm(t,e,i,a){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function DO(t){return t.filter((e,i)=>i===0||e.route.path&&e.route.path.length>0)}function Pg(t){let e=DO(t);return e.map((i,a)=>a===e.length-1?i.pathname:i.pathnameBase)}function Tf(t,e,i,a=!1){let s;typeof t=="string"?s=Vo(t):(s={...t},Nt(!s.pathname||!s.pathname.includes("?"),vm("?","pathname","search",s)),Nt(!s.pathname||!s.pathname.includes("#"),vm("#","pathname","hash",s)),Nt(!s.search||!s.search.includes("#"),vm("#","search","hash",s)));let l=t===""||s.pathname==="",c=l?"/":s.pathname,d;if(c==null)d=i;else{let g=e.length-1;if(!a&&c.startsWith("..")){let x=c.split("/");for(;x[0]==="..";)x.shift(),g-=1;s.pathname=x.join("/")}d=g>=0?e[g]:"/"}let f=RO(s,d),h=c&&c!=="/"&&c.endsWith("/"),m=(l||c===".")&&i.endsWith("/");return!f.pathname.endsWith("/")&&(h||m)&&(f.pathname+="/"),f}var Cr=t=>t.join("/").replace(/\/\/+/g,"/"),OO=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),MO=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,LO=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,jO=class{constructor(t,e,i,a=!1){this.status=t,this.statusText=e||"",this.internal=a,i instanceof Error?(this.data=i.toString(),this.error=i):this.data=i}};function NO(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function zO(t){return t.map(e=>e.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var pT=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function mT(t,e){let i=t;if(typeof i!="string"||!AO.test(i))return{absoluteURL:void 0,isExternal:!1,to:i};let a=i,s=!1;if(pT)try{let l=new URL(window.location.href),c=i.startsWith("//")?new URL(l.protocol+i):new URL(i),d=Wr(c.pathname,e);c.origin===l.origin&&d!=null?i=d+c.search+c.hash:s=!0}catch{Zi(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:s,to:i}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var gT=["POST","PUT","PATCH","DELETE"];new Set(gT);var PO=["GET",...gT];new Set(PO);var Fo=E.createContext(null);Fo.displayName="DataRouter";var Ef=E.createContext(null);Ef.displayName="DataRouterState";var yT=E.createContext(!1);function UO(){return E.useContext(yT)}var xT=E.createContext({isTransitioning:!1});xT.displayName="ViewTransition";var IO=E.createContext(new Map);IO.displayName="Fetchers";var BO=E.createContext(null);BO.displayName="Await";var Ai=E.createContext(null);Ai.displayName="Navigation";var jc=E.createContext(null);jc.displayName="Location";var sr=E.createContext({outlet:null,matches:[],isDataRoute:!1});sr.displayName="Route";var Ug=E.createContext(null);Ug.displayName="RouteError";var bT="REACT_ROUTER_ERROR",VO="REDIRECT",FO="ROUTE_ERROR_RESPONSE";function HO(t){if(t.startsWith(`${bT}:${VO}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function $O(t){if(t.startsWith(`${bT}:${FO}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new jO(e.status,e.statusText,e.data)}catch{}}function qO(t,{relative:e}={}){Nt(Ho(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:a}=E.useContext(Ai),{hash:s,pathname:l,search:c}=Nc(t,{relative:e}),d=l;return i!=="/"&&(d=l==="/"?i:Cr([i,l])),a.createHref({pathname:d,search:c,hash:s})}function Ho(){return E.useContext(jc)!=null}function Ri(){return Nt(Ho(),"useLocation() may be used only in the context of a <Router> component."),E.useContext(jc).location}var vT="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function wT(t){E.useContext(Ai).static||E.useLayoutEffect(t)}function or(){let{isDataRoute:t}=E.useContext(sr);return t?sM():YO()}function YO(){Nt(Ho(),"useNavigate() may be used only in the context of a <Router> component.");let t=E.useContext(Fo),{basename:e,navigator:i}=E.useContext(Ai),{matches:a}=E.useContext(sr),{pathname:s}=Ri(),l=JSON.stringify(Pg(a)),c=E.useRef(!1);return wT(()=>{c.current=!0}),E.useCallback((f,h={})=>{if(Zi(c.current,vT),!c.current)return;if(typeof f=="number"){i.go(f);return}let m=Tf(f,JSON.parse(l),s,h.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:Cr([e,m.pathname])),(h.replace?i.replace:i.push)(m,h.state,h)},[e,i,l,s,t])}var GO=E.createContext(null);function XO(t){let e=E.useContext(sr).outlet;return E.useMemo(()=>e&&E.createElement(GO.Provider,{value:t},e),[e,t])}function Nc(t,{relative:e}={}){let{matches:i}=E.useContext(sr),{pathname:a}=Ri(),s=JSON.stringify(Pg(i));return E.useMemo(()=>Tf(t,JSON.parse(s),a,e==="path"),[t,s,a,e])}function KO(t,e){return ST(t,e)}function ST(t,e,i){Nt(Ho(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=E.useContext(Ai),{matches:s}=E.useContext(sr),l=s[s.length-1],c=l?l.params:{},d=l?l.pathname:"/",f=l?l.pathnameBase:"/",h=l&&l.route;{let S=h&&h.path||"";TT(d,!h||S.endsWith("*")||S.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${S}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${S}"> to <Route path="${S==="/"?"*":`${S}/*`}">.`)}let m=Ri(),g;if(e){let S=typeof e=="string"?Vo(e):e;Nt(f==="/"||S.pathname?.startsWith(f),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${S.pathname}" was given in the \`location\` prop.`),g=S}else g=m;let x=g.pathname||"/",_=x;if(f!=="/"){let S=f.replace(/^\//,"").split("/");_="/"+x.replace(/^\//,"").split("/").slice(S.length).join("/")}let w=dT(t,{pathname:_});Zi(h||w!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Zi(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=eM(w&&w.map(S=>Object.assign({},S,{params:Object.assign({},c,S.params),pathname:Cr([f,a.encodeLocation?a.encodeLocation(S.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:S.pathname]),pathnameBase:S.pathnameBase==="/"?f:Cr([f,a.encodeLocation?a.encodeLocation(S.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:S.pathnameBase])})),s,i);return e&&v?E.createElement(jc.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...g},navigationType:"POP"}},v):v}function ZO(){let t=aM(),e=NO(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),i=t instanceof Error?t.stack:null,a="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:a},l={padding:"2px 4px",backgroundColor:a},c=null;return console.error("Error handled by React Router default ErrorBoundary:",t),c=E.createElement(E.Fragment,null,E.createElement("p",null,"💿 Hey developer 👋"),E.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",E.createElement("code",{style:l},"ErrorBoundary")," or"," ",E.createElement("code",{style:l},"errorElement")," prop on your route.")),E.createElement(E.Fragment,null,E.createElement("h2",null,"Unexpected Application Error!"),E.createElement("h3",{style:{fontStyle:"italic"}},e),i?E.createElement("pre",{style:s},i):null,c)}var QO=E.createElement(ZO,null),_T=class extends E.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const i=$O(t.digest);i&&(t=i)}let e=t!==void 0?E.createElement(sr.Provider,{value:this.props.routeContext},E.createElement(Ug.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?E.createElement(WO,{error:t},e):e}};_T.contextType=yT;var wm=new WeakMap;function WO({children:t,error:e}){let{basename:i}=E.useContext(Ai);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let a=HO(e.digest);if(a){let s=wm.get(e);if(s)throw s;let l=mT(a.location,i);if(pT&&!wm.get(e))if(l.isExternal||a.reloadDocument)window.location.href=l.absoluteURL||l.to;else{const c=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(l.to,{replace:a.replace}));throw wm.set(e,c),c}return E.createElement("meta",{httpEquiv:"refresh",content:`0;url=${l.absoluteURL||l.to}`})}}return t}function JO({routeContext:t,match:e,children:i}){let a=E.useContext(Fo);return a&&a.static&&a.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=e.route.id),E.createElement(sr.Provider,{value:t},i)}function eM(t,e=[],i){let a=i?.state;if(t==null){if(!a)return null;if(a.errors)t=a.matches;else if(e.length===0&&!a.initialized&&a.matches.length>0)t=a.matches;else return null}let s=t,l=a?.errors;if(l!=null){let m=s.findIndex(g=>g.route.id&&l?.[g.route.id]!==void 0);Nt(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`),s=s.slice(0,Math.min(s.length,m+1))}let c=!1,d=-1;if(i&&a){c=a.renderFallback;for(let m=0;m<s.length;m++){let g=s[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(d=m),g.route.id){let{loaderData:x,errors:_}=a,w=g.route.loader&&!x.hasOwnProperty(g.route.id)&&(!_||_[g.route.id]===void 0);if(g.route.lazy||w){i.isStatic&&(c=!0),d>=0?s=s.slice(0,d+1):s=[s[0]];break}}}}let f=i?.onError,h=a&&f?(m,g)=>{f(m,{location:a.location,params:a.matches?.[0]?.params??{},unstable_pattern:zO(a.matches),errorInfo:g})}:void 0;return s.reduceRight((m,g,x)=>{let _,w=!1,v=null,S=null;a&&(_=l&&g.route.id?l[g.route.id]:void 0,v=g.route.errorElement||QO,c&&(d<0&&x===0?(TT("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),w=!0,S=null):d===x&&(w=!0,S=g.route.hydrateFallbackElement||null)));let C=e.concat(s.slice(0,x+1)),M=()=>{let R;return _?R=v:w?R=S:g.route.Component?R=E.createElement(g.route.Component,null):g.route.element?R=g.route.element:R=m,E.createElement(JO,{match:g,routeContext:{outlet:m,matches:C,isDataRoute:a!=null},children:R})};return a&&(g.route.ErrorBoundary||g.route.errorElement||x===0)?E.createElement(_T,{location:a.location,revalidation:a.revalidation,component:v,error:_,children:M(),routeContext:{outlet:null,matches:C,isDataRoute:!0},onError:h}):M()},null)}function Ig(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function tM(t){let e=E.useContext(Fo);return Nt(e,Ig(t)),e}function nM(t){let e=E.useContext(Ef);return Nt(e,Ig(t)),e}function iM(t){let e=E.useContext(sr);return Nt(e,Ig(t)),e}function Bg(t){let e=iM(t),i=e.matches[e.matches.length-1];return Nt(i.route.id,`${t} can only be used on routes that contain a unique "id"`),i.route.id}function rM(){return Bg("useRouteId")}function aM(){let t=E.useContext(Ug),e=nM("useRouteError"),i=Bg("useRouteError");return t!==void 0?t:e.errors?.[i]}function sM(){let{router:t}=tM("useNavigate"),e=Bg("useNavigate"),i=E.useRef(!1);return wT(()=>{i.current=!0}),E.useCallback(async(s,l={})=>{Zi(i.current,vT),i.current&&(typeof s=="number"?await t.navigate(s):await t.navigate(s,{fromRouteId:e,...l}))},[t,e])}var ew={};function TT(t,e,i){!e&&!ew[t]&&(ew[t]=!0,Zi(!1,i))}E.memo(oM);function oM({routes:t,future:e,state:i,isStatic:a,onError:s}){return ST(t,void 0,{state:i,isStatic:a,onError:s})}function lM({to:t,replace:e,state:i,relative:a}){Nt(Ho(),"<Navigate> may be used only in the context of a <Router> component.");let{static:s}=E.useContext(Ai);Zi(!s,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:l}=E.useContext(sr),{pathname:c}=Ri(),d=or(),f=Tf(t,Pg(l),c,a==="path"),h=JSON.stringify(f);return E.useEffect(()=>{d(JSON.parse(h),{replace:e,state:i,relative:a})},[d,h,a,e,i]),null}function cM(t){return XO(t.context)}function yi(t){Nt(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function uM({basename:t="/",children:e=null,location:i,navigationType:a="POP",navigator:s,static:l=!1,unstable_useTransitions:c}){Nt(!Ho(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=t.replace(/^\/*/,"/"),f=E.useMemo(()=>({basename:d,navigator:s,static:l,unstable_useTransitions:c,future:{}}),[d,s,l,c]);typeof i=="string"&&(i=Vo(i));let{pathname:h="/",search:m="",hash:g="",state:x=null,key:_="default",unstable_mask:w}=i,v=E.useMemo(()=>{let S=Wr(h,d);return S==null?null:{location:{pathname:S,search:m,hash:g,state:x,key:_,unstable_mask:w},navigationType:a}},[d,h,m,g,x,_,a,w]);return Zi(v!=null,`<Router basename="${d}"> is not able to match the URL "${h}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:E.createElement(Ai.Provider,{value:f},E.createElement(jc.Provider,{children:e,value:v}))}function ET({children:t,location:e}){return KO(E0(t),e)}function E0(t,e=[]){let i=[];return E.Children.forEach(t,(a,s)=>{if(!E.isValidElement(a))return;let l=[...e,s];if(a.type===E.Fragment){i.push.apply(i,E0(a.props.children,l));return}Nt(a.type===yi,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Nt(!a.props.index||!a.props.children,"An index route cannot have child routes.");let c={id:a.props.id||l.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(c.children=E0(a.props.children,l)),i.push(c)}),i}var zd="get",Pd="application/x-www-form-urlencoded";function Cf(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function dM(t){return Cf(t)&&t.tagName.toLowerCase()==="button"}function fM(t){return Cf(t)&&t.tagName.toLowerCase()==="form"}function hM(t){return Cf(t)&&t.tagName.toLowerCase()==="input"}function pM(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function mM(t,e){return t.button===0&&(!e||e==="_self")&&!pM(t)}function C0(t=""){return new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,i)=>{let a=t[i];return e.concat(Array.isArray(a)?a.map(s=>[i,s]):[[i,a]])},[]))}function gM(t,e){let i=C0(t);return e&&e.forEach((a,s)=>{i.has(s)||e.getAll(s).forEach(l=>{i.append(s,l)})}),i}var cd=null;function yM(){if(cd===null)try{new FormData(document.createElement("form"),0),cd=!1}catch{cd=!0}return cd}var xM=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Sm(t){return t!=null&&!xM.has(t)?(Zi(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pd}"`),null):t}function bM(t,e){let i,a,s,l,c;if(fM(t)){let d=t.getAttribute("action");a=d?Wr(d,e):null,i=t.getAttribute("method")||zd,s=Sm(t.getAttribute("enctype"))||Pd,l=new FormData(t)}else if(dM(t)||hM(t)&&(t.type==="submit"||t.type==="image")){let d=t.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let f=t.getAttribute("formaction")||d.getAttribute("action");if(a=f?Wr(f,e):null,i=t.getAttribute("formmethod")||d.getAttribute("method")||zd,s=Sm(t.getAttribute("formenctype"))||Sm(d.getAttribute("enctype"))||Pd,l=new FormData(d,t),!yM()){let{name:h,type:m,value:g}=t;if(m==="image"){let x=h?`${h}.`:"";l.append(`${x}x`,"0"),l.append(`${x}y`,"0")}else h&&l.append(h,g)}}else{if(Cf(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=zd,a=null,s=Pd,c=t}return l&&s==="text/plain"&&(c=l,l=void 0),{action:a,method:i.toLowerCase(),encType:s,formData:l,body:c}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Vg(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function CT(t,e,i,a){let s=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return i?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${a}`:s.pathname=`${s.pathname}.${a}`:s.pathname==="/"?s.pathname=`_root.${a}`:e&&Wr(s.pathname,e)==="/"?s.pathname=`${e.replace(/\/$/,"")}/_root.${a}`:s.pathname=`${s.pathname.replace(/\/$/,"")}.${a}`,s}async function vM(t,e){if(t.id in e)return e[t.id];try{let i=await import(t.module);return e[t.id]=i,i}catch(i){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function wM(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function SM(t,e,i){let a=await Promise.all(t.map(async s=>{let l=e.routes[s.route.id];if(l){let c=await vM(l,i);return c.links?c.links():[]}return[]}));return CM(a.flat(1).filter(wM).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function tw(t,e,i,a,s,l){let c=(f,h)=>i[h]?f.route.id!==i[h].route.id:!0,d=(f,h)=>i[h].pathname!==f.pathname||i[h].route.path?.endsWith("*")&&i[h].params["*"]!==f.params["*"];return l==="assets"?e.filter((f,h)=>c(f,h)||d(f,h)):l==="data"?e.filter((f,h)=>{let m=a.routes[f.route.id];if(!m||!m.hasLoader)return!1;if(c(f,h)||d(f,h))return!0;if(f.route.shouldRevalidate){let g=f.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:i[0]?.params||{},nextUrl:new URL(t,window.origin),nextParams:f.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function _M(t,e,{includeHydrateFallback:i}={}){return TM(t.map(a=>{let s=e.routes[a.route.id];if(!s)return[];let l=[s.module];return s.clientActionModule&&(l=l.concat(s.clientActionModule)),s.clientLoaderModule&&(l=l.concat(s.clientLoaderModule)),i&&s.hydrateFallbackModule&&(l=l.concat(s.hydrateFallbackModule)),s.imports&&(l=l.concat(s.imports)),l}).flat(1))}function TM(t){return[...new Set(t)]}function EM(t){let e={},i=Object.keys(t).sort();for(let a of i)e[a]=t[a];return e}function CM(t,e){let i=new Set;return new Set(e),t.reduce((a,s)=>{let l=JSON.stringify(EM(s));return i.has(l)||(i.add(l),a.push({key:l,link:s})),a},[])}function Fg(){let t=E.useContext(Fo);return Vg(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function kM(){let t=E.useContext(Ef);return Vg(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Hg=E.createContext(void 0);Hg.displayName="FrameworkContext";function $g(){let t=E.useContext(Hg);return Vg(t,"You must render this element inside a <HydratedRouter> element"),t}function AM(t,e){let i=E.useContext(Hg),[a,s]=E.useState(!1),[l,c]=E.useState(!1),{onFocus:d,onBlur:f,onMouseEnter:h,onMouseLeave:m,onTouchStart:g}=e,x=E.useRef(null);E.useEffect(()=>{if(t==="render"&&c(!0),t==="viewport"){let v=C=>{C.forEach(M=>{c(M.isIntersecting)})},S=new IntersectionObserver(v,{threshold:.5});return x.current&&S.observe(x.current),()=>{S.disconnect()}}},[t]),E.useEffect(()=>{if(a){let v=setTimeout(()=>{c(!0)},100);return()=>{clearTimeout(v)}}},[a]);let _=()=>{s(!0)},w=()=>{s(!1),c(!1)};return i?t!=="intent"?[l,x,{}]:[l,x,{onFocus:Vl(d,_),onBlur:Vl(f,w),onMouseEnter:Vl(h,_),onMouseLeave:Vl(m,w),onTouchStart:Vl(g,_)}]:[!1,x,{}]}function Vl(t,e){return i=>{t&&t(i),i.defaultPrevented||e(i)}}function RM({page:t,...e}){let i=UO(),{router:a}=Fg(),s=E.useMemo(()=>dT(a.routes,t,a.basename),[a.routes,t,a.basename]);return s?i?E.createElement(OM,{page:t,matches:s,...e}):E.createElement(MM,{page:t,matches:s,...e}):null}function DM(t){let{manifest:e,routeModules:i}=$g(),[a,s]=E.useState([]);return E.useEffect(()=>{let l=!1;return SM(t,e,i).then(c=>{l||s(c)}),()=>{l=!0}},[t,e,i]),a}function OM({page:t,matches:e,...i}){let a=Ri(),{future:s}=$g(),{basename:l}=Fg(),c=E.useMemo(()=>{if(t===a.pathname+a.search+a.hash)return[];let d=CT(t,l,s.unstable_trailingSlashAwareDataRequests,"rsc"),f=!1,h=[];for(let m of e)typeof m.route.shouldRevalidate=="function"?f=!0:h.push(m.route.id);return f&&h.length>0&&d.searchParams.set("_routes",h.join(",")),[d.pathname+d.search]},[l,s.unstable_trailingSlashAwareDataRequests,t,a,e]);return E.createElement(E.Fragment,null,c.map(d=>E.createElement("link",{key:d,rel:"prefetch",as:"fetch",href:d,...i})))}function MM({page:t,matches:e,...i}){let a=Ri(),{future:s,manifest:l,routeModules:c}=$g(),{basename:d}=Fg(),{loaderData:f,matches:h}=kM(),m=E.useMemo(()=>tw(t,e,h,l,a,"data"),[t,e,h,l,a]),g=E.useMemo(()=>tw(t,e,h,l,a,"assets"),[t,e,h,l,a]),x=E.useMemo(()=>{if(t===a.pathname+a.search+a.hash)return[];let v=new Set,S=!1;if(e.forEach(M=>{let R=l.routes[M.route.id];!R||!R.hasLoader||(!m.some(L=>L.route.id===M.route.id)&&M.route.id in f&&c[M.route.id]?.shouldRevalidate||R.hasClientLoader?S=!0:v.add(M.route.id))}),v.size===0)return[];let C=CT(t,d,s.unstable_trailingSlashAwareDataRequests,"data");return S&&v.size>0&&C.searchParams.set("_routes",e.filter(M=>v.has(M.route.id)).map(M=>M.route.id).join(",")),[C.pathname+C.search]},[d,s.unstable_trailingSlashAwareDataRequests,f,a,l,m,e,t,c]),_=E.useMemo(()=>_M(g,l),[g,l]),w=DM(g);return E.createElement(E.Fragment,null,x.map(v=>E.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...i})),_.map(v=>E.createElement("link",{key:v,rel:"modulepreload",href:v,...i})),w.map(({key:v,link:S})=>E.createElement("link",{key:v,nonce:i.nonce,...S,crossOrigin:S.crossOrigin??i.crossOrigin})))}function LM(...t){return e=>{t.forEach(i=>{typeof i=="function"?i(e):i!=null&&(i.current=e)})}}var jM=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{jM&&(window.__reactRouterVersion="7.14.0")}catch{}function NM({basename:t,children:e,unstable_useTransitions:i,window:a}){let s=E.useRef();s.current==null&&(s.current=dO({window:a,v5Compat:!0}));let l=s.current,[c,d]=E.useState({action:l.action,location:l.location}),f=E.useCallback(h=>{i===!1?d(h):E.startTransition(()=>d(h))},[i]);return E.useLayoutEffect(()=>l.listen(f),[l,f]),E.createElement(uM,{basename:t,children:e,location:c.location,navigationType:c.action,navigator:l,unstable_useTransitions:i})}var kT=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,qg=E.forwardRef(function({onClick:e,discover:i="render",prefetch:a="none",relative:s,reloadDocument:l,replace:c,unstable_mask:d,state:f,target:h,to:m,preventScrollReset:g,viewTransition:x,unstable_defaultShouldRevalidate:_,...w},v){let{basename:S,navigator:C,unstable_useTransitions:M}=E.useContext(Ai),R=typeof m=="string"&&kT.test(m),L=mT(m,S);m=L.to;let O=qO(m,{relative:s}),j=Ri(),k=null;if(d){let Se=Tf(d,[],j.unstable_mask?j.unstable_mask.pathname:"/",!0);S!=="/"&&(Se.pathname=Se.pathname==="/"?S:Cr([S,Se.pathname])),k=C.createHref(Se)}let[U,I,Y]=AM(a,w),W=IM(m,{replace:c,unstable_mask:d,state:f,target:h,preventScrollReset:g,relative:s,viewTransition:x,unstable_defaultShouldRevalidate:_,unstable_useTransitions:M});function te(Se){e&&e(Se),Se.defaultPrevented||W(Se)}let me=!(L.isExternal||l),we=E.createElement("a",{...w,...Y,href:(me?k:void 0)||L.absoluteURL||O,onClick:me?te:e,ref:LM(v,I),target:h,"data-discover":!R&&i==="render"?"true":void 0});return U&&!R?E.createElement(E.Fragment,null,we,E.createElement(RM,{page:O})):we});qg.displayName="Link";var zM=E.forwardRef(function({"aria-current":e="page",caseSensitive:i=!1,className:a="",end:s=!1,style:l,to:c,viewTransition:d,children:f,...h},m){let g=Nc(c,{relative:h.relative}),x=Ri(),_=E.useContext(Ef),{navigator:w,basename:v}=E.useContext(Ai),S=_!=null&&qM(g)&&d===!0,C=w.encodeLocation?w.encodeLocation(g).pathname:g.pathname,M=x.pathname,R=_&&_.navigation&&_.navigation.location?_.navigation.location.pathname:null;i||(M=M.toLowerCase(),R=R?R.toLowerCase():null,C=C.toLowerCase()),R&&v&&(R=Wr(R,v)||R);const L=C!=="/"&&C.endsWith("/")?C.length-1:C.length;let O=M===C||!s&&M.startsWith(C)&&M.charAt(L)==="/",j=R!=null&&(R===C||!s&&R.startsWith(C)&&R.charAt(C.length)==="/"),k={isActive:O,isPending:j,isTransitioning:S},U=O?e:void 0,I;typeof a=="function"?I=a(k):I=[a,O?"active":null,j?"pending":null,S?"transitioning":null].filter(Boolean).join(" ");let Y=typeof l=="function"?l(k):l;return E.createElement(qg,{...h,"aria-current":U,className:I,ref:m,style:Y,to:c,viewTransition:d},typeof f=="function"?f(k):f)});zM.displayName="NavLink";var PM=E.forwardRef(({discover:t="render",fetcherKey:e,navigate:i,reloadDocument:a,replace:s,state:l,method:c=zd,action:d,onSubmit:f,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:x,..._},w)=>{let{unstable_useTransitions:v}=E.useContext(Ai),S=HM(),C=$M(d,{relative:h}),M=c.toLowerCase()==="get"?"get":"post",R=typeof d=="string"&&kT.test(d),L=O=>{if(f&&f(O),O.defaultPrevented)return;O.preventDefault();let j=O.nativeEvent.submitter,k=j?.getAttribute("formmethod")||c,U=()=>S(j||O.currentTarget,{fetcherKey:e,method:k,navigate:i,replace:s,state:l,relative:h,preventScrollReset:m,viewTransition:g,unstable_defaultShouldRevalidate:x});v&&i!==!1?E.startTransition(()=>U()):U()};return E.createElement("form",{ref:w,method:M,action:C,onSubmit:a?f:L,..._,"data-discover":!R&&t==="render"?"true":void 0})});PM.displayName="Form";function UM(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function AT(t){let e=E.useContext(Fo);return Nt(e,UM(t)),e}function IM(t,{target:e,replace:i,unstable_mask:a,state:s,preventScrollReset:l,relative:c,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:h}={}){let m=or(),g=Ri(),x=Nc(t,{relative:c});return E.useCallback(_=>{if(mM(_,e)){_.preventDefault();let w=i!==void 0?i:yc(g)===yc(x),v=()=>m(t,{replace:w,unstable_mask:a,state:s,preventScrollReset:l,relative:c,viewTransition:d,unstable_defaultShouldRevalidate:f});h?E.startTransition(()=>v()):v()}},[g,m,x,i,a,s,e,t,l,c,d,f,h])}function BM(t){Zi(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let e=E.useRef(C0(t)),i=E.useRef(!1),a=Ri(),s=E.useMemo(()=>gM(a.search,i.current?null:e.current),[a.search]),l=or(),c=E.useCallback((d,f)=>{const h=C0(typeof d=="function"?d(new URLSearchParams(s)):d);i.current=!0,l("?"+h,f)},[l,s]);return[s,c]}var VM=0,FM=()=>`__${String(++VM)}__`;function HM(){let{router:t}=AT("useSubmit"),{basename:e}=E.useContext(Ai),i=rM(),a=t.fetch,s=t.navigate;return E.useCallback(async(l,c={})=>{let{action:d,method:f,encType:h,formData:m,body:g}=bM(l,e);if(c.navigate===!1){let x=c.fetcherKey||FM();await a(x,i,c.action||d,{unstable_defaultShouldRevalidate:c.unstable_defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:m,body:g,formMethod:c.method||f,formEncType:c.encType||h,flushSync:c.flushSync})}else await s(c.action||d,{unstable_defaultShouldRevalidate:c.unstable_defaultShouldRevalidate,preventScrollReset:c.preventScrollReset,formData:m,body:g,formMethod:c.method||f,formEncType:c.encType||h,replace:c.replace,state:c.state,fromRouteId:i,flushSync:c.flushSync,viewTransition:c.viewTransition})},[a,s,e,i])}function $M(t,{relative:e}={}){let{basename:i}=E.useContext(Ai),a=E.useContext(sr);Nt(a,"useFormAction must be used inside a RouteContext");let[s]=a.matches.slice(-1),l={...Nc(t||".",{relative:e})},c=Ri();if(t==null){l.search=c.search;let d=new URLSearchParams(l.search),f=d.getAll("index");if(f.some(m=>m==="")){d.delete("index"),f.filter(g=>g).forEach(g=>d.append("index",g));let m=d.toString();l.search=m?`?${m}`:""}}return(!t||t===".")&&s.route.index&&(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(l.pathname=l.pathname==="/"?i:Cr([i,l.pathname])),yc(l)}function qM(t,{relative:e}={}){let i=E.useContext(xT);Nt(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=AT("useViewTransitionState"),s=Nc(t,{relative:e});if(!i.isTransitioning)return!1;let l=Wr(i.currentLocation.pathname,a)||i.currentLocation.pathname,c=Wr(i.nextLocation.pathname,a)||i.nextLocation.pathname;return af(s.pathname,c)!=null||af(s.pathname,l)!=null}function YM(t){if(t.sheet)return t.sheet;for(var e=0;e<document.styleSheets.length;e++)if(document.styleSheets[e].ownerNode===t)return document.styleSheets[e]}function GM(t){var e=document.createElement("style");return e.setAttribute("data-emotion",t.key),t.nonce!==void 0&&e.setAttribute("nonce",t.nonce),e.appendChild(document.createTextNode("")),e.setAttribute("data-s",""),e}var XM=(function(){function t(i){var a=this;this._insertTag=function(s){var l;a.tags.length===0?a.insertionPoint?l=a.insertionPoint.nextSibling:a.prepend?l=a.container.firstChild:l=a.before:l=a.tags[a.tags.length-1].nextSibling,a.container.insertBefore(s,l),a.tags.push(s)},this.isSpeedy=i.speedy===void 0?!0:i.speedy,this.tags=[],this.ctr=0,this.nonce=i.nonce,this.key=i.key,this.container=i.container,this.prepend=i.prepend,this.insertionPoint=i.insertionPoint,this.before=null}var e=t.prototype;return e.hydrate=function(a){a.forEach(this._insertTag)},e.insert=function(a){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(GM(this));var s=this.tags[this.tags.length-1];if(this.isSpeedy){var l=YM(s);try{l.insertRule(a,l.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(a));this.ctr++},e.flush=function(){this.tags.forEach(function(a){var s;return(s=a.parentNode)==null?void 0:s.removeChild(a)}),this.tags=[],this.ctr=0},t})(),Dn="-ms-",sf="-moz-",at="-webkit-",RT="comm",Yg="rule",Gg="decl",KM="@import",DT="@keyframes",ZM="@layer",QM=Math.abs,kf=String.fromCharCode,WM=Object.assign;function JM(t,e){return _n(t,0)^45?(((e<<2^_n(t,0))<<2^_n(t,1))<<2^_n(t,2))<<2^_n(t,3):0}function OT(t){return t.trim()}function eL(t,e){return(t=e.exec(t))?t[0]:t}function st(t,e,i){return t.replace(e,i)}function k0(t,e){return t.indexOf(e)}function _n(t,e){return t.charCodeAt(e)|0}function xc(t,e,i){return t.slice(e,i)}function br(t){return t.length}function Xg(t){return t.length}function ud(t,e){return e.push(t),t}function tL(t,e){return t.map(e).join("")}var Af=1,Do=1,MT=0,ii=0,rn=0,$o="";function Rf(t,e,i,a,s,l,c){return{value:t,root:e,parent:i,type:a,props:s,children:l,line:Af,column:Do,length:c,return:""}}function Fl(t,e){return WM(Rf("",null,null,"",null,null,0),t,{length:-t.length},e)}function nL(){return rn}function iL(){return rn=ii>0?_n($o,--ii):0,Do--,rn===10&&(Do=1,Af--),rn}function Ti(){return rn=ii<MT?_n($o,ii++):0,Do++,rn===10&&(Do=1,Af++),rn}function kr(){return _n($o,ii)}function Ud(){return ii}function zc(t,e){return xc($o,t,e)}function bc(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function LT(t){return Af=Do=1,MT=br($o=t),ii=0,[]}function jT(t){return $o="",t}function Id(t){return OT(zc(ii-1,A0(t===91?t+2:t===40?t+1:t)))}function rL(t){for(;(rn=kr())&&rn<33;)Ti();return bc(t)>2||bc(rn)>3?"":" "}function aL(t,e){for(;--e&&Ti()&&!(rn<48||rn>102||rn>57&&rn<65||rn>70&&rn<97););return zc(t,Ud()+(e<6&&kr()==32&&Ti()==32))}function A0(t){for(;Ti();)switch(rn){case t:return ii;case 34:case 39:t!==34&&t!==39&&A0(rn);break;case 40:t===41&&A0(t);break;case 92:Ti();break}return ii}function sL(t,e){for(;Ti()&&t+rn!==57;)if(t+rn===84&&kr()===47)break;return"/*"+zc(e,ii-1)+"*"+kf(t===47?t:Ti())}function oL(t){for(;!bc(kr());)Ti();return zc(t,ii)}function lL(t){return jT(Bd("",null,null,null,[""],t=LT(t),0,[0],t))}function Bd(t,e,i,a,s,l,c,d,f){for(var h=0,m=0,g=c,x=0,_=0,w=0,v=1,S=1,C=1,M=0,R="",L=s,O=l,j=a,k=R;S;)switch(w=M,M=Ti()){case 40:if(w!=108&&_n(k,g-1)==58){k0(k+=st(Id(M),"&","&\f"),"&\f")!=-1&&(C=-1);break}case 34:case 39:case 91:k+=Id(M);break;case 9:case 10:case 13:case 32:k+=rL(w);break;case 92:k+=aL(Ud()-1,7);continue;case 47:switch(kr()){case 42:case 47:ud(cL(sL(Ti(),Ud()),e,i),f);break;default:k+="/"}break;case 123*v:d[h++]=br(k)*C;case 125*v:case 59:case 0:switch(M){case 0:case 125:S=0;case 59+m:C==-1&&(k=st(k,/\f/g,"")),_>0&&br(k)-g&&ud(_>32?iw(k+";",a,i,g-1):iw(st(k," ","")+";",a,i,g-2),f);break;case 59:k+=";";default:if(ud(j=nw(k,e,i,h,m,s,d,R,L=[],O=[],g),l),M===123)if(m===0)Bd(k,e,j,j,L,l,g,d,O);else switch(x===99&&_n(k,3)===110?100:x){case 100:case 108:case 109:case 115:Bd(t,j,j,a&&ud(nw(t,j,j,0,0,s,d,R,s,L=[],g),O),s,O,g,d,a?L:O);break;default:Bd(k,j,j,j,[""],O,0,d,O)}}h=m=_=0,v=C=1,R=k="",g=c;break;case 58:g=1+br(k),_=w;default:if(v<1){if(M==123)--v;else if(M==125&&v++==0&&iL()==125)continue}switch(k+=kf(M),M*v){case 38:C=m>0?1:(k+="\f",-1);break;case 44:d[h++]=(br(k)-1)*C,C=1;break;case 64:kr()===45&&(k+=Id(Ti())),x=kr(),m=g=br(R=k+=oL(Ud())),M++;break;case 45:w===45&&br(k)==2&&(v=0)}}return l}function nw(t,e,i,a,s,l,c,d,f,h,m){for(var g=s-1,x=s===0?l:[""],_=Xg(x),w=0,v=0,S=0;w<a;++w)for(var C=0,M=xc(t,g+1,g=QM(v=c[w])),R=t;C<_;++C)(R=OT(v>0?x[C]+" "+M:st(M,/&\f/g,x[C])))&&(f[S++]=R);return Rf(t,e,i,s===0?Yg:d,f,h,m)}function cL(t,e,i){return Rf(t,e,i,RT,kf(nL()),xc(t,2,-2),0)}function iw(t,e,i,a){return Rf(t,e,i,Gg,xc(t,0,a),xc(t,a+1,-1),a)}function _o(t,e){for(var i="",a=Xg(t),s=0;s<a;s++)i+=e(t[s],s,t,e)||"";return i}function uL(t,e,i,a){switch(t.type){case ZM:if(t.children.length)break;case KM:case Gg:return t.return=t.return||t.value;case RT:return"";case DT:return t.return=t.value+"{"+_o(t.children,a)+"}";case Yg:t.value=t.props.join(",")}return br(i=_o(t.children,a))?t.return=t.value+"{"+i+"}":""}function dL(t){var e=Xg(t);return function(i,a,s,l){for(var c="",d=0;d<e;d++)c+=t[d](i,a,s,l)||"";return c}}function fL(t){return function(e){e.root||(e=e.return)&&t(e)}}function NT(t){var e=Object.create(null);return function(i){return e[i]===void 0&&(e[i]=t(i)),e[i]}}var hL=function(e,i,a){for(var s=0,l=0;s=l,l=kr(),s===38&&l===12&&(i[a]=1),!bc(l);)Ti();return zc(e,ii)},pL=function(e,i){var a=-1,s=44;do switch(bc(s)){case 0:s===38&&kr()===12&&(i[a]=1),e[a]+=hL(ii-1,i,a);break;case 2:e[a]+=Id(s);break;case 4:if(s===44){e[++a]=kr()===58?"&\f":"",i[a]=e[a].length;break}default:e[a]+=kf(s)}while(s=Ti());return e},mL=function(e,i){return jT(pL(LT(e),i))},rw=new WeakMap,gL=function(e){if(!(e.type!=="rule"||!e.parent||e.length<1)){for(var i=e.value,a=e.parent,s=e.column===a.column&&e.line===a.line;a.type!=="rule";)if(a=a.parent,!a)return;if(!(e.props.length===1&&i.charCodeAt(0)!==58&&!rw.get(a))&&!s){rw.set(e,!0);for(var l=[],c=mL(i,l),d=a.props,f=0,h=0;f<c.length;f++)for(var m=0;m<d.length;m++,h++)e.props[h]=l[f]?c[f].replace(/&\f/g,d[m]):d[m]+" "+c[f]}}},yL=function(e){if(e.type==="decl"){var i=e.value;i.charCodeAt(0)===108&&i.charCodeAt(2)===98&&(e.return="",e.value="")}};function zT(t,e){switch(JM(t,e)){case 5103:return at+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return at+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return at+t+sf+t+Dn+t+t;case 6828:case 4268:return at+t+Dn+t+t;case 6165:return at+t+Dn+"flex-"+t+t;case 5187:return at+t+st(t,/(\w+).+(:[^]+)/,at+"box-$1$2"+Dn+"flex-$1$2")+t;case 5443:return at+t+Dn+"flex-item-"+st(t,/flex-|-self/,"")+t;case 4675:return at+t+Dn+"flex-line-pack"+st(t,/align-content|flex-|-self/,"")+t;case 5548:return at+t+Dn+st(t,"shrink","negative")+t;case 5292:return at+t+Dn+st(t,"basis","preferred-size")+t;case 6060:return at+"box-"+st(t,"-grow","")+at+t+Dn+st(t,"grow","positive")+t;case 4554:return at+st(t,/([^-])(transform)/g,"$1"+at+"$2")+t;case 6187:return st(st(st(t,/(zoom-|grab)/,at+"$1"),/(image-set)/,at+"$1"),t,"")+t;case 5495:case 3959:return st(t,/(image-set\([^]*)/,at+"$1$`$1");case 4968:return st(st(t,/(.+:)(flex-)?(.*)/,at+"box-pack:$3"+Dn+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+at+t+t;case 4095:case 3583:case 4068:case 2532:return st(t,/(.+)-inline(.+)/,at+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(br(t)-1-e>6)switch(_n(t,e+1)){case 109:if(_n(t,e+4)!==45)break;case 102:return st(t,/(.+:)(.+)-([^]+)/,"$1"+at+"$2-$3$1"+sf+(_n(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~k0(t,"stretch")?zT(st(t,"stretch","fill-available"),e)+t:t}break;case 4949:if(_n(t,e+1)!==115)break;case 6444:switch(_n(t,br(t)-3-(~k0(t,"!important")&&10))){case 107:return st(t,":",":"+at)+t;case 101:return st(t,/(.+:)([^;!]+)(;|!.+)?/,"$1"+at+(_n(t,14)===45?"inline-":"")+"box$3$1"+at+"$2$3$1"+Dn+"$2box$3")+t}break;case 5936:switch(_n(t,e+11)){case 114:return at+t+Dn+st(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return at+t+Dn+st(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return at+t+Dn+st(t,/[svh]\w+-[tblr]{2}/,"lr")+t}return at+t+Dn+t+t}return t}var xL=function(e,i,a,s){if(e.length>-1&&!e.return)switch(e.type){case Gg:e.return=zT(e.value,e.length);break;case DT:return _o([Fl(e,{value:st(e.value,"@","@"+at)})],s);case Yg:if(e.length)return tL(e.props,function(l){switch(eL(l,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return _o([Fl(e,{props:[st(l,/:(read-\w+)/,":"+sf+"$1")]})],s);case"::placeholder":return _o([Fl(e,{props:[st(l,/:(plac\w+)/,":"+at+"input-$1")]}),Fl(e,{props:[st(l,/:(plac\w+)/,":"+sf+"$1")]}),Fl(e,{props:[st(l,/:(plac\w+)/,Dn+"input-$1")]})],s)}return""})}},bL=[xL],vL=function(e){var i=e.key;if(i==="css"){var a=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(a,function(v){var S=v.getAttribute("data-emotion");S.indexOf(" ")!==-1&&(document.head.appendChild(v),v.setAttribute("data-s",""))})}var s=e.stylisPlugins||bL,l={},c,d=[];c=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+i+' "]'),function(v){for(var S=v.getAttribute("data-emotion").split(" "),C=1;C<S.length;C++)l[S[C]]=!0;d.push(v)});var f,h=[gL,yL];{var m,g=[uL,fL(function(v){m.insert(v)})],x=dL(h.concat(s,g)),_=function(S){return _o(lL(S),x)};f=function(S,C,M,R){m=M,_(S?S+"{"+C.styles+"}":C.styles),R&&(w.inserted[C.name]=!0)}}var w={key:i,sheet:new XM({key:i,container:c,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:l,registered:{},insert:f};return w.sheet.hydrate(d),w};function R0(){return R0=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)({}).hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},R0.apply(null,arguments)}var _m={exports:{}},lt={};var aw;function wL(){if(aw)return lt;aw=1;var t=typeof Symbol=="function"&&Symbol.for,e=t?Symbol.for("react.element"):60103,i=t?Symbol.for("react.portal"):60106,a=t?Symbol.for("react.fragment"):60107,s=t?Symbol.for("react.strict_mode"):60108,l=t?Symbol.for("react.profiler"):60114,c=t?Symbol.for("react.provider"):60109,d=t?Symbol.for("react.context"):60110,f=t?Symbol.for("react.async_mode"):60111,h=t?Symbol.for("react.concurrent_mode"):60111,m=t?Symbol.for("react.forward_ref"):60112,g=t?Symbol.for("react.suspense"):60113,x=t?Symbol.for("react.suspense_list"):60120,_=t?Symbol.for("react.memo"):60115,w=t?Symbol.for("react.lazy"):60116,v=t?Symbol.for("react.block"):60121,S=t?Symbol.for("react.fundamental"):60117,C=t?Symbol.for("react.responder"):60118,M=t?Symbol.for("react.scope"):60119;function R(O){if(typeof O=="object"&&O!==null){var j=O.$$typeof;switch(j){case e:switch(O=O.type,O){case f:case h:case a:case l:case s:case g:return O;default:switch(O=O&&O.$$typeof,O){case d:case m:case w:case _:case c:return O;default:return j}}case i:return j}}}function L(O){return R(O)===h}return lt.AsyncMode=f,lt.ConcurrentMode=h,lt.ContextConsumer=d,lt.ContextProvider=c,lt.Element=e,lt.ForwardRef=m,lt.Fragment=a,lt.Lazy=w,lt.Memo=_,lt.Portal=i,lt.Profiler=l,lt.StrictMode=s,lt.Suspense=g,lt.isAsyncMode=function(O){return L(O)||R(O)===f},lt.isConcurrentMode=L,lt.isContextConsumer=function(O){return R(O)===d},lt.isContextProvider=function(O){return R(O)===c},lt.isElement=function(O){return typeof O=="object"&&O!==null&&O.$$typeof===e},lt.isForwardRef=function(O){return R(O)===m},lt.isFragment=function(O){return R(O)===a},lt.isLazy=function(O){return R(O)===w},lt.isMemo=function(O){return R(O)===_},lt.isPortal=function(O){return R(O)===i},lt.isProfiler=function(O){return R(O)===l},lt.isStrictMode=function(O){return R(O)===s},lt.isSuspense=function(O){return R(O)===g},lt.isValidElementType=function(O){return typeof O=="string"||typeof O=="function"||O===a||O===h||O===l||O===s||O===g||O===x||typeof O=="object"&&O!==null&&(O.$$typeof===w||O.$$typeof===_||O.$$typeof===c||O.$$typeof===d||O.$$typeof===m||O.$$typeof===S||O.$$typeof===C||O.$$typeof===M||O.$$typeof===v)},lt.typeOf=R,lt}var sw;function SL(){return sw||(sw=1,_m.exports=wL()),_m.exports}var Tm,ow;function _L(){if(ow)return Tm;ow=1;var t=SL(),e={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},s={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},l={};l[t.ForwardRef]=a,l[t.Memo]=s;function c(w){return t.isMemo(w)?s:l[w.$$typeof]||e}var d=Object.defineProperty,f=Object.getOwnPropertyNames,h=Object.getOwnPropertySymbols,m=Object.getOwnPropertyDescriptor,g=Object.getPrototypeOf,x=Object.prototype;function _(w,v,S){if(typeof v!="string"){if(x){var C=g(v);C&&C!==x&&_(w,C,S)}var M=f(v);h&&(M=M.concat(h(v)));for(var R=c(w),L=c(v),O=0;O<M.length;++O){var j=M[O];if(!i[j]&&!(S&&S[j])&&!(L&&L[j])&&!(R&&R[j])){var k=m(v,j);try{d(w,j,k)}catch{}}}}return w}return Tm=_,Tm}_L();var TL=!0;function PT(t,e,i){var a="";return i.split(" ").forEach(function(s){t[s]!==void 0?e.push(t[s]+";"):s&&(a+=s+" ")}),a}var Kg=function(e,i,a){var s=e.key+"-"+i.name;(a===!1||TL===!1)&&e.registered[s]===void 0&&(e.registered[s]=i.styles)},Zg=function(e,i,a){Kg(e,i,a);var s=e.key+"-"+i.name;if(e.inserted[i.name]===void 0){var l=i;do e.insert(i===l?"."+s:"",l,e.sheet,!0),l=l.next;while(l!==void 0)}};function EL(t){for(var e=0,i,a=0,s=t.length;s>=4;++a,s-=4)i=t.charCodeAt(a)&255|(t.charCodeAt(++a)&255)<<8|(t.charCodeAt(++a)&255)<<16|(t.charCodeAt(++a)&255)<<24,i=(i&65535)*1540483477+((i>>>16)*59797<<16),i^=i>>>24,e=(i&65535)*1540483477+((i>>>16)*59797<<16)^(e&65535)*1540483477+((e>>>16)*59797<<16);switch(s){case 3:e^=(t.charCodeAt(a+2)&255)<<16;case 2:e^=(t.charCodeAt(a+1)&255)<<8;case 1:e^=t.charCodeAt(a)&255,e=(e&65535)*1540483477+((e>>>16)*59797<<16)}return e^=e>>>13,e=(e&65535)*1540483477+((e>>>16)*59797<<16),((e^e>>>15)>>>0).toString(36)}var CL={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},kL=/[A-Z]|^ms/g,AL=/_EMO_([^_]+?)_([^]*?)_EMO_/g,UT=function(e){return e.charCodeAt(1)===45},lw=function(e){return e!=null&&typeof e!="boolean"},Em=NT(function(t){return UT(t)?t:t.replace(kL,"-$&").toLowerCase()}),cw=function(e,i){switch(e){case"animation":case"animationName":if(typeof i=="string")return i.replace(AL,function(a,s,l){return vr={name:s,styles:l,next:vr},s})}return CL[e]!==1&&!UT(e)&&typeof i=="number"&&i!==0?i+"px":i};function vc(t,e,i){if(i==null)return"";var a=i;if(a.__emotion_styles!==void 0)return a;switch(typeof i){case"boolean":return"";case"object":{var s=i;if(s.anim===1)return vr={name:s.name,styles:s.styles,next:vr},s.name;var l=i;if(l.styles!==void 0){var c=l.next;if(c!==void 0)for(;c!==void 0;)vr={name:c.name,styles:c.styles,next:vr},c=c.next;var d=l.styles+";";return d}return RL(t,e,i)}case"function":{if(t!==void 0){var f=vr,h=i(t);return vr=f,vc(t,e,h)}break}}var m=i;if(e==null)return m;var g=e[m];return g!==void 0?g:m}function RL(t,e,i){var a="";if(Array.isArray(i))for(var s=0;s<i.length;s++)a+=vc(t,e,i[s])+";";else for(var l in i){var c=i[l];if(typeof c!="object"){var d=c;e!=null&&e[d]!==void 0?a+=l+"{"+e[d]+"}":lw(d)&&(a+=Em(l)+":"+cw(l,d)+";")}else if(Array.isArray(c)&&typeof c[0]=="string"&&(e==null||e[c[0]]===void 0))for(var f=0;f<c.length;f++)lw(c[f])&&(a+=Em(l)+":"+cw(l,c[f])+";");else{var h=vc(t,e,c);switch(l){case"animation":case"animationName":{a+=Em(l)+":"+h+";";break}default:a+=l+"{"+h+"}"}}}return a}var uw=/label:\s*([^\s;{]+)\s*(;|$)/g,vr;function Df(t,e,i){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";vr=void 0;var l=t[0];if(l==null||l.raw===void 0)a=!1,s+=vc(i,e,l);else{var c=l;s+=c[0]}for(var d=1;d<t.length;d++)if(s+=vc(i,e,t[d]),a){var f=l;s+=f[d]}uw.lastIndex=0;for(var h="",m;(m=uw.exec(s))!==null;)h+="-"+m[1];var g=EL(s)+h;return{name:g,styles:s,next:vr}}var DL=function(e){return e()},IT=kv.useInsertionEffect?kv.useInsertionEffect:!1,BT=IT||DL,dw=IT||E.useLayoutEffect,VT=E.createContext(typeof HTMLElement<"u"?vL({key:"css"}):null);VT.Provider;var Qg=function(e){return E.forwardRef(function(i,a){var s=E.useContext(VT);return e(i,s,a)})},Wg=E.createContext({}),Pc={}.hasOwnProperty,D0="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",Jg=function(e,i){var a={};for(var s in i)Pc.call(i,s)&&(a[s]=i[s]);return a[D0]=e,a},OL=function(e){var i=e.cache,a=e.serialized,s=e.isStringTag;return Kg(i,a,s),BT(function(){return Zg(i,a,s)}),null},ML=Qg(function(t,e,i){var a=t.css;typeof a=="string"&&e.registered[a]!==void 0&&(a=e.registered[a]);var s=t[D0],l=[a],c="";typeof t.className=="string"?c=PT(e.registered,l,t.className):t.className!=null&&(c=t.className+" ");var d=Df(l,void 0,E.useContext(Wg));c+=e.key+"-"+d.name;var f={};for(var h in t)Pc.call(t,h)&&h!=="css"&&h!==D0&&(f[h]=t[h]);return f.className=c,i&&(f.ref=i),E.createElement(E.Fragment,null,E.createElement(OL,{cache:e,serialized:d,isStringTag:typeof s=="string"}),E.createElement(s,f))}),ey=ML,Ar=b.Fragment,A=function(e,i,a){return Pc.call(i,"css")?b.jsx(ey,Jg(e,i),a):b.jsx(e,i,a)},re=function(e,i,a){return Pc.call(i,"css")?b.jsxs(ey,Jg(e,i),a):b.jsxs(e,i,a)},fw=function(e,i){var a=arguments;if(i==null||!Pc.call(i,"css"))return E.createElement.apply(void 0,a);var s=a.length,l=new Array(s);l[0]=ey,l[1]=Jg(e,i);for(var c=2;c<s;c++)l[c]=a[c];return E.createElement.apply(null,l)};(function(t){var e;e||(e=t.JSX||(t.JSX={}))})(fw||(fw={}));var LL=Qg(function(t,e){var i=t.styles,a=Df([i],void 0,E.useContext(Wg)),s=E.useRef();return dw(function(){var l=e.key+"-global",c=new e.sheet.constructor({key:l,nonce:e.sheet.nonce,container:e.sheet.container,speedy:e.sheet.isSpeedy}),d=!1,f=document.querySelector('style[data-emotion="'+l+" "+a.name+'"]');return e.sheet.tags.length&&(c.before=e.sheet.tags[0]),f!==null&&(d=!0,f.setAttribute("data-emotion",l),c.hydrate([f])),s.current=[c,d],function(){c.flush()}},[e]),dw(function(){var l=s.current,c=l[0],d=l[1];if(d){l[1]=!1;return}if(a.next!==void 0&&Zg(e,a.next,!0),c.tags.length){var f=c.tags[c.tags.length-1].nextElementSibling;c.before=f,c.flush()}e.insert("",a,c,!1)},[e,a.name]),null});function N(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return Df(e)}function Of(){var t=N.apply(void 0,arguments),e="animation-"+t.name;return{name:e,styles:"@keyframes "+e+"{"+t.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}const FT={DURATION:8e3,TREAD_LENGTH:8.913,TREAD_FRAGMENTS:40,LOGO_TEXT:"ON-WEAR"},HT=E.createContext(void 0),$T=()=>{const t=E.useContext(HT);if(!t)throw new Error("Logo components must be used within LogoProvider");return t},jL=()=>{const{DURATION:t,TREAD_LENGTH:e,TREAD_FRAGMENTS:i}=FT,a=e/i,s=[],l=[];for(let c=0;c<i;++c){const d=c/i,f=c*a;s.push(b.jsx(hw,{delay:-t+d*t,duration:t,moveX:-f,width:a},`back-${c}`)),l.push(b.jsx(hw,{delay:-t+(d-.5)*t,duration:t,moveX:f,width:a},`front-${c}`))}return{backTreadArray:s,frontTreadArray:l}},NL=({children:t,value:e})=>{const[i]=E.useState(e);return b.jsx(HT.Provider,{value:{text:i},children:t})};function hw({delay:t,duration:e,moveX:i,width:a}){const{text:s}=$T(),l={animationDuration:`${e}ms`,animationDelay:`${t}ms`,width:`calc(${a}rem + 1px)`},c={transform:`translateX(${i}rem)`};return b.jsx("div",{className:"tot__tread",style:l,children:b.jsx("div",{className:"tot__tread-window","aria-hidden":"true","data-text":s,style:c})})}function pw({layerFragments:t,ariaHidden:e}){const{text:i}=$T();return b.jsxs("div",{className:"tot__layer","aria-hidden":e,children:[i,t]})}function zL(){const{backTreadArray:t,frontTreadArray:e}=jL();return b.jsx(NL,{value:FT.LOGO_TEXT,children:b.jsx(qg,{to:"main",style:{textDecoration:"none",color:"inherit"},children:b.jsxs("div",{className:"tot",style:{cursor:"pointer"},children:[b.jsx(pw,{layerFragments:e}),b.jsx(pw,{layerFragments:t,ariaHidden:!0})]})})})}const PL="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24'%20viewBox='0%200%2024%2024'%20width='24'%3e%3cpath%20d='M22.56%2012.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26%201.37-1.04%202.53-2.21%203.31v2.77h3.57c2.08-1.92%203.28-4.74%203.28-8.09z'%20fill='%234285F4'/%3e%3cpath%20d='M12%2023c2.97%200%205.46-.98%207.28-2.66l-3.57-2.77c-.98.66-2.23%201.06-3.71%201.06-2.86%200-5.29-1.93-6.16-4.53H2.18v2.84C3.99%2020.53%207.7%2023%2012%2023z'%20fill='%2334A853'/%3e%3cpath%20d='M5.84%2014.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43%208.55%201%2010.22%201%2012s.43%203.45%201.18%204.93l2.85-2.22.81-.62z'%20fill='%23FBBC05'/%3e%3cpath%20d='M12%205.38c1.62%200%203.06.56%204.21%201.64l3.15-3.15C17.45%202.09%2014.97%201%2012%201%207.7%201%203.99%203.47%202.18%207.07l3.66%202.84c.87-2.6%203.3-4.53%206.16-4.53z'%20fill='%23EA4335'/%3e%3cpath%20d='M1%201h22v22H1z'%20fill='none'/%3e%3c/svg%3e",mw=t=>{let e;const i=new Set,a=(h,m)=>{const g=typeof h=="function"?h(e):h;if(!Object.is(g,e)){const x=e;e=m??(typeof g!="object"||g===null)?g:Object.assign({},e,g),i.forEach(_=>_(e,x))}},s=()=>e,d={setState:a,getState:s,getInitialState:()=>f,subscribe:h=>(i.add(h),()=>i.delete(h))},f=e=t(a,s,d);return d},UL=(t=>t?mw(t):mw),IL=t=>t;function BL(t,e=IL){const i=_e.useSyncExternalStore(t.subscribe,_e.useCallback(()=>e(t.getState()),[t,e]),_e.useCallback(()=>e(t.getInitialState()),[t,e]));return _e.useDebugValue(i),i}const VL=t=>{const e=UL(t),i=a=>BL(e,a);return Object.assign(i,e),i},Mf=(t=>VL);function FL(t,e){let i;try{i=t()}catch{return}return{getItem:s=>{var l;const c=f=>f===null?null:JSON.parse(f,void 0),d=(l=i.getItem(s))!=null?l:null;return d instanceof Promise?d.then(c):c(d)},setItem:(s,l)=>i.setItem(s,JSON.stringify(l,void 0)),removeItem:s=>i.removeItem(s)}}const O0=t=>e=>{try{const i=t(e);return i instanceof Promise?i:{then(a){return O0(a)(i)},catch(a){return this}}}catch(i){return{then(a){return this},catch(a){return O0(a)(i)}}}},HL=(t,e)=>(i,a,s)=>{let l={storage:FL(()=>window.localStorage),partialize:S=>S,version:0,merge:(S,C)=>({...C,...S}),...e},c=!1,d=0;const f=new Set,h=new Set;let m=l.storage;if(!m)return t((...S)=>{console.warn(`[zustand persist middleware] Unable to update item '${l.name}', the given storage is currently unavailable.`),i(...S)},a,s);const g=()=>{const S=l.partialize({...a()});return m.setItem(l.name,{state:S,version:l.version})},x=s.setState;s.setState=(S,C)=>(x(S,C),g());const _=t((...S)=>(i(...S),g()),a,s);s.getInitialState=()=>_;let w;const v=()=>{var S,C;if(!m)return;const M=++d;c=!1,f.forEach(L=>{var O;return L((O=a())!=null?O:_)});const R=((C=l.onRehydrateStorage)==null?void 0:C.call(l,(S=a())!=null?S:_))||void 0;return O0(m.getItem.bind(m))(l.name).then(L=>{if(L)if(typeof L.version=="number"&&L.version!==l.version){if(l.migrate){const O=l.migrate(L.state,L.version);return O instanceof Promise?O.then(j=>[!0,j]):[!0,O]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,L.state];return[!1,void 0]}).then(L=>{var O;if(M!==d)return;const[j,k]=L;if(w=l.merge(k,(O=a())!=null?O:_),i(w,!0),j)return g()}).then(()=>{M===d&&(R?.(a(),void 0),w=a(),c=!0,h.forEach(L=>L(w)))}).catch(L=>{M===d&&R?.(void 0,L)})};return s.persist={setOptions:S=>{l={...l,...S},S.storage&&(m=S.storage)},clearStorage:()=>{m?.removeItem(l.name)},getOptions:()=>l,rehydrate:()=>v(),hasHydrated:()=>c,onHydrate:S=>(f.add(S),()=>{f.delete(S)}),onFinishHydration:S=>(h.add(S),()=>{h.delete(S)})},l.skipHydration||v(),w||_},$L=HL,qL="modulepreload",YL=function(t,e){return new URL(t,e).href},gw={},GL=function(e,i,a){let s=Promise.resolve();if(i&&i.length>0){let h=function(m){return Promise.all(m.map(g=>Promise.resolve(g).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const c=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),f=d?.nonce||d?.getAttribute("nonce");s=h(i.map(m=>{if(m=YL(m,a),m in gw)return;gw[m]=!0;const g=m.endsWith(".css"),x=g?'[rel="stylesheet"]':"";if(a)for(let w=c.length-1;w>=0;w--){const v=c[w];if(v.href===m&&(!g||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${x}`))return;const _=document.createElement("link");if(_.rel=g?"stylesheet":qL,g||(_.as="script"),_.crossOrigin="",_.href=m,f&&_.setAttribute("nonce",f),document.head.appendChild(_),g)return new Promise((w,v)=>{_.addEventListener("load",w),_.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${m}`)))})}))}function l(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return s.then(c=>{for(const d of c||[])d.status==="rejected"&&l(d.reason);return e().catch(l)})};function qT(t,e){return function(){return t.apply(e,arguments)}}const{toString:XL}=Object.prototype,{getPrototypeOf:ty}=Object,{iterator:Lf,toStringTag:YT}=Symbol,jf=(t=>e=>{const i=XL.call(e);return t[i]||(t[i]=i.slice(8,-1).toLowerCase())})(Object.create(null)),lr=t=>(t=t.toLowerCase(),e=>jf(e)===t),Nf=t=>e=>typeof e===t,{isArray:qo}=Array,Oo=Nf("undefined");function Uc(t){return t!==null&&!Oo(t)&&t.constructor!==null&&!Oo(t.constructor)&&Qn(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const GT=lr("ArrayBuffer");function KL(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&GT(t.buffer),e}const ZL=Nf("string"),Qn=Nf("function"),XT=Nf("number"),Ic=t=>t!==null&&typeof t=="object",QL=t=>t===!0||t===!1,Vd=t=>{if(jf(t)!=="object")return!1;const e=ty(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(YT in t)&&!(Lf in t)},WL=t=>{if(!Ic(t)||Uc(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},JL=lr("Date"),ej=lr("File"),tj=t=>!!(t&&typeof t.uri<"u"),nj=t=>t&&typeof t.getParts<"u",ij=lr("Blob"),rj=lr("FileList"),aj=t=>Ic(t)&&Qn(t.pipe);function sj(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const yw=sj(),xw=typeof yw.FormData<"u"?yw.FormData:void 0,oj=t=>{let e;return t&&(xw&&t instanceof xw||Qn(t.append)&&((e=jf(t))==="formdata"||e==="object"&&Qn(t.toString)&&t.toString()==="[object FormData]"))},lj=lr("URLSearchParams"),[cj,uj,dj,fj]=["ReadableStream","Request","Response","Headers"].map(lr),hj=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Bc(t,e,{allOwnKeys:i=!1}={}){if(t===null||typeof t>"u")return;let a,s;if(typeof t!="object"&&(t=[t]),qo(t))for(a=0,s=t.length;a<s;a++)e.call(null,t[a],a,t);else{if(Uc(t))return;const l=i?Object.getOwnPropertyNames(t):Object.keys(t),c=l.length;let d;for(a=0;a<c;a++)d=l[a],e.call(null,t[d],d,t)}}function KT(t,e){if(Uc(t))return null;e=e.toLowerCase();const i=Object.keys(t);let a=i.length,s;for(;a-- >0;)if(s=i[a],e===s.toLowerCase())return s;return null}const ms=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,ZT=t=>!Oo(t)&&t!==ms;function M0(){const{caseless:t,skipUndefined:e}=ZT(this)&&this||{},i={},a=(s,l)=>{if(l==="__proto__"||l==="constructor"||l==="prototype")return;const c=t&&KT(i,l)||l;Vd(i[c])&&Vd(s)?i[c]=M0(i[c],s):Vd(s)?i[c]=M0({},s):qo(s)?i[c]=s.slice():(!e||!Oo(s))&&(i[c]=s)};for(let s=0,l=arguments.length;s<l;s++)arguments[s]&&Bc(arguments[s],a);return i}const pj=(t,e,i,{allOwnKeys:a}={})=>(Bc(e,(s,l)=>{i&&Qn(s)?Object.defineProperty(t,l,{value:qT(s,i),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(t,l,{value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:a}),t),mj=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),gj=(t,e,i,a)=>{t.prototype=Object.create(e.prototype,a),Object.defineProperty(t.prototype,"constructor",{value:t,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(t,"super",{value:e.prototype}),i&&Object.assign(t.prototype,i)},yj=(t,e,i,a)=>{let s,l,c;const d={};if(e=e||{},t==null)return e;do{for(s=Object.getOwnPropertyNames(t),l=s.length;l-- >0;)c=s[l],(!a||a(c,t,e))&&!d[c]&&(e[c]=t[c],d[c]=!0);t=i!==!1&&ty(t)}while(t&&(!i||i(t,e))&&t!==Object.prototype);return e},xj=(t,e,i)=>{t=String(t),(i===void 0||i>t.length)&&(i=t.length),i-=e.length;const a=t.indexOf(e,i);return a!==-1&&a===i},bj=t=>{if(!t)return null;if(qo(t))return t;let e=t.length;if(!XT(e))return null;const i=new Array(e);for(;e-- >0;)i[e]=t[e];return i},vj=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&ty(Uint8Array)),wj=(t,e)=>{const a=(t&&t[Lf]).call(t);let s;for(;(s=a.next())&&!s.done;){const l=s.value;e.call(t,l[0],l[1])}},Sj=(t,e)=>{let i;const a=[];for(;(i=t.exec(e))!==null;)a.push(i);return a},_j=lr("HTMLFormElement"),Tj=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(i,a,s){return a.toUpperCase()+s}),bw=(({hasOwnProperty:t})=>(e,i)=>t.call(e,i))(Object.prototype),Ej=lr("RegExp"),QT=(t,e)=>{const i=Object.getOwnPropertyDescriptors(t),a={};Bc(i,(s,l)=>{let c;(c=e(s,l,t))!==!1&&(a[l]=c||s)}),Object.defineProperties(t,a)},Cj=t=>{QT(t,(e,i)=>{if(Qn(t)&&["arguments","caller","callee"].indexOf(i)!==-1)return!1;const a=t[i];if(Qn(a)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+i+"'")})}})},kj=(t,e)=>{const i={},a=s=>{s.forEach(l=>{i[l]=!0})};return qo(t)?a(t):a(String(t).split(e)),i},Aj=()=>{},Rj=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function Dj(t){return!!(t&&Qn(t.append)&&t[YT]==="FormData"&&t[Lf])}const Oj=t=>{const e=new Array(10),i=(a,s)=>{if(Ic(a)){if(e.indexOf(a)>=0)return;if(Uc(a))return a;if(!("toJSON"in a)){e[s]=a;const l=qo(a)?[]:{};return Bc(a,(c,d)=>{const f=i(c,s+1);!Oo(f)&&(l[d]=f)}),e[s]=void 0,l}}return a};return i(t,0)},Mj=lr("AsyncFunction"),Lj=t=>t&&(Ic(t)||Qn(t))&&Qn(t.then)&&Qn(t.catch),WT=((t,e)=>t?setImmediate:e?((i,a)=>(ms.addEventListener("message",({source:s,data:l})=>{s===ms&&l===i&&a.length&&a.shift()()},!1),s=>{a.push(s),ms.postMessage(i,"*")}))(`axios@${Math.random()}`,[]):i=>setTimeout(i))(typeof setImmediate=="function",Qn(ms.postMessage)),jj=typeof queueMicrotask<"u"?queueMicrotask.bind(ms):typeof process<"u"&&process.nextTick||WT,Nj=t=>t!=null&&Qn(t[Lf]),ee={isArray:qo,isArrayBuffer:GT,isBuffer:Uc,isFormData:oj,isArrayBufferView:KL,isString:ZL,isNumber:XT,isBoolean:QL,isObject:Ic,isPlainObject:Vd,isEmptyObject:WL,isReadableStream:cj,isRequest:uj,isResponse:dj,isHeaders:fj,isUndefined:Oo,isDate:JL,isFile:ej,isReactNativeBlob:tj,isReactNative:nj,isBlob:ij,isRegExp:Ej,isFunction:Qn,isStream:aj,isURLSearchParams:lj,isTypedArray:vj,isFileList:rj,forEach:Bc,merge:M0,extend:pj,trim:hj,stripBOM:mj,inherits:gj,toFlatObject:yj,kindOf:jf,kindOfTest:lr,endsWith:xj,toArray:bj,forEachEntry:wj,matchAll:Sj,isHTMLForm:_j,hasOwnProperty:bw,hasOwnProp:bw,reduceDescriptors:QT,freezeMethods:Cj,toObjectSet:kj,toCamelCase:Tj,noop:Aj,toFiniteNumber:Rj,findKey:KT,global:ms,isContextDefined:ZT,isSpecCompliantForm:Dj,toJSONObject:Oj,isAsyncFn:Mj,isThenable:Lj,setImmediate:WT,asap:jj,isIterable:Nj};let Ne=class JT extends Error{static from(e,i,a,s,l,c){const d=new JT(e.message,i||e.code,a,s,l);return d.cause=e,d.name=e.name,e.status!=null&&d.status==null&&(d.status=e.status),c&&Object.assign(d,c),d}constructor(e,i,a,s,l){super(e),Object.defineProperty(this,"message",{value:e,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,i&&(this.code=i),a&&(this.config=a),s&&(this.request=s),l&&(this.response=l,this.status=l.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:ee.toJSONObject(this.config),code:this.code,status:this.status}}};Ne.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Ne.ERR_BAD_OPTION="ERR_BAD_OPTION";Ne.ECONNABORTED="ECONNABORTED";Ne.ETIMEDOUT="ETIMEDOUT";Ne.ERR_NETWORK="ERR_NETWORK";Ne.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Ne.ERR_DEPRECATED="ERR_DEPRECATED";Ne.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Ne.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Ne.ERR_CANCELED="ERR_CANCELED";Ne.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Ne.ERR_INVALID_URL="ERR_INVALID_URL";const zj=null;function L0(t){return ee.isPlainObject(t)||ee.isArray(t)}function e3(t){return ee.endsWith(t,"[]")?t.slice(0,-2):t}function Cm(t,e,i){return t?t.concat(e).map(function(s,l){return s=e3(s),!i&&l?"["+s+"]":s}).join(i?".":""):e}function Pj(t){return ee.isArray(t)&&!t.some(L0)}const Uj=ee.toFlatObject(ee,{},null,function(e){return/^is[A-Z]/.test(e)});function zf(t,e,i){if(!ee.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,i=ee.toFlatObject(i,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,S){return!ee.isUndefined(S[v])});const a=i.metaTokens,s=i.visitor||m,l=i.dots,c=i.indexes,f=(i.Blob||typeof Blob<"u"&&Blob)&&ee.isSpecCompliantForm(e);if(!ee.isFunction(s))throw new TypeError("visitor must be a function");function h(w){if(w===null)return"";if(ee.isDate(w))return w.toISOString();if(ee.isBoolean(w))return w.toString();if(!f&&ee.isBlob(w))throw new Ne("Blob is not supported. Use a Buffer instead.");return ee.isArrayBuffer(w)||ee.isTypedArray(w)?f&&typeof Blob=="function"?new Blob([w]):Buffer.from(w):w}function m(w,v,S){let C=w;if(ee.isReactNative(e)&&ee.isReactNativeBlob(w))return e.append(Cm(S,v,l),h(w)),!1;if(w&&!S&&typeof w=="object"){if(ee.endsWith(v,"{}"))v=a?v:v.slice(0,-2),w=JSON.stringify(w);else if(ee.isArray(w)&&Pj(w)||(ee.isFileList(w)||ee.endsWith(v,"[]"))&&(C=ee.toArray(w)))return v=e3(v),C.forEach(function(R,L){!(ee.isUndefined(R)||R===null)&&e.append(c===!0?Cm([v],L,l):c===null?v:v+"[]",h(R))}),!1}return L0(w)?!0:(e.append(Cm(S,v,l),h(w)),!1)}const g=[],x=Object.assign(Uj,{defaultVisitor:m,convertValue:h,isVisitable:L0});function _(w,v){if(!ee.isUndefined(w)){if(g.indexOf(w)!==-1)throw Error("Circular reference detected in "+v.join("."));g.push(w),ee.forEach(w,function(C,M){(!(ee.isUndefined(C)||C===null)&&s.call(e,C,ee.isString(M)?M.trim():M,v,x))===!0&&_(C,v?v.concat(M):[M])}),g.pop()}}if(!ee.isObject(t))throw new TypeError("data must be an object");return _(t),e}function vw(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(a){return e[a]})}function ny(t,e){this._pairs=[],t&&zf(t,this,e)}const t3=ny.prototype;t3.append=function(e,i){this._pairs.push([e,i])};t3.toString=function(e){const i=e?function(a){return e.call(this,a,vw)}:vw;return this._pairs.map(function(s){return i(s[0])+"="+i(s[1])},"").join("&")};function Ij(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function n3(t,e,i){if(!e)return t;const a=i&&i.encode||Ij,s=ee.isFunction(i)?{serialize:i}:i,l=s&&s.serialize;let c;if(l?c=l(e,s):c=ee.isURLSearchParams(e)?e.toString():new ny(e,s).toString(a),c){const d=t.indexOf("#");d!==-1&&(t=t.slice(0,d)),t+=(t.indexOf("?")===-1?"?":"&")+c}return t}class ww{constructor(){this.handlers=[]}use(e,i,a){return this.handlers.push({fulfilled:e,rejected:i,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){ee.forEach(this.handlers,function(a){a!==null&&e(a)})}}const iy={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Bj=typeof URLSearchParams<"u"?URLSearchParams:ny,Vj=typeof FormData<"u"?FormData:null,Fj=typeof Blob<"u"?Blob:null,Hj={isBrowser:!0,classes:{URLSearchParams:Bj,FormData:Vj,Blob:Fj},protocols:["http","https","file","blob","url","data"]},ry=typeof window<"u"&&typeof document<"u",j0=typeof navigator=="object"&&navigator||void 0,$j=ry&&(!j0||["ReactNative","NativeScript","NS"].indexOf(j0.product)<0),qj=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",Yj=ry&&window.location.href||"http://localhost",Gj=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ry,hasStandardBrowserEnv:$j,hasStandardBrowserWebWorkerEnv:qj,navigator:j0,origin:Yj},Symbol.toStringTag,{value:"Module"})),Mn={...Gj,...Hj};function Xj(t,e){return zf(t,new Mn.classes.URLSearchParams,{visitor:function(i,a,s,l){return Mn.isNode&&ee.isBuffer(i)?(this.append(a,i.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)},...e})}function Kj(t){return ee.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function Zj(t){const e={},i=Object.keys(t);let a;const s=i.length;let l;for(a=0;a<s;a++)l=i[a],e[l]=t[l];return e}function i3(t){function e(i,a,s,l){let c=i[l++];if(c==="__proto__")return!0;const d=Number.isFinite(+c),f=l>=i.length;return c=!c&&ee.isArray(s)?s.length:c,f?(ee.hasOwnProp(s,c)?s[c]=[s[c],a]:s[c]=a,!d):((!s[c]||!ee.isObject(s[c]))&&(s[c]=[]),e(i,a,s[c],l)&&ee.isArray(s[c])&&(s[c]=Zj(s[c])),!d)}if(ee.isFormData(t)&&ee.isFunction(t.entries)){const i={};return ee.forEachEntry(t,(a,s)=>{e(Kj(a),s,i,0)}),i}return null}function Qj(t,e,i){if(ee.isString(t))try{return(e||JSON.parse)(t),ee.trim(t)}catch(a){if(a.name!=="SyntaxError")throw a}return(i||JSON.stringify)(t)}const Vc={transitional:iy,adapter:["xhr","http","fetch"],transformRequest:[function(e,i){const a=i.getContentType()||"",s=a.indexOf("application/json")>-1,l=ee.isObject(e);if(l&&ee.isHTMLForm(e)&&(e=new FormData(e)),ee.isFormData(e))return s?JSON.stringify(i3(e)):e;if(ee.isArrayBuffer(e)||ee.isBuffer(e)||ee.isStream(e)||ee.isFile(e)||ee.isBlob(e)||ee.isReadableStream(e))return e;if(ee.isArrayBufferView(e))return e.buffer;if(ee.isURLSearchParams(e))return i.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let d;if(l){if(a.indexOf("application/x-www-form-urlencoded")>-1)return Xj(e,this.formSerializer).toString();if((d=ee.isFileList(e))||a.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return zf(d?{"files[]":e}:e,f&&new f,this.formSerializer)}}return l||s?(i.setContentType("application/json",!1),Qj(e)):e}],transformResponse:[function(e){const i=this.transitional||Vc.transitional,a=i&&i.forcedJSONParsing,s=this.responseType==="json";if(ee.isResponse(e)||ee.isReadableStream(e))return e;if(e&&ee.isString(e)&&(a&&!this.responseType||s)){const c=!(i&&i.silentJSONParsing)&&s;try{return JSON.parse(e,this.parseReviver)}catch(d){if(c)throw d.name==="SyntaxError"?Ne.from(d,Ne.ERR_BAD_RESPONSE,this,null,this.response):d}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Mn.classes.FormData,Blob:Mn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};ee.forEach(["delete","get","head","post","put","patch"],t=>{Vc.headers[t]={}});const Wj=ee.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Jj=t=>{const e={};let i,a,s;return t&&t.split(`
`).forEach(function(c){s=c.indexOf(":"),i=c.substring(0,s).trim().toLowerCase(),a=c.substring(s+1).trim(),!(!i||e[i]&&Wj[i])&&(i==="set-cookie"?e[i]?e[i].push(a):e[i]=[a]:e[i]=e[i]?e[i]+", "+a:a)}),e},Sw=Symbol("internals"),eN=t=>!/[\r\n]/.test(t);function r3(t,e){if(!(t===!1||t==null)){if(ee.isArray(t)){t.forEach(i=>r3(i,e));return}if(!eN(String(t)))throw new Error(`Invalid character in header content ["${e}"]`)}}function Hl(t){return t&&String(t).trim().toLowerCase()}function tN(t){let e=t.length;for(;e>0;){const i=t.charCodeAt(e-1);if(i!==10&&i!==13)break;e-=1}return e===t.length?t:t.slice(0,e)}function Fd(t){return t===!1||t==null?t:ee.isArray(t)?t.map(Fd):tN(String(t))}function nN(t){const e=Object.create(null),i=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let a;for(;a=i.exec(t);)e[a[1]]=a[2];return e}const iN=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function km(t,e,i,a,s){if(ee.isFunction(a))return a.call(this,e,i);if(s&&(e=i),!!ee.isString(e)){if(ee.isString(a))return e.indexOf(a)!==-1;if(ee.isRegExp(a))return a.test(e)}}function rN(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,i,a)=>i.toUpperCase()+a)}function aN(t,e){const i=ee.toCamelCase(" "+e);["get","set","has"].forEach(a=>{Object.defineProperty(t,a+i,{value:function(s,l,c){return this[a].call(this,e,s,l,c)},configurable:!0})})}let Wn=class{constructor(e){e&&this.set(e)}set(e,i,a){const s=this;function l(d,f,h){const m=Hl(f);if(!m)throw new Error("header name must be a non-empty string");const g=ee.findKey(s,m);(!g||s[g]===void 0||h===!0||h===void 0&&s[g]!==!1)&&(r3(d,f),s[g||f]=Fd(d))}const c=(d,f)=>ee.forEach(d,(h,m)=>l(h,m,f));if(ee.isPlainObject(e)||e instanceof this.constructor)c(e,i);else if(ee.isString(e)&&(e=e.trim())&&!iN(e))c(Jj(e),i);else if(ee.isObject(e)&&ee.isIterable(e)){let d={},f,h;for(const m of e){if(!ee.isArray(m))throw TypeError("Object iterator must return a key-value pair");d[h=m[0]]=(f=d[h])?ee.isArray(f)?[...f,m[1]]:[f,m[1]]:m[1]}c(d,i)}else e!=null&&l(i,e,a);return this}get(e,i){if(e=Hl(e),e){const a=ee.findKey(this,e);if(a){const s=this[a];if(!i)return s;if(i===!0)return nN(s);if(ee.isFunction(i))return i.call(this,s,a);if(ee.isRegExp(i))return i.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,i){if(e=Hl(e),e){const a=ee.findKey(this,e);return!!(a&&this[a]!==void 0&&(!i||km(this,this[a],a,i)))}return!1}delete(e,i){const a=this;let s=!1;function l(c){if(c=Hl(c),c){const d=ee.findKey(a,c);d&&(!i||km(a,a[d],d,i))&&(delete a[d],s=!0)}}return ee.isArray(e)?e.forEach(l):l(e),s}clear(e){const i=Object.keys(this);let a=i.length,s=!1;for(;a--;){const l=i[a];(!e||km(this,this[l],l,e,!0))&&(delete this[l],s=!0)}return s}normalize(e){const i=this,a={};return ee.forEach(this,(s,l)=>{const c=ee.findKey(a,l);if(c){i[c]=Fd(s),delete i[l];return}const d=e?rN(l):String(l).trim();d!==l&&delete i[l],i[d]=Fd(s),a[d]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const i=Object.create(null);return ee.forEach(this,(a,s)=>{a!=null&&a!==!1&&(i[s]=e&&ee.isArray(a)?a.join(", "):a)}),i}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,i])=>e+": "+i).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...i){const a=new this(e);return i.forEach(s=>a.set(s)),a}static accessor(e){const a=(this[Sw]=this[Sw]={accessors:{}}).accessors,s=this.prototype;function l(c){const d=Hl(c);a[d]||(aN(s,c),a[d]=!0)}return ee.isArray(e)?e.forEach(l):l(e),this}};Wn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);ee.reduceDescriptors(Wn.prototype,({value:t},e)=>{let i=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(a){this[i]=a}}});ee.freezeMethods(Wn);function Am(t,e){const i=this||Vc,a=e||i,s=Wn.from(a.headers);let l=a.data;return ee.forEach(t,function(d){l=d.call(i,l,s.normalize(),e?e.status:void 0)}),s.normalize(),l}function a3(t){return!!(t&&t.__CANCEL__)}let Fc=class extends Ne{constructor(e,i,a){super(e??"canceled",Ne.ERR_CANCELED,i,a),this.name="CanceledError",this.__CANCEL__=!0}};function s3(t,e,i){const a=i.config.validateStatus;!i.status||!a||a(i.status)?t(i):e(new Ne("Request failed with status code "+i.status,[Ne.ERR_BAD_REQUEST,Ne.ERR_BAD_RESPONSE][Math.floor(i.status/100)-4],i.config,i.request,i))}function sN(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function oN(t,e){t=t||10;const i=new Array(t),a=new Array(t);let s=0,l=0,c;return e=e!==void 0?e:1e3,function(f){const h=Date.now(),m=a[l];c||(c=h),i[s]=f,a[s]=h;let g=l,x=0;for(;g!==s;)x+=i[g++],g=g%t;if(s=(s+1)%t,s===l&&(l=(l+1)%t),h-c<e)return;const _=m&&h-m;return _?Math.round(x*1e3/_):void 0}}function lN(t,e){let i=0,a=1e3/e,s,l;const c=(h,m=Date.now())=>{i=m,s=null,l&&(clearTimeout(l),l=null),t(...h)};return[(...h)=>{const m=Date.now(),g=m-i;g>=a?c(h,m):(s=h,l||(l=setTimeout(()=>{l=null,c(s)},a-g)))},()=>s&&c(s)]}const of=(t,e,i=3)=>{let a=0;const s=oN(50,250);return lN(l=>{const c=l.loaded,d=l.lengthComputable?l.total:void 0,f=c-a,h=s(f),m=c<=d;a=c;const g={loaded:c,total:d,progress:d?c/d:void 0,bytes:f,rate:h||void 0,estimated:h&&d&&m?(d-c)/h:void 0,event:l,lengthComputable:d!=null,[e?"download":"upload"]:!0};t(g)},i)},_w=(t,e)=>{const i=t!=null;return[a=>e[0]({lengthComputable:i,total:t,loaded:a}),e[1]]},Tw=t=>(...e)=>ee.asap(()=>t(...e)),cN=Mn.hasStandardBrowserEnv?((t,e)=>i=>(i=new URL(i,Mn.origin),t.protocol===i.protocol&&t.host===i.host&&(e||t.port===i.port)))(new URL(Mn.origin),Mn.navigator&&/(msie|trident)/i.test(Mn.navigator.userAgent)):()=>!0,uN=Mn.hasStandardBrowserEnv?{write(t,e,i,a,s,l,c){if(typeof document>"u")return;const d=[`${t}=${encodeURIComponent(e)}`];ee.isNumber(i)&&d.push(`expires=${new Date(i).toUTCString()}`),ee.isString(a)&&d.push(`path=${a}`),ee.isString(s)&&d.push(`domain=${s}`),l===!0&&d.push("secure"),ee.isString(c)&&d.push(`SameSite=${c}`),document.cookie=d.join("; ")},read(t){if(typeof document>"u")return null;const e=document.cookie.match(new RegExp("(?:^|; )"+t+"=([^;]*)"));return e?decodeURIComponent(e[1]):null},remove(t){this.write(t,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function dN(t){return typeof t!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function fN(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function o3(t,e,i){let a=!dN(e);return t&&(a||i==!1)?fN(t,e):e}const Ew=t=>t instanceof Wn?{...t}:t;function Es(t,e){e=e||{};const i={};function a(h,m,g,x){return ee.isPlainObject(h)&&ee.isPlainObject(m)?ee.merge.call({caseless:x},h,m):ee.isPlainObject(m)?ee.merge({},m):ee.isArray(m)?m.slice():m}function s(h,m,g,x){if(ee.isUndefined(m)){if(!ee.isUndefined(h))return a(void 0,h,g,x)}else return a(h,m,g,x)}function l(h,m){if(!ee.isUndefined(m))return a(void 0,m)}function c(h,m){if(ee.isUndefined(m)){if(!ee.isUndefined(h))return a(void 0,h)}else return a(void 0,m)}function d(h,m,g){if(g in e)return a(h,m);if(g in t)return a(void 0,h)}const f={url:l,method:l,data:l,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutMessage:c,withCredentials:c,withXSRFToken:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,beforeRedirect:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,responseEncoding:c,validateStatus:d,headers:(h,m,g)=>s(Ew(h),Ew(m),g,!0)};return ee.forEach(Object.keys({...t,...e}),function(m){if(m==="__proto__"||m==="constructor"||m==="prototype")return;const g=ee.hasOwnProp(f,m)?f[m]:s,x=g(t[m],e[m],m);ee.isUndefined(x)&&g!==d||(i[m]=x)}),i}const l3=t=>{const e=Es({},t);let{data:i,withXSRFToken:a,xsrfHeaderName:s,xsrfCookieName:l,headers:c,auth:d}=e;if(e.headers=c=Wn.from(c),e.url=n3(o3(e.baseURL,e.url,e.allowAbsoluteUrls),t.params,t.paramsSerializer),d&&c.set("Authorization","Basic "+btoa((d.username||"")+":"+(d.password?unescape(encodeURIComponent(d.password)):""))),ee.isFormData(i)){if(Mn.hasStandardBrowserEnv||Mn.hasStandardBrowserWebWorkerEnv)c.setContentType(void 0);else if(ee.isFunction(i.getHeaders)){const f=i.getHeaders(),h=["content-type","content-length"];Object.entries(f).forEach(([m,g])=>{h.includes(m.toLowerCase())&&c.set(m,g)})}}if(Mn.hasStandardBrowserEnv&&(a&&ee.isFunction(a)&&(a=a(e)),a||a!==!1&&cN(e.url))){const f=s&&l&&uN.read(l);f&&c.set(s,f)}return e},hN=typeof XMLHttpRequest<"u",pN=hN&&function(t){return new Promise(function(i,a){const s=l3(t);let l=s.data;const c=Wn.from(s.headers).normalize();let{responseType:d,onUploadProgress:f,onDownloadProgress:h}=s,m,g,x,_,w;function v(){_&&_(),w&&w(),s.cancelToken&&s.cancelToken.unsubscribe(m),s.signal&&s.signal.removeEventListener("abort",m)}let S=new XMLHttpRequest;S.open(s.method.toUpperCase(),s.url,!0),S.timeout=s.timeout;function C(){if(!S)return;const R=Wn.from("getAllResponseHeaders"in S&&S.getAllResponseHeaders()),O={data:!d||d==="text"||d==="json"?S.responseText:S.response,status:S.status,statusText:S.statusText,headers:R,config:t,request:S};s3(function(k){i(k),v()},function(k){a(k),v()},O),S=null}"onloadend"in S?S.onloadend=C:S.onreadystatechange=function(){!S||S.readyState!==4||S.status===0&&!(S.responseURL&&S.responseURL.indexOf("file:")===0)||setTimeout(C)},S.onabort=function(){S&&(a(new Ne("Request aborted",Ne.ECONNABORTED,t,S)),S=null)},S.onerror=function(L){const O=L&&L.message?L.message:"Network Error",j=new Ne(O,Ne.ERR_NETWORK,t,S);j.event=L||null,a(j),S=null},S.ontimeout=function(){let L=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const O=s.transitional||iy;s.timeoutErrorMessage&&(L=s.timeoutErrorMessage),a(new Ne(L,O.clarifyTimeoutError?Ne.ETIMEDOUT:Ne.ECONNABORTED,t,S)),S=null},l===void 0&&c.setContentType(null),"setRequestHeader"in S&&ee.forEach(c.toJSON(),function(L,O){S.setRequestHeader(O,L)}),ee.isUndefined(s.withCredentials)||(S.withCredentials=!!s.withCredentials),d&&d!=="json"&&(S.responseType=s.responseType),h&&([x,w]=of(h,!0),S.addEventListener("progress",x)),f&&S.upload&&([g,_]=of(f),S.upload.addEventListener("progress",g),S.upload.addEventListener("loadend",_)),(s.cancelToken||s.signal)&&(m=R=>{S&&(a(!R||R.type?new Fc(null,t,S):R),S.abort(),S=null)},s.cancelToken&&s.cancelToken.subscribe(m),s.signal&&(s.signal.aborted?m():s.signal.addEventListener("abort",m)));const M=sN(s.url);if(M&&Mn.protocols.indexOf(M)===-1){a(new Ne("Unsupported protocol "+M+":",Ne.ERR_BAD_REQUEST,t));return}S.send(l||null)})},mN=(t,e)=>{const{length:i}=t=t?t.filter(Boolean):[];if(e||i){let a=new AbortController,s;const l=function(h){if(!s){s=!0,d();const m=h instanceof Error?h:this.reason;a.abort(m instanceof Ne?m:new Fc(m instanceof Error?m.message:m))}};let c=e&&setTimeout(()=>{c=null,l(new Ne(`timeout of ${e}ms exceeded`,Ne.ETIMEDOUT))},e);const d=()=>{t&&(c&&clearTimeout(c),c=null,t.forEach(h=>{h.unsubscribe?h.unsubscribe(l):h.removeEventListener("abort",l)}),t=null)};t.forEach(h=>h.addEventListener("abort",l));const{signal:f}=a;return f.unsubscribe=()=>ee.asap(d),f}},gN=function*(t,e){let i=t.byteLength;if(i<e){yield t;return}let a=0,s;for(;a<i;)s=a+e,yield t.slice(a,s),a=s},yN=async function*(t,e){for await(const i of xN(t))yield*gN(i,e)},xN=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:i,value:a}=await e.read();if(i)break;yield a}}finally{await e.cancel()}},Cw=(t,e,i,a)=>{const s=yN(t,e);let l=0,c,d=f=>{c||(c=!0,a&&a(f))};return new ReadableStream({async pull(f){try{const{done:h,value:m}=await s.next();if(h){d(),f.close();return}let g=m.byteLength;if(i){let x=l+=g;i(x)}f.enqueue(new Uint8Array(m))}catch(h){throw d(h),h}},cancel(f){return d(f),s.return()}},{highWaterMark:2})},kw=64*1024,{isFunction:dd}=ee,bN=(({Request:t,Response:e})=>({Request:t,Response:e}))(ee.global),{ReadableStream:Aw,TextEncoder:Rw}=ee.global,Dw=(t,...e)=>{try{return!!t(...e)}catch{return!1}},vN=t=>{t=ee.merge.call({skipUndefined:!0},bN,t);const{fetch:e,Request:i,Response:a}=t,s=e?dd(e):typeof fetch=="function",l=dd(i),c=dd(a);if(!s)return!1;const d=s&&dd(Aw),f=s&&(typeof Rw=="function"?(w=>v=>w.encode(v))(new Rw):async w=>new Uint8Array(await new i(w).arrayBuffer())),h=l&&d&&Dw(()=>{let w=!1;const v=new Aw,S=new i(Mn.origin,{body:v,method:"POST",get duplex(){return w=!0,"half"}}).headers.has("Content-Type");return v.cancel(),w&&!S}),m=c&&d&&Dw(()=>ee.isReadableStream(new a("").body)),g={stream:m&&(w=>w.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(w=>{!g[w]&&(g[w]=(v,S)=>{let C=v&&v[w];if(C)return C.call(v);throw new Ne(`Response type '${w}' is not supported`,Ne.ERR_NOT_SUPPORT,S)})});const x=async w=>{if(w==null)return 0;if(ee.isBlob(w))return w.size;if(ee.isSpecCompliantForm(w))return(await new i(Mn.origin,{method:"POST",body:w}).arrayBuffer()).byteLength;if(ee.isArrayBufferView(w)||ee.isArrayBuffer(w))return w.byteLength;if(ee.isURLSearchParams(w)&&(w=w+""),ee.isString(w))return(await f(w)).byteLength},_=async(w,v)=>{const S=ee.toFiniteNumber(w.getContentLength());return S??x(v)};return async w=>{let{url:v,method:S,data:C,signal:M,cancelToken:R,timeout:L,onDownloadProgress:O,onUploadProgress:j,responseType:k,headers:U,withCredentials:I="same-origin",fetchOptions:Y}=l3(w),W=e||fetch;k=k?(k+"").toLowerCase():"text";let te=mN([M,R&&R.toAbortSignal()],L),me=null;const we=te&&te.unsubscribe&&(()=>{te.unsubscribe()});let Se;try{if(j&&h&&S!=="get"&&S!=="head"&&(Se=await _(U,C))!==0){let P=new i(v,{method:"POST",body:C,duplex:"half"}),q;if(ee.isFormData(C)&&(q=P.headers.get("content-type"))&&U.setContentType(q),P.body){const[G,ne]=_w(Se,of(Tw(j)));C=Cw(P.body,kw,G,ne)}}ee.isString(I)||(I=I?"include":"omit");const z=l&&"credentials"in i.prototype,B={...Y,signal:te,method:S.toUpperCase(),headers:U.normalize().toJSON(),body:C,duplex:"half",credentials:z?I:void 0};me=l&&new i(v,B);let $=await(l?W(me,Y):W(v,B));const se=m&&(k==="stream"||k==="response");if(m&&(O||se&&we)){const P={};["status","statusText","headers"].forEach(ye=>{P[ye]=$[ye]});const q=ee.toFiniteNumber($.headers.get("content-length")),[G,ne]=O&&_w(q,of(Tw(O),!0))||[];$=new a(Cw($.body,kw,G,()=>{ne&&ne(),we&&we()}),P)}k=k||"text";let ce=await g[ee.findKey(g,k)||"text"]($,w);return!se&&we&&we(),await new Promise((P,q)=>{s3(P,q,{data:ce,headers:Wn.from($.headers),status:$.status,statusText:$.statusText,config:w,request:me})})}catch(z){throw we&&we(),z&&z.name==="TypeError"&&/Load failed|fetch/i.test(z.message)?Object.assign(new Ne("Network Error",Ne.ERR_NETWORK,w,me,z&&z.response),{cause:z.cause||z}):Ne.from(z,z&&z.code,w,me,z&&z.response)}}},wN=new Map,c3=t=>{let e=t&&t.env||{};const{fetch:i,Request:a,Response:s}=e,l=[a,s,i];let c=l.length,d=c,f,h,m=wN;for(;d--;)f=l[d],h=m.get(f),h===void 0&&m.set(f,h=d?new Map:vN(e)),m=h;return h};c3();const ay={http:zj,xhr:pN,fetch:{get:c3}};ee.forEach(ay,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const Ow=t=>`- ${t}`,SN=t=>ee.isFunction(t)||t===null||t===!1;function _N(t,e){t=ee.isArray(t)?t:[t];const{length:i}=t;let a,s;const l={};for(let c=0;c<i;c++){a=t[c];let d;if(s=a,!SN(a)&&(s=ay[(d=String(a)).toLowerCase()],s===void 0))throw new Ne(`Unknown adapter '${d}'`);if(s&&(ee.isFunction(s)||(s=s.get(e))))break;l[d||"#"+c]=s}if(!s){const c=Object.entries(l).map(([f,h])=>`adapter ${f} `+(h===!1?"is not supported by the environment":"is not available in the build"));let d=i?c.length>1?`since :
`+c.map(Ow).join(`
`):" "+Ow(c[0]):"as no adapter specified";throw new Ne("There is no suitable adapter to dispatch the request "+d,"ERR_NOT_SUPPORT")}return s}const u3={getAdapter:_N,adapters:ay};function Rm(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Fc(null,t)}function Mw(t){return Rm(t),t.headers=Wn.from(t.headers),t.data=Am.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),u3.getAdapter(t.adapter||Vc.adapter,t)(t).then(function(a){return Rm(t),a.data=Am.call(t,t.transformResponse,a),a.headers=Wn.from(a.headers),a},function(a){return a3(a)||(Rm(t),a&&a.response&&(a.response.data=Am.call(t,t.transformResponse,a.response),a.response.headers=Wn.from(a.response.headers))),Promise.reject(a)})}const d3="1.15.0",Pf={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Pf[t]=function(a){return typeof a===t||"a"+(e<1?"n ":" ")+t}});const Lw={};Pf.transitional=function(e,i,a){function s(l,c){return"[Axios v"+d3+"] Transitional option '"+l+"'"+c+(a?". "+a:"")}return(l,c,d)=>{if(e===!1)throw new Ne(s(c," has been removed"+(i?" in "+i:"")),Ne.ERR_DEPRECATED);return i&&!Lw[c]&&(Lw[c]=!0,console.warn(s(c," has been deprecated since v"+i+" and will be removed in the near future"))),e?e(l,c,d):!0}};Pf.spelling=function(e){return(i,a)=>(console.warn(`${a} is likely a misspelling of ${e}`),!0)};function TN(t,e,i){if(typeof t!="object")throw new Ne("options must be an object",Ne.ERR_BAD_OPTION_VALUE);const a=Object.keys(t);let s=a.length;for(;s-- >0;){const l=a[s],c=e[l];if(c){const d=t[l],f=d===void 0||c(d,l,t);if(f!==!0)throw new Ne("option "+l+" must be "+f,Ne.ERR_BAD_OPTION_VALUE);continue}if(i!==!0)throw new Ne("Unknown option "+l,Ne.ERR_BAD_OPTION)}}const Hd={assertOptions:TN,validators:Pf},Bi=Hd.validators;let vs=class{constructor(e){this.defaults=e||{},this.interceptors={request:new ww,response:new ww}}async request(e,i){try{return await this._request(e,i)}catch(a){if(a instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const l=(()=>{if(!s.stack)return"";const c=s.stack.indexOf(`
`);return c===-1?"":s.stack.slice(c+1)})();try{if(!a.stack)a.stack=l;else if(l){const c=l.indexOf(`
`),d=c===-1?-1:l.indexOf(`
`,c+1),f=d===-1?"":l.slice(d+1);String(a.stack).endsWith(f)||(a.stack+=`
`+l)}}catch{}}throw a}}_request(e,i){typeof e=="string"?(i=i||{},i.url=e):i=e||{},i=Es(this.defaults,i);const{transitional:a,paramsSerializer:s,headers:l}=i;a!==void 0&&Hd.assertOptions(a,{silentJSONParsing:Bi.transitional(Bi.boolean),forcedJSONParsing:Bi.transitional(Bi.boolean),clarifyTimeoutError:Bi.transitional(Bi.boolean),legacyInterceptorReqResOrdering:Bi.transitional(Bi.boolean)},!1),s!=null&&(ee.isFunction(s)?i.paramsSerializer={serialize:s}:Hd.assertOptions(s,{encode:Bi.function,serialize:Bi.function},!0)),i.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?i.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:i.allowAbsoluteUrls=!0),Hd.assertOptions(i,{baseUrl:Bi.spelling("baseURL"),withXsrfToken:Bi.spelling("withXSRFToken")},!0),i.method=(i.method||this.defaults.method||"get").toLowerCase();let c=l&&ee.merge(l.common,l[i.method]);l&&ee.forEach(["delete","get","head","post","put","patch","common"],w=>{delete l[w]}),i.headers=Wn.concat(c,l);const d=[];let f=!0;this.interceptors.request.forEach(function(v){if(typeof v.runWhen=="function"&&v.runWhen(i)===!1)return;f=f&&v.synchronous;const S=i.transitional||iy;S&&S.legacyInterceptorReqResOrdering?d.unshift(v.fulfilled,v.rejected):d.push(v.fulfilled,v.rejected)});const h=[];this.interceptors.response.forEach(function(v){h.push(v.fulfilled,v.rejected)});let m,g=0,x;if(!f){const w=[Mw.bind(this),void 0];for(w.unshift(...d),w.push(...h),x=w.length,m=Promise.resolve(i);g<x;)m=m.then(w[g++],w[g++]);return m}x=d.length;let _=i;for(;g<x;){const w=d[g++],v=d[g++];try{_=w(_)}catch(S){v.call(this,S);break}}try{m=Mw.call(this,_)}catch(w){return Promise.reject(w)}for(g=0,x=h.length;g<x;)m=m.then(h[g++],h[g++]);return m}getUri(e){e=Es(this.defaults,e);const i=o3(e.baseURL,e.url,e.allowAbsoluteUrls);return n3(i,e.params,e.paramsSerializer)}};ee.forEach(["delete","get","head","options"],function(e){vs.prototype[e]=function(i,a){return this.request(Es(a||{},{method:e,url:i,data:(a||{}).data}))}});ee.forEach(["post","put","patch"],function(e){function i(a){return function(l,c,d){return this.request(Es(d||{},{method:e,headers:a?{"Content-Type":"multipart/form-data"}:{},url:l,data:c}))}}vs.prototype[e]=i(),vs.prototype[e+"Form"]=i(!0)});let EN=class f3{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let i;this.promise=new Promise(function(l){i=l});const a=this;this.promise.then(s=>{if(!a._listeners)return;let l=a._listeners.length;for(;l-- >0;)a._listeners[l](s);a._listeners=null}),this.promise.then=s=>{let l;const c=new Promise(d=>{a.subscribe(d),l=d}).then(s);return c.cancel=function(){a.unsubscribe(l)},c},e(function(l,c,d){a.reason||(a.reason=new Fc(l,c,d),i(a.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const i=this._listeners.indexOf(e);i!==-1&&this._listeners.splice(i,1)}toAbortSignal(){const e=new AbortController,i=a=>{e.abort(a)};return this.subscribe(i),e.signal.unsubscribe=()=>this.unsubscribe(i),e.signal}static source(){let e;return{token:new f3(function(s){e=s}),cancel:e}}};function CN(t){return function(i){return t.apply(null,i)}}function kN(t){return ee.isObject(t)&&t.isAxiosError===!0}const N0={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(N0).forEach(([t,e])=>{N0[e]=t});function h3(t){const e=new vs(t),i=qT(vs.prototype.request,e);return ee.extend(i,vs.prototype,e,{allOwnKeys:!0}),ee.extend(i,e,null,{allOwnKeys:!0}),i.create=function(s){return h3(Es(t,s))},i}const Xt=h3(Vc);Xt.Axios=vs;Xt.CanceledError=Fc;Xt.CancelToken=EN;Xt.isCancel=a3;Xt.VERSION=d3;Xt.toFormData=zf;Xt.AxiosError=Ne;Xt.Cancel=Xt.CanceledError;Xt.all=function(e){return Promise.all(e)};Xt.spread=CN;Xt.isAxiosError=kN;Xt.mergeConfig=Es;Xt.AxiosHeaders=Wn;Xt.formToJSON=t=>i3(ee.isHTMLForm(t)?new FormData(t):t);Xt.getAdapter=u3.getAdapter;Xt.HttpStatusCode=N0;Xt.default=Xt;const{Axios:WH,AxiosError:$d,CanceledError:JH,isCancel:e$,CancelToken:t$,VERSION:n$,all:i$,Cancel:r$,isAxiosError:a$,spread:s$,toFormData:o$,AxiosHeaders:l$,HttpStatusCode:c$,formToJSON:u$,getAdapter:d$,mergeConfig:f$}=Xt,lf="/demos/fashion/img/girl.png",Cs=[{productId:"demo-001",productImageUrl:lf,productBrand:"ON-WEAR",productName:"오버핏 코튼 티셔츠",productPrice:39e3,productUrl:"https://example.com",styleList:["캐주얼","미니멀"],liked:!1,isLiked:!1},{productId:"demo-002",productImageUrl:"/demos/fashion/img/tyler.avif",productBrand:"Studio Nine",productName:"릴렉스 핏 데님 팬츠",productPrice:89e3,productUrl:"https://example.com",styleList:["스트릿","데님"],liked:!0,isLiked:!0},{productId:"demo-003",productImageUrl:"/demos/fashion/img/izy.avif",productBrand:"Mono Lane",productName:"울 블렌드 니트",productPrice:72e3,productUrl:"https://example.com",styleList:["클래식"],liked:!1,isLiked:!1},{productId:"demo-004",productImageUrl:"/demos/fashion/img/kanye1.avif",productBrand:"Urban Fit",productName:"윈드브레이커 재킷",productPrice:128e3,productUrl:"https://example.com",styleList:["아웃도어"],liked:!1,isLiked:!1},{productId:"demo-005",productImageUrl:lf,productBrand:"Soft Line",productName:"맨투맨 스웻셔츠",productPrice:55e3,productUrl:"https://example.com",styleList:["캐주얼"],liked:!1,isLiked:!1},{productId:"demo-006",productImageUrl:"/demos/fashion/img/gptmodel.png",productBrand:"Demo Lab",productName:"테크 플리스 후디",productPrice:99e3,productUrl:"https://example.com",styleList:["스트릿","기능성"],liked:!1,isLiked:!1}];function jw(t){return Cs.find(e=>e.productId===t)??Cs[0]}const AN=[{mannequinId:1,mannequinImageUrl:"default_mannequin_image"},{mannequinId:2,mannequinImageUrl:"default_mannequin_image"},{mannequinId:3,mannequinImageUrl:"default_mannequin_image"},{mannequinId:4,mannequinImageUrl:"default_mannequin_image"}],RN=[{productId:"demo-002",productImageUrl:"/demos/fashion/img/tyler.avif",productCategory:"upperShortSleeve"},{productId:"demo-003",productImageUrl:"/demos/fashion/img/izy.avif",productCategory:"lowerDenim"}],DN=[{coordinationId:1,upperImageUrl:"/demos/fashion/img/izy.avif",lowerImageUrl:"/demos/fashion/img/tyler.avif",upperId:"demo-003",lowerId:"demo-002"}],ON=["니트","데님","후디"],MN=["맨투맨","코트","청바지","스니커즈","가디건"];function LN(t,e,i){const a=e*i;return{slice:t.slice(a,a+i),total:t.length,last:a+i>=t.length}}function jN(t,e){const i=[...Cs],{slice:a,total:s,last:l}=LN(i,t,e),c=Math.max(1,Math.ceil(s/e));return{content:a,last:l,totalPages:c,totalElements:s,first:t===0,number:t,size:e,numberOfElements:a.length,empty:a.length===0}}function Nw(t,e){const i=jN(t,e);return{popularClothes:{content:i.content.map(a=>({...a,styleList:[...a.styleList]})),pageable:{sort:{sorted:!1,unsorted:!0,empty:!0},offset:t*e,pageNumber:t,pageSize:e,paged:!0,unpaged:!1},last:i.last,totalPages:i.totalPages,totalElements:i.totalElements,size:i.size,number:i.number,sort:{sorted:!1,unsorted:!0,empty:!0},first:i.first,numberOfElements:i.numberOfElements,empty:i.empty}}}const fd=Cs.map((t,e)=>({productId:t.productId,similarityScore:.85+e*.02,productName:t.productName,productBrand:t.productBrand,productPrice:t.productPrice,productImageUrl:t.productImageUrl,productUrl:t.productUrl,styleList:[...t.styleList],liked:t.liked})),NN={upper:Cs.slice(0,3).map(t=>({id:t.productId,name:t.productName,brand:t.productBrand,price:t.productPrice,thumbnail:t.productImageUrl})),lower:Cs.slice(3,6).map(t=>({id:t.productId,name:t.productName,brand:t.productBrand,price:t.productPrice,thumbnail:t.productImageUrl}))};function zN(t,e){const i=(t??"").replace(/\/+$/,""),a=e??"";if(a.startsWith("http"))return a;const s=a.startsWith("/")?a:`/${a}`;return`${i}${s}`}function PN(t){const e=zN(t.baseURL,t.url);try{return new URL(e)}catch{return new URL("http://mock.local/")}}function Dt(t,e,i=200){return{data:e,status:i,statusText:"OK",headers:{},config:t,request:{}}}const UN=(t,e)=>({success:!1,code:-10605,message:"검색어에 일치하는 상품이 없습니다.",data:{content:[],totalElements:0,totalPages:0,size:e,number:t,first:!0,last:!0,numberOfElements:0,empty:!0}});function IN(t,e){const i=(t.method??"get").toUpperCase(),{pathname:a,searchParams:s}=PN(t);if(e==="runpod")return a.includes("/products/image-search")&&i==="POST"?Promise.resolve(Dt(t,NN)):Promise.resolve(Dt(t,{success:!1,message:"runpod mock"},404));if(e==="fast"){if(a.includes("/user/save")&&i==="POST")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok"}));if(a.includes("/recommend")&&i==="GET"){const c=Number(s.get("page")??"0"),d=Number(s.get("size")??"10"),f=fd.slice(c*d,c*d+d);return Promise.resolve(Dt(t,{status:200,message:"ok",result:{recommended_products:f,styleTags:[["캐주얼",12],["스트릿",9]],pagination:{current_page:c,page_size:d,total_items:fd.length,total_pages:Math.ceil(fd.length/d),has_next:(c+1)*d<fd.length}}}))}if(a.includes("/products/rank")&&i==="GET"){const c=Number(s.get("page")??"0"),d=Number(s.get("size")??"10"),f=Nw(c,d).popularClothes;return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{popularClothes:f}}))}return Promise.resolve(Dt(t,{success:!1,code:404,message:"fast mock miss",data:null},404))}if(a.includes("/user/save")&&i==="POST")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok"}));if(a.includes("/products/rank")&&i==="GET"){const c=Number(s.get("page")??"0"),d=Number(s.get("size")??"30"),f=Nw(c,d).popularClothes;return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{popularClothes:f}}))}if(a.includes("/products/search")&&i==="GET"){const c=(s.get("keyword")??"").trim(),d=Number(s.get("page")??"0"),f=Number(s.get("size")??"20");if(!c||c==="없음")return Promise.resolve(Dt(t,UN(d,f)));const h=Cs.filter(x=>x.productName.includes(c)||x.productBrand.includes(c)||x.styleList.some(_=>_.includes(c))),m=d*f,g=h.slice(m,m+f).map(x=>({productId:x.productId,productImageUrl:x.productImageUrl,productBrand:x.productBrand,productName:x.productName,productPrice:x.productPrice,productUrl:x.productUrl,styleList:[...x.styleList],isLiked:x.isLiked}));return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{content:g,totalElements:h.length,totalPages:Math.max(1,Math.ceil(h.length/f)),size:f,number:d,first:d===0,last:m+f>=h.length,numberOfElements:g.length,empty:g.length===0}}))}if(a.includes("/search/history")&&i==="GET")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:[...ON]}));if(a.includes("/search/history")&&i==="DELETE")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:null}));if(a.includes("/search/rank")&&i==="GET")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:[...MN]}));if(a.includes("/products/likes/")&&i==="POST")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:null}));if(a.endsWith("/my/likes")&&i==="GET"){const c=RN.map(d=>{const f=jw(d.productId);return{productId:d.productId,productName:f.productName,productBrand:f.productBrand,productPrice:f.productPrice,productImageUrl:d.productImageUrl,productUrl:f.productUrl,styleList:[...f.styleList],productCategory:d.productCategory}});return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:c}))}if(a.endsWith("/my/coordination")&&i==="GET")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:[...DN]}));if(a.endsWith("/my/coordination")&&i==="POST")return Promise.resolve(Dt(t,{success:!0,code:201,message:"saved"}));if(a.match(/\/my\/coordination\/\d+/)&&i==="DELETE")return Promise.resolve(Dt(t,{success:!0,message:"deleted"}));if(a.endsWith("/my/mannequins")&&i==="GET")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:[...AN]}));if(a.match(/\/my\/mannequins\/\d+$/)&&i==="PUT"&&!a.includes("/delete/")){const c=a.match(/\/my\/mannequins\/(\d+)$/)?.[1]??"1";return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{mannequinId:Number(c),mannequinImageUrl:lf}}))}if(a.match(/\/my\/mannequins\/delete\/\d+/)&&i==="PUT")return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{defaultMannequinImageUrl:"default_mannequin_image"}}));if(a.includes("/my/try-on")&&i==="POST")return Promise.resolve(Dt(t,{UnionImageUrl:lf}));const l=a.match(/\/products\/detail\/([^/]+)$/);if(l&&i==="GET"){const c=jw(l[1]);return Promise.resolve(Dt(t,{success:!0,code:200,message:"ok",data:{productId:c.productId,productImageUrl:c.productImageUrl,productBrand:c.productBrand,productName:c.productName,productPrice:c.productPrice,productUrl:c.productUrl,styleList:[...c.styleList],isLiked:c.isLiked}}))}return a.includes("/auth/logout")&&i==="POST"?Promise.resolve(Dt(t,{success:!0,code:200,message:"ok"})):(console.warn("[fashion demo mock] unhandled",e,i,a),Promise.resolve(Dt(t,{success:!1,code:404,message:"mock: not found",data:null},404)))}function sy(t){const e=i=>IN(i,t);return Xt.create({adapter:e,baseURL:`http://fashion-mock.${t}/`,timeout:8e3,headers:{"Content-Type":"application/json"}})}const Bt=sy("main"),BN=()=>{GL(async()=>{const{useAuthStore:t}=await Promise.resolve().then(()=>$N);return{useAuthStore:t}},[],import.meta.url).then(({useAuthStore:t})=>{t.getState().login("demo-portfolio-token","demo",{memberId:1,memberEmail:"demo@onwear.local",memberName:"데모 사용자"})})},VN=async t=>{try{const i=(await Bt.post("/auth/logout",{},{headers:{Authorization:`Bearer ${t}`}})).data;return i.success?!0:(console.error("로그아웃 API 오류:",i.message),!1)}catch(e){return console.error("로그아웃 API 호출 실패:",e),!1}};function FN(t){try{const e=t.split(".")[1];if(!e)return null;const i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(l){return"%"+("00"+l.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return null}}function zw(t){const e=FN(t);if(!e)return null;const i=e.email||e.sub||"",a=e.name||e.given_name||(i?i.split("@")[0]:"User");return{email:i,name:a,id:e.sub||""}}const HN={show:!1,message:""},Yo=Mf()(t=>({...HN,showToast:e=>{t({show:!0,message:e})},hideToast:()=>{t({show:!1,message:""})}})),Pw={isLoggedIn:!1,accessToken:null,member:null,grantType:null},fn=Mf()($L((t,e)=>({...Pw,login:(i,a,s)=>{t({isLoggedIn:!0,accessToken:i,grantType:a,member:s})},logout:async()=>{const{accessToken:i}=e();if(i){try{await VN(i),sessionStorage.removeItem("user_actions")}catch(a){console.error("백엔드 로그아웃 API 호출 실패:",a)}Yo.getState().showToast("로그아웃 되었습니다")}t(Pw),localStorage.removeItem("auth-storage"),sessionStorage.setItem("toast_logout","1"),window.location.href="/demos/fashion/main"},setAuthFromRedirect:i=>{try{let a;if(i.startsWith("redirect://")){const m=i.replace("redirect://","http://");a=new URL(m)}else a=new URL(i);const s=new URLSearchParams(a.search),l=s.get("grantType"),c=s.get("accessToken"),d=s.get("memberId"),f=s.get("memberEmail"),h=s.get("memberName");if(l&&c){const m=zw(c),g={memberId:d?parseInt(d,10):0,memberEmail:f||m?.email||"user@example.com",memberName:h||m?.name||"User"};return e().login(c,l,g),!0}return!1}catch(a){return console.error("리다이렉트 URL 파싱 오류:",a),!1}},updateUserInfoFromToken:()=>{const{accessToken:i,member:a}=e();if(i&&a){const s=zw(i);if(s&&s.email){const l={...a,memberEmail:s.email,memberName:s.name};t(c=>({...c,member:l}))}}}}),{name:"auth-storage",partialize:t=>({isLoggedIn:t.isLoggedIn,accessToken:t.accessToken,member:t.member,grantType:t.grantType})})),$N=Object.freeze(Object.defineProperty({__proto__:null,useAuthStore:fn},Symbol.toStringTag,{value:"Module"}));function qN({onSearchClick:t}){const e=or(),i=Ri(),{isLoggedIn:a,logout:s}=fn(),{showToast:l}=Yo(),c=d=>{const f=i.pathname.toLowerCase(),h=d.replace(/^\//,"").toLowerCase();return h==="hotitems"?f.includes("/hotitems")||f.endsWith("/demos/fashion/main")||f.endsWith("/demos/fashion"):f.includes(`/${h}`)};return re("nav",{css:YN,children:[A("div",{css:GN,children:A(zL,{})}),re("div",{css:XN,children:[re("button",{css:[os,i.pathname.includes("/search")&&ho],onClick:t,children:[A(xD,{}),A("span",{className:"menu-text",children:"Search"})]}),re("button",{css:[os,c("/fittingroom")&&ho],onClick:()=>a?e("fittingroom"):l("로그인이 필요한 서비스입니다."),children:[A(cT,{}),A("span",{className:"menu-text",children:"Fitting"})]}),re("button",{css:[os,c("/recommend")&&ho],onClick:()=>e("recommend"),children:[A(vD,{}),A("span",{className:"menu-text",children:"Recommend"})]}),re("button",{css:[os,c("/image-search")&&ho],onClick:()=>e("image-search"),children:[A(sT,{}),A("span",{className:"menu-text",children:"Image Search"})]}),re("button",{css:[os,c("/hotitems")&&ho],onClick:()=>e("hotitems"),children:[A(lD,{}),A("span",{className:"menu-text",children:"Hot"})]})]}),A("div",{css:KN,children:a?re("button",{css:os,onClick:s,children:[A(pD,{}),A("span",{className:"menu-text",children:"Logout"})]}):re("button",{css:[os,i.pathname.includes("/fittingroom")&&ho],onClick:BN,children:[A("img",{src:PL,alt:"Google Logo",css:ZN}),A("span",{className:"menu-text",children:"데모 로그인"})]})})]})}const YN=N`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80px;
  height: 100%;
  background: #000;
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.7);
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;

  &:hover {
    width: 200px;
  }
`,GN=N`
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 80px;
  min-width: 80px;
`,XN=N`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 14px;
`,os=N`
  width: 100%;
  text-align: left;
  padding: 12px;
  background: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  svg {
    width: 24px;
    height: 24px;
    min-width: 24px;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.1));
  }

  .menu-text {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  /* 기본 상태에서는 텍스트 숨김 */

  &:hover {
    background: rgba(30, 30, 30, 0.9);
    color: #fff;
    // text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);

    svg {
      filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.4));
    }

    .menu-text {
      opacity: 1;
      transform: translateX(0);
    }
  }
`,ho=N`
  background: rgba(40, 40, 40, 1);
  color: #fff;
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.6);

  svg {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
  }

  /* 활성화된 메뉴는 nav 호버 시 텍스트 표시 */
  nav:hover & .menu-text {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover {
    background: rgba(17, 24, 39, 1);
  }
`,KN=N`
  margin-top: auto;
  padding: 12px;
`,ZN=N`
  width: 18px;
  height: 18px;
`;var QN=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,WN=NT(function(t){return QN.test(t)||t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)<91}),JN=WN,ez=function(e){return e!=="theme"},Uw=function(e){return typeof e=="string"&&e.charCodeAt(0)>96?JN:ez},Iw=function(e,i,a){var s;if(i){var l=i.shouldForwardProp;s=e.__emotion_forwardProp&&l?function(c){return e.__emotion_forwardProp(c)&&l(c)}:l}return typeof s!="function"&&a&&(s=e.__emotion_forwardProp),s},tz=function(e){var i=e.cache,a=e.serialized,s=e.isStringTag;return Kg(i,a,s),BT(function(){return Zg(i,a,s)}),null},nz=function t(e,i){var a=e.__emotion_real===e,s=a&&e.__emotion_base||e,l,c;i!==void 0&&(l=i.label,c=i.target);var d=Iw(e,i,a),f=d||Uw(s),h=!f("as");return function(){var m=arguments,g=a&&e.__emotion_styles!==void 0?e.__emotion_styles.slice(0):[];if(l!==void 0&&g.push("label:"+l+";"),m[0]==null||m[0].raw===void 0)g.push.apply(g,m);else{var x=m[0];g.push(x[0]);for(var _=m.length,w=1;w<_;w++)g.push(m[w],x[w])}var v=Qg(function(S,C,M){var R=h&&S.as||s,L="",O=[],j=S;if(S.theme==null){j={};for(var k in S)j[k]=S[k];j.theme=E.useContext(Wg)}typeof S.className=="string"?L=PT(C.registered,O,S.className):S.className!=null&&(L=S.className+" ");var U=Df(g.concat(O),C.registered,j);L+=C.key+"-"+U.name,c!==void 0&&(L+=" "+c);var I=h&&d===void 0?Uw(R):f,Y={};for(var W in S)h&&W==="as"||I(W)&&(Y[W]=S[W]);return Y.className=L,M&&(Y.ref=M),E.createElement(E.Fragment,null,E.createElement(tz,{cache:C,serialized:U,isStringTag:typeof R=="string"}),E.createElement(R,Y))});return v.displayName=l!==void 0?l:"Styled("+(typeof s=="string"?s:s.displayName||s.name||"Component")+")",v.defaultProps=e.defaultProps,v.__emotion_real=v,v.__emotion_base=s,v.__emotion_styles=g,v.__emotion_forwardProp=d,Object.defineProperty(v,"toString",{value:function(){return"."+c}}),v.withComponent=function(S,C){var M=t(S,R0({},i,C,{shouldForwardProp:Iw(v,C,!0)}));return M.apply(void 0,g)},v}},iz=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],F=nz.bind(null);iz.forEach(function(t){F[t]=F(t)});const Go=sy("fast"),oy=t=>{const{isLiked:e,...i}=t;return{...i,liked:e}},p3=async t=>{const{keyword:e,page:i=0,size:a=20}=t;try{return(await Bt.get("/products/search",{params:{keyword:e,page:i,size:a},paramsSerializer:l=>new URLSearchParams(Object.entries(l).map(([c,d])=>[c,String(d)])).toString()})).data}catch(s){const l=s;if(l.response?.status===404&&l.response?.data?.code===-10605)return{success:!1,code:-10605,message:"검색어에 일치하는 상품이 없습니다.",data:{content:[],totalElements:0,totalPages:0,size:a,number:i,first:!0,last:!0,numberOfElements:0,empty:!0}};throw s}},m3=async()=>(await Bt.get("/search/history")).data,z0=async t=>(await Bt.delete("/search/history",{params:{keyword:t},paramsSerializer:i=>new URLSearchParams(Object.entries(i).map(([a,s])=>[a,String(s)])).toString()})).data,rz=async()=>(await Bt.get("/search/rank")).data,az=async(t=0,e=5,i)=>{const a=new URLSearchParams({page:t.toString(),size:e.toString()});return i!==void 0&&a.append("member_id",i.toString()),(await Go.get(`/recommend?${a.toString()}`)).data},sz=(t,e=[])=>{const i=new Set,a=new Set,s=new Set;if(!t||!Array.isArray(t))return[];t.forEach(d=>{d.productBrand?.trim()&&i.add(d.productBrand.trim()),d.productName.replace(/\[.*?\]/g,"").replace(/\(.*?\)/g,"").trim().split(/\s+/).filter(m=>m.length>1&&!/^\d+$/.test(m)&&!["케이블","반팔","긴팔","니트","티셔츠","셔츠","후드","자켓","코트","바지","청바지","스커트","원피스","가방","신발","스니커즈","부츠","샌들","슬리퍼","모자","스카프","벨트","시계","반지","목걸이","귀걸이","팔찌","안경","선글라스","마스크","장갑","양말","속옷","잠옷","수영복","운동복","정장","드레스","한복","기모","쭈리","오버핏","슬림핏","레귤러핏","와이드핏","스트레이트핏","테이퍼드핏","스키니핏","부츠컷핏","플레어핏","벨보텀핏","하이웨이스트핏","로우웨이스트핏","미드웨이스트핏","크롭핏","롱핏","숏핏","미니핏","맥시핏","미디핏"].includes(m)).forEach(m=>s.add(m)),Array.isArray(d.styleList)&&d.styleList.forEach(m=>{m&&m.length>1&&a.add(m)})}),e.forEach(([d])=>{d&&d.length>1&&a.add(d)});const l=[],c=[...i].sort((d,f)=>d.length-f.length);return c.length>0&&l.push(c[0]),l.push(...[...a].sort((d,f)=>d.length-f.length).slice(0,2)),l.push(...[...s].sort((d,f)=>d.length-f.length).slice(0,2)),l},oz=t=>Bt.post(`/products/likes/${t}`),lz=async()=>await Bt.get("/my/likes"),Dm=t=>Go.post("/user/save",t),P0=F.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0;
  transition: all 0.2s ease;
  background: transparent;
  border: none;

  &:hover {
    background: rgba(128, 128, 128, 0.1);
    transform: translateX(2px);
  }
`,U0=F.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${t=>t.isHovered?"#a8e840":"#666"};
  border-radius: 0;
  font-size: 11px;
  font-weight: 600;
  margin-right: 10px;
  flex-shrink: 0;
  transition: all 0.2s ease;
  border: none;
`,I0=F.div`
  font-size: 13px;
  color: #cccccc;
`,cz=F.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,uz=F.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
`,Bw=F.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g3=F.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,y3=F.div`
  font-size: 13px;
  color: #60a5fa;
`,x3=F.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
`,b3=F.div`
  font-size: 13px;
  color: #60a5fa;
  text-align: center;
`,v3=F.button`
  padding: 4px 8px;
  background: #60a5fa;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #a8e840;
  }
`,gs=F.h3`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 8px 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 85px;
    height: 2px;
    background: linear-gradient(
      90deg,
      #072bed 0%,
      #072bed 50%,
      rgba(7, 43, 237, 0.3) 80%,
      rgba(7, 43, 237, 0.1) 100%
    );
    // border-radius: 2px;
    box-shadow: 0 0 8px rgba(7, 43, 237, 0.4);
  }
`;function w3({onSearch:t}){const[e,i]=E.useState(null),[a,s]=E.useState([]),[l,c]=E.useState(!0),[d,f]=E.useState(null),h=or(),m=async()=>{try{c(!0),f(null);const w=await rz();w.success?s(w.data):(f("인기 검색어를 불러올 수 없습니다."),s(["청바지","니트","코트","스니커즈","가방","원피스","셔츠","후드티"]))}catch(w){console.error("Failed to fetch popular searches:",w),f("인기 검색어를 불러올 수 없습니다."),s(["청바지","니트","코트","스니커즈","가방","원피스","셔츠","후드티"])}finally{c(!1)}};E.useEffect(()=>{m()},[]);const g=w=>{t?t(w):h({pathname:"search",search:`?q=${encodeURIComponent(w)}`})},x=a.slice(0,Math.ceil(a.length/2)),_=a.slice(Math.ceil(a.length/2));return l?b.jsx(g3,{children:b.jsx(y3,{children:"인기 검색어를 불러오는 중..."})}):d?b.jsxs(x3,{children:[b.jsx(b3,{children:d}),b.jsx(v3,{onClick:m,children:"다시 시도"})]}):b.jsxs(uz,{children:[b.jsx(Bw,{children:x.map((w,v)=>b.jsxs(P0,{onMouseEnter:()=>i(v),onMouseLeave:()=>i(null),onClick:()=>g(w),children:[b.jsx(U0,{isHovered:e===v,children:v+1}),b.jsx(I0,{children:w})]},v))}),b.jsx(Bw,{children:_.map((w,v)=>{const S=v+x.length;return b.jsxs(P0,{onMouseEnter:()=>i(S),onMouseLeave:()=>i(null),onClick:()=>g(w),children:[b.jsx(U0,{isHovered:e===S,children:S+1}),b.jsx(I0,{children:w})]},S)})})]})}function S3({onSearch:t}){const e=["나이키","아디다스","캠프","빈티지","힙"],[i,a]=E.useState(null),[s,l]=E.useState(e),[c,d]=E.useState(!1),[f,h]=E.useState(null),m=or(),g=fn(v=>v.isLoggedIn),x=fn(v=>v.member),_=E.useCallback(async()=>{try{d(!0),h(null);const v=await az(0,5,x?.memberId),S=v.result?.recommended_products||[],C=v.result?.styleTags||[],M=sz(S,C);M.length>0?l(M):l(e)}catch(v){console.error("Failed to fetch recommended searches:",v),h("추천 검색어를 불러올 수 없습니다."),l(e)}finally{d(!1)}},[x?.memberId]);E.useEffect(()=>{g&&x?.memberId&&_()},[g,x?.memberId,_]);const w=v=>{try{t?t(v):m({pathname:"search",search:`?q=${encodeURIComponent(v)}`})}catch(S){console.error("Error handling search click:",S),m({pathname:"search",search:`?q=${encodeURIComponent(v)}`})}};return c?b.jsx(g3,{children:b.jsx(y3,{children:"추천 검색어를 불러오는 중..."})}):f?b.jsxs(x3,{children:[b.jsx(b3,{children:f}),b.jsx(v3,{onClick:_,children:"다시 시도"})]}):b.jsx(cz,{children:s.map((v,S)=>b.jsxs(P0,{onMouseEnter:()=>a(S),onMouseLeave:()=>a(null),onClick:()=>w(v),children:[b.jsx(U0,{isHovered:i===S,children:S+1}),b.jsx(I0,{children:v})]},S))})}function dz({product:t,onToggleLike:e,onClick:i}){const{productId:a,productImageUrl:s,productName:l,productBrand:c,productPrice:d}=t,f=g=>{g.stopPropagation(),e?.(a)},h=g=>g.toLocaleString("ko-KR");return re("li",{css:fz,children:[re("div",{css:hz,onClick:()=>{i?.(a)},children:[A("img",{src:s,alt:l,css:pz,loading:"lazy"}),A("button",{type:"button",onClick:f,css:mz,"aria-label":"like",children:A("span",{css:gz(t.liked),"aria-label":"like",children:t.liked?"❤️":"♡"})})]}),re("div",{css:yz,children:[A("div",{css:xz,children:c}),A("div",{css:bz,children:l}),A("div",{css:vz,children:`₩ ${h(d)}`})]})]})}const fz=N`
  background: rgb(17, 17, 17);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    z-index: 1;
    cursor: pointer;
  }
`,hz=N`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgb(17, 17, 17);
  overflow: hidden;
`,pz=N`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`,mz=N`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #ff4444, #ff4444);
    transition: transform 0.3s ease-in-out;
  }

  &:before {
    transform: translateX(-100%);
  }

  &:after {
    transform: translateX(100%);
  }

  &:hover {
    transform: scale(1.3);
    border: 2px solid #ff4444;

    &:before {
      transform: translateX(0%);
    }

    &:after {
      transform: translateX(0%);
    }
  }
`,gz=t=>N`
  font-size: 14px;
  color: ${t?"#fa5252":"#adb5bd"};
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;

  button:hover & {
    color: white;
    transform: scale(1.2);
  }
`,yz=N`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  background: rgb(17, 17, 17);
  text-align: left;
`,xz=N`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin: 0;
  max-width: 90%;
`,bz=N`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  margin: 4px 0;
  max-width: 90%;
`,vz=N`
  margin: 8px 0 0;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  max-width: 90%;
`,ks=E.memo(dz);function wz({isOpen:t,onClose:e}){const{isLoggedIn:i}=fn(),[a,s]=E.useState(""),[l,c]=E.useState([]),[d,f]=E.useState([]),[h,m]=E.useState(!1),g=or(),x=E.useRef(null),_=E.useCallback(async()=>{if(i)try{const L=await m3();L.success&&c(L.data.slice(0,5))}catch(L){console.error("Failed to fetch search history:",L),c([])}else try{const L=sessionStorage.getItem("recentSearches");if(L){const O=JSON.parse(L);c(O.slice(0,5))}else c([])}catch(L){console.error("Failed to fetch session search history:",L),c([])}},[i]);if(E.useEffect(()=>{t&&(_(),s(""),f([]))},[t,_]),E.useEffect(()=>()=>{x.current&&clearTimeout(x.current)},[]),!t)return null;const w=L=>{L.target===L.currentTarget&&e()},v=L=>{L.key==="Escape"?e():L.key==="Enter"&&a.trim()&&M()},S=L=>{const O=L.target.value;s(O),x.current&&clearTimeout(x.current),O.trim()?x.current=setTimeout(()=>{C(O.trim())},300):(f([]),m(!1))},C=async L=>{m(!0);try{const O=await p3({keyword:L,page:0,size:6});if(O.success){f(O.data.content);try{await z0(L)}catch(j){console.warn("Failed to delete search history for real-time search:",j)}}else f([])}catch(O){console.error("Search error:",O);const j=O;(j.code==="ERR_NETWORK"||j.message?.includes("Network Error")||j.message?.includes("CORS"))&&console.warn("Network error in search modal, silently handling"),f([])}finally{m(!1)}},M=L=>{const O=L||a.trim();if(O){if(!i)try{const j=sessionStorage.getItem("recentSearches");let k=j?JSON.parse(j):[];k=k.filter(U=>U!==O),k.unshift(O),k=k.slice(0,10),sessionStorage.setItem("recentSearches",JSON.stringify(k))}catch(j){console.error("Failed to save search to session storage:",j)}g({pathname:"search",search:`?q=${encodeURIComponent(O)}`}),e()}},R=async(L,O)=>{if(O.stopPropagation(),i)try{(await z0(L)).success&&(c(k=>k.filter(U=>U!==L)),_())}catch(j){console.error("Failed to delete search history:",j)}else try{const j=sessionStorage.getItem("recentSearches");if(j){const U=JSON.parse(j).filter(I=>I!==L);sessionStorage.setItem("recentSearches",JSON.stringify(U)),c(I=>I.filter(Y=>Y!==L))}}catch(j){console.error("Failed to delete session search history:",j)}};return b.jsx(Sz,{onClick:w,onKeyDown:v,children:b.jsxs(_z,{children:[b.jsx(Tz,{children:b.jsx(Ez,{type:"text",placeholder:"검색어를 입력하세요",value:a,onChange:S,autoFocus:!0})}),b.jsx(Cz,{children:a?b.jsxs("div",{children:[b.jsx(gs,{children:"검색 결과"}),h?b.jsx(Mz,{children:"검색 중..."}):d.length>0?b.jsx(jz,{children:d.map(L=>b.jsx(ks,{product:oy(L),onClick:()=>{g({pathname:"search",search:`?q=${encodeURIComponent(L.productName)}`}),e()}},L.productId))}):b.jsx(Lz,{children:"검색 결과가 없습니다"})]}):b.jsxs(b.Fragment,{children:[l.length>0&&b.jsxs(b.Fragment,{children:[b.jsx(gs,{children:"최근 검색어"}),b.jsx(Az,{children:l.map((L,O)=>b.jsxs(Rz,{onClick:()=>M(L),children:[b.jsx(Dz,{children:L}),b.jsx(Oz,{onClick:j=>R(L,j),children:b.jsx(Sr,{size:12})})]},O))})]}),b.jsxs(kz,{children:[b.jsxs(Vw,{children:[b.jsx(gs,{children:"추천 검색어"}),b.jsx(S3,{onSearch:M})]}),b.jsxs(Vw,{children:[b.jsx(gs,{children:"실시간 순위"}),b.jsx(w3,{onSearch:M})]})]})]})})]})})}const Sz=F.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,_z=F.div`
  background: #0f1115;
  border-radius: 3px;
  width: 95%;
  max-width: 700px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: slideDown 0.2s ease-out;
  border: 1px solid #072bed;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #072bed;
    border-radius: 0;
    border: 2px solid #0f1115;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8e840;
  }

  /* Firefox용 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: #072bed transparent;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,Tz=F.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgb(80, 80, 80);
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Ez=F.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #ffffff;
  background: transparent;

  &::placeholder {
    color: #ffffff;
  }
`,Cz=F.div`
  padding: 20px 24px;
`,kz=F.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`,Vw=F.div`
  display: flex;
  flex-direction: column;
`,Az=F.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  margin-bottom: 20px;
`,Rz=F.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  background: transparent;
  border: 1px solid #666666;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  color: #cccccc;
  &:hover {
    border-color: #a8e840;
    color: #ffffff;
  }
`,Dz=F.span`
  font-size: 13px;
  color: inherit;
`,Oz=F.span`
  color: #666666;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  background: transparent;

  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    transform: scale(1.1);
  }
`,Mz=F.p`
  font-size: 14px;
  color: #072bed;
  margin: 10px 0;
  text-align: center;
`,Lz=F.p`
  font-size: 14px;
  color: #072bed;
  margin: 10px 0;
  text-align: center;
`,jz=F.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,Nz=Of`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,zz=Of`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;function na({show:t,onClose:e,message:i="로그인이 필요합니다."}){return E.useEffect(()=>{if(t){const a=setTimeout(()=>{e()},2e3);return()=>clearTimeout(a)}},[t,e]),t?A("div",{css:Pz,children:A("div",{css:Uz(t),children:re("div",{css:Iz,children:[A(hD,{size:16,css:Bz}),A("span",{css:Vz,children:i})]})})}):null}const Pz=N`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  pointer-events: none;
`,Uz=t=>N`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${t?Nz:zz} 0.3s ease-in-out;
  pointer-events: auto;
`,Iz=N`
  display: flex;
  align-items: center;
  gap: 8px;
`,Bz=N`
  color: white;
`,Vz=N`
  font-size: 14px;
  font-weight: 500;
`;function Fz(){const[t,e]=E.useState(!1),{show:i,message:a,hideToast:s,showToast:l}=Yo(),c=()=>{e(!0)},d=()=>{e(!1)};return E.useEffect(()=>{sessionStorage.getItem("toast_logout")&&(l("로그아웃 되었습니다"),sessionStorage.removeItem("toast_logout"))},[l]),re("main",{css:Hz,children:[A(qN,{onSearchClick:c}),A(cM,{}),A(wz,{isOpen:t,onClose:d}),A(na,{show:i,onClose:s,message:a})]})}const Hz=N`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
`;function $z(){const t=or(),{isLoggedIn:e}=fn(),{showToast:i}=Yo(),a=l=>{switch(l){case"FITTING":e?t("fittingroom"):i("로그인이 필요한 서비스입니다.");return;case"RECOMMEND":t("recommend");return;case"Image Search":t("image-search");return;case"HOT ITEMS":t("hotitems");return;default:return}},s=[{category:"",title:`나만의 패션 큐레이터
ON-WEAR`,description:"당신의 취향을 반영한 맞춤형 추천",date:"",author:""},{category:"FITTING",title:"사진 속 나에게 옷을 입혀보다",description:"가상 피팅으로 미리 경험하는 새로운 스타일",date:"",author:""},{category:"RECOMMEND",title:"당신을 위한 맞춤 추천",description:"취향 분석을 통한 개인화된 상품 추천",date:"",author:""},{category:"Image Search",title:"사진과 유사한 옷들을 한 번에",description:"비슷한 스타일을 빠르고 간편하게 찾기",date:"",author:""},{category:"HOT ITEMS",title:"지금 가장 인기있는 아이템",description:"카테고리별 주목받는 상품들",date:"",author:""}];return A("div",{css:qz,children:re("section",{css:Yz,children:[A("div",{css:Fw,children:[0,2].map(l=>{const c=s[l+1];return A("article",{css:Hw,className:l===0?"featured-card":"third-card",onClick:()=>a(c.category),children:re("div",{css:Om,children:[A("div",{css:Mm,children:c.category}),A("h3",{css:$w,children:c.title}),A("p",{css:Lm,children:c.description})]})},`left-col-${l}`)})}),A("article",{css:Gz,onClick:()=>t("main"),children:re("div",{css:[Om,Xz],children:[A("div",{css:Mm,children:s[0].category}),A("h2",{css:Kz,children:s[0].title}),A("p",{css:Lm,children:s[0].description})]})}),A("div",{css:Fw,children:[1,3].map(l=>{const c=s[l+1];return A("article",{css:Hw,className:l===1?"second-card":"fourth-card",onClick:()=>a(c.category),children:re("div",{css:Om,children:[A("div",{css:Mm,children:c.category}),A("h3",{css:$w,children:c.title}),A("p",{css:Lm,children:c.description})]})},`right-col-${l}`)})})]})})}const qz=N`
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow-y: hidden;
  overflow-x: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`,Yz=N`
  display: grid;
  grid-template-columns: 1fr 520px 1fr; /* 좌-중앙-우 */
  background: #eee;
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`,Fw=N`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100vh;
  background: #eee;
  overflow: hidden;
`,Gz=N`
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: transform 0.3s ease;
  background: #a8e840;
  width: 520px;
  height: 100vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      // rgba(0, 0, 0, 0.2) 0%,
      // rgba(0, 0, 0, 0.4) 50%,
       // rgba(0, 0, 0, 0.8) 100%
    );
  }
`,Hw=N`
  position: relative;
  background: #f8f8f8;
  overflow: hidden;
  cursor: pointer;
  height: calc(100vh / 2);
  transition: transform 0.3s ease;

  &.featured-card {
    background: url('/demos/fashion/img/kanye1.avif') center/cover;
  }

  &.second-card {
    background: url('/demos/fashion/img/girl.png') center/cover;
  }

  &.third-card {
    background: url('/demos/fashion/img/izy.avif') center/cover;
  }

  &.fourth-card {
    background: url('/demos/fashion/img/tyler.avif') center/cover;
  }

  &:hover {
    transform: scale(1.02);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;
  }
`,Om=N`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: #fff;
`,Xz=N`
  color: #000;
  font-weight: 800;
`,Mm=N`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,Kz=N`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  white-space: pre-line;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,$w=N`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,Lm=N`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  margin-left: 3px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;function qw(){const t=Ri(),[e,i]=E.useState(!1),{setAuthFromRedirect:a}=fn();return E.useEffect(()=>{t.state&&t.state.showLoginToast&&(i(!0),window.history.replaceState({},document.title))},[t.state]),E.useEffect(()=>{const s=new URLSearchParams(t.search),l=s.get("grantType"),c=s.get("accessToken");l&&c&&a(window.location.href)&&window.history.replaceState({},document.title,window.location.pathname)},[t.search,a]),re(Ar,{children:[A("div",{css:Zz,children:A($z,{})}),A(na,{show:e,onClose:()=>i(!1),message:"로그인이 필요한 서비스입니다."})]})}const Zz=N`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`,gi=""+new URL("default_mannequin2-OdBn73VC.png",import.meta.url).href;function Qz({isVisible:t}){const e=E.useRef(null),[i,a]=E.useState(!1),[s,l]=E.useState(!1),[c,d]=E.useState(""),[f,h]=E.useState(!1),m=E.useRef(null),g=E.useRef(1),x=E.useCallback(()=>{if(!e.current)return;const k=e.current;k.style.setProperty("--line-top-x","200%"),k.style.setProperty("--line-bottom-x","100%"),setTimeout(()=>{k.style.setProperty("--line-top-x","0%"),k.style.setProperty("--line-bottom-x","0%")},500)},[]),_=E.useCallback(()=>{m.current&&clearInterval(m.current);const k=1e3/g.current;m.current=setInterval(x,k),x()},[x]),w=E.useCallback(()=>{m.current&&(clearInterval(m.current),m.current=null)},[]),v=E.useCallback(k=>{g.current=k,_()},[_]),S=E.useCallback((k,U=200,I=0)=>e.current?new Promise(Y=>{setTimeout(()=>{if(!e.current)return Y();const W=e.current;Object.entries(k).forEach(([te,me])=>{W.style.setProperty(te,me)}),setTimeout(()=>Y(),U)},I)}):Promise.resolve(),[]),C=E.useCallback(async()=>{i||(a(!0),h(!0),v(2),await Promise.all([S({"--skate-x":"-12px"},300),S({"--skate-y":"-32px"},400,200)]),await S({"--skate-x":"12px"},500),await Promise.all([S({"--skate-x":"0px"},500),S({"--skate-y":"0px"},200),S({"--arm-front":"40deg","--arm-front-end":"-12deg","--arm-back":"172deg","--arm-back-end":"38deg","--leg-front":"-8deg","--leg-front-end":"102deg","--leg-back":"103deg","--leg-back-end":"-16deg","--board-r":"-40deg","--body-r":"7deg","--body-y":"-90%","--body-x":"-160%"},200,200)]),await S({"--arm-front":"24deg","--arm-front-end":"-48deg","--arm-back":"164deg","--arm-back-end":"-50deg","--leg-front":"40deg","--leg-front-end":"30deg","--leg-back":"120deg","--leg-back-end":"-36deg","--board-r":"0deg","--body-r":"12deg","--body-y":"-65%","--body-x":"-85%"},400),a(!1),v(1))},[i,S,v]),M=E.useCallback(async()=>{i||(a(!0),h(!0),v(2.5),await Promise.all([S({"--skate-x":"12px"},300),S({"--arm-front":"24deg","--arm-front-end":"-48deg","--arm-back":"164deg","--arm-back-end":"-36deg","--leg-front":"-4deg","--leg-front-end":"66deg","--leg-back":"111deg","--leg-back-end":"-36deg","--board-r":"0deg","--body-r":"34deg","--body-y":"-53%","--body-x":"-28%"},200)]))},[i,S,v]),R=E.useCallback(async()=>{i||(a(!0),h(!0),v(.5),await Promise.all([S({"--skate-x":"-12px"},300),S({"--arm-front":"32deg","--arm-front-end":"20deg","--arm-back":"156deg","--arm-back-end":"-22deg","--leg-front":"19deg","--leg-front-end":"74deg","--leg-back":"134deg","--leg-back-end":"-29deg","--board-r":"-15deg","--body-r":"-8deg","--body-y":"-65%","--body-x":"-110%"},200)]))},[i,S,v]),L=E.useCallback(async()=>{i||(a(!0),h(!0),await S({"--arm-front":"-26deg","--arm-front-end":"-58deg","--arm-back":"204deg","--arm-back-end":"60deg","--leg-front":"40deg","--leg-front-end":"80deg","--leg-back":"150deg","--leg-back-end":"-96deg","--body-r":"180deg","--body-y":"-100%"},200))},[i,S]),O=E.useCallback(async()=>{i||(a(!0),l(!0),w(),await Promise.all([S({"--board-x":"60px"},500),(async()=>{await S({"--board-r":"-40deg"},150),await S({"--board-r":"0deg"},300)})(),(async()=>{await S({"--line-top-x":"-100%","--line-bottom-x":"-200%","--body-r":"-8deg","--leg-back-end":"24deg","--leg-back":"60deg","--leg-front-end":"30deg","--leg-front":"10deg","--arm-back-end":"-40deg","--arm-back":"54deg","--arm-front-end":"-28deg","--arm-front":"24deg"},200),await S({"--body-x":"-85%","--body-y":"36%","--body-r":"-26deg","--leg-back-end":"24deg","--leg-back":"20deg","--leg-front-end":"30deg","--leg-front":"-10deg","--arm-back-end":"-40deg","--arm-back":"164deg","--arm-front-end":"-28deg","--arm-front":"24deg"},200)})()]))},[i,S,w]),j=E.useCallback(async()=>{i&&(await Promise.all([S({"--skate-x":"0px"},300),S({"--arm-front":"24deg","--arm-front-end":"-48deg","--arm-back":"164deg","--arm-back-end":"-50deg","--leg-front":"40deg","--leg-front-end":"30deg","--leg-back":"120deg","--leg-back-end":"-36deg","--board-r":"0deg","--board-x":"0px","--body-r":"12deg","--body-y":"-65%","--body-x":"-85%"},200)]),a(!1),_(),v(1))},[i,S,_,v]);return E.useEffect(()=>{if(!t)return;_();const k=I=>{I.code==="ArrowRight"||I.keyCode===39?(M(),d("right")):I.code==="ArrowDown"||I.keyCode===40?(L(),d("down")):I.code==="ArrowLeft"||I.keyCode===37?(R(),d("left")):(I.code==="KeyC"||I.keyCode===67)&&(O(),d("fall"),setTimeout(()=>d(""),400))},U=I=>{I.code==="Space"||I.code==="ArrowUp"||I.keyCode===32||I.keyCode===38?(s?(l(!1),j()):C(),d("up"),setTimeout(()=>d(""),400)):(I.code==="ArrowDown"||I.code==="ArrowRight"||I.code==="ArrowLeft"||I.keyCode===40||I.keyCode===39||I.keyCode===37)&&(s||j(),d(""))};return document.addEventListener("keydown",k),document.addEventListener("keyup",U),()=>{document.removeEventListener("keydown",k),document.removeEventListener("keyup",U),w()}},[t,C,M,R,L,O,j,s,_,w]),t?re("div",{css:Wz,children:[A("div",{css:Jz,ref:e,children:re("div",{css:eP,children:[re("div",{css:tP,children:[A("div",{css:[Yw,iP]}),A("div",{css:[Yw,nP]}),A("div",{css:[Gw,aP]}),A("div",{css:[Gw,rP]})]}),A("div",{css:sP,children:A("svg",{viewBox:"0 0 34 8",children:A("path",{d:"M0.897306 0.911767C1.22218 0.30263 1.97934 0.072188 2.58848 0.397061L2.91936 0.573532C3.75214 1.01768 4.68144 1.25 5.62525 1.25H28.3752C29.3191 1.25 30.2484 1.01768 31.0811 0.573532L31.412 0.397061C32.0212 0.072188 32.7783 0.30263 33.1032 0.911767C33.4281 1.5209 33.1976 2.27807 32.5885 2.60294L32.2576 2.77941C31.0627 3.41667 29.7294 3.75 28.3752 3.75H27.9692C28.5841 4.09118 29.0002 4.747 29.0002 5.5C29.0002 6.60457 28.1048 7.5 27.0002 7.5C25.8957 7.5 25.0002 6.60457 25.0002 5.5C25.0002 4.747 25.4164 4.09118 26.0312 3.75H7.96925C8.5841 4.09118 9.00025 4.747 9.00025 5.5C9.00025 6.60457 8.10482 7.5 7.00025 7.5C5.89568 7.5 5.00025 6.60457 5.00025 5.5C5.00025 4.747 5.41639 4.09118 6.03124 3.75H5.62525C4.27109 3.75 2.93774 3.41667 1.74289 2.77941L1.41201 2.60294C0.802874 2.27807 0.572432 1.5209 0.897306 0.911767Z"})})}),A("div",{css:[Xw,oP]}),A("div",{css:[Xw,lP]})]})}),re("div",{css:cP,children:[A("button",{css:[hd,uP,c==="up"&&pd],onClick:()=>{s?(l(!1),j()):C()},children:A("svg",{viewBox:"0 0 8 8",children:A("path",{d:"M3.99953 1C3.83653 1 3.68353 1.0795 3.59003 1.2135L0.0900328 6.2135C-0.0169672 6.366 -0.0289672 6.5655 0.0560328 6.731C0.142533 6.8965 0.313033 7 0.499533 7H7.50003C7.68653 7 7.85753 6.8965 7.94353 6.731C8.02853 6.5655 8.01653 6.366 7.90953 6.2135L4.40953 1.2135C4.31653 1.0795 4.16353 1 4.00053 1C4.00003 1 4.00003 1 3.99953 1C4.00003 1 4.00003 1 3.99953 1Z"})})}),A("button",{css:[hd,dP,c==="left"&&pd],onPointerDown:()=>R(),onPointerUp:()=>!s&&j(),children:A("svg",{viewBox:"0 0 8 8",children:A("path",{d:"M1 4.00053C1 4.16353 1.0795 4.31653 1.2135 4.41003L6.2135 7.91003C6.366 8.01703 6.5655 8.02903 6.731 7.94403C6.8965 7.85753 7 7.68703 7 7.50053V0.499533C7 0.313033 6.8965 0.142033 6.731 0.0560328C6.5655 -0.0289672 6.366 -0.0169672 6.2135 0.0900328L1.2135 3.59003C1.0795 3.68353 1 3.83653 1 3.99953C1 4.00003 1 4.00003 1 4.00053C1 4.00003 1 4.00003 1 4.00053Z"})})}),A("button",{css:[hd,fP,c==="right"&&pd],onPointerDown:()=>M(),onPointerUp:()=>!s&&j(),children:A("svg",{viewBox:"0 0 8 8",children:A("path",{d:"M7 3.99953C7 3.83653 6.9205 3.68353 6.7865 3.59003L1.7865 0.0900328C1.6345 -0.0169672 1.4345 -0.0289672 1.269 0.0560328C1.1035 0.142533 1 0.313033 1 0.499533V7.50003C1 7.68653 1.1035 7.85753 1.269 7.94353C1.4345 8.02853 1.634 8.01653 1.7865 7.90953L6.7865 4.40953C6.9205 4.31653 7 4.16353 7 4.00053C7 4.00003 7 4.00003 7 3.99953C7 4.00003 7 4.00003 7 3.99953Z"})})}),A("button",{css:[hd,hP,c==="down"&&pd],onPointerDown:()=>L(),onPointerUp:()=>!s&&j(),children:A("svg",{viewBox:"0 0 8 8",children:A("path",{d:"M4.00053 7C4.16353 7 4.31653 6.9205 4.41003 6.7865L7.91003 1.7865C8.01703 1.634 8.02903 1.4345 7.94403 1.269C7.85753 1.1035 7.68703 1 7.50053 1H0.499533C0.313033 1 0.142533 1.1035 0.0560328 1.269C-0.0289672 1.4345 -0.0169672 1.634 0.0900328 1.7865L3.59003 6.7865C3.68353 6.9205 3.83653 7 3.99953 7C4.00003 7 4.00003 7 4.00053 7C4.00003 7 4.00003 7 4.00053 7Z"})})}),re("span",{css:[pP,!f&&mP,c==="fall"&&gP],children:["Please don't press ",A("strong",{children:"C"})]})]})]}):null}const Wz=N`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(36, 36, 40, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`,Jz=N`
  --arm-front: 24deg;
  --arm-front-end: -48deg;
  --arm-back: 164deg;
  --arm-back-end: -50deg;
  --leg-front: 40deg;
  --leg-front-end: 30deg;
  --leg-back: 120deg;
  --leg-back-end: -36deg;
  --board-r: 0deg;
  --board-x: 0px;
  --body-r: 12deg;
  --body-y: -65%;
  --body-x: -85%;
  --skate-x: 0px;
  --skate-y: 0px;
  --color: #a8e840;
  --line-top-x: 0%;
  --line-bottom-x: 0%;
  position: relative;
`,eP=N`
  position: relative;
  width: 40px;
  height: 46px;
  transform: translate(var(--skate-x), var(--skate-y)) translateZ(0);
`,tP=N`
  background: var(--color);
  height: 15px;
  width: 7px;
  border-radius: 4px;
  transform-origin: 4px 11px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(var(--body-x), var(--body-y)) rotate(var(--body-r))
    translateZ(0);

  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    bottom: 16px;
    left: 0;
    position: absolute;
    background: var(--color);
    transform: translateY(-0.5px);
  }
`,Yw=N`
  content: '';
  width: 11px;
  height: 4px;
  top: 0;
  left: 2px;
  border-radius: 2px;
  transform-origin: 2px 2px;
  position: absolute;
  background: var(--color);

  &:before {
    content: '';
    width: 11px;
    height: 4px;
    left: 8px;
    border-radius: 2px;
    transform-origin: 2px 2px;
    position: absolute;
    background: var(--color);
  }
`,nP=N`
  transform: rotate(var(--arm-front));

  &:before {
    transform: rotate(var(--arm-front-end));
  }
`,iP=N`
  transform: rotate(var(--arm-back));

  &:before {
    transform: rotate(var(--arm-back-end));
  }
`,Gw=N`
  content: '';
  width: 11px;
  height: 4px;
  top: 11px;
  left: 2px;
  border-radius: 2px;
  transform-origin: 2px 2px;
  position: absolute;
  background: var(--color);

  &:before {
    content: '';
    width: 11px;
    height: 4px;
    top: 0;
    left: 8px;
    border-radius: 2px;
    transform-origin: 2px 2px;
    position: absolute;
    background: var(--color);
  }
`,rP=N`
  transform: rotate(var(--leg-front));

  &:before {
    transform: rotate(var(--leg-front-end));
  }
`,aP=N`
  left: 1px;
  transform: rotate(var(--leg-back));

  &:before {
    transform: rotate(var(--leg-back-end));
  }
`,sP=N`
  position: absolute;
  left: 2px;
  bottom: -1px;
  transform: translateX(var(--board-x)) rotate(var(--board-r)) translateZ(0);
  transform-origin: 7px 5.5px;

  svg {
    display: block;
    width: 34px;
    height: 8px;
    fill: var(--color);
  }
`,Xw=N`
  height: 3px;
  border-radius: 1px;
  overflow: hidden;
  position: absolute;
  right: 105%;
  top: 18px;
  width: 16px;
  transform: scaleY(0.75);
  transition: all 0.5s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: var(--color);
    transform: translateX(var(--x));
    transition: transform 0.5s ease;
  }
`,oP=N`
  &:before {
    transform: translateX(var(--line-top-x));
  }
`,lP=N`
  width: 13px;
  top: 24px;

  &:before {
    transform: translateX(var(--line-bottom-x));
  }
`,cP=N`
  display: grid;
  grid-gap: 8px;
  position: absolute;
  left: 50%;
  bottom: 32px;
  user-select: none;
  transform: translateX(-50%);
  scale: 0.8;

  @media (max-width: 480px) {
    scale: 0.7;
    bottom: 24px;
  }
`,hd=N`
  appearance: none;
  height: 36px;
  width: 40px;
  border-radius: 7px;
  background: #2c2c31;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1) translateZ(0);
  transition:
    transform 0.15s,
    background-color 0.15s;
  cursor: pointer;

  &:hover {
    background: #3a3a3f;
  }

  svg {
    display: block;
    width: 8px;
    height: 8px;
    fill: #7f7f85;
    transition: fill 0.15s;
  }
`,pd=N`
  transform: scale(0.95) translateZ(0);
  background: #3a3a3f;

  svg {
    fill: #fff;
  }
`,uP=N`
  grid-row: 1;
  grid-column: 2;
`,dP=N`
  grid-row: 2;
  grid-column: 1;
`,fP=N`
  grid-row: 2;
  grid-column: 3;
`,hP=N`
  grid-row: 2;
  grid-column: 2;
`,pP=N`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -24px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: #7f7f85;
  text-align: center;
  transition: opacity 0.25s;

  strong {
    transition: color 0.15s;
    color: #7f7f85;
  }
`,mP=N`
  opacity: 0;
  pointer-events: none;
`,gP=N`
  strong {
    color: #fff;
  }
`,yP=({mannequinImage:t,currentAvatarIndex:e,avatarImages:i,onLeftArrow:a,onRightArrow:s,onThumbnailClick:l,isLoading:c=!1})=>{const[d,f]=E.useState(t);return E.useEffect(()=>{f(t)},[t]),b.jsxs(xP,{children:[b.jsx(bP,{$imageUrl:d},d),b.jsx(Qz,{isVisible:c}),b.jsxs(vP,{children:[b.jsx(_3,{onClick:a,children:b.jsx(Kw,{children:"‹"})}),b.jsx(wP,{onClick:s,children:b.jsx(Kw,{children:"›"})})]}),b.jsx(SP,{children:i.map((h,m)=>b.jsx(_P,{$imageUrl:h,$isActive:m===e,$isLoading:!h,onClick:()=>h&&l(m)},m))})]})},xP=F.div`
  position: relative;
  width: 100%;
  height: 100%; /* 부모 컨테이너 높이에 맞춤 */
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* margin-top 제거하여 완전한 높이 일치 */

  @media (max-width: 768px) {
    width: 280px;
    height: 390px;
  }

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    height: 400px;
  }
`,bP=F.div`
  width: 100%;
  height: 100%;
  background-image: url(${t=>t.$imageUrl});
  background-size: contain; /* contain으로 설정하여 이미지 전체가 보이도록 함 */
  background-position: center;
  background-repeat: no-repeat;
`,vP=F.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
`,_3=F.button`
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`,wP=F(_3)``,Kw=F.span`
  font-size: 16px;
  color: #404040;
  line-height: 1;
`,SP=F.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`,_P=F.div`
  width: 32px;
  height: 43px;
  background-color: ${t=>t.$isLoading?"#f0f0f0":t.$isEmpty?"#ffffff":"#e0e0e0"};
  background-image: ${t=>t.$isLoading||t.$isEmpty?"none":t.$imageUrl?`url(${t.$imageUrl})`:`url(${gi})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid
    ${t=>t.$isLoading?"#d0d0d0":t.$isActive?"#404040":"rgba(0, 0, 0, 0.69)"};
  border-radius: 5px;
  cursor: ${t=>t.$isLoading?"default":"pointer"};
  transition: border-color 0.2s ease;
  opacity: ${t=>t.$isLoading?.6:1};

  &:hover {
    border-color: ${t=>t.$isLoading?"#d0d0d0":"#404040"};
  }

  /* 로딩 상태일 때 점점이 애니메이션 효과 */
  ${t=>t.$isLoading&&`
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      border: 2px solid #ccc;
      border-top-color: #666;
      border-radius: 50%;
      animation: thumbnail-loading 1s infinite linear;
    }

    @keyframes thumbnail-loading {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`,jm=({children:t,content:e,position:i="top",disabled:a=!1})=>a?b.jsx(b.Fragment,{children:t}):b.jsxs(TP,{children:[t,b.jsx(EP,{position:i,"data-position":i,children:e})]}),TP=F.div`
  position: relative;
  display: inline-block;

  /* 호버 시 tooltip을 표시 - top/bottom 위치 */
  &:hover > div[data-position='top'],
  &:hover > div[data-position='bottom'] {
    opacity: 1;
    visibility: visible;
  }

  &:hover > div[data-position='top'] {
    transform: translateX(-50%) translateY(0);
  }

  &:hover > div[data-position='bottom'] {
    transform: translateX(-50%) translateY(0);
  }

  /* 호버 시 tooltip을 표시 - left/right 위치 */
  &:hover > div[data-position='left'],
  &:hover > div[data-position='right'] {
    opacity: 1;
    visibility: visible;
  }

  &:hover > div[data-position='left'] {
    transform: translateY(-50%) translateX(0);
  }

  &:hover > div[data-position='right'] {
    transform: translateY(-50%) translateX(0);
  }
`,EP=F.div`
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.92) 0%,
    rgba(139, 92, 246, 0.92) 100%
  );
  backdrop-filter: blur(10px);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

  /* 초기 상태는 보이지 않음 */
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: all 0.2s ease-in-out;

  /* 위치별 스타일링 */
  ${({position:t})=>{switch(t){case"top":return N`
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: rgba(99, 102, 241, 0.92);
          }
        `;case"bottom":return N`
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-bottom-color: rgba(99, 102, 241, 0.92);
          }
        `;case"left":return N`
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%) translateX(4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-left-color: rgba(99, 102, 241, 0.92);
          }
        `;case"right":return N`
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%) translateX(-4px);

          /* 화살표 */
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-right-color: rgba(99, 102, 241, 0.92);
          }
        `;default:return""}}}

  /* 반응형 폰트 크기 */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 8px 12px;
    max-width: 200px;
    white-space: normal;
  }
`,CP=({onUploadClick:t,onDeleteClick:e,onDownloadClick:i,isUploading:a=!1,isDeleting:s=!1,isDownloading:l=!1,isDefaultMannequin:c=!1})=>b.jsxs(kP,{children:[b.jsx(jm,{content:"나만의 마네킹 이미지를 업로드하여 가상 피팅을 체험해보세요",position:"right",disabled:a||s,children:b.jsx(Nm,{onClick:t,disabled:a||s,colorIndex:1,title:a?"변경 중...":"마네킹 이미지 등록",children:b.jsx(wD,{style:{width:"16px",height:"16px",color:"currentColor",strokeWidth:1.5,opacity:a?.6:1}})})}),b.jsx(jm,{content:"현재 등록된 마네킹 이미지를 삭제하고 기본 이미지로 되돌립니다",position:"right",disabled:s||a||c,children:b.jsx(Nm,{onClick:e,disabled:s||a||c,colorIndex:1,title:s?"삭제 중...":"마네킹 이미지 삭제",children:b.jsx(SD,{style:{width:"16px",height:"16px",color:"currentColor",strokeWidth:1.5,opacity:s?.6:1}})})}),b.jsx(jm,{content:"현재 마네킹 이미지를 내 기기에 저장합니다",position:"right",disabled:l,children:b.jsx(Nm,{onClick:i,disabled:l,title:l?"다운로드 중...":"마네킹 이미지 다운로드",colorIndex:1,children:b.jsx(cD,{style:{width:"14px",height:"14px",color:"currentColor",strokeWidth:1.5,opacity:l?.6:1}})})})]}),Nm=F.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 0;
  color: #b0b8c1;
  background: #2c3038;
  border: 1px solid #404650;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-family: 'NanumSquare', 'Raleway', sans-serif;
  font-weight: 600;
  opacity: ${t=>t.disabled?.5:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};
  border-radius: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  &:hover:not(:disabled) {
    background: #404650;
    border-color: #5a6169;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }

  &:active:not(:disabled) {
    transform: translateY(0px);
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
  }

  &:focus:not(:focus-visible) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Respect user's motion preferences */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  }
`,kP=F.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 12;
  padding: 16px;
  background: #1a1d23;
  border-radius: 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  border: 1px solid #404650;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
    top: 12px;
    left: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 8px;
    top: 10px;
    left: 10px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }
`,AP=({activeTab:t,onTabClick:e})=>b.jsx(RP,{children:b.jsxs(DP,{children:[b.jsx(Zw,{$active:t==="wishlist",onClick:()=>e("wishlist"),children:"LIKES"}),b.jsx(Zw,{$active:t==="mycodi",onClick:()=>e("mycodi"),children:"OUTFITS"})]})}),RP=F.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  background: transparent;
`,DP=F.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    gap: 16px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    gap: 12px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    gap: 8px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    gap: 6px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    gap: 4px;
    flex-direction: column;
    width: 100%;
  }
`,Zw=F.button`
  padding: 16px 32px;
  border: none;
  background: transparent;
  color: ${t=>t.$active?"#FFFFFF":"#B0B8C1"};
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${t=>t.$active?"700":"500"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  &:hover {
    color: #ffffff;
    background: transparent;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: ${t=>t.$active?"60%":"0"};
    height: 2px;
    background: #ffffff;
    transition: width 0.3s ease;
    border-radius: 1px;
  }

  &:hover::after {
    width: 60%;
  }

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    padding: 18px 36px;
    font-size: 18px;
    letter-spacing: 0.7px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 12px 24px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 14px 28px;
    font-size: 15px;
    letter-spacing: 0.4px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 12px 24px;
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    padding: 10px 20px;
    font-size: 13px;
    letter-spacing: 0.2px;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }

  /* 매우 작은 모바일 (width < 360px) */
  @media (max-width: 359px) {
    padding: 8px 16px;
    font-size: 12px;
    letter-spacing: 0.1px;
  }
`,OP=({activeCategory:t,onCategoryClick:e})=>b.jsx(MP,{children:b.jsxs(LP,{children:[b.jsx(zm,{$active:t==="Total",onClick:()=>e("Total"),children:"Total"}),b.jsx(zm,{$active:t==="Upper",onClick:()=>e("Upper"),children:"Upper"}),b.jsx(zm,{$active:t==="Lower",onClick:()=>e("Lower"),children:"Lower"})]})}),MP=F.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0 auto 10px auto; /* 중앙 정렬 강화를 위한 margin 추가 */
  padding: 6px 0;
  background: transparent;
  width: 100%; /* 전체 너비 활용 */
  text-align: center; /* 하위 요소 중앙 정렬 */

  /* 큰 화면 (height ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-height: 1200px) {
    margin: 0 auto 16px auto; /* 중앙 정렬 유지 */
    padding: 8px 0;
    gap: 16px;
  }

  /* 중간 화면 (height: 900px-1199px) - QHD, 큰 노트북 */
  @media (min-height: 900px) and (max-height: 1199px) {
    margin: 0 auto 12px auto; /* 중앙 정렬 유지 */
    padding: 6px 0;
    gap: 14px;
  }

  /* 표준 화면 (height: 768px-899px) - FHD, 표준 노트북 */
  @media (min-height: 768px) and (max-height: 899px) {
    margin: 0 auto 8px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 12px;
  }

  /* 작은 화면 (height < 768px) - HD, 작은 노트북, 태블릿 */
  @media (max-height: 767px) {
    margin: 0 auto 6px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 10px;
  }

  /* 모바일 너비 추가 고려 */
  @media (max-width: 480px) {
    margin: 0 auto 8px auto; /* 중앙 정렬 유지 */
    padding: 4px 0;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`,LP=F.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%; /* 전체 너비 활용 */
  margin: 0 auto; /* 추가 중앙 정렬 */

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    gap: 14px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    gap: 12px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    gap: 8px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    gap: 6px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
`,zm=F.button`
  padding: 8px 20px;
  border: none;
  background: ${t=>t.$active?"#404650":"#2C3038"};
  color: ${t=>t.$active?"#FFFFFF":"#B0B8C1"};
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${t=>t.$active?700:500};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${t=>(t.$active,"#404650")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 0;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;

  &:hover {
    background: ${t=>t.$active?"#5A6169":"#404650"};
    color: ${t=>(t.$active,"#FFFFFF")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(1px);
  }

  /* 큰 화면 (width ≥ 1200px) - 4K, 큰 모니터 */
  @media (min-width: 1200px) {
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  /* 중간 화면 (width: 1024px-1199px) - QHD, 큰 노트북 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  /* 표준 화면 (width: 768px-1023px) - FHD, 표준 노트북 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 20px;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  /* 작은 화면 (width: 480px-767px) - 태블릿 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 7px 18px;
    font-size: 13px;
    letter-spacing: 0.1px;
  }

  /* 모바일 (width < 480px) */
  @media (max-width: 479px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0;
    min-width: 60px;
  }

  /* 매우 작은 모바일 (width < 360px) */
  @media (max-width: 359px) {
    padding: 5px 12px;
    font-size: 11px;
    min-width: 50px;
  }
`;function Kr(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function T3(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var Ei={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Mo={duration:.5,overwrite:!1,delay:0},ly,Cn,jt,Gi=1e8,St=1/Gi,B0=Math.PI*2,jP=B0/4,NP=0,E3=Math.sqrt,zP=Math.cos,PP=Math.sin,gn=function(e){return typeof e=="string"},$t=function(e){return typeof e=="function"},Jr=function(e){return typeof e=="number"},cy=function(e){return typeof e>"u"},Dr=function(e){return typeof e=="object"},Jn=function(e){return e!==!1},uy=function(){return typeof window<"u"},md=function(e){return $t(e)||gn(e)},C3=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},jn=Array.isArray,UP=/random\([^)]+\)/g,IP=/,\s*/g,Qw=/(?:-?\.?\d|\.)+/gi,k3=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,vo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Pm=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,A3=/[+-]=-?[.\d]+/,BP=/[^,'"\[\]\s]+/gi,VP=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ut,yr,V0,dy,Ci={},cf={},R3,D3=function(e){return(cf=Lo(e,Ci))&&ri},fy=function(e,i){return console.warn("Invalid property",e,"set to",i,"Missing plugin? gsap.registerPlugin()")},wc=function(e,i){return!i&&console.warn(e)},O3=function(e,i){return e&&(Ci[e]=i)&&cf&&(cf[e]=i)||Ci},Sc=function(){return 0},FP={suppressEvents:!0,isStart:!0,kill:!1},qd={suppressEvents:!0,kill:!1},HP={suppressEvents:!0},hy={},ja=[],F0={},M3,xi={},Um={},Ww=30,Yd=[],py="",my=function(e){var i=e[0],a,s;if(Dr(i)||$t(i)||(e=[e]),!(a=(i._gsap||{}).harness)){for(s=Yd.length;s--&&!Yd[s].targetTest(i););a=Yd[s]}for(s=e.length;s--;)e[s]&&(e[s]._gsap||(e[s]._gsap=new nE(e[s],a)))||e.splice(s,1);return e},ws=function(e){return e._gsap||my(Xi(e))[0]._gsap},L3=function(e,i,a){return(a=e[i])&&$t(a)?e[i]():cy(a)&&e.getAttribute&&e.getAttribute(i)||a},ei=function(e,i){return(e=e.split(",")).forEach(i)||e},Gt=function(e){return Math.round(e*1e5)/1e5||0},Pt=function(e){return Math.round(e*1e7)/1e7||0},To=function(e,i){var a=i.charAt(0),s=parseFloat(i.substr(2));return e=parseFloat(e),a==="+"?e+s:a==="-"?e-s:a==="*"?e*s:e/s},$P=function(e,i){for(var a=i.length,s=0;e.indexOf(i[s])<0&&++s<a;);return s<a},uf=function(){var e=ja.length,i=ja.slice(0),a,s;for(F0={},ja.length=0,a=0;a<e;a++)s=i[a],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},gy=function(e){return!!(e._initted||e._startAt||e.add)},j3=function(e,i,a,s){ja.length&&!Cn&&uf(),e.render(i,a,!!(Cn&&i<0&&gy(e))),ja.length&&!Cn&&uf()},N3=function(e){var i=parseFloat(e);return(i||i===0)&&(e+"").match(BP).length<2?i:gn(e)?e.trim():e},z3=function(e){return e},ki=function(e,i){for(var a in i)a in e||(e[a]=i[a]);return e},qP=function(e){return function(i,a){for(var s in a)s in i||s==="duration"&&e||s==="ease"||(i[s]=a[s])}},Lo=function(e,i){for(var a in i)e[a]=i[a];return e},Jw=function t(e,i){for(var a in i)a!=="__proto__"&&a!=="constructor"&&a!=="prototype"&&(e[a]=Dr(i[a])?t(e[a]||(e[a]={}),i[a]):i[a]);return e},df=function(e,i){var a={},s;for(s in e)s in i||(a[s]=e[s]);return a},ac=function(e){var i=e.parent||Ut,a=e.keyframes?qP(jn(e.keyframes)):ki;if(Jn(e.inherit))for(;i;)a(e,i.vars.defaults),i=i.parent||i._dp;return e},YP=function(e,i){for(var a=e.length,s=a===i.length;s&&a--&&e[a]===i[a];);return a<0},P3=function(e,i,a,s,l){var c=e[s],d;if(l)for(d=i[l];c&&c[l]>d;)c=c._prev;return c?(i._next=c._next,c._next=i):(i._next=e[a],e[a]=i),i._next?i._next._prev=i:e[s]=i,i._prev=c,i.parent=i._dp=e,i},Uf=function(e,i,a,s){a===void 0&&(a="_first"),s===void 0&&(s="_last");var l=i._prev,c=i._next;l?l._next=c:e[a]===i&&(e[a]=c),c?c._prev=l:e[s]===i&&(e[s]=l),i._next=i._prev=i.parent=null},Ua=function(e,i){e.parent&&(!i||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ss=function(e,i){if(e&&(!i||i._end>e._dur||i._start<0))for(var a=e;a;)a._dirty=1,a=a.parent;return e},GP=function(e){for(var i=e.parent;i&&i.parent;)i._dirty=1,i.totalDuration(),i=i.parent;return e},H0=function(e,i,a,s){return e._startAt&&(Cn?e._startAt.revert(qd):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(i,!0,s))},XP=function t(e){return!e||e._ts&&t(e.parent)},eS=function(e){return e._repeat?jo(e._tTime,e=e.duration()+e._rDelay)*e:0},jo=function(e,i){var a=Math.floor(e=Pt(e/i));return e&&a===e?a-1:a},ff=function(e,i){return(e-i._start)*i._ts+(i._ts>=0?0:i._dirty?i.totalDuration():i._tDur)},If=function(e){return e._end=Pt(e._start+(e._tDur/Math.abs(e._ts||e._rts||St)||0))},Bf=function(e,i){var a=e._dp;return a&&a.smoothChildTiming&&e._ts&&(e._start=Pt(a._time-(e._ts>0?i/e._ts:((e._dirty?e.totalDuration():e._tDur)-i)/-e._ts)),If(e),a._dirty||Ss(a,e)),e},U3=function(e,i){var a;if((i._time||!i._dur&&i._initted||i._start<e._time&&(i._dur||!i.add))&&(a=ff(e.rawTime(),i),(!i._dur||Hc(0,i.totalDuration(),a)-i._tTime>St)&&i.render(a,!0)),Ss(e,i)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(a=e;a._dp;)a.rawTime()>=0&&a.totalTime(a._tTime),a=a._dp;e._zTime=-St}},_r=function(e,i,a,s){return i.parent&&Ua(i),i._start=Pt((Jr(a)?a:a||e!==Ut?$i(e,a,i):e._time)+i._delay),i._end=Pt(i._start+(i.totalDuration()/Math.abs(i.timeScale())||0)),P3(e,i,"_first","_last",e._sort?"_start":0),$0(i)||(e._recent=i),s||U3(e,i),e._ts<0&&Bf(e,e._tTime),e},I3=function(e,i){return(Ci.ScrollTrigger||fy("scrollTrigger",i))&&Ci.ScrollTrigger.create(i,e)},B3=function(e,i,a,s,l){if(xy(e,i,l),!e._initted)return 1;if(!a&&e._pt&&!Cn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&M3!==bi.frame)return ja.push(e),e._lazy=[l,s],1},KP=function t(e){var i=e.parent;return i&&i._ts&&i._initted&&!i._lock&&(i.rawTime()<0||t(i))},$0=function(e){var i=e.data;return i==="isFromStart"||i==="isStart"},ZP=function(e,i,a,s){var l=e.ratio,c=i<0||!i&&(!e._start&&KP(e)&&!(!e._initted&&$0(e))||(e._ts<0||e._dp._ts<0)&&!$0(e))?0:1,d=e._rDelay,f=0,h,m,g;if(d&&e._repeat&&(f=Hc(0,e._tDur,i),m=jo(f,d),e._yoyo&&m&1&&(c=1-c),m!==jo(e._tTime,d)&&(l=1-c,e.vars.repeatRefresh&&e._initted&&e.invalidate())),c!==l||Cn||s||e._zTime===St||!i&&e._zTime){if(!e._initted&&B3(e,i,s,a,f))return;for(g=e._zTime,e._zTime=i||(a?St:0),a||(a=i&&!g),e.ratio=c,e._from&&(c=1-c),e._time=0,e._tTime=f,h=e._pt;h;)h.r(c,h.d),h=h._next;i<0&&H0(e,i,a,!0),e._onUpdate&&!a&&wi(e,"onUpdate"),f&&e._repeat&&!a&&e.parent&&wi(e,"onRepeat"),(i>=e._tDur||i<0)&&e.ratio===c&&(c&&Ua(e,1),!a&&!Cn&&(wi(e,c?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=i)},QP=function(e,i,a){var s;if(a>i)for(s=e._first;s&&s._start<=a;){if(s.data==="isPause"&&s._start>i)return s;s=s._next}else for(s=e._last;s&&s._start>=a;){if(s.data==="isPause"&&s._start<i)return s;s=s._prev}},No=function(e,i,a,s){var l=e._repeat,c=Pt(i)||0,d=e._tTime/e._tDur;return d&&!s&&(e._time*=c/e._dur),e._dur=c,e._tDur=l?l<0?1e10:Pt(c*(l+1)+e._rDelay*l):c,d>0&&!s&&Bf(e,e._tTime=e._tDur*d),e.parent&&If(e),a||Ss(e.parent,e),e},tS=function(e){return e instanceof Un?Ss(e):No(e,e._dur)},WP={_start:0,endTime:Sc,totalDuration:Sc},$i=function t(e,i,a){var s=e.labels,l=e._recent||WP,c=e.duration()>=Gi?l.endTime(!1):e._dur,d,f,h;return gn(i)&&(isNaN(i)||i in s)?(f=i.charAt(0),h=i.substr(-1)==="%",d=i.indexOf("="),f==="<"||f===">"?(d>=0&&(i=i.replace(/=/,"")),(f==="<"?l._start:l.endTime(l._repeat>=0))+(parseFloat(i.substr(1))||0)*(h?(d<0?l:a).totalDuration()/100:1)):d<0?(i in s||(s[i]=c),s[i]):(f=parseFloat(i.charAt(d-1)+i.substr(d+1)),h&&a&&(f=f/100*(jn(a)?a[0]:a).totalDuration()),d>1?t(e,i.substr(0,d-1),a)+f:c+f)):i==null?c:+i},sc=function(e,i,a){var s=Jr(i[1]),l=(s?2:1)+(e<2?0:1),c=i[l],d,f;if(s&&(c.duration=i[1]),c.parent=a,e){for(d=c,f=a;f&&!("immediateRender"in d);)d=f.vars.defaults||{},f=Jn(f.vars.inherit)&&f.parent;c.immediateRender=Jn(d.immediateRender),e<2?c.runBackwards=1:c.startAt=i[l-1]}return new tn(i[0],c,i[l+1])},Fa=function(e,i){return e||e===0?i(e):i},Hc=function(e,i,a){return a<e?e:a>i?i:a},Ln=function(e,i){return!gn(e)||!(i=VP.exec(e))?"":i[1]},JP=function(e,i,a){return Fa(a,function(s){return Hc(e,i,s)})},q0=[].slice,V3=function(e,i){return e&&Dr(e)&&"length"in e&&(!i&&!e.length||e.length-1 in e&&Dr(e[0]))&&!e.nodeType&&e!==yr},e9=function(e,i,a){return a===void 0&&(a=[]),e.forEach(function(s){var l;return gn(s)&&!i||V3(s,1)?(l=a).push.apply(l,Xi(s)):a.push(s)})||a},Xi=function(e,i,a){return jt&&!i&&jt.selector?jt.selector(e):gn(e)&&!a&&(V0||!zo())?q0.call((i||dy).querySelectorAll(e),0):jn(e)?e9(e,a):V3(e)?q0.call(e,0):e?[e]:[]},Y0=function(e){return e=Xi(e)[0]||wc("Invalid scope")||{},function(i){var a=e.current||e.nativeElement||e;return Xi(i,a.querySelectorAll?a:a===e?wc("Invalid scope")||dy.createElement("div"):e)}},F3=function(e){return e.sort(function(){return .5-Math.random()})},H3=function(e){if($t(e))return e;var i=Dr(e)?e:{each:e},a=_s(i.ease),s=i.from||0,l=parseFloat(i.base)||0,c={},d=s>0&&s<1,f=isNaN(s)||d,h=i.axis,m=s,g=s;return gn(s)?m=g={center:.5,edges:.5,end:1}[s]||0:!d&&f&&(m=s[0],g=s[1]),function(x,_,w){var v=(w||i).length,S=c[v],C,M,R,L,O,j,k,U,I;if(!S){if(I=i.grid==="auto"?0:(i.grid||[1,Gi])[1],!I){for(k=-Gi;k<(k=w[I++].getBoundingClientRect().left)&&I<v;);I<v&&I--}for(S=c[v]=[],C=f?Math.min(I,v)*m-.5:s%I,M=I===Gi?0:f?v*g/I-.5:s/I|0,k=0,U=Gi,j=0;j<v;j++)R=j%I-C,L=M-(j/I|0),S[j]=O=h?Math.abs(h==="y"?L:R):E3(R*R+L*L),O>k&&(k=O),O<U&&(U=O);s==="random"&&F3(S),S.max=k-U,S.min=U,S.v=v=(parseFloat(i.amount)||parseFloat(i.each)*(I>v?v-1:h?h==="y"?v/I:I:Math.max(I,v/I))||0)*(s==="edges"?-1:1),S.b=v<0?l-v:l,S.u=Ln(i.amount||i.each)||0,a=a&&v<0?J3(a):a}return v=(S[x]-S.min)/S.max||0,Pt(S.b+(a?a(v):v)*S.v)+S.u}},G0=function(e){var i=Math.pow(10,((e+"").split(".")[1]||"").length);return function(a){var s=Pt(Math.round(parseFloat(a)/e)*e*i);return(s-s%1)/i+(Jr(a)?0:Ln(a))}},$3=function(e,i){var a=jn(e),s,l;return!a&&Dr(e)&&(s=a=e.radius||Gi,e.values?(e=Xi(e.values),(l=!Jr(e[0]))&&(s*=s)):e=G0(e.increment)),Fa(i,a?$t(e)?function(c){return l=e(c),Math.abs(l-c)<=s?l:c}:function(c){for(var d=parseFloat(l?c.x:c),f=parseFloat(l?c.y:0),h=Gi,m=0,g=e.length,x,_;g--;)l?(x=e[g].x-d,_=e[g].y-f,x=x*x+_*_):x=Math.abs(e[g]-d),x<h&&(h=x,m=g);return m=!s||h<=s?e[m]:c,l||m===c||Jr(c)?m:m+Ln(c)}:G0(e))},q3=function(e,i,a,s){return Fa(jn(e)?!i:a===!0?!!(a=0):!s,function(){return jn(e)?e[~~(Math.random()*e.length)]:(a=a||1e-5)&&(s=a<1?Math.pow(10,(a+"").length-2):1)&&Math.floor(Math.round((e-a/2+Math.random()*(i-e+a*.99))/a)*a*s)/s})},t9=function(){for(var e=arguments.length,i=new Array(e),a=0;a<e;a++)i[a]=arguments[a];return function(s){return i.reduce(function(l,c){return c(l)},s)}},n9=function(e,i){return function(a){return e(parseFloat(a))+(i||Ln(a))}},i9=function(e,i,a){return G3(e,i,0,1,a)},Y3=function(e,i,a){return Fa(a,function(s){return e[~~i(s)]})},r9=function t(e,i,a){var s=i-e;return jn(e)?Y3(e,t(0,e.length),i):Fa(a,function(l){return(s+(l-e)%s)%s+e})},a9=function t(e,i,a){var s=i-e,l=s*2;return jn(e)?Y3(e,t(0,e.length-1),i):Fa(a,function(c){return c=(l+(c-e)%l)%l||0,e+(c>s?l-c:c)})},_c=function(e){return e.replace(UP,function(i){var a=i.indexOf("[")+1,s=i.substring(a||7,a?i.indexOf("]"):i.length-1).split(IP);return q3(a?s:+s[0],a?0:+s[1],+s[2]||1e-5)})},G3=function(e,i,a,s,l){var c=i-e,d=s-a;return Fa(l,function(f){return a+((f-e)/c*d||0)})},s9=function t(e,i,a,s){var l=isNaN(e+i)?0:function(_){return(1-_)*e+_*i};if(!l){var c=gn(e),d={},f,h,m,g,x;if(a===!0&&(s=1)&&(a=null),c)e={p:e},i={p:i};else if(jn(e)&&!jn(i)){for(m=[],g=e.length,x=g-2,h=1;h<g;h++)m.push(t(e[h-1],e[h]));g--,l=function(w){w*=g;var v=Math.min(x,~~w);return m[v](w-v)},a=i}else s||(e=Lo(jn(e)?[]:{},e));if(!m){for(f in i)yy.call(d,e,f,"get",i[f]);l=function(w){return wy(w,d)||(c?e.p:e)}}}return Fa(a,l)},nS=function(e,i,a){var s=e.labels,l=Gi,c,d,f;for(c in s)d=s[c]-i,d<0==!!a&&d&&l>(d=Math.abs(d))&&(f=c,l=d);return f},wi=function(e,i,a){var s=e.vars,l=s[i],c=jt,d=e._ctx,f,h,m;if(l)return f=s[i+"Params"],h=s.callbackScope||e,a&&ja.length&&uf(),d&&(jt=d),m=f?l.apply(h,f):l.call(h),jt=c,m},Jl=function(e){return Ua(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Cn),e.progress()<1&&wi(e,"onInterrupt"),e},wo,X3=[],K3=function(e){if(e)if(e=!e.name&&e.default||e,uy()||e.headless){var i=e.name,a=$t(e),s=i&&!a&&e.init?function(){this._props=[]}:e,l={init:Sc,render:wy,add:yy,kill:S9,modifier:w9,rawVars:0},c={targetTest:0,get:0,getSetter:vy,aliases:{},register:0};if(zo(),e!==s){if(xi[i])return;ki(s,ki(df(e,l),c)),Lo(s.prototype,Lo(l,df(e,c))),xi[s.prop=i]=s,e.targetTest&&(Yd.push(s),hy[i]=1),i=(i==="css"?"CSS":i.charAt(0).toUpperCase()+i.substr(1))+"Plugin"}O3(i,s),e.register&&e.register(ri,s,ti)}else X3.push(e)},wt=255,ec={aqua:[0,wt,wt],lime:[0,wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,wt],navy:[0,0,128],white:[wt,wt,wt],olive:[128,128,0],yellow:[wt,wt,0],orange:[wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[wt,0,0],pink:[wt,192,203],cyan:[0,wt,wt],transparent:[wt,wt,wt,0]},Im=function(e,i,a){return e+=e<0?1:e>1?-1:0,(e*6<1?i+(a-i)*e*6:e<.5?a:e*3<2?i+(a-i)*(2/3-e)*6:i)*wt+.5|0},Z3=function(e,i,a){var s=e?Jr(e)?[e>>16,e>>8&wt,e&wt]:0:ec.black,l,c,d,f,h,m,g,x,_,w;if(!s){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ec[e])s=ec[e];else if(e.charAt(0)==="#"){if(e.length<6&&(l=e.charAt(1),c=e.charAt(2),d=e.charAt(3),e="#"+l+l+c+c+d+d+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return s=parseInt(e.substr(1,6),16),[s>>16,s>>8&wt,s&wt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),s=[e>>16,e>>8&wt,e&wt]}else if(e.substr(0,3)==="hsl"){if(s=w=e.match(Qw),!i)f=+s[0]%360/360,h=+s[1]/100,m=+s[2]/100,c=m<=.5?m*(h+1):m+h-m*h,l=m*2-c,s.length>3&&(s[3]*=1),s[0]=Im(f+1/3,l,c),s[1]=Im(f,l,c),s[2]=Im(f-1/3,l,c);else if(~e.indexOf("="))return s=e.match(k3),a&&s.length<4&&(s[3]=1),s}else s=e.match(Qw)||ec.transparent;s=s.map(Number)}return i&&!w&&(l=s[0]/wt,c=s[1]/wt,d=s[2]/wt,g=Math.max(l,c,d),x=Math.min(l,c,d),m=(g+x)/2,g===x?f=h=0:(_=g-x,h=m>.5?_/(2-g-x):_/(g+x),f=g===l?(c-d)/_+(c<d?6:0):g===c?(d-l)/_+2:(l-c)/_+4,f*=60),s[0]=~~(f+.5),s[1]=~~(h*100+.5),s[2]=~~(m*100+.5)),a&&s.length<4&&(s[3]=1),s},Q3=function(e){var i=[],a=[],s=-1;return e.split(Na).forEach(function(l){var c=l.match(vo)||[];i.push.apply(i,c),a.push(s+=c.length+1)}),i.c=a,i},iS=function(e,i,a){var s="",l=(e+s).match(Na),c=i?"hsla(":"rgba(",d=0,f,h,m,g;if(!l)return e;if(l=l.map(function(x){return(x=Z3(x,i,1))&&c+(i?x[0]+","+x[1]+"%,"+x[2]+"%,"+x[3]:x.join(","))+")"}),a&&(m=Q3(e),f=a.c,f.join(s)!==m.c.join(s)))for(h=e.replace(Na,"1").split(vo),g=h.length-1;d<g;d++)s+=h[d]+(~f.indexOf(d)?l.shift()||c+"0,0,0,0)":(m.length?m:l.length?l:a).shift());if(!h)for(h=e.split(Na),g=h.length-1;d<g;d++)s+=h[d]+l[d];return s+h[g]},Na=(function(){var t="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ec)t+="|"+e+"\\b";return new RegExp(t+")","gi")})(),o9=/hsl[a]?\(/,W3=function(e){var i=e.join(" "),a;if(Na.lastIndex=0,Na.test(i))return a=o9.test(i),e[1]=iS(e[1],a),e[0]=iS(e[0],a,Q3(e[1])),!0},Tc,bi=(function(){var t=Date.now,e=500,i=33,a=t(),s=a,l=1e3/240,c=l,d=[],f,h,m,g,x,_,w=function v(S){var C=t()-s,M=S===!0,R,L,O,j;if((C>e||C<0)&&(a+=C-i),s+=C,O=s-a,R=O-c,(R>0||M)&&(j=++g.frame,x=O-g.time*1e3,g.time=O=O/1e3,c+=R+(R>=l?4:l-R),L=1),M||(f=h(v)),L)for(_=0;_<d.length;_++)d[_](O,x,j,S)};return g={time:0,frame:0,tick:function(){w(!0)},deltaRatio:function(S){return x/(1e3/(S||60))},wake:function(){R3&&(!V0&&uy()&&(yr=V0=window,dy=yr.document||{},Ci.gsap=ri,(yr.gsapVersions||(yr.gsapVersions=[])).push(ri.version),D3(cf||yr.GreenSockGlobals||!yr.gsap&&yr||{}),X3.forEach(K3)),m=typeof requestAnimationFrame<"u"&&requestAnimationFrame,f&&g.sleep(),h=m||function(S){return setTimeout(S,c-g.time*1e3+1|0)},Tc=1,w(2))},sleep:function(){(m?cancelAnimationFrame:clearTimeout)(f),Tc=0,h=Sc},lagSmoothing:function(S,C){e=S||1/0,i=Math.min(C||33,e)},fps:function(S){l=1e3/(S||240),c=g.time*1e3+l},add:function(S,C,M){var R=C?function(L,O,j,k){S(L,O,j,k),g.remove(R)}:S;return g.remove(S),d[M?"unshift":"push"](R),zo(),R},remove:function(S,C){~(C=d.indexOf(S))&&d.splice(C,1)&&_>=C&&_--},_listeners:d},g})(),zo=function(){return!Tc&&bi.wake()},We={},l9=/^[\d.\-M][\d.\-,\s]/,c9=/["']/g,u9=function(e){for(var i={},a=e.substr(1,e.length-3).split(":"),s=a[0],l=1,c=a.length,d,f,h;l<c;l++)f=a[l],d=l!==c-1?f.lastIndexOf(","):f.length,h=f.substr(0,d),i[s]=isNaN(h)?h.replace(c9,"").trim():+h,s=f.substr(d+1).trim();return i},d9=function(e){var i=e.indexOf("(")+1,a=e.indexOf(")"),s=e.indexOf("(",i);return e.substring(i,~s&&s<a?e.indexOf(")",a+1):a)},f9=function(e){var i=(e+"").split("("),a=We[i[0]];return a&&i.length>1&&a.config?a.config.apply(null,~e.indexOf("{")?[u9(i[1])]:d9(e).split(",").map(N3)):We._CE&&l9.test(e)?We._CE("",e):a},J3=function(e){return function(i){return 1-e(1-i)}},eE=function t(e,i){for(var a=e._first,s;a;)a instanceof Un?t(a,i):a.vars.yoyoEase&&(!a._yoyo||!a._repeat)&&a._yoyo!==i&&(a.timeline?t(a.timeline,i):(s=a._ease,a._ease=a._yEase,a._yEase=s,a._yoyo=i)),a=a._next},_s=function(e,i){return e&&($t(e)?e:We[e]||f9(e))||i},As=function(e,i,a,s){a===void 0&&(a=function(f){return 1-i(1-f)}),s===void 0&&(s=function(f){return f<.5?i(f*2)/2:1-i((1-f)*2)/2});var l={easeIn:i,easeOut:a,easeInOut:s},c;return ei(e,function(d){We[d]=Ci[d]=l,We[c=d.toLowerCase()]=a;for(var f in l)We[c+(f==="easeIn"?".in":f==="easeOut"?".out":".inOut")]=We[d+"."+f]=l[f]}),l},tE=function(e){return function(i){return i<.5?(1-e(1-i*2))/2:.5+e((i-.5)*2)/2}},Bm=function t(e,i,a){var s=i>=1?i:1,l=(a||(e?.3:.45))/(i<1?i:1),c=l/B0*(Math.asin(1/s)||0),d=function(m){return m===1?1:s*Math.pow(2,-10*m)*PP((m-c)*l)+1},f=e==="out"?d:e==="in"?function(h){return 1-d(1-h)}:tE(d);return l=B0/l,f.config=function(h,m){return t(e,h,m)},f},Vm=function t(e,i){i===void 0&&(i=1.70158);var a=function(c){return c?--c*c*((i+1)*c+i)+1:0},s=e==="out"?a:e==="in"?function(l){return 1-a(1-l)}:tE(a);return s.config=function(l){return t(e,l)},s};ei("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var i=e<5?e+1:e;As(t+",Power"+(i-1),e?function(a){return Math.pow(a,i)}:function(a){return a},function(a){return 1-Math.pow(1-a,i)},function(a){return a<.5?Math.pow(a*2,i)/2:1-Math.pow((1-a)*2,i)/2})});We.Linear.easeNone=We.none=We.Linear.easeIn;As("Elastic",Bm("in"),Bm("out"),Bm());(function(t,e){var i=1/e,a=2*i,s=2.5*i,l=function(d){return d<i?t*d*d:d<a?t*Math.pow(d-1.5/e,2)+.75:d<s?t*(d-=2.25/e)*d+.9375:t*Math.pow(d-2.625/e,2)+.984375};As("Bounce",function(c){return 1-l(1-c)},l)})(7.5625,2.75);As("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)});As("Circ",function(t){return-(E3(1-t*t)-1)});As("Sine",function(t){return t===1?1:-zP(t*jP)+1});As("Back",Vm("in"),Vm("out"),Vm());We.SteppedEase=We.steps=Ci.SteppedEase={config:function(e,i){e===void 0&&(e=1);var a=1/e,s=e+(i?0:1),l=i?1:0,c=1-St;return function(d){return((s*Hc(0,c,d)|0)+l)*a}}};Mo.ease=We["quad.out"];ei("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return py+=t+","+t+"Params,"});var nE=function(e,i){this.id=NP++,e._gsap=this,this.target=e,this.harness=i,this.get=i?i.get:L3,this.set=i?i.getSetter:vy},Ec=(function(){function t(i){this.vars=i,this._delay=+i.delay||0,(this._repeat=i.repeat===1/0?-2:i.repeat||0)&&(this._rDelay=i.repeatDelay||0,this._yoyo=!!i.yoyo||!!i.yoyoEase),this._ts=1,No(this,+i.duration,1,1),this.data=i.data,jt&&(this._ctx=jt,jt.data.push(this)),Tc||bi.wake()}var e=t.prototype;return e.delay=function(a){return a||a===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+a-this._delay),this._delay=a,this):this._delay},e.duration=function(a){return arguments.length?this.totalDuration(this._repeat>0?a+(a+this._rDelay)*this._repeat:a):this.totalDuration()&&this._dur},e.totalDuration=function(a){return arguments.length?(this._dirty=0,No(this,this._repeat<0?a:(a-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(a,s){if(zo(),!arguments.length)return this._tTime;var l=this._dp;if(l&&l.smoothChildTiming&&this._ts){for(Bf(this,a),!l._dp||l.parent||U3(l,this);l&&l.parent;)l.parent._time!==l._start+(l._ts>=0?l._tTime/l._ts:(l.totalDuration()-l._tTime)/-l._ts)&&l.totalTime(l._tTime,!0),l=l.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&a<this._tDur||this._ts<0&&a>0||!this._tDur&&!a)&&_r(this._dp,this,this._start-this._delay)}return(this._tTime!==a||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===St||!this._initted&&this._dur&&a||!a&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=a),j3(this,a,s)),this},e.time=function(a,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),a+eS(this))%(this._dur+this._rDelay)||(a?this._dur:0),s):this._time},e.totalProgress=function(a,s){return arguments.length?this.totalTime(this.totalDuration()*a,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(a,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-a:a)+eS(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(a,s){var l=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(a-1)*l,s):this._repeat?jo(this._tTime,l)+1:1},e.timeScale=function(a,s){if(!arguments.length)return this._rts===-St?0:this._rts;if(this._rts===a)return this;var l=this.parent&&this._ts?ff(this.parent._time,this):this._tTime;return this._rts=+a||0,this._ts=this._ps||a===-St?0:this._rts,this.totalTime(Hc(-Math.abs(this._delay),this.totalDuration(),l),s!==!1),If(this),GP(this)},e.paused=function(a){return arguments.length?(this._ps!==a&&(this._ps=a,a?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(zo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==St&&(this._tTime-=St)))),this):this._ps},e.startTime=function(a){if(arguments.length){this._start=Pt(a);var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&_r(s,this,this._start-this._delay),this}return this._start},e.endTime=function(a){return this._start+(Jn(a)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(a){var s=this.parent||this._dp;return s?a&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ff(s.rawTime(a),this):this._tTime:this._tTime},e.revert=function(a){a===void 0&&(a=HP);var s=Cn;return Cn=a,gy(this)&&(this.timeline&&this.timeline.revert(a),this.totalTime(-.01,a.suppressEvents)),this.data!=="nested"&&a.kill!==!1&&this.kill(),Cn=s,this},e.globalTime=function(a){for(var s=this,l=arguments.length?a:s.rawTime();s;)l=s._start+l/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(a):l},e.repeat=function(a){return arguments.length?(this._repeat=a===1/0?-2:a,tS(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(a){if(arguments.length){var s=this._time;return this._rDelay=a,tS(this),s?this.time(s):this}return this._rDelay},e.yoyo=function(a){return arguments.length?(this._yoyo=a,this):this._yoyo},e.seek=function(a,s){return this.totalTime($i(this,a),Jn(s))},e.restart=function(a,s){return this.play().totalTime(a?-this._delay:0,Jn(s)),this._dur||(this._zTime=-St),this},e.play=function(a,s){return a!=null&&this.seek(a,s),this.reversed(!1).paused(!1)},e.reverse=function(a,s){return a!=null&&this.seek(a||this.totalDuration(),s),this.reversed(!0).paused(!1)},e.pause=function(a,s){return a!=null&&this.seek(a,s),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(a){return arguments.length?(!!a!==this.reversed()&&this.timeScale(-this._rts||(a?-St:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-St,this},e.isActive=function(){var a=this.parent||this._dp,s=this._start,l;return!!(!a||this._ts&&this._initted&&a.isActive()&&(l=a.rawTime(!0))>=s&&l<this.endTime(!0)-St)},e.eventCallback=function(a,s,l){var c=this.vars;return arguments.length>1?(s?(c[a]=s,l&&(c[a+"Params"]=l),a==="onUpdate"&&(this._onUpdate=s)):delete c[a],this):c[a]},e.then=function(a){var s=this,l=s._prom;return new Promise(function(c){var d=$t(a)?a:z3,f=function(){var m=s.then;s.then=null,l&&l(),$t(d)&&(d=d(s))&&(d.then||d===s)&&(s.then=m),c(d),s.then=m};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?f():s._prom=f})},e.kill=function(){Jl(this)},t})();ki(Ec.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-St,_prom:0,_ps:!1,_rts:1});var Un=(function(t){T3(e,t);function e(a,s){var l;return a===void 0&&(a={}),l=t.call(this,a)||this,l.labels={},l.smoothChildTiming=!!a.smoothChildTiming,l.autoRemoveChildren=!!a.autoRemoveChildren,l._sort=Jn(a.sortChildren),Ut&&_r(a.parent||Ut,Kr(l),s),a.reversed&&l.reverse(),a.paused&&l.paused(!0),a.scrollTrigger&&I3(Kr(l),a.scrollTrigger),l}var i=e.prototype;return i.to=function(s,l,c){return sc(0,arguments,this),this},i.from=function(s,l,c){return sc(1,arguments,this),this},i.fromTo=function(s,l,c,d){return sc(2,arguments,this),this},i.set=function(s,l,c){return l.duration=0,l.parent=this,ac(l).repeatDelay||(l.repeat=0),l.immediateRender=!!l.immediateRender,new tn(s,l,$i(this,c),1),this},i.call=function(s,l,c){return _r(this,tn.delayedCall(0,s,l),c)},i.staggerTo=function(s,l,c,d,f,h,m){return c.duration=l,c.stagger=c.stagger||d,c.onComplete=h,c.onCompleteParams=m,c.parent=this,new tn(s,c,$i(this,f)),this},i.staggerFrom=function(s,l,c,d,f,h,m){return c.runBackwards=1,ac(c).immediateRender=Jn(c.immediateRender),this.staggerTo(s,l,c,d,f,h,m)},i.staggerFromTo=function(s,l,c,d,f,h,m,g){return d.startAt=c,ac(d).immediateRender=Jn(d.immediateRender),this.staggerTo(s,l,d,f,h,m,g)},i.render=function(s,l,c){var d=this._time,f=this._dirty?this.totalDuration():this._tDur,h=this._dur,m=s<=0?0:Pt(s),g=this._zTime<0!=s<0&&(this._initted||!h),x,_,w,v,S,C,M,R,L,O,j,k;if(this!==Ut&&m>f&&s>=0&&(m=f),m!==this._tTime||c||g){if(d!==this._time&&h&&(m+=this._time-d,s+=this._time-d),x=m,L=this._start,R=this._ts,C=!R,g&&(h||(d=this._zTime),(s||!l)&&(this._zTime=s)),this._repeat){if(j=this._yoyo,S=h+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(S*100+s,l,c);if(x=Pt(m%S),m===f?(v=this._repeat,x=h):(O=Pt(m/S),v=~~O,v&&v===O&&(x=h,v--),x>h&&(x=h)),O=jo(this._tTime,S),!d&&this._tTime&&O!==v&&this._tTime-O*S-this._dur<=0&&(O=v),j&&v&1&&(x=h-x,k=1),v!==O&&!this._lock){var U=j&&O&1,I=U===(j&&v&1);if(v<O&&(U=!U),d=U?0:m%h?h:m,this._lock=1,this.render(d||(k?0:Pt(v*S)),l,!h)._lock=0,this._tTime=m,!l&&this.parent&&wi(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,O=v),d&&d!==this._time||C!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(h=this._dur,f=this._tDur,I&&(this._lock=2,d=U?h:-1e-4,this.render(d,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!C)return this;eE(this,k)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=QP(this,Pt(d),Pt(x)),M&&(m-=x-(x=M._start))),this._tTime=m,this._time=x,this._act=!R,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,d=0),!d&&m&&h&&!l&&!O&&(wi(this,"onStart"),this._tTime!==m))return this;if(x>=d&&s>=0)for(_=this._first;_;){if(w=_._next,(_._act||x>=_._start)&&_._ts&&M!==_){if(_.parent!==this)return this.render(s,l,c);if(_.render(_._ts>0?(x-_._start)*_._ts:(_._dirty?_.totalDuration():_._tDur)+(x-_._start)*_._ts,l,c),x!==this._time||!this._ts&&!C){M=0,w&&(m+=this._zTime=-St);break}}_=w}else{_=this._last;for(var Y=s<0?s:x;_;){if(w=_._prev,(_._act||Y<=_._end)&&_._ts&&M!==_){if(_.parent!==this)return this.render(s,l,c);if(_.render(_._ts>0?(Y-_._start)*_._ts:(_._dirty?_.totalDuration():_._tDur)+(Y-_._start)*_._ts,l,c||Cn&&gy(_)),x!==this._time||!this._ts&&!C){M=0,w&&(m+=this._zTime=Y?-St:St);break}}_=w}}if(M&&!l&&(this.pause(),M.render(x>=d?0:-St)._zTime=x>=d?1:-1,this._ts))return this._start=L,If(this),this.render(s,l,c);this._onUpdate&&!l&&wi(this,"onUpdate",!0),(m===f&&this._tTime>=this.totalDuration()||!m&&d)&&(L===this._start||Math.abs(R)!==Math.abs(this._ts))&&(this._lock||((s||!h)&&(m===f&&this._ts>0||!m&&this._ts<0)&&Ua(this,1),!l&&!(s<0&&!d)&&(m||d||!f)&&(wi(this,m===f&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(m<f&&this.timeScale()>0)&&this._prom())))}return this},i.add=function(s,l){var c=this;if(Jr(l)||(l=$i(this,l,s)),!(s instanceof Ec)){if(jn(s))return s.forEach(function(d){return c.add(d,l)}),this;if(gn(s))return this.addLabel(s,l);if($t(s))s=tn.delayedCall(0,s);else return this}return this!==s?_r(this,s,l):this},i.getChildren=function(s,l,c,d){s===void 0&&(s=!0),l===void 0&&(l=!0),c===void 0&&(c=!0),d===void 0&&(d=-Gi);for(var f=[],h=this._first;h;)h._start>=d&&(h instanceof tn?l&&f.push(h):(c&&f.push(h),s&&f.push.apply(f,h.getChildren(!0,l,c)))),h=h._next;return f},i.getById=function(s){for(var l=this.getChildren(1,1,1),c=l.length;c--;)if(l[c].vars.id===s)return l[c]},i.remove=function(s){return gn(s)?this.removeLabel(s):$t(s)?this.killTweensOf(s):(s.parent===this&&Uf(this,s),s===this._recent&&(this._recent=this._last),Ss(this))},i.totalTime=function(s,l){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Pt(bi.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),t.prototype.totalTime.call(this,s,l),this._forcing=0,this):this._tTime},i.addLabel=function(s,l){return this.labels[s]=$i(this,l),this},i.removeLabel=function(s){return delete this.labels[s],this},i.addPause=function(s,l,c){var d=tn.delayedCall(0,l||Sc,c);return d.data="isPause",this._hasPause=1,_r(this,d,$i(this,s))},i.removePause=function(s){var l=this._first;for(s=$i(this,s);l;)l._start===s&&l.data==="isPause"&&Ua(l),l=l._next},i.killTweensOf=function(s,l,c){for(var d=this.getTweensOf(s,c),f=d.length;f--;)Ra!==d[f]&&d[f].kill(s,l);return this},i.getTweensOf=function(s,l){for(var c=[],d=Xi(s),f=this._first,h=Jr(l),m;f;)f instanceof tn?$P(f._targets,d)&&(h?(!Ra||f._initted&&f._ts)&&f.globalTime(0)<=l&&f.globalTime(f.totalDuration())>l:!l||f.isActive())&&c.push(f):(m=f.getTweensOf(d,l)).length&&c.push.apply(c,m),f=f._next;return c},i.tweenTo=function(s,l){l=l||{};var c=this,d=$i(c,s),f=l,h=f.startAt,m=f.onStart,g=f.onStartParams,x=f.immediateRender,_,w=tn.to(c,ki({ease:l.ease||"none",lazy:!1,immediateRender:!1,time:d,overwrite:"auto",duration:l.duration||Math.abs((d-(h&&"time"in h?h.time:c._time))/c.timeScale())||St,onStart:function(){if(c.pause(),!_){var S=l.duration||Math.abs((d-(h&&"time"in h?h.time:c._time))/c.timeScale());w._dur!==S&&No(w,S,0,1).render(w._time,!0,!0),_=1}m&&m.apply(w,g||[])}},l));return x?w.render(0):w},i.tweenFromTo=function(s,l,c){return this.tweenTo(l,ki({startAt:{time:$i(this,s)}},c))},i.recent=function(){return this._recent},i.nextLabel=function(s){return s===void 0&&(s=this._time),nS(this,$i(this,s))},i.previousLabel=function(s){return s===void 0&&(s=this._time),nS(this,$i(this,s),1)},i.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+St)},i.shiftChildren=function(s,l,c){c===void 0&&(c=0);var d=this._first,f=this.labels,h;for(s=Pt(s);d;)d._start>=c&&(d._start+=s,d._end+=s),d=d._next;if(l)for(h in f)f[h]>=c&&(f[h]+=s);return Ss(this)},i.invalidate=function(s){var l=this._first;for(this._lock=0;l;)l.invalidate(s),l=l._next;return t.prototype.invalidate.call(this,s)},i.clear=function(s){s===void 0&&(s=!0);for(var l=this._first,c;l;)c=l._next,this.remove(l),l=c;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),Ss(this)},i.totalDuration=function(s){var l=0,c=this,d=c._last,f=Gi,h,m,g;if(arguments.length)return c.timeScale((c._repeat<0?c.duration():c.totalDuration())/(c.reversed()?-s:s));if(c._dirty){for(g=c.parent;d;)h=d._prev,d._dirty&&d.totalDuration(),m=d._start,m>f&&c._sort&&d._ts&&!c._lock?(c._lock=1,_r(c,d,m-d._delay,1)._lock=0):f=m,m<0&&d._ts&&(l-=m,(!g&&!c._dp||g&&g.smoothChildTiming)&&(c._start+=Pt(m/c._ts),c._time-=m,c._tTime-=m),c.shiftChildren(-m,!1,-1/0),f=0),d._end>l&&d._ts&&(l=d._end),d=h;No(c,c===Ut&&c._time>l?c._time:l,1,1),c._dirty=0}return c._tDur},e.updateRoot=function(s){if(Ut._ts&&(j3(Ut,ff(s,Ut)),M3=bi.frame),bi.frame>=Ww){Ww+=Ei.autoSleep||120;var l=Ut._first;if((!l||!l._ts)&&Ei.autoSleep&&bi._listeners.length<2){for(;l&&!l._ts;)l=l._next;l||bi.sleep()}}},e})(Ec);ki(Un.prototype,{_lock:0,_hasPause:0,_forcing:0});var h9=function(e,i,a,s,l,c,d){var f=new ti(this._pt,e,i,0,1,lE,null,l),h=0,m=0,g,x,_,w,v,S,C,M;for(f.b=a,f.e=s,a+="",s+="",(C=~s.indexOf("random("))&&(s=_c(s)),c&&(M=[a,s],c(M,e,i),a=M[0],s=M[1]),x=a.match(Pm)||[];g=Pm.exec(s);)w=g[0],v=s.substring(h,g.index),_?_=(_+1)%5:v.substr(-5)==="rgba("&&(_=1),w!==x[m++]&&(S=parseFloat(x[m-1])||0,f._pt={_next:f._pt,p:v||m===1?v:",",s:S,c:w.charAt(1)==="="?To(S,w)-S:parseFloat(w)-S,m:_&&_<4?Math.round:0},h=Pm.lastIndex);return f.c=h<s.length?s.substring(h,s.length):"",f.fp=d,(A3.test(s)||C)&&(f.e=0),this._pt=f,f},yy=function(e,i,a,s,l,c,d,f,h,m){$t(s)&&(s=s(l||0,e,c));var g=e[i],x=a!=="get"?a:$t(g)?h?e[i.indexOf("set")||!$t(e["get"+i.substr(3)])?i:"get"+i.substr(3)](h):e[i]():g,_=$t(g)?h?x9:sE:by,w;if(gn(s)&&(~s.indexOf("random(")&&(s=_c(s)),s.charAt(1)==="="&&(w=To(x,s)+(Ln(x)||0),(w||w===0)&&(s=w))),!m||x!==s||X0)return!isNaN(x*s)&&s!==""?(w=new ti(this._pt,e,i,+x||0,s-(x||0),typeof g=="boolean"?v9:oE,0,_),h&&(w.fp=h),d&&w.modifier(d,this,e),this._pt=w):(!g&&!(i in e)&&fy(i,s),h9.call(this,e,i,x,s,_,f||Ei.stringFilter,h))},p9=function(e,i,a,s,l){if($t(e)&&(e=oc(e,l,i,a,s)),!Dr(e)||e.style&&e.nodeType||jn(e)||C3(e))return gn(e)?oc(e,l,i,a,s):e;var c={},d;for(d in e)c[d]=oc(e[d],l,i,a,s);return c},iE=function(e,i,a,s,l,c){var d,f,h,m;if(xi[e]&&(d=new xi[e]).init(l,d.rawVars?i[e]:p9(i[e],s,l,c,a),a,s,c)!==!1&&(a._pt=f=new ti(a._pt,l,e,0,1,d.render,d,0,d.priority),a!==wo))for(h=a._ptLookup[a._targets.indexOf(l)],m=d._props.length;m--;)h[d._props[m]]=f;return d},Ra,X0,xy=function t(e,i,a){var s=e.vars,l=s.ease,c=s.startAt,d=s.immediateRender,f=s.lazy,h=s.onUpdate,m=s.runBackwards,g=s.yoyoEase,x=s.keyframes,_=s.autoRevert,w=e._dur,v=e._startAt,S=e._targets,C=e.parent,M=C&&C.data==="nested"?C.vars.targets:S,R=e._overwrite==="auto"&&!ly,L=e.timeline,O,j,k,U,I,Y,W,te,me,we,Se,z,B;if(L&&(!x||!l)&&(l="none"),e._ease=_s(l,Mo.ease),e._yEase=g?J3(_s(g===!0?l:g,Mo.ease)):0,g&&e._yoyo&&!e._repeat&&(g=e._yEase,e._yEase=e._ease,e._ease=g),e._from=!L&&!!s.runBackwards,!L||x&&!s.stagger){if(te=S[0]?ws(S[0]).harness:0,z=te&&s[te.prop],O=df(s,hy),v&&(v._zTime<0&&v.progress(1),i<0&&m&&d&&!_?v.render(-1,!0):v.revert(m&&w?qd:FP),v._lazy=0),c){if(Ua(e._startAt=tn.set(S,ki({data:"isStart",overwrite:!1,parent:C,immediateRender:!0,lazy:!v&&Jn(f),startAt:null,delay:0,onUpdate:h&&function(){return wi(e,"onUpdate")},stagger:0},c))),e._startAt._dp=0,e._startAt._sat=e,i<0&&(Cn||!d&&!_)&&e._startAt.revert(qd),d&&w&&i<=0&&a<=0){i&&(e._zTime=i);return}}else if(m&&w&&!v){if(i&&(d=!1),k=ki({overwrite:!1,data:"isFromStart",lazy:d&&!v&&Jn(f),immediateRender:d,stagger:0,parent:C},O),z&&(k[te.prop]=z),Ua(e._startAt=tn.set(S,k)),e._startAt._dp=0,e._startAt._sat=e,i<0&&(Cn?e._startAt.revert(qd):e._startAt.render(-1,!0)),e._zTime=i,!d)t(e._startAt,St,St);else if(!i)return}for(e._pt=e._ptCache=0,f=w&&Jn(f)||f&&!w,j=0;j<S.length;j++){if(I=S[j],W=I._gsap||my(S)[j]._gsap,e._ptLookup[j]=we={},F0[W.id]&&ja.length&&uf(),Se=M===S?j:M.indexOf(I),te&&(me=new te).init(I,z||O,e,Se,M)!==!1&&(e._pt=U=new ti(e._pt,I,me.name,0,1,me.render,me,0,me.priority),me._props.forEach(function($){we[$]=U}),me.priority&&(Y=1)),!te||z)for(k in O)xi[k]&&(me=iE(k,O,e,Se,I,M))?me.priority&&(Y=1):we[k]=U=yy.call(e,I,k,"get",O[k],Se,M,0,s.stringFilter);e._op&&e._op[j]&&e.kill(I,e._op[j]),R&&e._pt&&(Ra=e,Ut.killTweensOf(I,we,e.globalTime(i)),B=!e.parent,Ra=0),e._pt&&f&&(F0[W.id]=1)}Y&&cE(e),e._onInit&&e._onInit(e)}e._onUpdate=h,e._initted=(!e._op||e._pt)&&!B,x&&i<=0&&L.render(Gi,!0,!0)},m9=function(e,i,a,s,l,c,d,f){var h=(e._pt&&e._ptCache||(e._ptCache={}))[i],m,g,x,_;if(!h)for(h=e._ptCache[i]=[],x=e._ptLookup,_=e._targets.length;_--;){if(m=x[_][i],m&&m.d&&m.d._pt)for(m=m.d._pt;m&&m.p!==i&&m.fp!==i;)m=m._next;if(!m)return X0=1,e.vars[i]="+=0",xy(e,d),X0=0,f?wc(i+" not eligible for reset"):1;h.push(m)}for(_=h.length;_--;)g=h[_],m=g._pt||g,m.s=(s||s===0)&&!l?s:m.s+(s||0)+c*m.c,m.c=a-m.s,g.e&&(g.e=Gt(a)+Ln(g.e)),g.b&&(g.b=m.s+Ln(g.b))},g9=function(e,i){var a=e[0]?ws(e[0]).harness:0,s=a&&a.aliases,l,c,d,f;if(!s)return i;l=Lo({},i);for(c in s)if(c in l)for(f=s[c].split(","),d=f.length;d--;)l[f[d]]=l[c];return l},y9=function(e,i,a,s){var l=i.ease||s||"power1.inOut",c,d;if(jn(i))d=a[e]||(a[e]=[]),i.forEach(function(f,h){return d.push({t:h/(i.length-1)*100,v:f,e:l})});else for(c in i)d=a[c]||(a[c]=[]),c==="ease"||d.push({t:parseFloat(e),v:i[c],e:l})},oc=function(e,i,a,s,l){return $t(e)?e.call(i,a,s,l):gn(e)&&~e.indexOf("random(")?_c(e):e},rE=py+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",aE={};ei(rE+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return aE[t]=1});var tn=(function(t){T3(e,t);function e(a,s,l,c){var d;typeof s=="number"&&(l.duration=s,s=l,l=null),d=t.call(this,c?s:ac(s))||this;var f=d.vars,h=f.duration,m=f.delay,g=f.immediateRender,x=f.stagger,_=f.overwrite,w=f.keyframes,v=f.defaults,S=f.scrollTrigger,C=f.yoyoEase,M=s.parent||Ut,R=(jn(a)||C3(a)?Jr(a[0]):"length"in s)?[a]:Xi(a),L,O,j,k,U,I,Y,W;if(d._targets=R.length?my(R):wc("GSAP target "+a+" not found. https://gsap.com",!Ei.nullTargetWarn)||[],d._ptLookup=[],d._overwrite=_,w||x||md(h)||md(m)){if(s=d.vars,L=d.timeline=new Un({data:"nested",defaults:v||{},targets:M&&M.data==="nested"?M.vars.targets:R}),L.kill(),L.parent=L._dp=Kr(d),L._start=0,x||md(h)||md(m)){if(k=R.length,Y=x&&H3(x),Dr(x))for(U in x)~rE.indexOf(U)&&(W||(W={}),W[U]=x[U]);for(O=0;O<k;O++)j=df(s,aE),j.stagger=0,C&&(j.yoyoEase=C),W&&Lo(j,W),I=R[O],j.duration=+oc(h,Kr(d),O,I,R),j.delay=(+oc(m,Kr(d),O,I,R)||0)-d._delay,!x&&k===1&&j.delay&&(d._delay=m=j.delay,d._start+=m,j.delay=0),L.to(I,j,Y?Y(O,I,R):0),L._ease=We.none;L.duration()?h=m=0:d.timeline=0}else if(w){ac(ki(L.vars.defaults,{ease:"none"})),L._ease=_s(w.ease||s.ease||"none");var te=0,me,we,Se;if(jn(w))w.forEach(function(z){return L.to(R,z,">")}),L.duration();else{j={};for(U in w)U==="ease"||U==="easeEach"||y9(U,w[U],j,w.easeEach);for(U in j)for(me=j[U].sort(function(z,B){return z.t-B.t}),te=0,O=0;O<me.length;O++)we=me[O],Se={ease:we.e,duration:(we.t-(O?me[O-1].t:0))/100*h},Se[U]=we.v,L.to(R,Se,te),te+=Se.duration;L.duration()<h&&L.to({},{duration:h-L.duration()})}}h||d.duration(h=L.duration())}else d.timeline=0;return _===!0&&!ly&&(Ra=Kr(d),Ut.killTweensOf(R),Ra=0),_r(M,Kr(d),l),s.reversed&&d.reverse(),s.paused&&d.paused(!0),(g||!h&&!w&&d._start===Pt(M._time)&&Jn(g)&&XP(Kr(d))&&M.data!=="nested")&&(d._tTime=-St,d.render(Math.max(0,-m)||0)),S&&I3(Kr(d),S),d}var i=e.prototype;return i.render=function(s,l,c){var d=this._time,f=this._tDur,h=this._dur,m=s<0,g=s>f-St&&!m?f:s<St?0:s,x,_,w,v,S,C,M,R,L;if(!h)ZP(this,s,l,c);else if(g!==this._tTime||!s||c||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==m||this._lazy){if(x=g,R=this.timeline,this._repeat){if(v=h+this._rDelay,this._repeat<-1&&m)return this.totalTime(v*100+s,l,c);if(x=Pt(g%v),g===f?(w=this._repeat,x=h):(S=Pt(g/v),w=~~S,w&&w===S?(x=h,w--):x>h&&(x=h)),C=this._yoyo&&w&1,C&&(L=this._yEase,x=h-x),S=jo(this._tTime,v),x===d&&!c&&this._initted&&w===S)return this._tTime=g,this;w!==S&&(R&&this._yEase&&eE(R,C),this.vars.repeatRefresh&&!C&&!this._lock&&x!==v&&this._initted&&(this._lock=c=1,this.render(Pt(v*w),!0).invalidate()._lock=0))}if(!this._initted){if(B3(this,m?s:x,c,l,g))return this._tTime=0,this;if(d!==this._time&&!(c&&this.vars.repeatRefresh&&w!==S))return this;if(h!==this._dur)return this.render(s,l,c)}if(this._tTime=g,this._time=x,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(L||this._ease)(x/h),this._from&&(this.ratio=M=1-M),!d&&g&&!l&&!S&&(wi(this,"onStart"),this._tTime!==g))return this;for(_=this._pt;_;)_.r(M,_.d),_=_._next;R&&R.render(s<0?s:R._dur*R._ease(x/this._dur),l,c)||this._startAt&&(this._zTime=s),this._onUpdate&&!l&&(m&&H0(this,s,l,c),wi(this,"onUpdate")),this._repeat&&w!==S&&this.vars.onRepeat&&!l&&this.parent&&wi(this,"onRepeat"),(g===this._tDur||!g)&&this._tTime===g&&(m&&!this._onUpdate&&H0(this,s,!0,!0),(s||!h)&&(g===this._tDur&&this._ts>0||!g&&this._ts<0)&&Ua(this,1),!l&&!(m&&!d)&&(g||d||C)&&(wi(this,g===f?"onComplete":"onReverseComplete",!0),this._prom&&!(g<f&&this.timeScale()>0)&&this._prom()))}return this},i.targets=function(){return this._targets},i.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),t.prototype.invalidate.call(this,s)},i.resetTo=function(s,l,c,d,f){Tc||bi.wake(),this._ts||this.play();var h=Math.min(this._dur,(this._dp._time-this._start)*this._ts),m;return this._initted||xy(this,h),m=this._ease(h/this._dur),m9(this,s,l,c,d,m,h,f)?this.resetTo(s,l,c,d,1):(Bf(this,0),this.parent||P3(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},i.kill=function(s,l){if(l===void 0&&(l="all"),!s&&(!l||l==="all"))return this._lazy=this._pt=0,this.parent?Jl(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Cn),this;if(this.timeline){var c=this.timeline.totalDuration();return this.timeline.killTweensOf(s,l,Ra&&Ra.vars.overwrite!==!0)._first||Jl(this),this.parent&&c!==this.timeline.totalDuration()&&No(this,this._dur*this.timeline._tDur/c,0,1),this}var d=this._targets,f=s?Xi(s):d,h=this._ptLookup,m=this._pt,g,x,_,w,v,S,C;if((!l||l==="all")&&YP(d,f))return l==="all"&&(this._pt=0),Jl(this);for(g=this._op=this._op||[],l!=="all"&&(gn(l)&&(v={},ei(l,function(M){return v[M]=1}),l=v),l=g9(d,l)),C=d.length;C--;)if(~f.indexOf(d[C])){x=h[C],l==="all"?(g[C]=l,w=x,_={}):(_=g[C]=g[C]||{},w=l);for(v in w)S=x&&x[v],S&&((!("kill"in S.d)||S.d.kill(v)===!0)&&Uf(this,S,"_pt"),delete x[v]),_!=="all"&&(_[v]=1)}return this._initted&&!this._pt&&m&&Jl(this),this},e.to=function(s,l){return new e(s,l,arguments[2])},e.from=function(s,l){return sc(1,arguments)},e.delayedCall=function(s,l,c,d){return new e(l,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:l,onReverseComplete:l,onCompleteParams:c,onReverseCompleteParams:c,callbackScope:d})},e.fromTo=function(s,l,c){return sc(2,arguments)},e.set=function(s,l){return l.duration=0,l.repeatDelay||(l.repeat=0),new e(s,l)},e.killTweensOf=function(s,l,c){return Ut.killTweensOf(s,l,c)},e})(Ec);ki(tn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ei("staggerTo,staggerFrom,staggerFromTo",function(t){tn[t]=function(){var e=new Un,i=q0.call(arguments,0);return i.splice(t==="staggerFromTo"?5:4,0,0),e[t].apply(e,i)}});var by=function(e,i,a){return e[i]=a},sE=function(e,i,a){return e[i](a)},x9=function(e,i,a,s){return e[i](s.fp,a)},b9=function(e,i,a){return e.setAttribute(i,a)},vy=function(e,i){return $t(e[i])?sE:cy(e[i])&&e.setAttribute?b9:by},oE=function(e,i){return i.set(i.t,i.p,Math.round((i.s+i.c*e)*1e6)/1e6,i)},v9=function(e,i){return i.set(i.t,i.p,!!(i.s+i.c*e),i)},lE=function(e,i){var a=i._pt,s="";if(!e&&i.b)s=i.b;else if(e===1&&i.e)s=i.e;else{for(;a;)s=a.p+(a.m?a.m(a.s+a.c*e):Math.round((a.s+a.c*e)*1e4)/1e4)+s,a=a._next;s+=i.c}i.set(i.t,i.p,s,i)},wy=function(e,i){for(var a=i._pt;a;)a.r(e,a.d),a=a._next},w9=function(e,i,a,s){for(var l=this._pt,c;l;)c=l._next,l.p===s&&l.modifier(e,i,a),l=c},S9=function(e){for(var i=this._pt,a,s;i;)s=i._next,i.p===e&&!i.op||i.op===e?Uf(this,i,"_pt"):i.dep||(a=1),i=s;return!a},_9=function(e,i,a,s){s.mSet(e,i,s.m.call(s.tween,a,s.mt),s)},cE=function(e){for(var i=e._pt,a,s,l,c;i;){for(a=i._next,s=l;s&&s.pr>i.pr;)s=s._next;(i._prev=s?s._prev:c)?i._prev._next=i:l=i,(i._next=s)?s._prev=i:c=i,i=a}e._pt=l},ti=(function(){function t(i,a,s,l,c,d,f,h,m){this.t=a,this.s=l,this.c=c,this.p=s,this.r=d||oE,this.d=f||this,this.set=h||by,this.pr=m||0,this._next=i,i&&(i._prev=this)}var e=t.prototype;return e.modifier=function(a,s,l){this.mSet=this.mSet||this.set,this.set=_9,this.m=a,this.mt=l,this.tween=s},t})();ei(py+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return hy[t]=1});Ci.TweenMax=Ci.TweenLite=tn;Ci.TimelineLite=Ci.TimelineMax=Un;Ut=new Un({sortChildren:!1,defaults:Mo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ei.stringFilter=W3;var Ts=[],Gd={},T9=[],rS=0,E9=0,Fm=function(e){return(Gd[e]||T9).map(function(i){return i()})},K0=function(){var e=Date.now(),i=[];e-rS>2&&(Fm("matchMediaInit"),Ts.forEach(function(a){var s=a.queries,l=a.conditions,c,d,f,h;for(d in s)c=yr.matchMedia(s[d]).matches,c&&(f=1),c!==l[d]&&(l[d]=c,h=1);h&&(a.revert(),f&&i.push(a))}),Fm("matchMediaRevert"),i.forEach(function(a){return a.onMatch(a,function(s){return a.add(null,s)})}),rS=e,Fm("matchMedia"))},uE=(function(){function t(i,a){this.selector=a&&Y0(a),this.data=[],this._r=[],this.isReverted=!1,this.id=E9++,i&&this.add(i)}var e=t.prototype;return e.add=function(a,s,l){$t(a)&&(l=s,s=a,a=$t);var c=this,d=function(){var h=jt,m=c.selector,g;return h&&h!==c&&h.data.push(c),l&&(c.selector=Y0(l)),jt=c,g=s.apply(c,arguments),$t(g)&&c._r.push(g),jt=h,c.selector=m,c.isReverted=!1,g};return c.last=d,a===$t?d(c,function(f){return c.add(null,f)}):a?c[a]=d:d},e.ignore=function(a){var s=jt;jt=null,a(this),jt=s},e.getTweens=function(){var a=[];return this.data.forEach(function(s){return s instanceof t?a.push.apply(a,s.getTweens()):s instanceof tn&&!(s.parent&&s.parent.data==="nested")&&a.push(s)}),a},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(a,s){var l=this;if(a?(function(){for(var d=l.getTweens(),f=l.data.length,h;f--;)h=l.data[f],h.data==="isFlip"&&(h.revert(),h.getChildren(!0,!0,!1).forEach(function(m){return d.splice(d.indexOf(m),1)}));for(d.map(function(m){return{g:m._dur||m._delay||m._sat&&!m._sat.vars.immediateRender?m.globalTime(0):-1/0,t:m}}).sort(function(m,g){return g.g-m.g||-1/0}).forEach(function(m){return m.t.revert(a)}),f=l.data.length;f--;)h=l.data[f],h instanceof Un?h.data!=="nested"&&(h.scrollTrigger&&h.scrollTrigger.revert(),h.kill()):!(h instanceof tn)&&h.revert&&h.revert(a);l._r.forEach(function(m){return m(a,l)}),l.isReverted=!0})():this.data.forEach(function(d){return d.kill&&d.kill()}),this.clear(),s)for(var c=Ts.length;c--;)Ts[c].id===this.id&&Ts.splice(c,1)},e.revert=function(a){this.kill(a||{})},t})(),C9=(function(){function t(i){this.contexts=[],this.scope=i,jt&&jt.data.push(this)}var e=t.prototype;return e.add=function(a,s,l){Dr(a)||(a={matches:a});var c=new uE(0,l||this.scope),d=c.conditions={},f,h,m;jt&&!c.selector&&(c.selector=jt.selector),this.contexts.push(c),s=c.add("onMatch",s),c.queries=a;for(h in a)h==="all"?m=1:(f=yr.matchMedia(a[h]),f&&(Ts.indexOf(c)<0&&Ts.push(c),(d[h]=f.matches)&&(m=1),f.addListener?f.addListener(K0):f.addEventListener("change",K0)));return m&&s(c,function(g){return c.add(null,g)}),this},e.revert=function(a){this.kill(a||{})},e.kill=function(a){this.contexts.forEach(function(s){return s.kill(a,!0)})},t})(),hf={registerPlugin:function(){for(var e=arguments.length,i=new Array(e),a=0;a<e;a++)i[a]=arguments[a];i.forEach(function(s){return K3(s)})},timeline:function(e){return new Un(e)},getTweensOf:function(e,i){return Ut.getTweensOf(e,i)},getProperty:function(e,i,a,s){gn(e)&&(e=Xi(e)[0]);var l=ws(e||{}).get,c=a?z3:N3;return a==="native"&&(a=""),e&&(i?c((xi[i]&&xi[i].get||l)(e,i,a,s)):function(d,f,h){return c((xi[d]&&xi[d].get||l)(e,d,f,h))})},quickSetter:function(e,i,a){if(e=Xi(e),e.length>1){var s=e.map(function(m){return ri.quickSetter(m,i,a)}),l=s.length;return function(m){for(var g=l;g--;)s[g](m)}}e=e[0]||{};var c=xi[i],d=ws(e),f=d.harness&&(d.harness.aliases||{})[i]||i,h=c?function(m){var g=new c;wo._pt=0,g.init(e,a?m+a:m,wo,0,[e]),g.render(1,g),wo._pt&&wy(1,wo)}:d.set(e,f);return c?h:function(m){return h(e,f,a?m+a:m,d,1)}},quickTo:function(e,i,a){var s,l=ri.to(e,ki((s={},s[i]="+=0.1",s.paused=!0,s.stagger=0,s),a||{})),c=function(f,h,m){return l.resetTo(i,f,h,m)};return c.tween=l,c},isTweening:function(e){return Ut.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=_s(e.ease,Mo.ease)),Jw(Mo,e||{})},config:function(e){return Jw(Ei,e||{})},registerEffect:function(e){var i=e.name,a=e.effect,s=e.plugins,l=e.defaults,c=e.extendTimeline;(s||"").split(",").forEach(function(d){return d&&!xi[d]&&!Ci[d]&&wc(i+" effect requires "+d+" plugin.")}),Um[i]=function(d,f,h){return a(Xi(d),ki(f||{},l),h)},c&&(Un.prototype[i]=function(d,f,h){return this.add(Um[i](d,Dr(f)?f:(h=f)&&{},this),h)})},registerEase:function(e,i){We[e]=_s(i)},parseEase:function(e,i){return arguments.length?_s(e,i):We},getById:function(e){return Ut.getById(e)},exportRoot:function(e,i){e===void 0&&(e={});var a=new Un(e),s,l;for(a.smoothChildTiming=Jn(e.smoothChildTiming),Ut.remove(a),a._dp=0,a._time=a._tTime=Ut._time,s=Ut._first;s;)l=s._next,(i||!(!s._dur&&s instanceof tn&&s.vars.onComplete===s._targets[0]))&&_r(a,s,s._start-s._delay),s=l;return _r(Ut,a,0),a},context:function(e,i){return e?new uE(e,i):jt},matchMedia:function(e){return new C9(e)},matchMediaRefresh:function(){return Ts.forEach(function(e){var i=e.conditions,a,s;for(s in i)i[s]&&(i[s]=!1,a=1);a&&e.revert()})||K0()},addEventListener:function(e,i){var a=Gd[e]||(Gd[e]=[]);~a.indexOf(i)||a.push(i)},removeEventListener:function(e,i){var a=Gd[e],s=a&&a.indexOf(i);s>=0&&a.splice(s,1)},utils:{wrap:r9,wrapYoyo:a9,distribute:H3,random:q3,snap:$3,normalize:i9,getUnit:Ln,clamp:JP,splitColor:Z3,toArray:Xi,selector:Y0,mapRange:G3,pipe:t9,unitize:n9,interpolate:s9,shuffle:F3},install:D3,effects:Um,ticker:bi,updateRoot:Un.updateRoot,plugins:xi,globalTimeline:Ut,core:{PropTween:ti,globals:O3,Tween:tn,Timeline:Un,Animation:Ec,getCache:ws,_removeLinkedListItem:Uf,reverting:function(){return Cn},context:function(e){return e&&jt&&(jt.data.push(e),e._ctx=jt),jt},suppressOverwrites:function(e){return ly=e}}};ei("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return hf[t]=tn[t]});bi.add(Un.updateRoot);wo=hf.to({},{duration:0});var k9=function(e,i){for(var a=e._pt;a&&a.p!==i&&a.op!==i&&a.fp!==i;)a=a._next;return a},A9=function(e,i){var a=e._targets,s,l,c;for(s in i)for(l=a.length;l--;)c=e._ptLookup[l][s],c&&(c=c.d)&&(c._pt&&(c=k9(c,s)),c&&c.modifier&&c.modifier(i[s],e,a[l],s))},Hm=function(e,i){return{name:e,headless:1,rawVars:1,init:function(s,l,c){c._onInit=function(d){var f,h;if(gn(l)&&(f={},ei(l,function(m){return f[m]=1}),l=f),i){f={};for(h in l)f[h]=i(l[h]);l=f}A9(d,l)}}}},ri=hf.registerPlugin({name:"attr",init:function(e,i,a,s,l){var c,d,f;this.tween=a;for(c in i)f=e.getAttribute(c)||"",d=this.add(e,"setAttribute",(f||0)+"",i[c],s,l,0,0,c),d.op=c,d.b=f,this._props.push(c)},render:function(e,i){for(var a=i._pt;a;)Cn?a.set(a.t,a.p,a.b,a):a.r(e,a.d),a=a._next}},{name:"endArray",headless:1,init:function(e,i){for(var a=i.length;a--;)this.add(e,a,e[a]||0,i[a],0,0,0,0,0,1)}},Hm("roundProps",G0),Hm("modifiers"),Hm("snap",$3))||hf;tn.version=Un.version=ri.version="3.14.2";R3=1;uy()&&zo();We.Power0;We.Power1;We.Power2;We.Power3;We.Power4;We.Linear;We.Quad;We.Cubic;We.Quart;We.Quint;We.Strong;We.Elastic;We.Back;We.SteppedEase;We.Bounce;We.Sine;We.Expo;We.Circ;var aS,Da,Eo,Sy,ys,sS,_y,R9=function(){return typeof window<"u"},ea={},ds=180/Math.PI,Co=Math.PI/180,po=Math.atan2,oS=1e8,Ty=/([A-Z])/g,D9=/(left|right|width|margin|padding|x)/i,O9=/[\s,\(]\S/,Tr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Z0=function(e,i){return i.set(i.t,i.p,Math.round((i.s+i.c*e)*1e4)/1e4+i.u,i)},M9=function(e,i){return i.set(i.t,i.p,e===1?i.e:Math.round((i.s+i.c*e)*1e4)/1e4+i.u,i)},L9=function(e,i){return i.set(i.t,i.p,e?Math.round((i.s+i.c*e)*1e4)/1e4+i.u:i.b,i)},j9=function(e,i){return i.set(i.t,i.p,e===1?i.e:e?Math.round((i.s+i.c*e)*1e4)/1e4+i.u:i.b,i)},N9=function(e,i){var a=i.s+i.c*e;i.set(i.t,i.p,~~(a+(a<0?-.5:.5))+i.u,i)},dE=function(e,i){return i.set(i.t,i.p,e?i.e:i.b,i)},fE=function(e,i){return i.set(i.t,i.p,e!==1?i.b:i.e,i)},z9=function(e,i,a){return e.style[i]=a},P9=function(e,i,a){return e.style.setProperty(i,a)},U9=function(e,i,a){return e._gsap[i]=a},I9=function(e,i,a){return e._gsap.scaleX=e._gsap.scaleY=a},B9=function(e,i,a,s,l){var c=e._gsap;c.scaleX=c.scaleY=a,c.renderTransform(l,c)},V9=function(e,i,a,s,l){var c=e._gsap;c[i]=a,c.renderTransform(l,c)},It="transform",ni=It+"Origin",F9=function t(e,i){var a=this,s=this.target,l=s.style,c=s._gsap;if(e in ea&&l){if(this.tfm=this.tfm||{},e!=="transform")e=Tr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(d){return a.tfm[d]=Zr(s,d)}):this.tfm[e]=c.x?c[e]:Zr(s,e),e===ni&&(this.tfm.zOrigin=c.zOrigin);else return Tr.transform.split(",").forEach(function(d){return t.call(a,d,i)});if(this.props.indexOf(It)>=0)return;c.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(ni,i,"")),e=It}(l||i)&&this.props.push(e,i,l[e])},hE=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},H9=function(){var e=this.props,i=this.target,a=i.style,s=i._gsap,l,c;for(l=0;l<e.length;l+=3)e[l+1]?e[l+1]===2?i[e[l]](e[l+2]):i[e[l]]=e[l+2]:e[l+2]?a[e[l]]=e[l+2]:a.removeProperty(e[l].substr(0,2)==="--"?e[l]:e[l].replace(Ty,"-$1").toLowerCase());if(this.tfm){for(c in this.tfm)s[c]=this.tfm[c];s.svg&&(s.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),l=_y(),(!l||!l.isStart)&&!a[It]&&(hE(a),s.zOrigin&&a[ni]&&(a[ni]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},pE=function(e,i){var a={target:e,props:[],revert:H9,save:F9};return e._gsap||ri.core.getCache(e),i&&e.style&&e.nodeType&&i.split(",").forEach(function(s){return a.save(s)}),a},mE,Q0=function(e,i){var a=Da.createElementNS?Da.createElementNS((i||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Da.createElement(e);return a&&a.style?a:Da.createElement(e)},Si=function t(e,i,a){var s=getComputedStyle(e);return s[i]||s.getPropertyValue(i.replace(Ty,"-$1").toLowerCase())||s.getPropertyValue(i)||!a&&t(e,Po(i)||i,1)||""},lS="O,Moz,ms,Ms,Webkit".split(","),Po=function(e,i,a){var s=i||ys,l=s.style,c=5;if(e in l&&!a)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);c--&&!(lS[c]+e in l););return c<0?null:(c===3?"ms":c>=0?lS[c]:"")+e},W0=function(){R9()&&window.document&&(aS=window,Da=aS.document,Eo=Da.documentElement,ys=Q0("div")||{style:{}},Q0("div"),It=Po(It),ni=It+"Origin",ys.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",mE=!!Po("perspective"),_y=ri.core.reverting,Sy=1)},cS=function(e){var i=e.ownerSVGElement,a=Q0("svg",i&&i.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=e.cloneNode(!0),l;s.style.display="block",a.appendChild(s),Eo.appendChild(a);try{l=s.getBBox()}catch{}return a.removeChild(s),Eo.removeChild(a),l},uS=function(e,i){for(var a=i.length;a--;)if(e.hasAttribute(i[a]))return e.getAttribute(i[a])},gE=function(e){var i,a;try{i=e.getBBox()}catch{i=cS(e),a=1}return i&&(i.width||i.height)||a||(i=cS(e)),i&&!i.width&&!i.x&&!i.y?{x:+uS(e,["x","cx","x1"])||0,y:+uS(e,["y","cy","y1"])||0,width:0,height:0}:i},yE=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&gE(e))},Ia=function(e,i){if(i){var a=e.style,s;i in ea&&i!==ni&&(i=It),a.removeProperty?(s=i.substr(0,2),(s==="ms"||i.substr(0,6)==="webkit")&&(i="-"+i),a.removeProperty(s==="--"?i:i.replace(Ty,"-$1").toLowerCase())):a.removeAttribute(i)}},Oa=function(e,i,a,s,l,c){var d=new ti(e._pt,i,a,0,1,c?fE:dE);return e._pt=d,d.b=s,d.e=l,e._props.push(a),d},dS={deg:1,rad:1,turn:1},$9={grid:1,flex:1},Ba=function t(e,i,a,s){var l=parseFloat(a)||0,c=(a+"").trim().substr((l+"").length)||"px",d=ys.style,f=D9.test(i),h=e.tagName.toLowerCase()==="svg",m=(h?"client":"offset")+(f?"Width":"Height"),g=100,x=s==="px",_=s==="%",w,v,S,C;if(s===c||!l||dS[s]||dS[c])return l;if(c!=="px"&&!x&&(l=t(e,i,a,"px")),C=e.getCTM&&yE(e),(_||c==="%")&&(ea[i]||~i.indexOf("adius")))return w=C?e.getBBox()[f?"width":"height"]:e[m],Gt(_?l/w*g:l/100*w);if(d[f?"width":"height"]=g+(x?c:s),v=s!=="rem"&&~i.indexOf("adius")||s==="em"&&e.appendChild&&!h?e:e.parentNode,C&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===Da||!v.appendChild)&&(v=Da.body),S=v._gsap,S&&_&&S.width&&f&&S.time===bi.time&&!S.uncache)return Gt(l/S.width*g);if(_&&(i==="height"||i==="width")){var M=e.style[i];e.style[i]=g+s,w=e[m],M?e.style[i]=M:Ia(e,i)}else(_||c==="%")&&!$9[Si(v,"display")]&&(d.position=Si(e,"position")),v===e&&(d.position="static"),v.appendChild(ys),w=ys[m],v.removeChild(ys),d.position="absolute";return f&&_&&(S=ws(v),S.time=bi.time,S.width=v[m]),Gt(x?w*l/g:w&&l?g/w*l:0)},Zr=function(e,i,a,s){var l;return Sy||W0(),i in Tr&&i!=="transform"&&(i=Tr[i],~i.indexOf(",")&&(i=i.split(",")[0])),ea[i]&&i!=="transform"?(l=kc(e,s),l=i!=="transformOrigin"?l[i]:l.svg?l.origin:mf(Si(e,ni))+" "+l.zOrigin+"px"):(l=e.style[i],(!l||l==="auto"||s||~(l+"").indexOf("calc("))&&(l=pf[i]&&pf[i](e,i,a)||Si(e,i)||L3(e,i)||(i==="opacity"?1:0))),a&&!~(l+"").trim().indexOf(" ")?Ba(e,i,l,a)+a:l},q9=function(e,i,a,s){if(!a||a==="none"){var l=Po(i,e,1),c=l&&Si(e,l,1);c&&c!==a?(i=l,a=c):i==="borderColor"&&(a=Si(e,"borderTopColor"))}var d=new ti(this._pt,e.style,i,0,1,lE),f=0,h=0,m,g,x,_,w,v,S,C,M,R,L,O;if(d.b=a,d.e=s,a+="",s+="",s.substring(0,6)==="var(--"&&(s=Si(e,s.substring(4,s.indexOf(")")))),s==="auto"&&(v=e.style[i],e.style[i]=s,s=Si(e,i)||s,v?e.style[i]=v:Ia(e,i)),m=[a,s],W3(m),a=m[0],s=m[1],x=a.match(vo)||[],O=s.match(vo)||[],O.length){for(;g=vo.exec(s);)S=g[0],M=s.substring(f,g.index),w?w=(w+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(w=1),S!==(v=x[h++]||"")&&(_=parseFloat(v)||0,L=v.substr((_+"").length),S.charAt(1)==="="&&(S=To(_,S)+L),C=parseFloat(S),R=S.substr((C+"").length),f=vo.lastIndex-R.length,R||(R=R||Ei.units[i]||L,f===s.length&&(s+=R,d.e+=R)),L!==R&&(_=Ba(e,i,v,R)||0),d._pt={_next:d._pt,p:M||h===1?M:",",s:_,c:C-_,m:w&&w<4||i==="zIndex"?Math.round:0});d.c=f<s.length?s.substring(f,s.length):""}else d.r=i==="display"&&s==="none"?fE:dE;return A3.test(s)&&(d.e=0),this._pt=d,d},fS={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Y9=function(e){var i=e.split(" "),a=i[0],s=i[1]||"50%";return(a==="top"||a==="bottom"||s==="left"||s==="right")&&(e=a,a=s,s=e),i[0]=fS[a]||a,i[1]=fS[s]||s,i.join(" ")},G9=function(e,i){if(i.tween&&i.tween._time===i.tween._dur){var a=i.t,s=a.style,l=i.u,c=a._gsap,d,f,h;if(l==="all"||l===!0)s.cssText="",f=1;else for(l=l.split(","),h=l.length;--h>-1;)d=l[h],ea[d]&&(f=1,d=d==="transformOrigin"?ni:It),Ia(a,d);f&&(Ia(a,It),c&&(c.svg&&a.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",kc(a,1),c.uncache=1,hE(s)))}},pf={clearProps:function(e,i,a,s,l){if(l.data!=="isFromStart"){var c=e._pt=new ti(e._pt,i,a,0,0,G9);return c.u=s,c.pr=-10,c.tween=l,e._props.push(a),1}}},Cc=[1,0,0,1,0,0],xE={},bE=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},hS=function(e){var i=Si(e,It);return bE(i)?Cc:i.substr(7).match(k3).map(Gt)},Ey=function(e,i){var a=e._gsap||ws(e),s=e.style,l=hS(e),c,d,f,h;return a.svg&&e.getAttribute("transform")?(f=e.transform.baseVal.consolidate().matrix,l=[f.a,f.b,f.c,f.d,f.e,f.f],l.join(",")==="1,0,0,1,0,0"?Cc:l):(l===Cc&&!e.offsetParent&&e!==Eo&&!a.svg&&(f=s.display,s.display="block",c=e.parentNode,(!c||!e.offsetParent&&!e.getBoundingClientRect().width)&&(h=1,d=e.nextElementSibling,Eo.appendChild(e)),l=hS(e),f?s.display=f:Ia(e,"display"),h&&(d?c.insertBefore(e,d):c?c.appendChild(e):Eo.removeChild(e))),i&&l.length>6?[l[0],l[1],l[4],l[5],l[12],l[13]]:l)},J0=function(e,i,a,s,l,c){var d=e._gsap,f=l||Ey(e,!0),h=d.xOrigin||0,m=d.yOrigin||0,g=d.xOffset||0,x=d.yOffset||0,_=f[0],w=f[1],v=f[2],S=f[3],C=f[4],M=f[5],R=i.split(" "),L=parseFloat(R[0])||0,O=parseFloat(R[1])||0,j,k,U,I;a?f!==Cc&&(k=_*S-w*v)&&(U=L*(S/k)+O*(-v/k)+(v*M-S*C)/k,I=L*(-w/k)+O*(_/k)-(_*M-w*C)/k,L=U,O=I):(j=gE(e),L=j.x+(~R[0].indexOf("%")?L/100*j.width:L),O=j.y+(~(R[1]||R[0]).indexOf("%")?O/100*j.height:O)),s||s!==!1&&d.smooth?(C=L-h,M=O-m,d.xOffset=g+(C*_+M*v)-C,d.yOffset=x+(C*w+M*S)-M):d.xOffset=d.yOffset=0,d.xOrigin=L,d.yOrigin=O,d.smooth=!!s,d.origin=i,d.originIsAbsolute=!!a,e.style[ni]="0px 0px",c&&(Oa(c,d,"xOrigin",h,L),Oa(c,d,"yOrigin",m,O),Oa(c,d,"xOffset",g,d.xOffset),Oa(c,d,"yOffset",x,d.yOffset)),e.setAttribute("data-svg-origin",L+" "+O)},kc=function(e,i){var a=e._gsap||new nE(e);if("x"in a&&!i&&!a.uncache)return a;var s=e.style,l=a.scaleX<0,c="px",d="deg",f=getComputedStyle(e),h=Si(e,ni)||"0",m,g,x,_,w,v,S,C,M,R,L,O,j,k,U,I,Y,W,te,me,we,Se,z,B,$,se,ce,P,q,G,ne,ye;return m=g=x=v=S=C=M=R=L=0,_=w=1,a.svg=!!(e.getCTM&&yE(e)),f.translate&&((f.translate!=="none"||f.scale!=="none"||f.rotate!=="none")&&(s[It]=(f.translate!=="none"?"translate3d("+(f.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(f.rotate!=="none"?"rotate("+f.rotate+") ":"")+(f.scale!=="none"?"scale("+f.scale.split(" ").join(",")+") ":"")+(f[It]!=="none"?f[It]:"")),s.scale=s.rotate=s.translate="none"),k=Ey(e,a.svg),a.svg&&(a.uncache?($=e.getBBox(),h=a.xOrigin-$.x+"px "+(a.yOrigin-$.y)+"px",B=""):B=!i&&e.getAttribute("data-svg-origin"),J0(e,B||h,!!B||a.originIsAbsolute,a.smooth!==!1,k)),O=a.xOrigin||0,j=a.yOrigin||0,k!==Cc&&(W=k[0],te=k[1],me=k[2],we=k[3],m=Se=k[4],g=z=k[5],k.length===6?(_=Math.sqrt(W*W+te*te),w=Math.sqrt(we*we+me*me),v=W||te?po(te,W)*ds:0,M=me||we?po(me,we)*ds+v:0,M&&(w*=Math.abs(Math.cos(M*Co))),a.svg&&(m-=O-(O*W+j*me),g-=j-(O*te+j*we))):(ye=k[6],G=k[7],ce=k[8],P=k[9],q=k[10],ne=k[11],m=k[12],g=k[13],x=k[14],U=po(ye,q),S=U*ds,U&&(I=Math.cos(-U),Y=Math.sin(-U),B=Se*I+ce*Y,$=z*I+P*Y,se=ye*I+q*Y,ce=Se*-Y+ce*I,P=z*-Y+P*I,q=ye*-Y+q*I,ne=G*-Y+ne*I,Se=B,z=$,ye=se),U=po(-me,q),C=U*ds,U&&(I=Math.cos(-U),Y=Math.sin(-U),B=W*I-ce*Y,$=te*I-P*Y,se=me*I-q*Y,ne=we*Y+ne*I,W=B,te=$,me=se),U=po(te,W),v=U*ds,U&&(I=Math.cos(U),Y=Math.sin(U),B=W*I+te*Y,$=Se*I+z*Y,te=te*I-W*Y,z=z*I-Se*Y,W=B,Se=$),S&&Math.abs(S)+Math.abs(v)>359.9&&(S=v=0,C=180-C),_=Gt(Math.sqrt(W*W+te*te+me*me)),w=Gt(Math.sqrt(z*z+ye*ye)),U=po(Se,z),M=Math.abs(U)>2e-4?U*ds:0,L=ne?1/(ne<0?-ne:ne):0),a.svg&&(B=e.getAttribute("transform"),a.forceCSS=e.setAttribute("transform","")||!bE(Si(e,It)),B&&e.setAttribute("transform",B))),Math.abs(M)>90&&Math.abs(M)<270&&(l?(_*=-1,M+=v<=0?180:-180,v+=v<=0?180:-180):(w*=-1,M+=M<=0?180:-180)),i=i||a.uncache,a.x=m-((a.xPercent=m&&(!i&&a.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-m)?-50:0)))?e.offsetWidth*a.xPercent/100:0)+c,a.y=g-((a.yPercent=g&&(!i&&a.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-g)?-50:0)))?e.offsetHeight*a.yPercent/100:0)+c,a.z=x+c,a.scaleX=Gt(_),a.scaleY=Gt(w),a.rotation=Gt(v)+d,a.rotationX=Gt(S)+d,a.rotationY=Gt(C)+d,a.skewX=M+d,a.skewY=R+d,a.transformPerspective=L+c,(a.zOrigin=parseFloat(h.split(" ")[2])||!i&&a.zOrigin||0)&&(s[ni]=mf(h)),a.xOffset=a.yOffset=0,a.force3D=Ei.force3D,a.renderTransform=a.svg?K9:mE?vE:X9,a.uncache=0,a},mf=function(e){return(e=e.split(" "))[0]+" "+e[1]},$m=function(e,i,a){var s=Ln(i);return Gt(parseFloat(i)+parseFloat(Ba(e,"x",a+"px",s)))+s},X9=function(e,i){i.z="0px",i.rotationY=i.rotationX="0deg",i.force3D=0,vE(e,i)},ls="0deg",$l="0px",cs=") ",vE=function(e,i){var a=i||this,s=a.xPercent,l=a.yPercent,c=a.x,d=a.y,f=a.z,h=a.rotation,m=a.rotationY,g=a.rotationX,x=a.skewX,_=a.skewY,w=a.scaleX,v=a.scaleY,S=a.transformPerspective,C=a.force3D,M=a.target,R=a.zOrigin,L="",O=C==="auto"&&e&&e!==1||C===!0;if(R&&(g!==ls||m!==ls)){var j=parseFloat(m)*Co,k=Math.sin(j),U=Math.cos(j),I;j=parseFloat(g)*Co,I=Math.cos(j),c=$m(M,c,k*I*-R),d=$m(M,d,-Math.sin(j)*-R),f=$m(M,f,U*I*-R+R)}S!==$l&&(L+="perspective("+S+cs),(s||l)&&(L+="translate("+s+"%, "+l+"%) "),(O||c!==$l||d!==$l||f!==$l)&&(L+=f!==$l||O?"translate3d("+c+", "+d+", "+f+") ":"translate("+c+", "+d+cs),h!==ls&&(L+="rotate("+h+cs),m!==ls&&(L+="rotateY("+m+cs),g!==ls&&(L+="rotateX("+g+cs),(x!==ls||_!==ls)&&(L+="skew("+x+", "+_+cs),(w!==1||v!==1)&&(L+="scale("+w+", "+v+cs),M.style[It]=L||"translate(0, 0)"},K9=function(e,i){var a=i||this,s=a.xPercent,l=a.yPercent,c=a.x,d=a.y,f=a.rotation,h=a.skewX,m=a.skewY,g=a.scaleX,x=a.scaleY,_=a.target,w=a.xOrigin,v=a.yOrigin,S=a.xOffset,C=a.yOffset,M=a.forceCSS,R=parseFloat(c),L=parseFloat(d),O,j,k,U,I;f=parseFloat(f),h=parseFloat(h),m=parseFloat(m),m&&(m=parseFloat(m),h+=m,f+=m),f||h?(f*=Co,h*=Co,O=Math.cos(f)*g,j=Math.sin(f)*g,k=Math.sin(f-h)*-x,U=Math.cos(f-h)*x,h&&(m*=Co,I=Math.tan(h-m),I=Math.sqrt(1+I*I),k*=I,U*=I,m&&(I=Math.tan(m),I=Math.sqrt(1+I*I),O*=I,j*=I)),O=Gt(O),j=Gt(j),k=Gt(k),U=Gt(U)):(O=g,U=x,j=k=0),(R&&!~(c+"").indexOf("px")||L&&!~(d+"").indexOf("px"))&&(R=Ba(_,"x",c,"px"),L=Ba(_,"y",d,"px")),(w||v||S||C)&&(R=Gt(R+w-(w*O+v*k)+S),L=Gt(L+v-(w*j+v*U)+C)),(s||l)&&(I=_.getBBox(),R=Gt(R+s/100*I.width),L=Gt(L+l/100*I.height)),I="matrix("+O+","+j+","+k+","+U+","+R+","+L+")",_.setAttribute("transform",I),M&&(_.style[It]=I)},Z9=function(e,i,a,s,l){var c=360,d=gn(l),f=parseFloat(l)*(d&&~l.indexOf("rad")?ds:1),h=f-s,m=s+h+"deg",g,x;return d&&(g=l.split("_")[1],g==="short"&&(h%=c,h!==h%(c/2)&&(h+=h<0?c:-c)),g==="cw"&&h<0?h=(h+c*oS)%c-~~(h/c)*c:g==="ccw"&&h>0&&(h=(h-c*oS)%c-~~(h/c)*c)),e._pt=x=new ti(e._pt,i,a,s,h,M9),x.e=m,x.u="deg",e._props.push(a),x},pS=function(e,i){for(var a in i)e[a]=i[a];return e},Q9=function(e,i,a){var s=pS({},a._gsap),l="perspective,force3D,transformOrigin,svgOrigin",c=a.style,d,f,h,m,g,x,_,w;s.svg?(h=a.getAttribute("transform"),a.setAttribute("transform",""),c[It]=i,d=kc(a,1),Ia(a,It),a.setAttribute("transform",h)):(h=getComputedStyle(a)[It],c[It]=i,d=kc(a,1),c[It]=h);for(f in ea)h=s[f],m=d[f],h!==m&&l.indexOf(f)<0&&(_=Ln(h),w=Ln(m),g=_!==w?Ba(a,f,h,w):parseFloat(h),x=parseFloat(m),e._pt=new ti(e._pt,d,f,g,x-g,Z0),e._pt.u=w||0,e._props.push(f));pS(d,s)};ei("padding,margin,Width,Radius",function(t,e){var i="Top",a="Right",s="Bottom",l="Left",c=(e<3?[i,a,s,l]:[i+l,i+a,s+a,s+l]).map(function(d){return e<2?t+d:"border"+d+t});pf[e>1?"border"+t:t]=function(d,f,h,m,g){var x,_;if(arguments.length<4)return x=c.map(function(w){return Zr(d,w,h)}),_=x.join(" "),_.split(x[0]).length===5?x[0]:_;x=(m+"").split(" "),_={},c.forEach(function(w,v){return _[w]=x[v]=x[v]||x[(v-1)/2|0]}),d.init(f,_,g)}});var wE={name:"css",register:W0,targetTest:function(e){return e.style&&e.nodeType},init:function(e,i,a,s,l){var c=this._props,d=e.style,f=a.vars.startAt,h,m,g,x,_,w,v,S,C,M,R,L,O,j,k,U,I;Sy||W0(),this.styles=this.styles||pE(e),U=this.styles.props,this.tween=a;for(v in i)if(v!=="autoRound"&&(m=i[v],!(xi[v]&&iE(v,i,a,s,e,l)))){if(_=typeof m,w=pf[v],_==="function"&&(m=m.call(a,s,e,l),_=typeof m),_==="string"&&~m.indexOf("random(")&&(m=_c(m)),w)w(this,e,v,m,a)&&(k=1);else if(v.substr(0,2)==="--")h=(getComputedStyle(e).getPropertyValue(v)+"").trim(),m+="",Na.lastIndex=0,Na.test(h)||(S=Ln(h),C=Ln(m),C?S!==C&&(h=Ba(e,v,h,C)+C):S&&(m+=S)),this.add(d,"setProperty",h,m,s,l,0,0,v),c.push(v),U.push(v,0,d[v]);else if(_!=="undefined"){if(f&&v in f?(h=typeof f[v]=="function"?f[v].call(a,s,e,l):f[v],gn(h)&&~h.indexOf("random(")&&(h=_c(h)),Ln(h+"")||h==="auto"||(h+=Ei.units[v]||Ln(Zr(e,v))||""),(h+"").charAt(1)==="="&&(h=Zr(e,v))):h=Zr(e,v),x=parseFloat(h),M=_==="string"&&m.charAt(1)==="="&&m.substr(0,2),M&&(m=m.substr(2)),g=parseFloat(m),v in Tr&&(v==="autoAlpha"&&(x===1&&Zr(e,"visibility")==="hidden"&&g&&(x=0),U.push("visibility",0,d.visibility),Oa(this,d,"visibility",x?"inherit":"hidden",g?"inherit":"hidden",!g)),v!=="scale"&&v!=="transform"&&(v=Tr[v],~v.indexOf(",")&&(v=v.split(",")[0]))),R=v in ea,R){if(this.styles.save(v),I=m,_==="string"&&m.substring(0,6)==="var(--"){if(m=Si(e,m.substring(4,m.indexOf(")"))),m.substring(0,5)==="calc("){var Y=e.style.perspective;e.style.perspective=m,m=Si(e,"perspective"),Y?e.style.perspective=Y:Ia(e,"perspective")}g=parseFloat(m)}if(L||(O=e._gsap,O.renderTransform&&!i.parseTransform||kc(e,i.parseTransform),j=i.smoothOrigin!==!1&&O.smooth,L=this._pt=new ti(this._pt,d,It,0,1,O.renderTransform,O,0,-1),L.dep=1),v==="scale")this._pt=new ti(this._pt,O,"scaleY",O.scaleY,(M?To(O.scaleY,M+g):g)-O.scaleY||0,Z0),this._pt.u=0,c.push("scaleY",v),v+="X";else if(v==="transformOrigin"){U.push(ni,0,d[ni]),m=Y9(m),O.svg?J0(e,m,0,j,0,this):(C=parseFloat(m.split(" ")[2])||0,C!==O.zOrigin&&Oa(this,O,"zOrigin",O.zOrigin,C),Oa(this,d,v,mf(h),mf(m)));continue}else if(v==="svgOrigin"){J0(e,m,1,j,0,this);continue}else if(v in xE){Z9(this,O,v,x,M?To(x,M+m):m);continue}else if(v==="smoothOrigin"){Oa(this,O,"smooth",O.smooth,m);continue}else if(v==="force3D"){O[v]=m;continue}else if(v==="transform"){Q9(this,m,e);continue}}else v in d||(v=Po(v)||v);if(R||(g||g===0)&&(x||x===0)&&!O9.test(m)&&v in d)S=(h+"").substr((x+"").length),g||(g=0),C=Ln(m)||(v in Ei.units?Ei.units[v]:S),S!==C&&(x=Ba(e,v,h,C)),this._pt=new ti(this._pt,R?O:d,v,x,(M?To(x,M+g):g)-x,!R&&(C==="px"||v==="zIndex")&&i.autoRound!==!1?N9:Z0),this._pt.u=C||0,R&&I!==m?(this._pt.b=h,this._pt.e=I,this._pt.r=j9):S!==C&&C!=="%"&&(this._pt.b=h,this._pt.r=L9);else if(v in d)q9.call(this,e,v,h,M?M+m:m);else if(v in e)this.add(e,v,h||e[v],M?M+m:m,s,l);else if(v!=="parseTransform"){fy(v,m);continue}R||(v in d?U.push(v,0,d[v]):typeof e[v]=="function"?U.push(v,2,e[v]()):U.push(v,1,h||e[v])),c.push(v)}}k&&cE(this)},render:function(e,i){if(i.tween._time||!_y())for(var a=i._pt;a;)a.r(e,a.d),a=a._next;else i.styles.revert()},get:Zr,aliases:Tr,getSetter:function(e,i,a){var s=Tr[i];return s&&s.indexOf(",")<0&&(i=s),i in ea&&i!==ni&&(e._gsap.x||Zr(e,"x"))?a&&sS===a?i==="scale"?I9:U9:(sS=a||{})&&(i==="scale"?B9:V9):e.style&&!cy(e.style[i])?z9:~i.indexOf("-")?P9:vy(e,i)},core:{_removeProperty:Ia,_getMatrix:Ey}};ri.utils.checkPrefix=Po;ri.core.getStyleSaver=pE;(function(t,e,i,a){var s=ei(t+","+e+","+i,function(l){ea[l]=1});ei(e,function(l){Ei.units[l]="deg",xE[l]=1}),Tr[s[13]]=t+","+e,ei(a,function(l){var c=l.split(":");Tr[c[1]]=s[c[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ei("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){Ei.units[t]="px"});ri.registerPlugin(wE);var On=ri.registerPlugin(wE)||ri;On.core.Tween;function W9(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function J9(t,e,i){return e&&W9(t.prototype,e),t}var En,Xd,vi,Ma,La,ko,SE,fs,lc,_E,Qr,nr,TE,EE=function(){return En||typeof window<"u"&&(En=window.gsap)&&En.registerPlugin&&En},CE=1,So=[],qi=[],cc=[],uc=Date.now,eg=function(e,i){return i},e7=function(){var e=lc.core,i=e.bridge||{},a=e._scrollers,s=e._proxies;a.push.apply(a,qi),s.push.apply(s,cc),qi=a,cc=s,eg=function(c,d){return i[c](d)}},t7=function(e,i){return~cc.indexOf(e)&&cc[cc.indexOf(e)+1][i]},dc=function(e){return!!~_E.indexOf(e)},Pn=function(e,i,a,s,l){return e.addEventListener(i,a,{passive:s!==!1,capture:!!l})},zn=function(e,i,a,s){return e.removeEventListener(i,a,!!s)},gd="scrollLeft",yd="scrollTop",tg=function(){return Qr&&Qr.isPressed||qi.cache++},gf=function(e,i){var a=function s(l){if(l||l===0){CE&&(vi.history.scrollRestoration="manual");var c=Qr&&Qr.isPressed;l=s.v=Math.round(l)||(Qr&&Qr.iOS?1:0),e(l),s.cacheID=qi.cache,c&&eg("ss",l)}else(i||qi.cache!==s.cacheID||eg("ref"))&&(s.cacheID=qi.cache,s.v=e());return s.v+s.offset};return a.offset=0,e&&a},yf={s:gd,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:gf(function(t){return arguments.length?vi.scrollTo(t,Vf.sc()):vi.pageXOffset||Ma[gd]||La[gd]||ko[gd]||0})},Vf={s:yd,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:yf,sc:gf(function(t){return arguments.length?vi.scrollTo(yf.sc(),t):vi.pageYOffset||Ma[yd]||La[yd]||ko[yd]||0})},n7=function(e,i){return(i&&i._ctx&&i._ctx.selector||En.utils.toArray)(e)[0]||(typeof e=="string"&&En.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},i7=function(e,i){for(var a=i.length;a--;)if(i[a]===e||i[a].contains(e))return!0;return!1},mS=function(e,i){var a=i.s,s=i.sc;dc(e)&&(e=Ma.scrollingElement||La);var l=qi.indexOf(e),c=s===Vf.sc?1:2;!~l&&(l=qi.push(e)-1),qi[l+c]||Pn(e,"scroll",tg);var d=qi[l+c],f=d||(qi[l+c]=gf(t7(e,a),!0)||(dc(e)?s:gf(function(h){return arguments.length?e[a]=h:e[a]})));return f.target=e,d||(f.smooth=En.getProperty(e,"scrollBehavior")==="smooth"),f},gS=function(e,i,a){var s=e,l=e,c=uc(),d=c,f=i,h=Math.max(500,f*3),m=function(w,v){var S=uc();v||S-c>f?(l=s,s=w,d=c,c=S):s+=w},g=function(){l=s=0,d=c=0},x=function(w){var v=d,S=l,C=uc();return(w||w===0)&&w!==s&&m(w),c===d||C-d>h?0:(s+S)/(C-v)*1e3};return{update:m,reset:g,getVelocity:x}},ql=function(e,i){return i&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},yS=function(e){var i=Math.max.apply(Math,e),a=Math.min.apply(Math,e);return Math.abs(i)>=Math.abs(a)?i:a},kE=function(){lc=En.core.globals().ScrollTrigger,lc&&lc.core&&e7()},AE=function(e){return En=e||EE(),!Xd&&En&&typeof document<"u"&&document.body&&(vi=window,Ma=document,La=Ma.documentElement,ko=Ma.body,_E=[vi,Ma,La,ko],En.utils.clamp,TE=En.core.context||function(){},fs="onpointerenter"in ko?"pointer":"mouse",SE=ar.isTouch=vi.matchMedia&&vi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in vi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,nr=ar.eventTypes=("ontouchstart"in La?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in La?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return CE=0},500),kE(),Xd=1),Xd};yf.op=Vf;qi.cache=0;var ar=(function(){function t(i){this.init(i)}var e=t.prototype;return e.init=function(a){Xd||AE(En)||console.warn("Please gsap.registerPlugin(Observer)"),lc||kE();var s=a.tolerance,l=a.dragMinimum,c=a.type,d=a.target,f=a.lineHeight,h=a.debounce,m=a.preventDefault,g=a.onStop,x=a.onStopDelay,_=a.ignore,w=a.wheelSpeed,v=a.event,S=a.onDragStart,C=a.onDragEnd,M=a.onDrag,R=a.onPress,L=a.onRelease,O=a.onRight,j=a.onLeft,k=a.onUp,U=a.onDown,I=a.onChangeX,Y=a.onChangeY,W=a.onChange,te=a.onToggleX,me=a.onToggleY,we=a.onHover,Se=a.onHoverEnd,z=a.onMove,B=a.ignoreCheck,$=a.isNormalizer,se=a.onGestureStart,ce=a.onGestureEnd,P=a.onWheel,q=a.onEnable,G=a.onDisable,ne=a.onClick,ye=a.scrollSpeed,ue=a.capture,Te=a.allowClicks,he=a.lockAxis,Ce=a.onLockAxis;this.target=d=n7(d)||La,this.vars=a,_&&(_=En.utils.toArray(_)),s=s||1e-9,l=l||0,w=w||1,ye=ye||1,c=c||"wheel,touch,pointer",h=h!==!1,f||(f=parseFloat(vi.getComputedStyle(ko).lineHeight)||22);var Ue,Le,ze,ot,nt,ct,ut,ae=this,Tt=0,Je=0,ht=a.passive||!m&&a.passive!==!1,pt=mS(d,yf),Ie=mS(d,Vf),Et=pt(),Ze=Ie(),Vn=~c.indexOf("touch")&&!~c.indexOf("pointer")&&nr[0]==="pointerdown",an=dc(d),mt=d.ownerDocument||Ma,sn=[0,0,0],yn=[0,0,0],kn=0,Fn=function(){return kn=uc()},Kt=function(pe,xe){return(ae.event=pe)&&_&&i7(pe.target,_)||xe&&Vn&&pe.pointerType!=="touch"||B&&B(pe,xe)},ai=function(){ae._vx.reset(),ae._vy.reset(),Le.pause(),g&&g(ae)},Ct=function(){var pe=ae.deltaX=yS(sn),xe=ae.deltaY=yS(yn),Be=Math.abs(pe)>=s,K=Math.abs(xe)>=s;W&&(Be||K)&&W(ae,pe,xe,sn,yn),Be&&(O&&ae.deltaX>0&&O(ae),j&&ae.deltaX<0&&j(ae),I&&I(ae),te&&ae.deltaX<0!=Tt<0&&te(ae),Tt=ae.deltaX,sn[0]=sn[1]=sn[2]=0),K&&(U&&ae.deltaY>0&&U(ae),k&&ae.deltaY<0&&k(ae),Y&&Y(ae),me&&ae.deltaY<0!=Je<0&&me(ae),Je=ae.deltaY,yn[0]=yn[1]=yn[2]=0),(ot||ze)&&(z&&z(ae),ze&&(S&&ze===1&&S(ae),M&&M(ae),ze=0),ot=!1),ct&&!(ct=!1)&&Ce&&Ce(ae),nt&&(P(ae),nt=!1),Ue=0},hn=function(pe,xe,Be){sn[Be]+=pe,yn[Be]+=xe,ae._vx.update(pe),ae._vy.update(xe),h?Ue||(Ue=requestAnimationFrame(Ct)):Ct()},zt=function(pe,xe){he&&!ut&&(ae.axis=ut=Math.abs(pe)>Math.abs(xe)?"x":"y",ct=!0),ut!=="y"&&(sn[2]+=pe,ae._vx.update(pe,!0)),ut!=="x"&&(yn[2]+=xe,ae._vy.update(xe,!0)),h?Ue||(Ue=requestAnimationFrame(Ct)):Ct()},Qi=function(pe){if(!Kt(pe,1)){pe=ql(pe,m);var xe=pe.clientX,Be=pe.clientY,K=xe-ae.x,oe=Be-ae.y,ve=ae.isDragging;ae.x=xe,ae.y=Be,(ve||(K||oe)&&(Math.abs(ae.startX-xe)>=l||Math.abs(ae.startY-Be)>=l))&&(ze||(ze=ve?2:1),ve||(ae.isDragging=!0),zt(K,oe))}},si=ae.onPress=function(be){Kt(be,1)||be&&be.button||(ae.axis=ut=null,Le.pause(),ae.isPressed=!0,be=ql(be),Tt=Je=0,ae.startX=ae.x=be.clientX,ae.startY=ae.y=be.clientY,ae._vx.reset(),ae._vy.reset(),Pn($?d:mt,nr[1],Qi,ht,!0),ae.deltaX=ae.deltaY=0,R&&R(ae))},on=ae.onRelease=function(be){if(!Kt(be,1)){zn($?d:mt,nr[1],Qi,!0);var pe=!isNaN(ae.y-ae.startY),xe=ae.isDragging,Be=xe&&(Math.abs(ae.x-ae.startX)>3||Math.abs(ae.y-ae.startY)>3),K=ql(be);!Be&&pe&&(ae._vx.reset(),ae._vy.reset(),m&&Te&&En.delayedCall(.08,function(){if(uc()-kn>300&&!be.defaultPrevented){if(be.target.click)be.target.click();else if(mt.createEvent){var oe=mt.createEvent("MouseEvents");oe.initMouseEvent("click",!0,!0,vi,1,K.screenX,K.screenY,K.clientX,K.clientY,!1,!1,!1,!1,0,null),be.target.dispatchEvent(oe)}}})),ae.isDragging=ae.isGesturing=ae.isPressed=!1,g&&xe&&!$&&Le.restart(!0),ze&&Ct(),C&&xe&&C(ae),L&&L(ae,Be)}},oi=function(pe){return pe.touches&&pe.touches.length>1&&(ae.isGesturing=!0)&&se(pe,ae.isDragging)},li=function(){return(ae.isGesturing=!1)||ce(ae)},Hn=function(pe){if(!Kt(pe)){var xe=pt(),Be=Ie();hn((xe-Et)*ye,(Be-Ze)*ye,1),Et=xe,Ze=Be,g&&Le.restart(!0)}},ln=function(pe){if(!Kt(pe)){pe=ql(pe,m),P&&(nt=!0);var xe=(pe.deltaMode===1?f:pe.deltaMode===2?vi.innerHeight:1)*w;hn(pe.deltaX*xe,pe.deltaY*xe,0),g&&!$&&Le.restart(!0)}},Oe=function(pe){if(!Kt(pe)){var xe=pe.clientX,Be=pe.clientY,K=xe-ae.x,oe=Be-ae.y;ae.x=xe,ae.y=Be,ot=!0,g&&Le.restart(!0),(K||oe)&&zt(K,oe)}},it=function(pe){ae.event=pe,we(ae)},kt=function(pe){ae.event=pe,Se(ae)},de=function(pe){return Kt(pe)||ql(pe,m)&&ne(ae)};Le=ae._dc=En.delayedCall(x||.25,ai).pause(),ae.deltaX=ae.deltaY=0,ae._vx=gS(0,50),ae._vy=gS(0,50),ae.scrollX=pt,ae.scrollY=Ie,ae.isDragging=ae.isGesturing=ae.isPressed=!1,TE(this),ae.enable=function(be){return ae.isEnabled||(Pn(an?mt:d,"scroll",tg),c.indexOf("scroll")>=0&&Pn(an?mt:d,"scroll",Hn,ht,ue),c.indexOf("wheel")>=0&&Pn(d,"wheel",ln,ht,ue),(c.indexOf("touch")>=0&&SE||c.indexOf("pointer")>=0)&&(Pn(d,nr[0],si,ht,ue),Pn(mt,nr[2],on),Pn(mt,nr[3],on),Te&&Pn(d,"click",Fn,!0,!0),ne&&Pn(d,"click",de),se&&Pn(mt,"gesturestart",oi),ce&&Pn(mt,"gestureend",li),we&&Pn(d,fs+"enter",it),Se&&Pn(d,fs+"leave",kt),z&&Pn(d,fs+"move",Oe)),ae.isEnabled=!0,ae.isDragging=ae.isGesturing=ae.isPressed=ot=ze=!1,ae._vx.reset(),ae._vy.reset(),Et=pt(),Ze=Ie(),be&&be.type&&si(be),q&&q(ae)),ae},ae.disable=function(){ae.isEnabled&&(So.filter(function(be){return be!==ae&&dc(be.target)}).length||zn(an?mt:d,"scroll",tg),ae.isPressed&&(ae._vx.reset(),ae._vy.reset(),zn($?d:mt,nr[1],Qi,!0)),zn(an?mt:d,"scroll",Hn,ue),zn(d,"wheel",ln,ue),zn(d,nr[0],si,ue),zn(mt,nr[2],on),zn(mt,nr[3],on),zn(d,"click",Fn,!0),zn(d,"click",de),zn(mt,"gesturestart",oi),zn(mt,"gestureend",li),zn(d,fs+"enter",it),zn(d,fs+"leave",kt),zn(d,fs+"move",Oe),ae.isEnabled=ae.isPressed=ae.isDragging=!1,G&&G(ae))},ae.kill=ae.revert=function(){ae.disable();var be=So.indexOf(ae);be>=0&&So.splice(be,1),Qr===ae&&(Qr=0)},So.push(ae),$&&dc(d)&&(Qr=ae),ae.enable(v)},J9(t,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),t})();ar.version="3.14.2";ar.create=function(t){return new ar(t)};ar.register=AE;ar.getAll=function(){return So.slice()};ar.getById=function(t){return So.filter(function(e){return e.vars.id===t})[0]};EE()&&En.registerPlugin(ar);const r7=""+new URL("pants-Bam4WPuX.svg",import.meta.url).href,ta=async t=>(await Bt.get(`/products/detail/${t}`)).data,Ac=async t=>(await Bt.post(`/products/likes/${t}`)).data,Ff=async()=>(await Bt.get("/my/likes")).data.data,wr=t=>Go.post("/user/save",t);On.registerPlugin(ar);const a7=F.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 20;

  svg,
  img {
    width: 16px;
    height: 16px;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    top: 6px;
    left: 6px;

    svg,
    img {
      width: 14px;
      height: 14px;
    }
  }
`,s7=({checked:t,onChange:e})=>{const i=E.useId();return b.jsxs(b.Fragment,{children:[b.jsx(L7,{type:"checkbox",id:i,checked:t,onChange:e}),b.jsx(j7,{htmlFor:i,$checked:t,children:b.jsxs(N7,{width:"18px",height:"18px",viewBox:"0 0 18 18",children:[b.jsx(z7,{d:"M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z",$checked:t}),b.jsx(P7,{points:"1 9 7 14 15 4",$checked:t})]})})]})},o7=({items:t,activeTab:e,activeCategory:i,className:a,isLoading:s=!1,error:l=null,onRetry:c,isSelectionMode:d=!1,selectedItems:f={},onItemSelect:h,onTryOn:m,isTryingOn:g=!1,onDetailClick:x,rawWishlistData:_=[],rawCoordinationData:w=[],isDeleteMode:v=!1,selectedCodiIds:S=[],onCodiSelect:C,currentTryOnItems:M})=>{const R=E.useRef(null),L=E.useRef(null),[O,j]=E.useState(1),[k,U]=E.useState(!1),[I,Y]=E.useState(!1),W=E.useRef(null),te=E.useRef(1),me=E.useRef(1),we=E.useRef(!1),[Se,z]=E.useState(()=>typeof window<"u"?window.innerWidth>=1200||window.innerWidth>=768?8:4:8);E.useEffect(()=>{const ue=()=>{if(!R.current)return 8;const Ue=R.current.getBoundingClientRect(),Le=Ue.height,ze=Ue.width,ot=window.innerWidth;if(Le===0||ze===0)return ot>=1200||ot>=768?8:4;const ct=Le-20*2,ut=12,Tt=(ze-ut*3)/4*4/3,Je=Math.floor((ct+ut)/(Tt+ut));let ht=Math.max(1,Je);ot>=1200?ht=Math.min(Math.max(ht,2),4):ot>=768?ht=Math.min(Math.max(ht,2),3):ht=Math.min(Math.max(ht,1),2);const pt=ht*4;return ot>=768&&pt<4?4:pt},Te=()=>{z(ue())},he=setTimeout(Te,100),Ce=()=>{setTimeout(Te,50)};return window.addEventListener("resize",Ce),()=>{clearTimeout(he),window.removeEventListener("resize",Ce)}},[e]),E.useEffect(()=>{const Te=setTimeout(()=>{if(!R.current)return;const he=R.current.getBoundingClientRect(),Ce=he.height,Ue=he.width,Le=window.innerWidth;if(Ce===0||Ue===0){Le>=1200||Le>=768?z(8):z(4);return}const ot=Ce-20*2,nt=12,ut=(Ue-nt*3)/4*4/3,ae=Math.floor((ot+nt)/(ut+nt));let Tt=Math.max(1,ae);Le>=1200?Tt=Math.min(Math.max(Tt,2),4):Le>=768?Tt=Math.min(Math.max(Tt,2),3):Tt=Math.min(Math.max(Tt,1),2);const Je=Tt*4;if(Le>=768&&Je<4){z(4);return}z(Je)},100);return()=>clearTimeout(Te)},[e]);const[B,$]=E.useState({}),se=E.useCallback((ue,Te)=>{$(he=>({...he,[ue]:Te}))},[]),ce=E.useCallback(ue=>{$(Te=>({...Te,[ue]:null}))},[]),P=E.useMemo(()=>i==="Total"?t:t.filter(ue=>i==="Upper"?ue.type==="top":i==="Lower"?ue.type==="bottom":!1),[t,i]),q=E.useMemo(()=>{const ue=[],Te=P.length,he=Math.min(Math.ceil(Te/Se)||1,10);for(let Ce=0;Ce<he;Ce++){const Ue=Ce*Se,Le=Ue+Se,ze=P.slice(Ue,Le);ze.length>0?ue.push(ze):Ce===0&&P.length===0&&ue.push([])}return ue},[P,Se]),G=q.length||1;E.useEffect(()=>{te.current=O},[O]),E.useEffect(()=>{me.current=G},[G]),E.useEffect(()=>{we.current=k},[k]);const ne=E.useCallback(()=>{const ue=L.current;ue&&(W.current&&clearTimeout(W.current),On.fromTo(ue,{autoAlpha:0,y:20,scale:.9},{autoAlpha:1,y:0,scale:1,duration:.4,ease:"back.out(1.7)"}),W.current=setTimeout(()=>{On.to(ue,{autoAlpha:0,y:10,scale:.95,duration:.3,ease:"power2.inOut"})},2e3))},[]),ye=E.useCallback(ue=>{if(k||ue===O)return;const Te=O;U(!0),j(ue),ne();const he=R.current;if(!he)return;he.querySelectorAll(".page-section").forEach((Le,ze)=>{ze===Te-1&&On.to(Le,{autoAlpha:0,duration:.5,ease:"power2.inOut"})});const Ue=he.querySelector(`.page-section:nth-child(${ue})`);Ue?On.fromTo(Ue,{autoAlpha:0,y:50},{autoAlpha:1,y:0,duration:.8,ease:"power2.out",delay:.2,onComplete:()=>{U(!1)}}):(console.warn(`Page ${ue} not found, resetting animation state`),U(!1))},[k,O,ne]);return E.useEffect(()=>{if(!I||G<=1||!R.current)return;const ue=R.current,Te=setTimeout(()=>{const he=ar.create({target:ue,type:"wheel,touch,pointer",wheelSpeed:-1,onDown:()=>{if(we.current||me.current<=1)return;const Ce=te.current<=1?me.current:te.current-1;if(we.current||Ce===te.current)return;const Ue=te.current;we.current=!0,te.current=Ce,j(Ce),U(!0),ue.querySelectorAll(".page-section").forEach((ot,nt)=>{nt===Ue-1&&On.to(ot,{autoAlpha:0,duration:.5,ease:"power2.inOut"})});const ze=ue.querySelector(`.page-section:nth-child(${Ce})`);ze?On.fromTo(ze,{autoAlpha:0,y:50},{autoAlpha:1,y:0,duration:.8,ease:"power2.out",delay:.2,onComplete:()=>{we.current=!1,U(!1)}}):(we.current=!1,U(!1))},onUp:()=>{if(we.current||me.current<=1)return;const Ce=te.current>=me.current?1:te.current+1;if(we.current||Ce===te.current)return;const Ue=te.current;we.current=!0,te.current=Ce,j(Ce),U(!0),ue.querySelectorAll(".page-section").forEach((ot,nt)=>{nt===Ue-1&&On.to(ot,{autoAlpha:0,duration:.5,ease:"power2.inOut"})});const ze=ue.querySelector(`.page-section:nth-child(${Ce})`);ze?On.fromTo(ze,{autoAlpha:0,y:50},{autoAlpha:1,y:0,duration:.8,ease:"power2.out",delay:.2,onComplete:()=>{we.current=!1,U(!1)}}):(we.current=!1,U(!1))},tolerance:10,preventDefault:!0});return()=>he.kill()},200);return()=>clearTimeout(Te)},[I,G]),E.useEffect(()=>{const ue=R.current;if(!ue)return;ue.querySelectorAll(".page-section").forEach((Ce,Ue)=>{On.set(Ce,{autoAlpha:Ue===0?1:0,y:0})}),j(1);const he=setTimeout(()=>{Y(!0)},300);return()=>clearTimeout(he)},[q]),E.useEffect(()=>{if(G>0){Y(!1),j(1);const ue=R.current;ue&&(ue.querySelectorAll(".page-section").forEach((he,Ce)=>{On.set(he,{autoAlpha:Ce===0?1:0,y:0})}),setTimeout(()=>{Y(!0),ne()},300))}},[e,i,G,ne]),E.useEffect(()=>{const ue=L.current;if(ue){On.set(ue,{autoAlpha:0,y:20,scale:.9});const Te=setTimeout(()=>{ne()},500);return()=>clearTimeout(Te)}},[ne]),E.useEffect(()=>()=>{W.current&&clearTimeout(W.current)},[]),s?b.jsxs(w7,{children:[b.jsx(S7,{}),b.jsx(_7,{children:"찜목록을 불러오는 중..."})]}):l?b.jsxs(T7,{children:[b.jsx(E7,{children:l}),c&&b.jsx(C7,{onClick:c,children:"다시 시도"})]}):P.length===0?b.jsxs(x7,{children:[b.jsx(b7,{children:e==="wishlist"?"찜 목록이 비어있습니다":"내 코디 목록이 비어있습니다"}),b.jsx(v7,{children:"아이템을 추가해보세요!"})]}):b.jsxs(l7,{className:a,ref:R,children:[q.map((ue,Te)=>b.jsx(c7,{className:"page-section",children:b.jsx(u7,{children:ue.map((he,Ce)=>{const Le="coordinationId"in he&&he.coordinationId!==void 0?he:null,ze=`${he.id}-${Te}-${Ce}`,ot=B[ze],nt=Le?.upperImage,ct=Le?.lowerImage,ut=e==="wishlist"&&d||e==="mycodi"&&v,ae=()=>{ut&&(e==="wishlist"?h?.(he.id,he.type):Le?.coordinationId!==void 0&&C?.(Le.coordinationId))},Tt=ut&&(e==="wishlist"?he.type==="top"&&f.upperId===he.id||he.type==="bottom"&&f.lowerId===he.id:Le?.coordinationId!==void 0&&S.includes(Le.coordinationId)),Je=M&&(he.type==="top"&&M.upperId===he.id||he.type==="bottom"&&M.lowerId===he.id);return b.jsxs(d7,{className:"clothing-item-card",onClick:ut?ae:void 0,$isCheckboxMode:ut,$isTryingOn:Je,$isCodiCard:e==="mycodi",children:[ut&&b.jsx(M7,{onClick:ht=>{ht.stopPropagation()},children:b.jsx(s7,{checked:e==="wishlist"?he.type==="top"&&f.upperId===he.id||he.type==="bottom"&&f.lowerId===he.id:Le?.coordinationId!==void 0&&S.includes(Le.coordinationId),onChange:()=>{e==="wishlist"?h?.(he.id,he.type):Le?.coordinationId!==void 0&&C?.(Le.coordinationId)}})}),Le?.isFullCoordination?b.jsxs(f7,{className:"clothing-image","data-image-container":"split",$isFullCoordination:!0,children:[b.jsx(RE,{$imageUrl:nt,$isSelected:Tt}),b.jsx(DE,{$imageUrl:ct,$isSelected:Tt}),b.jsx(g7,{$isVisible:ot==="try-on"}),b.jsx(y7,{$isVisible:ot==="detail"})]}):b.jsxs(m7,{className:"clothing-image","data-image-container":"single",$imageUrl:he.image,$isSelected:Tt,children:[b.jsx(xS,{$isVisible:ot==="try-on",$area:"upper"}),b.jsx(xS,{$isVisible:ot==="detail",$area:"lower"}),e==="wishlist"&&i==="Total"&&b.jsx(a7,{children:he.type==="top"?b.jsx(cT,{}):he.type==="bottom"?b.jsx("img",{src:r7,alt:"pants"}):null})]}),!ut&&b.jsxs(B7,{"data-hover-overlay":!0,children:[b.jsx(U7,{onMouseEnter:()=>se(ze,"try-on"),onMouseLeave:()=>ce(ze),children:b.jsx(V7,{"data-try-on-button":!0,onClick:ht=>{ht.stopPropagation(),m&&!g&&m(he.id,he.type)},disabled:g,children:g?"AI 처리중...":"시착하기"})}),b.jsx(I7,{onMouseEnter:()=>se(ze,"detail"),onMouseLeave:()=>ce(ze),children:b.jsx(F7,{"data-detail-button":!0,onClick:async ht=>{ht.stopPropagation();let pt;if(e==="wishlist")try{const Ie=await ta(he.id);if(Ie.success&&Ie.data)pt={productId:Ie.data.productId,productBrand:Ie.data.productBrand,productName:Ie.data.productName,productPrice:Ie.data.productPrice,productUrl:Ie.data.productUrl,productImageUrl:Ie.data.productImageUrl,styleList:Ie.data.styleList,liked:Ie.data.isLiked};else{const Et=_.find(Ze=>Ze.productId===he.id);pt={productId:he.id,productBrand:"Unknown Brand",productName:"Unknown Item",productPrice:0,productUrl:"",productImageUrl:Et?.productImageUrl||he.image,styleList:[],liked:!0}}}catch(Ie){console.error("상품 상세 정보 조회 실패:",Ie);const Et=_.find(Ze=>Ze.productId===he.id);pt={productId:he.id,productBrand:"Unknown Brand",productName:"Unknown Item",productPrice:0,productUrl:"",productImageUrl:Et?.productImageUrl||he.image,styleList:[],liked:!0}}else{const Ie=he,Et=Ie.coordinationId,Ze=w.find(Vn=>Vn.coordinationId===Et);pt={productId:Et?.toString()||he.id,productBrand:"Unknown Brand",productName:Ie.isFullCoordination?"Full Coordination":"Single Item",productPrice:0,productUrl:"",productImageUrl:Ze?.upperImageUrl||Ze?.lowerImageUrl||he.image,styleList:[],liked:!1}}x?.(pt)},children:"상세 페이지"})})]})]},ze)})})},`page-${Te}-${e}-${i}`)),G>1&&b.jsx(k7,{children:Array.from({length:G},(ue,Te)=>b.jsx(A7,{$isActive:O===Te+1,onClick:()=>ye(Te+1),disabled:k},Te+1))}),b.jsxs(R7,{ref:L,children:[b.jsxs(D7,{children:[O," / ",G," 페이지"]}),b.jsxs(O7,{children:["총 ",P.length,"개 상품"]})]})]})},l7=F.div`
  position: relative;
  width: 100%;
  height: 100%; /* GridContainer의 동적 크기를 따라가도록 변경 */
  overflow: hidden; /* 넘침 방지 */
  background: transparent;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 상품 카드들을 수직으로 중앙정렬 */
  box-sizing: border-box; /* 크기 계산 일관성 유지 */

  /* 모든 화면 크기에서 동적 높이 사용 */
  @media (min-width: 1440px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 300px; /* 최소 높이만 유지 */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 250px; /* 최소 높이만 유지 */
  }

  /* 반응형 높이 조정 */
  @media (max-width: 768px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 200px; /* 최소 높이만 유지 */
    padding-right: 15px; /* 모바일에서 더 작은 여백 */
  }

  @media (max-width: 480px) {
    height: 100%; /* GridContainer 크기에 맞춰 동적 조정 */
    min-height: 150px; /* 최소 높이만 유지 */
    padding-right: 12px; /* 작은 화면에서 최소 여백 */
  }
`,c7=F.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start; /* ProductGrid를 상단에 위치하여 공백 문제 해결 */
  justify-content: center; /* ProductGrid를 수평 중앙에 위치 */
  flex-direction: column; /* 세로 방향으로 배치하여 자연스러운 높이 계산 */
  opacity: 0;
  visibility: hidden;
  box-sizing: border-box; /* 패딩을 전체 크기에 포함하여 크기 불일치 해결 */

  /* 대형 디스플레이 */
  @media (min-width: 1440px) {
    padding: 18px; /* 공백 감소 (24px → 18px) */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    padding: 16px; /* 공백 감소 (22px → 16px) */
  }

  /* 반응형 패딩 조정 */
  @media (max-width: 768px) {
    padding: 12px; /* 공백 감소 (16px → 12px) */
  }

  @media (max-width: 480px) {
    padding: 8px; /* 공백 감소 (12px → 8px) */
  }
`,u7=F.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px; /* 공백 감소를 위해 gap 축소 (18px → 12px) */
  max-width: 1450px; /* 그리드 최대 너비 추가 확장 (1400px → 1450px) */
  width: 100%;
  /* height: 100% 제거 - 카드들이 자연스러운 비율을 유지할 수 있도록 함 */
  align-items: start; /* stretch에서 start로 변경 - 카드가 강제로 늘어나지 않도록 함 */
  justify-items: center;
  justify-content: space-between; /* 공간 효율적 활용 */
  isolation: isolate;
  margin: 0 auto; /* 중앙 정렬 */
  box-sizing: border-box; /* 크기 계산 일관성 보장 */
  /* min-height: 100% 제거 - aspect-ratio가 우선되도록 함 */

  /* 대형 디스플레이에서 최적화된 레이아웃 */
  @media (min-width: 1401px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 14px; /* 공백 감소 (20px → 14px) */
    padding: 0px 10px 0px 0; /* 충분한 우측 여백 유지 */
  }

  @media (min-width: 1200px) and (max-width: 1400px) {
    gap: 12px; /* 공백 감소 (16px → 12px) */
    padding: 0px 10px 0px 0; /* 축소된 사이드바에 맞춰 적절한 여백 (28px → 35px) */
    max-width: 1350px; /* 중간 크기 화면에서 적절한 너비 */
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; /* 공백 감소 (16px → 10px) */
    padding: 0px 10px 0px 0; /* 태블릿에서 적절한 여백 (25px → 30px) */
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px; /* 공백 감소 (14px → 8px) */
    padding: 0px 10px 0px 0; /* 모바일에서 적절한 여백 (20px → 25px) */
    max-width: 100%;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px; /* 공백 감소 (12px → 6px) */
    padding: 0px 10px 0px 0; /* 작은 화면에서 적절한 여백 (18px → 22px) */
    max-width: 100%;
  }
`,d7=F.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: ${({$isCheckboxMode:t})=>t?"pointer":"default"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #f8f8f8;
  box-shadow: ${({$isTryingOn:t})=>t?"0 0 0 3px #072bed, 0 8px 25px rgba(7, 43, 237, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  margin: 0 auto;
  border: ${({$isTryingOn:t})=>t?"2px solid #072bed":"none"};

  /* 모든 카드를 정확한 3:4 비율로 통일 */
  aspect-ratio: 3 / 4 !important; /* 가로:세로 = 3:4 비율 강제 적용 */
  height: auto !important; /* aspect-ratio에 의해 높이가 자동 계산되도록 강제 설정 */
  min-height: unset !important; /* 부모에서 오는 min-height 제약 제거 */
  max-height: unset !important; /* 부모에서 오는 max-height 제약 제거 */

  &:hover {
    transform: scale(1.03) translateY(-2px);
    box-shadow: ${({$isTryingOn:t})=>t?"0 0 0 3px #072bed, 0 12px 35px rgba(7, 43, 237, 0.4)":"0 8px 25px rgba(0, 0, 0, 0.12)"};
  }

  /* 카드 호버 시 버튼 오버레이 표시 */
  &:hover [data-hover-overlay] {
    opacity: 1;
    visibility: visible;
  }
`,f7=F.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: filter;
`,h7=F.div`
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${t=>t.$imageUrl?`url(${t.$imageUrl})`:"none"};
  background-repeat: no-repeat;
  background-size: contain; /* 이미지 전체가 보이도록 contain 사용 */
  background-position: center top; /* 상의 이미지는 상단 중앙 정렬로 최적화 */
  position: relative;
  filter: ${t=>t.$isSelected?"grayscale(100%) brightness(0.15)":"none"};
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }
`,p7=F.div`
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${t=>t.$imageUrl?`url(${t.$imageUrl})`:"none"};
  background-repeat: no-repeat;
  background-size: contain; /* 이미지 전체가 보이도록 contain 사용 */
  background-position: center bottom; /* 하의 이미지는 하단 중앙 정렬로 최적화 */
  filter: ${t=>t.$isSelected?"grayscale(100%) brightness(0.15)":"none"};
  transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`,m7=F.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  background-image: ${t=>t.$imageUrl?`url(${t.$imageUrl})`:"none"};
  background-repeat: no-repeat;
  background-size: cover; /* 카드 전체를 덮도록 cover 사용 */
  background-position: center; /* 중앙 정렬 */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: ${t=>t.$isSelected?"grayscale(100%) brightness(0.15)":"none"};

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`,xS=F.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${t=>t.$isVisible?1:0};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 10;

  ${t=>t.$area==="upper"&&`
    top: 0;
  `}

  ${t=>t.$area==="lower"&&`
    bottom: 0;
  `}
`,g7=F.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${t=>t.$isVisible?1:0};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 15; /* 이미지 위에, 버튼 아래에 위치 */
  backdrop-filter: grayscale(100%) brightness(0.3);
  -webkit-backdrop-filter: grayscale(100%) brightness(0.3);
`,y7=F.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  background: rgba(0, 0, 0, 0.7);
  opacity: ${t=>t.$isVisible?1:0};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 15; /* 이미지 위에, 버튼 아래에 위치 */
  backdrop-filter: grayscale(100%) brightness(0.3);
  -webkit-backdrop-filter: grayscale(100%) brightness(0.3);
`,x7=F.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`,b7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`,v7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  color: #999;
`,w7=F.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`,S7=F.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,_7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  color: #666;
`,T7=F.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
`,E7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #d32f2f;
  margin-bottom: 16px;
  line-height: 1.5;
`,C7=F.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`,k7=F.div`
  position: absolute;
  right: 8px; /* 더 오른쪽으로 이동 */
  top: 50%;
  transform: translateY(-50%); /* Y축만 중앙 정렬 */
  display: flex;
  flex-direction: column;
  gap: 8px; /* 간격 축소 (10px → 8px) */
  padding: 12px 5px;
  background: linear-gradient(
    135deg,
    rgba(45, 52, 64, 0.95) 0%,
    rgba(32, 38, 48, 0.95) 100%
  );
  border-radius: 18px; /* 반지름 축소 (24px → 18px) */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000; /* z-index를 더 높게 설정 */
  opacity: 1;
  visibility: visible;
  width: 16px; /* 폭을 절반으로 축소 (32px → 16px) */

  @media (max-width: 768px) {
    right: 6px; /* 더 오른쪽으로 이동 */
    transform: translateY(-50%);
    padding: 8px 4px; /* 패딩 축소 (12px 6px → 8px 4px) */
    gap: 6px; /* 간격 축소 (8px → 6px) */
    border-radius: 14px; /* 반지름 축소 (20px → 14px) */
    width: 12px; /* 모바일에서 더 작게 (기존 16px → 12px) */
  }

  @media (max-width: 480px) {
    right: 4px; /* 더 오른쪽으로 이동 */
    transform: translateY(-50%);
    padding: 6px 3px; /* 패딩 축소 (10px 5px → 6px 3px) */
    gap: 4px; /* 간격 축소 (6px → 4px) */
    border-radius: 12px; /* 반지름 축소 (16px → 12px) */
    width: 10px; /* 작은 화면에서 더 작게 (기존 12px → 10px) */
  }
`,A7=F.button`
  width: 4px; /* 폭 축소 (6px → 4px) */
  height: 28px; /* 높이 축소 (36px → 28px) */
  border: none;
  border-radius: 2px; /* 반지름 축소 (3px → 2px) */
  background: ${t=>t.$isActive?"linear-gradient(180deg, #a8e840 0%, rgba(168, 232, 64, 0.9) 100%)":"rgba(255, 255, 255, 0.4)"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid
    ${t=>t.$isActive?"rgba(168, 232, 64, 0.8)":"rgba(255, 255, 255, 0.2)"};

  &:hover:not(:disabled) {
    background: ${t=>t.$isActive?"linear-gradient(180deg, #a8e840 0%, rgba(168, 232, 64, 0.95) 100%)":"rgba(255, 255, 255, 0.6)"};
    transform: scaleX(1.3);
    box-shadow: 0 4px 12px rgba(168, 232, 64, 0.4);
    border-color: rgba(168, 232, 64, 0.8);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 2px; /* 모바일에서 더 작게 (3px → 2px) */
    height: 22px; /* 높이 축소 (28px → 22px) */
  }

  @media (max-width: 480px) {
    width: 2px; /* 작은 화면에서 동일 (3px → 2px) */
    height: 18px; /* 높이 축소 (24px → 18px) */
  }
`,R7=F.div`
  position: absolute;
  bottom: 50px; /* 축소된 코디 버튼 컨테이너 위쪽에 위치 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  z-index: 1000;
  opacity: 1; /* 항상 표시되도록 변경 */
  visibility: visible;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  pointer-events: none; /* 클릭 이벤트 차단 */

  @media (max-width: 768px) {
    bottom: 45px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    bottom: 40px;
    padding: 5px 10px;
    border-radius: 12px;
  }
`,D7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #333;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,O7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 11px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`,M7=F.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 30;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
`,L7=F.input`
  display: none;
`,j7=F.label`
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 18px;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);

  &:hover svg {
    stroke: #4285f4;
  }

  ${({$checked:t})=>t&&`
    svg {
      stroke: #4285f4;
    }
  `}
`,N7=F.svg`
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #c8ccd4;
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
`,z7=F.path`
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
  transition: all 0.3s linear;

  ${({$checked:t})=>t&&`
    stroke: #4285f4;
    stroke-dashoffset: 60;
  `}
`,P7=F.polyline`
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
  transition: all 0.2s linear;
  transition-delay: ${({$checked:t})=>t?"0.15s":"0s"};

  ${({$checked:t})=>t&&`
    stroke: #4285f4;
    stroke-dashoffset: 42;
  `}
`,U7=F.div`
  flex: 1;
  display: flex;
  width: 100%
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: background 0.3s ease;
`,I7=F.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  transition: background 0.3s ease;
`,B7=F.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 20; /* 흑백 오버레이보다 위에 */
`,V7=F.button`
  width: 100%;
  height: 100%;
  background: transparent; /* 배경색 제거 */
  color: ${t=>t.disabled?"#ccc":"white"};
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 25; /* 흑백 오버레이보다 위에 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* 텍스트 가독성 향상 */

  &:hover {
    transform: ${t=>t.disabled?"none":"translateY(-1px)"};
  }

  &:active {
    transform: ${t=>t.disabled?"none":"translateY(0)"};
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,F7=F.button`
  width: 100%;
  height: 100%;
  background: transparent; /* 배경색 제거 */
  color: white;
  border: none;
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 25; /* 흑백 오버레이보다 위에 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* 텍스트 가독성 향상 */

  &:hover {
    transform: translateY(1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,RE=E.memo(({$imageUrl:t,$isSelected:e})=>b.jsx(h7,{$imageUrl:t,$isSelected:e}));RE.displayName="MemoizedUpperHalf";const DE=E.memo(({$imageUrl:t,$isSelected:e})=>b.jsx(p7,{$imageUrl:t,$isSelected:e}));DE.displayName="MemoizedLowerHalf";const H7=({showUploadModal:t,isDragOver:e,onClose:i,onFileUpload:a,onDragOver:s,onDragLeave:l,onDrop:c})=>t?b.jsx($7,{children:b.jsxs(q7,{children:[b.jsxs(Y7,{children:[b.jsx(G7,{children:"사진 업로드"}),b.jsx(X7,{onClick:i,children:"×"})]}),b.jsxs(K7,{$isDragOver:e,onDragOver:s,onDragLeave:l,onDrop:c,children:[b.jsx(Z7,{type:"file",accept:"image/jpeg,image/jpg,image/png,image/webp",onChange:a,id:"fileInput"}),b.jsxs(Q7,{htmlFor:"fileInput",children:[b.jsx(dD,{style:{width:"70px",height:"70px",color:"currentColor",strokeWidth:1.5}}),b.jsx(W7,{children:e?"파일을 여기에 놓으세요":"클릭하여 이미지를 선택하거나 파일을 드래그하세요"}),b.jsx(bS,{children:"JPG, PNG, WEBP 파일만 업로드 가능"}),b.jsx(bS,{style:{marginTop:"4px"},children:"최대 파일 크기: 10MB"})]})]})]})}):null,$7=F.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,q7=F.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
`,Y7=F.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,G7=F.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #404040;
  margin: 0;
`,X7=F.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #404040;
  }
`,K7=F.div`
  border: 2px dashed ${t=>t.$isDragOver?"#404040":"#ddd"};
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isDragOver?"rgba(64, 64, 64, 0.05)":"transparent"};

  &:hover {
    border-color: ${t=>t.$isDragOver?"#404040":"#999"};
    background-color: ${t=>t.$isDragOver?"rgba(64, 64, 64, 0.05)":"rgba(0, 0, 0, 0.02)"};
  }
`,Z7=F.input`
  display: none;
`,Q7=F.label`
  display: block;
  cursor: pointer;
`,W7=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #404040;
  margin-bottom: 8px;
`,bS=F.div`
  font-family: 'NanumSquare', sans-serif;
  font-size: 14px;
  color: #666;
`,OE=E.memo(({activeTab:t,isSelectionMode:e=!1,isDeleteMode:i=!1,onSelectClick:a,onSaveClick:s,onCancelClick:l,canSave:c=!1,onDeleteClick:d,onDeleteSaveClick:f,onDeleteCancelClick:h,canDelete:m=!1,hasTryOnItems:g=!1,onTryOnSaveClick:x,canTryOnSave:_=!1})=>b.jsx(J7,{children:t==="wishlist"?e?b.jsxs(qm,{children:[b.jsx(Ca,{onClick:s,disabled:!c,colorIndex:1,width:"100px",children:"코디 저장"}),b.jsx(Ca,{onClick:l,disabled:!1,colorIndex:1,width:"80px",children:"취소"})]}):g?b.jsxs(qm,{children:[b.jsx(Ca,{onClick:a,disabled:!1,colorIndex:1,width:"100px",children:"코디 선택"}),b.jsx(Ca,{onClick:x,disabled:!_,colorIndex:1,width:"100px",children:"코디 저장"})]}):b.jsx(Ca,{onClick:a,disabled:!1,colorIndex:1,width:"120px",children:"코디 선택"}):i?b.jsxs(qm,{children:[b.jsx(Ca,{onClick:f,disabled:!m,colorIndex:2,width:"100px",children:"삭제"}),b.jsx(Ca,{onClick:h,disabled:!1,colorIndex:1,width:"80px",children:"취소"})]}):b.jsx(Ca,{onClick:d,disabled:!1,colorIndex:2,width:"120px",children:"코디 삭제"})}));OE.displayName="ButtonsContainer";const J7=F.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 50px 16px 20px; /* GridContainer와 동일한 우측 여백 적용 */
  background: transparent;
  z-index: 10;
  min-height: 60px;
  flex-shrink: 0; /* 크기 고정 */

  @media (max-width: 768px) {
    padding: 14px 40px 14px 18px; /* 모바일에서도 우측 여백 유지 */
    gap: 10px;
    min-height: 56px;
  }

  @media (max-width: 480px) {
    padding: 12px 35px 12px 16px; /* 작은 화면에서도 우측 여백 유지 */
    gap: 8px;
    min-height: 52px;
  }
`,qm=F.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 767px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
`,Ca=({children:t,onClick:e,disabled:i=!1,colorIndex:a=0,width:s="140px",className:l,title:c})=>b.jsx(eU,{onClick:e,disabled:i,colorIndex:a,width:s,className:l,title:c,children:t}),eU=F.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  margin: 0;
  background: ${t=>t.colorIndex===1?"#404650":"#2C3038"}; /* CategoryTab과 동일한 배경색 */
  color: ${t=>t.colorIndex===1?"#FFFFFF":"#B0B8C1"}; /* CategoryTab과 동일한 텍스트 색상 */
  border: 1px solid #404650; /* CategoryTab과 동일한 테두리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* CategoryTab과 동일한 박스 섀도우 */
  border-radius: 0; /* CategoryTab과 동일한 사각형 모양 */
  font-family: 'NanumSquare', sans-serif;
  font-weight: ${t=>t.colorIndex===1?700:500}; /* CategoryTab과 동일한 폰트 웨이트 */
  font-size: 14px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  transition: all 0.3s ease; /* CategoryTab과 동일한 transition */
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
  width: ${t=>t.width};
  height: 44px;
  opacity: ${t=>t.disabled?.5:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};
  text-transform: none; /* CategoryTab은 uppercase 사용하지 않음 */
  letter-spacing: 0;
  overflow: visible;

  &:hover:not(:disabled) {
    background: ${t=>t.colorIndex===1?"#5A6169":"#404650"}; /* CategoryTab과 동일한 호버 배경색 */
    color: #ffffff; /* CategoryTab과 동일한 호버 텍스트 색상 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* CategoryTab과 동일한 호버 박스 섀도우 */
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(1px); /* CategoryTab과 동일한 active 효과 */
  }

  &:focus {
    outline: none;
  }

  /* 큰 화면 (width ≥ 1200px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 1200px) {
    padding: 10px 24px;
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  /* 중간 화면 (width: 1024px-1199px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  /* 표준 화면 (width: 768px-1023px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 20px;
    font-size: 14px;
    letter-spacing: 0.2px;
  }

  /* 작은 화면 (width: 480px-767px) - CategoryTab과 동일한 반응형 */
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 7px 18px;
    font-size: 13px;
    letter-spacing: 0.1px;
  }

  /* 모바일 (width < 480px) - CategoryTab과 동일한 반응형 */
  @media (max-width: 479px) {
    padding: 6px 16px;
    font-size: 12px;
    letter-spacing: 0;
    min-width: 60px;
  }

  /* 매우 작은 모바일 (width < 360px) - CategoryTab과 동일한 반응형 */
  @media (max-width: 359px) {
    padding: 5px 12px;
    font-size: 11px;
    min-width: 50px;
  }
`,tU=""+new URL("의류_예시이미지_1-DEIqbJVH.webp",import.meta.url).href;function ME({src:t,alt:e}){return A("div",{css:nU,children:A("img",{src:t||tU,alt:e||"의류 이미지",css:iU})})}const nU=N`
  width: 100%;
  height: 100%; /* 부모 영역을 꽉 채우도록 */
  min-height: 0; /* grid/flex 컨테이너 수축 허용 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  overflow: hidden;
`,iU=N`
  width: 100%;
  height: 100%;
  object-fit: cover; /* contain에서 cover로 변경 - 컨테이너를 완전히 채움 */
`;function rU(t){return t.toLocaleString("ko-KR")}function aU({brand:t,name:e,price:i,productUrl:a,tags:s}){const l=e.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g,"$1‑$2");return re("div",{css:sU,children:[A("hr",{css:oU}),re("div",{css:cU,children:[re("div",{css:xd,children:[A("span",{css:Yl,children:"BRAND"}),A("span",{css:vS,children:t})]}),re("div",{css:xd,children:[A("span",{css:Yl,children:"NAME"}),A("span",{css:vS,children:l})]}),re("div",{css:xd,children:[A("span",{css:Yl,children:"PRICE"}),re("span",{css:uU,children:["₩ ",rU(i)]})]}),a&&re("div",{css:xd,children:[A("span",{css:Yl,children:"URL"}),A("a",{css:dU,href:a,target:"_blank",rel:"noreferrer",children:a})]})]}),s.length>0&&re("div",{css:fU,children:[A("span",{css:Yl,children:"TAGS"}),A("div",{css:hU,children:s.map((c,d)=>A("span",{css:pU,children:c},d))})]}),A("hr",{css:lU})]})}const sU=N`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: space-between;
  color: #e6e8eb;
`,oU=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin-right: 20px;
`,lU=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin: 0;
`,cU=N`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,xd=N`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  gap: 50px;
`,Yl=N`
  font-weight: 800;
  font-size: 17px;
  color: #a8e840;
  min-width: 60px;
  border-bottom: 1px solid #2a2a2a;
  width: 10%;
  letter-spacing: 0.02em;
`,vS=N`
  color: #e6e8eb;
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  flex: 1;
  white-space: normal; /* 여러 줄 허용 */
  word-break: keep-all; /* 한국어 단어 단위로 줄바꿈 */
  overflow-wrap: anywhere; /* 너무 긴 토큰은 적절히 분할 */
`,uU=N`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  flex: 1;
`,dU=N`
  color: #60a5fa; /* 네온 블루 기본 강조 */
  text-decoration: none;
  text-align: right;
  font-size: 13px;
  flex: 1;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: anywhere;

  &:hover {
    color: #3b82f6; /* hover 시 더 진한 네온 블루 */
    text-decoration: underline;
    text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  }
`,fU=N`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,hU=N`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,pU=N`
  background: #111111; /* 네온: 다크 베이스 */
  color: #a8e840; /* 네온 라임 */
  padding: 6px 12px;
  border-radius: 4px; /* 직각에 가까운 라운드 */
  border: 1px solid #2a2a2a; /* 다크 보더 */
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-height: 30px;
  line-height: 1;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
    transform: translateY(-1px);
  }
`;function mU({open:t,onClose:e,data:i,onLikeChange:a}){const{isLoggedIn:s,member:l}=fn(),[c,d]=E.useState(null),[f,h]=E.useState(!1),[m,g]=E.useState(!1),[x,_]=E.useState(null),[w,v]=E.useState(!1);E.useEffect(()=>{const L=O=>{O.key==="Escape"&&t&&e()};return t&&document.addEventListener("keydown",L),()=>{document.removeEventListener("keydown",L)}},[t,e]);const S=E.useCallback(async()=>{try{g(!0),_(null);const L=await ta(i.productId);if(L.success&&L.data){const O={productId:L.data.productId,productBrand:L.data.productBrand,productName:L.data.productName,productPrice:L.data.productPrice,productUrl:L.data.productUrl,styleList:L.data.styleList,productImageUrl:L.data.productImageUrl,liked:L.data.isLiked};d(O)}else _(L.message||"상품 정보를 불러오는데 실패했습니다."),d(i)}catch(L){console.error("상품 상세 정보 조회 실패:",L),_("상품 정보를 불러오는데 실패했습니다."),d(i)}finally{g(!1)}},[i]),C=E.useCallback(async()=>{if(!s||!i.productId){h(!1);return}try{const O=(await Ff()).some(j=>j.productId===i.productId);h(O)}catch(L){console.error("찜 목록 조회 실패:",L),h(!1)}},[s,i.productId]);E.useEffect(()=>{t&&i.productId&&(i.productId&&i.productName&&i.productBrand?(d(i),g(!1)):S(),i.liked!==void 0?h(i.liked):C())},[t,i,S,C]);const M=async()=>{if(!s){v(!0);return}try{if((await Ac(i.productId)).success){await C(),a&&a(i.productId,!f);const O=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),j=O.some(I=>I.productId===i.productId),k={userId:l?.memberId||0,timestamp:new Date().toISOString(),actionType:j?"unlike":"like",productId:i.productId,searchTerm:null};let U;j?U=O.filter(I=>I.productId!==i.productId):U=[...O,k],sessionStorage.setItem("user_actions",JSON.stringify(U));try{await wr([k]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(I){console.error("사용자 액션 전송 중 오류 발생:",I)}if(U.length>=5)try{await wr(U),sessionStorage.removeItem("user_actions")}catch(I){console.error("서버 저장 중 오류 발생:",I)}}}catch(L){console.error("찜하기 토글 실패:",L)}};if(!t)return null;const R=c||i;return Lc.createPortal(re("div",{css:gU,onClick:e,children:[re("div",{css:yU,onClick:L=>L.stopPropagation(),children:[A("button",{css:xU,onClick:e,children:"✕"}),m?A("div",{css:TU,children:"상품 정보를 불러오는 중..."}):x?A("div",{css:EU,children:x}):re(Ar,{children:[A("section",{css:bU,children:re("div",{css:vU,children:[A(ME,{src:R.productImageUrl,alt:R.productName}),A("button",{type:"button",css:SU,onClick:L=>{L.stopPropagation(),M()},"aria-label":"like",children:A("span",{css:_U(f),children:f?"❤️":"♡"})})]})}),A("section",{css:wU,children:A(aU,{brand:R.productBrand,name:R.productName,price:R.productPrice,productUrl:R.productUrl,tags:R.styleList||[]})})]})]}),A(na,{show:w,onClose:()=>v(!1),message:"로그인이 필요합니다."})]}),document.body)}const gU=N`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`,yU=N`
  background: #0f0f10; /* 네온 컨셉 다크 베이스 */
  width: 850px;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid #1a1a1a;
  border-radius: 0; /* 직각 스타일 */
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(168, 232, 64, 0.15);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,xU=N`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #a8e840; /* 네온 라임 */
  font-size: 20px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    color 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #666; /* 회색 */
    transform: scale(1.05);
  }
`,bU=N`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
`,vU=N`
  position: relative;
  width: 100%;
  height: 100%;
`,wU=N`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,SU=N`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid #2a2a2a;
  background: #111111; /* 네온 다크 베이스 */
  border-radius: 4px; /* 직각 무드 */
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.25);
  }
`,_U=t=>N`
  font-size: 16px;
  color: ${t?"#ff4444":"#60a5fa"}; /* liked: 네온 레드, default: 네온 블루 */
  transition:
    color 0.2s ease,
    transform 0.12s ease,
    filter 0.2s ease;
  position: relative;

  button:hover & {
    transform: scale(1.06);
    filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.5));
  }
`,TU=N`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
`,EU=N`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #e03131;
`;function CU({src:t,alt:e}){return A("div",{css:kU,children:A("img",{src:t,alt:e||"코디 이미지",css:AU})})}const kU=N`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  overflow: hidden;
`,AU=N`
  width: 100%;
  height: 100%;
  object-fit: cover; /* contain에서 cover로 변경 - 컨테이너를 완전히 채움 */
`;function RU(t){return t.toLocaleString("ko-KR")}function DU({brand:t="브랜드명",name:e="코디 아이템",price:i=0,productUrl:a="#",tags:s=[],viewMode:l,onChangeViewMode:c}){const d=e.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g,"$1‑$2");return re("div",{css:OU,children:[A("hr",{css:zU}),re("div",{css:MU,children:[A("div",{css:LU,children:A("div",{css:[jU,l==="lower"&&NU]})}),A("button",{css:[wS,l==="upper"&&SS],onClick:()=>c("upper"),children:l==="upper"?A("span",{children:"UPPER"}):A("span",{children:"UPPER"})}),A("button",{css:[wS,l==="lower"&&SS],onClick:()=>c("lower"),children:l==="lower"?A("span",{children:"LOWER"}):A("span",{children:"LOWER"})})]}),re("div",{css:UU,children:[re("div",{css:bd,children:[A("span",{css:Gl,children:"BRAND"}),A("span",{css:_S,children:t})]}),re("div",{css:bd,children:[A("span",{css:Gl,children:"NAME"}),A("span",{css:_S,children:d})]}),re("div",{css:bd,children:[A("span",{css:Gl,children:"PRICE"}),re("span",{css:IU,children:["₩ ",RU(i)]})]}),re("div",{css:bd,children:[A("span",{css:Gl,children:"URL"}),A("a",{css:BU,href:a,target:"_blank",rel:"noreferrer",children:a})]})]}),re("div",{css:$U,children:[s&&s.length>0&&re("div",{css:VU,children:[A("span",{css:Gl,children:"TAGS"}),A("div",{css:FU,children:s.map((f,h)=>A("span",{css:HU,children:f},h))})]}),A("hr",{css:PU})]})]})}const OU=N`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: space-between;
  color: #e6e8eb;
`,MU=N`
  display: flex;
  align-items: center;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 4px;
  position: relative;
  justify-content: flex-start;
  width: fit-content;
  height: 34px;
  margin-bottom: 8px;
`,LU=N`
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: transparent;
  border-radius: 4px;
  pointer-events: none;
`,jU=N`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 4px;
  transition: transform 0.25s ease;
  box-shadow:
    inset 0 0 0 1px #2a2a2a,
    0 0 0 rgba(168, 232, 64, 0);
  z-index: 0; /* 버튼 텍스트가 위에 오도록 */
  pointer-events: none;
`,NU=N`
  transform: translateX(100%);
`,wS=N`
  padding: 6px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: #adb5bd;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`,SS=N`
  color: #a8e840;
  text-shadow: 0 0 8px rgba(168, 232, 64, 0.35);
`,zU=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin-right: 20px;
`,PU=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin: 0;
`,UU=N`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,bd=N`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  gap: 50px;
`,Gl=N`
  font-weight: 800;
  font-size: 17px;
  color: #a8e840;
  min-width: 60px;
  border-bottom: 1px solid #2a2a2a;
  width: 10%;
  letter-spacing: 0.02em;
`,_S=N`
  color: #e6e8eb;
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  flex: 1;
  white-space: normal; /* 여러 줄 허용 */
  word-break: keep-all; /* 한국어 단어 단위로 줄바꿈 */
  overflow-wrap: anywhere; /* 너무 긴 토큰은 적절히 분할 */
`,IU=N`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  flex: 1;
`,BU=N`
  color: #60a5fa;
  text-decoration: none;
  text-align: right;
  font-size: 13px;
  flex: 1;
  white-space: normal;
  word-break: break-all; /* URL은 중간 분할 허용 */
  overflow-wrap: anywhere;

  &:hover {
    color: #3b82f6;
    text-decoration: underline;
    text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  }
`,VU=N`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,FU=N`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,HU=N`
  background: #111111;
  color: #a8e840;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #2a2a2a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-height: 30px;
  line-height: 1;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
    transform: translateY(-1px);
  }
`,$U=N`
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;function qU({open:t,onClose:e,data:i,upperLiked:a,lowerLiked:s,onToggleUpperLike:l,onToggleLowerLike:c}){const{isLoggedIn:d,member:f}=fn(),[h,m]=E.useState("upper"),[g,x]=E.useState(!1);E.useEffect(()=>{const M=R=>{R.key==="Escape"&&t&&e()};return t&&document.addEventListener("keydown",M),()=>{document.removeEventListener("keydown",M)}},[t,e]);const _=M=>{if(!d){x(!0);return}M()},w=async M=>{const R=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),L=R.some(k=>k.productId===M),O={userId:f?.memberId||0,timestamp:new Date().toISOString(),actionType:L?"unlike":"like",productId:M,searchTerm:null};let j;L?j=R.filter(k=>k.productId!==M):j=[...R,O],sessionStorage.setItem("user_actions",JSON.stringify(j));try{await wr([O]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(k){console.error("사용자 액션 전송 중 오류 발생:",k)}if(j.length>=1)try{await wr(j),sessionStorage.removeItem("user_actions")}catch(k){console.error("서버 저장 중 오류 발생:",k)}},v=()=>{_(async()=>{await l(),i.upper?.id&&await w(i.upper.id)})},S=()=>{_(async()=>{await c(),i.lower?.id&&await w(i.lower.id)})};if(!t)return null;const C=h==="upper"?i.upper:i.lower;return C?Lc.createPortal(re("div",{css:TS,onClick:e,children:[re("div",{css:ES,onClick:M=>M.stopPropagation(),children:[A("button",{css:CS,onClick:e,children:"✕"}),A("section",{css:YU,children:re("div",{css:GU,children:[A(CU,{src:C.imageUrl,alt:C.name}),A("button",{css:KU,onClick:M=>{M.stopPropagation(),h==="upper"?v():S()},"aria-label":"like",children:A("span",{css:ZU(h==="upper"?a:s),children:(h==="upper"?a:s)?"❤️":"♡"})})]})}),A("section",{css:XU,children:A(DU,{brand:C.brand,name:C.name,price:C.price,productUrl:C.productUrl,tags:C.tags,viewMode:h,onChangeViewMode:m})})]}),A(na,{show:g,onClose:()=>x(!1),message:"로그인이 필요합니다."})]}),document.body):A("div",{css:TS,onClick:e,children:re("div",{css:ES,onClick:M=>M.stopPropagation(),children:[A("button",{css:CS,onClick:e,children:"✕"}),re("p",{children:["선택한 ",h==="upper"?"상의":"하의"," 정보가 없습니다."]})]})})}const TS=N`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`,ES=N`
  background: #0f0f10;
  width: 850px;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid #1a1a1a;
  border-radius: 0;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(168, 232, 64, 0.15);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,CS=N`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #a8e840;
  font-size: 20px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    color 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #666; /* 회색 */
    transform: scale(1.05);
  }
`,YU=N`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
`,GU=N`
  position: relative;
  width: 100%;
  height: 100%;
`,XU=N`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,KU=N`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid #2a2a2a;
  background: #111111;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.12s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.25);
  }
`,ZU=t=>N`
  font-size: 16px;
  color: ${t?"#ff4444":"#60a5fa"};
  transition:
    color 0.2s ease,
    transform 0.12s ease,
    filter 0.2s ease;
  position: relative;
  button:hover & {
    transform: scale(1.06);
    filter: drop-shadow(0 0 6px rgba(96, 165, 250, 0.5));
  }
`,QU=async()=>(await Bt.get("/my/likes")).data,WU=t=>t.map(e=>({id:e.productId,image:e.productImageUrl,type:JU(e.productCategory)})),JU=t=>{if(t.toLowerCase().startsWith("lower"))return"bottom";if(t.toLowerCase().startsWith("upper"))return"top";switch(t){case"Upper":return"top";case"Lower":return"bottom";default:return"other"}},eI=Mf()(t=>({wishlistItems:[],rawWishlistData:[],isLoading:!1,error:null,activeCategory:"Total",fetchWishlist:async()=>{t({isLoading:!0,error:null});try{const e=await QU();if(e.success){const i=[...e.data].reverse(),a=WU(i);t({rawWishlistData:i,wishlistItems:a,isLoading:!1,error:null})}else throw{code:e.code,message:e.message,isApiError:!0}}catch(e){console.error("찜목록 조회 실패:",e);let i="찜목록을 불러올 수 없습니다.";if(e&&typeof e=="object"&&"response"in e){const a=e;a.response?.data?.message&&(i=a.response.data.message)}t({error:i,isLoading:!1,wishlistItems:[],rawWishlistData:[]})}},setCategory:e=>{t({activeCategory:e})},clearError:()=>{t({error:null})}})),tI=async()=>(await Bt.get("/my/coordination")).data,nI=async t=>{try{const e=await Bt.delete(`my/coordination/${t}`);return e.status===200?{success:!0,message:e.data?.message||"코디가 성공적으로 삭제되었습니다."}:{success:!1,message:"코디 삭제에 실패했습니다."}}catch(e){if(e instanceof $d){if(e.response?.status===403||e.response?.data?.code===-10403)throw new Error("로그인이 필요합니다.");if(e.response?.data?.code===-10700)throw new Error("존재하지 않는 코디입니다.");if(e.response?.data?.code===-10701)throw new Error("본인의 코디만 삭제할 수 있습니다.");const i=e.response?.data?.message||"코디 삭제 중 오류가 발생했습니다.";throw new Error(i)}throw new Error("코디 삭제 중 알 수 없는 오류가 발생했습니다.")}},iI=t=>{const e=[];return t.forEach(i=>{const a=i.upperId&&i.upperImageUrl,s=i.lowerId&&i.lowerImageUrl;if(a&&s){const l={id:`${i.coordinationId}-full`,image:i.upperImageUrl||"",type:"full",upperImage:i.upperImageUrl||"",lowerImage:i.lowerImageUrl||"",coordinationId:i.coordinationId,isFullCoordination:!0};e.push(l)}else if(a){const l={id:`${i.coordinationId}-upper`,image:i.upperImageUrl||"",type:"top",upperImage:i.upperImageUrl||"",coordinationId:i.coordinationId,isFullCoordination:!1};e.push(l)}else if(s){const l={id:`${i.coordinationId}-lower`,image:i.lowerImageUrl||"",type:"bottom",lowerImage:i.lowerImageUrl||"",coordinationId:i.coordinationId,isFullCoordination:!1};e.push(l)}}),e},rI=Mf()(t=>({coordinationItems:[],rawCoordinationData:[],isLoading:!1,error:null,activeCategory:"Total",fetchCoordination:async()=>{t({isLoading:!0,error:null});try{const e=await tI();if(e.success){const i=[...e.data||[]].sort((s,l)=>l.coordinationId-s.coordinationId),a=iI(i);t({rawCoordinationData:i,coordinationItems:a,isLoading:!1,error:null})}else throw{code:e.code,message:e.message,isApiError:!0}}catch(e){console.error("코디 목록 조회 실패:",e);let i="내 코디 목록을 불러올 수 없습니다.";if(e&&typeof e=="object"&&"response"in e){const a=e;a.response?.data?.message&&(i=a.response.data.message)}t({error:i,isLoading:!1,coordinationItems:[],rawCoordinationData:[]})}},setCategory:e=>{t({activeCategory:e})},clearError:()=>{t({error:null})}})),kS=async t=>(await Bt.post("/my/coordination",t)).data,AS=t=>!t.upperId&&!t.lowerId?{isValid:!1,message:"상의 또는 하의 중 최소 1개 이상을 선택해주세요"}:{isValid:!0,message:""},aI=async()=>(await Bt.get("/my/mannequins")).data,sI=async(t,e)=>{const i=new FormData;return i.append("image",e),(await Bt.put(`/my/mannequins/${t}`,i,{headers:{Accept:"*/*","Content-Type":"multipart/form-data"}})).data},oI=async t=>(await Bt.put(`/my/mannequins/delete/${t}`)).data,lI=async t=>(await Bt.post("/my/try-on",t,{timeout:6e4})).data,cI=({id:t,type:e,title:i,message:a,duration:s=3e3,onClose:l})=>{const c=E.useRef(null),d=E.useRef(void 0);E.useEffect(()=>{c.current&&On.fromTo(c.current,{y:-60,opacity:0,scale:.9},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.7)"})},[e]),E.useEffect(()=>{const m=()=>{c.current&&On.to(c.current,{y:-60,opacity:0,scale:.9,duration:.4,ease:"power2.in",onComplete:()=>{l(t)}})};return s>0&&(d.current=setTimeout(()=>{m()},s)),()=>{d.current&&clearTimeout(d.current)}},[s,t,l]);const f=()=>{c.current&&On.to(c.current,{y:-60,opacity:0,scale:.9,duration:.4,ease:"power2.in",onComplete:()=>{l(t)}})},h=()=>{d.current&&clearTimeout(d.current),f()};return b.jsxs(uI,{ref:c,$type:e,children:[b.jsxs(dI,{children:[b.jsx(fI,{children:i}),b.jsx(hI,{children:a})]}),b.jsx(pI,{onClick:h})]})},uI=F.div`
  background: linear-gradient(90deg, #1f2333, #22232b);
  color: #f5f5f5;
  padding: 1rem 2rem 1rem 6rem;
  text-align: left;
  border-radius: 0.25rem;
  position: relative;
  font-weight: 300;
  margin: 1rem 0;
  width: auto;
  height: 100%;
  min-width: 320px;
  max-width: 450px;
  min-height: 6rem;
  display: flex;
  align-items: center;
  transition: all 0.5s ease;
  opacity: 1;
  border: 0.15rem solid rgba(255, 255, 255, 0.133);
  box-shadow: inset 0 0 0.5rem 0 #1d1e26;
  font-family: 'Varela Round', sans-serif;
  overflow: visible;

  /* CSS Variables based on type */
  ${({$type:t})=>{const e={help:N`
        --bg: #05478a;
        --clr: #0070e0;
        --brd: rgba(0, 112, 224, 0.25);
      `,success:N`
        --bg: #005e38;
        --clr: #03a65a;
        --brd: rgba(3, 166, 90, 0.25);
      `,warning:N`
        --bg: #c24914;
        --clr: #fc8621;
        --brd: rgba(252, 134, 33, 0.25);
      `,error:N`
        --bg: #851d41;
        --clr: #db3056;
        --brd: rgba(219, 48, 86, 0.25);
      `,info:N`
        --bg: #05478a;
        --clr: #0070e0;
        --brd: rgba(0, 112, 224, 0.25);
      `};return e[t]||e.info}}

  &::before {
    content: '';
    position: absolute;
    width: 6.5rem;
    height: 6.15rem;
    bottom: -0.15rem;
    left: -0.15rem;
    z-index: 0;
    border-radius: 0.35rem;
    background:
      radial-gradient(circle at 0% 50%, var(--clr), transparent 5rem),
      radial-gradient(circle at -50% 50%, var(--bg), transparent 5rem);
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    width: 3.5rem;
    height: 3.5rem;
    background: radial-gradient(
      circle at 50% 50%,
      var(--clr) 1.25rem,
      var(--brd) calc(1.25rem + 1px) 100%
    );
    top: 1.2rem;
    left: 1rem;
    border-radius: 3rem;
    padding-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    box-sizing: border-box;
    color: white;
    z-index: 1;

    ${({$type:t})=>{const e={help:N`
          content: '?';
        `,success:N`
          content: 'L';
          font-size: 1.5rem;
          font-weight: bold;
          padding-bottom: 0.35rem;
          transform: rotateY(180deg) rotate(-38deg);
          text-indent: 0.1rem;
        `,warning:N`
          content: '!';
          font-weight: bold;
        `,error:N`
          content: '+';
          font-size: 2.85rem;
          line-height: 1.2rem;
          transform: rotate(45deg);
        `,info:N`
          content: 'i';
        `};return e[t]||e.info}}
  }
`,dI=F.div`
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 0.5rem;
`,fI=F.h3`
  font-family: 'Varela Round', sans-serif;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.3;
  font-weight: 400;
  color: #f5f5f5;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,hI=F.p`
  font-family: 'Varela Round', sans-serif;
  font-size: 0.85rem;
  color: #e0e0e0;
  line-height: 1.3;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0.15rem 0 0;
  position: relative;
  z-index: 1;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: var(--clr);
    }
  }
`,pI=F.button`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  text-align: center;
  right: 0.75rem;
  top: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #f5f5f5;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '×';
    font-family: 'Varela Round', sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 1;
    display: block;
  }

  &:hover {
    background: var(--clr);
    color: #22232c;
    border-radius: 50%;
  }
`,mI=({toasts:t,onClose:e})=>Lc.createPortal(b.jsx(gI,{children:t.map(i=>b.jsx(cI,{...i,onClose:e},i.id))}),document.body),gI=F.div`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
  padding: 20px;

  > * {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    top: 60px;
    left: 16px;
    right: 16px;
    transform: none;
    padding: 40px 10px 20px 10px;

    > * {
      max-width: none;
      min-width: 0;
    }
  }
`,LE=E.createContext(void 0),yI=({children:t})=>{const[e,i]=E.useState([]),a=E.useCallback(g=>{i(x=>x.filter(_=>_.id!==g))},[]),s=E.useCallback((g,x,_="info",w=3e3)=>{const S={id:`toast-${Date.now()}-${Math.random()}`,type:_,title:g,message:x,duration:w,onClose:a};i(C=>[...C,S]),i(C=>C.length>5?C.slice(-5):C)},[a]),l=E.useCallback((g,x,_=3e3)=>{s(g,x,"success",_)},[s]),c=E.useCallback((g,x,_=4e3)=>{s(g,x,"error",_)},[s]),d=E.useCallback((g,x,_=3500)=>{s(g,x,"warning",_)},[s]),f=E.useCallback((g,x,_=3e3)=>{s(g,x,"info",_)},[s]),h=E.useCallback((g,x,_=3e3)=>{s(g,x,"help",_)},[s]),m={showToast:s,success:l,error:c,warning:d,info:f,help:h};return b.jsxs(LE.Provider,{value:m,children:[t,b.jsx(mI,{toasts:e,onClose:a})]})},xI=()=>{const t=E.useContext(LE);if(t===void 0)throw new Error("useToast must be used within a ToastProvider");return t},bI=()=>{const t=or(),{success:e,error:i,warning:a}=xI(),s=E.useCallback(K=>K===gi||K==="https://myssafy.s3.us-east-1.amazonaws.com/mannequin/default_mannequin.png",[]),{isLoggedIn:l,member:c}=fn(),{wishlistItems:d,rawWishlistData:f,isLoading:h,error:m,activeCategory:g,fetchWishlist:x,setCategory:_,clearError:w}=eI(),{coordinationItems:v,rawCoordinationData:S,isLoading:C,error:M,fetchCoordination:R,clearError:L}=rI(),O=(K,oe)=>{switch(oe.type){case"TOGGLE_MODAL":return{...K,modals:{...K.modals,[oe.modal]:oe.value??!K.modals[oe.modal]}};case"SET_LOADING":return{...K,loading:{...K.loading,[oe.key]:oe.value}};case"SET_SELECTION_MODE":return{...K,selection:{...K.selection,isMode:oe.value}};case"SET_SELECTED_ITEMS":return{...K,selection:{...K.selection,items:oe.items}};case"SET_DRAG_OVER":return{...K,selection:{...K.selection,dragOver:oe.value}};case"SET_CURRENT_TRY_ON":return{...K,tryOn:{...K.tryOn,currentItems:oe.items}};case"SET_FIRST_TRY_ON":return{...K,tryOn:{...K.tryOn,isFirstTryOn:oe.value}};case"RESET_SELECTION":return{...K,selection:{...K.selection,items:{}}};case"SET_DELETE_MODE":return{...K,deleteMode:{...K.deleteMode,isMode:oe.value}};case"SET_SELECTED_CODI_IDS":return{...K,deleteMode:{...K.deleteMode,selectedCodiIds:oe.ids}};case"TOGGLE_CODI_SELECTION":return{...K,deleteMode:{...K.deleteMode,selectedCodiIds:K.deleteMode.selectedCodiIds.includes(oe.id)?K.deleteMode.selectedCodiIds.filter(ve=>ve!==oe.id):[...K.deleteMode.selectedCodiIds,oe.id]}};case"RESET_DELETE_SELECTION":return{...K,deleteMode:{...K.deleteMode,selectedCodiIds:[]}};default:return K}},[j,k]=E.useReducer(O,{modals:{upload:!1,clothesDetail:!1,codiDetail:!1},loading:{tryOn:!1,upload:!1,delete:!1,download:!1,save:!1,deleteCoordination:!1},selection:{isMode:!1,items:{},dragOver:!1},deleteMode:{isMode:!1,selectedCodiIds:[]},tryOn:{currentItems:{},isFirstTryOn:!0}}),[U,I]=E.useState("wishlist"),[Y,W]=E.useState("Total");E.useEffect(()=>{console.log("UI State changed:",{selectionMode:j.selection.isMode,deleteMode:j.deleteMode.isMode,selectedCodiIds:j.deleteMode.selectedCodiIds})},[j.selection.isMode,j.deleteMode.isMode,j.deleteMode.selectedCodiIds]);const[te,me]=E.useState(""),[we,Se]=E.useState(gi),[z,B]=E.useState([gi,gi,gi,gi]),[$,se]=E.useState(null),[ce,P]=E.useState(null),[q,G]=E.useState(!1),[ne,ye]=E.useState(!1),[ue,Te]=E.useState([]),[he,Ce]=E.useState(0),Ue=E.useMemo(()=>ue.length===0?["","","",""]:Array.from({length:4},(K,oe)=>{const ve=ue[oe];return ve&&ve.mannequinImageUrl!=="default_mannequin_image"?ve.mannequinImageUrl:gi}),[ue]),Le=E.useCallback(async()=>{if(l)try{const K=await aI();if(K.success){Te(K.data);const oe=Array.from({length:4},(ve,Ee)=>{const Ve=K.data[Ee];return Ve?.mannequinImageUrl!=="default_mannequin_image"?Ve.mannequinImageUrl:gi});if(B(oe),K.data.length>0&&K.data[0]){Ce(0);const ve=K.data[0].mannequinImageUrl!=="default_mannequin_image"?K.data[0].mannequinImageUrl:gi;me(ve),Se(ve)}}}catch(K){console.error("마네킹 목록 조회 실패:",K)}},[l]);E.useEffect(()=>{if(!l){t("main",{replace:!0,state:{showLoginToast:!0}});return}x(),R(),Le()},[l,t,x,R,Le]),E.useEffect(()=>{W(g)},[g]);const ze=K=>{I(K),j.selection.isMode&&(k({type:"SET_SELECTION_MODE",value:!1}),k({type:"RESET_SELECTION"})),j.deleteMode.isMode&&(k({type:"SET_DELETE_MODE",value:!1}),k({type:"RESET_DELETE_SELECTION"})),K==="wishlist"?(x(),m&&w()):K==="mycodi"&&(R(),M&&L()),W("Total"),_("Total")},ot=K=>{W(K),_(K)},nt=()=>{k({type:"TOGGLE_MODAL",modal:"upload",value:!0})},ct=async()=>{if(!l||!c){i("오류!","로그인이 필요합니다.");return}if(j.loading.delete||j.loading.upload)return;const K=ue[he];if(!K||K.mannequinImageUrl==="default_mannequin_image"){a("삭제 불가","삭제할 마네킹 이미지가 없습니다.");return}try{k({type:"SET_LOADING",key:"delete",value:!0}),await oI(K.mannequinId);const oe=[...ue];oe[he]={...oe[he],mannequinImageUrl:"default_mannequin_image"},Te(oe),me(gi),e("삭제 완료","마네킹 이미지가 삭제되었습니다.")}catch(oe){console.error("마네킹 이미지 삭제 실패:",oe),oe instanceof $d?i("삭제 실패",`마네킹 이미지 삭제에 실패했습니다: ${oe.response?.data?.message||oe.message}`):i("삭제 실패","마네킹 이미지 삭제에 실패했습니다.")}finally{k({type:"SET_LOADING",key:"delete",value:!1})}},ut=()=>{k({type:"TOGGLE_MODAL",modal:"upload",value:!1})},ae=K=>{const oe=K.target.files?.[0];oe&&Je(oe)},Tt=K=>K.size>10485760?{isValid:!1,message:"파일 크기가 10MB를 초과합니다. 더 작은 이미지를 사용해주세요."}:["image/jpeg","image/jpg","image/png","image/webp"].includes(K.type)?{isValid:!0}:{isValid:!1,message:"지원하지 않는 파일 형식입니다. JPG, PNG, WEBP 파일만 업로드해주세요."},Je=async K=>{if(!K){a("파일 선택 필요","파일이 선택되지 않았습니다.");return}const oe=Tt(K);if(!oe.isValid){a("파일 검증 실패",oe.message||"파일 유효성 검사에 실패했습니다.");return}if(!l||!c){i("오류!","로그인이 필요합니다.");return}if(!j.loading.upload)try{if(k({type:"SET_LOADING",key:"upload",value:!0}),ue.length===0){a("잠시만 기다려주세요","마네킹 목록을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");return}const Ee=ue[he].mannequinId,Ve=await sI(Ee,K);if(Ve.success){me(Ve.data.mannequinImageUrl),Se(Ve.data.mannequinImageUrl);const je=[...ue];je[he]={...je[he],mannequinImageUrl:Ve.data.mannequinImageUrl},Te(je),e("업로드 완료","마네킹 이미지가 성공적으로 변경되었습니다!"),k({type:"TOGGLE_MODAL",modal:"upload",value:!1})}}catch(ve){console.error("마네킹 이미지 변경 실패:",ve);let Ee="마네킹 이미지 변경에 실패했습니다.";if(ve instanceof $d){const Ve=ve.response?.status;Ve===413?Ee="파일 크기가 너무 큽니다. 10MB 이하의 이미지를 사용해주세요.":Ve===405?Ee=`API 메소드가 지원되지 않습니다.

백엔드팀에 /my/mannequins 엔드포인트의 허용 메소드(PUT/POST/PATCH)를 확인해주세요.`:Ve===400?Ee=`요청 형식 오류: ${ve.response?.data?.message||"잘못된 요청입니다."}

가능한 원인:
• 파일 형식 문제
• 파라미터명 불일치
• 필수값 누락`:Ve===415?Ee=`지원하지 않는 파일 형식입니다.

PNG 또는 JPG 파일만 업로드해주세요.`:ve.response?.data?.message?Ee=ve.response.data.message:ve.message==="Network Error"&&(Ee=`CORS 또는 네트워크 오류가 발생했습니다.

개발 중에는 백엔드 CORS 설정이 필요합니다.`)}else ve&&typeof ve=="object"&&"code"in ve&&(Ee=`에러 코드: ${ve.code}`);i("업로드 실패",Ee)}finally{k({type:"SET_LOADING",key:"upload",value:!1})}},ht=K=>{K.preventDefault(),k({type:"SET_DRAG_OVER",value:!0})},pt=K=>{K.preventDefault(),k({type:"SET_DRAG_OVER",value:!1})},Ie=K=>{K.preventDefault(),k({type:"SET_DRAG_OVER",value:!1});const oe=Array.from(K.dataTransfer.files);oe.length>0&&Je(oe[0])},Et=E.useCallback(()=>{j.tryOn.isFirstTryOn&&(Se(te),B(Ue),k({type:"SET_FIRST_TRY_ON",value:!1}))},[j.tryOn.isFirstTryOn,te,Ue]),Ze=E.useCallback(K=>{const oe=v.find(Ee=>Ee.coordinationId===K&&Ee.isFullCoordination),ve=S.find(Ee=>Ee.coordinationId===K);return{rawData:oe,originalData:ve}},[v,S]),Vn=E.useCallback((K,oe,ve)=>{if(oe==="full"){const Ee=parseInt(K.replace("-full","")),{rawData:Ve,originalData:je}=Ze(Ee);if(!Ve||!je?.upperId||!je?.lowerId)throw new Error("코디 정보를 찾을 수 없습니다.");return{mannequinId:ve.mannequinId,upperId:je.upperId,lowerId:je.lowerId}}else{const Ee=K.includes("-")?K.split("-")[0]:K,Ve={mannequinId:ve.mannequinId};return oe==="top"?(Ve.upperId=Ee,j.tryOn.currentItems.lowerId&&(Ve.lowerId=j.tryOn.currentItems.lowerId)):oe==="bottom"&&(Ve.lowerId=Ee,j.tryOn.currentItems.upperId&&(Ve.upperId=j.tryOn.currentItems.upperId)),Ve}},[Ze,j.tryOn.currentItems]),an=async(K,oe)=>{if(j.loading.tryOn)return;const ve={...j.tryOn.currentItems};try{if(k({type:"SET_LOADING",key:"tryOn",value:!0}),oe==="full"){const An=parseInt(K.replace("-full","")),{originalData:cn}=Ze(An);cn&&k({type:"SET_CURRENT_TRY_ON",items:{upperId:cn.upperId||void 0,lowerId:cn.lowerId||void 0}})}else{const An=K.includes("-")?K.split("-")[0]:K,cn={};oe==="top"?(cn.upperId=An,j.tryOn.currentItems.lowerId&&(cn.lowerId=j.tryOn.currentItems.lowerId)):oe==="bottom"&&(cn.lowerId=An,j.tryOn.currentItems.upperId&&(cn.upperId=j.tryOn.currentItems.upperId)),k({type:"SET_CURRENT_TRY_ON",items:cn})}Et();const Ee=ue[he];if(!Ee){a("마네킹 선택 필요","마네킹을 선택해주세요.");return}const Ve=Vn(K,oe,Ee),je=await lI(Ve),gt=je.data?.UnionImageUrl||je.data?.unionImageUrl||je.data?.imageUrl||je.data?.image_url||je.UnionImageUrl||je.unionImageUrl||je.imageUrl||je.image_url;if(!gt)throw new Error("AI 이미지 URL을 받지 못했습니다. 서버 응답을 확인해주세요.");const $e=`${gt}?t=${Date.now()}`;me($e);const Ge=[...ue];Ge[he]={...Ge[he],mannequinImageUrl:$e},Te(Ge),setTimeout(()=>{me($e)},100)}catch(Ee){console.error("시착하기 실패:",Ee),k({type:"SET_CURRENT_TRY_ON",items:ve});let Ve="시착하기에 실패했습니다.";if(Ee instanceof $d&&Ee.response){const je=Ee.response.status;je===400?Ve="잘못된 요청입니다. 상품 정보를 확인해주세요.":je===401?Ve="로그인이 필요합니다.":je===404?Ve="마네킹 또는 상품을 찾을 수 없습니다.":je===500?Ve="AI 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.":Ee.response.data?.message&&(Ve=Ee.response.data.message)}i("시착 실패",Ve)}finally{k({type:"SET_LOADING",key:"tryOn",value:!1})}},mt=()=>{U!=="wishlist"&&I("wishlist"),k({type:"SET_SELECTION_MODE",value:!0}),k({type:"RESET_SELECTION"})},sn=(K,oe)=>{const ve=j.selection.items;if(oe==="top"){const Ee={...ve,upperId:ve.upperId===K?void 0:K};k({type:"SET_SELECTED_ITEMS",items:Ee})}else if(oe==="bottom"){const Ee={...ve,lowerId:ve.lowerId===K?void 0:K};k({type:"SET_SELECTED_ITEMS",items:Ee})}},yn=async()=>{if(j.loading.save)return;const K=AS(j.selection.items);if(!K.isValid){a("유효성 검사 실패",K.message);return}try{k({type:"SET_LOADING",key:"save",value:!0});const oe=await kS(j.selection.items);oe.success&&(e("저장 완료",oe.message||"코디가 저장되었습니다!"),k({type:"SET_SELECTION_MODE",value:!1}),k({type:"RESET_SELECTION"}),I("mycodi"),R())}catch(oe){console.error("코디 저장 실패:",oe);const ve=oe instanceof Error?oe.message:"코디 저장에 실패했습니다";i("코디 저장 실패",ve)}finally{k({type:"SET_LOADING",key:"save",value:!1})}},kn=!!(j.selection.items.upperId||j.selection.items.lowerId)&&!j.loading.save,Fn=!!(j.tryOn.currentItems.upperId||j.tryOn.currentItems.lowerId),Kt=Fn&&!j.loading.save,ai=async()=>{if(j.loading.save)return;if(!j.tryOn.currentItems.upperId&&!j.tryOn.currentItems.lowerId){a("저장 실패","시착 중인 아이템이 없습니다.");return}const K=AS(j.tryOn.currentItems);if(!K.isValid){a("유효성 검사 실패",K.message);return}try{k({type:"SET_LOADING",key:"save",value:!0});const oe=await kS(j.tryOn.currentItems);oe.success&&(e("저장 완료",oe.message||"시착 중인 코디가 저장되었습니다!"),I("mycodi"),R())}catch(oe){console.error("코디 저장 실패:",oe);const ve=oe instanceof Error?oe.message:"코디 저장에 실패했습니다";i("코디 저장 실패",ve)}finally{k({type:"SET_LOADING",key:"save",value:!1})}},Ct=()=>{k({type:"SET_SELECTION_MODE",value:!1}),k({type:"RESET_SELECTION"})},hn=()=>{k({type:"SET_DELETE_MODE",value:!0}),k({type:"RESET_DELETE_SELECTION"})},zt=()=>{k({type:"SET_DELETE_MODE",value:!1}),k({type:"RESET_DELETE_SELECTION"})},Qi=K=>{k({type:"TOGGLE_CODI_SELECTION",id:K})},si=async()=>{if(j.loading.deleteCoordination)return;const K=j.deleteMode.selectedCodiIds;if(K.length===0){a("선택 필요","삭제할 코디를 선택해주세요.");return}try{k({type:"SET_LOADING",key:"deleteCoordination",value:!0});const oe=K.map(je=>nI(je)),ve=await Promise.allSettled(oe),Ee=ve.filter(je=>je.status==="fulfilled").length,Ve=ve.filter(je=>je.status==="rejected");if(Ee>0)Ve.length>0?a("부분 삭제 완료",`${Ee}개 코디가 삭제되었습니다. ${Ve.length}개 코디는 삭제에 실패했습니다.`):e("삭제 완료",`${Ee}개 코디가 성공적으로 삭제되었습니다.`),k({type:"SET_DELETE_MODE",value:!1}),k({type:"RESET_DELETE_SELECTION"}),R();else{const je=Ve[0],gt=je.status==="rejected"?je.reason.message:"코디 삭제에 실패했습니다.";i("코디 삭제 실패",gt)}}catch(oe){console.error("코디 삭제 실패:",oe),i("삭제 오류","코디 삭제 중 오류가 발생했습니다.")}finally{k({type:"SET_LOADING",key:"deleteCoordination",value:!1})}},on=j.deleteMode.selectedCodiIds.length>0&&!j.loading.deleteCoordination,oi=()=>{const K=he===0?3:he-1;Ce(K),ln(K)},li=()=>{const K=he===3?0:he+1;Ce(K),ln(K)},Hn=K=>{Ce(K),ln(K)},ln=K=>{const oe=ue[K],ve=oe&&oe.mannequinImageUrl!=="default_mannequin_image"?oe.mannequinImageUrl:gi;me(ve),Se(ve),k({type:"SET_CURRENT_TRY_ON",items:{}}),k({type:"SET_FIRST_TRY_ON",value:!0}),B(Ue)},Oe=()=>{if(j.tryOn.isFirstTryOn){a("초기화 불가","시착한 상품이 없어서 초기화할 수 없습니다.");return}me(we);const K=ue.map((oe,ve)=>{if(!oe)return oe;const Ee=z[ve];return{...oe,mannequinImageUrl:Ee===gi?"default_mannequin_image":Ee}});Te(K),k({type:"SET_CURRENT_TRY_ON",items:{}}),k({type:"SET_FIRST_TRY_ON",value:!0})},it=async K=>{if(U==="wishlist")se(K),k({type:"TOGGLE_MODAL",modal:"clothesDetail",value:!0});else if(U==="mycodi"){const oe=parseInt(K.productId),ve=S.find(je=>je.coordinationId===oe);if(!ve){i("코디 조회 실패","코디 정보를 찾을 수 없습니다.");return}const Ee=!ve.upperId||!ve.lowerId,Ve=ve.upperId&&ve.lowerId;if(Ee){const je=ve.upperId||ve.lowerId;if(!je){i("상품 조회 실패","상품 정보를 찾을 수 없습니다.");return}try{const gt=await ta(je);if(gt.success&&gt.data){const $e={productId:gt.data.productId,productBrand:gt.data.productBrand,productName:gt.data.productName,productPrice:gt.data.productPrice,productUrl:gt.data.productUrl,styleList:gt.data.styleList,productImageUrl:gt.data.productImageUrl,liked:gt.data.isLiked};se($e),k({type:"TOGGLE_MODAL",modal:"clothesDetail",value:!0})}else i("상품 로드 실패","상품 정보를 불러오는데 실패했습니다.")}catch(gt){console.error("단일 상품 정보 조회 실패:",gt),i("상품 로드 실패","상품 정보를 불러오는데 실패했습니다.")}}else if(Ve){const je=async $e=>{try{const Ge=await ta($e);if(Ge.success&&Ge.data)return{brand:Ge.data.productBrand,name:Ge.data.productName,price:Ge.data.productPrice,productUrl:Ge.data.productUrl,tags:Ge.data.styleList}}catch(Ge){console.error(`상품 ${$e} 정보 가져오기 실패:`,Ge)}return null},gt=async()=>{try{const $e=await Ff(),Ge=ve.upperId?$e.some(cn=>cn.productId===ve.upperId):!1,An=ve.lowerId?$e.some(cn=>cn.productId===ve.lowerId):!1;return{upperLiked:Ge,lowerLiked:An}}catch($e){return console.error("찜 목록 조회 실패:",$e),{upperLiked:!1,lowerLiked:!1}}};try{const[$e,Ge,An]=await Promise.all([ve.upperId?je(ve.upperId):Promise.resolve(null),ve.lowerId?je(ve.lowerId):Promise.resolve(null),gt()]),cn={id:oe.toString(),upper:ve.upperId?{id:ve.upperId,brand:$e?.brand||"브랜드 정보 없음",name:$e?.name||`상의 (ID: ${ve.upperId})`,price:$e?.price||0,productUrl:$e?.productUrl||"",tags:$e?.tags||[],imageUrl:ve.upperImageUrl||""}:void 0,lower:ve.lowerId?{id:ve.lowerId,brand:Ge?.brand||"브랜드 정보 없음",name:Ge?.name||`하의 (ID: ${ve.lowerId})`,price:Ge?.price||0,productUrl:Ge?.productUrl||"",tags:Ge?.tags||[],imageUrl:ve.lowerImageUrl||""}:void 0};P(cn),G(An.upperLiked),ye(An.lowerLiked),k({type:"TOGGLE_MODAL",modal:"codiDetail",value:!0})}catch($e){console.error("전체 코디 정보 조회 실패:",$e),i("코디 로드 실패","코디 정보를 불러오는데 실패했습니다.")}}}},kt=()=>{k({type:"TOGGLE_MODAL",modal:"clothesDetail",value:!1}),se(null)},de=()=>{k({type:"TOGGLE_MODAL",modal:"codiDetail",value:!1}),P(null)},be=async()=>{if(ce?.upper)try{const K=await Ac(ce.upper.id);K.success?(G(!q),U==="wishlist"&&x()):console.error("상의 찜하기 토글 실패:",K.message)}catch(K){console.error("상의 찜하기 토글 실패:",K)}},pe=async()=>{if(ce?.lower)try{const K=await Ac(ce.lower.id);K.success?(ye(!ne),U==="wishlist"&&x()):console.error("하의 찜하기 토글 실패:",K.message)}catch(K){console.error("하의 찜하기 토글 실패:",K)}},xe=()=>{ce&&(k({type:"TOGGLE_MODAL",modal:"codiDetail",value:!1}),P(null),ce.upper&&ce.lower?an(`${ce.id}-full`,"full"):ce.upper?an(ce.upper.id,"top"):ce.lower&&an(ce.lower.id,"bottom"))},Be=async()=>{if(!j.loading.download)try{const K=te;if(!K||s(K)){a("다운로드 불가","다운로드할 마네킹 이미지가 없습니다.");return}k({type:"SET_LOADING",key:"download",value:!0});const oe=`${K}?${Date.now()}`,ve=await fetch(oe);if(!ve.ok)throw new Error("fetch failed");const Ee=await ve.blob(),Ve=URL.createObjectURL(Ee),je=document.createElement("a");je.href=Ve,je.download=`mannequin-image-${Date.now()}.png`,document.body.appendChild(je),je.click(),document.body.removeChild(je),URL.revokeObjectURL(Ve),e("다운로드 완료!","마네킹 이미지가 성공적으로 다운로드되었습니다.")}catch{i("다운로드 실패!","이미지 다운로드에 실패했습니다.")}finally{k({type:"SET_LOADING",key:"download",value:!1})}};return re(vI,{children:[re(wI,{children:[A(SI,{children:re(_I,{children:[re(TI,{children:[A(EI,{children:"ON"}),A(CI,{children:" - WEAR"})]}),re(kI,{children:["나에게",A("br",{}),A(AI,{children:"딱 맞는"})," 코디를",A("br",{}),"입어보세요"]}),re("div",{css:MI,children:[A("div",{css:RS}),A("p",{css:LI,children:"나만의 피팅 경험"})]}),A("div",{css:RS}),re("div",{css:jI,children:[re("div",{css:[vd,DS],children:[A("span",{css:Vi,children:"ON-WEAR "}),A("span",{css:Vi,children:"ON-WEAR "}),A("span",{css:Vi,children:"ON-WEAR "})]}),re("div",{css:vd,children:[A("span",{css:Vi,children:"GOOD FASHION "}),A("span",{css:Vi,children:"GOOD FASHION "}),A("span",{css:Vi,children:"GOOD FASHION "})]}),re("div",{css:[vd,DS],children:[A("span",{css:[Vi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Vi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Vi,{opacity:.2}],children:"STYLE "})]}),re("div",{css:vd,children:[A("span",{css:[Vi,{opacity:.2}],children:"TREND "}),A("span",{css:[Vi,{opacity:.2}],children:"TREND "}),A("span",{css:[Vi,{opacity:.2}],children:"TREND "})]})]}),re(RI,{children:[A(DI,{}),A(OI,{})]})]})}),A(NI,{children:re(zI,{children:[A(yP,{mannequinImage:te,currentAvatarIndex:he,avatarImages:Ue,onLeftArrow:oi,onRightArrow:li,onThumbnailClick:Hn,isLoading:j.loading.tryOn}),A(CP,{onUploadClick:nt,onDeleteClick:ct,onDownloadClick:Be,isUploading:j.loading.upload,isDeleting:j.loading.delete,isDownloading:j.loading.download,isDefaultMannequin:s(te)}),A(PI,{onClick:Oe,title:"마네킹 이미지 초기화",children:A(yD,{size:20})})]})}),re(UI,{children:[re(II,{children:[A(AP,{activeTab:U,onTabClick:ze}),U==="wishlist"&&A(OP,{activeCategory:Y,onCategoryClick:ot})]}),A(BI,{children:A(o7,{items:U==="wishlist"?d:v,activeTab:U,activeCategory:Y,isLoading:U==="wishlist"?h:C,error:U==="wishlist"?m:M,onRetry:U==="wishlist"?x:R,isSelectionMode:j.selection.isMode,selectedItems:j.selection.items,onItemSelect:sn,onTryOn:an,isTryingOn:j.loading.tryOn,onDetailClick:it,rawWishlistData:f,rawCoordinationData:S,isDeleteMode:j.deleteMode.isMode,selectedCodiIds:j.deleteMode.selectedCodiIds,onCodiSelect:Qi,currentTryOnItems:j.tryOn.currentItems})}),A(OE,{activeTab:U,isSelectionMode:j.selection.isMode,isDeleteMode:j.deleteMode.isMode,onSelectClick:mt,onSaveClick:yn,onCancelClick:Ct,canSave:kn,onDeleteClick:hn,onDeleteSaveClick:si,onDeleteCancelClick:zt,canDelete:on,hasTryOnItems:Fn,onTryOnSaveClick:ai,canTryOnSave:Kt})]})]}),A(H7,{showUploadModal:j.modals.upload,isDragOver:j.selection.dragOver,onClose:ut,onFileUpload:ae,onDragOver:ht,onDragLeave:pt,onDrop:Ie}),$&&A(mU,{open:j.modals.clothesDetail,onClose:kt,data:$}),ce&&A(qU,{open:j.modals.codiDetail,onClose:de,data:ce,upperLiked:q,lowerLiked:ne,onToggleUpperLike:be,onToggleLowerLike:pe,onTryOn:xe})]})},vI=F.div`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
  min-height: 100vh;
  margin: 0;
  background: #0f1115;
  border: none;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`,wI=F.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  min-height: 600px;
  gap: 24px;
  overflow: visible;
  background: #0f1115;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
  @media (max-width: 1200px) {
    min-height: 500px;
    gap: 16px;
    padding: 12px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    min-height: 400px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    min-height: 350px;
  }
`,SI=F.div`
  flex: 0 0 20%;
  height: 100%;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  min-width: 200px;

  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 0;
  }
`,_I=F.div`
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 32px;
  }

  @media (max-width: 1024px) {
    padding: 28px;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`,TI=F.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,EI=F.span`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 38px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`,CI=F.span`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;

  @media (max-width: 1200px) {
    font-size: 42px;
  }

  @media (max-width: 1024px) {
    font-size: 38px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`,kI=F.p`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`,AI=F.span`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,RI=F.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    bottom: 24px;
    left: 24px;
  }
`,DI=F.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`,OI=F.span`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`,MI=N`
  margin-top: 40px;
`,RS=N`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`,LI=N`
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  margin: 0;
`,jI=N`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: skewY(-5deg);
  margin: 20px 0;
  margin-top: 150px;
  height: 400px;
`,vd=N`
  animation: textScrolling 20s linear infinite;
  will-change: transform;
  display: block;
  position: relative;
  white-space: nowrap;

  @keyframes textScrolling {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`,DS=N`
  animation-direction: reverse;
`,Vi=N`
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: transparent;
  -webkit-text-stroke: 2px #a8e840;
  text-transform: uppercase;
  display: inline-block;
  line-height: 0.75;
  font-weight: 800;
  opacity: 0.9;
  user-select: none;
  text-shadow:
    0 0 10px rgba(168, 232, 64, 0.4),
  filter: drop-shadow(0 0 8px rgba(168, 232, 64, 0.6));
`,NI=F.div`
  flex: 0 0 40%;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 25px;
  padding-bottom: 25px;
  min-width: 280px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    margin-bottom: 0;
  }
`,zI=F.div`
  position: relative;
  width: 100%;
  flex: 1; /* 전체 ModelSection 공간을 차지 */
  display: flex;
  flex-direction: column;
`,PI=F.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: 1px solid #404650;
  background: #2c3038;
  color: #e0e6ed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 12;

  &:hover {
    background: #404650;
    border-color: #5a6169;
    color: #ffffff;
    transform: rotate(180deg) scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: rotate(180deg) scale(0.95);
  }

  @media (max-width: 1024px) {
    width: 42px;
    height: 42px;
    top: 18px;
    right: 18px;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    top: 16px;
    right: 16px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    top: 12px;
    right: 12px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`,UI=F.div`
  flex: 0 0 35%; /* 40% → 35%로 축소하여 과도한 너비 문제 해결 */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-bottom: 25px;
  position: relative;
  min-width: 350px; /* 400px → 350px로 축소하여 최적화 */
  overflow: visible;
  transition: all 0.3s ease;
  align-items: center; /* SidePanel 내부 요소들을 중앙 정렬 */
  justify-content: flex-start; /* 위쪽부터 배치 */

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 0;
    padding: 16px;
    align-items: center; /* 모바일에서도 중앙 정렬 유지 */
  }

  @media (max-width: 768px) {
    padding: 12px;
    align-items: center; /* 작은 화면에서도 중앙 정렬 유지 */
  }
`,II=F.div`
  flex-shrink: 0;
  z-index: 10;
  background: #0f1115;
  border-bottom: 1px solid #404650;
  padding: 16px 50px 12px 0px; /* GridContainer와 동일한 우측 여백 적용 */
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  justify-content: center;
  width: 100%; /* 전체 너비 확보 */
  max-width: 100%; /* 부모 컨테이너 너비를 초과하지 않도록 제한 */
  text-align: center; /* 하위 요소들까지 중앙 정렬 */

  @media (max-width: 768px) {
    padding: 8px 40px 8px 0px; /* 모바일에서도 우측 여백 유지 */
    margin: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.8% 35px 0.8% 0px; /* 작은 화면에서도 우측 여백 유지 */
    width: 100%;
  }
`,BI=F.div`
  flex: 1;
  position: relative;
  overflow-y: hidden; /* auto → hidden으로 변경하여 스크롤 제거 */
  overflow-x: visible; /* 페이지네이션 바가 잘리지 않도록 수평 오버플로 허용 */
  max-height: 100%; /* 70%에서 55%로 높이 감소 */
  min-height: 100px;
  padding-right: 50px; /* 페이지네이션 바를 위한 추가 여백 */
  padding-bottom: 0; /* 하단 패딩 제거 - ButtonsContainer와 분리됨 */
  background: #0f1115;
  width: 100%; /* GridContainer가 SidePanel의 전체 너비를 사용하도록 설정 */
  align-self: stretch; /* SidePanel의 중앙 정렬에 영향받지 않고 전체 너비 사용 */

  @media (min-width: 1440px) {
    min-height: 200px;
    padding: 2% 50px 0 1.5%; /* 하단 패딩 제거 */
  }

  @media (min-width: 1200px) and (max-width: 1439px) {
    min-height: 175px;
    padding: 1.8% 1.5%; /* 하단 패딩 제거 */
  }

  @media (max-width: 768px) {
    min-height: 120px;
    padding: 1% 1%; /* 하단 패딩 제거 */
  }

  @media (max-width: 480px) {
    min-height: 100px;
    padding: 0.8% 0.8%; /* 하단 패딩 제거 */
  }
`,VI=()=>A(yI,{children:A(bI,{})});function Hf(){return re("li",{css:HI,children:[A("div",{css:$I,children:A("div",{css:qI})}),re("div",{css:YI,children:[A("div",{css:[Ym,GI]}),A("div",{css:[Ym,XI]}),A("div",{css:[Ym,KI]})]})]})}const FI=Of`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`,jE=N`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${FI} 1.5s infinite;
`,HI=N`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  margin: 8px;
  min-width: 220px;
  min-height: 180px;
`,$I=N`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f8f9fa;
`,qI=N`
  ${jE}
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
`,YI=N`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px 10px;
`,Ym=N`
  ${jE}
  border-radius: 4px;
`,GI=N`
  width: 40%;
  height: 10px;
`,XI=N`
  width: 80%;
  height: 13px;
`,KI=N`
  width: 30%;
  height: 12px;
  margin-top: 4px;
`;function ZI(t){return t.toLocaleString("ko-KR")}function QI({brand:t,name:e,price:i,productUrl:a,tags:s,liked:l,onToggleLike:c,onTryOn:d}){const f=e.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g,"$1‑$2");return re("div",{css:WI,children:[A("hr",{css:JI}),re("div",{css:tB,children:[re("div",{css:wd,children:[A("span",{css:Xl,children:"BRAND"}),A("span",{css:OS,children:t})]}),re("div",{css:wd,children:[A("span",{css:Xl,children:"NAME"}),A("span",{css:OS,children:f})]}),re("div",{css:wd,children:[A("span",{css:Xl,children:"PRICE"}),re("span",{css:nB,children:["₩ ",ZI(i)]})]}),a&&re("div",{css:wd,children:[A("span",{css:Xl,children:"URL"}),A("a",{css:iB,href:a,target:"_blank",rel:"noreferrer",children:a})]})]}),s.length>0&&re("div",{css:rB,children:[A("span",{css:Xl,children:"TAGS"}),A("div",{css:aB,children:s.map((h,m)=>A("span",{css:sB,children:h},m))})]}),A("hr",{css:eB}),re("div",{css:oB,children:[re("button",{css:[MS,lB,l&&cB],onClick:c,children:[l?"❤️":"🩶"," ",l?"LIKED":"LIKE"]}),A("button",{css:[MS,uB],onClick:d,children:"TRY ON"})]})]})}const WI=N`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  justify-content: space-between;
  color: #e6e8eb;
`,JI=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin-right: 20px;
  margin-bottom: 50px;
`,eB=N`
  border: none;
  height: 1px;
  background: #2a2a2a;
  margin: 0;
`,tB=N`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,wd=N`
  display: flex;
  align-items: flex-start;
  padding: 8px 0;
  gap: 50px;
`,Xl=N`
  font-weight: 800;
  font-size: 17px;
  color: #a8e840;
  min-width: 60px;
  border-bottom: 1px solid #2a2a2a;
  width: 10%;
  letter-spacing: 0.02em;
`,OS=N`
  color: #e6e8eb;
  text-align: right;
  font-weight: 700;
  font-size: 13px;
  flex: 1;
  white-space: normal; /* 여러 줄 허용 */
  word-break: keep-all; /* 한국어 단어 단위로 줄바꿈 */
  overflow-wrap: anywhere; /* 너무 긴 토큰은 적절히 분할 */
`,nB=N`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  flex: 1;
`,iB=N`
  color: #60a5fa;
  text-decoration: none;
  text-align: right;
  font-size: 13px;
  flex: 1;
  margin-bottom: 50px;
  white-space: normal; /* 여러 줄 허용 */
  word-break: break-all; /* URL은 중간 분할 허용 */
  overflow-wrap: anywhere; /* 특수문자/긴 토큰 안전 분할 */

  &:hover {
    color: #3b82f6;
    text-decoration: underline;
    text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  }
`,rB=N`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,aB=N`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`,sB=N`
  background: #111111;
  color: #a8e840;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #2a2a2a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-height: 30px;
  line-height: 1;
  transition:
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
    transform: translateY(-1px);
  }
`,oB=N`
  display: flex;
  gap: 12px;
`,MS=N`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
`,lB=N`
  background: #111111;
  color: #d1d5db; /* 회색색 */
  border: 1px solid #2a2a2a;

  &:hover {
    color: #ff4444; /* 네온 레드 */
    box-shadow: 0 0 12px rgba(255, 68, 68, 0.25);
  }
`,cB=N`
  background: #111111;
  color: #ff4444;
  border-color: #2a2a2a;
`,uB=N`
  background: #111111; /* 네온 다크 베이스 */
  color: rgb(236, 236, 236); /* 약간 회색 텍스트 */
  border: 1px solid #2a2a2a;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background: #1a1a1a;
    color: #a8e840; /* 네온 초록 강조 */
    box-shadow: 0 0 12px rgba(168, 232, 64, 0.25);
  }
`;function $c({open:t,onClose:e,data:i,onLikeChange:a}){const s=or(),{isLoggedIn:l,member:c}=fn(),[d,f]=E.useState(null),[h,m]=E.useState(!1),[g,x]=E.useState(!1),[_,w]=E.useState(null),[v,S]=E.useState(!1);E.useEffect(()=>{const k=U=>{U.key==="Escape"&&t&&e()};return t&&document.addEventListener("keydown",k),()=>{document.removeEventListener("keydown",k)}},[t,e]);const C=E.useCallback(async()=>{try{x(!0),w(null);const k=await ta(i.productId);if(k.success&&k.data){const U={productId:k.data.productId,productBrand:k.data.productBrand,productName:k.data.productName,productPrice:k.data.productPrice,productUrl:k.data.productUrl,styleList:k.data.styleList,productImageUrl:k.data.productImageUrl,liked:k.data.isLiked};f(U)}else w(k.message||"상품 정보를 불러오는데 실패했습니다."),f(i)}catch(k){console.error("상품 상세 정보 조회 실패:",k),w("상품 정보를 불러오는데 실패했습니다."),f(i)}finally{x(!1)}},[i]),M=E.useCallback(async()=>{if(!l||!i.productId){m(!1);return}try{const U=(await Ff()).some(I=>I.productId===i.productId);m(U)}catch(k){console.error("찜 목록 조회 실패:",k),m(!1)}},[l,i.productId]),R=E.useCallback(async()=>{if(!c||!i.productId)return;const k={userId:c.memberId,timestamp:new Date().toISOString(),actionType:"goDetail",productId:i.productId,productName:i.productName,productBrand:i.productBrand,productPrice:i.productPrice,searchTerm:null},U=JSON.parse(sessionStorage.getItem("user_actions")||"[]");if(!U.some(Y=>Y.productId===i.productId)){const Y=[...U,k];sessionStorage.setItem("user_actions",JSON.stringify(Y));try{await wr([k]),console.log("모달 열기 액션이 실시간으로 전송되었습니다.")}catch(W){console.error("모달 열기 액션 전송 중 오류 발생:",W)}if(Y.length>=5)try{wr(Y).then(()=>{console.log("사용자 행동 로그가 5개가 되어 서버로 전송되었습니다."),sessionStorage.removeItem("user_actions")})}catch(W){console.error("모달 열기 로그 서버 저장 중 오류 발생:",W)}}},[c,i]);E.useEffect(()=>{t&&i.productId&&(R(),i.productId&&i.productName&&i.productBrand?(f(i),x(!1)):C(),i.liked!==void 0?m(i.liked):M())},[t,i,C,M,R]);const L=async()=>{if(!l){S(!0);return}try{if((await Ac(i.productId)).success){await M(),a&&a(i.productId,!h);const U=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),I=U.some(te=>te.productId===i.productId),Y={userId:c?.memberId||0,timestamp:new Date().toISOString(),actionType:I?"unlike":"like",productId:i.productId,searchTerm:null};let W;I?W=U.filter(te=>te.productId!==i.productId):W=[...U,Y],sessionStorage.setItem("user_actions",JSON.stringify(W));try{await wr([Y]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(te){console.error("사용자 액션 전송 중 오류 발생:",te)}if(W.length>=5)try{await wr(W),sessionStorage.removeItem("user_actions")}catch(te){console.error("서버 저장 중 오류 발생:",te)}}}catch(k){console.error("찜하기 토글 실패:",k)}},O=async()=>{if(!l){S(!0);return}try{if(!h&&(await Ac(i.productId)).success){m(!0),a&&a(i.productId,!0);const U=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),I={userId:c?.memberId||0,timestamp:new Date().toISOString(),actionType:"like",productId:i.productId,searchTerm:null},Y=[...U,I];sessionStorage.setItem("user_actions",JSON.stringify(Y));try{await wr([I]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(W){console.error("사용자 액션 전송 중 오류 발생:",W)}if(Y.length>=5)try{await wr(Y),sessionStorage.removeItem("user_actions")}catch(W){console.error("서버 저장 중 오류 발생:",W)}}}catch(k){console.error("TRY ON 중 찜하기 자동 처리 실패:",k)}finally{e(),s("fittingroom")}};if(!t)return null;const j=d||i;return Lc.createPortal(re("div",{css:dB,onClick:e,children:[re("div",{css:fB,onClick:k=>k.stopPropagation(),children:[A("button",{css:hB,onClick:e,children:"✕"}),g?A("div",{css:yB,children:"상품 정보를 불러오는 중..."}):_?A("div",{css:xB,children:_}):re(Ar,{children:[A("section",{css:pB,children:A("div",{css:mB,children:A(ME,{src:j.productImageUrl,alt:j.productName})})}),A("section",{css:gB,children:A(QI,{brand:j.productBrand,name:j.productName,price:j.productPrice,productUrl:j.productUrl,tags:j.styleList||[],liked:h,onToggleLike:L,onTryOn:O})})]})]}),A(na,{show:v,onClose:()=>S(!1),message:"로그인이 필요합니다."})]}),document.body)}const dB=N`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`,fB=N`
  background: #0f0f10; /* 네온 컨셉 다크 베이스 */
  width: 850px;
  height: 550px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  position: relative;
  border: 1px solid #1a1a1a;
  border-radius: 0;
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.5),
    0 0 24px rgba(168, 232, 64, 0.15);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,hB=N`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  color: #a8e840;
  font-size: 20px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    color 0.2s ease,
    text-shadow 0.2s ease;

  &:hover {
    color: #666; /* 회색 */
    transform: scale(1.05);
  }
`,pB=N`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0; /* grid 아이템 수축 허용 */
`,mB=N`
  position: relative;
  width: 100%;
  height: 100%;
`,gB=N`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,yB=N`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #666;
`,xB=N`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #e03131;
`,ng=t=>Go.post("/user/save",t),NE=(t,e=10,i)=>{const a=new URLSearchParams({page:t.toString(),size:e.toString()});return Go.get(`/recommend?${a.toString()}`)},Cy=t=>Bt.post(`/products/likes/${t}`),zE=()=>Bt.get("/my/likes");function PE(){return A("div",{css:vB,children:A("div",{css:wB})})}const bB=Of`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,vB=N`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`,wB=N`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${bB} 1s linear infinite;
`;function SB(){const{member:t}=fn(),[e,i]=E.useState([]),[a,s]=E.useState(null),[l,c]=E.useState(!1),[d,f]=E.useState(!1),[h,m]=E.useState(!0),[g,x]=E.useState(!1),[_,w]=E.useState(0),[v,S]=E.useState(!0),[C,M]=E.useState([]),[R,L]=E.useState(!1),O=E.useRef(null),j=20,k=100,U=E.useCallback(async()=>{try{return(await zE()).data.data}catch(z){return console.error("Error fetching wishlist products:",z),[]}},[]),I=E.useCallback(async(z,B=!1)=>{B?m(!0):x(!0);try{const $=await U(),se=await NE(z,j),{recommended_products:ce,styleTags:P}=se.data.result;if(B&&P){const ye=P.map(ue=>ue[0]);M(ye)}const q=new Set($.map(ye=>ye.productId)),G=new Map;ce.forEach(ye=>G.set(ye.productId,{...ye,liked:q.has(ye.productId)}));const ne=Array.from(G.values());i(B?ne:ye=>{const ue=[...ye,...ne],Te=new Map;return ue.forEach(he=>Te.set(he.productId,he)),Array.from(Te.values())}),S(ne.length===j&&(z+1)*j<k),B?m(!1):x(!1)}catch($){console.error("Error fetching recommended products:",$),B?m(!1):x(!1)}},[U,j]);E.useEffect(()=>{I(0,!0)},[I]);const Y=E.useCallback(z=>{const{scrollTop:B,clientHeight:$,scrollHeight:se}=z.currentTarget;if(L(B>150),se-B<=$*1.5&&!g&&v){const ce=_+1;w(ce),I(ce,!1)}},[I,g,v,_]),W=()=>{const z=O.current;z&&z.scrollTo({top:0,behavior:"smooth"})},te=async z=>{if(!t){f(!0);return}(await Cy(z)).status===200&&i(q=>q.map(G=>G.productId===z?{...G,liked:!G.liked}:G));const $=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),se=$.some(q=>q.productId===z),ce={userId:t?.memberId||0,timestamp:new Date().toISOString(),actionType:"like",productId:z,searchTerm:null};let P;if(se?P=$.filter(q=>q.productId!==z):P=[...$,ce],sessionStorage.setItem("user_actions",JSON.stringify(P)),P.length>=1)try{await ng(P),console.log("찜 목록이 1개가 되어 서버로 전송되었습니다."),sessionStorage.removeItem("user_actions")}catch(q){console.error("서버 저장 중 오류 발생:",q)}},me=async z=>{try{const $=await ta(z);if($.success&&$.data){const se=$.data,ce={productId:se.productId,productBrand:se.productBrand,productName:se.productName,productPrice:se.productPrice,productImageUrl:se.productImageUrl,productUrl:se.productUrl,styleList:se.styleList,liked:se.isLiked};s(ce),c(!0);const P=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),q={userId:t?.memberId||0,timestamp:new Date().toISOString(),actionType:"goDetail",productId:z,searchTerm:null},G=[...P,q];if(sessionStorage.setItem("user_actions",JSON.stringify(G)),G.length>=1)try{await ng(G),console.log("사용자 행동 로그가 1개가 되어 서버로 전송되었습니다."),sessionStorage.removeItem("user_actions")}catch(ne){console.error("서버 저장 중 오류 발생:",ne)}return}}catch($){console.warn("상품 상세 API 실패, 목록 데이터로 대체합니다.",$)}const B=e.find($=>$.productId===z);if(B){const $={productId:B.productId,productBrand:B.productBrand,productName:B.productName,productPrice:B.productPrice,productImageUrl:B.productImageUrl,productUrl:B.productUrl,styleList:B.styleList,liked:B.liked};s($),c(!0)}else console.warn("상품 정보를 불러오지 못했어요")},we=()=>{c(!1),s(null)},Se=(z,B)=>{i($=>$.map(se=>se.productId===z?{...se,liked:B}:se))};return re(Ar,{children:[re("div",{css:_B,onScroll:Y,ref:O,children:[h?A(Ar,{children:A("ul",{css:LS,children:Array(10).fill(null).map((z,B)=>A(Hf,{},B))})}):re("ul",{css:LS,children:[e.map(z=>A(ks,{product:z,onClick:()=>me(z.productId),onToggleLike:te},z.productId)),g&&A("div",{css:zB,children:A(PE,{})})]}),R&&A("button",{css:PB,onClick:W,children:A(_f,{size:20})})]}),A("div",{css:TB,children:re("div",{css:EB,children:[re("div",{css:CB,children:[A("span",{css:kB,children:"MY"}),A("span",{css:AB,children:"STYLE"})]}),re("p",{css:RB,children:["당신만의",A("br",{}),A("span",{css:DB,children:"맞춤 스타일"}),"로",A("br",{}),"추천해드려요"]}),re("div",{css:UB,children:[A("div",{css:jS}),re("p",{css:IB,children:[t?.memberName,"님의 취향은?"]}),A("p",{css:BB,children:"관심 있는 상품을 찜하고, 취향에 맞는 추천을 받아보세요!"})]}),A("div",{css:jB,children:C.map((z,B)=>re("span",{css:NB,children:["#",z]},B))}),A("div",{css:jS}),re("div",{css:VB,children:[re("div",{css:[Sd,NS],children:[A("span",{css:Fi,children:"ON-WEAR "}),A("span",{css:Fi,children:"ON-WEAR "}),A("span",{css:Fi,children:"ON-WEAR "})]}),re("div",{css:Sd,children:[A("span",{css:Fi,children:"GOOD FASHION "}),A("span",{css:Fi,children:"GOOD FASHION "}),A("span",{css:Fi,children:"GOOD FASHION "})]}),re("div",{css:[Sd,NS],children:[A("span",{css:[Fi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Fi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Fi,{opacity:.2}],children:"STYLE "})]}),re("div",{css:Sd,children:[A("span",{css:[Fi,{opacity:.2}],children:"TREND "}),A("span",{css:[Fi,{opacity:.2}],children:"TREND "}),A("span",{css:[Fi,{opacity:.2}],children:"TREND "})]})]}),re("div",{css:OB,children:[A("span",{css:MB}),A("span",{css:LB})]})]})}),a&&A($c,{open:l,onClose:we,data:a,onLikeChange:Se}),A(na,{show:d,onClose:()=>f(!1),message:"로그인이 필요합니다."})]})}const _B=N`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
  padding: 35px 28px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,TB=N`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`,EB=N`
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`,CB=N`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,kB=N`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,AB=N`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
`,RB=N`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0;
  margin-bottom: 20px;
`,DB=N`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,OB=N`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`,MB=N`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`,LB=N`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`,jB=N`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
`,NB=N`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(168, 232, 64, 0.2);
  border: 1px solid rgba(168, 232, 64, 0.4);
  border-radius: 5px;
  color: #a8e840;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: default;
`,zB=N`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: 20px;
`,PB=N`
  position: fixed;
  right: 280px;
  bottom: 20px;
  z-index: 2000;
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border: 1px solid #a8e840;
  border-radius: 50%;
  color: #a8e840;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }
`,LS=N`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  transition: transform 0.5s ease-in-out;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,UB=N`
  margin-top: 40px;
`,jS=N`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`,IB=N`
  font-size: 25px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
  margin: 0;
`,BB=N`
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -1px;
  margin-top: 10px;
  margin-bottom: -20px;
`,VB=N`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: skewY(-5deg);
  margin: 20px 0;
  margin-top: 150px;
  height: 400px;
`,Sd=N`
  animation: textScrolling 20s linear infinite;
  will-change: transform;
  display: block;
  position: relative;
  white-space: nowrap;

  @keyframes textScrolling {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`,NS=N`
  animation-direction: reverse;
`,Fi=N`
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: transparent;
  -webkit-text-stroke: 2px #a8e840;
  text-transform: uppercase;
  display: inline-block;
  line-height: 0.75;
  font-weight: 800;
  opacity: 0.9;
  user-select: none;
  text-shadow:
    0 0 10px rgba(168, 232, 64, 0.4),
  filter: drop-shadow(0 0 8px rgba(168, 232, 64, 0.6));
`;function FB(){const{member:t}=fn(),[e,i]=E.useState([]),[a,s]=E.useState(null),[,l]=E.useState([]),[c,d]=E.useState(!1),[f,h]=E.useState(null),[m,g]=E.useState(!1),[x,_]=E.useState(!0),[w,v]=E.useState(!1),[S,C]=E.useState(0),[M,R]=E.useState(!0),[L,O]=E.useState(!1),j=E.useRef(null),k=20,U=100,I=E.useCallback(async()=>{try{const $=(await zE()).data.data;l($)}catch(B){console.error("Error fetching wishlist products:",B)}},[]),Y=E.useCallback(async(B,$=!1)=>{$?(h(null),_(!0)):v(!0);try{const se=await NE(B,k),{recommended_products:ce}=se.data.result,P=new Map;ce.forEach(G=>P.set(G.productId,G));const q=Array.from(P.values());i($?q:G=>{const ne=[...G,...q],ye=new Map;return ne.forEach(ue=>ye.set(ue.productId,ue)),Array.from(ye.values())}),R(q.length===k&&(B+1)*k<U),$?_(!1):v(!1)}catch(se){h("추천 상품을 불러오지 못했어요."),console.error("Error fetching recommended products:",se),$?_(!1):v(!1)}},[k]);E.useEffect(()=>{t&&I()},[I,t]),E.useEffect(()=>{Y(0,!0)},[Y]),E.useEffect(()=>{const B=j.current;if(!B)return;const $=()=>{const se=B.scrollTop;O(se>150)};return B.addEventListener("scroll",$),()=>B.removeEventListener("scroll",$)},[]);const W=()=>{const B=j.current;B&&B.scrollTo({top:0,behavior:"smooth"})},te=E.useCallback(B=>{const{scrollTop:$,clientHeight:se,scrollHeight:ce}=B.currentTarget;if(ce-$<=se*1.5&&!w&&M){const P=S+1;C(P),Y(P,!1)}},[Y,w,M,S]),me=()=>{d(!1),s(null)},we=async B=>{if(!t){g(!0);return}(await Cy(B)).status===200&&i(G=>G.map(ne=>ne.productId===B?{...ne,liked:!ne.liked}:ne));const se=JSON.parse(sessionStorage.getItem("liked_products")||"[]"),ce=se.some(G=>G.productId===B),P={userId:t?.memberId||0,timestamp:new Date().toISOString(),actionType:"like",productId:B,searchTerm:null};let q;if(ce?q=se.filter(G=>G.productId!==B):q=[...se,P],sessionStorage.setItem("liked_products",JSON.stringify(q)),q.length>=5)try{await ng(q),console.log("찜 목록이 5개가 되어 서버로 전송되었습니다."),sessionStorage.removeItem("liked_products")}catch(G){console.error("서버 저장 중 오류 발생:",G)}},Se=async B=>{try{const $=await ta(B);if($.success&&$.data){const se={productId:$.data.productId,productBrand:$.data.productBrand,productName:$.data.productName,productPrice:$.data.productPrice,productImageUrl:$.data.productImageUrl,productUrl:$.data.productUrl,styleList:$.data.styleList,liked:$.data.isLiked};s(se),d(!0)}}catch($){console.error("Error fetching product detail:",$)}},z=(B,$)=>{i(se=>se.map(ce=>ce.productId===B?{...ce,liked:$}:ce))};return re(Ar,{children:[A("div",{css:HB,children:x?re(Ar,{children:[A("div",{css:$B,children:A("ul",{css:XS,children:Array(10).fill(null).map((B,$)=>A(Hf,{},$))})}),A("div",{css:zS,children:re("div",{css:PS,children:[re("div",{css:US,children:[A("span",{css:IS,children:"SHUFFLE"}),A("span",{css:BS,children:"PICKs"})]}),re("p",{css:VS,children:["로그인하고",A("br",{}),A("span",{css:FS,children:"나만의 스타일"}),"로",A("br",{}),"추천받아보세요"]}),re("div",{css:HS,children:[A("span",{css:$S}),A("span",{css:qS})]})]})})]}):re(Ar,{children:[f&&A("div",{css:qB,children:f}),re("div",{css:YB,ref:j,onScroll:te,children:[L&&A("button",{css:QB,onClick:W,children:A(_f,{size:20})}),re("ul",{css:XS,children:[e.map(B=>A(ks,{product:B,onClick:()=>Se(B.productId),onToggleLike:we},B.productId)),w?A("div",{css:ZB,children:A(PE,{})}):!M&&e.length>0&&re("div",{css:WB,children:[A("div",{css:KS}),A("p",{css:JB,children:"모든 상품을 불러왔어요"}),A("div",{css:KS})]})]})]}),A("div",{css:zS,children:re("div",{css:PS,children:[re("div",{css:US,children:[A("span",{css:IS,children:"HOT"}),A("span",{css:BS,children:"ITEMS"})]}),re("p",{css:VS,children:["로그인하고",A("br",{}),A("span",{css:FS,children:"나만의 스타일"}),"로",A("br",{}),"추천받아보세요"]}),A("div",{css:GB,children:A("div",{css:YS})}),re("div",{css:XB,children:[A("span",{css:Kl,children:"#상의"}),A("span",{css:Kl,children:"#하의"}),A("span",{css:Kl,children:"#아우터"}),A("span",{css:Kl,children:"#신발"}),A("span",{css:Kl,children:"#악세서리"})]}),A("div",{css:YS}),re("div",{css:KB,children:[re("div",{css:[_d,GS],children:[A("span",{css:Hi,children:"ON-WEAR "}),A("span",{css:Hi,children:"ON-WEAR "}),A("span",{css:Hi,children:"ON-WEAR "})]}),re("div",{css:_d,children:[A("span",{css:Hi,children:"GOOD FASHION "}),A("span",{css:Hi,children:"GOOD FASHION "}),A("span",{css:Hi,children:"GOOD FASHION "})]}),re("div",{css:[_d,GS],children:[A("span",{css:[Hi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Hi,{opacity:.2}],children:"STYLE "}),A("span",{css:[Hi,{opacity:.2}],children:"STYLE "})]}),re("div",{css:_d,children:[A("span",{css:[Hi,{opacity:.2}],children:"TREND "}),A("span",{css:[Hi,{opacity:.2}],children:"TREND "}),A("span",{css:[Hi,{opacity:.2}],children:"TREND "})]})]}),re("div",{css:HS,children:[A("span",{css:$S}),A("span",{css:qS})]})]})})]})}),a&&A($c,{open:c,onClose:me,data:a,onLikeChange:z}),A(na,{show:m,onClose:()=>g(!1),message:"로그인이 필요합니다."})]})}const HB=N`
  display: flex;
  width: 100%;
  height: 100vh;
`,$B=N`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,qB=N`
  text-align: center;
  padding: 20px;
  color: #e03131;
  font-size: 16px;
`,YB=N`
  position: relative;
  width: 80%; /* 3:1 비율로 변경 */
  height: 100vh;
  padding: 0 20px;
  overflow-y: scroll;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,zS=N`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`,PS=N`
  padding: 20px 20px 20px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`,US=N`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,IS=N`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,BS=N`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
`,VS=N`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0;
  margin-bottom: 20px;
`,FS=N`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,HS=N`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`,$S=N`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`,qS=N`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`,GB=N`
  margin-top: 40px;
`,YS=N`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`,XB=N`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
`,Kl=N`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(168, 232, 64, 0.2);
  border: 1px solid rgba(168, 232, 64, 0.4);
  border-radius: 20px;
  color: #a8e840;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: default;
`,KB=N`
  position: relative;
  width: 100%;
  overflow: hidden;
  transform: skewY(-5deg);
  margin: 20px 0;
  margin-top: 150px;
  height: 400px;
`,_d=N`
  animation: textScrolling 20s linear infinite;
  will-change: transform;
  display: block;
  position: relative;
  white-space: nowrap;

  @keyframes textScrolling {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(0%, 0, 0);
    }
  }
`,GS=N`
  animation-direction: reverse;
`,Hi=N`
  font-family: 'Montserrat', sans-serif;
  font-size: 100px;
  color: transparent;
  -webkit-text-stroke: 2px #a8e840;
  text-transform: uppercase;
  display: inline-block;
  line-height: 0.75;
  font-weight: 800;
  opacity: 0.9;
  user-select: none;
  text-shadow:
    0 0 10px rgba(168, 232, 64, 0.4),
  filter: drop-shadow(0 0 5px rgba(168, 232, 64, 0.3));
`,XS=N`
  list-style: none;
  margin: 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  transition: transform 0.5s ease-in-out;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ZB=N`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  padding: 20px;
`,QB=N`
  position: fixed;
  top: 92%;
  bottom: 24px;
  z-index: 2000;
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border: 1px solid #a8e840;
  border-radius: 50%;
  color: #a8e840;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }
`,WB=N`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
  width: 100%;
`,KS=N`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.1),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
`,JB=N`
  color: rgba(168, 232, 64, 0.6);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`;function eV(){const t=fn(a=>a.isLoggedIn),e=fn(a=>a.member),i=fn(a=>a.updateUserInfoFromToken);return t&&e&&(e.memberName==="User"||e.memberEmail==="user@example.com")&&i(),A("div",{css:tV,children:A("div",{css:nV,children:t&&e?A(SB,{}):A(FB,{})})})}const tV=N`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #0f1115;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`,nV=N`
  display: flex;
`;function iV({selectedCategory:t,activeSection:e,categories:i,onCategoryChange:a,onSubCategoryClick:s}){return re("div",{css:rV,children:[re("div",{css:aV,children:[A("button",{css:[ZS,t==="upper"&&QS],onClick:()=>a("upper"),children:"Upper"}),A("button",{css:[ZS,t==="lower"&&QS],onClick:()=>a("lower"),children:"Lower"})]}),A("div",{css:sV,children:i.map(l=>{const c=`${t}/${l.key}`;return A("button",{css:[oV,e===c&&lV],onClick:()=>s(l.key),children:l.label},l.key)})}),A("div",{css:cV})]})}const rV=N`
  background: transparent;
  padding: 0;
  border-bottom: none;
`,aV=N`
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  justify-content: center;
`,ZS=N`
  padding: 0px 16px 20px 16px;
  border: none;
  background: transparent;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  flex: 1;
  min-width: 80px;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #a8e840;
    transition: width 0.3s ease;
    z-index: 2;
  }
`,QS=N`
  color: #a8e840;

  &::after {
    width: 100%;
  }
`,sV=N`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
  padding: 0 2px;
`,oV=N`
  padding: 12px 12px;
  border: 1px solid #374151;
  background: #1a1a1a;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 800;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(168, 232, 64, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: #a8e840;
    background: #0f1115;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(168, 232, 64, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid #a8e840;
    outline-offset: 2px;
  }
`,lV=N`
  background: #0f1115;
  color: #a8e840;
  border: 1px solid #a8e840;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transform: translateY(-1px);

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(168, 232, 64, 0.2),
      transparent
    );
  }

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }
`,cV=N`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 25px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`;function uV({products:t,loading:e,page:i,last:a,onProductClick:s,onToggleLike:l,onPageChange:c,onScrollToTop:d,isLoggedIn:f=!0}){const h=E.useRef(null);return E.useEffect(()=>{const m=new IntersectionObserver(x=>{x[0].isIntersecting&&!e&&!a?c(i+1):x[0].isIntersecting&&a&&d&&d()},{threshold:.1,rootMargin:"50px"}),g=h.current;return g&&m.observe(g),()=>{g&&m.unobserve(g)}},[e,a,i,c,d]),re("div",{css:dV,children:[re("div",{css:fV,children:[t.map(m=>A(ks,{product:{productId:m.productId,productName:m.productName,productBrand:m.productBrand,productPrice:m.productPrice,productImageUrl:m.productImageUrl,productUrl:m.productUrl,styleList:m.styleList,liked:f?m.liked:!1},onClick:s,onToggleLike:l},m.productId)),e&&A("div",{css:pV,children:A("div",{css:mV})})]}),!a&&A("div",{ref:h,css:hV})]})}const dV=N`
  position: relative;
  display: block;
  background: transparent;
  border: none;
  border-radius: 0; /* 네모 박스 */
`,fV=N`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 행은 자동으로 증가하여 30개 이상도 자연스럽게 배치 */
  gap: 0;
  flex: 1;
  /* 고정 높이를 제거해 섹션이 내용에 맞춰 자연스럽게 높이 결정 */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
`,hV=N`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`,pV=N`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border-radius: 8px;
`,mV=N`
  width: 40px;
  height: 40px;
  border: 3px solid #2a2f3a;
  border-top: 3px solid #e5e7eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;function gV({categoryLabel:t,categoryData:e,onProductClick:i,onToggleLike:a,onPageChange:s,onScrollToTop:l,isLoggedIn:c=!0}){return re("div",{css:yV,children:[A("h3",{css:xV,children:t}),e?.error&&A("div",{css:bV,children:e.error}),e?.products&&e.products.length>0?A(uV,{products:e.products,loading:e.loading,page:e.page,last:e.last,onProductClick:i,onToggleLike:a,onPageChange:s,onScrollToTop:l,isLoggedIn:c}):e?.loading?A("div",{css:vV,children:Array(10).fill(null).map((d,f)=>A(Hf,{},f))}):null]})}const yV=N`
  margin-bottom: 60px;
  padding: 8px 8px 12px;
  background: transparent;
  border: none;
  border-radius: 0; /* 직각, 네모 느낌 */
`,xV=N`
  font-size: 28px;
  font-weight: 800;
  color: #e5e7eb;
  margin: 10px 0 24px 0;
  text-align: left; /* 좌측 정렬로 직선적인 헤더 느낌 */
  position: relative;
  padding-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #1f232b; /* 전체 폭 구분선 */
  }
`,bV=N`
  text-align: center;
  padding: 40px;
  font-size: 16px;
  color: #e03131;
`,vV=N`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
`,wV=async(t,e=0,i=30)=>(await Bt.get(`/products/rank?category=${t}&page=${e}&size=${i}`)).data,SV=t=>Bt.post(`/products/likes/${t}`),_V=async()=>(await Bt.get("/my/likes")).data.data,Gm=t=>Go.post("/user/save",t),Xm=[{key:"hoodie",label:"Hoodie"},{key:"knitSweater",label:"Knit"},{key:"longSleeve",label:"Long Sleeve"},{key:"manToManSweat",label:"Sweatshirt"},{key:"piqueCollarTee",label:"Polo"},{key:"shirtBlouse",label:"Shirt"},{key:"shortSleeve",label:"Short Sleeve"},{key:"sleevelessTee",label:"Sleeveless"}],Km=[{key:"cotton",label:"Cotton"},{key:"denim",label:"Denim"},{key:"leggings",label:"Leggings"},{key:"short",label:"Shorts"},{key:"suit",label:"Suit"},{key:"training",label:"Training"}];function WS(){const{member:t,isLoggedIn:e}=fn(),[i,a]=E.useState("upper"),[s,l]=E.useState({}),[c,d]=E.useState(null),[f,h]=E.useState(!1),[m,g]=E.useState(new Set),[x,_]=E.useState(!1),[w,v]=E.useState("upper/hoodie"),[S,C]=E.useState(!1),[M,R]=E.useState(!0),[L,O]=E.useState(!1),j=E.useRef(null);E.useEffect(()=>{(async()=>{if(!e){g(new Set),_(!0);return}try{const B=await _V(),$=new Set(B.map(se=>se.productId));g($),_(!0)}catch(B){console.error("Error fetching liked products:",B),_(!0)}})()},[e,t?.memberId]),E.useEffect(()=>{const z=j.current;if(!z)return;const B=()=>{const $=z.scrollTop;O($>300)};return z.addEventListener("scroll",B),()=>z.removeEventListener("scroll",B)},[]);const k=()=>{const z=j.current;z&&z.scrollTo({top:0,behavior:"smooth"})},U=E.useCallback(async(z,B,$=0,se=!1)=>{const ce=`${z}/${B}`,P=($%10+10)%10;se||l(q=>({...q,[ce]:{...q[ce],loading:!0,error:null}}));try{const q=await wV(ce,P,30);if(q.success&&q.data){const G=q.data.popularClothes.content.map(ne=>({...ne,liked:m.has(ne.productId)}));l(ne=>({...ne,[ce]:{products:se?[...ne[ce]?.products||[],...G]:G,page:P,totalPages:q.data.popularClothes.totalPages,last:q.data.popularClothes.last,loading:!1,error:null}}))}else l(G=>({...G,[ce]:{...G[ce],loading:!1,error:q.message||"상품을 불러오는데 실패했습니다."}}))}catch(q){console.error("Error fetching popular products:",q),l(G=>({...G,[ce]:{...G[ce],loading:!1,error:"상품을 불러오는데 실패했습니다."}}))}},[m]);E.useEffect(()=>{(async()=>{if(!x)return;const[B,$]=w.split("/"),se=`${B}/${$}`;if(s[se]?.products?.length){R(!1);return}R(!0);try{await U(B,$,0,!1)}finally{R(!1)}})()},[w,x,U]);const I=z=>{a(z);const $=(z==="upper"?Xm:Km)[0],se=`${z}/${$.key}`;v(se)},Y=z=>{const B=`${i}/${z}`;v(B)},W=(z,B,$)=>{const se=`${z}/${B}`,ce=s[se];if(ce&&!ce.loading){const P=($%10+10)%10;U(z,B,P,!0)}},te=async z=>{try{const B=await ta(z);if(B.success&&B.data){const $={productId:B.data.productId,productBrand:B.data.productBrand,productName:B.data.productName,productPrice:B.data.productPrice,productUrl:B.data.productUrl,styleList:B.data.styleList,productImageUrl:B.data.productImageUrl,liked:B.data.isLiked};if(d($),h(!0),t){const se={userId:t.memberId,timestamp:new Date().toISOString(),actionType:"goDetail",productId:z,searchTerm:null};try{await Gm([se]),console.log("상품 클릭 goDetail 액션이 실시간으로 전송되었습니다.")}catch(ce){console.error("goDetail 액션 전송 중 오류 발생:",ce)}}}}catch(B){console.error("Error fetching product detail:",B)}},me=()=>{h(!1),d(null)},we=(z,B)=>{g($=>{const se=new Set($);return B?se.add(z):se.delete(z),se}),l($=>{const se={...$};return Object.keys(se).forEach(ce=>{se[ce]={...se[ce],products:se[ce].products.map(P=>P.productId===z?{...P,liked:B}:P)}}),se})},Se=async z=>{if(!e){C(!0);return}try{(await SV(z)).status===200&&(g(q=>{const G=new Set(q);return G.has(z)?G.delete(z):G.add(z),G}),l(q=>{const G={...q};return Object.keys(G).forEach(ne=>{G[ne]={...G[ne],products:G[ne].products.map(ye=>ye.productId===z?{...ye,liked:!ye.liked}:ye)}}),G}));const $=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),se=$.some(q=>q.productId===z),ce={userId:t?.memberId||0,timestamp:new Date().toISOString(),actionType:se?"unlike":"like",productId:z,searchTerm:null};let P;se?P=$.filter(q=>q.productId!==z):P=[...$,ce],sessionStorage.setItem("user_actions",JSON.stringify(P));try{await Gm([ce]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(q){console.error("사용자 액션 전송 중 오류 발생:",q)}if(P.length>=5)try{await Gm(P),sessionStorage.removeItem("user_actions")}catch(q){console.error("서버 저장 중 오류 발생:",q)}}catch(B){console.error("찜하기/찜 취소 처리 중 오류 발생:",B)}};return re("div",{css:TV,children:[A("div",{css:kV,ref:j,children:M?A(Ar,{children:A("div",{css:JS,children:A("div",{css:CV,children:A("div",{css:EV,children:Array(30).fill(null).map((z,B)=>A(Hf,{},B))})})})}):A(Ar,{children:A("div",{css:JS,children:(()=>{const[z,B]=w.split("/"),$=`${z}/${B}`,se=s[$],ce=(i==="upper"?Xm:Km).find(P=>P.key===B)?.label;return A("div",{"data-section":$,children:A(gV,{categoryLabel:ce||"",categoryData:se||{products:[],page:0,totalPages:0,last:!0,loading:!1,error:null},onProductClick:te,onToggleLike:Se,onPageChange:P=>W(z,B,P),onScrollToTop:k,isLoggedIn:e})})})()})})}),A("div",{css:AV,children:re("div",{css:RV,children:[re("div",{css:DV,children:[A("span",{css:OV,children:"HOT"}),A("span",{css:MV,children:"ITEMS"})]}),re("p",{css:LV,children:["지금",A("br",{}),A("span",{css:jV,children:"인기 있는"})," 아이템을",A("br",{}),"만나보세요"]}),A("div",{css:IV}),A("div",{css:NV,children:A(iV,{selectedCategory:i,activeSection:w,categories:i==="upper"?Xm:Km,onCategoryChange:I,onSubCategoryClick:Y})}),re("div",{css:zV,children:[A("span",{css:PV}),A("span",{css:UV})]})]})}),c&&A($c,{open:f,onClose:me,data:c,onLikeChange:we}),A(na,{show:S,onClose:()=>C(!1),message:"로그인이 필요합니다."}),L&&A("button",{css:BV,onClick:k,children:A(_f,{size:20})})]})}const TV=N`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #0f1115;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`,JS=N`
  margin-bottom: 60px;
`,EV=N`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 8px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
`,CV=N`
  margin-bottom: 60px; /* 카테고리 섹션 간 간격 증가 */
  padding: 4px 0; /* 상하 패딩 최소화 */
`,kV=N`
  width: 80%;
  height: 100vh;
  overflow-y: scroll;
  padding: 0 20px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,AV=N`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`,RV=N`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow-y: auto;
  box-sizing: border-box;
`,DV=N`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,OV=N`
  font-size: 32px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,MV=N`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -1px;
`,LV=N`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0 0 20px 0;
`,jV=N`
  color: #a8e840;
  font-weight: 800;
  position: relative;
  z-index: 1;
  letter-spacing: -1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,NV=N`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;
`,zV=N`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: auto;
  padding-top: 20px;
`,PV=N`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`,UV=N`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`,IV=N`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 55px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`,BV=N`
  position: fixed;
  bottom: 20px;
  right: 280px;
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border: 1px solid #a8e840;
  border-radius: 50%;
  color: #a8e840;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transition: all 0.3s ease;
  z-index: 2000;

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    transform: translateY(-2px);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;function VV({query:t,resultCount:e}){return b.jsx(FV,{children:b.jsxs(HV,{children:[b.jsx(e5,{children:'"'}),b.jsx($V,{children:t}),b.jsx(e5,{children:'"'}),b.jsx(qV,{children:"검색 결과"}),b.jsxs(YV,{children:[e.toLocaleString(),"개"]})]})})}const FV=F.div`
  padding: 24px 0 32px;
  margin-bottom: 24px;
  text-align: center;
`,HV=F.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  line-height: 1.3;
`,e5=F.span`
  color: #ffffff;
  font-weight: 800;
`,$V=F.span`
  color: #a8e840;
  font-weight: 800;
`,qV=F.span`
  color: #e5e7eb;
  font-weight: 500;
`,YV=F.span`
  color: #ffffff;
  font-weight: 700;
  // background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 16px;
  display: inline-flex;
  align-items: center;
`,Zm={"under-30k":{min:0,max:3e4},"30k-50k":{min:3e4,max:5e4},"50k-80k":{min:5e4,max:8e4},"80k-100k":{min:8e4,max:1e5},"over-100k":{min:1e5,max:1e8}},GV=[{key:"under-30k",label:"~ 30,000"},{key:"30k-50k",label:"30,000 ~ 50,000"},{key:"50k-80k",label:"50,000 ~ 80,000"},{key:"80k-100k",label:"80,000 ~ 100,000"},{key:"over-100k",label:"100,000 ~"},{key:"custom",label:"CUSTOM"}],Qm={min:0,max:99999};function XV({onPriceRangesChange:t,priceRanges:e=[]}){const[i,a]=E.useState(new Set),[s,l]=E.useState(Qm);E.useEffect(()=>{if(e.length===0)a(new Set),l(Qm);else{const g=new Set;let x=!1;e.forEach(_=>{let w=!1;Object.entries(Zm).forEach(([v,S])=>{S.min===_.min&&S.max===_.max&&(g.add(v),w=!0)}),w||(g.add("custom"),l(_),x=!0)}),a(g),x||l(Qm)}},[e]);const c=g=>{const x=Array.from(g).filter(_=>_!=="custom").map(_=>Zm[_]);return g.has("custom")&&x.push(s),x},d=g=>{const x=new Set(i);g==="custom"?x.has("custom")?x.delete("custom"):(x.clear(),x.add("custom")):x.has(g)?x.delete(g):(x.delete("custom"),x.add(g)),a(x),t(c(x))},f=(g,x)=>{const _=x===""?0:Number(x);let w=isNaN(_)?0:Math.max(0,_);w=Math.min(w,1e8);const S={...s};if(g==="min"?(S.min=w,w>s.max&&(S.max=w)):(S.max=w,w<s.min&&(S.min=w)),l(S),i.has("custom")){const C=new Set(i),M=Array.from(C).filter(R=>R!=="custom").map(R=>Zm[R]);M.push(S),t(M)}},m=((g,x)=>!(g<0||x<0||g>x||g>1e8||x>1e8||g===x&&g===0))(s.min,s.max);return b.jsxs(KV,{children:[b.jsx(ZV,{children:GV.map(g=>b.jsx(QV,{isActive:i.has(g.key),onClick:()=>d(g.key),children:g.label},g.key))}),i.has("custom")&&b.jsxs(WV,{children:[b.jsxs(JV,{children:[b.jsxs(n5,{children:[b.jsx(i5,{children:"MIN"}),b.jsx(r5,{children:"₩"}),b.jsx(t5,{type:"number",placeholder:"0",value:s.min||"",onChange:g=>f("min",g.target.value),min:"0",max:"100000000",isInvalid:!m})]}),b.jsxs(n5,{children:[b.jsx(i5,{children:"MAX"}),b.jsx(r5,{children:"₩"}),b.jsx(t5,{type:"number",placeholder:"99999",value:s.max||"",onChange:g=>f("max",g.target.value),min:"0",max:"100000000",isInvalid:!m})]})]}),!m&&b.jsx(eF,{children:"올바른 가격 범위를 입력해주세요. (최솟값 ≤ 최댓값, 1억원 이하)"}),m&&b.jsxs(tF,{children:["현재 범위: ",s.min.toLocaleString(),"원 ~"," ",s.max.toLocaleString(),"원"]})]})]})}const KV=F.div`
  padding: 0;
  margin: 0;
`,ZV=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`,QV=F.button`
  padding: 12px 16px;
  border: 1px solid ${t=>t.isActive?"#a8e840":"#374151"};
  border-radius: 8px;
  background: ${t=>(t.isActive,"#1a1a1a")};
  color: ${t=>t.isActive?"#a8e840":"#9ca3af"};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    border-color: #a8e840;
    background: ${t=>t.isActive?"#1a1a1a":"#0f1115"};
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: ${t=>t.isActive?"0 2px 8px rgba(168, 232, 64, 0.3), 0 0 12px rgba(168, 232, 64, 0.2)":"0 1px 4px rgba(0, 0, 0, 0.2)"};
  }
`,WV=F.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px auto;
  padding: 14px;
  background: #1a1a1a;
  border-radius: 8px;
  border: 1px solid #374151;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`,t5=F.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid ${t=>t.isInvalid?"#ef4444":"#374151"};
  border-radius: 6px;
  font-size: 13px;
  text-align: center;
  background: #0f1115;
  color: #ffffff;
  font-weight: 600;
  box-sizing: border-box;
  min-width: 0;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t=>t.isInvalid?"#ef4444":"#a8e840"};
    box-shadow: 0 0 0 2px
      ${t=>t.isInvalid?"rgba(239, 68, 68, 0.15)":"rgba(168, 232, 64, 0.15)"};
    background: #1a1a1a;
  }

  &::placeholder {
    color: #9ca3af;
    font-size: 12px;
  }

  /* 숫자 입력 스피너 제거 (선택사항) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`,JV=F.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;
`,n5=F.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
  width: 100%;
`,i5=F.label`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  min-width: 35px;
`,r5=F.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  min-width: 20px;
`,eF=F.div`
  font-size: 11px;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  padding: 6px 8px;
  text-align: center;
  font-weight: 500;
`,tF=F.div`
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  padding: 4px 8px;
  background: rgba(107, 114, 128, 0.1);
  border-radius: 4px;
  font-weight: 500;
`;function nF({onSortChange:t,sortOptions:e}){const[i,a]=E.useState([]),s=e!==void 0?e:i;E.useEffect(()=>{e!==void 0&&a(e)},[e]);const l=d=>{const f=[...s],h=f.indexOf(d);if(h>-1)f.splice(h,1);else{if(d==="name-asc"||d==="name-desc"){const m=f.filter(g=>g!=="name-asc"&&g!=="name-desc");m.push(d),a(m),t(m);return}else if(d==="price-high"||d==="price-low"){const m=f.filter(g=>g!=="price-high"&&g!=="price-low");m.push(d),a(m),t(m);return}f.push(d)}a(f),t(f)},c=[{key:"name-asc",label:"NAME (A - Z)"},{key:"name-desc",label:"NAME (Z - A)"},{key:"price-high",label:"PRICE HIGH"},{key:"price-low",label:"PRICE LOW"}];return b.jsx(iF,{children:c.map(d=>b.jsx(rF,{isActive:s.includes(d.key),onClick:()=>l(d.key),children:d.label},d.key))})}const iF=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`,rF=F.button`
  padding: 12px 16px;
  border: 1px solid ${t=>t.isActive?"#a8e840":"#374151"};
  border-radius: 8px;
  background: ${t=>(t.isActive,"#1a1a1a")};
  color: ${t=>t.isActive?"#a8e840":"#9ca3af"};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    border-color: #a8e840;
    background: ${t=>t.isActive?"#1a1a1a":"#0f1115"};
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: ${t=>t.isActive?"0 2px 8px rgba(168, 232, 64, 0.3), 0 0 12px rgba(168, 232, 64, 0.2)":"0 1px 4px rgba(0, 0, 0, 0.2)"};
  }
`;function aF({onBrandsChange:t,availableBrands:e,selectedBrands:i=[]}){const[a,s]=E.useState(new Set),l=i.length>0?new Set(i):a;E.useEffect(()=>{i.length>0?s(new Set(i)):s(new Set)},[i]);const[c,d]=E.useState(""),[f,h]=E.useState(0),m=6,g=e.filter(k=>k.toLowerCase().includes(c.toLowerCase())),x=Math.ceil((g.length+1)/m),_=f*m,w=_+m,S=["ALL",...g].slice(_,w),C=S.includes("ALL"),M=S.filter(k=>k!=="ALL");E.useEffect(()=>{h(0)},[c]);const R=()=>{h(k=>Math.max(0,k-1))},L=()=>{h(k=>Math.min(x-1,k+1))},O=k=>{const U=new Set(l);U.has(k)?U.delete(k):U.add(k),s(U),t(Array.from(U))},j=()=>{if(l.size===g.length)s(new Set),t([]);else{const k=new Set(g);s(k),t(g)}};return b.jsxs(sF,{children:[b.jsx(hF,{type:"text",placeholder:"브랜드 검색...",value:c,onChange:k=>d(k.target.value)}),b.jsx(oF,{children:b.jsxs(lF,{children:[b.jsxs(cF,{children:[C&&b.jsx(fF,{onClick:j,children:"ALL"}),M.map(k=>b.jsx(pF,{type:"button",isActive:l.has(k),onClick:()=>O(k),children:k},k))]}),x>1&&b.jsxs(uF,{children:[b.jsx(a5,{onClick:R,disabled:f===0,direction:"prev",children:b.jsx(Ng,{size:16})}),b.jsxs(dF,{children:[f+1," / ",x]}),b.jsx(a5,{onClick:L,disabled:f===x-1,direction:"next",children:b.jsx(zg,{size:16})})]})]})}),g.length===0&&c&&b.jsx(mF,{children:"검색 결과가 없습니다."})]})}const sF=F.div`
  padding: 0;
  background: transparent;
`,oF=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`,lF=F.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,cF=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 270px;
  justify-content: flex-start;
  overflow: hidden;
`,uF=F.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
  flex-shrink: 0;
  height: 50px;
`,a5=F.button`
  width: 32px;
  height: 32px;
  border: 1px solid #374151;
  border-radius: 6px;
  background: #1a1a1a;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #a8e840;
    color: #a8e840;
    background: #0f1115;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(168, 232, 64, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,dF=F.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
`,fF=F.button`
  padding: 8px 14px;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #1a1a1a;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background: #0f1115;
    border-color: #a8e840;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`,hF=F.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #374151;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px auto 12px;
  background: #1a1a1a;
  color: #ffffff;
  max-width: 280px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #a8e840;
    box-shadow: 0 0 0 2px rgba(168, 232, 64, 0.15);
    background: #0f1115;
  }

  &::placeholder {
    color: #9ca3af;
  }
`,pF=F.button`
  padding: 12px 16px;
  border: 1px solid ${t=>t.isActive?"#a8e840":"#374151"};
  border-radius: 8px;
  background: ${t=>(t.isActive,"#1a1a1a")};
  color: ${t=>t.isActive?"#a8e840":"#9ca3af"};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #a8e840;
    background: ${t=>t.isActive?"#1a1a1a":"#0f1115"};
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: ${t=>t.isActive?"0 2px 8px rgba(168, 232, 64, 0.3), 0 0 12px rgba(168, 232, 64, 0.2)":"0 1px 4px rgba(0, 0, 0, 0.2)"};
  }
`,mF=F.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 20px;
`;function gF({onStylesChange:t,availableStyles:e,selectedStyles:i=[]}){const[a,s]=E.useState(new Set),l=i.length>0?new Set(i):a;E.useEffect(()=>{i.length>0?s(new Set(i)):s(new Set)},[i]);const[c,d]=E.useState(""),[f,h]=E.useState(0),m=6,g=e.filter(k=>k.toLowerCase().includes(c.toLowerCase())),x=Math.ceil((g.length+1)/m),_=f*m,w=_+m,S=["ALL",...g].slice(_,w),C=S.includes("ALL"),M=S.filter(k=>k!=="ALL");E.useEffect(()=>{h(0)},[c]);const R=()=>{h(k=>Math.max(0,k-1))},L=()=>{h(k=>Math.min(x-1,k+1))},O=k=>{const U=new Set(l);U.has(k)?U.delete(k):U.add(k),s(U),t(Array.from(U))},j=()=>{if(l.size===g.length)s(new Set),t([]);else{const k=new Set(g);s(k),t(g)}};return b.jsxs(yF,{children:[b.jsx(SF,{type:"text",placeholder:"스타일 검색...",value:c,onChange:k=>d(k.target.value)}),b.jsx(xF,{children:b.jsxs(bF,{children:[b.jsxs(vF,{children:[C&&b.jsx(wF,{onClick:j,children:"ALL"}),M.map(k=>b.jsx(CF,{type:"button",isActive:l.has(k),onClick:()=>O(k),children:k},k))]}),x>1&&b.jsxs(_F,{children:[b.jsx(s5,{onClick:R,disabled:f===0,direction:"prev",children:b.jsx(Ng,{size:16})}),b.jsxs(TF,{children:[f+1," / ",x]}),b.jsx(s5,{onClick:L,disabled:f===x-1,direction:"next",children:b.jsx(zg,{size:16})})]})]})}),g.length===0&&c&&b.jsx(EF,{children:"검색 결과가 없습니다."})]})}const yF=F.div`
  padding: 0;
  background: transparent;
`,xF=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 8px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
`,bF=F.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,vF=F.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 270px;
  justify-content: flex-start;
  overflow: hidden;
`,wF=F.button`
  padding: 8px 14px;
  border: 1px solid #374151;
  border-radius: 8px;
  background: #1a1a1a;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 40px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    background: #0f1115;
    border-color: #a8e840;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
`,SF=F.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #374151;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px auto 12px;
  background: #1a1a1a;
  color: #ffffff;
  max-width: 280px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #a8e840;
    box-shadow: 0 0 0 2px rgba(168, 232, 64, 0.15);
    background: #0f1115;
  }

  &::placeholder {
    color: #9ca3af;
  }
`,_F=F.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
  flex-shrink: 0;
  height: 50px;
`,s5=F.button`
  width: 32px;
  height: 32px;
  border: 1px solid #374151;
  border-radius: 6px;
  background: #1a1a1a;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #a8e840;
    color: #a8e840;
    background: #0f1115;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(168, 232, 64, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,TF=F.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
`,EF=F.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  padding: 20px;
`,CF=F.button`
  padding: 12px 16px;
  border: 1px solid ${t=>t.isActive?"#a8e840":"#374151"};
  border-radius: 8px;
  background: ${t=>(t.isActive,"#1a1a1a")};
  color: ${t=>t.isActive?"#a8e840":"#9ca3af"};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #a8e840;
    background: ${t=>t.isActive?"#1a1a1a":"#0f1115"};
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow: ${t=>t.isActive?"0 2px 8px rgba(168, 232, 64, 0.3), 0 0 12px rgba(168, 232, 64, 0.2)":"0 1px 4px rgba(0, 0, 0, 0.2)"};
  }
`;function kF({priceRanges:t,onPriceRangesChange:e,selectedBrands:i,onBrandsChange:a,selectedStyles:s,onStylesChange:l,wishlistOnly:c,onWishlistChange:d,sortOptions:f,onSortChange:h,availableBrands:m,availableStyles:g}){const[x,_]=E.useState(null);return b.jsxs(AF,{children:[x===null&&b.jsxs(b.Fragment,{children:[b.jsx(pr,{children:b.jsxs(mr,{isActive:!1,onClick:()=>{d(!1),_("sort")},children:["SORT ",f.length>0&&`(${f.length})`]})}),b.jsx(pr,{children:b.jsxs(mr,{isActive:!1,onClick:()=>{d(!1),_("price")},children:["PRICE ",t.length>0&&`(${t.length})`]})}),b.jsx(pr,{children:b.jsxs(mr,{isActive:!1,onClick:()=>{d(!1),_("brand")},children:["BRAND ",i.length>0&&`(${i.length})`]})}),b.jsx(pr,{children:b.jsxs(mr,{isActive:!1,onClick:()=>{d(!1),_("style")},children:["STYLE ",s.length>0&&`(${s.length})`]})}),b.jsx(pr,{children:b.jsxs(mr,{isActive:!1,onClick:()=>{d(!0),_("wishlist")},children:["LIKED ",c&&"(PICK)"]})})]}),x==="sort"&&b.jsxs(b.Fragment,{children:[b.jsx(pr,{children:b.jsxs(mr,{isActive:!0,onClick:()=>_(null),children:["SORT ",f.length>0&&`(${f.length})`]})}),b.jsx(Td,{children:b.jsx(Ed,{children:b.jsx(nF,{onSortChange:h,sortOptions:f})})})]}),x==="price"&&b.jsxs(b.Fragment,{children:[b.jsx(pr,{children:b.jsxs(mr,{isActive:!0,onClick:()=>_(null),children:["PRICE ",t.length>0&&`(${t.length})`]})}),b.jsx(Td,{children:b.jsx(Ed,{children:b.jsx(XV,{onPriceRangesChange:e,priceRanges:t})})})]}),x==="brand"&&b.jsxs(b.Fragment,{children:[b.jsx(pr,{children:b.jsxs(mr,{isActive:!0,onClick:()=>_(null),children:["BRAND ",i.length>0&&`(${i.length})`]})}),b.jsx(Td,{children:b.jsx(Ed,{children:b.jsx(aF,{onBrandsChange:a,availableBrands:m,selectedBrands:i})})})]}),x==="style"&&b.jsxs(b.Fragment,{children:[b.jsx(pr,{children:b.jsxs(mr,{isActive:!0,onClick:()=>_(null),children:["STYLE ",s.length>0&&`(${s.length})`]})}),b.jsx(Td,{children:b.jsx(Ed,{children:b.jsx(gF,{onStylesChange:l,availableStyles:g,selectedStyles:s})})})]}),x==="wishlist"&&b.jsx(b.Fragment,{children:b.jsx(pr,{children:b.jsxs(mr,{isActive:!0,onClick:()=>{d(!1),_(null)},children:["LIKED ",c&&"(PICK)"]})})})]})}const AF=F.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #ffffff;
  background: transparent;
`,pr=F.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
  padding: 0 10px;
  width: 100%;
  max-width: 280px;
`,mr=F.button`
  padding: 12px 12px;
  border: 1px solid #374151;
  background: #1a1a1a;
  border-radius: 5px; /*기존 8px*/
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  text-align: center;
  overflow: hidden;
  color: ${t=>t.isActive?"#a8e840":"#9ca3af"};
  transition: all 0.3s ease;

  /* 샤라락 스윕 효과 - HotItems 하위 탭과 동일 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(168, 232, 64, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: #a8e840;
    background: #0f1115;
    color: #a8e840;
    transform: translateY(-1px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(168, 232, 64, 0.2);
  }

  &:hover::before {
    left: 100%;
  }

  ${t=>t.isActive&&`
    background: #0f1115;
    color: #a8e840;
    border: 1px solid #a8e840;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(168, 232, 64, 0.3);
    transform: translateY(-1px);
  `}
`,Td=F.div`
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  max-height: none;
  overflow: hidden;
  overscroll-behavior: contain;
  margin: 12px auto 0;
  padding: 0 20px;
  width: 100%;
  max-width: 280px;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
      max-height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      max-height: 500px;
    }
  }
`,Ed=F.div`
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  overscroll-behavior: contain;
`;function RF(t){return b.jsx(DF,{children:b.jsxs(OF,{children:[b.jsx(MF,{children:b.jsx("span",{children:"FILTERS"})}),b.jsxs(LF,{children:["원하는 조건으로",b.jsx("br",{}),"검색 결과를",b.jsx("br",{}),b.jsx("span",{children:"필터링"}),"하세요"]}),b.jsx(PF,{}),b.jsx(kF,{...t}),b.jsx(UF,{}),b.jsxs(jF,{children:[b.jsx(NF,{}),b.jsx(zF,{})]})]})})}const DF=F.div`
  width: 20%;
  height: 100vh;
  background: #072bed;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  font-family: 'Montserrat', sans-serif;
  overscroll-behavior: contain;
  margin: 0;
  padding: 0;
`,OF=F.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  overscroll-behavior: contain;
`,MF=F.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;

  span:first-of-type {
    font-size: 32px;
    font-weight: 800;
    color: #a8e840;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  span:last-child {
    font-size: 32px;
    font-weight: 800;
    color: #a8e840;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,LF=F.p`
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin: 0 0 20px 0;

  span {
    color: #a8e840;
    font-weight: 800;
    position: relative;
    z-index: 1;
    letter-spacing: -1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`,jF=F.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`,NF=F.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #a8e840;
  box-shadow: 0 0 10px rgba(168, 232, 64, 0.5);
`,zF=F.span`
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #a8e840, rgba(168, 232, 64, 0.3));
`,PF=F.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 55px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`,UF=F.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 232, 64, 0.8),
    rgba(168, 232, 64, 0.3),
    rgba(168, 232, 64, 0.1)
  );
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 2px rgba(168, 232, 64, 0.2);
`;function IF({priceRanges:t,selectedBrands:e,selectedStyles:i,wishlistOnly:a,sortOptions:s,onRemovePriceRange:l,onRemoveBrand:c,onRemoveStyle:d,onRemoveWishlist:f,onRemoveSort:h,onClearAll:m}){return t.length>0||e.length>0||i.length>0||a||s.length>0?b.jsxs(BF,{children:[b.jsxs(VF,{children:[b.jsx(FF,{children:"Applied Filters:"}),b.jsx(HF,{onClick:m,children:"Clear All"})]}),b.jsxs($F,{children:[t.map((x,_)=>b.jsxs(Zl,{children:["Price: ",x.min.toLocaleString(),"~",x.max.toLocaleString(),b.jsx(Ql,{onClick:()=>l(_),children:b.jsx(Sr,{size:12})})]},`price-${_}`)),e.map((x,_)=>b.jsxs(Zl,{children:["Brand: ",x,b.jsx(Ql,{onClick:()=>c(_),children:b.jsx(Sr,{size:12})})]},`brand-${_}`)),i.map((x,_)=>b.jsxs(Zl,{children:["Style: ",x,b.jsx(Ql,{onClick:()=>d(_),children:b.jsx(Sr,{size:12})})]},`style-${_}`)),a&&b.jsxs(Zl,{children:["Wishlist Only",b.jsx(Ql,{onClick:f,children:b.jsx(Sr,{size:12})})]}),s.map((x,_)=>b.jsxs(Zl,{children:["Sort:"," ",x==="name-asc"&&"Name (A-Z)"||x==="name-desc"&&"Name (Z-A)"||x==="price-high"&&"Price (High to Low)"||x==="price-low"&&"Price (Low to High)",b.jsx(Ql,{onClick:()=>h(_),children:b.jsx(Sr,{size:12})})]},`sort-${_}`))]})]}):null}const BF=F.div`
  margin-bottom: 20px;
  padding: 16px;
  background: #0f1115;
  border-radius: 5px;
  border: 1px solid #404040;
`,VF=F.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,FF=F.span`
  font-size: 14px;
  font-weight: 600;
  color: #666;
`,HF=F.button`
  background: none;
  border: 1px solid #666;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #666;
    color: #fff;
  }
`,$F=F.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,Zl=F.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #072bed;
  color: white;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 500;
`,Ql=F.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;function qF({products:t,loading:e,error:i,noResults:a,hasMore:s,onProductClick:l,onToggleLike:c,onLoadMore:d}){const f=E.useRef(null),h=E.useRef(null),m=E.useMemo(()=>t.map(x=>oy(x)),[t]),g=E.useCallback(()=>{f.current&&f.current.disconnect(),f.current=new IntersectionObserver(x=>{x[0].isIntersecting&&s&&!e&&d()},{rootMargin:"100px"}),h.current&&f.current.observe(h.current)},[s,e,d]);return E.useEffect(()=>(t.length>0&&s&&g(),()=>{f.current&&f.current.disconnect()}),[t.length,s,g]),e&&t.length===0?b.jsx(o5,{children:b.jsx(l5,{children:"검색 중..."})}):i?b.jsx(GF,{children:b.jsx(XF,{children:i})}):a?b.jsxs(c5,{children:[b.jsx(Cd,{children:"일치하는 상품이 없습니다"}),b.jsx(Cd,{children:"다른 검색어로 시도해보세요"})]}):t.length===0?b.jsxs(c5,{children:[b.jsx(Cd,{children:"검색 결과가 없습니다"}),b.jsx(Cd,{children:"다른 검색어로 시도해보세요"})]}):b.jsxs(b.Fragment,{children:[b.jsx(YF,{children:m.map(x=>b.jsx(ks,{product:x,onClick:()=>l(x.productId),onToggleLike:c},x.productId))}),s&&t.length>0&&b.jsx(KF,{ref:h,children:e&&b.jsx(o5,{children:b.jsx(l5,{children:"더 많은 상품을 불러오는 중..."})})})]})}const YF=F.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-bottom: 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`,o5=F.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`,l5=F.p`
  font-size: 16px;
  color: #666;
`,GF=F.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`,XF=F.p`
  font-size: 16px;
  color: #dc3545;
`,c5=F.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
`,Cd=F.p`
  font-size: 16px;
  color: #666;
  margin: 8px 0;
`,KF=F.div`
  height: 20px;
  width: 100%;
  margin: 20px 0;
`;function ZF(){const[t]=BM(),e=or(),{isLoggedIn:i,member:a}=fn(),[s,l]=E.useState([]),[c,d]=E.useState([]),[f,h]=E.useState([]),[m,g]=E.useState(!1),[x,_]=E.useState([]),[w,v]=E.useState(!1),[S,C]=E.useState(""),[M,R]=E.useState([]),[L,O]=E.useState(!1),j=E.useRef(null),k=E.useRef(null),[U,I]=E.useState([]),[Y,W]=E.useState(!1),[te,me]=E.useState(null),[we,Se]=E.useState(!1),[z,B]=E.useState(0),[$,se]=E.useState(!1),[ce,P]=E.useState(0),[q,G]=E.useState(0),[ne,ye]=E.useState(new Set),[ue,Te]=E.useState(!1),he=E.useRef(new Set),[Ce,Ue]=E.useState(!1),[Le,ze]=E.useState(null),[ot,nt]=E.useState(!1),ct=t.get("q")||"";E.useEffect(()=>{const de=be=>{be.key==="Escape"&&w&&v(!1)};return document.addEventListener("keydown",de),()=>{document.removeEventListener("keydown",de)}},[w]);const ut=Array.from(new Set(U.map(de=>de.productBrand).filter(Boolean))).sort(),ae=Array.from(new Set(U.flatMap(de=>de.styleList||[]).filter(Boolean))).sort(),Je=[...U.filter(de=>{if(s.length>0){const be=de.productPrice;if(!s.some(xe=>be>=xe.min&&be<=xe.max))return!1}if(c.length>0&&!c.includes(de.productBrand))return!1;if(f.length>0){const be=de.styleList||[];if(!f.some(xe=>be.includes(xe)))return!1}return!(m&&!de.isLiked)})].sort((de,be)=>{if(x.length===0)return 0;const pe=x[0];let xe=0;switch(pe){case"name-asc":xe=de.productName.localeCompare(be.productName);break;case"name-desc":xe=be.productName.localeCompare(de.productName);break;case"price-high":xe=be.productPrice-de.productPrice;break;case"price-low":xe=de.productPrice-be.productPrice;break;default:return 0}if(xe===0&&x.length>1)switch(x[1]){case"name-asc":xe=de.productName.localeCompare(be.productName);break;case"name-desc":xe=be.productName.localeCompare(de.productName);break;case"price-high":xe=be.productPrice-de.productPrice;break;case"price-low":xe=de.productPrice-be.productPrice;break}return xe}),ht=20,pt=s.length>0||c.length>0||f.length>0||m||x.length>0,Ie=pt?Je.slice(0,(q+1)*ht):Je,Et=pt?Ie.length<Je.length:!1,Ze=E.useCallback(async(de,be=0,pe=!0)=>{if(!de.trim()){me("검색어를 입력해주세요.");return}W(!0),me(null),Se(!1);try{const xe=await p3({keyword:de.trim(),page:be,size:20});if(xe.success){const Be=xe.data.content;if(se(!xe.data.last),B(be),pe&&(P(xe.data.totalElements),!i))try{const oe=sessionStorage.getItem("recentSearches");let ve=oe?JSON.parse(oe):[];ve=ve.filter(Ee=>Ee!==de.trim()),ve.unshift(de.trim()),ve=ve.slice(0,10),sessionStorage.setItem("recentSearches",JSON.stringify(ve))}catch(oe){console.error("Failed to save search to session storage:",oe)}const K=Be.map(oe=>({...oe,isLiked:he.current.has(oe.productId)}));I(oe=>pe?K:[...oe,...K]),me(null),Se(!1)}else xe.code===-10605?(I([]),se(!1),P(0),me(null),Se(!0)):me(xe.message||"검색에 실패했습니다.")}catch(xe){console.error("Search error:",xe);const Be=xe;Be.response?.data?.code===-10400?me("검색어를 입력해주세요."):Be.code==="ERR_NETWORK"||Be.message?.includes("Network Error")?me("네트워크 연결을 확인해주세요."):Be.message?.includes("CORS")?me("서버 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요."):me("검색 중 오류가 발생했습니다.")}finally{W(!1)}},[i]),Vn=E.useCallback(async()=>{if(i)try{const de=await m3();de.success&&R(de.data.slice(0,5))}catch(de){console.error("Failed to fetch search history:",de),R([])}else try{const de=sessionStorage.getItem("recentSearches");if(de){const be=JSON.parse(de);R(be.slice(0,5))}else R([])}catch(de){console.error("Failed to fetch session search history:",de),R([])}},[i]);E.useEffect(()=>{C(ct),ct.trim()&&ue?Ze(ct,0,!0):ct.trim()||(I([]),me(null))},[ct,ue,Ze]),E.useEffect(()=>{G(0)},[s,c,f,m,x]),E.useEffect(()=>{he.current=ne},[ne]),E.useEffect(()=>{(async()=>{if(!i){ye(new Set),Te(!0);return}try{const be=await lz();if(be.data&&be.data.data&&Array.isArray(be.data.data)){const pe=new Set(be.data.data.map(xe=>xe.productId));ye(pe)}else ye(new Set);Te(!0)}catch(be){console.error("Failed to fetch liked products:",be),ye(new Set),Te(!0)}})()},[i]),E.useEffect(()=>{Vn()},[Vn]),E.useEffect(()=>{const de=be=>{j.current&&!j.current.contains(be.target)&&v(!1)};return document.addEventListener("mousedown",de),()=>{document.removeEventListener("mousedown",de)}},[]),E.useEffect(()=>{const de=k.current;if(!de)return;const be=()=>{const pe=de.scrollTop;O(pe>300)};return de.addEventListener("scroll",be),()=>de.removeEventListener("scroll",be)},[]);const an=()=>{const de=k.current;de&&de.scrollTo({top:0,behavior:"smooth"})},mt=de=>{de.trim()&&(e({pathname:"search",search:`?q=${encodeURIComponent(de.trim())}`}),v(!1))},sn=()=>{v(!0),Vn()},yn=de=>{C(de.target.value)},kn=de=>{de.key==="Enter"&&mt(S)},Fn=de=>{mt(de)},Kt=async(de,be)=>{if(be.stopPropagation(),i)try{(await z0(de)).success&&(R(xe=>xe.filter(Be=>Be!==de)),Vn())}catch(pe){console.error("Failed to delete search history:",pe)}else try{const pe=sessionStorage.getItem("recentSearches");if(pe){const Be=JSON.parse(pe).filter(K=>K!==de);sessionStorage.setItem("recentSearches",JSON.stringify(Be)),R(K=>K.filter(oe=>oe!==de))}}catch(pe){console.error("Failed to delete session search history:",pe)}},ai=de=>{l(de)},Ct=de=>{_(de)},hn=E.useCallback(async de=>{const be=Ie.find(pe=>pe.productId===de);if(be&&(ze(be),Ue(!0),a)){const pe={userId:a.memberId,timestamp:new Date().toISOString(),actionType:"goDetail",productId:de,searchTerm:ct};try{await Dm([pe]),console.log("상품 클릭 goDetail 액션이 실시간으로 전송되었습니다.")}catch(xe){console.error("goDetail 액션 전송 중 오류 발생:",xe)}}},[Ie,a,ct]),zt=E.useCallback(()=>{Ue(!1),ze(null)},[]),Qi=E.useCallback(async de=>{if(!i){nt(!0);return}const be=ne.has(de);ye(pe=>{const xe=new Set(pe);return xe.has(de)?xe.delete(de):xe.add(de),xe}),I(pe=>pe.map(xe=>xe.productId===de?{...xe,isLiked:!xe.isLiked}:xe));try{(await oz(de)).status!==200&&(ye(ve=>{const Ee=new Set(ve);return be?Ee.add(de):Ee.delete(de),Ee}),I(ve=>ve.map(Ee=>Ee.productId===de?{...Ee,isLiked:be}:Ee)));const xe=JSON.parse(sessionStorage.getItem("user_actions")||"[]"),Be=xe.some(ve=>ve.productId===de),K={userId:a?.memberId||0,timestamp:new Date().toISOString(),actionType:Be?"unlike":"like",productId:de,searchTerm:ct};let oe;Be?oe=xe.filter(ve=>ve.productId!==de):oe=[...xe,K],sessionStorage.setItem("user_actions",JSON.stringify(oe));try{await Dm([K]),console.log("사용자 액션이 실시간으로 전송되었습니다.")}catch(ve){console.error("사용자 액션 전송 중 오류 발생:",ve)}if(oe.length>=5)try{await Dm(oe),sessionStorage.removeItem("user_actions")}catch(ve){console.error("서버 저장 중 오류 발생:",ve)}}catch(pe){console.error("Failed to toggle wishlist:",pe)}},[i,ne,a?.memberId,ct]),si=E.useCallback((de,be)=>{ye(pe=>{const xe=new Set(pe);return be?xe.add(de):xe.delete(de),xe}),I(pe=>pe.map(xe=>xe.productId===de?{...xe,isLiked:be}:xe)),ze(pe=>pe?{...pe,isLiked:be}:null)},[]),on=E.useCallback(()=>{pt?Et&&!Y&&G(de=>de+1):$&&!Y&&Ze(ct,z+1,!1)},[pt,Et,Y,$,Ze,ct,z]),oi=de=>{const be=s.filter((pe,xe)=>xe!==de);l(be)},li=de=>{const be=c.filter((pe,xe)=>xe!==de);d(be)},Hn=de=>{const be=f.filter((pe,xe)=>xe!==de);h(be)},ln=()=>{g(!1)},Oe=de=>{const be=x.filter((pe,xe)=>xe!==de);_(be)},it=()=>{l([]),d([]),h([]),g(!1),_([])},kt=()=>{C(""),e({pathname:"search",search:""})};return b.jsxs(QF,{children:[b.jsxs(WF,{ref:k,children:[b.jsxs(JF,{ref:j,isExpanded:w,children:[b.jsx(eH,{type:"text",value:S,onClick:sn,onChange:yn,onKeyDown:kn,placeholder:"검색어를 입력하세요"}),S&&b.jsx(tH,{onClick:kt,children:b.jsx(Sr,{size:16})}),b.jsx(nH,{onClick:()=>mt(S),children:"🔍︎"}),w&&b.jsxs(iH,{children:[M.length>0&&b.jsxs(b.Fragment,{children:[b.jsx(gs,{children:"최근 검색어"}),b.jsx(rH,{children:M.map((de,be)=>b.jsxs(aH,{onClick:()=>Fn(de),children:[b.jsx(sH,{children:de}),b.jsx(oH,{onClick:pe=>Kt(de,pe),children:b.jsx(Sr,{size:12})})]},be))})]}),b.jsxs(lH,{children:[b.jsxs(u5,{children:[b.jsx(gs,{children:"추천 검색어"}),b.jsx(S3,{onSearch:Fn})]}),b.jsxs(u5,{children:[b.jsx(gs,{children:"실시간 순위"}),b.jsx(w3,{onSearch:Fn})]})]})]})]}),b.jsx(VV,{query:ct,resultCount:pt?Je.length:ce}),b.jsx(IF,{priceRanges:s,selectedBrands:c,selectedStyles:f,wishlistOnly:m,sortOptions:x,onRemovePriceRange:oi,onRemoveBrand:li,onRemoveStyle:Hn,onRemoveWishlist:ln,onRemoveSort:Oe,onClearAll:it}),b.jsx(qF,{products:Ie,loading:Y,error:te,noResults:we,hasMore:pt?Et:$,onProductClick:hn,onToggleLike:Qi,onLoadMore:on})]}),b.jsx(RF,{priceRanges:s,onPriceRangesChange:ai,selectedBrands:c,onBrandsChange:d,selectedStyles:f,onStylesChange:h,wishlistOnly:m,onWishlistChange:g,sortOptions:x,onSortChange:Ct,availableBrands:ut,availableStyles:ae}),Le&&b.jsx($c,{open:Ce,onClose:zt,data:oy(Le),onLikeChange:si}),b.jsx(na,{show:ot,onClose:()=>nt(!1),message:"로그인이 필요합니다."}),L&&b.jsx(cH,{onClick:an,children:b.jsx(_f,{size:20})})]})}const QF=F.div`
  position: fixed;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: none;
  margin: 0;
  padding: 0 0 20px 0;
  background: #0f1115;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`,WF=F.div`
  width: 80%;
  height: 100vh;
  overflow-y: auto;
  padding: 0 20px;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,JF=F.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 80px auto 30px;
  border: 2px solid ${t=>t.isExpanded?"#007bff":"#e9ecef"};
  border-radius: 3px;
  background: white;
  transition: border-color 0.2s ease;
`,eH=F.input`
  width: 100%;
  padding: 12px 20px 12px 40px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  background: transparent;
`,tH=F.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  transition: all 0.2s ease;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    color: #333;
    background-color: #f5f5f5;
    transform: translateY(-50%) scale(1.1);
  }
`,nH=F.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }
`,iH=F.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #0f1115;
  border: 1px solid #072bed;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  margin-top: 8px;
  padding: 20px;
`,rH=F.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`,aH=F.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  margin-top: 5px;
  background: #1a1a1a;
  border: 1px solid #374151;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0f1115;
    border-color: #a8e840;
  }
`,sH=F.span`
  font-size: 14px;
  color: #cccccc;
`,oH=F.button`
  background: none;
  border: none;
  color: #666666;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
    transform: scale(1.1);
  }
`,lH=F.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`,u5=F.div`
  display: flex;
  flex-direction: column;
`,cH=F.button`
  position: fixed;
  bottom: 20px;
  right: 280px;
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  border: 1px solid #a8e840;
  border-radius: 50%;
  color: #a8e840;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(168, 232, 64, 0.3);
  transition: all 0.3s ease;
  z-index: 2000;

  &:hover {
    background: #0f1115;
    color: #60a5fa;
    border-color: #60a5fa;
    transform: translateY(-2px);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`,uH=sy("runpod"),Wm=async t=>{if("file"in t){const e=new FormData;e.append("file",t.file);const{data:i}=await uH.post("/products/image-search",e,{timeout:1e4});return i}throw new Error("Only file upload is supported")};function dH({uploadedImage:t,onImageUpload:e,onReset:i,historyImages:a=[],onSelectHistory:s}){const[l,c]=E.useState(!1),{showToast:d}=Yo(),f=E.useRef(null),h=_=>{_.preventDefault(),_.stopPropagation(),_.dataTransfer&&(_.dataTransfer.dropEffect="copy"),console.log("[DragOver] 영역 진입"),c(!0)},m=_=>{_.preventDefault(),_.stopPropagation(),console.log("[DragLeave] 영역 이탈"),c(!1)},g=_=>{_.preventDefault(),_.stopPropagation(),console.log("[Drop] 드롭 이벤트 수신"),c(!1);const w=_.dataTransfer.files,v=_.dataTransfer.items;let S=null;if(console.log("[Drop] files.length:",w?.length," items.length:",v?.length),w.length>0)console.log("[Drop] files 통해 파일 획득"),S=w[0];else if(v.length>0)for(let M=0;M<v.length;M++){const R=v[M];if(console.log("[Drop] item",M,"kind:",R.kind,"type:",R.type),R.kind==="file"&&R.type.startsWith("image/")){console.log("[Drop] items 통해 이미지 파일 획득"),S=R.getAsFile();break}if(R.kind==="string"&&R.type==="text/uri-list"){R.getAsString(L=>{console.log("[Drop] URL 드롭 감지, URL 전달:",L),e?.({target:{value:L}})});return}}S&&(M=>{if(!M)return!1;if(M.type&&M.type.startsWith("image/"))return!0;const R=M.name?.toLowerCase()||"";return/(\.jpg|\.jpeg|\.png|\.webp|\.gif|\.bmp)$/i.test(R)})(S)?(console.log("[Drop] 업로드 트리거 호출, file:",S?.name,S?.type,S?.size),e?.({target:{files:[S]}})):S||(d("이미지 파일만 업로드할 수 있습니다"),console.warn("[Drop] 처리할 파일 없음"))};return re("div",{css:fH,onDragOver:h,onDragLeave:m,onDrop:g,onPaste:_=>{try{const w=_.clipboardData?.items;if(!w||w.length===0)return;for(let v=0;v<w.length;v++){const S=w[v];if(S.kind==="file"&&S.type.startsWith("image/")){const C=S.getAsFile();if(C){e?.({target:{files:[C]}});return}}}}catch(w){console.warn("[Paste] 처리 실패",w)}},children:[A("div",{css:hH,children:t?re("div",{css:pH,children:[A("img",{src:t,alt:"Uploaded Image",css:mH}),A("button",{type:"button",css:gH,onClick:i,"aria-label":"reset image",children:"✕"})]}):re("div",{css:[SH,l&&AH],onDragOver:h,onDragLeave:m,onDrop:g,onDoubleClick:()=>f.current?.click(),children:[A("input",{type:"file",accept:"image/*",onChange:_=>{const w={target:{files:_.target.files}};e?.(w)},css:CH,id:"mannequin-upload",ref:f}),A("label",{htmlFor:"mannequin-upload",css:kH,children:re("div",{css:d5,children:[A("span",{css:TH,children:A(sT,{css:EH})}),A("p",{css:d5,children:l?"이미지를 놓으세요":"원하는 스타일의 이미지 넣기"}),A("p",{css:_H,children:"붙여넣기(Ctrl+V)와 드래그가 가능해요"})]})})]})}),A("div",{css:yH,children:a&&a.length>0&&A("div",{css:bH,children:A("div",{css:xH,children:a.map((_,w)=>A("button",{type:"button",css:vH,onClick:()=>s?.(_),"aria-label":"select previous image",title:"이전 업로드 사용",children:A("img",{src:_,alt:"history",css:wH})},w))})})})]})}const fH=N`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1px 16px 0 16px;
`,hH=N`
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  max-width: 260px;
  max-height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
`,pH=N`
  position: relative;
  width: 100%;
  height: 100%;
`,mH=N`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgb(17, 17, 17);
`,gH=N`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: scale(1.05);
  }
`,yH=N`
  width: 100%;
  max-width: 260px;
  margin-top: 8px;
`,xH=N`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 44px;
  gap: 8px;
  padding-bottom: 8px;
`,bH=N`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`,vH=N`
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0;
  background: transparent;
  cursor: pointer;
  flex: 0 0 auto;
  overflow: hidden;
`,wH=N`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,SH=N`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.08);
  }
`,d5=N`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);

  p {
    margin: 8px 0 0 0 !important;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.3px;
  }
`,_H=N`
  margin: 4px 0 0 0 !important;
  font-size: 14px !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-weight: 700 !important;
`,TH=N`
  font-size: 32px;
  display: block;
  opacity: 0.9;
`,EH=N`
  width: 50px;
  height: 50px;
`,CH=N`
  display: none;
`,kH=N`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  /* 더블클릭 시 파일 선택 */
  &:active {
    transform: scale(0.995);
  }
`,AH=N`
  border-color: #4dabf7 !important;
  background: rgba(77, 171, 247, 0.08) !important;
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(77, 171, 247, 0.25);
`;function RH({uppers:t,lowers:e,onProductClick:i,onToggleLike:a}){return re("div",{css:DH,children:[re("div",{css:f5,children:[A("div",{css:p5,children:A("h2",{css:h5,children:"Upper"})}),A("div",{css:m5,children:A("div",{css:g5,children:t.map(s=>A(ks,{product:s,onClick:i,onToggleLike:l=>a(l,"tops")},s.productId))})})]}),re("div",{css:f5,children:[A("div",{css:p5,children:A("h2",{css:h5,children:"Lower"})}),A("div",{css:m5,children:A("div",{css:g5,children:e.map(s=>A(ks,{product:s,onClick:i,onToggleLike:l=>a(l,"bottoms")},s.productId))})})]})]})}const DH=N`
  display: flex;
  flex-direction: row;
  gap: 24px;
  height: 100%;
  //   overflow: hidden;
`,f5=N`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  max-width: 50%;
  background: rgb(17, 17, 17);
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  &:last-of-type {
    border-right: none;
  }
`,h5=N`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.3px;
`,p5=N`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 16px 20px;
  background: #072bed;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-color: #a8e840;
`,m5=N`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,g5=N`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
  min-height: 400px;
  max-width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,mo=t=>{const e=t,i=e.product_id,a=e.name,s=e.brand,l=e.price,c=e.thumbnail,d=e.originUrl,f=e.styleList,h=e.isLiked??e.liked??e.is_liked,m=Array.isArray(f)?f:typeof f=="string"?f.split(",").map(g=>g.trim().replace(/\(.*?\)/g,"")).filter(g=>g.length>0):null;return{productId:i,productName:a,productBrand:s,productPrice:l,productImageUrl:c,productUrl:d,styleList:m,liked:!!h}};function OH(){const[t,e]=E.useState(null),[i,a]=E.useState(!1),[s,l]=E.useState(null),[c,d]=E.useState(!1),[f,h]=E.useState([]),[m,g]=E.useState([]),[x,_]=E.useState([]),{showToast:w}=Yo(),v=fn(U=>U.isLoggedIn);E.useEffect(()=>{try{const U=localStorage.getItem("imageSearchHistory");if(U){const I=JSON.parse(U);Array.isArray(I)&&_(I)}}catch{}},[]);const S=U=>{_(I=>{const W=[U,...I.filter(te=>te!==U)].slice(0,10);try{localStorage.setItem("imageSearchHistory",JSON.stringify(W))}catch{}return W})},C=async U=>{if(console.log("[Upload] 이벤트 수신, has files:",!!U?.target?.files," value:",U?.target?.value),U.target?.value&&!U.target?.files){try{const Y=String(U.target.value);console.log("[Upload] URL 드롭 수신:",Y),e(Y),S(Y),await new Promise(me=>requestAnimationFrame(()=>me()));let W=Y;Y.startsWith("https://myssafy.s3.us-east-1.amazonaws.com/")&&(W=`${Y}?${Date.now()}`),a(!0),console.log("[API] URL→File 업로드 시도 (proxiedUrl):",W);try{const we=await(await fetch(W)).blob(),Se=(we.type.split("/")[1]||"jpg").toLowerCase(),z=new File([we],`dropped.${Se}`,{type:we.type}),B=await Wm({file:z});console.log("[API] URL→File 응답 수신, upper:",B.upper?.length," lower:",B.lower?.length);const $=B.upper.map(mo),se=B.lower.map(mo);await R($,se);return}catch(me){console.warn("[API] URL→File 변환 실패, 서버 URL 처리 시도",me)}}catch(Y){console.error("[Upload] URL 처리 실패",Y),w("URL 이미지는 파일 변환/서버 처리 실패. 파일로 업로드해 주세요")}finally{a(!1)}return}const I=U.target.files?.[0];if(I){console.log("[Upload] 파일 선택됨:",I.name,I.type,I.size),a(!0);try{await new Promise(we=>{const Se=new FileReader;Se.onload=z=>{console.log("[Preview] onload 완료, 프리뷰 적용");const B=z.target?.result;e(B),S(B),we(B)},Se.readAsDataURL(I)}),await new Promise(we=>requestAnimationFrame(()=>we())),console.log("[API] 이미지 검색 요청 시작");const W=await Wm({file:I});console.log("[API] 응답 수신, upper:",W.upper?.length," lower:",W.lower?.length);const te=W.upper.map(mo),me=W.lower.map(mo);await R(te,me)}catch(Y){console.error("[API] 오류",Y)}finally{console.log("[API] 처리 종료"),a(!1)}}},M=async U=>{try{S(U),e(U),a(!0);let I;if(/^https?:\/\//i.test(U)){let me=U;U.startsWith("https://myssafy.s3.us-east-1.amazonaws.com/")&&(me=`${U}?${Date.now()}`);const z=await(await fetch(me)).blob(),B=(z.type.split("/")[1]||"jpg").toLowerCase();I=new File([z],`history.${B}`,{type:z.type})}else if(U.startsWith("data:")){const we=await(await fetch(U)).blob(),Se=(we.type.split("/")[1]||"png").toLowerCase();I=new File([we],`pasted.${Se}`,{type:we.type})}else{w("지원하지 않는 이미지 형식입니다");return}const Y=await Wm({file:I}),W=Y.upper.map(mo),te=Y.lower.map(mo);await R(W,te)}catch(I){console.warn("히스토리 이미지 처리 실패",I)}finally{a(!1)}},R=async(U,I)=>{try{const Y=await Ff(),W=new Set(Y.map(we=>String(we.productId))),te=U.map(we=>({...we,liked:W.has(we.productId)||we.liked})),me=I.map(we=>({...we,liked:W.has(we.productId)||we.liked}));h(te),g(me)}catch(Y){console.warn("찜 목록 조회 실패, 원본 리스트로 진행합니다.",Y),h(U),g(I)}};return re("div",{css:MH,children:[re("div",{css:PH,children:[A("div",{css:UH,children:re("div",{css:IH,children:[A("div",{css:LH,children:A("div",{css:jH,children:A("div",{css:NH,children:A("span",{css:zH,children:"Image Search"})})})}),i&&A("div",{css:[FH,HH],role:"status","aria-live":"polite",children:re("span",{children:["상품 검색 중",A("span",{className:"dots",children:"..."})]})}),A(dH,{uploadedImage:t,onImageUpload:C,onReset:()=>{e(null)},historyImages:x,onSelectHistory:M})]})}),A("div",{css:BH,children:A("div",{css:VH,children:A(RH,{uppers:f,lowers:m,onProductClick:async U=>{const I=()=>{const W=[...f,...m].find(te=>te.productId===U);return W?{productId:W.productId,productBrand:W.productBrand,productName:W.productName,productPrice:W.productPrice,productUrl:W.productUrl||"",styleList:W.styleList||null,productImageUrl:W.productImageUrl,liked:W.liked}:null};try{const W=await ta(U);if(W.success&&W.data){const te=W.data,me={productId:te.productId,productBrand:te.productBrand,productName:te.productName,productPrice:te.productPrice,productUrl:te.productUrl,styleList:te.styleList,productImageUrl:te.productImageUrl,liked:te.isLiked};l(me),d(!0);return}}catch(W){console.warn("getProductDetail 실패, 리스트 데이터로 대체합니다.",W)}const Y=I();Y&&(l(Y),d(!0))},onToggleLike:async(U,I)=>{if(!U||U==="undefined"){console.warn("[Like] invalid id, abort"),w("상품 ID를 확인할 수 없습니다");return}if(!v){w("로그인이 필요합니다");return}const Y=W=>W.map(te=>te.productId===U?{...te,liked:!te.liked}:te);I==="tops"?h(W=>Y(W)):g(W=>Y(W));try{await Cy(U)}catch(W){console.error("찜 API 오류",W),I==="tops"?h(te=>Y(te)):g(te=>Y(te)),w("찜 처리 중 오류가 발생했습니다")}}})})})]}),s&&A($c,{open:c,onClose:()=>{d(!1),l(null)},data:s,onLikeChange:(U,I)=>{console.log(`Product ${U} liked: ${I}`)}})]})}const MH=N`
  position: absolute;
  left: 80px;
  right: 0;
  top: 0;
  bottom: 0;
  background:
    radial-gradient(
      1200px 400px at 20% -10%,
      rgba(79, 142, 252, 0.08),
      transparent 60%
    ),
    radial-gradient(
      1000px 350px at 85% 0%,
      rgba(34, 211, 238, 0.06),
      transparent 55%
    ),
    #0f1115;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: left 0.3s ease;

  nav:hover ~ & {
    left: 200px;
  }
`,LH=N`
  padding: 16px 16px 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #072bed;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-color: #a8e840;
`,jH=N`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: -15px;
  gap: 6px;
`,NH=N`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 17px;
`,zH=N`
  font-size: 40px;
  font-weight: 800;
  color: #a8e840;
  letter-spacing: -0.5px;
`,PH=N`
  display: flex;
  gap: 24px;
  height: 100vh;
  max-height: none;
  padding: 20px;
`,UH=N`
  flex: 0 0 340px;
  display: flex;
  justify-content: center;
  align-items: center;
`,IH=N`
  width: 100%;
  height: 100%;
  background: rgb(17, 17, 17);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,BH=N`
  flex: 1;
  height: 100%;
  min-width: 0;
`,VH=N`
  height: 100%;
  background: rgb(17, 17, 17);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid transparent;
    background-clip: padding-box;
  }
`,FH=N`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #e7f0ff;
  font-size: 20px;
  font-weight: 700;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.15);
  // border: 1px solid rgba(79, 142, 252, 0.35);/
  border-radius: 3px;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border-top: 2px solid #a8e840;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .dots::after {
    content: '';
    display: inline-block;
    width: 1.2em;
    text-align: left;
    animation: dots 1.2s steps(4, end) infinite;
  }
  @keyframes dots {
    0%,
    20% {
      content: '';
    }
    40% {
      content: '.';
    }
    60% {
      content: '..';
    }
    80%,
    100% {
      content: '...';
    }
  }
`,HH=N`
  margin: 40px auto 0 auto;
`,$H=()=>b.jsx(LL,{styles:N`
      @font-face {
        font-family: 'NanumSquare';
        src: url('/demos/fashion/fonts/NanumSquareEB.woff') format('woff');
        font-weight: 800;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/demos/fashion/fonts/NanumSquareB.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/demos/fashion/fonts/NanumSquareR.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'NanumSquare';
        src: url('/demos/fashion/fonts/NanumSquareL.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'Open Sans';
        src: url('/demos/fashion/fonts/OpenSans-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/demos/fashion/fonts/OpenSans-Bold.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/demos/fashion/fonts/OpenSans-Semibold.woff') format('woff');
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/demos/fashion/fonts/OpenSans-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'Open Sans';
        src: url('/demos/fashion/fonts/OpenSans-ExtraBold.woff') format('woff');
        font-weight: 800;
        font-style: normal;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'NanumSquare', sans-serif;
        background: #ffffff;
        color: #333;
        line-height: 1.5;
        overflow-x: hidden;
      }

      [lang='en'] {
        font-family: 'Open Sans', sans-serif;
      }
    `});function qH(){return b.jsxs(b.Fragment,{children:[b.jsx($H,{}),b.jsx(ET,{children:b.jsxs(yi,{element:b.jsx(Fz,{}),children:[b.jsx(yi,{index:!0,element:b.jsx(lM,{to:"main",replace:!0})}),b.jsx(yi,{path:"main",element:b.jsx(qw,{})}),b.jsx(yi,{path:"fittingroom",element:b.jsx(VI,{})}),b.jsx(yi,{path:"search",element:b.jsx(ZF,{})}),b.jsx(yi,{path:"image-search",element:b.jsx(OH,{})}),b.jsx(yi,{path:"recommend",element:b.jsx(eV,{})}),b.jsx(yi,{path:"hotitems",element:b.jsx(WS,{})}),b.jsx(yi,{path:"HotItems",element:b.jsx(WS,{})}),b.jsx(yi,{path:"login",element:b.jsx(qw,{})})]})})]})}function YH(){return b.jsxs(b.Fragment,{children:[b.jsx(iO,{richColors:!0}),b.jsx(NM,{children:b.jsxs(ET,{children:[b.jsx(yi,{path:"/",element:b.jsx(uO,{})}),b.jsx(yi,{path:"/demos/fashion/*",element:b.jsx(qH,{})})]})})]})}rk.createRoot(document.getElementById("root")).render(b.jsx(YH,{}));
