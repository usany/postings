if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const a=e=>s(e,c),l={module:{uri:c},exports:o,require:a};i[c]=Promise.all(n.map((e=>l[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"a27d7b61a0241052f736ebe81718c101"},{url:"assets/browser-DKkJ6cDr.js",revision:null},{url:"assets/index-DWXujbGJ.css",revision:null},{url:"assets/pwa-512x512-C4NidD9c.png",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"firebase-messaging-sw.js",revision:"a1a0fff29e6e28574b40551a443217e3"},{url:"index.html",revision:"a465bdd0d2b163332cac54b3191f04df"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"f35ebe1d2519c34b44344b0135c4f1a1"},{url:"registerSW.js",revision:"7e27f53a1c13cee2a4c17e54cc80773d"},{url:"manifest.webmanifest",revision:"d90b39c02bced4ab23aef1d9dc1d5d22"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
