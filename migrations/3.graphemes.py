import json

names = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for name in names:
    source = json.loads(open("public/lects/"+name+"/phonemes.json",
                             "r", encoding="utf8").read())
    result = source

    for type in ["vowels", "consonants"]:
        for phoneme in list(source[type].keys()):
            new = {}
            for use in source[type][phoneme]["samples"]:
                if "samples" in use:
                    new[use["grapheme"]] = use["samples"]
            source[type][phoneme]["samples"] = new

    open("public/lects/"+name+"/phonemes.json", "w",
         encoding="utf8").write(json.dumps(result, ensure_ascii=False))
