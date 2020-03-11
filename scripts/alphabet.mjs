let letters;

function loadLetters(_letters) {
    letters = _letters;

    let table = document.querySelector("#alphabet #tables");
    for (const category of ["vowel", "consonant"]) {
        let subTable = document.createElement("div");
        subTable.id = "table " + category;
        for (const letter of letters) {
            var el = document.createElement("div");
            el.innerText = letter["grapheme"];
            subTable.appendChild(el);
        }
        table.appendChild(subTable);
    }
}

export { letters, loadLetters };
