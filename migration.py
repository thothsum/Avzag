import json

names = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for name in names:
    source = json.loads(open("public/lects/"+name+"/phonemes.json",
                             "r", encoding="utf8").read())
    result = source

    for type in ["vowels", "consonants"]:
        phonemes = []
        for phoneme in source[type]:
            for use in phoneme["uses"]:
                

    open("public/lects/"+name+"/phonemes.json", "w",
         encoding="utf8").write(json.dumps(result, ensure_ascii=False))
