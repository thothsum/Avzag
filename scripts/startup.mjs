import { start as phonologyStart } from './phonology.mjs';
import { start as converterStart } from './converter.mjs';

document.addEventListener("DOMContentLoaded", start);

function loadJSON(callback, url, json = true) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(json ? JSON.parse(xobj.responseText) : xobj.responseText);
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
    loadJSON(json => displayInfo(json), root + "index.json");
    loadJSON(json => phonologyStart(json), root + "phonemes.json");
    loadJSON(json => converterStart(json), root + "converters.json");
    loadJSON(text => displaySample(text), root + "sample.txt", false);
    loadJSON(json => displayCatalogue(json), "./languages/catalogue.json");
}

function displaySample(text) {
    let el = document.querySelector("#converter #from");
    el.value = text;
    el.dispatchEvent(new Event("input"));
}

function displayInfo(data) {
    let headerDiv = document.querySelector("#header");
    headerDiv.querySelector("#titles h1").innerText = data["title"];
    headerDiv.querySelector("#titles h3").innerText = data["tags"].reduce((a, t) => a = `${a} • ${t}`);
    headerDiv.querySelector("img").src = window["langRoot"] + "image.png";

    let infoDiv = document.querySelector("#info");
    infoDiv.querySelector("p").innerText = data["description"];
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
