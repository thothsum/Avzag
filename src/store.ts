import localforage from "localforage";
import { ref, toRaw } from "vue";
import { lastCommitTime } from "./gh-manager";
import StorageCache from "./storage-cache";

export const lects = ref([] as string[]);
export const root =
  (process.env.VUE_APP_STORE as string) ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export const storage = localforage.createInstance({ name: "user" });
export async function resetStorage() {
  await storage.clear();
  cache.records.value = {};
  storage.setItem("lects", toRaw(lects.value));
}

export const cache = new StorageCache(storage, "cache", () => checkOutdated());
async function checkOutdated() {
  if (await storage.getItem("newData")) return;
  const paths = [];
  for (const [path, { added }] of Object.entries(cache.records.value)) {
    const updated = await lastCommitTime(path);
    if (updated > added) paths.push(path);
    console.log("cache time of", path, updated - added);
  }
  if (paths.length)
    if (confirm("New data available. Download?")) {
      paths.forEach((p) => delete cache.records.value[p]);
      await storage.removeItem("newData");
      await storage.ready();
      location.reload();
    } else await storage.setItem("newData", true);
}

export async function loadJSON<T>(
  path: string,
  defaultValue?: T,
  ignoreCache = false
) {
  async function justFetch() {
    return await fetch(root + path, { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => j as T)
      .catch(() => defaultValue as T);
  }
  if (!path.endsWith(".json")) path += ".json";
  if (ignoreCache) return await justFetch();
  if (cache.addRecord(path)) {
    console.log("cached", path);
    const f = await justFetch();
    await storage.setItem(path, f);
    return f;
  }
  return (await storage.getItem<T>(path)) as T;
}
export async function loadLectsJSON<T>(path: string, lects_?: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects_ ?? lects.value) {
    const file = await loadJSON<T>(lect + "/" + path);
    if (file) files[lect] = file;
  }
  return files;
}
