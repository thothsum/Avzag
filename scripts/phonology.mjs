let player;

function start(data) {
    data.sort(function (a, b) {
        if (a["grapheme"] < b["grapheme"]) { return -1; }
        if (a["grapheme"] > b["grapheme"]) { return 1; }
        return 0;
    })
    data.forEach(e => {
        if (e["phoneme"] == null) e["phoneme"] = '-';
    });

    player = new Audio();

    loadTable(data);
    viewLetter(data[0]);
}

function loadTable(data) {
    let table = document.querySelector("#alphabet #tables #letters");
    for (const category of ["consonant", "vowel"]) {
        let subTable = document.createElement("div");
        subTable.className = `table ${category}`;
        for (const phoneme of data.filter(l => l["tags"].includes(category))) {
            var el = document.createElement("button");
            el.className = "letter";

            let gp = document.createElement("span");
            gp.className = "grapheme";
            gp.innerText = phoneme["grapheme"];

            let pp = document.createElement("span");
            pp.className = "phoneme";
            pp.innerText = phoneme["phoneme"];

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
    detailsDiv.querySelector("h2").innerText = `${phoneme["grapheme"]} • ${phoneme["phoneme"]}`;
    let tags = phoneme["tags"];
    detailsDiv.querySelector(".tags").innerText = tags.reduce((a, t) => a = `${a} ${t}`);

    let samplesDiv = detailsDiv.querySelector("#samples");
    samplesDiv.innerHTML = "";

    for (const sample of phoneme["samples"]) {
        let button = document.createElement("button");
        button.classList = "sample";
        button.onclick = () => playSample(sample);
        button.innerHTML = hightlight(sample, phoneme["grapheme"]);
        samplesDiv.appendChild(button);
    }
}

function playSample(sample) {
    player.src = `${window["langRoot"]}audio/${sample}.m4a`;
    player.play();
}

const hightlight = (sample, grapheme) => sample.replace(new RegExp(grapheme, 'g'), `<b>${grapheme}</b>`);

export { start };
