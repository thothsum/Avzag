<template>
  <div id="root" :class="{narrow: phonemes.length <= 12}" class="panel-horizontal-dense wrap">
    <PhoneticItem
      @click.native="$emit('select', p)"
      :selected="phoneme==p"
      :faded="!fitting[i]"
      :ipa="p.ipa"
      :str="graphemes[i]"
      :key="i"
      v-for="(p,i) in filtered"
    />
  </div>
</template>

<script>
import PhoneticItem from "./PhoneticItem";

export default {
  name: "PhoneticTable",
  components: {
    PhoneticItem,
  },
  props: ["phoneme", "filter", "lectQuery", "featureQuery", "phonemes"],
  model: {
    prop: "phoneme",
    event: "select",
  },
  methods: {
    pass(tags, query) {
      for (const [tag, mode] of Object.entries(query)) {
        if (mode != tags.includes(tag)) return false;
      }
      return true;
    },
  },
  computed: {
    filtered() {
      return this.filter
        ? this.phonemes.filter((p) => p.tags.includes(this.filter))
        : this.phonemes;
    },
    fitting() {
      return this.filtered.map(
        (p) =>
          this.pass(Object.keys(p.lects), this.lectQuery) &&
          this.pass(p.tags, this.featureQuery)
      );
    },
    singleLect() {
      let lect = null;
      for (const l in this.lectQuery)
        if (this.lectQuery[l] > 0)
          if (!lect) lect = l;
          else return;
      return lect;
    },
    graphemes() {
      return this.singleLect
        ? this.filtered.map(
            (p) => p.lects[this.singleLect]?.samples[0]?.grapheme
          )
        : [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/panels";
$item-width: 46px;
$item-height: 40px;

#root > * {
  width: $item-width;
  height: $item-height;
}

@media only screen and (max-width: $mobile-width) {
  #root {
    flex-direction: column;
    place-content: flex-start;
    overflow-x: auto;
    max-height: 5 * $item-height;

    &.narrow {
      max-height: $item-height;
    }
  }
}
</style>
