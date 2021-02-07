<template>
  <div class="col-1 card flag small">
    <Flag :lect="lect" class="blur" />
    <div class="title row-0">
      <h2 class="flex">{{ lect }}</h2>
      <p v-for="g in graphemes" :key="g" class="text-dot">{{ g }}</p>
    </div>
    <div class="col">
      <div v-for="(s, i) in fullSamples" :key="i" class="row-1 flex seeker">
        <Seeker :check="urls[i] === player.key" :seek="player.seek" />
        <btn
          :disabled="!urls[i]"
          :is-on="urls[i] === player.key"
          icon="play_arrow"
          @click="player.play(null, [urls[i]])"
        />
        <Notes
          class="word flex"
          :notes="[words[i]]"
          @texts="setTexts(i, 0, $event[0])"
        />
        <Notes
          class="text-ipa"
          :notes="[ipas[i]]"
          row
          @texts="setTexts(i, 1, $event[0])"
        />
      </div>
    </div>
    <Notes class="text-caption" :notes="use.notes" />
  </div>
</template>

<script lang="ts">
import Notes from "@/components/Notes/index.vue";
import Flag from "@/components/Flag.vue";
import Seeker from "@/components/Seeker.vue";

import { computed, defineComponent, PropType, watch, ref } from "vue";
import { PhonemeUse } from "./types";
import player from "@/audio-player";

export default defineComponent({
  components: { Notes, Flag, Seeker },
  props: {
    lect: { type: String, default: "" },
    use: { type: Object as PropType<PhonemeUse>, default: () => ({}) },
  },
  setup(props) {
    const graphemes = computed(() => {
      const set = new Set(props.use.samples?.map(({ grapheme }) => grapheme));
      set.delete(undefined);
      return set;
    });
    const fullSamples = computed(
      () => props.use.samples?.filter(({ word, ipa }) => word || ipa) ?? []
    );

    function highlight(text: string, target: string) {
      return text.includes("^") ? text : text.replaceAll(target, `^${target}^`);
    }
    const words = computed(() =>
      fullSamples.value?.map(({ word, grapheme }) =>
        highlight(word ?? "", grapheme ?? "")
      )
    );
    const ipas = computed(() =>
      fullSamples.value?.map(({ ipa }) =>
        highlight(ipa ?? "", props.use.phoneme)
      )
    );

    const texts = ref([] as string[][]);
    function setTexts(i: number, j: number, text: string) {
      if (!texts.value[i]) texts.value[i] = [];
      texts.value[i][j] = text;
    }

    const urls = ref([] as string[]);
    watch(
      texts,
      (texts) =>
        player.canPlay(
          urls,
          props.lect,
          texts
            .map(([word, ipa]) => word ?? ipa)
            .map((f) => "phonology/" + (f ?? ""))
        ),
      { immediate: true, deep: true }
    );

    return {
      player,
      urls,
      ipas,
      words,
      fullSamples,
      graphemes,
      setTexts,
    };
  },
});
</script>

<style lang="scss" scoped>
.seeker .text-ipa {
  gap: 0;
}
</style>
