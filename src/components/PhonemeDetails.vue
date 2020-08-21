<template>
  <div class="panel">
    <div class="card panel">
      <h2 class="text-ipa">{{phoneme}}</h2>
      <p class="text-caption text-faded text-spaced">{{tags}}</p>
      <!-- <PhoneticNote :text="phoneme.note" /> -->
    </div>
    <audio ref="player"></audio>
    <PhonemeUse
      @play="play(l, $event)"
      :key="l"
      v-for="l in lects"
      :phoneme="phoneme"
      :lect="l"
      :uses="database.uses[l]"
    />
  </div>
</template>

<script>
import PhonemeUse from "./PhonemeUse";
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhonemeDetails",
  components: {
    PhonemeUse,
    PhoneticNote,
  },
  props: ["phoneme", "database"],
  computed: {
    root() {
      return this.$store.state.root;
    },
    lects() {
      return Object.keys(this.database.uses);
      //  this.$store.getters.lects.filter((l) => l in this.phoneme.uses);
    },
    tags() {
      return this.database.tags.reduce((a, t) => (a = `${a} ${t}`), "");
    },
  },
  methods: {
    play(lect, sample) {
      const player = this.$refs.player;
      player.src = `${this.root}${lect}/audio/${sample}.mp3`;
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
