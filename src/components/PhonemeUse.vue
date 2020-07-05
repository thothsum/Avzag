<template>
  <div class="panel-dense card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="graphemes"></p>
    </div>
    <!-- <p class="text-caption" :key="i" v-for="(n, i) in notes">{{n}}</p> -->
    <div class="panel-solid scroll">
      <template v-for="c in cases">
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
  props: ["lect", "cases"],
  computed: {
    graphemes() {
      return this.cases
        .map(u => u.grapheme)
        .join("<span class='text-faded no-select'> • </span>");
    },
    notes() {
      return this.cases.map(u => u.note).filter(n => n);
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
.panel-solid {
  margin: -1 * map-get($margins, "normal");
  margin-top: map-get($margins, "quarter");
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  max-height: 3 * map-get($button-height, "small");
}
</style>
