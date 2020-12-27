<template>
  <button :class="{ highlight: modelValue }" @click="toggle">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineProps, defineEmit } from "vue";

const props = defineProps({
  modelValue: Boolean,
  icon: { type: String, default: "" },
  text: { type: String, default: "" },
});
const emit = defineEmit(["update:modelValue"]);

const toggle = () => emit("update:modelValue", !props.modelValue);
</script>
