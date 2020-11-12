<template>
  <button
    :class="{ 'text-faded': faded, highlight: selected }"
    class="panel-solid"
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
  &:not(.highlight):hover * {
    color: var(--color-text);
  }
  &.text-faded {
    background-color: transparent !important;
  }
}
</style>
