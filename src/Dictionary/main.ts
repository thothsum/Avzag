import { loadLectsJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry } from "./types";

export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
});

function searchByMeaning(query?: string) {
  if (!query) return {};
  return Object.entries(dictionaries.value)
    .filter(([, d]) => d)
    .reduce((entries, [lect, dictionary]) => {
      entries[lect] = dictionary.filter(({ meaning }) =>
        meaning.primary.includes(query)
      );
      return entries;
    }, {} as Record<string, Entry[]>);
}

export function search(lect: string, query: string) {
  return searchByMeaning(
    lect
      ? dictionaries.value[lect].find(({ forms }) =>
          forms
            .map(({ text }) => text.plain)
            .join(" ")
            .includes(query)
        )?.meaning.primary
      : query
  );
}
