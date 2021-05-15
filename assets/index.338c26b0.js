import{d as e,x as s,y as l,_ as n}from"./index.5f6c7caf.js";import{_ as t}from"./Seeker.7110ab0c.js";import{_ as a}from"./Flag.8085175b.js";import{_ as r}from"./index.cbab1530.js";import{e as c,o,h as i,n as d,j as u,k as p,F as y,z as g,P as m,r as v,O as f,d as h,w as k,x,y as b,i as C,A as E,b as _,N as j,E as w,G as U,I as q,H as V}from"./vendor.c8bf7c27.js";import{S as M}from"./search.f060bdbd.js";var O=c({name:"EntryUse",props:{scholar:Boolean,use:{type:Object,default:void 0}}});const I={class:"col"},S={style:{"user-select":"auto",display:"inline"}},B=d("span",null," ",-1),R={key:0,class:"text-tags"},A={class:"col-0 text-faded"},F={key:0,class:"col-0"},z={class:"text-ipa"};O.render=function(e,s,l,n,t,a){var c;const v=r;return o(),i("div",I,[d("div",null,[d("h2",S,u(e.use.meaning),1),B,e.scholar?(o(),i("span",R,u(null==(c=e.use.tags)?void 0:c.join(" ")),1)):p("",!0)]),d(v,{notes:e.use.notes},null,8,["notes"]),(o(!0),i(y,null,g(e.use.samples,((s,l)=>(o(),i("div",{key:l,class:"col-0 card-1"},[m(u(s.plain)+" ",1),d("span",A,[m(u(s.translation)+" ",1),e.scholar?(o(),i("span",F,[d("span",z,u(s.ipa),1),m(" "+u(s.glossed),1)])):p("",!0)])])))),128))])};var G=c({name:"EntryCard",components:{EntryUse:O},props:{lect:{type:String,default:""},meaning:{type:String,default:""},entry:{type:Object,default:void 0},scholar:Boolean},setup(e){const s=v(0),l=f("expandedEntries"),n=f("setExpansion"),t=h((()=>null==l?void 0:l.has(e.entry)));k((()=>!!s.value),(s=>null==n?void 0:n(e.entry,s)));const a=h((()=>{var s;return null==(s=e.entry)?void 0:s.forms[0].plain})),r=h((()=>e.entry.uses.find((s=>s.meaning===e.meaning)))),c=h((()=>e.entry.uses.filter((s=>s.meaning!==e.meaning))));return{views:[["Uses","textsms"],["Info","info"]],expanded:s,faded:t,plain:a,otherUses:c,targetUse:r}}});const H=E();x("data-v-0d6e533f");const L={key:0,class:"col"},N={key:1},P={class:"row"},$={key:0,class:"text-tags"},D={class:"col-0 card-1"},J={key:0,class:"text-faded"},K={class:"text-ipa"},Q=d("hr",null,null,-1);b();const T=H(((s,l,n,t,c,v)=>{var f;const h=a,k=e,x=C("EntryUse"),b=r;return s.entry?(o(),i("div",L,[d(k,{class:{"card-0 flag":s.expanded,faded:s.faded&&!s.expanded},onClick:l[1]||(l[1]=e=>s.expanded=s.expanded?0:1)},{default:H((()=>[s.expanded?(o(),i(y,{key:0},[d("h2",null,u(s.plain),1),d(h,{lect:s.lect,class:"blur"},null,8,["lect"])],64)):(o(),i("span",N,u(s.plain),1))])),_:1},8,["class"]),s.expanded?(o(),i(y,{key:0},[d("div",P,[(o(!0),i(y,null,g(s.views,(([e,l],n)=>(o(),i(k,{key:l,class:["flex",{highlight:s.expanded===n+1}],icon:l,text:e,onClick:e=>s.expanded=n+1},null,8,["icon","text","class","onClick"])))),128))]),1===s.expanded?(o(),i(y,{key:0},[d(x,{scholar:s.scholar,use:s.targetUse},null,8,["scholar","use"]),(o(!0),i(y,null,g(s.otherUses,(e=>(o(),i(x,{key:e.meaning,scholar:s.scholar,use:e},null,8,["scholar","use"])))),128))],64)):2===s.expanded?(o(),i(y,{key:1},[s.scholar&&s.entry.tags?(o(),i("p",$,u(null==(f=s.entry.tags)?void 0:f.join(" ")),1)):p("",!0),d(b,{notes:s.entry.notes},null,8,["notes"]),d("div",D,[(o(!0),i(y,null,g(s.entry.forms,((e,l)=>(o(),i("p",{key:l},[m(u(e.plain)+" ",1),s.scholar?(o(),i("span",J,[d("span",K,u(e.ipa),1),m(" "+u(e.glossed),1)])):p("",!0)])))),128))])],64)):p("",!0),Q],64)):p("",!0)])):p("",!0)}));G.render=T,G.__scopeId="data-v-0d6e533f";var W=c({name:"MeaningRow",components:{EntryCard:G},props:{meaning:{type:String,default:""},lects:{type:Array,default:()=>[]},scholar:Boolean,entries:{type:Object,default:()=>({})}},setup(e){function s(s){var l,n,t;return null!=(t=null==(n=null==(l=s.uses.find((s=>s.meaning===e.meaning)))?void 0:l.notes)?void 0:n.length)?t:0}return{sortedEntries:h((()=>Object.entries(e.entries).reduce(((e,[l,n])=>(e[l]=n.sort(((e,l)=>s(e)-s(l))),e)),{})))}}});const X=E();x("data-v-32ca1f70");const Y={class:"row-1 lects small"},Z={class:"meaning lect col"},ee={class:"text-faded"},se={key:1};b();const le=X(((e,s,l,n,t,a)=>{const r=C("EntryCard");return o(),i("div",Y,[d("div",Z,[d("i",ee,u(e.meaning),1)]),(o(!0),i(y,null,g(e.lects,(s=>(o(),i("div",{key:s,class:"col lect"},[e.sortedEntries[s]?(o(!0),i(y,{key:0},g(e.sortedEntries[s],(l=>(o(),i(r,{key:l.forms[0].plain,lect:s,entry:l,meaning:e.meaning,scholar:e.scholar},null,8,["lect","entry","meaning","scholar"])))),128)):(o(),i("span",se))])))),128))])}));W.render=le,W.__scopeId="data-v-32ca1f70";var ne=c({components:{MeaningRow:W},setup(){const e=new M(s),n=_({}),t=h({get:()=>{var e;return null!=(e=n[a.value])?e:""},set:e=>n[a.value]=e}),a=v(""),r=h((()=>Object.keys(s.value))),c=v(!1),o=v(!1),i=h((()=>l.value.lists));k(o,(()=>n[""]=o.value?i.value[0].query:""));const d=_(new Map);return j("expandedEntries",d),j("setExpansion",((e,s)=>{var l,n;d.set(e,(null!=(l=d.get(e))?l:0)+(s?1:-1)),(null!=(n=d.get(e))?n:0)<=0&&d.delete(e)})),w((()=>d.clear())),k([t,a],(()=>e.search(a.value,t.value))),{scholar:c,queries:n,query:t,lect:a,lects:r,list:o,lists:i,results:e.results,executing:e.executing,progress:e.progress,dictionaries:s}}});const te=E();x("data-v-224026c4");const ae={class:"section row"},re={class:"scroll-area col"},ce={class:"row-1 lects"},oe={key:1,class:"lect"};b();const ie=te(((s,l,r,c,m,v)=>{const f=n,h=e,k=t,x=a,b=C("MeaningRow");return s.dictionaries?(o(),i(y,{key:0},[d("div",ae,[d(f,{modelValue:s.scholar,"onUpdate:modelValue":l[1]||(l[1]=e=>s.scholar=e),icon:"school"},null,8,["modelValue"]),d(f,{modelValue:s.list,"onUpdate:modelValue":l[2]||(l[2]=e=>s.list=e),icon:"format_list_bulleted"},null,8,["modelValue"]),s.list&&!s.lect?U((o(),i("select",{key:0,"onUpdate:modelValue":l[3]||(l[3]=e=>s.queries[""]=e)},[(o(!0),i(y,null,g(s.lists,(e=>(o(),i("option",{key:e.name,value:e.query,textContent:u(e.name)},null,8,["value","textContent"])))),128))],512)),[[q,s.queries[""]]]):(o(),i(y,{key:1},[U(d("input",{"onUpdate:modelValue":l[4]||(l[4]=e=>s.query=e),type:"text",placeholder:s.lect?`Enter ${s.lect} form...`:"Enter meaning..."},null,8,["placeholder"]),[[V,s.query]]),d(h,{icon:"clear",onClick:l[5]||(l[5]=e=>s.query="")})],64))]),d("div",re,[d("div",ce,[s.lects.length>1?(o(),i(h,{key:0,class:"lect card-0 seeker","is-on":!s.lect,icon:s.lect?"":"search",text:s.lists?"Lists":"Meanings",onClick:l[6]||(l[6]=e=>s.lect="")},{default:te((()=>[d(k,{seek:s.progress[""]},null,8,["seek"])])),_:1},8,["is-on","icon","text"])):(o(),i("p",oe,"Meanings")),1===s.lects.length?(o(),i(h,{key:2,class:"row lect flag card-0",icon:"search","is-on":""},{default:te((()=>[d(k,{seek:s.progress[""]},null,8,["seek"]),d(x,{lect:s.lects[0],class:"blur"},null,8,["lect"]),d("h2",{class:"flex",textContent:u(s.lects[0])},null,8,["textContent"])])),_:1})):(o(!0),i(y,{key:3},g(s.lects,(e=>(o(),i(h,{key:e,icon:s.lect===e?"search":"",class:"row lect flag card-0","is-on":s.lect===e,onClick:l=>s.lect=e},{default:te((()=>[d(k,{seek:s.progress[e]},null,8,["seek"]),d(x,{lect:e,class:"blur"},null,8,["lect"]),d("h2",{class:"flex",textContent:u(e)},null,8,["textContent"])])),_:2},1032,["icon","is-on","onClick"])))),128))]),(o(!0),i(y,null,g(s.results,((e,l)=>(o(),i(b,{key:l,lects:s.lects,scholar:s.scholar,meaning:l,entries:e},null,8,["lects","scholar","meaning","entries"])))),128))])],64)):p("",!0)}));ne.render=ie,ne.__scopeId="data-v-224026c4";export default ne;
