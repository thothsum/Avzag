<template>
  <div class="col">
    <div class="row header wrap">
      <p class="icon">{{ icon }}</p>
      <h2 class="flex">{{ header }}</h2>
      <slot name="header" />
    </div>
    <hr />
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
});
</script>

<style lang="scss" scoped>
.text-caption:empty {
  display: none;
}
.header {
  min-height: map-get($button-height, "small");
}
</style>
