<template>
  <textarea v-if="reverse" v-model="result" readonly></textarea>
  <textarea v-else v-model="source"></textarea>
</template>

<script setup lang="ts">
import {
  computed,
  defineEmit,
  defineProps,
  PropType,
  watch,
  watchEffect,
} from "vue";
import { Pairs, Mapping } from "./types";
import convert from "./convert";

const props = defineProps({
  modelValue: { type: String, default: "" },
  converted: { type: String, default: "" },
  mapping: { type: Object as PropType<Mapping>, default: {} },
  reverse: Boolean,
});
const emit = defineEmit(["update:modelValue", "update:converted"]);

const source = computed({
  get: () => props.modelValue,
  set: (d) => emit("update:modelValue", d),
});
const result = computed({
  get: () => props.converted,
  set: (r) => emit("update:converted", r),
});

function reversePairs(pairs: Pairs): Pairs {
  return pairs.map(([l, r]) => [r, l]);
}
const pairs = computed(() =>
  props.reverse ? reversePairs(props.mapping.pairs) : props.mapping.pairs
);

watchEffect(() => (result.value = convert(source.value, pairs.value)));
watch(pairs, (pairs) => {
  if (!props.reverse) source.value = convert(result.value, reversePairs(pairs));
});
</script>

<style lang="scss" scoped>
textarea {
  height: 256px;
}
</style>
