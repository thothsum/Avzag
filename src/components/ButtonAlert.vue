<template>
  <div class="row-0">
    <template v-if="prompt">
      <control
        class="highlight-font-alert"
        icon="delete_forever"
        @click="confirm"
      />
      <control icon="check" @click="prompt = false" />
    </template>
    <control
      v-else
      class="highlight-font-alert"
      icon="delete"
      :text="text"
      @click="prompt = true"
    />
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
