<template>
  <div v-if="visible" class="row scroll small">
    <button class="icon round" @click="reset">clear</button>
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
  ref,
  watch,
  watchEffect,
} from "vue";

type Query = Record<string, boolean>;

const props = defineProps({
  modelValue: { type: Object as PropType<Query>, default: {} },
  items: { type: Array as PropType<string[]>, default: [] },
});
const emit = defineEmit(["update:modelValue"]);

const visible = computed(() => props.items.length > 1);
const colors = computed(() =>
  props.items.map((i) =>
    i in props.modelValue
      ? props.modelValue[i]
        ? "highlight-confirm"
        : "highlight-alert"
      : ""
  )
);

const reset = () => emit("update:modelValue", {});
const toggle = (item: number, flag: boolean | undefined) => {
  item in props.modelValue
    ? props.modelValue[item]
      ? (props.modelValue[item] = false)
      : delete props.modelValue[item]
    : (props.modelValue[item] = true);
  emit("update:modelValue", props.modelValue);
};

watch(
  () => props.items,
  (items) => {
    reset();
    if (items.length === 1) {
      props.modelValue[items[0]] = true;
      emit("update:modelValue", props.modelValue);
    }
  }
);
</script>
