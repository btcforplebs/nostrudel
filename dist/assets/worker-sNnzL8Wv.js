var U=t=>{throw TypeError(t)};var p=(t,e,n)=>e.has(t)||U("Cannot "+n);var u=(t,e,n)=>(p(t,e,"read from private field"),n?n.call(t):e.get(t)),y=(t,e,n)=>e.has(t)?U("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),w=(t,e,n,r)=>(p(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),i=(t,e,n)=>(p(t,e,"access private method"),n);let h;const x=new Uint8Array(16);function I(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(x)}const s=[];for(let t=0;t<256;++t)s.push((t+256).toString(16).slice(1));function W(t,e=0){return s[t[e+0]]+s[t[e+1]]+s[t[e+2]]+s[t[e+3]]+"-"+s[t[e+4]]+s[t[e+5]]+"-"+s[t[e+6]]+s[t[e+7]]+"-"+s[t[e+8]]+s[t[e+9]]+"-"+s[t[e+10]]+s[t[e+11]]+s[t[e+12]]+s[t[e+13]]+s[t[e+14]]+s[t[e+15]]}const D=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),k={randomUUID:D};function T(t,e,n){if(k.randomUUID&&!e&&!t)return k.randomUUID();t=t||{};const r=t.random||(t.rng||I)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,W(r)}var c,d,a,o;class E{constructor(e){y(this,a);y(this,c);y(this,d);if(w(this,d,new Map),this.timeout=3e4,e instanceof Worker)w(this,c,e);else{const n=e||new URL("/assets/worker-rNE7I5WR.mjs",import.meta.url);w(this,c,new Worker(n,{type:"module"}))}u(this,c).onerror=n=>{console.error(n.message,n)},u(this,c).onmessageerror=n=>{console.error(n)},u(this,c).onmessage=n=>{const r=n.data;if(r.cmd==="reply"){const m=u(this,d).get(r.id);m==null||m(r,n.ports),u(this,d).delete(r.id)}}}async init(e){return await i(this,a,o).call(this,"init",e)}async event(e){return await i(this,a,o).call(this,"event",e)}async query(e){return await i(this,a,o).call(this,"req",e)}async count(e){return await i(this,a,o).call(this,"count",e)}async delete(e){return await i(this,a,o).call(this,"delete",e)}async summary(){return await i(this,a,o).call(this,"summary")}async close(e){return await i(this,a,o).call(this,"close",e)}async dump(){return await i(this,a,o).call(this,"dumpDb")}async wipe(){return await i(this,a,o).call(this,"wipe")}async forYouFeed(e){return await i(this,a,o).call(this,"forYouFeed",e)}setEventMetadata(e,n){return i(this,a,o).call(this,"setEventMetadata",[e,n])}async debug(e){return await i(this,a,o).call(this,"debug",e)}}c=new WeakMap,d=new WeakMap,a=new WeakSet,o=async function(e,n){const r=T(),m={id:r,cmd:e,args:n};return await new Promise((R,g)=>{u(this,c).postMessage(m);const b=setTimeout(()=>{u(this,d).delete(r),g(new Error("Timeout"))},this.timeout);u(this,d).set(r,(v,j)=>{clearTimeout(b);const l=v;if(l.args.error){g(l.args.error);return}R(l.args)})})};function S(t){return new Worker("/assets/worker-TpePvOaT.js",{name:t==null?void 0:t.name})}const M=new S,V=new E(M);await V.init({databasePath:"nostrudel.db",insertBatchSize:100});export{V as default};
//# sourceMappingURL=worker-sNnzL8Wv.js.map