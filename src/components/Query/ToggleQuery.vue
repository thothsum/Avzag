<template>
  <div v-if="visible" class="row scroll small">
    <control class="round" icon="clear" @click="query = {}" />
    <control
      v-for="l in labels"
      :key="l"
      :text="l"
      class="round"
      :class="highlights[l]"
      @click="toggle(l)"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropType, computed, defineEmit, defineProps, watch } from "vue";
import { Query } from ".";

const props = defineProps({
  modelValue: { type: Object as PropType<Query>, default: {} },
  labels: { type: Array as PropType<string[]>, default: [] },
});
const emit = defineEmit(["update:modelValue"]);

const query = computed({
  get: () => props.modelValue,
  set: (q) => emit("update:modelValue", q),
});
const toggle = (label: string) => {
  if (label in query.value)
    if (query.value[label]) query.value[label] = false;
    else delete query.value[label];
  else query.value[label] = true;
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

const defaultQuery = computed(() => {
  if (props.labels.length === 1) return { [props.labels[0]]: true };
  return {};
});
watch(
  () => props.labels,
  () => (query.value = defaultQuery.value),
  { immediate: true }
);
</script>
