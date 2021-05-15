import{d as e,p as l,f as a,g as s}from"./index.5f6c7caf.js";import{e as t,d as r,w as n,o,h as u,n as c,F as d,z as i,k as p,i as m,A as v,r as f,x as y,y as h,j as g}from"./vendor.c8bf7c27.js";import{E as b,_ as k}from"./types.a423ec07.js";import{_ as x}from"./TableEntry.6c130267.js";import{_ as j}from"./Flag.8085175b.js";import{_ as w}from"./Seeker.7110ab0c.js";import{_ as V}from"./index.cbab1530.js";import{p as Q}from"./audio-player.372a2132.js";var T=t({props:{modelValue:{type:Object,default:void 0},labels:{type:Array,default:()=>[]}},emits:["update:modelValue"],setup(e,{emit:l}){const a=r({get:()=>e.modelValue,set:e=>l("update:modelValue",e)});const s=r((()=>e.labels.length>1)),t=r((()=>Object.fromEntries(Object.entries(a.value).map((([e,l])=>[e,l?"highlight-confirm":"highlight-alert"]))))),o=r((()=>1===e.labels.length?{[e.labels[0]]:!0}:{}));return n(e.labels,(()=>a.value=o.value),{immediate:!0}),{query:a,highlights:t,visible:s,toggle:function(e){e in a.value?a.value[e]?a.value[e]=!1:delete a.value[e]:a.value[e]=!0}}}});const _={key:0,class:"row scroll small"};T.render=function(l,a,s,t,r,n){const m=e;return l.visible?(o(),u("div",_,[c(m,{class:"round",icon:"clear",onClick:a[1]||(a[1]=e=>l.query={})}),(o(!0),u(d,null,i(l.labels,(e=>(o(),u(m,{key:e,text:e,class:["round",l.highlights[e]],onClick:a=>l.toggle(e)},null,8,["text","class","onClick"])))),128))])):p("",!0)};var O=t({components:{TableEntry:x},props:{modelValue:{type:Object,default:void 0},phonemes:{type:Array,default:()=>[]},filter:{type:String,default:""},lectQuery:{type:Object,default:()=>({})},featureQuery:{type:Object,default:()=>({})}},emits:["update:modelValue"],setup(e,{emit:l}){const a=r({get:()=>e.modelValue,set:e=>l("update:modelValue",e)}),s=r((()=>e.filter?e.phonemes.filter((({tags:l})=>null==l?void 0:l.includes(e.filter))):e.phonemes)),t=r((()=>s.value.map((({lects:l,tags:a})=>b(Object.keys(l),e.lectQuery)&&b(a,e.featureQuery))))),n=r((()=>{const l=Object.entries(e.lectQuery).filter((([,e])=>e)).map((([e])=>e));return 1===l.length?l[0]:""})),o=r((()=>n.value?s.value.map((({lects:e})=>{var l,a,s;return null==(s=null==(a=null==(l=e[n.value])?void 0:l.samples)?void 0:a[0])?void 0:s.grapheme})):[]));return{narrow:r((()=>s.value.length<=12)),graphemes:o,fitting:t,selected:a,filtered:s}}});const C=v()(((e,l,a,s,t,r)=>{const n=m("TableEntry");return o(),u("div",{id:"root",class:[{narrow:e.narrow},"row scroll wrap"]},[(o(!0),u(d,null,i(e.filtered,((l,a)=>(o(),u(n,{key:a,faded:!e.fitting[a],ipa:l.ipa,str:e.graphemes[a],selected:e.selected==l,onClick:a=>e.selected=l},null,8,["faded","ipa","str","selected","onClick"])))),128))],2)}));O.render=C,O.__scopeId="data-v-7f81c984";var q=t({props:{lect:{type:String,default:""},use:{type:Object,default:()=>({})}},setup(e){const l=r((()=>{var l;const a=new Set(null==(l=e.use.samples)?void 0:l.map((({grapheme:e})=>e)));return a.delete(void 0),a})),a=r((()=>{var l,a;return null!=(a=null==(l=e.use.samples)?void 0:l.filter((({word:e,ipa:l})=>e||l)))?a:[]}));function s(e,l){return e.includes("^")?e:e.replaceAll(l,`^${l}^`)}const t=r((()=>{var e;return null==(e=a.value)?void 0:e.map((({word:e,grapheme:l})=>s(null!=e?e:"",null!=l?l:"")))})),o=r((()=>{var l;return null==(l=a.value)?void 0:l.map((({ipa:l})=>s(null!=l?l:"",e.use.phoneme)))})),u=f([]);const c=f([]);return n(u,(()=>Q.canPlay(c,e.lect,u.value.map((([e,l])=>null!=e?e:l)).map((e=>e?"phonology/"+e:e)))),{immediate:!0,deep:!0}),{player:Q,urls:c,ipas:o,words:t,fullSamples:a,graphemes:l,setTexts:function(e,l,a){u.value[e]||(u.value[e]=[]),u.value[e][l]=a}}}});const S=v();y("data-v-6afed438");const E={class:"col-1 card flag small"},U={class:"title row-0"},A={class:"flex"},I={class:"col"};h();const P=S(((l,a,s,t,r,n)=>{const p=j,m=w,v=e,f=V;return o(),u("div",E,[c(p,{lect:l.lect,class:"blur"},null,8,["lect"]),c("div",U,[c("h2",A,g(l.lect),1),(o(!0),u(d,null,i(l.graphemes,(e=>(o(),u("p",{key:e,class:"text-dot"},g(e),1)))),128))]),c("div",I,[(o(!0),u(d,null,i(l.fullSamples,((e,a)=>{var s;return o(),u("div",{key:a,class:"row-1 flex seeker"},[c(m,{check:l.urls[a]===l.player.key,seek:null==(s=l.player.current)?void 0:s.seek},null,8,["check","seek"]),c(v,{disabled:!l.urls[a],"is-on":l.urls[a]===l.player.key,icon:"play_arrow",onClick:e=>l.player.play(null,[l.urls[a]])},null,8,["disabled","is-on","onClick"]),c(f,{class:"word flex",notes:[l.words[a]],onTexts:e=>l.setTexts(a,0,e[0])},null,8,["notes","onTexts"]),c(f,{class:"text-ipa",notes:[l.ipas[a]],onTexts:e=>l.setTexts(a,1,e[0])},null,8,["notes","onTexts"])])})),128))]),c(f,{class:"text-caption",notes:l.use.notes},null,8,["notes"])])}));q.render=P,q.__scopeId="data-v-6afed438";var F=t({components:{Table:O,PhonemeUse:q},setup(){const e=f({}),t=f({});return{phonemes:l,phoneme:a,lects:s,categories:["vowel","consonant"],lectQuery:e,featureQuery:t}}});const z=v();y("data-v-becd4f7e");const $={class:"section"},B={class:"col-1 scroll"},D={key:0,class:"col-1"},G={class:"header"},H={class:"text-ipa"},J=c("span",null," ",-1),K={class:"text-tags"};h();const L=z(((e,l,a,s,t,r)=>{const n=T,v=k,f=m("Table"),y=m("PhonemeUse");return o(),u("div",$,[c("div",B,[c(n,{modelValue:e.lectQuery,"onUpdate:modelValue":l[1]||(l[1]=l=>e.lectQuery=l),labels:e.lects},null,8,["modelValue","labels"]),c(v,{modelValue:e.featureQuery,"onUpdate:modelValue":l[2]||(l[2]=l=>e.featureQuery=l),placeholder:"Query phonemes, e.g. voiced -velar..."},null,8,["modelValue"]),(o(!0),u(d,null,i(e.categories,(a=>(o(),u("div",{key:a,class:"col"},[c("h2",null,g(a+"s"),1),c(f,{modelValue:e.phoneme,"onUpdate:modelValue":l[3]||(l[3]=l=>e.phoneme=l),filter:a,"feature-query":e.featureQuery,"lect-query":e.lectQuery,phonemes:e.phonemes},null,8,["modelValue","filter","feature-query","lect-query","phonemes"])])))),128))]),e.phoneme?(o(),u("div",D,[c("div",G,[c("h1",H,g(e.phoneme.ipa),1),J,c("span",K,g(e.phoneme.tags),1)]),(o(!0),u(d,null,i(e.phoneme.lects,((e,l)=>(o(),u(y,{key:l,lect:l,use:e},null,8,["lect","use"])))),128))])):p("",!0)])}));F.render=L,F.__scopeId="data-v-becd4f7e";export default F;
