import { loadLectsJSON, loadJSON, lects } from "@/store";
import { shallowRef, watch } from "vue";
import { Entry, Search, DictionaryMeta } from "./types";

export const dictionaryMeta = shallowRef<DictionaryMeta>();
export const dictionaries = shallowRef<Record<string, Entry[]>>({});
watch(lects, async () => {
  dictionaries.value = {};
  dictionaryMeta.value = undefined;
  dictionaries.value = await loadLectsJSON<Entry[]>("dictionary");
  dictionaryMeta.value = await loadJSON("dictionary");
});

function queryDictionaries(query: string[], queryMode: string) {
  return query.reduce((search, query) => {
    Object.entries(dictionaries.value).forEach(([lect, dictionary]) => {
      dictionary
        .filter((entry) =>
          (queryMode === "Tags"
            ? entry.tags ?? ""
            : entry.translation
          )?.includes(query)
        )
        .forEach((entry) => {
          const translation = entry.translation;
          if (!search[translation]) search[translation] = {};
          if (!search[translation][lect]) search[translation][lect] = [];
          search[translation][lect].push(entry);
        });
    });
    return search;
  }, {} as Search);
}

function findTranslations(lect: string, query: string[]) {
  return dictionaries.value[lect]
    .filter(({ forms }) =>
      forms.some(({ text }) => query.some((q) => text.plain.includes(q)))
    )
    .map(({ translation }) => translation);
}

export function search(
  lect: string,
  query: string[],
  queryMode = "Translation"
): Search {
  return !lect
    ? queryDictionaries(query, queryMode)
    : queryDictionaries(findTranslations(lect, query), "Translation");
}
