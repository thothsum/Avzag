import { computed, reactive, shallowRef, watch } from "vue";
import { loadLectsJSON, lects } from "@/store";
import { Mapping, Converter, Pairs } from "./types";
import convert from "./convert";

export const converters = shallowRef<Record<string, Converter>>({});
watch(lects, async () => {
  console.log("start fetching converters");
  converters.value = {};
  converters.value = await loadLectsJSON<Converter>("converter");
});

export const converter = shallowRef<Converter>();
watch(converters, (converters) => {
  if (converters) converter.value = Object.values(converters)[0];
});

export const mappings = reactive<{ initial?: Mapping; final?: Mapping }>({});
watch(converter, (converter) => {
  if (!converter) return;
  mappings.initial = converter.mappings[0];
  mappings.final = converter.mappings[1];
  texts.initial = "";
});
export const pairs = computed(() => ({
  initial: mappings.initial?.pairs as undefined | Pairs,
  final: mappings.final?.pairs.map(([l, r]) => [r, l]) as undefined | Pairs,
}));

export const texts = reactive({
  initial: "",
  intermediate: computed(() =>
    pairs.value.initial
      ? convert(texts.initial, pairs.value.initial)
      : texts.initial
  ),
  final: computed(() =>
    pairs.value.final
      ? convert(texts.intermediate, pairs.value.final)
      : texts.intermediate
  ),
}) as {
  initial: string;
  intermediate: string;
  final: string;
};

watch(
  () => pairs.value.initial,
  (pairs) =>
    (texts.initial = pairs
      ? convert(
          texts.intermediate,
          pairs.map(([l, r]) => [r, l])
        )
      : texts.intermediate)
);
