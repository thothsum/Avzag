<template>
  <button class="phoneme" :class="{faded: faded}">
    <span class="letter">{{phoneme.str}}</span>
    <br />
    <span class="ipa">{{phoneme.ipa}}</span>
  </button>
</template>

<script>
export default {
  name: "PhonemeItem",
  props: ["phoneme", "faded"]
};
</script>

<style scoped>
.phoneme {
  flex-direction: column;
  font-weight: 600;
  align-items: center;
  width: 50px;
  height: 40px;
  line-height: 50%;
}
.ipa {
  font-weight: 400;
  font-size: 12px;
}
.faded {
  background-color: transparent;
  border-color: var(--nord5);
}
.faded:active {
  border-color: var(--nord0);
}
.faded > * {
  color: var(--nord4);
}
.faded:hover > * {
  color: initial;
}
</style>
