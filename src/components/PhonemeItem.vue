<template>
  <button class="phoneme">
    <span class="letter">{{phoneme.str}}</span>
    <br />
    <span class="ipa">{{phoneme.ipa || '-'}}</span>
  </button>
</template>

<script>
export default {
  name: "PhonemeItem",
  props: ["phoneme", "highlighted"]
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
</style>
