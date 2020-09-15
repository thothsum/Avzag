import json

names = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for name in names:
    source = json.loads(open("public/lects/"+name+"/phonology.json",
                             "r", encoding="utf8").read())
    result = source

    for type in ["vowels", "consonants"]:
        arr = []
        for phoneme in list(source[type].keys()):
            ph = source[type][phoneme];
            ph["phoneme"] = phoneme;
            arr.append(ph)
        source[type] = arr

    open("public/lects/"+name+"/phonology.json", "w",
         encoding="utf8").write(json.dumps(result, ensure_ascii=False))
