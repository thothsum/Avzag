import { loadLectsJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry, Search } from "./types";

export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
});

function queryDictionaries(query: string, strict = false, search: Search = {}) {
  if (query)
    Object.entries(dictionaries.value).forEach(([lect, dictionary]) => {
      dictionary
        .filter((entry) =>
          strict
            ? entry.translation === query
            : entry.translation.includes(query)
        )
        .forEach((entry) => {
          const translation = entry.translation;
          if (!search[translation]) search[translation] = {};
          if (!search[translation][lect]) search[translation][lect] = [];
          search[translation][lect].push(entry);
        });
    });
  return search;
}

export function search(lect: string, query: string): Search {
  return !query || !lect
    ? queryDictionaries(query)
    : dictionaries.value[lect]
        .filter(({ forms }) =>
          forms.some(({ text }) => text.plain.includes(query))
        )
        .map(({ translation }) => translation)
        .reduce(
          (search, translation) => queryDictionaries(translation, true, search),
          {} as Search
        );
}