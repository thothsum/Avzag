<template>
  <div id="table">
    <button
      class="phoneme"
      :class="{faded: !fitting[i], full: graphemes[i]}"
      :key="i"
      @click="$emit('phoneme', phn.i)"
      v-for="(phn, i) in phonemes"
    >
      <span class="str">
        <b>{{graphemes[i]}}</b>
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
      let lects = [];
      for (const [lect, mode] of Object.entries(this.lectQuery))
        if (mode) lects.push(lect);
      return lects.length === 1 ? lects[0] : undefined;
    },
    graphemes: function() {
      return this.phonemes.map(
        p => p.lects.find(l => l.name === this.singleLect)?.grapheme
      );
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
}
.phoneme > .ipa {
  transform: scale(0.9);
}
.phoneme:not(.full) > .ipa {
  transform: scale(1.2);
}
.phoneme:not(.full) > .str {
  transform: scale(0);
}
.faded * {
  color: var(--select);
}
.faded,
.faded:hover {
  background-color: transparent;
}
.faded:hover *,
.faded:active * {
  color: initial;
}
@media only screen and (max-width: 600px) {
  #table {
    place-content: center;
  }
}
</style>
