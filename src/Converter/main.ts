import { reactive, ref, watch, watchEffect } from "vue";
import { loadLectsJSON, key as sKey } from "@/store";
import { Mapping, Converter, Pairs } from "./types";
import convert from "./convert";

export const converters = ref<Record<string, Converter | undefined>>({});
export const converter = ref<Converter>();
async function resetCoverters() {
  converters.value = await loadLectsJSON<Converter>("converter");
  converter.value = Object.values(converters.value)[0];
}

export const mappings = reactive<{ initial?: Mapping; final?: Mapping }>({});
export const pairs = reactive<{ initial?: Pairs; final?: Pairs }>({});
function resetMappings() {
  watchEffect(() => {
    if (!converter.value) return;
    mappings.initial = converter.value.mappings[0];
    mappings.final = converter.value.mappings[1];
  });
  watchEffect(() => (pairs.initial = mappings.initial?.pairs));
  watchEffect(
    () => (pairs.final = mappings.final?.pairs.map(([l, r]) => [r, l]))
  );
}

export const texts = reactive({
  initial: "",
  intermediate: "",
  final: "",
});
function resetTexts() {
  texts.initial = "";
  watch(
    () => pairs.initial,
    (pairs) => {
      if (pairs)
        texts.initial = convert(
          texts.intermediate,
          pairs.map(([l, r]) => [r, l])
        );
    }
  );
  watch(
    () => texts.initial,
    (text) => {
      if (pairs.initial) texts.intermediate = convert(text, pairs.initial);
    }
  );
  watchEffect(() => {
    if (pairs.final) texts.final = convert(texts.intermediate, pairs.final);
  });
}

let key: symbol;
export async function initialize() {
  if (key === sKey) return;
  key = sKey;

  await resetCoverters();
  resetMappings();
  resetTexts();
}
