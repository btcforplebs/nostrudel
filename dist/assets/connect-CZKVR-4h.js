import{aA as f,dT as C,r as w,bI as S,dW as r,dX as y,j as e,F as c,aM as I,H as a,T as l,v as F,dY as W,E as d,aB as m,aC as u,x as k,a2 as z,a3 as B}from"./index-C6wlVu-O.js";import{w as s,N as v}from"./webrtc-relays-BQTG2acl.js";function U(){const o=f();C(o,1e3),w.useEffect(()=>(s.broker.on("call",o),()=>{s.broker.off("call",o)}),[o]);const{register:x,handleSubmit:p,formState:h,reset:g,setValue:j}=S({defaultValues:{uri:""},mode:"all"}),b=p(async n=>{s.connect(n.uri),r.webRtcRecentConnections.next([...r.webRtcRecentConnections.value,n.uri]),g()}),i=y(r.webRtcRecentConnections).map(n=>({...v.parseNostrWebRtcURI(n),uri:n})).filter(({pubkey:n})=>!s.broker.peers.has(n));return e.jsxs(c,{gap:"2",direction:"column",overflow:"auto hidden",flex:1,px:{base:"2",lg:0},children:[e.jsxs(c,{gap:"2",alignItems:"center",wrap:"wrap",children:[e.jsx(I,{hideFrom:"lg",size:"sm"}),e.jsx(a,{size:"lg",children:"Connect to WebRTC Relay"})]}),e.jsx(l,{fontStyle:"italic",mt:"-2",children:"Scan or paste the WebRTC Connection URI of the relay you wish to connect to"}),e.jsxs(c,{as:"form",gap:"2",onSubmit:b,children:[e.jsx(F,{placeholder:"webrtc+nostr:npub1...",...x("uri"),autoComplete:"off"}),e.jsx(W,{onData:n=>j("uri",n)}),e.jsx(d,{colorScheme:"primary",type:"submit",isLoading:h.isSubmitting,children:"Connect"})]}),i.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(a,{size:"md",mt:"2",children:"Recent Peers:"}),i.map(({pubkey:n,uri:t})=>e.jsxs(c,{borderWidth:"1px",rounded:"md",p:"2",alignItems:"center",gap:"2",children:[e.jsx(m,{pubkey:n,size:"sm"}),e.jsx(u,{pubkey:n}),e.jsx(d,{size:"sm",ml:"auto",colorScheme:"primary",onClick:()=>{s.connect(t),o()},children:"Connect"}),e.jsx(k,{onClick:()=>r.webRtcRecentConnections.next(r.webRtcRecentConnections.value.filter(R=>R!==t))})]},n))]}),e.jsx(a,{size:"md",mt:"4",children:"Pending Connection Requests:"}),s.pendingOutgoing.length>0?e.jsx(e.Fragment,{children:s.pendingOutgoing.map(({call:n,peer:t})=>e.jsxs(c,{borderWidth:"1px",rounded:"md",p:"2",alignItems:"center",gap:"2",children:[t.peer&&e.jsxs(e.Fragment,{children:[e.jsx(m,{pubkey:t.peer,size:"sm"}),e.jsx(u,{pubkey:t.peer})]}),e.jsx(l,{children:t.connection.connectionState})]},n.id))}):e.jsxs(z,{status:"info",children:[e.jsx(B,{}),"No connections requests"]})]})}export{U as default};
//# sourceMappingURL=connect-CZKVR-4h.js.map