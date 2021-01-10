import { onMounted, onUnmounted, Ref, ref, watch } from "vue";

type Options = {
  defaultFile: object;
  storage: string;
  filename: string | (() => string);
  onReset: () => void;
};

export const config: { file: Ref<unknown> } & Options = {
  file: ref<unknown>(),
  defaultFile: {},
  storage: "",
  filename: "",
  onReset: () => undefined,
};

export function setFile(file?: object) {
  if (file) {
    config.file.value = file;
    config.onReset();
  }
}

export function resetFile() {
  config.file.value = JSON.parse(JSON.stringify(config.defaultFile));
}

export function setupEditor<T>(options: Partial<Options>) {
  Object.assign(config, options);

  onMounted(() => {
    try {
      setFile(JSON.parse(localStorage[config.storage]));
    } catch (error) {
      resetFile();
    }
  });

  const saveFile = () =>
    (localStorage[config.storage] = JSON.stringify(config.file.value));
  watch(config.file, () => saveFile(), { deep: true });
  onUnmounted(() => saveFile());

  return config.file as Ref<T>;
}
