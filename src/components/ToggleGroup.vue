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
const visible = computed(() => labels.value.length > 1);
const index = computed(() => {
  const value = props.modelValue;
  if (props.type === "item") return props.items.indexOf(value as Item);
  if (props.type === "label") {
    const key = props.labelKey;
    return props.items.findIndex((i) => (i as Item)[key] === value);
  }
  return value as number;
});
const highlights = computed(() => {
  return props.items.map((l, i) => (i === index.value ? "highlight" : ""));
});

function select(index = 0) {
  let value: object | string | number = props.items[index];
  if (props.type === "label") value = (value as Item)[props.labelKey];
  else if (props.type === "index") value = index;
  emit("update:modelValue", value);
}

onMounted(() => select());
</script>
