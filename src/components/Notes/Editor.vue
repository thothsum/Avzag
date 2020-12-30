<template>
  <div class="col">
    <div class="row">
      <button @click="add">+</button>
      <h2>Notes</h2>
    </div>
    <div v-for="(n, i) in notes" :key="i" class="row">
      <input v-model="notes[i]" type="text" />
      <button class="icon" @click="remove(i)">clear</button>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType } from "vue";

const props = defineProps({
  modelValue: Array as PropType<string[]>,
  default: [],
});
const emit = defineEmit(["update:modelValue"]);

const notes = computed({
  get: () => props.modelValue,
  set: (n) => emit("update:modelValue", n),
});

const add = () => (notes.value ? notes.value.push("") : (notes.value = [""]));
const remove = (i: number) => notes.value?.splice(i, 1);
</script>
