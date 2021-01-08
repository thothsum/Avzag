<template>
  <textarea ref="textarea" v-model="display" :readonly="reverse"></textarea>
</template>

<script setup lang="ts">
import { computed, defineEmit, defineProps, PropType, ref, watch } from "vue";
import { Pairs, Mapping } from "./types";
import convert from "./convert";

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
