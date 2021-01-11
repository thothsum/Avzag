import { computed, onUnmounted, watch, WritableComputedRef, ref } from "vue";

type Options<T> = {
  defaultFile: object;
  storage: string;
  filename: string | (() => string);
  onReset: (file: T) => void;
};

export const config: Options<unknown> = {
  defaultFile: {},
  storage: "",
  filename: "",
  onReset: () => undefined,
};

const _file = ref();
export const file = computed({
  get: () => _file.value,
  set: (f) => {
    _file.value = f;
    config.onReset(f);
  },
});

export function resetFile() {
  file.value = JSON.parse(JSON.stringify(config.defaultFile));
}

export function saveFile() {
  localStorage[config.storage] = JSON.stringify(file.value);
}

export function setupEditor<T>(options: Partial<Options<T>>) {
  Object.assign(config, options);
  try {
    file.value = JSON.parse(localStorage[config.storage]);
  } catch {
    resetFile();
  }
  watch(() => file.value, saveFile, { deep: true });

  return file as WritableComputedRef<T>;
}
