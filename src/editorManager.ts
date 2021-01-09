import { onMounted, onBeforeUnmount, ref, watch } from "vue";

export const editorConfig = {
  file: ref({} as object),
  defaultFile: {} as object,
  filename: "" as string | (() => string),
  onReset: (() => undefined) as () => void,
  reset() {
    this.setFile(JSON.parse(JSON.stringify(this.defaultFile)));
  },
  setFile(file: object) {
    if (file) {
      this.file.value = file;
      this.onReset();
    }
  },
};

export function setupEditor(
  defaultFile: object,
  filename: string | (() => string),
  storage: string,
  onReset: () => void
) {
  editorConfig.file.value = editorConfig.defaultFile = defaultFile;
  editorConfig.filename = filename;
  editorConfig.onReset = onReset;

  onMounted(() => {
    try {
      editorConfig.setFile(JSON.parse(localStorage[storage]));
    } catch (error) {
      editorConfig.reset();
    }
  });
  const save = () =>
    (localStorage[storage] = JSON.stringify(editorConfig.file.value));
  watch(editorConfig.file, () => save(), { deep: true });
  onBeforeUnmount(save);

  return editorConfig.file;
}
