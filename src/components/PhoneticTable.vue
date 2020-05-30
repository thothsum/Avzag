<template>
  <div id="root">
    <PhoneticItem
      @click.native="$emit('phoneme', phn.i)"
      :selected="selected==phn.i"
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
  props: ["selected", "lectQuery", "featureQuery", "phonemes"],
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
      return lects.length === 1 ? lects[0] : undefined;
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
#root {
  display: flex;
  flex-wrap: wrap;
  padding: -5px;
  place-content: flex-start;
}
@media only screen and (max-width: 600px) {
  #root {
    flex-direction: column;
    max-height: 240px;
    overflow-y: scroll;  
  }
}
</style>
