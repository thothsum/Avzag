import localforage from "localforage";
import { ref } from "vue";
import { lastCommitTime } from "./gh-manager";
import StorageCache from "./storage-cache";

export const lects = ref([] as string[]);
export const root =
  (process.env.VUE_APP_STORE as string) ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export const storage = localforage.createInstance({ name: "user" });
export const cache = new StorageCache(storage, "cache", () =>
  storage
    .getItem<string[]>("lects")
    .then((ls) => (lects.value = ls ?? ["Kaitag"]))
    .then(() => checkOutdated(true))
);

export async function checkOutdated(prompt = false) {
  const entries = Object.entries(cache.records.value).filter(
    ([p]) => !p.includes("/") || lects.value.some((l) => p.startsWith(l))
  );
  const outdated = [];
  for (const [path, { added }] of entries) {
    const updated = await lastCommitTime(path);
    if (updated > added + 600000) outdated.push(path);
  }

  if (outdated.length) {
    console.log("outdated cache", outdated);
    prompt =
      prompt &&
      !!Object.keys(cache.records.value).length &&
      !(await storage.getItem<string[]>("outdated"))?.length;
    await storage.setItem("outdated", outdated);
    if (prompt && confirm("New data available. Download?")) {
      await cleanOutdated();
      location.reload();
    }
  }
}

export async function cleanOutdated() {
  const outdated = await storage.getItem<string[]>("outdated");
  if (outdated) {
    console.log("cleaning outdated cache", outdated);
    outdated?.forEach((p) => delete cache.records.value[p]);
    await storage.removeItem("outdated");
  }
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
