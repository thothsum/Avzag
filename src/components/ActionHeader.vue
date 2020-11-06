<template>
  <div class="panel-dense">
    <div class="panel-horizontal-dense">
      <Button v-if="button" :icon="button" @click.native="$emit('action')" />
      <p v-if="icon" class="icon">{{ icon }}</p>
      <h2 class="flex" v-if="header">{{ header }}</h2>
      <slot name="header" />
    </div>
    <p class="text-caption text-faded">
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
