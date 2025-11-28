self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // ניתן להוסיף כאן קאש לאופליין
});
