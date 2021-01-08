<template>
  <textarea ref="textarea" v-model="display" :readonly="reverse"></textarea>
</template>

<script setup lang="ts">
import { computed, defineEmit, defineProps, PropType, ref, watch } from "vue";
import { Pairs, Mapping } from "./types";

const props = defineProps({
  modelValue: { type: String, default: "" },
  source: { type: String, default: "" },
  mapping: { type: Object as PropType<Mapping>, default: {} },
  reverse: Boolean,
});
const emit = defineEmit(["update:modelValue"]);

const display = ref("");
const result = computed({
  get: () => props.modelValue,
  set: (r) => emit("update:modelValue", r),
});

const pairs = computed(
  () =>
    (props.reverse
      ? props.mapping.pairs.map(([l, r]) => [r, l])
      : props.mapping.pairs) as Pairs
);
const reversePairs = computed(
  () => pairs.value.map(([l, r]) => [r, l]) as Pairs
);

function capitalize(text: string) {
  let base = "";
  let i = 0;
  if (text.charAt(0) === " ") {
    base = " ";
    i = 1;
  }
  return base + text.charAt(i).toUpperCase() + text.slice(i + 1);
}
function convert(source: string, pairs: Pairs) {
  if (!pairs?.length) return source;

  source = " " + source.replace(/\n/g, "\n ").trim();
  let result = "";

  for (let i = 0; i < source.length; ) {
    let found = false;
    for (const [from, to] of pairs) {
      const l = from.length;
      const sub = source.substring(i, i + l);
      const pairs = [
        [from, to],
        [capitalize(from), capitalize(to)],
        [from.toUpperCase(), to.toUpperCase()],
      ];

      for (const [f, t] of pairs) {
        if (sub === f) {
          found = true;
          result += t;
          i += l;
          break;
        }
      }

      if (found) break;
    }

    if (!found) {
      result += source[i];
      i++;
    }
  }

  return result.replace(/\n /g, "\n").trim();
}

watch(
  () => props.source,
  (source) =>
    (display.value = props.reverse ? convert(source, pairs.value) : source),
  { immediate: true }
);
watch(
  display,
  (display) =>
    (result.value = props.reverse ? display : convert(display, pairs.value)),
  { immediate: true }
);
watch(
  pairs,
  (pairs) =>
    (display.value = props.reverse
      ? convert(props.source, pairs)
      : convert(result.value, reversePairs.value)),
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
textarea {
  height: 256px;
}
</style>
