import { onUnmounted, Ref, ref, watch } from "vue";

type Options<T> = {
  defaultFile: object;
  storage: string;
  filename: string | (() => string);
  onReset: (file: T) => void;
};

export const config: { file: Ref<unknown> } & Options<unknown> = {
  file: ref<unknown>(),
  defaultFile: {},
  storage: "",
  filename: "",
  onReset: () => undefined,
};

export function setFile(file: object) {
  config.file.value = file;
  config.onReset(config.file.value);
}

export function resetFile() {
  config.file.value = JSON.parse(JSON.stringify(config.defaultFile));
  config.onReset(config.file.value);
}

export function saveFile() {
  localStorage[config.storage] = JSON.stringify(config.file.value);
}

export function setupEditor<T>(options: Partial<Options<T>>) {
  Object.assign(config, options);

  try {
    setFile(JSON.parse(localStorage[config.storage]));
  } catch {
    resetFile();
  }

  watch(config.file, saveFile, { deep: true });
  onUnmounted(() => saveFile());

  return config.file as Ref<T>;
}
