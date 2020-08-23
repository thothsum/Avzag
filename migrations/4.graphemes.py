import json

names = ["Aqusha", "Kaitag", "Kabardian", "Iron"]

for name in names:
    source = json.loads(open("public/lects/"+name+"/phonemes.json",
                             "r", encoding="utf8").read())
    result = source

    for type in ["vowels", "consonants"]:
        for phoneme in list(source[type].keys()):
            new = []
            for grapheme in list(source[type][phoneme]["samples"].keys()):
                for sample in source[type][phoneme]["samples"][grapheme]:
                    sm = {}
                    if "word" in sample:
                        sm = sample;
                        
                    sm["grapheme"] = grapheme
                    new.append(sm)
            source[type][phoneme]["samples"] = new

    open("public/lects/"+name+"/phonemes.json", "w",
         encoding="utf8").write(json.dumps(result, ensure_ascii=False))
