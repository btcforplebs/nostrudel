import{r as i,e as f,cy as q,g8 as k,g9 as z,f0 as P,bZ as j,c_ as U,aI as S,ga as B,k as m,f as D,aW as G,s as N,fP as W,j as s,E as w,cw as y,z as O,gb as K,dx as V,a6 as H,gc as Q,gd as X,eS as Y,bI as $,ge as J,gf as ee,gg as se,bK as te,B as h,F as x,gh as ae,u as R,gi as E,aB as F,T as Z,Z as v,cd as oe,gj as ne,G as re,g7 as le}from"./index-C6wlVu-O.js";import{C as A}from"./chat-message-content-DH1ZcJIv.js";function I(e){const[l,n]=i.useState(),t=f(e.relays),r=q(e.goal);return i.useEffect(()=>{if(!e.goal){const a={"#a":[k(e)],kinds:[z]},u=P(Array.from(t),[a],{onevent:o=>n(c=>!c||o.created_at>c.created_at?o:c),oneose:()=>u.close()})}},[e.identifier,e.goal,t.urls.join("|")]),r||l}function ie(e){const l=f(j()),n=U(e.host,[],{alwaysRequest:!0}),t=S(),r=i.useCallback(o=>e.starts&&o.created_at<e.starts||e.ends&&o.created_at>e.ends?!1:!(n(o)||t(o)),[e,n,t]),a=I(e),u=i.useMemo(()=>{const o={"#a":[k(e)],kinds:[B,m.Zap]};return a?[o,{"#e":[a.id],kinds:[m.Zap]}]:o},[e,a]);return D(`${G(e.event)}-chat`,l,u,{eventFilter:r})}function ue({stream:e,initComment:l,onZap:n,label:t}){var g;const r=N(),a=W(e.host),u=f(j());I(e);const o={"aria-label":"Zap stream",borderColor:"yellow.400",variant:"outline",onClick:r.onOpen,isDisabled:!((g=a.metadata)!=null&&g.allowsNostr)},c=e.event;return s.jsxs(s.Fragment,{children:[t?s.jsx(w,{leftIcon:s.jsx(y,{color:"yellow.400"}),...o,children:t}):s.jsx(O,{icon:s.jsx(y,{color:"yellow.400"}),...o}),r.isOpen&&s.jsx(K,{isOpen:!0,event:c,pubkey:e.host,onZapped:async()=>{n&&n(),r.onClose()},onClose:r.onClose,initialComment:l,additionalRelays:u,showEmbed:!0,embedProps:{goalProps:{showActions:!1}}})]})}function me({stream:e,hideZapButton:l}){V();const n=H(),t=Q(),r=f(j()),a=X(e.host),u=i.useMemo(()=>Y([...r,...a??[]]),[a,r]),{setValue:o,handleSubmit:c,formState:g,reset:C,getValues:b,watch:T}=$({defaultValues:{content:""}}),_=c(async d=>{let p=J(e,d.content);p=ee(p),p=se(p,t),await n("Send Chat",p,u)&&C()}),M=i.useRef(null),{onPaste:L}=te(M,b,o);return T("content"),s.jsx(s.Fragment,{children:s.jsxs(h,{borderRadius:"md",flexShrink:0,display:"flex",gap:"2",px:"2",pb:"2",children:[s.jsxs(x,{as:"form",onSubmit:_,gap:"2",flex:1,children:[s.jsx(ae,{instanceRef:d=>M.current=d,placeholder:"Message",autoComplete:"off",isRequired:!0,value:b().content,onChange:d=>o("content",d.target.value,{shouldDirty:!0}),onPaste:L}),s.jsx(w,{colorScheme:"primary",type:"submit",isLoading:g.isSubmitting,children:"Send"})]}),!l&&s.jsx(ue,{stream:e,onZap:C,initComment:b().content})]})})}function ce({event:e,stream:l}){const n=R(e);return s.jsx(E,{event:e,children:s.jsx(h,{children:s.jsxs(h,{overflow:"hidden",maxH:"lg",ref:n,children:[s.jsx(F,{pubkey:e.pubkey,size:"xs",display:"inline-block",mr:"2"}),s.jsxs(Z,{as:"span",fontWeight:"bold",color:e.pubkey===l.host?"rgb(248, 56, 217)":"cyan.500",children:[s.jsx(v,{pubkey:e.pubkey}),": "]}),s.jsx(oe,{display:"inline-block",event:e,size:"xs",variant:"ghost",float:"right",ml:"2",allowComment:!1}),s.jsx(A,{event:e})]})})})}const de=i.memo(ce);function pe({zap:e,stream:l}){const n=R(e),t=i.useMemo(()=>ne(e),[e]),r=S();return!t||!t.payment.amount||r(t.event)?null:s.jsx(E,{event:t.request,children:s.jsxs(x,{direction:"column",borderRadius:"md",borderColor:"yellow.400",borderWidth:"1px",p:"2",ref:n,children:[s.jsxs(x,{gap:"2",children:[s.jsx(y,{color:"yellow.400"}),s.jsx(F,{pubkey:t.request.pubkey,size:"xs"}),s.jsx(v,{pubkey:t.request.pubkey,fontWeight:"bold",color:"yellow.400"}),s.jsxs(Z,{children:["zapped ",re(t.payment.amount/1e3)," sats"]})]}),s.jsx(h,{children:s.jsx(A,{event:t.request})})]})})}const ge=i.memo(pe),he=le`
  scrollbar-width: 0;

  ::-webkit-scrollbar {
    width: 0;
  }
`,ye=i.forwardRef(({stream:e,hideScrollbar:l,...n},t)=>{const{timeline:r}=ie(e);return s.jsx(x,{ref:t,overflowY:"scroll",overflowX:"hidden",direction:"column-reverse",gap:"2",css:l&&he,...n,children:r.map(a=>a.kind===m.LiveChatMessage?s.jsx(de,{event:a,stream:e},a.id):s.jsx(ge,{zap:a,stream:e},a.id))})});export{me as C,ye as S,ge as Z,I as a,ue as b,ie as u};
//# sourceMappingURL=chat-log-CLBRTBIF.js.map