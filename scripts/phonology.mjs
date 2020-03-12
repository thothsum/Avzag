import "./howler.min.js";

let player;

function start(data) {
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
            el.innerText = phoneme["grapheme"];
            el.onclick = () => viewLetter(phoneme);
            subTable.appendChild(el);
        }
        table.prepend(subTable);
    }
}

function viewLetter(phoneme) {
    let detailsDiv = document.querySelector("#alphabet #tables #details");
    detailsDiv.appendChild(document.createElement("h2"))
    detailsDiv.querySelector("h2").innerText = `${phoneme["grapheme"]} • ${phoneme["phoneme"]}`;

    let tags = phoneme["tags"];
    detailsDiv.querySelector(".tags").innerText = tags.reduce((a, t) => a = `${a} ${t}`);

    let samplesDiv = detailsDiv.querySelector("#samples");
    samplesDiv.innerHTML = "";

    for (const sample of phoneme["samples"]) {
        let button = document.createElement("span");
        button.classList = "button sample";
        button.onclick = () => playSample(sample);
        button.innerHTML = sample;
        samplesDiv.appendChild(button);
    }
}

function playSample(sample) {
    if (player != null)
        player.stop();

    player = new Howl({ src: [`languages/${window["language"]}/audio/${sample}.m4a`] });
    player.play();
}

export { start };
