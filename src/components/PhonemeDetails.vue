<template>
  <div class="panel">
    <div class="card panel">
      <h2 class="text-ipa">{{phoneme.ipa}}</h2>
      <p class="text-caption text-faded text-spaced">{{tags}}</p>
    </div>
    <audio ref="player"></audio>
    <PhonemeUse
      @play="play"
      :key="l"
      v-for="(u, l) of phoneme.lects"
      :lect="l"
      :use="u"
    />
  </div>
</template>

<script>
import PhonemeUse from "./PhonemeUse";

export default {
  name: "PhonemeDetails",
  components: {
    PhonemeUse,
  },
  props: ["phoneme"],
  computed: {
    tags() {
      return this.phoneme.tags.reduce((a, t) => (a += " " + t), "");
    },
  },
  methods: {
    play(audio) {
      const player = this.$refs.player;
      player.src = audio;
      player.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.text-ipa {
  user-select: unset;
}
</style>
