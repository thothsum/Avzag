import localforage from "localforage";
import {
  watch,
  ref,
  toRaw,
  onBeforeUnmount,
  computed,
  WatchStopHandle,
} from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { pushToStore } from "./gh-manager";
import StorageCache from "./storage-cache";
import { loadJSON, cache as storeCache } from "./store";

export const storage = localforage.createInstance({ name: "editor" });
const cache = new StorageCache(storage);
export const isDirty = computed(() => {
  const r = cache.records.value[path.value];
  return r && r.changed > r.added;
});
export const isOutdated = computed(() => {
  const added = cache.records.value[path.value]?.added;
  return added && storeCache.getRecordChange(path.value) > added;
});

export const lect = ref<string>();
async function loadLect() {
  const l = await storage.getItem<string>("lect");
  lect.value = l ?? "";
  watch(lect, async () => {
    await storage.clear();
    await storage.setItem("lect", toRaw(lect.value));
    cache.records.value = {};
    if (lect.value) pullLect();
    else resetFile();
  });
}

export const file = ref();
const path = computed(() => {
  let path = config.value.filename + ".json";
  const root = toRaw(lect.value) || "Custom";
  if (root) path = root + "/" + path;
  return path;
});
let fileWatch: WatchStopHandle;
async function bypassWatch(
  action: () => Promise<void> | void,
  dropFile = true
) {
  fileWatch?.();
  await action();
  if (dropFile) {
    delete cache.records.value[path.value];
    storage.removeItem(path.value);
  }
  if (!fileWatch) fileWatch = watch(file, saveFile, { deep: true });
}

async function loadFile() {
  const f = await storage.getItem(path.value);
  if (f) file.value = f;
  else if (lect.value || config.value.global) pullLect();
  else resetFile();
}
export function resetFile() {
  bypassWatch(
    () => (file.value = JSON.parse(JSON.stringify(config.value.default)))
  );
}
export function saveFile() {
  storage.setItem(path.value, toRaw(file.value));
  cache.changeRecord(path.value);
}

type Config = { default: unknown; filename: string; global?: boolean };
export const config = ref({
  default: undefined,
  filename: "",
} as Config);
export async function configure(value: Config) {
  config.value = value;
  file.value = undefined;
  onBeforeUnmount(() => fileWatch?.());
  if (lect.value === undefined) await loadLect();
  bypassWatch(loadFile, false);
}

export function pushLect() {
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value,
    window.prompt("Enter optional comment:", path.value) as string,
    path.value
  );
}
export async function pullLect() {
  bypassWatch(async () => {
    const f = await loadJSON(path.value, undefined);
    if (f) file.value = f;
    else resetFile();
  });
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  downloadFile(JSON.stringify(file.value, null, 2), path.value);
}
