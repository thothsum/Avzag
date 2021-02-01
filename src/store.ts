import { ref } from "vue";

let key: symbol;

export const root =
  (process.env.NODE_ENV === "production" && process.env.STORE !== "local"
    ? "https://raw.githubusercontent.com/alkaitagi/Avzag/"
    : "/") + "store/";

export const lects = ref<string[]>([]);

export function setupStore(_lects: string[]) {
  lects.value = _lects;
  key = Symbol("lects");
}
export function getInitializer(callback: () => Promise<unknown>) {
  let _key: symbol;
  return async () => {
    if (_key === key) return;
    _key = key;
    await callback();
  };
}

export async function loadJSON(filename: string) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => undefined);
}
export async function loadLectsJSON<T>(filename: string) {
  const files = {} as Record<string, T>;
  for (const lect of lects.value) {
    const file = await loadJSON(lect + "/" + filename);
    if (file) files[lect] = file;
  }
  return files;
}
