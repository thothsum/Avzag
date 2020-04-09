<template>
  <div id="table">
    <button
      class="phoneme"
      :class="{faded: !fits(phn)}"
      :key="phn.i"
      @click="$emit('phoneme', phn.i)"
      v-for="phn in phonemes"
    >
      <span class="ipa">{{phn.ipa}}</span>
      <template v-if="singleLect">
        <br />
        <span class="str">{{getGrapheme(phn)}}</span>
      </template>
    </button>
  </div>
</template>

<script>
export default {
  name: "PhoneticTable",
  props: ["lectQuery", "featureQuery", "phonemes"],
  methods: {
    fits(phoneme) {
      return (
        this.pass(
          phoneme.lects.map(l => l.name),
          this.lectQuery
        ) && this.pass(phoneme.features, this.featureQuery)
      );
    },
    pass(tags, query) {
      for (const [tag, mode] of Object.entries(query)) {
        if (mode !== tags.includes(tag)) return false;
      }
      return true;
    },
    getGrapheme(phoneme) {
      console.log("finding", phoneme.lects, this.singleLect);
      return phoneme.lects.find(l => l.name === this.singleLect).grapheme;
    }
  },
  computed: {
    singleLect: function() {
      let included = [];
      for (const [lect, mode] of Object.entries(this.lectQuery))
        if (mode) included.push(lect);
      return included.length === 1 ? included[0] : undefined;
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
}
.faded > * {
  opacity: 0.3;
}
.faded:hover > *,
.faded:active > * {
  opacity: initial;
}
@media only screen and (max-width: 600px) {
  #table {
    place-content: center;
  }
}
</style>
