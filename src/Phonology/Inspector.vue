<template>
  <div class="col-1">
    <div class="card col-1">
      <h1 class="text-ipa">{{ phoneme.ipa }}</h1>
      <p class="text-caption text-faded text-spaced">{{ phoneme.tags }}</p>
    </div>
    <audio ref="player"></audio>
    <InspectorCard
      v-for="(u, l) of phoneme.lects"
      :key="l"
      :lect="l"
      :use="u"
      @play="play"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType } from "vue";
import InspectorCard from "./InspectorCard.vue";
import { Phoneme } from "./types";

const player = ref({} as HTMLMediaElement);
const props = defineProps({
  phoneme: { type: Object as PropType<Phoneme>, default: {} },
});

function play(url: string) {
  player.value.src = url;
  player.value.play();
}
</script>

<style lang="scss" scoped>
.text-ipa {
  user-select: unset;
}
</style>
