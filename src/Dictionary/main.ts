import { loadLectsJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry, Search } from "./types";

export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
});

function searchByMeaning(meaning: string, search: Search = {}) {
  if (meaning) {
    const entries = Object.entries(dictionaries.value).reduce(
      (entries, [lect, dictionary]) => {
        const filtered = dictionary.filter((entry) =>
          entry.meaning.primary.includes(meaning)
        );
        if (filtered.length) entries[lect] = filtered;
        return entries;
      },
      {} as Record<string, Entry[]>
    );
    if (Object.keys(entries).length) search[meaning] = entries;
  }
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
