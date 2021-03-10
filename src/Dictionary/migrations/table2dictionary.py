import os
import json

path = os.path.dirname(os.path.abspath(__file__))+'\\'
pairs = []
with open(path+"dct.txt", encoding='utf-8') as f:
    for l in f.readlines():
        s = l.strip().split(';')
        if len(s) == 2:
            pairs.append(s)

data = [{"translation": t, "forms": [{"text": {"plain": f}}]}
        for [f, t] in pairs]

with open(path+'dct.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
