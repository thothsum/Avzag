import{_ as e,a as o}from"./EditorCard.073d3fc1.js";import{_ as t,a}from"./Editor.32776488.js";import{d as l}from"./index.5f6c7caf.js";import{e as d,d as n,r,w as s,x as i,y as u,o as c,h as p,n as m,F as f,z as v,G as h,H as y,A as V,N as g,i as k,k as x}from"./vendor.c8bf7c27.js";import{b as U,f as b}from"./editor.46432fd0.js";import{c as C}from"./index.4762e9dd.js";import"./file-manager.9a2fdd9a.js";import"./index.cbab1530.js";var E=d({name:"ContextEditor",props:{modelValue:{type:Array,default:void 0}},emits:["update:modelValue"],setup(e,{emit:o}){const t=n({get:()=>e.modelValue,set:e=>o("update:modelValue",e)}),a=r([]);return s(t,(e=>{var o;return a.value=null!=(o=null==e?void 0:e.map((({tags:e})=>{var o;return null!=(o=null==e?void 0:e.join(" "))?o:""})))?o:[]}),{immediate:!0,deep:!0}),{context:t,tags:a,update:function(e){var o,l;t.value[e].tags=null!=(l=null==(o=a.value[e])?void 0:o.split(" ").filter((e=>e)))?l:[]}}}});const _=V();i("data-v-665f84dc");const j={class:"col scroll"};u();const w=_(((t,a,d,n,r,s)=>{const i=e,u=l,V=o;return c(),p(V,{icon:"list_alt",header:"context"},{header:_((()=>[m(i,{modelValue:t.context,"onUpdate:modelValue":a[1]||(a[1]=e=>t.context=e),add:{entity:"entity",tags:[]}},null,8,["modelValue"])])),default:_((()=>[m("div",j,[(c(!0),p(f,null,v(t.context,((e,o)=>(c(),p("div",{key:o,class:"row"},[h(m("input",{"onUpdate:modelValue":o=>e.entity=o,class:["entity","colored-"+o],type:"text",placeholder:"entity #"+o},null,10,["onUpdate:modelValue","placeholder"]),[[y,e.entity]]),h(m("input",{"onUpdate:modelValue":e=>t.tags[o]=e,class:"flex",type:"text",placeholder:"tags",onChange:e=>t.update(o)},null,40,["onUpdate:modelValue","onChange"]),[[y,t.tags[o]]]),m(u,{icon:"clear",onClick:e=>t.context.splice(o,1)},null,8,["onClick"])])))),128))])])),_:1})}));var R;E.render=w,E.__scopeId="data-v-665f84dc";var B=new Uint8Array(16);function S(){if(!R&&!(R="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return R(B)}var A=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function I(e){return"string"==typeof e&&A.test(e)}for(var O=[],z=0;z<256;++z)O.push((z+256).toString(16).substr(1));function D(e,o,t){var a=(e=e||{}).random||(e.rng||S)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,o){t=t||0;for(var l=0;l<16;++l)o[t+l]=a[l];return o}return function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=(O[e[o+0]]+O[e[o+1]]+O[e[o+2]]+O[e[o+3]]+"-"+O[e[o+4]]+O[e[o+5]]+"-"+O[e[o+6]]+O[e[o+7]]+"-"+O[e[o+8]]+O[e[o+9]]+"-"+O[e[o+10]]+O[e[o+11]]+O[e[o+12]]+O[e[o+13]]+O[e[o+14]]+O[e[o+15]]).toLowerCase();if(!I(t))throw TypeError("Stringified UUID is invalid");return t}(a)}var F=d({components:{BlocksOrderEditor:t,ContextEditor:E,BlockEditor:a},setup(){U({default:[],filename:"phrasebookCorpus",global:!0});const e=r(),o=r(),t=r();s(b,(a=>{(null==a?void 0:a.length)||(e.value=void 0,o.value=void 0,t.value=void 0)}));const a=n((()=>{var e;return null==(e=o.value)?void 0:e.context})),l=r({});return g("contextSource",a),g("context",l),s(a,(e=>C(l,e)),{immediate:!0,deep:!0}),{file:b,section:e,phrase:o,block:t,uuidv4:D}}});const G=V();i("data-v-2fad3de7");const H={key:0,class:"section col-2 small grid"},L={class:"col-2"},N={class:"col scroll"},T={class:"col scroll"};u();const $=G(((t,a,l,d,n,r)=>{var s;const i=e,u=o,V=k("BlocksOrderEditor"),g=k("ContextEditor"),U=k("BlockEditor");return t.file?(c(),p("div",H,[m("div",L,[m(u,{icon:"topic",header:"sections"},{header:G((()=>[m(i,{modelValue:t.file,"onUpdate:modelValue":a[1]||(a[1]=e=>t.file=e),item:t.section,"onUpdate:item":a[2]||(a[2]=e=>t.section=e),add:()=>({id:t.uuidv4()}),"shift-two":"",remove:""},null,8,["modelValue","item","add"])])),default:G((()=>[m("div",N,[(c(!0),p(f,null,v(t.file,((e,o)=>h((c(),p("input",{key:e.id,"onUpdate:modelValue":o=>e.name=o,type:"text",class:"selectable",placeholder:"section #"+o,readonly:t.section!==e,onClick:o=>t.section=e},null,8,["onUpdate:modelValue","placeholder","readonly","onClick"])),[[y,e.name]]))),128))])])),_:1}),t.section?(c(),p(u,{key:0,icon:"short_text",header:"phrases"},{header:G((()=>[m(i,{modelValue:t.section.phrases,"onUpdate:modelValue":a[3]||(a[3]=e=>t.section.phrases=e),item:t.phrase,"onUpdate:item":a[4]||(a[4]=e=>t.phrase=e),add:()=>({id:t.uuidv4()}),"shift-two":"",remove:""},null,8,["modelValue","item","add"])])),default:G((()=>[m("div",T,[(c(!0),p(f,null,v(t.section.phrases,((e,o)=>h((c(),p("input",{key:e.id,"onUpdate:modelValue":o=>e.name=o,type:"text",class:"selectable",placeholder:"phrase #"+o,readonly:t.phrase!==e,onClick:o=>t.phrase=e},null,8,["onUpdate:modelValue","placeholder","readonly","onClick"])),[[y,e.name]]))),128))])])),_:1})):x("",!0),t.phrase?(c(),p(f,{key:1},[m(V,{key:t.phrase.id,modelValue:t.block,"onUpdate:modelValue":a[5]||(a[5]=e=>t.block=e),phrase:t.phrase,"onUpdate:phrase":a[6]||(a[6]=e=>t.phrase=e)},null,8,["modelValue","phrase"]),m(g,{modelValue:t.phrase.context,"onUpdate:modelValue":a[7]||(a[7]=e=>t.phrase.context=e)},null,8,["modelValue"])],64)):x("",!0)]),t.block?(c(),p(U,{key:null==(s=t.phrase)?void 0:s.id,modelValue:t.block,"onUpdate:modelValue":a[8]||(a[8]=e=>t.block=e)},null,8,["modelValue"])):x("",!0)])):x("",!0)}));F.render=$,F.__scopeId="data-v-2fad3de7";export default F;