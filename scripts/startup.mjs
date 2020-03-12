import { start as phonologyStart } from './phonology.mjs';

document.addEventListener("DOMContentLoaded", start);

function loadJSON(callback, url) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function start() {
    let args = getUrlVars();
    let lang = (args != null && 'language' in args) ? args['language'] : 'Kaitag';

    window["langRoot"] = `./languages/${lang}/`;
    loadLanguage();
}

function loadLanguage() {
    let root = window["langRoot"];
    loadJSON(json => phonologyStart(json), root + "phonemes.json");
    loadJSON(json => displayInfo(json), root + "index.json");
    loadJSON(json => displayCatalogue(json), "languages/catalogue.json");
}

function displayInfo(data) {
    let infoDiv = document.querySelector("#info");
    infoDiv.querySelector("h1").innerText = data["title"];
    infoDiv.querySelector("h3").innerText = data["tags"].reduce((a, t) => a = `${a} • ${t}`);
    infoDiv.querySelector("p").innerText = data["description"];
    infoDiv.querySelector("img").src = window["langRoot"] + "image.png";
}

function displayCatalogue(data) {
    let catalogueDiv = document.querySelector("#footer #catalogue");
    for (const language of data) {
        let languageDiv = document.createElement("div");
        languageDiv.className = "language link";
        languageDiv.innerText = language;
        languageDiv.onclick = () => window.location.search = `&language=${language}`;
        catalogueDiv.appendChild(languageDiv);
    }
}
