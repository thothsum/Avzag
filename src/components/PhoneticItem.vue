<template>
  <button :class="{'txt-faded': !selected&&faded, highlighted: selected}">
    <span>
      <b>{{str}}</b>
    </span>
    <span>{{ipa}}</span>
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
  margin: 5px;
  flex-direction: column;
  place-content: center;
  width: 50px;
  height: 40px;
}
.txt-faded {
  background-color: transparent;
}
.highlighted:hover {
  background-color: transparent !important;
}
</style>