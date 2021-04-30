import localforage from "localforage";
import { watch, ref, toRaw, onBeforeUnmount, computed, reactive } from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { pushToStore } from "./gh-manager";
import StorageCache from "./storage-cache";
import { loadJSON } from "./store";

export const storage = localforage.createInstance({ name: "editor" });
const cache = reactive(new StorageCache(storage));
export const isDirty = computed(() => {
  const r = cache.records[path.value];
  return r && r.changed > r.added;
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
    cache.addRecord(path.value).skip = true;
  });
}

export const file = ref();
const path = computed(() => {
  let path = config.value.filename + ".json";
  const root = toRaw(lect.value) || "Custom";
  if (root) path = root + "/" + path;
  return path;
});

export async function pullLect() {
  const json = await loadJSON(path.value);
  if (json) file.value = json;
  else resetFile();
  delete cache.records[path.value];
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  downloadFile(JSON.stringify(file.value, null, 2), path.value);
}
export function pushLect() {
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value,
    window.prompt("Enter optional comment", path.value) as string,
    path.value
  );
}
export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.value.default));
}
export function saveFile() {
  storage.setItem(path.value, toRaw(file.value));
  cache.changeRecord(path.value);
}
