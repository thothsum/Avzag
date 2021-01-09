<template>
  <select v-model="index">
    <option v-for="(l, i) in labels" :key="i" :value="i">{{ l }}</option>
  </select>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  computed,
  defineProps,
  PropType,
  defineEmit,
  onMounted,
  toRaw,
} from "vue";

type Item = { [index: string]: string };
type Value = number | string | Item;

const props = defineProps({
  modelValue: {
    type: [Number, String, Object as () => Item],
    default: "",
  },
  items: { type: Object as PropType<(string | Item)[]>, default: [] },
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
const index = computed({
  get: () => {
    const value = toRaw(props.modelValue);
    if (props.type === "item")
      return props.items.map((i) => toRaw(i)).indexOf(value as Item);
    if (props.type === "label") {
      const key = props.labelKey;
      return props.items.findIndex((i) => (i as Item)[key] === value);
    }
    return value as number;
  },
  set: (index) => {
    let value: Value = props.items[index];
    if (props.type === "label") value = (value as Item)[props.labelKey];
    else if (props.type === "index") value = index;
    emit("update:modelValue", value);
  },
});

onMounted(() => {
  if (index.value < 0) index.value = 0;
});
</script>
