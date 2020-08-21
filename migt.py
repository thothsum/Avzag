import json

lect = "Akusha"
fn = "public/lects/aqusha/phonology.json"

jn = json.loads(open(fn, "r", encoding="utf8").read())
dc = []

for ph in jn:
    us = ph["uses"]
    if lect in us:
        ph["uses"] = us[lect]
        dc.append(ph)

open(fn, "w", encoding="utf8").write(json.dumps(dc, ensure_ascii=False))
