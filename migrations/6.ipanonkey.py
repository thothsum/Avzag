import json


source = json.loads(open("public/lects/ipa.json", "r", encoding="utf8").read())

for type in ["primary", "secondary"]:
    arr = []
    for ipa in list(source[type].keys()):
        arr.append({"ipa": ipa, "tags": source[type][ipa]})
    source[type] = arr

open("public/lects/ipa.json", "w",
     encoding="utf8").write(json.dumps(source, ensure_ascii=False))
