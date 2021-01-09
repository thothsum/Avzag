import { onMounted, onUpdated, onBeforeUnmount, ref } from "vue";

export const editorConfig = {
  file: ref({} as object),
  defaultFile: {} as object,
  filename: "",
  onReset: (() => undefined) as () => void,
  reset() {
    this.setFile(Object.create(this.defaultFile));
  },
  setFile(file: object) {
    if (file) {
      this.file.value = file;
      this.onReset();
    }
  },
};

export function setupEditor<T>(
  defaultFile: object,
  filename: string,
  localStorageName: string,
  onReset: () => void
) {
  editorConfig.file.value = editorConfig.defaultFile = defaultFile;
  editorConfig.filename = filename;
  editorConfig.onReset = onReset;

  onMounted(() => {
    try {
      editorConfig.setFile(JSON.parse(localStorage[localStorageName]));
    } catch (error) {
      console.log(error);
      editorConfig.reset();
    }
    console.log("loading file");
  });
  onUpdated(() => {
    localStorage[localStorageName] = JSON.stringify(editorConfig.file.value);
    console.log("saving file");
  });
  onBeforeUnmount(
    () =>
      (localStorage[localStorageName] = JSON.stringify(editorConfig.file.value))
  );

  return editorConfig.file;
}
