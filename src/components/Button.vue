<template>
  <button :class="{ highlight: value }" @click="toggle">
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup="props, { emit }">
import { computed, defineProps, defineEmit } from "vue";

const props = defineProps({
  value: Boolean,
  icon: String,
  text: String,
});
const icon = computed(() => props.icon);
const text = computed(() => props.text);

const emit = defineEmit(["update:value"]);
const toggle = () => emit("update:value", !props.value);
</script>
