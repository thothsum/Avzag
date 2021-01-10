<template>
  <button :class="{ 'text-faded': faded, highlight: selected }" class="col-0">
    <b>{{ str }}</b>
    <span class="text-ipa" :class="{ 'text-faded': str }">{{ ipa }}</span>
  </button>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineProps } from "vue";

const props = defineProps({
  selected: Boolean,
  faded: Boolean,
  ipa: { type: String, default: "" },
  str: { type: String, default: "" },
});
</script>

<style lang="scss" scoped>
button {
  place-content: center;
  width: 46px;
  height: 40px;
  &.highlight,
  &:not(.highlight):hover {
    &,
    * {
      opacity: 1 !important;
    }
  }
  &.text-faded {
    background-color: transparent !important;
  }
}
</style>
