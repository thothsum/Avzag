<template>
  <button>
    <p v-if="icon" class="icon">{{ icon }}</p>
    <p v-if="text">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineProps } from "vue";

const props = defineProps({
  icon: { type: String, default: "" },
  text: { type: String, default: "" },
});
</script>
