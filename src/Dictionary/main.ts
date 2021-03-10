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

function checkEntry(
  entry: Entry,
  query: string,
  queryMode = "translation",
  strict = false
) {
  return queryMode === "tag"
    ? !!entry.tags?.includes(query)
    : strict
    ? entry.translation === query
    : entry.translation.includes(query);
}

function queryDictionaries(
  query: string,
  queryMode = "translation",
  strict = false,
  search: Search = {}
) {
  if (query)
    Object.entries(dictionaries.value).forEach(([lect, dictionary]) => {
      dictionary
        .filter((entry) => checkEntry(entry, query, queryMode, strict))
        .forEach((entry) => {
          const translation = entry.translation;
          if (!search[translation]) search[translation] = {};
          if (!search[translation][lect]) search[translation][lect] = [];
          search[translation][lect].push(entry);
        });
    });
  return search;
}

export function search(
  lect: string,
  query: string[],
  queryMode = "translation"
): Search {
  return !lect
    ? query.reduce(
        (search, translation) =>
          queryDictionaries(translation, queryMode, true, search),
        {} as Search
      )
    : dictionaries.value[lect]
        .filter(({ forms }) =>
          forms.some(({ text }) => query.some((q) => text.plain.includes(q)))
        )
        .map(({ translation }) => translation)
        .reduce(
          (search, translation) =>
            queryDictionaries(translation, "translation", true, search),
          {} as Search
        );
}
