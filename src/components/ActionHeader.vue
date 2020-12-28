<template>
  <div class="col">
    <div class="row">
      <button v-if="button" class="icon" @click="act">{{ button }}</button>
      <p class="icon">{{ icon }}</p>
      <h2 class="flex">{{ header }}</h2>
      <slot name="header" />
    </div>
    <p v-if="caption" class="text-caption text-faded">
      <slot name="caption" />
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, defineEmit, defineProps } from "vue";

const props = defineProps({
  button: { type: String, default: "add" },
  icon: { type: String, default: "" },
  header: { type: String, default: "" },
});
const emit = defineEmit(["action"]);

const act = () => emit("action");
const { caption } = useContext().slots;
</script>
