(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-261d029e"],{"04d4":function(e,t,n){"use strict";var r=n("7a23");function c(e,t,n,c,o,a){var i=Object(r["A"])("btn");return Object(r["r"])(),Object(r["d"])(i,{class:"highlight-font-alert",icon:e.icon,text:e.text,onClick:e.confirm},null,8,["icon","text","onClick"])}var o=Object(r["h"])({props:{message:{type:String,default:"Delete?"},icon:{type:String,default:"delete"},text:{type:String,default:""}},emits:["confirm"],setup:function(e,t){var n=t.emit;function r(){window.confirm(e.message)&&n("confirm")}return{confirm:r}}});o.render=c;t["a"]=o},"33ee":function(e,t,n){"use strict";n("4dbb0")},"4dbb0":function(e,t,n){},9392:function(e,t,n){"use strict";n.d(t,"a",(function(){return c})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return u}));var r=n("7a23"),c={defaultFile:{},storage:"",filename:""},o=Object(r["x"])();function a(){o.value=JSON.parse(JSON.stringify(c.defaultFile))}function i(){localStorage[c.storage]=JSON.stringify(o.value)}function u(e){Object.assign(c,e);try{o.value=JSON.parse(localStorage[c.storage])}catch(t){a()}return Object(r["J"])(o,i,{deep:!0}),o}},acdc:function(e,t,n){"use strict";n.r(t);n("b0c0");var r=n("7a23"),c=Object(r["N"])("data-v-152dd8c4");Object(r["u"])("data-v-152dd8c4");var o={id:"root",class:"small"},a={class:"section row scroll"},i={class:"row"},u={class:"row"};Object(r["s"])();var l=c((function(e,t,n,l,s,b){var d=Object(r["A"])("btn"),f=Object(r["A"])("router-link"),O=Object(r["A"])("ConfirmButton"),j=Object(r["A"])("router-view");return Object(r["r"])(),Object(r["d"])(r["a"],null,[Object(r["g"])("div",o,[Object(r["g"])("div",a,[Object(r["g"])("div",i,[Object(r["g"])(f,{custom:"",to:{name:"Home"}},{default:c((function(e){var t=e.navigate;return[Object(r["g"])(d,{icon:"arrow_back",onClick:t},null,8,["onClick"])]})),_:1}),Object(r["M"])(Object(r["g"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.menu=t})},[(Object(r["r"])(!0),Object(r["d"])(r["a"],null,Object(r["y"])(e.menus,(function(e){var t=e.text,n=e.name;return Object(r["r"])(),Object(r["d"])("option",{key:n,value:n},Object(r["C"])(t),9,["value"])})),128))],512),[[r["G"],e.menu]])]),Object(r["g"])("div",u,[Object(r["g"])(d,{icon:"language",onClick:e.loadLect},null,8,["onClick"]),Object(r["g"])(d,{icon:"code",onClick:e.loadJSON},null,8,["onClick"]),Object(r["g"])(d,{icon:"integration_instructions",onClick:e.saveJSON},null,8,["onClick"]),Object(r["g"])(O,{message:"Reset file?",onConfirm:e.resetFile},null,8,["onConfirm"])])])]),Object(r["g"])(j)],64)})),s=(n("96cf"),n("1da1")),b=n("04d4"),d=n("6c02"),f=n("3a0b"),O=n("9392"),j=Object(r["h"])({components:{ConfirmButton:b["a"]},setup:function(){var e,t=Object(d["c"])(),n=Object(d["d"])(),c=[{text:"Phonology",name:"PhonologyEditor"},{text:"Converter",name:"ConverterEditor"},{text:"Phrasebook",name:"PhrasebookEditor"},{text:"Phrasebook Corpus",name:"PhrasebookCorpusEditor"}],o=Object(r["x"])(null!==(e=t.name)&&void 0!==e?e:c[0].name);function a(){return i.apply(this,arguments)}function i(){return i=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("string"!==typeof O["a"].filename){e.next=9;break}if(n=window.prompt("Enter lect name"),n){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,Object(f["b"])(n+"/"+O["a"].filename);case 6:t=e.sent,e.next=12;break;case 9:return e.next=11,Object(f["b"])(O["a"].filename());case 11:t=e.sent;case 12:t&&(O["b"].value=t);case 13:case"end":return e.stop()}}),e)}))),i.apply(this,arguments)}function u(){var e,t=JSON.parse(null!==(e=window.prompt("Enter JSON"))&&void 0!==e?e:"0");t&&(O["b"].value=t)}function l(){navigator.clipboard.writeText(JSON.stringify(O["b"].value,null,2)+"\n")}return Object(r["J"])(o,(function(e){return n.push({name:e})})),{menu:o,menus:c,loadLect:a,loadJSON:u,saveJSON:l,resetFile:O["c"]}}});n("33ee");j.render=l,j.__scopeId="data-v-152dd8c4";t["default"]=j}}]);