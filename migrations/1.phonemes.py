import json

names = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for name in names:
    source = json.loads(open("public/lects/"+name+"/phonemes.json",
                             "r", encoding="utf8").read())

    for type in ["vowels", "consonants"]:
        phonemes = {}
        for phoneme in source[type]:
            ph = phoneme
            key = ph["phoneme"]
            del ph["phoneme"]
            phonemes[key] = ph
            
        source[type] = phonemes

    open("public/lects/"+name+"/phonemes.json", "w",
         encoding="utf8").write(json.dumps(source, ensure_ascii=False))
