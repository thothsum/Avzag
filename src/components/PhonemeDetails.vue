<template>
  <div class="col-1">
    <div class="card col-1">
      <h1 class="text-ipa">{{ phoneme.ipa }}</h1>
      <p class="text-caption text-faded text-spaced">{{ phoneme.tags }}</p>
    </div>
    <audio ref="player"></audio>
    <PhonemeUse
      @play="play"
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
