import{b as e,e as a,d as l}from"./index.31a01206.js";import{r as t,p as o,u as s,d as n,l as i,c as d,i as u,a as r,_ as c}from"./editor.24a7d04b.js";import{e as m,r as p,w as v,u as f,g as k,x as C,y as b,i as w,o as x,h as y,n as g,G as N,I as _,F as h,z as O,k as j,j as F,A as J}from"./vendor.c8bf7c27.js";import"./file-manager.9a2fdd9a.js";var S=m({name:"EditorNavigation",setup(){var l;const c=f(),m=k(),C=p([]);e("catalogue",[]).then((e=>C.value=e.map((e=>e.name))));const b=p(null!=(l=c.name)?l:a[0].name);return v(b,(()=>m.push({name:b.value}))),{routeName:b,editorRoutes:a,resetFile:t,pushFile:o,uploadJSON:s,downloadJSON:n,lect:i,lects:C,config:d,isDirty:u,isOutdated:r}}});const D=J();C("data-v-7399f30a");const R={id:"root",class:"small"},I={class:"section row scroll"},U={class:"row"},V={class:"row"},z={key:0,class:"icon"};b();const A=D(((e,a,t,o,s,n)=>{const i=l,d=w("router-link"),u=c,r=w("router-view");return x(),y(h,null,[g("div",R,[g("div",I,[g("div",U,[g(d,{to:"/home"},{default:D((()=>[g(i,{icon:"arrow_back"})])),_:1}),N(g("select",{"onUpdate:modelValue":a[1]||(a[1]=a=>e.routeName=a)},[(x(!0),y(h,null,O(e.editorRoutes,(({title:e,name:a})=>(x(),y("option",{key:a,value:a,textContent:F(e)},null,8,["value","textContent"])))),128))],512),[[_,e.routeName]])]),g("div",V,[e.lect?(x(),y(h,{key:0},[e.isOutdated?(x(),y("p",z,"schedule")):j("",!0),g(i,{disabled:!e.isDirty,icon:"cloud_upload",onClick:e.pushFile},null,8,["disabled","onClick"])],64)):j("",!0),e.config.global?j("",!0):N((x(),y("select",{key:1,"onUpdate:modelValue":a[2]||(a[2]=a=>e.lect=a)},[g("option",{value:"",textContent:F("[Custom]")},null,8,["textContent"]),(x(!0),y(h,null,O(e.lects,(e=>(x(),y("option",{key:e,value:e,textContent:F(e)},null,8,["value","textContent"])))),128))],512)),[[_,e.lect]]),g(i,{icon:"file_upload",onClick:e.uploadJSON},null,8,["onClick"]),g(i,{icon:"file_download",onClick:e.downloadJSON},null,8,["onClick"]),g(u,{disabled:!e.isDirty,message:"Reset file?",onConfirm:a[3]||(a[3]=a=>e.resetFile(!1))},null,8,["disabled"])])])]),g(r)],64)}));S.render=A,S.__scopeId="data-v-7399f30a";export default S;
