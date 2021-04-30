import localforage from "localforage";
import { watch, ref, toRaw } from "vue";
import { downloadFile, uploadFile } from "./file-manager";
import { loadJSON } from "./store";

export const storage = localforage.createInstance({ name: "editor" });

export const lect = ref("");
storage.getItem<string>("lect").then((l) => {
  if (l) lect.value = l;
  watch(
    () => lect.value,
    async () => {
      await storage.clear();
      await storage.setItem("lect", toRaw(lect.value));
      if (lect.value) pullLect();
    }
  );
});

type Config = {
  default: unknown;
  filename: string;
  global?: boolean;
};
export const config = ref({ default: undefined, filename: "" } as Config);
watch(
  () => config.value,
  () => {
    storage.getItem(config.value.filename).then((f) => {
      if (f) file.value = f;
      else resetFile();
    });
  },
  { deep: true }
);

export const file = ref();
watch(file, saveFile, { deep: true });

export async function pullLect(ask?: boolean) {
  if (ask && !window.confirm("Local edits will be lost!")) return;
  let filename = config.value.filename;
  if (!config.value.global) filename = lect.value + "/" + filename;
  const json = await loadJSON(filename);
  if (json) file.value = json;
}
export function uploadJSON() {
  uploadFile((c) => (file.value = JSON.parse(c)));
}
export function downloadJSON() {
  const filename =
    (toRaw(lect.value) ?? "Custom") + "-" + config.value.filename + ".json";
  downloadFile(JSON.stringify(file.value, null, 2), filename);
}
// function pushLect() {
//   const branch = [
//     menu.value,
//     lect.value,
//     new Date().toISOString().slice(0, -1).replaceAll(/\D/g, "."),
//   ].join("-");
//   pushToStore(
//     JSON.stringify(file.value, null, 2) + "\n",
//     lect.value + "/dictionary.json",
//     window.prompt("Enter optional comment") ?? "",
//     branch
//   );
// }
export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.value.default));
}
export function saveFile() {
  storage.setItem(config.value.filename, toRaw(file.value));
}
