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
  setup(props, { emit, slots }) {
    const act = () => emit("action");
    return {
      caption: slots.caption,
      act,
    };
  },
});
</script>
