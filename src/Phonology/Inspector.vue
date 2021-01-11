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

<script lang="ts">
import { ref, PropType, defineComponent } from "vue";
import InspectorCard from "./InspectorCard.vue";
import { Phoneme } from "./types";

export default defineComponent({
  components: { InspectorCard },
  props: {
    phoneme: { type: Object as PropType<Phoneme>, default: {} },
  },
  setup() {
    const player = ref({} as HTMLMediaElement);
    function play(url: string) {
      player.value.src = url;
      player.value.play();
    }
    return { play };
  },
});
</script>

<style lang="scss" scoped>
.text-ipa {
  user-select: unset;
}
</style>
