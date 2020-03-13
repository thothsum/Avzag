
let profiles;

function start(data) {
    profiles = data;

    let from = document.querySelector("#converter #from");
    let to = document.querySelector("#converter #to");
    from.addEventListener("input", e => to.value = process(e.target.value))
    from.dispatchEvent(new Event("input"));
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

export { start, process };
