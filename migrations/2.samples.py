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
                if "samples" in use:
                    new = []
                    for sample in use["samples"]:
                        sam = {}
                        for i, prop in enumerate(["word", "ipa", "highlights", "muted"]):
                            if i < len(sample):
                                sam[prop] = sample[i]
                            else:
                                break
                        if len(sam) > 0 and sam["word"][0] == '*':
                            sam["word"] = sam["word"][1:]
                            sam["muted"] = True
                        new.append(sam)
                    use["samples"] = new

    open("public/lects/"+name+"/phonemes.json", "w",
         encoding="utf8").write(json.dumps(result, ensure_ascii=False))
