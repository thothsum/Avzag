<template>
  <div class="col-1">
    <div class="card col-1">
      <h1 class="text-ipa">{{ phoneme.ipa }}</h1>
      <p class="text-caption text-faded text-spaced">{{ phoneme.tags }}</p>
    </div>
    <audio ref="player"></audio>
    <Occurence
      v-for="(u, l) of phoneme.lects"
      :key="l"
      :lect="l"
      :use="u"
      @play="play"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, defineProps } from "vue";
import Occurence from "./Occurence";

const player = ref({} as HTMLMediaElement);
const props = defineProps({ phoneme: Object });

function play(audio: string) {
  player.value.src = audio;
  player.value.play();
  console.log(audio);
}
</script>

<style lang="scss" scoped>
.text-ipa {
  user-select: unset;
}
</style>
