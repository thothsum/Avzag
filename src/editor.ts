import localforage from "localforage";
import { watch, ref, toRaw, onBeforeUnmount, computed } from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { pushToStore } from "./gh-manager";
import { loadJSON } from "./store";

export const storage = localforage.createInstance({ name: "editor" });

type CacheRecord = { added: number; changed: number; skip?: boolean };
export const dirty = ref({} as Record<string, CacheRecord>);
export const isDirty = computed(() => {
  const r = dirty.value[path.value];
  return r && r.changed > r.added;
});
function addRecord(name: string) {
  if (!dirty.value[name]) {
    const t = Date.now();
    dirty.value[name] = { added: t, changed: t };
  }
  return dirty.value[name];
}
function changeRecord(name: string) {
  const t = Date.now();
  if (dirty.value[name]) {
    if (!dirty.value[name].skip) dirty.value[name].changed = t;
  } else dirty.value[name] = { added: t, changed: t };
  return dirty.value[name];
}
storage.getItem<Record<string, CacheRecord>>("dirty").then((d) => {
  if (d) dirty.value = d;
  watch(
    () => dirty.value,
    () => storage.setItem("dirty", toRaw(dirty.value)),
    { deep: true }
  );
});

export const lect = ref("");
storage.getItem<string>("lect").then((l) => {
  if (l) lect.value = l;
  watch(
    () => lect.value,
    async () => {
      await storage.clear();
      await storage.setItem("lect", toRaw(lect.value));
      if (lect.value) pullLect();
      else resetFile();
    }
  );
});

type Config = { default: unknown; filename: string; global?: boolean };
export const config = ref({
  default: undefined,
  filename: "",
} as Config);
export function configure(value: Config) {
  config.value = value;
  file.value = undefined;
  const fileWatch = watch(file, saveFile, { deep: true });
  onBeforeUnmount(fileWatch);
  storage.getItem(path.value).then((f) => {
    if (f) file.value = f;
    else if (lect.value || config.value.global) pullLect();
    else resetFile();
    addRecord(path.value).skip = true;
  });
}

export const file = ref();
const path = computed(() => {
  let path = config.value.filename;
  const root = toRaw(lect.value) || "Custom";
  if (root) path = root + "/" + path;
  return path;
});

export async function pullLect() {
  const json = await loadJSON(path.value);
  if (json) file.value = json;
  else resetFile();
  delete dirty.value[path.value];
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  downloadFile(JSON.stringify(file.value, null, 2), path.value + ".json");
}
export function pushLect() {
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value + ".json",
    window.prompt("Enter optional comment", path.value) as string,
    path.value
  );
}
export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.value.default));
}
export function saveFile() {
  storage.setItem(path.value, toRaw(file.value));
  changeRecord(path.value);
}
