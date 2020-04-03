<template>
  <div class="table">
    <button
      class="phoneme"
      :class="{faded: !fits(phn)}"
      :key="phn.i"
      @click="$emit('phoneme', phn.i)"
      v-for="phn in phonemes"
    >
      <span class="letter">{{phn.str}}</span>
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
      if (!this.query) return true;
      
      let result = true;
      for (const [tag, mode] of Object.entries(this.query)) {
        result &= mode === phoneme._all.includes(tag);
      }
      return result;
    }
  }
};
</script>

<style scoped>
.table {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.phoneme {
  margin: 5px;
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
