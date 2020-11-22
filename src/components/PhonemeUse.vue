<template>
  <div class="col-1 card">
    <div class="title">
      <h2 class="flex">{{ lect }}</h2>
      <p :key="g" v-for="g in graphemes" class="text-dot">{{ g }}</p>
    </div>
    <div class="col-0">
      <button
        class="small row"
        @click="play(i)"
        :key="i"
        v-for="(s, i) in fullSamples"
      >
        <span class="icon">{{
          canPlay[i] ? "play_arrow" : "arrow_right"
        }}</span>
        <span class="text" v-html="highlight(s.word, s.grapheme)"></span>
        <span
          class="text-ipa"
          v-if="s.ipa"
          v-html="highlight(s.ipa, use.phoneme)"
        ></span>
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
  props: ["lect", "use"],
  data() {
    return {
      canPlay: [],
    };
  },
  computed: {
    root() {
      return this.$store.state.root + this.lect + "/audio/";
    },
    fullSamples() {
      return this.use.samples.filter((s) => s.word || s.ipa);
    },
    urls() {
      return this.fullSamples
        .map((s) => s.word?.replace(/\*/g, "") ?? s.ipa)
        .map((w) => this.root + w + ".mp3");
    },
    graphemes() {
      return new Set(this.use.samples.map((s) => s.grapheme));
    },
  },
  watch: {
    urls: {
      handler() {
        this.canPlay = new Array(this.urls);
        this.urls.forEach((u, i) => {
          fetch(u, { method: "HEAD" }).then((r) => {
            this.$set(this.canPlay, i, r.ok);
          });
        });
      },
      immediate: true,
    },
  },
  methods: {
    color(s) {
      return `<span style='color: var(--color-highlight)'>${s}</span>`;
    },
    highlight(word, grap) {
      if (!word) return null;
      return word.includes("*")
        ? word.replace(/\*([^*]+)\*/g, this.color("$1"))
        : word.replace(new RegExp(grap, "g"), this.color(grap));
    },
    play(i) {
      if (this.canPlay[i]) this.$emit("play", this.urls[i]);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.col-0 {
  $margin: -1 * map-get($margins, "normal");
  margin-left: $margin;
  margin-right: $margin;
  border-radius: 0;
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
