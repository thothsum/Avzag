<template>
  <div class="panel">
    <div class="card panel">
      <h2 class="text-ipa">{{phoneme.ipa}}</h2>
      <p id="tags" class="text-caption text-faded panel-horizontal wrap">
        <span :key="t" v-for="t in phoneme.tags">{{t}}</span>
      </p>
    </div>
    <audio ref="player"></audio>
    <PhonemeUse @play="play" :key="l" v-for="(u, l) of phoneme.lects" :lect="l" :use="u" />
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
#tags{
  row-gap: 0;
}
</style>
