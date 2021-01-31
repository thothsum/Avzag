<template>
  <button :class="{ 'text-faded': faded, highlight: selected }" class="col-0">
    <b>{{ str }}</b>
    <span class="text-ipa" :class="{ 'text-faded': str }">{{ ipa }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    selected: Boolean,
    faded: Boolean,
    ipa: { type: String, default: "" },
    str: { type: String, default: "" },
  },
});
</script>

<style lang="scss" scoped>
button {
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
