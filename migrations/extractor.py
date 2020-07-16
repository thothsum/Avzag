import json


def migrate(filename):
    filename = 'public/languages/' + filename

    with open(filename, encoding="utf-8") as file:
        data = json.load(file)

    result = ""
    for p in data:
        if "Digor" not in p["uses"]:
            continue

        digor = p["uses"]["Digor"][0]
        result += "\"" + digor["grapheme"] + "\"\n"
        result += digor["samples"][0] + "\n"
        if len(digor["samples"]) > 1:
            result += digor["samples"][1] + "\n"
        result += "\n"

    with open("digor.txt", 'w', encoding="utf-8") as file:
        file.write(result)


filenames = ['Ossetian/phonology.json']

[migrate(f) for f in filenames]
