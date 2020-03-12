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
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function start() {
    let args = getUrlVars();
    let lang = (args != null && 'language' in args) ? args['language'] : 'Kaitag';
    window["language"] = lang;
    loadJSON(json => phonologyStart(json), `/languages/${lang}/phonemes.json`)
}
