const CACHE="centralpack-v3";

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE).then(c=>c.addAll(["./","./index.html"]))
);
});

self.addEventListener("fetch",e=>{
if(e.request.url.includes("productos.json")){
e.respondWith(
fetch(e.request)
.then(res=>{
let clone=res.clone();
caches.open(CACHE).then(c=>c.put(e.request,clone));
return res;
})
.catch(()=>caches.match(e.request))
);
return;
}

e.respondWith(
caches.match(e.request).then(res=>res||fetch(e.request))
);
});
