<template>
  <div class="row-0">
    <template v-if="prompt">
      <Button class="alert" icon="delete_forever" @click="confirm" />
      <Button icon="check" @click="toggle" />
    </template>
    <Button v-else class="alert" icon="delete" :text="text" @click="toggle" />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, defineComponent, defineEmit, defineProps } from "vue";
import Button from "./Button";

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

<style lang="scss">
.alert * {
  color: var(--color-alert);
}
</style>
