<template>
  <div class="panel card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="header"></p>
    </div>
    <div class="panel-solid scroll">
      <button class="small panel-horizontal" @click="play(s)" :key="i" v-for="(s,i) in use.samples">
        <span v-if="!s.muted" class="icon-small">play_arrow</span>
        <span class="text" v-html="highlight(s.word, s.grapheme, s.indexes)"></span>
        <span class="text-ipa" v-if="s.ipa" v-html="highlight(s.ipa, phoneme)"></span>
      </button>
    </div>
    <PhoneticNote :key="i" v-for="(n, i) in use.notes" :text="n" />
  </div>
</template>

<script>
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhonemeUse",
  components: { PhoneticNote },
  props: ["phoneme", "lect", "use"],
  computed: {
    header() {
      return [...new Set(this.use.samples.map((s) => s.grapheme))]
        .map((g) => `<b>${g}</b>`)
        .join("<span class='text-dot'></span>");
    },
  },
  methods: {
    highlight(text, grapheme, indexes) {
      const regex = new RegExp(grapheme, "g");
      const match = `<span style="color: var(--color-highlight)">${grapheme}</span>`;

      if (indexes) {
        indexes = indexes.split(" ");
        let i = 0;
        return text.replace(regex, function (m) {
          return indexes.includes((i++).toString()) ? match : m;
        });
      }
      return text.replace(regex, match);
    },
    play(sample) {
      if (!sample.muted) this.$emit("play", sample.word);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.panel-solid {
  $margin: -1 * map-get($margins, "normal");
  margin-left: $margin;
  margin-right: $margin;
  border-radius: 0;
  max-height: 3 * map-get($button-height, "normal");
  &:last-child {
    margin-bottom: $margin;
    border-radius: 0 0 $border-radius $border-radius;
  }
}
.text {
  flex: 1;
  text-align: left;
}
</style>
