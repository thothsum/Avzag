(function(e){function n(n){for(var r,a,u=n[0],i=n[1],l=n[2],f=0,s=[];f<u.length;f++)a=u[f],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&s.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(n);while(s.length)s.shift()();return o.push.apply(o,l||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var u=t[a];0!==c[u]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},c={app:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-250b803b":"f9e8145b","chunk-2efe569b":"0c2328bf","chunk-a9e31e70":"5f4a0a54","chunk-6594f2c6":"e0caef9b","chunk-a398a8a0":"c2bc44af","chunk-d13a70de":"edf5d186","chunk-59410774":"6f06c328","chunk-64066348":"c663f64e","chunk-3e40cc78":"74b8873f","chunk-7fd9e65e":"89065077","chunk-a9981336":"3499c1ce","chunk-ad7fd122":"c1c99e48","chunk-c0a3ff96":"002ed362","chunk-ea4d730a":"c5df3947"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-250b803b":1,"chunk-a9e31e70":1,"chunk-6594f2c6":1,"chunk-a398a8a0":1,"chunk-d13a70de":1,"chunk-59410774":1,"chunk-64066348":1,"chunk-3e40cc78":1,"chunk-7fd9e65e":1,"chunk-a9981336":1,"chunk-ad7fd122":1,"chunk-c0a3ff96":1,"chunk-ea4d730a":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-250b803b":"049c0071","chunk-2efe569b":"31d6cfe0","chunk-a9e31e70":"595711e8","chunk-6594f2c6":"25e478a7","chunk-a398a8a0":"c71209b7","chunk-d13a70de":"0a96254d","chunk-59410774":"05d5e9fb","chunk-64066348":"c46adb24","chunk-3e40cc78":"2ccedfa4","chunk-7fd9e65e":"4bc80ade","chunk-a9981336":"7724f796","chunk-ad7fd122":"3583705d","chunk-c0a3ff96":"ff131b6e","chunk-ea4d730a":"6a849698"}[e]+".css",c=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var l=o[u],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===c))return n()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){l=s[u],f=l.getAttribute("data-href");if(f===r||f===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||c,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],d.parentNode.removeChild(d),t(o)},d.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=o);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var s=new Error;l=function(n){f.onerror=f.onload=null,clearTimeout(d);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,t[1](s)}c[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:f})}),12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var d=f;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("cd49")},"0319":function(e,n,t){"use strict";t.d(n,"c",(function(){return i})),t.d(n,"b",(function(){return l})),t.d(n,"a",(function(){return f}));t("4160"),t("caad"),t("b64b"),t("07ac"),t("2532"),t("159b");var r,a=t("b85c"),c=(t("96cf"),t("1da1")),o=t("3a0b"),u=t("7a23"),i=Object(u["B"])([]),l=Object(u["B"])(),f=Object(u["x"])([]);function s(e){var n,t="",c=Object(a["a"])(r.primary);try{for(c.s();!(n=c.n()).done;){var o=n.value,u=o.ipa,i=o.tags;if(e.includes(u)){t+=i;break}}}catch(b){c.e(b)}finally{c.f()}var l,f=Object(a["a"])(r.secondary);try{for(f.s();!(l=f.n()).done;){var s=l.value,d=s.ipa,h=s.tags;e.includes(d)&&(t+=" "+h)}}catch(b){f.e(b)}finally{f.f()}return t}function d(e){var n={},t=function(t){var r=e[t];if(!r)return"continue";r.forEach((function(e){var r=e.phoneme;r in n||(n[r]={ipa:r,tags:s(r),lects:{}}),n[r].lects[t]=e}))};for(var r in e)t(r);i.value=Object.values(n),i.value.sort((function(e,n){var t=e.ipa,r=n.ipa;return t>r?1:r>t?-1:0})),l.value=i.value[0]}Object(u["J"])(o["a"],Object(c["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i.value.length=0,f.value.length=0,e.next=4,Object(o["b"])("ipa",{});case 4:return r=e.sent,e.next=7,Object(o["c"])("phonology");case 7:n=e.sent,f.value=Object.keys(n),d(n);case 10:case"end":return e.stop()}}),e)}))))},"03a7":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"a",(function(){return l})),t.d(n,"c",(function(){return f})),t.d(n,"d",(function(){return s})),t.d(n,"e",(function(){return d}));t("d81d"),t("07ac");var r=t("3835"),a=(t("96cf"),t("1da1")),c=t("7a23"),o=t("3a0b"),u=t("fa5c"),i=Object(c["B"])({});Object(c["J"])(o["a"],Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i.value={},e.next=3,Object(o["c"])("converter");case 3:i.value=e.sent;case 4:case"end":return e.stop()}}),e)}))));var l=Object(c["B"])();Object(c["J"])(i,(function(e){e&&(l.value=Object.values(e)[0])}));var f=Object(c["v"])({});Object(c["J"])(l,(function(e){e&&(f.initial=e.mappings[0],f.final=e.mappings[1],d.initial="")}));var s=Object(c["b"])((function(){var e,n,t,a;return{initial:null!==(e=null===(n=f.initial)||void 0===n?void 0:n.pairs)&&void 0!==e?e:[],final:null!==(t=null===(a=f.final)||void 0===a?void 0:a.pairs.map((function(e){var n=Object(r["a"])(e,2),t=n[0],a=n[1];return[a,t]})))&&void 0!==t?t:[]}}));Object(c["J"])((function(){return s.value.initial}),(function(e,n){d.initial=Object(u["a"])(Object(u["a"])(d.initial,n),e.map((function(e){var n=Object(r["a"])(e,2),t=n[0],a=n[1];return[a,t]})))}));var d=Object(c["v"])({initial:"",final:Object(c["b"])((function(){return Object(u["a"])(Object(u["a"])(d.initial,s.value.initial),s.value.final)}))})},"3a0b":function(e,n,t){"use strict";t.d(n,"a",(function(){return o})),t.d(n,"d",(function(){return u})),t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return f}));t("d3b7");var r=t("b85c"),a=(t("96cf"),t("1da1")),c=t("7a23"),o=Object(c["x"])([]),u="local"===Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_STORE?"/store/":"https://raw.githubusercontent.com/alkaitagi/Avzag/store/";function i(e,n){return l.apply(this,arguments)}function l(){return l=Object(a["a"])(regeneratorRuntime.mark((function e(n,t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(u+n+".json").then((function(e){return e.json()})).catch((function(){return t}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function f(e){return s.apply(this,arguments)}function s(){return s=Object(a["a"])(regeneratorRuntime.mark((function e(n){var t,a,c,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t={},a=Object(r["a"])(o.value),e.prev=2,a.s();case 4:if((c=a.n()).done){e.next=12;break}return u=c.value,e.next=8,i(u+"/"+n);case 8:l=e.sent,l&&(t[u]=l);case 10:e.next=4;break;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](2),a.e(e.t0);case 17:return e.prev=17,a.f(),e.finish(17);case 20:return e.abrupt("return",t);case 21:case"end":return e.stop()}}),e,null,[[2,14,17,20]])}))),s.apply(this,arguments)}},"73d6":function(e,n,t){"use strict";t("8f8f")},"8f8f":function(e,n,t){},ac93:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"c",(function(){return i})),t.d(n,"e",(function(){return l})),t.d(n,"b",(function(){return f})),t.d(n,"d",(function(){return s}));t("99af"),t("5db7"),t("a15b"),t("d81d"),t("73d9"),t("b0c0"),t("07ac");var r=t("2909"),a=(t("96cf"),t("1da1")),c=t("3a0b"),o=t("7a23"),u=Object(o["B"])([]),i=Object(o["B"])({}),l=Object(o["B"])(),f=Object(o["B"])(),s=Object(o["x"])([]);function d(e){return e.flatMap((function(e){return e.map((function(e){return e.text.plain.replaceAll("*","")}))}))}function h(){if(i.value){var e=Object.values(i.value);s.value=u.value.map((function(n){var t=n.phrases;return t.map((function(n){var t=n.id,a=n.name,c=n.blocks;return[a].concat(Object(r["a"])(d(c)),Object(r["a"])(e.flatMap((function(e){var n,r;return d(null!==(n=null===(r=e[t])||void 0===r?void 0:r.blocks)&&void 0!==n?n:[])})))).join(" ").toLowerCase()}))}))}}Object(o["J"])(c["a"],Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return u.value=[],i.value={},e.next=4,Object(c["b"])("phrasebook",[]);case 4:return u.value=e.sent,e.next=7,Object(c["c"])("phrasebook");case 7:i.value=e.sent,h(),l.value=u.value[0],f.value=l.value.phrases[0];case 11:case"end":return e.stop()}}),e)}))))},cd49:function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("9483");Object(r["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var a=t("7a23"),c=(t("d3b7"),t("6c02")),o=function(){return t.e("chunk-c0a3ff96").then(t.bind(null,"36e7"))},u=function(){return t.e("chunk-a9981336").then(t.bind(null,"900c"))},i=function(){return t.e("chunk-ea4d730a").then(t.bind(null,"acdc"))},l=function(){return Promise.all([t.e("chunk-2efe569b"),t.e("chunk-d13a70de"),t.e("chunk-59410774")]).then(t.bind(null,"aeb7"))},f=function(){return t.e("chunk-250b803b").then(t.bind(null,"31a6"))},s=function(){return Promise.all([t.e("chunk-2efe569b"),t.e("chunk-d13a70de"),t.e("chunk-64066348")]).then(t.bind(null,"3c94"))},d=function(){return t.e("chunk-3e40cc78").then(t.bind(null,"f5be"))},h=function(){return t.e("chunk-7fd9e65e").then(t.bind(null,"4929"))},b=function(){return t.e("chunk-ad7fd122").then(t.bind(null,"3cb6"))},p=function(){return Promise.all([t.e("chunk-2efe569b"),t.e("chunk-a9e31e70"),t.e("chunk-a398a8a0")]).then(t.bind(null,"a1df"))},v=function(){return Promise.all([t.e("chunk-2efe569b"),t.e("chunk-a9e31e70"),t.e("chunk-6594f2c6")]).then(t.bind(null,"e701"))},m=[{path:"/home",name:"Home",component:o},{path:"/",component:u,children:[{path:"phonology",name:"Phonology",component:l},{path:"converter",name:"Converter",component:f},{path:"phrasebook",name:"Phrasebook",component:s},{path:"dictionary",name:"Dictionary",component:d}]},{path:"/editor/",component:i,children:[{path:"phonology",name:"PhonologyEditor",component:h},{path:"converter",name:"ConverterEditor",component:b},{path:"phrasebook",name:"PhrasebookEditor",component:p},{path:"phrasebook/corpus",name:"PhrasebookCorpusEditor",component:v}]},{path:"/:pathMatch(.*)",redirect:{name:"Home"}}],k=Object(c["a"])({history:Object(c["b"])(),routes:m});function g(e,n,t,r,c,o){var u=Object(a["A"])("router-view");return Object(a["r"])(),Object(a["d"])(u)}t("b0c0");var O=t("3a0b"),j=(t("0319"),t("03a7"),t("ac93"),Object(a["h"])({setup:function(){var e,n=Object(c["c"])(),t=Object(c["d"])();n.name&&"Home"!==n.name||t.push(localStorage.url&&localStorage.url!==n.path?{path:localStorage.url}:{name:"Home"}),"Home"!==n.name&&(O["a"].value=JSON.parse(null!==(e=localStorage.lects)&&void 0!==e?e:"[]")),Object(a["K"])((function(){n.name&&(localStorage.url=n.path)}))}}));t("73d6");j.render=g;var y=j,w={key:0,class:"icon"},x={key:1};function S(e,n,t,r,c,o){return Object(a["r"])(),Object(a["d"])("button",{class:{highlight:e.isOn}},[e.icon?(Object(a["r"])(),Object(a["d"])("p",w,Object(a["C"])(e.icon),1)):Object(a["e"])("",!0),e.text?(Object(a["r"])(),Object(a["d"])("p",x,Object(a["C"])(e.text),1)):Object(a["e"])("",!0)],2)}var P=Object(a["h"])({props:{icon:{type:String,default:""},text:{type:String,default:""},isOn:Boolean}});P.render=S;var E=P;function C(e,n,t,r,c,o){var u=Object(a["A"])("btn");return Object(a["r"])(),Object(a["d"])("div",{onClick:n[1]||(n[1]=function(){return e.toggle&&e.toggle.apply(e,arguments)})},[Object(a["z"])(e.$slots,"default",{on:e.modelValue},(function(){return[Object(a["g"])(u,Object(a["l"])({style:{width:"100%"}},e.attrs,{icon:e.icon,text:e.text,"is-on":e.modelValue}),null,16,["icon","text","is-on"])]}))])}var A=Object(a["h"])({props:{modelValue:Boolean,icon:{type:String,default:""},text:{type:String,default:""}},emits:["update:modelValue"],setup:function(e,n){var t=n.emit,r=n.attrs;function a(){t("update:modelValue",!e.modelValue)}return{toggle:a,attrs:r}}});A.render=C;var B=A,R=Object(a["c"])(y);R.component("Btn",E),R.component("Toggle",B),R.use(k),k.isReady().then((function(){return R.mount("#app")}))},fa5c:function(e,n,t){"use strict";t.d(n,"a",(function(){return o}));t("fb6a"),t("ac1f"),t("5319"),t("498a");var r=t("3835"),a=t("b85c");function c(e){var n="",t=0;return" "===e.charAt(0)&&(n=" ",t=1),n+e.charAt(t).toUpperCase()+e.slice(t+1)}function o(e,n){e=" "+e.replace(/\n/g,"\n ").trim();for(var t="",o=0;o<e.length;){var u,i=!1,l=Object(a["a"])(n);try{for(l.s();!(u=l.n()).done;){var f=Object(r["a"])(u.value,2),s=f[0],d=f[1];if(s&&d){for(var h=s.length,b=e.substring(o,o+h),p=[[s,d],[c(s),c(d)],[s.toUpperCase(),d.toUpperCase()]],v=0,m=p;v<m.length;v++){var k=Object(r["a"])(m[v],2),g=k[0],O=k[1];if(b===g){i=!0,t+=O,o+=h;break}}if(i)break}}}catch(j){l.e(j)}finally{l.f()}i||(t+=e[o],o++)}return t.replace(/\n /g,"\n").trim()}}});