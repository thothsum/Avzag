<template>
  <div class="row-0">
    <template v-if="prompt">
      <button class="highlight-font-alert icon" @click="confirm">
        delete_forever
      </button>
      <button class="icon" @click="prompt = false">check</button>
    </template>
    <button v-else class="highlight-font-alert icon" @click="prompt = true">
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

function confirm() {
  prompt.value = false;
  emit("confirm");
}
</script>
