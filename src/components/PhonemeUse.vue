<template>
  <div class="panel card">
    <div class="title">
      <h3>{{lect}}</h3>
      <p v-html="header"></p>
    </div>
    <div class="panel-solid scroll">
      <button class="small panel-horizontal" @click="play(i)" :key="i" v-for="(s,i) in use.samples">
        <span class="icon-small">{{playable[i] ? 'play_arrow' : 'arrow_right'}}</span>
        <span class="text" v-html="highlight(s.word, s.grapheme, s.indexes)"></span>
        <span class="text-ipa" v-html="highlight(s.ipa, phoneme)"></span>
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
  data() {
    return {
      audios: [],
    };
  },
  computed: {
    root() {
      return this.$store.state.root + this.lect + "/audio/";
    },
    playable() {
      return this.audios.map((a) => a.type.includes("audio"));
    },
    header() {
      return [...new Set(this.use.samples.map((s) => s.grapheme))]
        .map((g) => `<b>${g}</b>`)
        .join("<span class='text-dot'></span>");
    },
  },
  watch: {
    use: {
      handler() {
        this.audios = [];
        this.use.samples
          .map((s) => this.root + s.word + ".mp3")
          .map((f) => fetch(f).then((r) => r.blob()))
          .map((r) => r.then((a) => this.audios.push(a)));
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    highlight(text, grapheme, indexes) {
      if (!text) return null;

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
    play(i) {
      if (this.playable[i]) this.$emit("play", this.audios[i]);
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
