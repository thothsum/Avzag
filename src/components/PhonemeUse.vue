<template>
  <div class="panel-dense card">
    <div class="title">
      <h3>{{lect}}</h3>
      <div class="graphemes panel-horizontal-dense">
        <span :key="g" v-for="g in graphemes">{{g}}</span>
      </div>
    </div>
    <!-- <p class="text-caption text-faded" v-if="use.note">{{use.note}}</p> -->
    <div class="panel-solid scroll">
      <template v-for="c in use">
        <button class="small" @click="$emit('play', s)" :key="s" v-for="s in c.samples">
          <span class="icon-small">play_arrow</span>
          <span v-html="highlight(s, c.grapheme)"></span>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhonemeUse",
  props: ["lect", "use"],
  computed: {
    graphemes() {
      return this.use.map(u => u.grapheme);
    }
  },
  methods: {
    highlight(sample, grapheme) {
      return sample.replace(
        new RegExp(grapheme, "g"),
        `<span style="color: var(--color-highlight)">${grapheme}</span>`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.graphemes span {
  &::before,
  &::after {
    color: var(--color-text-faded);
    font-family: $font-family;
    line-height: 100%;
  }
  &::before {
    content: "⟨";
  }
  &::after {
    content: "⟩";
  }
}
.panel-solid {
  margin: -1 * map-get($margins, "normal");
  margin-top: map-get($margins, "quarter");
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  max-height: 3 * map-get($button-height, "small");
}
</style>
