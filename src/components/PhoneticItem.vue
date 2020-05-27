<template>
  <button :class="{faded: faded}">
    <span>
      <b>{{str}}</b>
    </span>
    <span>{{ipa}}</span>
  </button>
</template>

<script>
export default {
  name: "PhoneticItem",
  props: ["faded", "ipa", "str"]
};
</script>

<style scoped>
button {
  margin: 5px;
  flex-direction: column;
  place-content: center;
  width: 50px;
  height: 40px;
}
.faded {
  background-color: transparent;
}
.faded * {
  color: var(--color-text-faded);
}
.faded:hover * {
  color: initial;
}
</style>