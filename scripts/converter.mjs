let profiles;
let fromField;
let toField;

function start(data) {
    profiles = data;

    fromField = document.querySelector("#converter #from");
    toField = document.querySelector("#converter #to");
    fromField.addEventListener("input", e => to.value = process(e.target.value))
    fromField.dispatchEvent(new Event("input"));

    document.querySelector("#converter #copy").onclick = copy;
}

function process(source) {
    const uppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    const convert = (str, from, to) => str.replace(new RegExp(from, 'g'), to);

    for (const [from, to] of Object.entries(profiles[0]["mapping"])) {
        source = convert(source, from, to);
        source = convert(source, uppercase(from), uppercase(to));
    }
    return source;
}

function copy() {
    toField.select();
    document.execCommand('copy');
}

export { start };
