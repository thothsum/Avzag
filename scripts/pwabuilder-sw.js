// This is the service worker with the Cache-first network

const CACHE = "pwabuilder-precache";
const precacheFiles = [
    "index.html",
    "icon.png",
    "manifest.json",
    "scripts/converter.mjs",
    "scripts/howler.min.js",
    "scripts/phonology.mjs",
    "scripts/pwabuilder-sw.js",
    "scripts/startup.mjs",
    "styles/alphabet.css",
    "styles/catalogue.css",
    "styles/converter.css",
    "styles/site.css",
    "languages/catalogue.json",
    "languages/Kabardian/converters.json",
    "languages/Kabardian/image.png",
    "languages/Kabardian/index.json",
    "languages/Kabardian/phonemes.json",
    "languages/Kabardian/sample.txt",
    "languages/Kaitag/converters.json",
    "languages/Kaitag/image.png",
    "languages/Kaitag/index.json",
    "languages/Kaitag/phonemes.json",
    "languages/Kaitag/sample.txt",
    "languages/Kaitag/audio/а.m4a",
    "languages/Kaitag/audio/азир.m4a",
    "languages/Kaitag/audio/атта.m4a",
    "languages/Kaitag/audio/б.m4a",
    "languages/Kaitag/audio/баргьул.m4a",
    "languages/Kaitag/audio/бац.m4a",
    "languages/Kaitag/audio/баълабай.m4a",
    "languages/Kaitag/audio/бевжвахана.m4a",
    "languages/Kaitag/audio/бейкку.m4a",
    "languages/Kaitag/audio/бекӏ.m4a",
    "languages/Kaitag/audio/белгьвана.m4a",
    "languages/Kaitag/audio/белкӏвана.m4a",
    "languages/Kaitag/audio/белхьвана.m4a",
    "languages/Kaitag/audio/белчӏвахана.m4a",
    "languages/Kaitag/audio/бергъвара.m4a",
    "languages/Kaitag/audio/берквана.m4a",
    "languages/Kaitag/audio/берчвахана.m4a",
    "languages/Kaitag/audio/бершвахара.m4a",
    "languages/Kaitag/audio/бихъна.m4a",
    "languages/Kaitag/audio/биччвахара.m4a",
    "languages/Kaitag/audio/букье.m4a",
    "languages/Kaitag/audio/бурсибил.m4a",
    "languages/Kaitag/audio/в.m4a",
    "languages/Kaitag/audio/вагьла.m4a",
    "languages/Kaitag/audio/варси.m4a",
    "languages/Kaitag/audio/вегъивкъел.m4a",
    "languages/Kaitag/audio/вецӏал.m4a",
    "languages/Kaitag/audio/г.m4a",
    "languages/Kaitag/audio/гв.m4a",
    "languages/Kaitag/audio/гванадехь.m4a",
    "languages/Kaitag/audio/гуневла.m4a",
    "languages/Kaitag/audio/гъ.m4a",
    "languages/Kaitag/audio/гъай.m4a",
    "languages/Kaitag/audio/гъв.m4a",
    "languages/Kaitag/audio/гъвярцӏил.m4a",
    "languages/Kaitag/audio/гъизбе.m4a",
    "languages/Kaitag/audio/гъукле.m4a",
    "languages/Kaitag/audio/гь.m4a",
    "languages/Kaitag/audio/гьассара.m4a",
    "languages/Kaitag/audio/гьв.m4a",
    "languages/Kaitag/audio/гьинце.m4a",
    "languages/Kaitag/audio/гьуфбарара.m4a",
    "languages/Kaitag/audio/гӏ.m4a",
    "languages/Kaitag/audio/гӏябал.m4a",
    "languages/Kaitag/audio/гӏямру.m4a",
    "languages/Kaitag/audio/гӏяхӏле.m4a",
    "languages/Kaitag/audio/д.m4a",
    "languages/Kaitag/audio/декӏле.m4a",
    "languages/Kaitag/audio/делгвана.m4a",
    "languages/Kaitag/audio/дехьвана.m4a",
    "languages/Kaitag/audio/дивхьхьара.m4a",
    "languages/Kaitag/audio/диргьвар.m4a",
    "languages/Kaitag/audio/дирихь.m4a",
    "languages/Kaitag/audio/дуцца.m4a",
    "languages/Kaitag/audio/дучче.m4a",
    "languages/Kaitag/audio/дярхӏя.m4a",
    "languages/Kaitag/audio/ж.m4a",
    "languages/Kaitag/audio/жв.m4a",
    "languages/Kaitag/audio/житӏа.m4a",
    "languages/Kaitag/audio/з.m4a",
    "languages/Kaitag/audio/зарадехь.m4a",
    "languages/Kaitag/audio/и.m4a",
    "languages/Kaitag/audio/ила.m4a",
    "languages/Kaitag/audio/ирххе.m4a",
    "languages/Kaitag/audio/ишшвахара.m4a",
    "languages/Kaitag/audio/й.m4a",
    "languages/Kaitag/audio/к.m4a",
    "languages/Kaitag/audio/кабихьхьара.m4a",
    "languages/Kaitag/audio/кабишшвахара.m4a",
    "languages/Kaitag/audio/катӏара.m4a",
    "languages/Kaitag/audio/кв.m4a",
    "languages/Kaitag/audio/квацци.m4a",
    "languages/Kaitag/audio/кержвахара.m4a",
    "languages/Kaitag/audio/керхвара.m4a",
    "languages/Kaitag/audio/кк.m4a",
    "languages/Kaitag/audio/ккв.m4a",
    "languages/Kaitag/audio/ккуртте.m4a",
    "languages/Kaitag/audio/кулпет.m4a",
    "languages/Kaitag/audio/къ.m4a",
    "languages/Kaitag/audio/къабагъ.m4a",
    "languages/Kaitag/audio/къатта.m4a",
    "languages/Kaitag/audio/къв.m4a",
    "languages/Kaitag/audio/къвяна.m4a",
    "languages/Kaitag/audio/къкъ.m4a",
    "languages/Kaitag/audio/кь.m4a",
    "languages/Kaitag/audio/кьаст.m4a",
    "languages/Kaitag/audio/кьв.m4a",
    "languages/Kaitag/audio/кьвял.m4a",
    "languages/Kaitag/audio/кӏ.m4a",
    "languages/Kaitag/audio/кӏана.m4a",
    "languages/Kaitag/audio/кӏв.m4a",
    "languages/Kaitag/audio/кӏултӏа.m4a",
    "languages/Kaitag/audio/л.m4a",
    "languages/Kaitag/audio/луццум.m4a",
    "languages/Kaitag/audio/лягӏ.m4a",
    "languages/Kaitag/audio/м.m4a",
    "languages/Kaitag/audio/манзи.m4a",
    "languages/Kaitag/audio/махъва.m4a",
    "languages/Kaitag/audio/маъ.m4a",
    "languages/Kaitag/audio/мейдам.m4a",
    "languages/Kaitag/audio/милкъвя.m4a",
    "languages/Kaitag/audio/мичи.m4a",
    "languages/Kaitag/audio/муза.m4a",
    "languages/Kaitag/audio/мукьара.m4a",
    "languages/Kaitag/audio/мургьи.m4a",
    "languages/Kaitag/audio/н.m4a",
    "languages/Kaitag/audio/никӏва.m4a",
    "languages/Kaitag/audio/нисса.m4a",
    "languages/Kaitag/audio/нихьхьва.m4a",
    "languages/Kaitag/audio/нишша.m4a",
    "languages/Kaitag/audio/някъ.m4a",
    "languages/Kaitag/audio/п.m4a",
    "languages/Kaitag/audio/палтар.m4a",
    "languages/Kaitag/audio/пикре.m4a",
    "languages/Kaitag/audio/пп.m4a",
    "languages/Kaitag/audio/ппала.m4a",
    "languages/Kaitag/audio/пӏ.m4a",
    "languages/Kaitag/audio/пӏялцӏикӏ.m4a",
    "languages/Kaitag/audio/р.m4a",
    "languages/Kaitag/audio/рангакквар.m4a",
    "languages/Kaitag/audio/рицци.m4a",
    "languages/Kaitag/audio/с.m4a",
    "languages/Kaitag/audio/сагъли.m4a",
    "languages/Kaitag/audio/сс.m4a",
    "languages/Kaitag/audio/т.m4a",
    "languages/Kaitag/audio/талхъан.m4a",
    "languages/Kaitag/audio/тт.m4a",
    "languages/Kaitag/audio/ттура.m4a",
    "languages/Kaitag/audio/тӏ.m4a",
    "languages/Kaitag/audio/тӏал.m4a",
    "languages/Kaitag/audio/тӏиппе.m4a",
    "languages/Kaitag/audio/у.m4a",
    "languages/Kaitag/audio/урчӏе.m4a",
    "languages/Kaitag/audio/урши.m4a",
    "languages/Kaitag/audio/уста.m4a",
    "languages/Kaitag/audio/уцци.m4a",
    "languages/Kaitag/audio/х.m4a",
    "languages/Kaitag/audio/халича.m4a",
    "languages/Kaitag/audio/хв.m4a",
    "languages/Kaitag/audio/хвя.m4a",
    "languages/Kaitag/audio/хх.m4a",
    "languages/Kaitag/audio/ххярбе.m4a",
    "languages/Kaitag/audio/хъ.m4a",
    "languages/Kaitag/audio/хъале.m4a",
    "languages/Kaitag/audio/хъв.m4a",
    "languages/Kaitag/audio/хъвянтӏ.m4a",
    "languages/Kaitag/audio/хь.m4a",
    "languages/Kaitag/audio/хьацӏил.m4a",
    "languages/Kaitag/audio/хьв.m4a",
    "languages/Kaitag/audio/хьулум.m4a",
    "languages/Kaitag/audio/хьуне.m4a",
    "languages/Kaitag/audio/хьхь.m4a",
    "languages/Kaitag/audio/хьхьв.m4a",
    "languages/Kaitag/audio/хӏ.m4a",
    "languages/Kaitag/audio/хӏяжлачӏе.m4a",
    "languages/Kaitag/audio/хӏянчи.m4a",
    "languages/Kaitag/audio/ц.m4a",
    "languages/Kaitag/audio/цакъкъара.m4a",
    "languages/Kaitag/audio/цикӏал.m4a",
    "languages/Kaitag/audio/цула.m4a",
    "languages/Kaitag/audio/цц.m4a",
    "languages/Kaitag/audio/ццав.m4a",
    "languages/Kaitag/audio/цце.m4a",
    "languages/Kaitag/audio/ця.m4a",
    "languages/Kaitag/audio/цӏ.m4a",
    "languages/Kaitag/audio/цӏалип.m4a",
    "languages/Kaitag/audio/ч.m4a",
    "languages/Kaitag/audio/чв.m4a",
    "languages/Kaitag/audio/чваква.m4a",
    "languages/Kaitag/audio/чехъил.m4a",
    "languages/Kaitag/audio/чибиган.m4a",
    "languages/Kaitag/audio/чицахьхьвара.m4a",
    "languages/Kaitag/audio/чуйна.m4a",
    "languages/Kaitag/audio/чух.m4a",
    "languages/Kaitag/audio/чч.m4a",
    "languages/Kaitag/audio/ччашин.m4a",
    "languages/Kaitag/audio/ччв.m4a",
    "languages/Kaitag/audio/ччвакква.m4a",
    "languages/Kaitag/audio/ччве.m4a",
    "languages/Kaitag/audio/чэв.m4a",
    "languages/Kaitag/audio/чӏ.m4a",
    "languages/Kaitag/audio/чӏала.m4a",
    "languages/Kaitag/audio/чӏв.m4a",
    "languages/Kaitag/audio/чӏвакьва.m4a",
    "languages/Kaitag/audio/чӏвел.m4a",
    "languages/Kaitag/audio/ш.m4a",
    "languages/Kaitag/audio/шалал.m4a",
    "languages/Kaitag/audio/шв.m4a",
    "languages/Kaitag/audio/швел.m4a",
    "languages/Kaitag/audio/шин.m4a",
    "languages/Kaitag/audio/шипӏяй.m4a",
    "languages/Kaitag/audio/шукъкъа.m4a",
    "languages/Kaitag/audio/шш.m4a",
    "languages/Kaitag/audio/шшв.m4a",
    "languages/Kaitag/audio/шшери.m4a",
    "languages/Kaitag/audio/э.m4a",
    "languages/Kaitag/audio/эркӏ.m4a",
    "languages/Kaitag/audio/я.m4a",
    "languages/Ossetian/converters.json",
    "languages/Ossetian/image.png",
    "languages/Ossetian/index.json",
    "languages/Ossetian/phonemes.json",
    "languages/Ossetian/sample.txt",
]

self.addEventListener("install", function (event) {
    console.log("[PWA Builder] Install Event processing");

    console.log("[PWA Builder] Skip waiting on install");
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("[PWA Builder] Caching pages during install");
            return cache.addAll(precacheFiles);
        })
    );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
    console.log("[PWA Builder] Claiming clients for current page");
    event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        fromCache(event.request).then(
            function (response) {
                // The response was found in the cache so we responde with it and update the entry

                // This is where we call the server to get the newest version of the
                // file to use the next time we show view
                event.waitUntil(
                    fetch(event.request).then(function (response) {
                        return updateCache(event.request, response);
                    })
                );

                return response;
            },
            async function () {
                // The response was not found in the cache so we look for it on the server
                try {
                    const response = await fetch(event.request);
                    // If request was success, add or update it in the cache
                    event.waitUntil(updateCache(event.request, response.clone()));
                    return response;
                }
                catch (error) {
                    console.log("[PWA Builder] Network request failed and no cache." + error);
                }
            }
        )
    );
});

async function fromCache(request) {
    // Check to see if you have it in the cache
    // Return response
    // If not in the cache, then return
    const cache = await caches.open(CACHE);
    const matching = await cache.match(request);
    if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
    }
    return matching;
}

async function updateCache(request, response) {
    const cache = await caches.open(CACHE);
    return cache.put(request, response);
}
