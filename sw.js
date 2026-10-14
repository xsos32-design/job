/* SA晚班 · 工作執掌 — 離線快取
   策略：先打網路（2.5 秒逾時）→ 取不到就用快取。
   有訊號永遠拿最新，沒訊號照樣打得開。 */
var C = "sa-cache-v1";
var FILES = ["./", "./index.html", "./sim.html", "./posframe.js"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(C).then(function (c) { return c.addAll(FILES); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) { return k === C ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  if (req.url.indexOf("http") !== 0) return;
  e.respondWith(
    new Promise(function (resolve) {
      var done = false;
      var fin = function (r) { if (!done) { done = true; resolve(r); } };
      var timer = setTimeout(function () {
        caches.match(req).then(function (c) { if (c) fin(c); });
      }, 2500);
      fetch(req).then(function (r) {
        clearTimeout(timer);
        if (r && r.status === 200) {
          var cp = r.clone();
          caches.open(C).then(function (c) { c.put(req, cp); });
        }
        fin(r);
      }).catch(function () {
        clearTimeout(timer);
        caches.match(req).then(function (c) {
          fin(c || caches.match("./index.html"));
        });
      });
    })
  );
});
