const CACHE_NAME = "site-cache-v1";

const urlsToCache = [
  "/",
  "index.html",
  "styles/mystyle.css",
  "scripts/myscript.js",
  "images/logo2.png",
  "404.html",
];
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Fallback naar offline pagina als netwerkrequest faalt
      return caches.match("404.html");
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

