import json


def migrate(filename, lect):
    filename = 'public/languages/' + filename

    with open(filename, encoding="utf-8") as file:
        data = json.load(file)

    result = ""
    for p in data:
        if lect not in p["uses"]:
            continue

        use = p["uses"][lect][0]
        result += "\"" + use["grapheme"] + "\"\n"
        result += use["samples"][0] + "\n"
        if len(use["samples"]) > 1:
            result += use["samples"][1] + "\n"
        result += "\n"

    with open(lect + ".txt", 'w', encoding="utf-8") as file:
        file.write(result)


migrate('Ossetian/phonology.json', "Iron")
