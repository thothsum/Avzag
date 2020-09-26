import json

fileName = "Ossetian"
lectName = "Digor"

source = json.loads(open("public/languages/"+fileName+"/phonology.json",
                         "r", encoding="utf8").read())
result = []
for old in source:
    if lectName in old["uses"]:
        samples = []
        for u in old["uses"][lectName]:
            for s in u["samples"]:
                samples.append(
                    {"grapheme": u["grapheme"], "word": s[0], "ipa": s[1]})
        result.append({"phoneme": old["ipa"], "samples": samples})


open("public/lects/"+lectName+"/phonology.json", "w",
     encoding="utf8").write(json.dumps(result, ensure_ascii=False, indent=4))
