<template>
  <div v-if="visible" class="row scroll">
    <div v-for="(l, i) in labels" :key="l" @click="select(i)">
      <slot :item="items[i]" :highlight="highlights[i]">
        <button class="round" :class="highlights[i]">{{ l }}</button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType, onMounted } from "vue";

type Item = { [index: string]: string };

const props = defineProps({
  modelValue: {
    type: [() => Object as PropType<Item>, String, Number],
    default: {},
  },
  items: { type: Object as PropType<(Item | string)[]>, default: [] },
  labelKey: { type: [Number, String], default: "name" },
  type: {
    type: String as PropType<"item" | "label" | "index">,
    default: "item",
  },
});
const emit = defineEmit(["update:modelValue"]);

const labels = computed(() =>
  props.items.map((i) =>
    typeof i === "string" ? i : (i as Item)[props.labelKey]
  )
);
const visible = computed(() => labels.value.length > 1);
const selected = computed(() => {
  const value = props.modelValue;
  if (props.type === "item") return value;
  else if (props.type === "label") {
    const key = props.labelKey;
    return props.items.find((i) => (i as Item)[key] === value);
  }
  return props.items[value as number];
});
const highlights = computed(() => {
  return props.items.map((l) => (l === selected.value ? "highlight" : ""));
});

const select = (index = 0) => {
  let value: object | string | number = props.items[index];
  if (props.type === "label") value = (value as Item)[props.labelKey];
  else if (props.type === "index") value = index;
  emit("update:modelValue", value);
};

onMounted(() => select());
</script>
