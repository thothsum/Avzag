<template>
  <button :class="{ highlight }" @click="toggle">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, computed, defineProps, defineEmit } from "vue";

const props = defineProps({
  modelValue: Boolean,
  icon: { type: String, default: "" },
  text: { type: String, default: "" },
});
const emit = defineEmit(["update:modelValue"]);

const highlight = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const toggle = () => (highlight.value = !highlight.value);
</script>
