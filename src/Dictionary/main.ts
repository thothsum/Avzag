import { loadLectsJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry, Search } from "./types";

export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
});

function searchByMeaning(meaning: string, search: Search = {}) {
  if (meaning)
    Object.entries(dictionaries.value).forEach(([lect, dictionary]) => {
      dictionary
        .filter((entry) => entry.meaning.primary.includes(meaning))
        .forEach((entry) => {
          const meaning = entry.meaning.primary;
          if (!search[meaning]) search[meaning] = {};
          if (!search[meaning][lect]) search[meaning][lect] = [];
          search[meaning][lect].push(entry);
        });
    });
  return search;
}

export function search(lect: string, query: string): Search {
  return !query || !lect
    ? searchByMeaning(query)
    : dictionaries.value[lect]
        .filter(({ forms }) =>
          forms.some(({ text }) => text.plain.includes(query))
        )
        .map(({ meaning }) => meaning.primary)
        .reduce(
          (search, meaning) => searchByMeaning(meaning, search),
          {} as Search
        );
}
