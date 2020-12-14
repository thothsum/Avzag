<template>
  <div class="col">
    <div class="row">
      <slot v-if="$slots.action" name="action" />
      <Button v-else-if="button" :icon="button" @click="$emit('action')" />
      <p v-if="icon" class="icon">{{ icon }}</p>
      <h2 v-if="header" class="flex">{{ header }}</h2>
      <slot name="header" />
    </div>
    <p v-if="$slots.caption" class="text-caption text-faded">
      <slot name="caption" />
    </p>
    <slot />
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "ActionHeader",
  components: { Button },
  props: {
    button: {
      default: "add",
    },
    icon: String,
    header: String,
  },
};
</script>
