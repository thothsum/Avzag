import os
import json

path = os.path.dirname(os.path.abspath(__file__))+'\\'
data = []
with open(path+"mn.json", encoding='utf-8') as f:
    data = json.loads(f.read())

for entry in data:
    if "meaning" in entry:
        entry["translation"] = entry["meaning"]["primary"]
        del entry["meaning"]

with open(path+'tr.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
