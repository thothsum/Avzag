import { ref } from "vue";

export const config = {
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
