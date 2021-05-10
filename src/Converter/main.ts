import { computed, reactive, shallowRef, watch } from "vue";
import { loadLectsJSON, lects } from "src/store";
import { Mapping, Converter, Pairs } from "./types";
import convert from "./convert";

export const converters = shallowRef<Record<string, Converter>>({});
watch(lects, async () => {
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
  initial: (mappings.initial?.pairs ?? []) as Pairs,
  final: (mappings.final?.pairs.map(([l, r]) => [r, l]) ?? []) as Pairs,
}));

watch(
  () => pairs.value.initial,
  (pairs, oldPairs) => {
    texts.initial = convert(
      convert(texts.initial, oldPairs),
      pairs.map(([l, r]) => [r, l])
    );
  }
);

export const texts = reactive({
  initial: "",
  final: computed(() =>
    convert(convert(texts.initial, pairs.value.initial), pairs.value.final)
  ),
}) as {
  initial: string;
  final: string;
};
