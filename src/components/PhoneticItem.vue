<template>
  <button
    :class="{ 'text-faded': faded, highlight: selected }"
    class="col-0"
  >
    <b>{{ str }}</b>
    <span class="text-ipa" :class="{ 'text-faded': str }">{{ ipa }}</span>
  </button>
</template>

<script>
export default {
  name: "PhoneticItem",
  props: ["selected", "faded", "ipa", "str"],
};
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
