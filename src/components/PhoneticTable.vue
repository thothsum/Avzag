<template>
  <div id="root" :class="{ narrow }" class="row scroll wrap">
    <PhoneticItem
      @click="$emit('update:phoneme', p)"
      :selected="phoneme == p"
      :faded="!fitting[i]"
      :ipa="p.ipa"
      :str="graphemes[i]"
      v-for="(p, i) in filtered"
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
    narrow() {
      return this.filtered.length <= 12;
    },
  },
  methods: {
    pass(tags, query) {
      if (!query) return true;
      for (const [tag, mode] of Object.entries(query)) {
        if (mode != tags.includes(tag)) return false;
      }
      return true;
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
    max-height: 5 * $item-height;

    &.narrow {
      max-height: 1.5 * $item-height;
    }
  }
}
</style>
