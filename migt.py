import json

lect = "Akusha"
fn = "public/lects/Aqusha/phonology.json"

jn = json.loads(open(fn, "r", encoding="utf8").read())
dc = []

for ph in jn:
    del ph["features"]
    dc.append(ph)

open(fn, "w", encoding="utf8").write(json.dumps(dc, ensure_ascii=False))
