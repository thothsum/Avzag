<template>
  <div id="table">
    <button
      class="phoneme"
      :class="{faded: !fitting[i], full: singleLect}"
      :key="i"
      @click="$emit('phoneme', phn.i)"
      v-for="(phn, i) in phonemes"
    >
      <span class="str">
        <b>{{getGrapheme(phn)}}</b>
      </span>
      <span class="ipa">{{phn.ipa}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "PhoneticTable",
  props: ["lectQuery", "featureQuery", "phonemes"],
  methods: {
    pass(tags, query) {
      for (const [tag, mode] of Object.entries(query)) {
        if (mode !== tags.includes(tag)) return false;
      }
      return true;
    },
    getGrapheme(phoneme) {
      return phoneme.lects.find(l => l.name === this.singleLect)?.grapheme;
    }
  },
  computed: {
    fitting: function() {
      return this.phonemes.map(
        p =>
          this.pass(
            p.lects.map(l => l.name),
            this.lectQuery
          ) && this.pass(p.features, this.featureQuery)
      );
    },
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
  line-height: 100%;
}

.phoneme.full > .ipa {
  transform: scale(0.8);
}
.phoneme:not(.full) > .ipa {
  transform: scale(1.2);
}
.phoneme:not(.full) > .str {
  transform: scale(0);
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
