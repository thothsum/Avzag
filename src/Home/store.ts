import { ref } from "vue";
import { Lect } from "./types";
import { root } from "@/store.ts";

export const catalogue = ref([] as Lect[]);

export function setupStore() {
  fetch(root + "catalogue.json")
    .then((r) => r.json())
    .then((r) => (catalogue.value = r as Lect[]));
}
