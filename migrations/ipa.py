import json

source = json.loads(open("public/lects/ipa.json", "r", encoding="utf8").read())
for cat in source.keys():
    for ph in source[cat]:
        ph['tags'] = ' '.join(ph['tags'])


open("public/lects/ipa.json", "w",
     encoding="utf8").write(json.dumps(source, ensure_ascii=False, indent=4))
