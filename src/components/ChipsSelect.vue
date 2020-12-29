<template>
  <div v-if="visible" class="row scroll small">
    <div v-for="(l, i) in labels" :key="l" @click="select(i)">
      <slot :label="l" :highlight="highlights[i]">
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
  modelValue: { type: [Object, String, Number], default: {} },
  items: { type: Object as PropType<(Item | string)[]>, default: [] },
  itemKey: { type: String, default: "name" },
  indexed: { type: Boolean },
});
const emit = defineEmit(["update:modelValue"]);

const labels = computed(() =>
  props.items.map((i) =>
    typeof i === "string" ? i : (i as Item)[props.itemKey]
  )
);
const visible = computed(() => labels.value.length > 1);
const selected = computed(() =>
  props.indexed ? props.items[props.modelValue as number] : props.modelValue
);
const highlights = computed(() => {
  return props.items.map((l) => (l === selected.value ? "highlight" : ""));
});

const select = (index = 0) => {
  emit("update:modelValue", props.indexed ? index : props.items[index]);
};

onMounted(() => select());
</script>
