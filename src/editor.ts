import localforage from "localforage";
import { watch, ref, toRaw, onBeforeUnmount, computed } from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { pushToStore } from "./gh-manager";
import { loadJSON } from "./store";

export const storage = localforage.createInstance({ name: "editor" });

export const dirty = ref({} as Record<string, boolean>);
export const isDirty = computed(() => !!dirty.value[config.value.filename]);
storage.getItem<Record<string, boolean>>("dirty").then((d) => {
  if (d) dirty.value = d;
  watch(
    () => dirty.value,
    () => storage.setItem("dirty", toRaw(dirty.value)),
    { deep: true }
  );
});
let setDirty = false;

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
  storage.getItem(config.value.filename).then((f) => {
    setDirty = false;
    if (f) file.value = f;
    else if (lect.value || config.value.global) pullLect();
    else resetFile();
  });
}

export const file = ref();
const path = computed(
  () => (config.value.global ? "" : lect.value + "/") + config.value.filename
);

export async function pullLect() {
  setDirty = false;
  const json = await loadJSON(path.value);
  if (json) file.value = json;
  else resetFile();
  dirty.value[config.value.filename] = false;
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  const filename =
    (toRaw(lect.value) ?? "Custom") + "-" + config.value.filename + ".json";
  downloadFile(JSON.stringify(file.value, null, 2), filename);
}
export function pushLect() {
  let branch = config.value.filename;
  if (!config.value.global) branch = lect.value + "-" + branch;
  pushToStore(
    JSON.stringify(file.value, null, 2),
    path.value + ".json",
    window.prompt("Enter optional comment", branch) as string,
    branch
  );
}
export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.value.default));
}
export function saveFile() {
  storage.setItem(config.value.filename, toRaw(file.value));
  if (!setDirty) setDirty = true;
  else if (!dirty.value[config.value.filename])
    dirty.value[config.value.filename] = true;
}
