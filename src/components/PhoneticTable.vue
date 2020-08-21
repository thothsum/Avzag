<template>
  <div id="root" :class="{narrow: phonemes.length <= 12}" class="panel-horizontal-dense wrap">
    <!-- <PhoneticItem
      @click.native="$emit('select', phn)"
      :selected="selected==phn"
      :faded="!fitting[i]"
      :ipa="phn.ipa"
      :str="graphemes[i]"
      :key="i"
      v-for="(phn, i) in phonemes"
    />-->
    <p @click="$emit('select', p)" :key="p" v-for="p in phonemes">{{p}}</p>
  </div>
</template>

<script>
// import PhoneticItem from "./PhoneticItem";

export default {
  name: "PhoneticTable",
  components: {
    // PhoneticItem,
  },
  props: ["selected", "lectQuery", "featureQuery", "phonemes"],
  model: {
    prop: "selected",
    event: "select",
  },
  methods: {
    pass(tags, query) {
      for (const [tag, mode] of Object.entries(query)) {
        if (mode !== tags.includes(tag)) return false;
      }
      return true;
    },
  },
  computed: {
    fitting() {
      return this.phonemes.map(
        (p) =>
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
      return this.phonemes.map((p) => p.uses[this.singleLect]?.[0].grapheme);
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
