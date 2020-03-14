import glob

cache = glob.glob('languages/**/*.*', recursive=True)

f = open("cachehelper.txt", "w", encoding="utf-8")
for c in cache:
    f.write("'" + c.replace('\\', '/') + "',\n")
f.close()
