import glob

cache = ['index.html', 'icon.png', 'manifest.json']
roots = ['scripts', 'styles', 'languages']
for root in roots:
    cache.extend(glob.glob(root + '/**/*.*', recursive=True))

f = open("cachehelper.txt", "w", encoding="utf-8")
for c in cache:
    f.write("\"" + c.replace('\\', '/') + "\",\n")
f.close()
