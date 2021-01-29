<template>
  <div v-if="phrase" class="col card">
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
      <Block
        v-for="(b, i) in phrase.blocks"
        :ref="(el) => blocks.push(el)"
        :key="i"
        :class="{ bold: i === current }"
        :glossed="glossed"
        :block="b"
      />
    </div>
    <Notes class="text-caption" :notes="phrase.notes" />
  </div>
</template>

<script lang="ts">
import Context from "./Context/index.vue";
import Block from "./Block/index.vue";
import Notes from "@/components/Notes/index.vue";

import {
  computed,
  defineComponent,
  onBeforeUpdate,
  PropType,
  reactive,
  ref,
  watchEffect,
} from "vue";

import { Phrase, VBlock } from "./types";
import { root } from "@/store";
import * as player from "@/audio-player";

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
        else stop();
      },
    });
    const current = computed(() => (playing.value ? player.current.value : -1));
    watchEffect(() => console.log(player.current.value, player.playing.value));

    return {
      glossed,
      blocks,
      copy,
      contextTranslation,
      urls,
      playing,
      current,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
.bold {
  font-weight: bold;
}
</style>
