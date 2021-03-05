import { loadLectsJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry } from "./types";

export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
});
