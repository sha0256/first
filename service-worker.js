const CACHE_NAME = "pwa-demo-cache-v1";
const FILES_TO_CACHE = [
    "index.html",
    "app.js",
    "manifest.json",
    "service-worker.js"
];

// התקנה — הכנסת הקבצים לזיכרון Cache
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    console.log("Service Worker: installed");
    self.skipWaiting();
});

// הפעלה
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
    console.log("Service Worker: activated");
});

// בקשות — אם אין אינטרנט, נשתמש ב-Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // אם יש בקובץ במטמון – תחזיר אותו
            if (response) {
                return response;
            }
            // אם אין במטמון – נביא מהאינטרנט
            return fetch(event.request);
        })
    );
});
