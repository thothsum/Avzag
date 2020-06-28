<template>
  <div id="root">
    <div class="card">
      <h2 class="txt-ipa">{{phoneme.ipa}}</h2>
      <p class="txt-caption txt-faded spaced" v-if="features">{{features}}</p>
    </div>
    <audio ref="player"></audio>
    <PhonemeUse
      @play="play(lc, $event)"
      :key="i"
      v-for="(lc, i) in lects"
      :lect="lc"
      :use="phoneme.uses[lc]"
    />
  </div>
</template>

<script>
import PhonemeUse from "./PhonemeUse";

export default {
  name: "PhonemeDetails",
  components: {
    PhonemeUse
  },
  props: ["phoneme"],
  computed: {
    lects() {
      return this.$store.getters.lects.filter(l => l in this.phoneme.uses);
    },
    features() {
      return this.phoneme["features"]?.reduce((a, t) => (a = `${a} ${t}`));
    },
    root() {
      return this.$store.getters.languageRoot;
    }
  },
  methods: {
    play(lect, sample) {
      const player = this.$refs.player;
      player.src = `${this.root}${lect}/audio/${sample}.mp3`;
      player.play();
    }
  }
};
</script>

<style scoped>
#root {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
}
.spaced {
  word-spacing: var(--margin-double);
}
</style>
