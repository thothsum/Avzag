let profiles;
let fromField;
let toField;

function start(data) {
    profiles = data;

    fromField = document.querySelector("#converter #from");
    toField = document.querySelector("#converter #to");
    fromField.addEventListener("input", e => to.value = process(e.target.value))
    fromField.dispatchEvent(new Event("input"));

    document.querySelector("#converter #options #copy").onclick = copy;
    document.querySelector("#converter #options #input").addEventListener('change', handleFiles)
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

function handleFiles(event) {
    console.log(event.target.files[0]);
    var reader = new FileReader();
    reader.onload = e => processFiles(e.target.result);
    reader.readAsText(event.target.files[0]);
}

function processFiles(text)
{
    console.log(text);
    download("hello.txt", process(text));
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export { start };
