<template>
  <div class="col">
    <div class="row">
      <slot v-if="slots.action" name="action" />
      <Button v-else-if="button" :icon="button" @click="emit('action')" />
      <p v-if="icon" class="icon">{{ icon }}</p>
      <h2 v-if="header" class="flex">{{ header }}</h2>
      <slot name="header" />
    </div>
    <p v-if="slots.caption" class="text-caption text-faded">
      <slot name="caption" />
    </p>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
  components: { Button },
  props: {
    button: { type: String, default: "add" },
    icon: { type: String, default: "" },
    header: { type: String, default: "" },
  },
  emits: ["action"],
  setup(props, context) {
    return context;
  },
});
</script>
