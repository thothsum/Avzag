import{e as t,d as e,f as s,o as a,h as i,F as n,z as l,j as o,k as p}from"./vendor.c8bf7c27.js";var r=t({name:"Notes",props:{notes:{type:Array,default:()=>[]}},emits:["texts"],setup(t,{emit:a}){const i=e((()=>{const e=/(\/[^/]+\/|\^[^^]+\^|\*[^*]+\*|_[^_]+_)/g;return t.notes.map((t=>t.split(e).filter((t=>t)).map((t=>function(t){const e=[["^","highlight"],["/","phoneme"],["*","bold"],["_","italic"]];for(const[s,a]of e)if(t.startsWith(s)&&t.endsWith(s))return{text:t.slice(1,-1),display:a};return{text:t,display:"plain"}}(t))))).filter((t=>t.length))}));return s((()=>a("texts",i.value.map((t=>t.map((({text:t})=>t)).join("")))))),{pieces:i}}});const c={key:0,class:"col"},h={key:0},y={key:1,class:"highlight-font"},f={key:2},u={key:3},d={key:4,class:"text-ipa"};r.render=function(t,e,s,r,m,g){return t.notes.length?(a(),i("div",c,[(a(!0),i(n,null,l(t.pieces,((t,e)=>(a(),i("p",{key:e},[(a(!0),i(n,null,l(t,(({text:t,display:e},s)=>(a(),i(n,{key:s},["plain"===e?(a(),i("span",h,o(t),1)):"highlight"===e?(a(),i("span",y,o(t),1)):"bold"===e?(a(),i("b",f,o(t),1)):"italic"===e?(a(),i("i",u,o(t),1)):(a(),i("span",d,o(t),1))],64)))),128))])))),128))])):p("",!0)};export{r as _};