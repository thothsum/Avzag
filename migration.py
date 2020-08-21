import json

ct = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for lc in ct:
    jn = json.loads(open("public/lects/"+lc+"/phonology.json",
                         "r", encoding="utf8").read())
    dc = {}

    for ph in list(jn.keys()):
        if "features" in jn[ph]:
            del jn[ph]["features"]
        dc[ph] = jn[ph]

    open("public/lects/"+lc+"/phonology.json", "w",
         encoding="utf8").write(json.dumps(dc, ensure_ascii=False))
