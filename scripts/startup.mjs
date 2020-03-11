import { loadLetters } from './alphabet.mjs';

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

function start() {
    loadJSON(json => loadLetters(json), '/languages/Kaitag/letters.json')
}
