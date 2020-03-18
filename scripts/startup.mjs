import { start as phonologyStart } from './phonology.mjs';
import { start as converterStart } from './converter.mjs';

document.addEventListener("DOMContentLoaded", () => start());

function start(lang = null) {
    window.scrollTo(0, 0);
    if (lang == null)
        lang = window.localStorage.getItem("lang") ?? 'Kaitag';

    window.localStorage.setItem("lang", lang);
    window["langRoot"] = `./languages/${lang}/`;
    loadLanguage();
}

function loadLanguage() {
    let root = window["langRoot"];
    fetch(root + "index.json").then(o => o.json()).then(j => displayInfo(j));
    fetch(root + "phonemes.json").then(o => o.json()).then(j => phonologyStart(j));
    fetch(root + "converters.json").then(o => o.json()).then(j => converterStart(j));
    fetch(root + "sample.txt").then(o => o.text()).then(t => displaySample(t));
    fetch("./languages/catalogue.json").then(o => o.json()).then(j => displayCatalogue(j));
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
    catalogueDiv.innerHTML = "";
    for (const lang of data) {
        let languageDiv = document.createElement("a");
        languageDiv.className = "language";
        languageDiv.innerText = lang;
        languageDiv.onclick = () => start(lang);
        catalogueDiv.appendChild(languageDiv);
    }
}
