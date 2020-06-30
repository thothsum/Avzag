<template>
  <button :class="{ 'text-faded': faded, highlight: selected }">
    <b>{{str}}</b>
    <span class="text-ipa">{{ ipa }}</span>
  </button>
</template>

<script>
export default {
  name: "PhoneticItem",
  props: ["selected", "faded", "ipa", "str"]
};
</script>

<style lang="scss" scoped>
button {
  border: var(--border-width) solid transparent;
  flex-direction: column;
  justify-items: space-between;
  place-content: center;
  > * {
    margin: 0;
  }
}
.text-faded {
  background-color: transparent !important;
  &:not(.highlight) {
    &:hover * {
      color: var(--color-text);
    }
    &:active {
      background-color: var(--color-active);
    }
  }
}
</style>
