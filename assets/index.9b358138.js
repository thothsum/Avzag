import{_ as e,d as l,n as s,o as a,q as o,v as n,w as t}from"./index.5f6c7caf.js";import{E as r,_ as c}from"./types.a423ec07.js";import{_ as p}from"./Flag.8085175b.js";import{_ as u}from"./Seeker.7110ab0c.js";import{_ as i}from"./index.cbab1530.js";import{_ as d,a as h,c as v}from"./index.4762e9dd.js";import{p as m}from"./audio-player.372a2132.js";import{e as k,r as y,b as f,d as g,x,y as b,i as w,o as V,h as j,n as C,j as _,k as U,F as q,z as S,G as B,M as I,A as T,w as E,N as F,I as P}from"./vendor.c8bf7c27.js";var z=k({components:{Context:d,Block:h},props:{lect:{type:String,default:""},path:{type:String,default:""},phrase:{type:Object,default:void 0},flat:Boolean},setup(e){const l=y(!1),s=f([]),a=g((()=>e.lect&&!l.value?e.phrase.context:null)),o=g((()=>s.filter((({state:e})=>e)).map((({text:e})=>(":,.?!".includes(e)?"":" ")+e)).join("").trim()));const n=g({get:()=>m.key===e.lect,set:l=>{l?m.play(e.lect,s.map((({text:e})=>e.toLowerCase())).map((l=>null===l?"":e.path+(null!=l?l:"")))):m.stop()}});return{glossed:l,vblocks:s,copy:function(){navigator.clipboard.writeText(o.value)},player:m,playing:n,contextTranslation:a}}});const A=T();x("data-v-16f554ac");const G={class:"row small wrap",style:{width:"100%"}},L={key:0,class:"flex"},M={key:1,class:"row"},N={class:"row wrap flex"};b();const O=A(((s,a,o,n,t,r)=>{var c,d;const h=p,v=w("Context"),m=e,k=l,y=u,f=w("Block"),g=i;return(null==(d=null==(c=s.phrase)?void 0:c.blocks)?void 0:d.length)?(V(),j("div",{key:0,class:["col flag",{card:!s.flat}]},[C(h,{lect:s.lect,class:"blur"},null,8,["lect"]),C("div",G,[s.lect?(V(),j("h2",L,_(s.lect),1)):U("",!0),C(v,{translation:s.contextTranslation,blocks:s.vblocks,reverse:!!s.lect},null,8,["translation","blocks","reverse"]),s.lect?(V(),j("div",M,[C(m,{modelValue:s.playing,"onUpdate:modelValue":a[1]||(a[1]=e=>s.playing=e),icon:"play_arrow"},null,8,["modelValue"]),C(k,{icon:"assignment",onClick:s.copy},null,8,["onClick"]),C(m,{modelValue:s.glossed,"onUpdate:modelValue":a[2]||(a[2]=e=>s.glossed=e),icon:"segment"},null,8,["modelValue"])])):U("",!0)]),C("div",N,[(V(!0),j(q,null,S(s.phrase.blocks,((e,l)=>{var a,o;return B((V(),j("div",{key:l,class:"blocks row seeker"},[C(y,{check:s.playing,seek:null==(a=s.player.queue[l])?void 0:a.seek},null,8,["check","seek"]),C(f,{block:e,glossed:s.glossed,onUpdate:e=>s.vblocks[l]=e},null,8,["block","glossed","onUpdate"])],512)),[[I,null==(o=s.vblocks[l])?void 0:o.show]])})),128))]),C(g,{class:"text-caption",notes:s.phrase.notes},null,8,["notes"])],2)):U("",!0)}));z.render=O,z.__scopeId="data-v-16f554ac";var D=k({components:{PhraseCard:z},setup(){const e=y({});E(s,(l=>v(e,null==l?void 0:l.context)),{immediate:!0}),F("context",e);const l=g((()=>{var e,l;const o=["phrasebook",null==(e=a.value)?void 0:e.name,null==(l=s.value)?void 0:l.name];return o.every((e=>e))?o.map((e=>e+"/")).join(""):""})),c=y(!1),p=y({}),u=g((()=>{var e;return c.value?o.value.reduce(((e,l,s)=>(e[s]=l.phrases.reduce(((e,l,a)=>(r(n.value[s][a],p.value)&&e.push(a),e)),[]),e[s].length||delete e[s],e)),{}):null==(e=a.value)?void 0:e.phrases}));return{searching:c,query:p,corpus:o,section:a,phrase:s,select:function(e,l){var o;e&&(a.value=e),s.value=null!=l?l:null==(o=a.value)?void 0:o.phrases[0]},phrases:u,phrasebooks:t,path:l}}});const H=T();x("data-v-201ee150");const J={class:"section col-1"},K={class:"col-1"},Q={class:"row"},R={key:1,class:"col-1 flex"},W={key:0,class:"scroll col phrases"},X={class:"col-0"},Y={key:1,class:"scroll col-0 phrases"};b();const Z=H(((s,a,o,n,t,r)=>{const p=e,u=c,i=l,d=w("PhraseCard");return V(),j("div",J,[C("div",K,[C("div",Q,[C(p,{modelValue:s.searching,"onUpdate:modelValue":a[1]||(a[1]=e=>s.searching=e),icon:"search"},null,8,["modelValue"]),s.searching?(V(),j(u,{key:0,modelValue:s.query,"onUpdate:modelValue":a[2]||(a[2]=e=>s.query=e),placeholder:"Search in English & translations"},null,8,["modelValue"])):(V(),j("h2",R,[B(C("select",{"onUpdate:modelValue":a[3]||(a[3]=e=>s.section=e),style:{flex:"none"},onChange:a[4]||(a[4]=e=>s.select(s.section))},[(V(!0),j(q,null,S(s.corpus,(e=>(V(),j("option",{key:e.id,value:e},_(e.name),9,["value"])))),128))],544),[[P,s.section]])]))]),s.searching?(V(),j("div",W,[(V(!0),j(q,null,S(s.phrases,((e,l)=>(V(),j(q,{key:l},[C("h2",null,_(s.corpus[l].name),1),C("div",X,[(V(!0),j(q,null,S(e,(e=>(V(),j(i,{key:e,text:s.corpus[l].phrases[e].name,"is-on":s.phrase===s.corpus[l].phrases[e],onClick:a=>s.select(s.corpus[l],s.corpus[l].phrases[e])},null,8,["text","is-on","onClick"])))),128))])],64)))),128))])):(V(),j("div",Y,[(V(!0),j(q,null,S(s.phrases,(e=>(V(),j(i,{key:e.id,text:e.name,"is-on":s.phrase===e,onClick:l=>s.select(null,e)},null,8,["text","is-on","onClick"])))),128))]))]),s.phrase?(V(),j("div",{key:s.phrase.id,class:"col-1"},[C(d,{phrase:s.phrase,flat:""},null,8,["phrase"]),(V(!0),j(q,null,S(s.phrasebooks,((e,l)=>(V(),j(d,{key:l,lect:l,path:s.path,phrase:e[s.phrase.id]},null,8,["lect","path","phrase"])))),128))])):U("",!0)])}));D.render=Z,D.__scopeId="data-v-201ee150";export default D;
