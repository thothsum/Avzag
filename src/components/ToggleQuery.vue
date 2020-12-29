<template>
  <div v-if="visible" class="row scroll small">
    <button class="icon round" @click="query = {}">clear</button>
    <button
      v-for="l in labels"
      :key="l"
      class="round"
      :class="highlights[l]"
      @click="toggle(l)"
    >
      {{ l }}
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropType, computed, defineEmit, defineProps, watch } from "vue";

type Query = Record<string, boolean>;

const props = defineProps({
  modelValue: { type: Object as PropType<Query>, default: {} },
  labels: { type: Array as PropType<string[]>, default: [] },
});
const emit = defineEmit(["update:modelValue"]);

const query = computed({
  get: () => props.modelValue,
  set: (query) => emit("update:modelValue", query),
});
const toggle = (label: string) => {
  label in query.value
    ? query.value[label]
      ? (query.value[label] = false)
      : delete query.value[label]
    : (query.value[label] = true);
};

const visible = computed(() => props.labels.length > 1);
const highlights = computed(() =>
  Object.fromEntries(
    Object.entries(query.value).map(([label, flag]) => [
      label,
      flag ? "highlight-confirm" : "highlight-alert",
    ])
  )
);

const defaultQuery = computed(() =>
  props.labels.length === 1 ? { [props.labels[0]]: true } : {}
);
watch(
  () => props.labels,
  () => (query.value = defaultQuery.value)
);
</script>
