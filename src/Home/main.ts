import { ref, reactive, computed, watchEffect } from "vue";
import { SearchState, Lect } from "./types";
import { root } from "@/store";
import { Query, EvaluateQuery } from "@/components/Query/types";

export const catalogue = ref([] as Lect[]);
export const search = reactive({
  selected: new Set<string>(),
  visible: new Set<string>(),
} as SearchState);
export const query = ref<Query>({});

const tags = computed(
  () =>
    catalogue.value?.map(({ name, tags, family }) =>
      [name, tags ?? "", family].flat().join(" ").toLowerCase()
    ) ?? []
);
watchEffect(() =>
  tags.value.forEach((t, i) => {
    const name = catalogue.value?.[i].name;
    if (!name) return;

    if (EvaluateQuery(t, query.value, true)) search.visible.add(name);
    else search.visible.delete(name);
  })
);

export function initialize() {
  if (!catalogue.value.length)
    fetch(root + "catalogue.json")
      .then((r) => r.json())
      .then((r) => (catalogue.value = r as Lect[]));

  search.selected.clear();
  search.visible.clear();
  query.value = {};
}
