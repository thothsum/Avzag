<template>
  <div id="table">
    <PhoneticItem
      @click.native="$emit('phoneme', phn.i)"
      :faded="!fitting[i]"
      :ipa="phn.ipa"
      :str="graphemes[i]"
      :key="i"
      v-for="(phn, i) in phonemes"
    />
  </div>
</template>

<script>
import PhoneticItem from "./PhoneticItem";

export default {
  name: "PhoneticTable",
  components: {
    PhoneticItem
  },
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
    fitting() {
      return this.phonemes.map(
        p =>
          this.pass(
            p.lects.map(l => l.name),
            this.lectQuery
          ) && this.pass(p.features, this.featureQuery)
      );
    },
    singleLect() {
      let lects = [];
      for (const [lect, mode] of Object.entries(this.lectQuery))
        if (mode) lects.push(lect);
      return lects.length > 0 ? lects[0] : undefined;
    },
    graphemes() {
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
  padding: -5px;
}
@media only screen and (max-width: 600px) {
  #table {
    place-content: center;
  }
}
</style>
