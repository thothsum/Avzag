<template>
  <div id="root" :class="{narrow: phonemes.length <= 12}" dense>
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
          this.pass(Object.keys(p.uses), this.lectQuery) &&
          this.pass(p.features, this.featureQuery)
      );
    },
    singleLect() {
      let lects = [];
      for (const [lect, mode] of Object.entries(this.lectQuery))
        if (mode) lects.push(lect);
      return lects.length === 1 ? lects[0] : undefined;
    },
    graphemes() {
      return this.phonemes.map(p => p.uses[this.singleLect]?.grapheme);
    }
  }
};
</script>

<style lang="scss" scoped>
$item-width: 46px;
$item-height: 40px;

#root {
  display: grid;
  gap: map-get($margins, "half");
  place-items: stretch;
  grid-template-columns: repeat(auto-fill, $item-width);

  > * {
    width: $item-width;
    height: $item-height;
  }
}

@media only screen and (max-width: $mobile-width) {
  #root {
    grid-auto-flow: column;
    overflow-x: auto;
    max-height: 5 * $item-height;
    grid-template-rows: repeat(auto-fill, $item-height);

    &.narrow {
      grid-template-rows: $item-height;
    }
  }
}
</style>
