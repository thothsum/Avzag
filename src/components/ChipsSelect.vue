<template>
  <div v-if="many" class="row scroll small">
    <button
      v-for="(l, i) in labels"
      :key="l"
      class="round"
      :class="highlights[i]"
      @click="select(i)"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  computed,
  defineEmit,
  defineProps,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";

type Item = { [index: string]: string };

const props = defineProps({
  modelValue: {
    type: Object as PropType<string | number>,
    default: 0,
  },
  items: { type: Object as PropType<(Item | string)[]>, default: [] },
  itemKey: { type: String, default: "name" },
  indexed: { type: Boolean },
});
const emit = defineEmit(["update:modelValue"]);

const selected = ref("");
const labels = computed(() =>
  props.items.map((i) => (i === "string" ? i : (i as Item)[props.itemKey]))
);
const visible = computed(() => labels.value.length > 1);
const highlights = computed(() =>
  labels.value.map((l) => l === selected.value)
);

function select(index: number) {
  selected.value = labels.value[index];
  emit("update:modelValue", props.indexed ? index : selected.value);
}

watch(labels, () => select(0));
</script>
