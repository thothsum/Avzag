<template>
  <div v-if="phrase?.blocks?.length" class="col flag" :class="{ card: !flat }">
    <Flag :lect="lect" class="blur" />
    <div v-if="lect" class="row small wrap" style="width: 100%">
      <h2 class="flex">{{ lect }}</h2>
      <div class="row">
        <toggle v-model="playing" icon="play_arrow" />
        <btn icon="assignment" @click="copy" />
        <toggle v-model="glossed" icon="segment" />
      </div>
    </div>
    <Context :translation="contextTranslation" :blocks="vblocks" />
    <div class="row wrap flex">
      <div v-for="(b, i) in phrase.blocks" :key="i" class="blocks row seeker">
        <Seeker
          v-if="vblocks[i]?.state"
          :check="playing"
          :seek="player.queue[i]?.seek"
        />
        <Block :block="b" :glossed="glossed" @update="vblocks[i] = $event" />
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
import Seeker from "@/components/Seeker.vue";

import { computed, defineComponent, PropType, reactive, ref } from "vue";

import { Phrase, BlockSnapshot } from "./types";
import player from "@/audio-player";

export default defineComponent({
  components: { Context, Block, Notes, Flag, Seeker },
  props: {
    lect: { type: String, default: "" },
    path: { type: String, default: "" },
    phrase: { type: Object as PropType<Phrase>, default: undefined },
    flat: Boolean,
  },
  setup(props) {
    const glossed = ref(false);
    const vblocks = reactive([] as BlockSnapshot[]);
    const contextTranslation = computed(() =>
      props.lect && !glossed.value ? props.phrase.context : null
    );

    const text = computed(() =>
      vblocks
        .filter(({ state }) => state)
        .map(({ text, state }) => (state?.noSpace ? "" : " ") + text)
        .join("")
        .trim()
    );
    function copy() {
      navigator.clipboard.writeText(text.value);
    }

    const playing = computed({
      get: () => player.key === props.lect,
      set: (p) => {
        if (p)
          player.play(
            props.lect,
            vblocks
              .map(({ state, text }) =>
                state?.audio === null
                  ? null
                  : state?.audio ?? text.toLowerCase()
              )
              .map((p) => (p === null ? "" : props.path + (p ?? "")))
          );
        else player.stop();
      },
    });

    return { glossed, vblocks, copy, player, playing, contextTranslation };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
