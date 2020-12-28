<template>
  <div class="row-0">
    <template v-if="prompt">
      <button class="highlight-font-alert icon" @click="confirm">
        delete_forever
      </button>
      <button class="icon" @click="toggle">check</button>
    </template>
    <button v-else class="highlight-font-alert icon" @click="toggle">
      delete
      <p>{{ text }}</p>
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, defineComponent, defineEmit, defineProps } from "vue";

const props = defineProps({
  text: { type: String, default: "" },
});
const emit = defineEmit(["confirm"]);

const prompt = ref(false);
const toggle = () => (prompt.value = !prompt.value);
const confirm = () => {
  toggle();
  emit("confirm");
};
</script>
