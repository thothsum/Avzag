import json

for n in ["", "Akusha/", "Kaitag/", "Kabardian/"]:
    fileName = "public/lects/"+n+"phrasebook.json"

    source = json.loads(open(fileName,
                             "r", encoding="utf8").read())
    for cat in source.values():
        for phrase in cat:
            for block in phrase["blocks"]:
                for state in block["states"]:
                    display = {}
                    for t in ["text", 'ipa', "glossing"]:
                        if t in state:
                            display[t] = state[t][0][0]
                            del state[t]
                    state["display"] = [display]

    open(fileName, "w",
         encoding="utf8").write(json.dumps(source, ensure_ascii=False, indent=4))
