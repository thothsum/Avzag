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


path = 'phrasebook.json'
with open(path, encoding='utf-8') as f:
    phrsbkcrps = json.load(f)

for sctn in phrsbkcrps:
    for phrs in sctn['phrases']:
        updateBlocks(phrs['blocks'])

with open(path, 'w', encoding='utf-8') as f:
    json.dump(phrsbkcrps, f, ensure_ascii=False, indent=2)
