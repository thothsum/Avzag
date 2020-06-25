import json


def migrate(filename):
    with open(filename, encoding="utf-8") as file:
        data = json.load(file)

    for p in data:
        lects = {}
        for l in p["lects"]:
            name = l['name']
            del l['name']
            lects[name] = l
        p["lects"] = lects

    with open(filename, 'w', encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)


filenames = ['public/languages/Dargin/phonology.json',
            'public/languages/Circassian/phonology.json',
            'public/languages/Ossetian/phonology.json']

[migrate(f) for f in filenames]
