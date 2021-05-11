import{_ as e,a}from"./EditorCard.8a34556f.js";import{_ as l}from"./NotesEditor.2bff4760.js";import{d as o}from"./index.31a01206.js";import{_ as n}from"./TableEntry.6c130267.js";import{b as s,f as t}from"./editor.24a7d04b.js";import{e as p,r as d,d as m,x as r,y as i,i as u,o as c,h,n as f,F as y,z as V,G as v,H as g,k as x,A as U,P as _}from"./vendor.c8bf7c27.js";import"./file-manager.9a2fdd9a.js";var k=p({components:{TableEntry:n},setup(){s({default:[],filename:"phonology"});const e=d(),a=m((()=>t.value.map((e=>{var a,l;return null==(l=null==(a=e.samples)?void 0:a[0])?void 0:l.grapheme}))));return{file:t,phoneme:e,graphemes:a}}});const b=U();r("data-v-93186728");const j={key:0,class:"section col-2 small grid"},w={class:"row wrap"},C={key:0,class:"col-2 small"},E=_(" You can add notes to clarify certain use cases or to give some additional info. ");i();const P=b(((n,s,t,p,d,m)=>{const r=e,i=u("TableEntry"),U=a,_=l,k=o;return n.file?(c(),h("div",j,[f(U,{icon:"view_comfy",header:"Phonemes"},{header:b((()=>[f(r,{modelValue:n.file,"onUpdate:modelValue":s[1]||(s[1]=e=>n.file=e),item:n.phoneme,"onUpdate:item":s[2]||(s[2]=e=>n.phoneme=e),add:{},remove:""},null,8,["modelValue","item"])])),default:b((()=>[f("div",w,[(c(!0),h(y,null,V(n.file,((e,a)=>(c(),h(i,{key:a,selected:n.phoneme===e,ipa:e.phoneme,str:n.graphemes[a],onClick:a=>n.phoneme=e},null,8,["selected","ipa","str","onClick"])))),128))])])),_:1}),n.phoneme?(c(),h("div",C,[f(U,{icon:"hearing",header:"Phoneme"},{default:b((()=>[v(f("input",{"onUpdate:modelValue":s[3]||(s[3]=e=>n.phoneme.phoneme=e),type:"text",class:"text-ipa",placeholder:"phoneme"},null,512),[[g,n.phoneme.phoneme]])])),_:1}),f(_,{modelValue:n.phoneme.notes,"onUpdate:modelValue":s[4]||(s[4]=e=>n.phoneme.notes=e)},{default:b((()=>[E])),_:1},8,["modelValue"]),f(U,{header:"Samples",icon:"playlist_play"},{header:b((()=>[f(r,{modelValue:n.phoneme.samples,"onUpdate:modelValue":s[5]||(s[5]=e=>n.phoneme.samples=e),add:{}},null,8,["modelValue"])])),default:b((()=>[(c(!0),h(y,null,V(n.phoneme.samples,((e,a)=>(c(),h("div",{key:a,class:"row sample"},[v(f("input",{"onUpdate:modelValue":a=>e.grapheme=a,type:"text",placeholder:"grapheme"},null,8,["onUpdate:modelValue"]),[[g,e.grapheme]]),v(f("input",{"onUpdate:modelValue":a=>e.word=a,class:"flex",type:"text",placeholder:"word"},null,8,["onUpdate:modelValue"]),[[g,e.word]]),v(f("input",{"onUpdate:modelValue":a=>e.ipa=a,class:"flex text-ipa",type:"text",placeholder:"ipa"},null,8,["onUpdate:modelValue"]),[[g,e.ipa]]),f(k,{icon:"clear",onClick:e=>n.phoneme.samples.splice(a,1)},null,8,["onClick"])])))),128))])),_:1})])):x("",!0)])):x("",!0)}));k.render=P,k.__scopeId="data-v-93186728";export default k;
