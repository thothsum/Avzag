<template>
  <div class="col">
    <div class="row card-0">
      <btn v-if="button" :icon="button" @click="emit('action')" />
      <p class="icon">{{ icon }}</p>
      <h2 class="flex">{{ header }}</h2>
      <slot name="header" />
    </div>
    <p v-if="caption" class="text-caption text-faded">
      <slot name="caption" />
    </p>
    <div class="col">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditorCard",
  props: {
    button: { type: String, default: "add" },
    icon: { type: String, default: "" },
    header: { type: String, default: "" },
  },
  emits: ["action"],
  setup(_, { emit, slots }) {
    return { emit, caption: slots.caption };
  },
});
</script>

<style lang="scss" scoped>
.text-caption:empty {
  display: none;
}
.card-0 {
  min-height: map-get($button-height, "small") + 2 * map-get($margins, "half");
}
</style>
