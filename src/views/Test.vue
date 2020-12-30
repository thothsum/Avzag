<template>
  <button @click="toggle">toggle {{ obj.name }}</button>
  <Editor v-model="obj.notes" class="small" />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Editor from "@/components/Notes/Editor";
import { ref, reactive } from "vue";

interface Obj {
  name: string;
  notes?: string[];
}

const obj1 = reactive<Obj>({ name: "one", notes: ["hello there"] });
const obj2 = reactive<Obj>({ name: "two" });
const obj = ref(obj1);

const toggle = () => (obj.value = obj.value === obj1 ? obj2 : obj1);
</script>
