import { ref } from "vue";

export let key: symbol;

export const root = process.env.BASE_URL + "lects/";
export const lects = ref([] as { name: string; root: string }[]);

export function setupStore(lectNames: string[]) {
  lects.value = lectNames.map((name) => ({
    name,
    root: root + name + "/",
  }));
  key = Symbol("lects");
}

export async function loadJSON(filename: string) {
  return await fetch(root + filename + ".json")
    .then((r) => r.json())
    .catch(() => undefined);
}
export async function loadLectsJSON<T>(filename: string) {
  const files = {} as Record<string, T | undefined>;
  for (const { name } of lects.value) {
    const file = await loadJSON(name + "/" + filename);
    files[name] = file;
  }
  return files;
}
