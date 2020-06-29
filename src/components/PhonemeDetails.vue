<template>
  <div id="root" class="panel">
    <div class="card">
      <h2>
        <span class="txt-faded">/&nbsp;</span>
        <span class="txt-ipa">{{phoneme.ipa}}</span>
        <span class="txt-faded">&nbsp;/</span>
      </h2>
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

<style lang="scss" scoped>
.spaced {
  word-spacing: var(--margin-double);
}
</style>
