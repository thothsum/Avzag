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

import { computed, defineComponent, PropType, reactive, ref } from "vue";

import { Phrase, VBlock } from "./types";
import { root } from "@/store";
import { play, audio } from "@/audio-player";

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

    const playing = computed({
      get: () => !audio.paused,
      set: (p) => {
        console.log(p);
        if (p) play(...urls.value);
        else audio.pause();
      },
    });

    return {
      glossed,
      blocks,
      copy,
      playing,
      contextTranslation,
      urls,
      audio,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
