import json


def updateBlocks(blocks):
    for states in blocks:
        multiple = len(states) > 1
        for state in states:
            empty = 'transition' not in state
            if (empty or not state['transition']) and multiple:
                state['transition'] = []
            elif not empty and state['transition'] == 'next':
                del state['transition']


lects = ['Digor', 'Iron', 'Kaitag', 'Kabardian', 'Keren', 'Temirgoy']
for l in lects:
    path = l + '\\phrasebook.json'

    with open(path, encoding='utf-8') as f:
        phrsbk = json.load(f)

    for _, phrs in phrsbk.items():
        updateBlocks(phrs['blocks'])

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(phrsbk, f, ensure_ascii=False, indent=2)
