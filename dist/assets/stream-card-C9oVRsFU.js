import{r as c,u as x,cq as l,j as s,C as p,L as u,$ as g,fJ as j,B as h,F as a,aB as m,H as t,Z as b,bF as k,b as S,T as f,aX as v}from"./index-C6wlVu-O.js";import{S as y}from"./stream-hashtags-DvltmNAH.js";function B({stream:e,...r}){const{title:n,image:o}=e,i=x(e.event),d=l(e.event,e.relays);return s.jsx(p,{...r,ref:i,position:"relative",children:s.jsxs(u,{as:g,p:"2",display:"flex",flexDirection:"column",gap:"2",children:[s.jsx(j,{stream:e,position:"absolute",top:"4",left:"4"}),s.jsx(h,{backgroundImage:o,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",aspectRatio:16/9,borderRadius:"lg"}),s.jsxs(a,{gap:"2",alignItems:"center",children:[s.jsx(m,{pubkey:e.host,size:"sm",noProxy:!0}),s.jsx(t,{size:"sm",children:s.jsx(b,{pubkey:e.host})})]}),s.jsx(t,{size:"md",children:s.jsx(k,{as:S,to:`/streams/${d}`,children:n})}),e.tags.length>0&&s.jsx(a,{gap:"2",wrap:"wrap",children:s.jsx(y,{stream:e})}),e.starts&&s.jsxs(f,{children:["Started: ",s.jsx(v,{timestamp:e.starts})]})]})})}const R=c.memo(B);export{R as S};
//# sourceMappingURL=stream-card-C9oVRsFU.js.map