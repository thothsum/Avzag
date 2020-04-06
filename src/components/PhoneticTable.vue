<template>
  <div id="table">
    <button
      class="phoneme"
      :class="{faded: !fits(phn)}"
      :key="phn.i"
      @click="$emit('phoneme', phn.i)"
      v-for="phn in phonemes"
    >
      <span class="str">{{phn.str}}</span>
      <br />
      <span class="ipa">{{phn.ipa}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "PhoneticTable",
  props: ["query", "phonemes"],
  methods: {
    fits(phoneme) {
      for (const [tag, mode] of Object.entries(this.query)) {
        if (mode !== phoneme._all.includes(tag)) return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
#table {
  display: flex;
  flex-wrap: wrap;
}
.phoneme {
  margin: 5px;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 40px;
  line-height: 50%;
}
.str {
  font-weight: bold;
}
.ipa {
  font-size: 12px;
}
.faded {
  background-color: transparent;
  border-color: var(--shadow);
}
.faded:active {
  border-color: var(--fore);
}
.faded > * {
  color: var(--shadow);
}
.faded:hover > * {
  color: initial;
}
@media only screen and (max-width: 600px) {
  #table {
    place-content: center;
  }
}
</style>
