import { watch, ref, Ref } from "vue";

type Options = {
  defaultFile: object;
  storage: string;
  filename: string | (() => string);
};

export const config: Options = {
  defaultFile: {},
  storage: "",
  filename: "",
};

const file = ref();

export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.defaultFile));
}

export function saveFile() {
  localStorage[config.storage] = JSON.stringify(file.value);
}

export function setupEditor<T>(options: Partial<Options>) {
  Object.assign(config, options);
  try {
    file.value = JSON.parse(localStorage[config.storage]);
  } catch {
    resetFile();
  }
  watch(file, saveFile, { deep: true });

  return file as Ref<T>;
}
