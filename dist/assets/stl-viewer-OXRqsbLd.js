import{r as te,p as Ge,ib as qe,j as Qe,B as Je}from"./index-C6wlVu-O.js";import{r as $e,P as et,E as tt,e as R,q as Oe,y as $,O as ne,t as je,V as F,o as X,s as K,J as nt,K as ot,B as ue,h as le,F as Le,w as at,x as it,C as st,X as rt,Y as ct,A as lt,D as ut,M as De,Z as ht,_ as Se,$ as dt}from"./three.module-dQg0RiKP.js";var pt=Object.defineProperty,ft=(g,l,h)=>l in g?pt(g,l,{enumerable:!0,configurable:!0,writable:!0,value:h}):g[l]=h,i=(g,l,h)=>(ft(g,typeof l!="symbol"?l+"":l,h),h);const oe=new $e,Re=new et,mt=Math.cos(70*(Math.PI/180)),Ce=(g,l)=>(g%l+l)%l;class bt extends tt{constructor(l,h){super(),i(this,"object"),i(this,"domElement"),i(this,"enabled",!0),i(this,"target",new R),i(this,"minDistance",0),i(this,"maxDistance",1/0),i(this,"minZoom",0),i(this,"maxZoom",1/0),i(this,"minPolarAngle",0),i(this,"maxPolarAngle",Math.PI),i(this,"minAzimuthAngle",-1/0),i(this,"maxAzimuthAngle",1/0),i(this,"enableDamping",!1),i(this,"dampingFactor",.05),i(this,"enableZoom",!0),i(this,"zoomSpeed",1),i(this,"enableRotate",!0),i(this,"rotateSpeed",1),i(this,"enablePan",!0),i(this,"panSpeed",1),i(this,"screenSpacePanning",!0),i(this,"keyPanSpeed",7),i(this,"zoomToCursor",!1),i(this,"autoRotate",!1),i(this,"autoRotateSpeed",2),i(this,"reverseOrbit",!1),i(this,"reverseHorizontalOrbit",!1),i(this,"reverseVerticalOrbit",!1),i(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),i(this,"mouseButtons",{LEFT:X.ROTATE,MIDDLE:X.DOLLY,RIGHT:X.PAN}),i(this,"touches",{ONE:K.ROTATE,TWO:K.DOLLY_PAN}),i(this,"target0"),i(this,"position0"),i(this,"zoom0"),i(this,"_domElementKeyEvents",null),i(this,"getPolarAngle"),i(this,"getAzimuthalAngle"),i(this,"setPolarAngle"),i(this,"setAzimuthalAngle"),i(this,"getDistance"),i(this,"listenToKeyEvents"),i(this,"stopListenToKeyEvents"),i(this,"saveState"),i(this,"reset"),i(this,"update"),i(this,"connect"),i(this,"dispose"),this.object=l,this.domElement=h,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>o.phi,this.getAzimuthalAngle=()=>o.theta,this.setPolarAngle=t=>{let n=Ce(t,2*Math.PI),s=o.phi;s<0&&(s+=2*Math.PI),n<0&&(n+=2*Math.PI);let p=Math.abs(n-s);2*Math.PI-p<p&&(n<s?n+=2*Math.PI:s+=2*Math.PI),d.phi=n-s,e.update()},this.setAzimuthalAngle=t=>{let n=Ce(t,2*Math.PI),s=o.theta;s<0&&(s+=2*Math.PI),n<0&&(n+=2*Math.PI);let p=Math.abs(n-s);2*Math.PI-p<p&&(n<s?n+=2*Math.PI:s+=2*Math.PI),d.theta=n-s,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",re),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",re),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(P),e.update(),c=r.NONE},this.update=(()=>{const t=new R,n=new R(0,1,0),s=new Oe().setFromUnitVectors(l.up,n),p=s.clone().invert(),A=new R,k=new Oe,H=2*Math.PI;return function(){const xe=e.object.position;s.setFromUnitVectors(l.up,n),p.copy(s).invert(),t.copy(xe).sub(e.target),t.applyQuaternion(s),o.setFromVector3(t),e.autoRotate&&c===r.NONE&&W(Z()),e.enableDamping?(o.theta+=d.theta*e.dampingFactor,o.phi+=d.phi*e.dampingFactor):(o.theta+=d.theta,o.phi+=d.phi);let U=e.minAzimuthAngle,Y=e.maxAzimuthAngle;isFinite(U)&&isFinite(Y)&&(U<-Math.PI?U+=H:U>Math.PI&&(U-=H),Y<-Math.PI?Y+=H:Y>Math.PI&&(Y-=H),U<=Y?o.theta=Math.max(U,Math.min(Y,o.theta)):o.theta=o.theta>(U+Y)/2?Math.max(U,o.theta):Math.min(Y,o.theta)),o.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,o.phi)),o.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(E,e.dampingFactor):e.target.add(E),e.zoomToCursor&&_||e.object.isOrthographicCamera?o.radius=ie(o.radius):o.radius=ie(o.radius*b),t.setFromSpherical(o),t.applyQuaternion(p),xe.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(d.theta*=1-e.dampingFactor,d.phi*=1-e.dampingFactor,E.multiplyScalar(1-e.dampingFactor)):(d.set(0,0,0),E.set(0,0,0));let q=!1;if(e.zoomToCursor&&_){let Q=null;if(e.object instanceof $&&e.object.isPerspectiveCamera){const J=t.length();Q=ie(J*b);const ee=J-Q;e.object.position.addScaledVector(D,ee),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const J=new R(j.x,j.y,0);J.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/b)),e.object.updateProjectionMatrix(),q=!0;const ee=new R(j.x,j.y,0);ee.unproject(e.object),e.object.position.sub(ee).add(J),e.object.updateMatrixWorld(),Q=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;Q!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(Q).add(e.object.position):(oe.origin.copy(e.object.position),oe.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(oe.direction))<mt?l.lookAt(e.target):(Re.setFromNormalAndCoplanarPoint(e.object.up,e.target),oe.intersectPlane(Re,e.target))))}else e.object instanceof ne&&e.object.isOrthographicCamera&&(q=b!==1,q&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/b)),e.object.updateProjectionMatrix()));return b=1,_=!1,q||A.distanceToSquared(e.object.position)>u||8*(1-k.dot(e.object.quaternion))>u?(e.dispatchEvent(P),A.copy(e.object.position),k.copy(e.object.quaternion),q=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Ae),e.domElement.addEventListener("pointerdown",Pe),e.domElement.addEventListener("pointercancel",G),e.domElement.addEventListener("wheel",Te)},this.dispose=()=>{var t,n,s,p,A,k;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",Ae),(n=e.domElement)==null||n.removeEventListener("pointerdown",Pe),(s=e.domElement)==null||s.removeEventListener("pointercancel",G),(p=e.domElement)==null||p.removeEventListener("wheel",Te),(A=e.domElement)==null||A.ownerDocument.removeEventListener("pointermove",se),(k=e.domElement)==null||k.ownerDocument.removeEventListener("pointerup",G),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",re)};const e=this,P={type:"change"},T={type:"start"},M={type:"end"},r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=r.NONE;const u=1e-6,o=new je,d=new je;let b=1;const E=new R,f=new F,m=new F,y=new F,x=new F,L=new F,O=new F,w=new F,I=new F,N=new F,D=new R,j=new F;let _=!1;const a=[],S={};function Z(){return 2*Math.PI/60/60*e.autoRotateSpeed}function z(){return Math.pow(.95,e.zoomSpeed)}function W(t){e.reverseOrbit||e.reverseHorizontalOrbit?d.theta+=t:d.theta-=t}function C(t){e.reverseOrbit||e.reverseVerticalOrbit?d.phi+=t:d.phi-=t}const B=(()=>{const t=new R;return function(s,p){t.setFromMatrixColumn(p,0),t.multiplyScalar(-s),E.add(t)}})(),v=(()=>{const t=new R;return function(s,p){e.screenSpacePanning===!0?t.setFromMatrixColumn(p,1):(t.setFromMatrixColumn(p,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(s),E.add(t)}})(),V=(()=>{const t=new R;return function(s,p){const A=e.domElement;if(A&&e.object instanceof $&&e.object.isPerspectiveCamera){const k=e.object.position;t.copy(k).sub(e.target);let H=t.length();H*=Math.tan(e.object.fov/2*Math.PI/180),B(2*s*H/A.clientHeight,e.object.matrix),v(2*p*H/A.clientHeight,e.object.matrix)}else A&&e.object instanceof ne&&e.object.isOrthographicCamera?(B(s*(e.object.right-e.object.left)/e.object.zoom/A.clientWidth,e.object.matrix),v(p*(e.object.top-e.object.bottom)/e.object.zoom/A.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function ae(t){e.object instanceof $&&e.object.isPerspectiveCamera||e.object instanceof ne&&e.object.isOrthographicCamera?b/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function he(t){e.object instanceof $&&e.object.isPerspectiveCamera||e.object instanceof ne&&e.object.isOrthographicCamera?b*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function de(t){if(!e.zoomToCursor||!e.domElement)return;_=!0;const n=e.domElement.getBoundingClientRect(),s=t.clientX-n.left,p=t.clientY-n.top,A=n.width,k=n.height;j.x=s/A*2-1,j.y=-(p/k)*2+1,D.set(j.x,j.y,1).unproject(e.object).sub(e.object.position).normalize()}function ie(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function pe(t){f.set(t.clientX,t.clientY)}function ve(t){de(t),w.set(t.clientX,t.clientY)}function fe(t){x.set(t.clientX,t.clientY)}function Ie(t){m.set(t.clientX,t.clientY),y.subVectors(m,f).multiplyScalar(e.rotateSpeed);const n=e.domElement;n&&(W(2*Math.PI*y.x/n.clientHeight),C(2*Math.PI*y.y/n.clientHeight)),f.copy(m),e.update()}function Ne(t){I.set(t.clientX,t.clientY),N.subVectors(I,w),N.y>0?ae(z()):N.y<0&&he(z()),w.copy(I),e.update()}function _e(t){L.set(t.clientX,t.clientY),O.subVectors(L,x).multiplyScalar(e.panSpeed),V(O.x,O.y),x.copy(L),e.update()}function Fe(t){de(t),t.deltaY<0?he(z()):t.deltaY>0&&ae(z()),e.update()}function ze(t){let n=!1;switch(t.code){case e.keys.UP:V(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:V(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:V(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:V(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function me(){if(a.length==1)f.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);f.set(t,n)}}function be(){if(a.length==1)x.set(a[0].pageX,a[0].pageY);else{const t=.5*(a[0].pageX+a[1].pageX),n=.5*(a[0].pageY+a[1].pageY);x.set(t,n)}}function ge(){const t=a[0].pageX-a[1].pageX,n=a[0].pageY-a[1].pageY,s=Math.sqrt(t*t+n*n);w.set(0,s)}function ke(){e.enableZoom&&ge(),e.enablePan&&be()}function Ue(){e.enableZoom&&ge(),e.enableRotate&&me()}function we(t){if(a.length==1)m.set(t.pageX,t.pageY);else{const s=ce(t),p=.5*(t.pageX+s.x),A=.5*(t.pageY+s.y);m.set(p,A)}y.subVectors(m,f).multiplyScalar(e.rotateSpeed);const n=e.domElement;n&&(W(2*Math.PI*y.x/n.clientHeight),C(2*Math.PI*y.y/n.clientHeight)),f.copy(m)}function ye(t){if(a.length==1)L.set(t.pageX,t.pageY);else{const n=ce(t),s=.5*(t.pageX+n.x),p=.5*(t.pageY+n.y);L.set(s,p)}O.subVectors(L,x).multiplyScalar(e.panSpeed),V(O.x,O.y),x.copy(L)}function Ee(t){const n=ce(t),s=t.pageX-n.x,p=t.pageY-n.y,A=Math.sqrt(s*s+p*p);I.set(0,A),N.set(0,Math.pow(I.y/w.y,e.zoomSpeed)),ae(N.y),w.copy(I)}function Ye(t){e.enableZoom&&Ee(t),e.enablePan&&ye(t)}function He(t){e.enableZoom&&Ee(t),e.enableRotate&&we(t)}function Pe(t){var n,s;e.enabled!==!1&&(a.length===0&&((n=e.domElement)==null||n.ownerDocument.addEventListener("pointermove",se),(s=e.domElement)==null||s.ownerDocument.addEventListener("pointerup",G)),Ke(t),t.pointerType==="touch"?Ve(t):Ze(t))}function se(t){e.enabled!==!1&&(t.pointerType==="touch"?Xe(t):Be(t))}function G(t){var n,s,p;We(t),a.length===0&&((n=e.domElement)==null||n.releasePointerCapture(t.pointerId),(s=e.domElement)==null||s.ownerDocument.removeEventListener("pointermove",se),(p=e.domElement)==null||p.ownerDocument.removeEventListener("pointerup",G)),e.dispatchEvent(M),c=r.NONE}function Ze(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case X.DOLLY:if(e.enableZoom===!1)return;ve(t),c=r.DOLLY;break;case X.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;fe(t),c=r.PAN}else{if(e.enableRotate===!1)return;pe(t),c=r.ROTATE}break;case X.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;pe(t),c=r.ROTATE}else{if(e.enablePan===!1)return;fe(t),c=r.PAN}break;default:c=r.NONE}c!==r.NONE&&e.dispatchEvent(T)}function Be(t){if(e.enabled!==!1)switch(c){case r.ROTATE:if(e.enableRotate===!1)return;Ie(t);break;case r.DOLLY:if(e.enableZoom===!1)return;Ne(t);break;case r.PAN:if(e.enablePan===!1)return;_e(t);break}}function Te(t){e.enabled===!1||e.enableZoom===!1||c!==r.NONE&&c!==r.ROTATE||(t.preventDefault(),e.dispatchEvent(T),Fe(t),e.dispatchEvent(M))}function re(t){e.enabled===!1||e.enablePan===!1||ze(t)}function Ve(t){switch(Me(t),a.length){case 1:switch(e.touches.ONE){case K.ROTATE:if(e.enableRotate===!1)return;me(),c=r.TOUCH_ROTATE;break;case K.PAN:if(e.enablePan===!1)return;be(),c=r.TOUCH_PAN;break;default:c=r.NONE}break;case 2:switch(e.touches.TWO){case K.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ke(),c=r.TOUCH_DOLLY_PAN;break;case K.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ue(),c=r.TOUCH_DOLLY_ROTATE;break;default:c=r.NONE}break;default:c=r.NONE}c!==r.NONE&&e.dispatchEvent(T)}function Xe(t){switch(Me(t),c){case r.TOUCH_ROTATE:if(e.enableRotate===!1)return;we(t),e.update();break;case r.TOUCH_PAN:if(e.enablePan===!1)return;ye(t),e.update();break;case r.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(t),e.update();break;case r.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;He(t),e.update();break;default:c=r.NONE}}function Ae(t){e.enabled!==!1&&t.preventDefault()}function Ke(t){a.push(t)}function We(t){delete S[t.pointerId];for(let n=0;n<a.length;n++)if(a[n].pointerId==t.pointerId){a.splice(n,1);return}}function Me(t){let n=S[t.pointerId];n===void 0&&(n=new F,S[t.pointerId]=n),n.set(t.pageX,t.pageY)}function ce(t){const n=t.pointerId===a[0].pointerId?a[1]:a[0];return S[n.pointerId]}h!==void 0&&this.connect(h),this.update()}}function gt(g){if(typeof TextDecoder<"u")return new TextDecoder().decode(g);let l="";for(let h=0,e=g.length;h<e;h++)l+=String.fromCharCode(g[h]);try{return decodeURIComponent(escape(l))}catch{return l}}class wt extends nt{constructor(l){super(l)}load(l,h,e,P){const T=this,M=new ot(this.manager);M.setPath(this.path),M.setResponseType("arraybuffer"),M.setRequestHeader(this.requestHeader),M.setWithCredentials(this.withCredentials),M.load(l,function(r){try{h(T.parse(r))}catch(c){P?P(c):console.error(c),T.manager.itemError(l)}},e,P)}parse(l){function h(u){const o=new DataView(u),d=32/8*3+32/8*3*3+16/8,b=o.getUint32(80,!0);if(80+32/8+b*d===o.byteLength)return!0;const f=[115,111,108,105,100];for(let m=0;m<5;m++)if(e(f,o,m))return!1;return!0}function e(u,o,d){for(let b=0,E=u.length;b<E;b++)if(u[b]!==o.getUint8(d+b,!1))return!1;return!0}function P(u){const o=new DataView(u),d=o.getUint32(80,!0);let b,E,f,m=!1,y,x,L,O,w;for(let a=0;a<70;a++)o.getUint32(a,!1)==1129270351&&o.getUint8(a+4)==82&&o.getUint8(a+5)==61&&(m=!0,y=new Float32Array(d*3*3),x=o.getUint8(a+6)/255,L=o.getUint8(a+7)/255,O=o.getUint8(a+8)/255,w=o.getUint8(a+9)/255);const I=84,N=12*4+2,D=new ue,j=new Float32Array(d*3*3),_=new Float32Array(d*3*3);for(let a=0;a<d;a++){const S=I+a*N,Z=o.getFloat32(S,!0),z=o.getFloat32(S+4,!0),W=o.getFloat32(S+8,!0);if(m){const C=o.getUint16(S+48,!0);C&32768?(b=x,E=L,f=O):(b=(C&31)/31,E=(C>>5&31)/31,f=(C>>10&31)/31)}for(let C=1;C<=3;C++){const B=S+C*12,v=a*3*3+(C-1)*3;j[v]=o.getFloat32(B,!0),j[v+1]=o.getFloat32(B+4,!0),j[v+2]=o.getFloat32(B+8,!0),_[v]=Z,_[v+1]=z,_[v+2]=W,m&&(y[v]=b,y[v+1]=E,y[v+2]=f)}}return D.setAttribute("position",new le(j,3)),D.setAttribute("normal",new le(_,3)),m&&(D.setAttribute("color",new le(y,3)),D.hasColors=!0,D.alpha=w),D}function T(u){const o=new ue,d=/solid([\s\S]*?)endsolid/g,b=/facet([\s\S]*?)endfacet/g;let E=0;const f=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+f+f+f,"g"),y=new RegExp("normal"+f+f+f,"g"),x=[],L=[],O=new R;let w,I=0,N=0,D=0;for(;(w=d.exec(u))!==null;){N=D;const j=w[0];for(;(w=b.exec(j))!==null;){let S=0,Z=0;const z=w[0];for(;(w=y.exec(z))!==null;)O.x=parseFloat(w[1]),O.y=parseFloat(w[2]),O.z=parseFloat(w[3]),Z++;for(;(w=m.exec(z))!==null;)x.push(parseFloat(w[1]),parseFloat(w[2]),parseFloat(w[3])),L.push(O.x,O.y,O.z),S++,D++;Z!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+E),S!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+E),E++}const _=N,a=D-N;o.addGroup(_,a,I),I++}return o.setAttribute("position",new Le(x,3)),o.setAttribute("normal",new Le(L,3)),o}function M(u){return typeof u!="string"?gt(new Uint8Array(u)):u}function r(u){if(typeof u=="string"){const o=new Uint8Array(u.length);for(let d=0;d<u.length;d++)o[d]=u.charCodeAt(d)&255;return o.buffer||o}else return u}const c=r(l);return h(c)?P(c):T(M(l))}}function yt(g){const l=new at({canvas:g,antialias:!0,preserveDrawingBuffer:!0,alpha:!0});l.shadowMap.enabled=!0;const h=new it;h.background=new st(10526880),h.fog=new rt(10526880,4,20);const e=new $(75,g.width/g.height,.1,1e3);e.position.set(-2,2,-2.5),h.add(e);const P=new ct(16777215,4473924,3);P.position.set(0,20,0),h.add(P);const T=new lt(16777215,.5);h.add(T);const M=new ut(16777215);M.position.set(-5,15,10),M.castShadow=!0,h.add(M);const r=new De(new ht(40,40),new Se({color:12303291,depthWrite:!1}));r.rotation.set(-Math.PI/2,0,0),r.receiveShadow=!0,h.add(r);const c=new dt(40,40,0,0);c.material.transparent=!0,c.material.opacity=.2,h.add(c);const u=new De(new ue,new Se({color:1728436,shininess:60,flatShading:!0}));u.castShadow=!0,u.receiveShadow=!0,h.add(u);const o=new bt(e,l.domElement);o.update(),o.enableDamping=!0,o.enablePan=!0,o.enableRotate=!0,o.enableZoom=!0;function d(f){f.boundingBox||f.computeBoundingBox(),f.boundingSphere||f.computeBoundingSphere();const m=2/f.boundingSphere.radius,y=f.boundingBox,x=y.getCenter(new R).multiplyScalar(m);u.geometry=f,u.scale.set(m,m,m),u.rotation.set(Math.PI*-.5,0,0),u.position.set(-x.x,-x.z,x.y),c.position.set(0,(y.min.z-y.max.z)/2*m,0),r.position.set(0,(y.min.z-y.max.z)/2*m,0),console.log(u)}function b(){e.aspect=g.width/g.height,e.updateProjectionMatrix()}function E(){o.update(),l.render(h,e)}return{renderer:l,scene:h,camera:e,object:u,grid:c,floor:r,dirLight:M,ambientLight:T,hemiLight:P,controls:o,animate:E,resize:b,setSTLGeometry:d}}function At({url:g,width:l,height:h,...e}){const P=te.useRef(null),[T,M]=te.useState(),{value:r}=Ge(async()=>await new wt().loadAsync(g),[g]);return qe(()=>{P.current&&(P.current.width=l,P.current.height=h,M(yt(P.current)))}),te.useEffect(()=>{if(!T)return;let c=!0;const u=()=>{c&&(T.animate(),requestAnimationFrame(u))};return u(),()=>{c=!1}},[T]),te.useEffect(()=>{r&&T&&T.setSTLGeometry(r)},[T,r]),Qe.jsx(Je,{as:"canvas",ref:P,...e})}export{At as default};
//# sourceMappingURL=stl-viewer-OXRqsbLd.js.map