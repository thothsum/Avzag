<template>
  <button :class="{ 'text-faded': faded, highlight: selected }" class="panel-solid">
    <b>{{str}}</b>
    <span class="text-ipa">{{ ipa }}</span>
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
