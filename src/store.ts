import localforage from "localforage";
import { ref, toRaw, watch } from "vue";
import StorageCache from "./storage-cache";

export const lects = ref([] as string[]);
export const root =
  (process.env.VUE_APP_STORE as string) ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export const storage = localforage.createInstance({ name: "userland" });
const cache = new StorageCache(storage);
watch(
  () => lects.value,
  async () => {
    await storage.clear();
    cache.records.value = {};
    storage.setItem("lects", toRaw(lects.value));
  }
);

export async function loadJSON<T>(
  path: string,
  defaultValue?: T,
  ignoreCache = false
) {
  async function justFetch() {
    return await fetch(root + path)
      .then((r) => r.json())
      .then((j) => j as T)
      .catch(() => defaultValue as T);
  }
  if (!path.endsWith(".json")) path += ".json";
  if (ignoreCache) return await justFetch();
  if (cache.addRecord(path)) await storage.setItem(path, await justFetch());
  else if (cache.addRecord("newData")) console.log("new data detected");
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
