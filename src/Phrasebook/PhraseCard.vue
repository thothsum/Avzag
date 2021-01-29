<template>
  <div v-if="phrase" class="col card flag">
    <Flag :lect="lect" class="blur" />
    <div v-if="lect" class="row small wrap" style="width: 100%">
      <h2 class="flex">{{ lect }}</h2>
      <div class="row">
        <toggle v-model="playing" icon="play_arrow" />
        <btn icon="content_copy" @click="copy" />
        <toggle v-model="glossed" icon="layers" />
      </div>
    </div>
    <Context :translation="contextTranslation" :blocks="blocks" />
    <div class="row wrap flex">
      <div v-for="(b, i) in phrase.blocks" :key="i" class="blocks row">
        <p class="playback" :style="{ width: playbacks[i] + '%' }" />
        <Block :ref="(el) => blocks.push(el)" :block="b" :glossed="glossed" />
      </div>
    </div>
    <Notes class="text-caption" :notes="phrase.notes" />
  </div>
</template>

<script lang="ts">
import Context from "./Context/index.vue";
import Block from "./Block/index.vue";
import Notes from "@/components/Notes/index.vue";
import Flag from "@/components/Flag.vue";

import {
  computed,
  defineComponent,
  onBeforeUpdate,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";

import { Phrase, VBlock } from "./types";
import { root } from "@/store";
import * as player from "@/audio-player";

export default defineComponent({
  components: { Context, Block, Notes, Flag },
  props: {
    lect: { type: String, default: "" },
    phrase: { type: Object as PropType<Phrase>, default: undefined },
  },
  setup(props) {
    const glossed = ref(false);
    const contextTranslation = computed(() =>
      props.lect ? props.phrase.context : undefined
    );

    onBeforeUpdate(() => (blocks.length = 0));
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

    const playing = computed({
      get: () => player.playing.value && player.id.value === props.lect,
      set: (p) => {
        if (p) player.play(props.lect, ...urls.value);
        else player.stop();
      },
    });

    const playbacks = ref([] as number[]);
    watch(
      [player.playback, player.current, playing],
      ([playback, current, playing]) => {
        urls.value.forEach(
          (_u, i) =>
            (playbacks.value[i] = playing && i === current ? playback * 100 : 0)
        );
      }
    );

    return {
      glossed,
      blocks,
      copy,
      contextTranslation,
      urls,
      playing,
      playbacks,
      playback: player.playback,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
.blocks {
  position: relative;
}
.playback {
  padding: 0;
  background-color: var(--color-text);
  border-radius: $border-radius $border-radius 0 0;
  height: $border-radius;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
