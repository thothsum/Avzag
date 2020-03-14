import glob
import json

cache = ['index.html', 'icon.png', 'manifest.json', 'pwabuilder-sw.js']

for lang in json.load(open('languages/catalogue.json', "r")):
   cache.append(f"index.html?&language={lang}")

roots=['scripts', 'styles', 'languages']
for root in roots:
    cache.extend(glob.glob(root + '/**/*.*', recursive=True))

f=open("cachehelper.txt", "w", encoding="utf-8")
for c in cache:
    f.write("\"" + c.replace('\\', '/') + "\",\n")
f.close()
