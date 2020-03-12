import "./howler.min.js";

let player;

function start(data) {
    try {
        player = new Howl({ src: [""] });
        player.play();
    } catch{ }

    loadTable(data);
    viewLetter(data[0]);
}

function loadTable(data) {
    let table = document.querySelector("#alphabet #tables");
    for (const category of ["consonant", "vowel"]) {
        let subTable = document.createElement("div");
        subTable.className = `table ${category}`;
        for (const phoneme of data.filter(l => l["tags"].includes(category))) {
            var el = document.createElement("div");
            el.className = "button letter";

            let gp = document.createElement("span");
            gp.id = "grapheme";
            gp.innerText = phoneme["grapheme"];

            let pp = document.createElement("span");
            pp.id = "phoneme";
            pp.innerText = phoneme["phonene"] ?? "-";

            el.appendChild(gp);
            el.appendChild(document.createElement("br"));
            el.appendChild(pp);
            el.onclick = () => viewLetter(phoneme);

            subTable.appendChild(el);
        }
        table.prepend(subTable);
    }
}

function viewLetter(phoneme) {
    let detailsDiv = document.querySelector("#alphabet #tables #details");
    detailsDiv.appendChild(document.createElement("h2"))
    detailsDiv.querySelector("h2").innerText = `${phoneme["grapheme"]} • ${phoneme["phoneme"] ?? '-'}`;

    let tags = phoneme["tags"];
    detailsDiv.querySelector(".tags").innerText = tags.reduce((a, t) => a = `${a} ${t}`);

    let samplesDiv = detailsDiv.querySelector("#samples");
    samplesDiv.innerHTML = "";

    for (const sample of phoneme["samples"]) {
        let button = document.createElement("span");
        button.classList = "button sample";
        button.onclick = () => playSample(sample);
        button.innerHTML = hightlight(sample, phoneme["grapheme"]);
        samplesDiv.appendChild(button);
    }
}

function playSample(sample) {
    player.stop();
    player = new Howl({ src: [`languages/${window["language"]}/audio/${sample}.m4a`] });
    player.play();
}

function hightlight(sample, grapheme) {
    return sample.replace(new RegExp(grapheme, 'g'), `<b>${grapheme}</b>`);
}

export { start };
