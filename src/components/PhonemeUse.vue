<template>
  <div class="panel card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="header"></p>
    </div>
    <div class="panel-solid scroll">
      <template v-for="g in graphemes">
        <button
          class="small panel-horizontal"
          @click="play(s)"
          :key="g+'.'+s.word"
          v-for="s in use.samples[g]"
        >
          <span v-if="!s.muted" class="icon-small">play_arrow</span>
          <span class="text" v-html="highlight(s.word, g, s.highlights)"></span>
          <span class="text-ipa" v-if="s.ipa" v-html="highlight(s.ipa, phoneme)"></span>
        </button>
      </template>
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
    graphemes() {
      return Object.keys(this.use.samples);
    },
    header() {
      return this.graphemes
        .map((g) => `<b>${g}</b>`)
        .join("<span class='text-dot'></span>");
    },
  },
  methods: {
    highlight(sample, grapheme, indexes) {
      const regex = new RegExp(grapheme, "g");
      const match = `<span style="color: var(--color-highlight)">${grapheme}</span>`;

      if (indexes) {
        let i = 0;
        return sample.replace(regex, function (m) {
          return indexes.includes(i++) ? match : m;
        });
      }
      return sample.replace(regex, match);
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
