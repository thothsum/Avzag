<template>
  <div id="root" class="panel">
    <div class="card panel-dense">
      <h2 class="text-ipa">{{phoneme.ipa}}</h2>
      <p class="text-caption text-faded text-spaced" v-if="features">{{features}}</p>
      <p class="text-caption" v-if="phoneme.note" v-html="parsePhonemes(phoneme.note)"></p>
    </div>
    <audio ref="player"></audio>
    <PhonemeUse
      @play="play(lc, $event)"
      :key="i"
      v-for="(lc, i) in lects"
      :lect="lc"
      :cases="phoneme.uses[lc]"
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
    },
    parsePhonemes(str) {
      return str.replace(/\/([^/]+)\//g, "<span class='text-ipa'>$1</span>");
    }
  }
};
</script>

<style lang="scss" scoped>
.text-ipa {
  user-select: unset;
}
</style>
