import json

source = json.loads(open("public/lects/Temirgoy/phonology.json",
                         "r", encoding="utf8").read())
words = []
for ph in source:
    for sm in ph['samples']:
        if 'word' in sm:
            words.append(sm['word'])


open("tmg.txt", "w", encoding="utf8").write('\n'.join(words))
