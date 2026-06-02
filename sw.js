// Kill-switch SW: clears old caches and unregisters itself so stale pages can't be served.
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{
      var ks = await caches.keys();
      await Promise.all(ks.map(function(k){ return caches.delete(k); }));
      await self.registration.unregister();
      var cs = await self.clients.matchAll();
      cs.forEach(function(c){ c.navigate(c.url); });
    }catch(err){}
  })());
});
