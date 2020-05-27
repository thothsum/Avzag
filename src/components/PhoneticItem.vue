<template>
  <button class="phoneme" :class="{faded: faded}">
    <span>
      <b>{{str}}</b>
    </span>
    <span>/{{ipa}}/</span>
  </button>
</template>

<script>
export default {
  name: "PhoneticItem",
  props: ["faded", "ipa", "str"]
};
</script>

<style scoped>
.phoneme {
  margin: 5px;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 40px;
}
.faded {
  border-color: var(--select);
}
.faded * {
  color: var(--select);
}
.faded,
.faded:hover {
  background-color: transparent;
}
.faded:active {
  border-color: transparent;
}
.faded:hover *,
.faded:active * {
  color: initial;
}
</style>