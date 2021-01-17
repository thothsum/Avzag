import convert from "./convert";
import { pairs } from "./main";

const link = document.createElement("a");
function download(filename: string, text: string) {
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  link.download = filename;
  link.click();
}

const reader = new FileReader();
function read(file?: File) {
  if (!file) return;
  reader.onload = ({ target }) => {
    if (pairs.initial && typeof target?.result === "string")
      download(file.name, convert(target.result, pairs.initial));
  };
  reader.readAsText(file);
}

const input = document.createElement("input");
input.type = "file";
input.accept = ".txt";
input.onchange = () => read(input.files?.[0]);
export default function upload() {
  input.click();
}
