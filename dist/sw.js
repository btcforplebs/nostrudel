if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(n.map((s=>a[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-e1498109"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/badge-details-Bnuk-cSu.js",revision:null},{url:"assets/badge-menu-YC7XuKJV.js",revision:null},{url:"assets/browse-BxpaSNJX.js",revision:null},{url:"assets/browse-DwVZCnoG.js",revision:null},{url:"assets/browse-XIDpl7g3.js",revision:null},{url:"assets/channel-BdVGu7pg.js",revision:null},{url:"assets/chat-BTWO807w.js",revision:null},{url:"assets/chat-log-CLBRTBIF.js",revision:null},{url:"assets/chat-message-content-DH1ZcJIv.js",revision:null},{url:"assets/chunk-FAWTVNS3-DRjGX2be.js",revision:null},{url:"assets/community-approved-post-CnQFPEOV.js",revision:null},{url:"assets/community-create-modal-B8kIIGiT.js",revision:null},{url:"assets/community-post-BPGddPsB.js",revision:null},{url:"assets/compare-CSJBBvqo.js",revision:null},{url:"assets/connect-CZKVR-4h.js",revision:null},{url:"assets/create-DvaTMuP5.js",revision:null},{url:"assets/dm-timeline-CBQobgxx.js",revision:null},{url:"assets/dvm-name--L8vhJB8.js",revision:null},{url:"assets/edit-UFkPthm5.js",revision:null},{url:"assets/embedded-article-G0MTVFS1.js",revision:null},{url:"assets/embedded-badge-BNn-7YHd.js",revision:null},{url:"assets/embedded-channel-ByTMntI9.js",revision:null},{url:"assets/embedded-community-CRzn8git.js",revision:null},{url:"assets/embedded-emoji-pack-DOY9_LdN.js",revision:null},{url:"assets/embedded-goal-BpzPAuN3.js",revision:null},{url:"assets/embedded-stemstr-track-BOx_NSHh.js",revision:null},{url:"assets/embedded-stream-BStIJJ93.js",revision:null},{url:"assets/embedded-stream-message-CwRz0uQO.js",revision:null},{url:"assets/embedded-torrent-BN86QXdO.js",revision:null},{url:"assets/embedded-torrent-comment-CBGP_Mjo.js",revision:null},{url:"assets/embedded-wiki-page-BN_zSovZ.js",revision:null},{url:"assets/embedded-zap-receipt-nWw12zGF.js",revision:null},{url:"assets/emoji-pack-card-DPG5MS8t.js",revision:null},{url:"assets/emoji-pack-Czybvn80.js",revision:null},{url:"assets/emoji-pack-menu-DlitT7Eb.js",revision:null},{url:"assets/emoji-packs-Cle-_4Lu.js",revision:null},{url:"assets/event-kinds-table-ZNhBMzdA.js",revision:null},{url:"assets/event-vote-buttions-RbXWv7yI.js",revision:null},{url:"assets/explore-BNVveD7N.js",revision:null},{url:"assets/export-events-button-LHehTa1G.js",revision:null},{url:"assets/extract-D1MQZjS-.js",revision:null},{url:"assets/feed-B1DPVD9x.js",revision:null},{url:"assets/feed-CD4XFirR.js",revision:null},{url:"assets/find-by-name-BZtDifqd.js",revision:null},{url:"assets/format-toolbar-CPmampgE.js",revision:null},{url:"assets/format-toolbar-DlFOpVV3.css",revision:null},{url:"assets/goal-details-C4cbHRXX.js",revision:null},{url:"assets/hls-Bon9X3-D.js",revision:null},{url:"assets/index-0cR9FdqN.js",revision:null},{url:"assets/index-0Gb9m-v2.js",revision:null},{url:"assets/index-5X54iqRL.css",revision:null},{url:"assets/index-B-OB5am6.js",revision:null},{url:"assets/index-B1rVQPtd.js",revision:null},{url:"assets/index-B2ONtybC.js",revision:null},{url:"assets/index-BcEKv2KK.js",revision:null},{url:"assets/index-Bi8b4aQ-.js",revision:null},{url:"assets/index-BTebzwtH.js",revision:null},{url:"assets/index-BunzIuys.js",revision:null},{url:"assets/index-BVRavvDK.css",revision:null},{url:"assets/index-BwUX-d_Q.js",revision:null},{url:"assets/index-C6wlVu-O.js",revision:null},{url:"assets/index-CAXef7at.js",revision:null},{url:"assets/index-CjVpTRrB.js",revision:null},{url:"assets/index-CL74CB5D.js",revision:null},{url:"assets/index-CLzdn4j4.js",revision:null},{url:"assets/index-CprHEKMZ.js",revision:null},{url:"assets/index-CqTu3-q9.js",revision:null},{url:"assets/index-CRu-rICt.js",revision:null},{url:"assets/index-CsO_9Wuk.js",revision:null},{url:"assets/index-CYE1Kylu.js",revision:null},{url:"assets/index-D2Whntpo.js",revision:null},{url:"assets/index-D6oneq3Q.js",revision:null},{url:"assets/index-D7WSYw97.js",revision:null},{url:"assets/index-DAdmyE3k.js",revision:null},{url:"assets/index-DlZPmpce.js",revision:null},{url:"assets/index-DnBXvAxU.js",revision:null},{url:"assets/index-Dy8b-5Ga.js",revision:null},{url:"assets/index-QB6blVoW.js",revision:null},{url:"assets/index-vznarTRp.js",revision:null},{url:"assets/index-z_XX-eEg.js",revision:null},{url:"assets/inline-fedimint-card-BuoQH-OH.js",revision:null},{url:"assets/internal-D2cZN82v.js",revision:null},{url:"assets/live-video-player-CaE8qRC3.js",revision:null},{url:"assets/main-C9k9ZopU.js",revision:null},{url:"assets/markdown-K8m6lr1T.js",revision:null},{url:"assets/memory-C5P9nJNj.js",revision:null},{url:"assets/message-block-CcitCko1.js",revision:null},{url:"assets/miner-GzFW9eHM.js",revision:null},{url:"assets/network-dm-graph-BL3Ad5fA.js",revision:null},{url:"assets/network-mute-graph-CeEegtHE.js",revision:null},{url:"assets/new-B0SeIpR_.js",revision:null},{url:"assets/newest-D9Qgn4i8.js",revision:null},{url:"assets/number-BsCqcFD4.js",revision:null},{url:"assets/page-Y2_K54eM.js",revision:null},{url:"assets/pair-DsOC6VPI.js",revision:null},{url:"assets/pending-DASJZyKE.js",revision:null},{url:"assets/play-BortdZAr.js",revision:null},{url:"assets/qr-scanner-modal-C6pLjdtt.js",revision:null},{url:"assets/react-virtualized-auto-sizer.esm-i_2dVWbg.js",revision:null},{url:"assets/relay-details-BwDZL9s8.js",revision:null},{url:"assets/search-CwNv3dTc.js",revision:null},{url:"assets/sqlite3-BqX9F35q.wasm",revision:null},{url:"assets/sqlite3-opfs-async-proxy-D34PESGD.js",revision:null},{url:"assets/sqlite3-worker1-bundler-friendly-C0USlvNK.js",revision:null},{url:"assets/standalone-CopSbxea.js",revision:null},{url:"assets/stl-viewer-OXRqsbLd.js",revision:null},{url:"assets/stream-card-C9oVRsFU.js",revision:null},{url:"assets/stream-hashtags-DvltmNAH.js",revision:null},{url:"assets/streams-CIHBLx03.js",revision:null},{url:"assets/three.module-dQg0RiKP.js",revision:null},{url:"assets/topic-B7-HoExo.js",revision:null},{url:"assets/torrent-Cgb6lBSF.js",revision:null},{url:"assets/torrent-menu-DLKj8E4u.js",revision:null},{url:"assets/torrent-table-row-CXlkwpX-.js",revision:null},{url:"assets/torrents-BXaXmiZK.js",revision:null},{url:"assets/track-player-Dx3_bwFM.js",revision:null},{url:"assets/tracks-pn_jjhiv.js",revision:null},{url:"assets/trending-neDTLMuh.js",revision:null},{url:"assets/unknown-event-feed-9eC2VEap.js",revision:null},{url:"assets/use-event-markers-D75YlVV7.css",revision:null},{url:"assets/use-event-markers-NVI1qG80.js",revision:null},{url:"assets/use-parsed-streams-DfYuZOzw.js",revision:null},{url:"assets/use-relays-changed-DAaDxEth.js",revision:null},{url:"assets/use-user-network-DZOGHkof.js",revision:null},{url:"assets/user-autocomplete-BPrFEqa4.js",revision:null},{url:"assets/video-BdDGn0qX.js",revision:null},{url:"assets/video-card-Mswz4BXN.js",revision:null},{url:"assets/videos-CfK9vTyX.js",revision:null},{url:"assets/wasm-BnE4OHes.js",revision:null},{url:"assets/webrtc-relays-BQTG2acl.js",revision:null},{url:"assets/wiki-page-menu-N25ZOhSC.js",revision:null},{url:"assets/wiki-page-result-Dc4rntwz.js",revision:null},{url:"assets/wiki-search-form-DoxHDalM.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"assets/worker-sNnzL8Wv.js",revision:null},{url:"assets/worker-TpePvOaT.js",revision:null},{url:"index.html",revision:"52df09e3c1b9f9ad6c7cd9eb1e7fc5b3"},{url:"favicon.ico",revision:"63c9cf6bd7ef91eee096306a9a3ae538"},{url:"icon-192.png",revision:"fe9d4f68fbc816766e68daaefafe70f1"},{url:"icon-512.png",revision:"1ba521b6f1d863007bfdfd852e66132a"},{url:"icon-192-maskable.png",revision:"838127314cd157066e8d361a71663906"},{url:"icon-512-maskable.png",revision:"0671ea09da850614bc55b44642fb1c00"},{url:"manifest.webmanifest",revision:"b8b31885089a15cf4890638765cc5aaa"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map