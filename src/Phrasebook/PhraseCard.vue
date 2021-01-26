<template>
  <div v-if="phrase" class="col card">
    <div v-if="lect" class="row small wrap" style="width: 100%">
      <h2 class="flex">{{ lect }}</h2>
      <div class="row">
        <toggle :model-value="playing" icon="play_arrow" @click="play(true)" />
        <btn icon="content_copy" @click="copy" />
        <toggle v-model="glossed" icon="layers" />
      </div>
    </div>
    <Context :translation="contextTranslation" :blocks="blocks" />
    <div class="row wrap flex">
      <Block
        v-for="(b, i) in phrase.blocks"
        :ref="(el) => blocks.push(el)"
        :key="i"
        :glossed="glossed"
        :block="b"
      />
    </div>
    <Notes class="text-caption" :notes="phrase.notes" />
    <audio ref="player" />
  </div>
</template>

<script lang="ts">
import Context from "./Context/index.vue";
import Block from "./Block/index.vue";
import Notes from "@/components/Notes/index.vue";

import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";

import { Phrase, VBlock } from "./types";
import { root } from "@/store";

export default defineComponent({
  components: { Context, Block, Notes },
  props: {
    lect: { type: String, default: "" },
    phrase: { type: Object as PropType<Phrase>, default: undefined },
  },
  setup(props) {
    const glossed = ref(false);
    const contextTranslation = computed(() =>
      props.lect ? props.phrase.context : undefined
    );

    const blocks = reactive<VBlock[]>([]);
    const text = computed(() =>
      blocks
        .filter(({ state }) => state)
        .map(({ text }) => text)
        .join(" ")
    );
    function copy() {
      navigator.clipboard.writeText(text.value);
    }

    const lectRoot = computed(() => root + props.lect + "/phrasebook/");
    const urls = computed(() =>
      blocks
        .map(({ state }) => state?.texts.map(({ plain }) => plain))
        .map((p) => lectRoot.value + p?.join("") + ".mp3")
    );
    const player = ref<HTMLMediaElement>();
    const playing = ref(false);
    let currentUrl = -1;
    watch(
      player,
      () => {
        if (!player.value) return;
        player.value.onplaying = () => (playing.value = true);
        player.value.onpause = () => (playing.value = false);
        player.value.onloadeddata = () => player.value?.play();
        player.value.autoplay = true;
        // player.value.onended = () => play();
      },
      { immediate: true }
    );
    async function play(restart = false) {
      console.log(restart, playing.value);
      // if (restart && playing.value) {
      //   if (player.value) {
      //     player.value.pause();
      //     player.value.currentTime = 0;
      //   }
      //   currentUrl = -1;
      //   return;
      // }
      currentUrl = restart ? 0 : currentUrl + 1;
      const url = urls.value[currentUrl];
      console.log(url);
      if (!player.value || !url) {
        currentUrl = -1;
        return;
      }

      player.value.src = url;
      player.value.load();
      await nextTick();
      player.value.play();
    }

    return {
      glossed,
      blocks,
      copy,
      player,
      playing,
      play,
      contextTranslation,
      urls,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
