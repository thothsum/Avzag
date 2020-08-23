<template>
  <div id="root" :class="{narrow: phonemes.length <= 12}" class="panel-horizontal-dense wrap">
    <PhoneticItem
      @click.native="$emit('select', p)"
      :selected="selected==p"
      :faded="!fitting[i]"
      :ipa="p"
      :str="graphemes[i]"
      :key="p"
      v-for="(p,i) in phonemes"
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
  props: ["selected", "lectQuery", "featureQuery", "phonemes", "database"],
  model: {
    prop: "selected",
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
    fitting() {
      return this.phonemes
        .map((p) => this.database[p])
        .map(
          (d) =>
            this.pass(Object.keys(d.uses), this.lectQuery) &&
            this.pass(d.tags, this.featureQuery)
        );
    },
    singleLect() {
      let lects = [];
      for (const [lect, mode] of Object.entries(this.lectQuery))
        if (mode) lects.push(lect);
      return lects.length == 1 ? lects[0] : undefined;
    },
    graphemes() {
      return this.phonemes.map(
        (p) =>
          Object.keys(this.database[p].uses[this.singleLect]?.samples ?? {})[0]
      );
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
