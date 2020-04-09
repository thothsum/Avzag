import json
import os


curdir = os.path.dirname(os.path.abspath(__file__)) + "\\"
result = []


with open(curdir + "oldph.json", "r", encoding="utf8") as file:
    data = json.loads(file.read())
    for i in range(len(data)):
        oldPhn = data[i]
        newPhn = {
            "ipa": oldPhn["ipa"] if "ipa" in oldPhn else "",
            "features": oldPhn["features"] if "features" in oldPhn else [],
            "lects": []
        }
        for j in range(len(oldPhn["lects"])):
            newPhn["lects"].append({
                "name": oldPhn["lects"][j],
                "grapheme": oldPhn["str"] if "str" in oldPhn else "",
                "samples": oldPhn["samples"] if oldPhn["lects"][j] == "Kaitag" and "samples" in oldPhn else[]
            })
        result.append(newPhn)


with open(curdir + "newph.json", "w", encoding="utf8") as file:
    json.dump(result, file, ensure_ascii=False, indent=4)
