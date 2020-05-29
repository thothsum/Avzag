<template>
  <button :class="{'txt-faded': faded, selected: selected}">
    <b>{{str}}</b>
    {{ipa}}
  </button>
</template>

<script>
export default {
  name: "PhoneticItem",
  props: ["selected", "faded", "ipa", "str"]
};
</script>

<style scoped>
button {
  border: 2px solid transparent;
  border-bottom-width: 2px;
  margin: 5px;
  flex-direction: column;
  place-content: center;
  width: 45px;
  height: 40px;
  line-height: 100%;
}
.txt-faded {
  background-color: transparent;
}
.selected {
  border-color: var(--color-select);
}
</style>