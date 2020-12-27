<template>
  <div v-if="visible" class="row scroll small">
    <button class="icon round" @click="update">clear</button>
    <button
      v-for="(c, i) in colors"
      :key="items[i]"
      class="round"
      :class="colors[i]"
      @click="toggle(items[i])"
    >
      {{ items[i] }}
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropType,
  toRefs,
  computed,
  defineEmit,
  defineProps,
  watch,
} from "vue";

type Query = Record<string, boolean>;

const props = defineProps({
  modelValue: { type: Object as PropType<Query>, default: {} },
  items: { type: Array as PropType<string[]>, default: [] },
});
const { modelValue: query, items } = toRefs(props);
const emit = defineEmit(["update:modelValue"]);

const visible = computed(() => items.value.length > 1);
const colors = computed(() =>
  items.value.map((i) =>
    i in query.value
      ? props.modelValue[i]
        ? "highlight-confirm"
        : "highlight-alert"
      : ""
  )
);

const update = (query: Query = {}) => emit("update:modelValue", query);
const toggle = (item: number) => {
  item in query.value
    ? query.value[item]
      ? (query.value[item] = false)
      : delete query.value[item]
    : (query.value[item] = true);
  update(query.value);
};

watch(items, (items) => {
  update(items.length === 1 ? { [items[0]]: true } : {});
});
</script>
