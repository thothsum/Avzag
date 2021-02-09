import { ref, shallowRef, reactive, computed, watch } from "vue";
import { SearchState, Lect } from "./types";
import { loadJSON } from "@/store";
import { Query, EvaluateQuery } from "@/components/Query/types";

export const catalogue = shallowRef<Lect[]>([]);
export const search = reactive({
  selected: new Set<string>(),
  visible: new Set<string>(),
} as SearchState);
export const query = ref<Query>({});

const tags = computed(() =>
  catalogue.value.map(({ name, tags, family }) =>
    [name, tags ?? "", family].flat().join(" ").toLowerCase()
  )
);
watch(tags, (tags) =>
  tags.forEach((t, i) => {
    const name = catalogue.value[i].name;
    if (!name) return;

    if (EvaluateQuery(t, query.value, true)) search.visible.add(name);
    else search.visible.delete(name);
  })
);

export async function reset() {
  catalogue.value.length = 0;
  if (navigator.onLine)
    await caches
      .keys()
      .then((ks) => ks.find((k) => k.includes("avzag-precache")))
      .then((k) => caches.delete(k ?? ""));

  catalogue.value = await loadJSON("catalogue", []);
  search.selected.clear();
  search.visible.clear();
  query.value = {};
}
