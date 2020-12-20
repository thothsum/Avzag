<template>
  <div class="col">
    <div class="row">
      <Button v-if="button" :icon="button" @click="act" />
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

<script setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, defineEmit, defineProps } from "vue";
import Button from "./Button.vue";

const props = defineProps({
  button: { type: String, default: "add" },
  icon: { type: String, default: "" },
  header: { type: String, default: "" },
});
const emit = defineEmit();

const act = () => emit("action");
const { caption } = useContext().slots;
</script>
