<template>
  <div class="col-1 card flag small">
    <Flag :lect="lect" class="blur" />
    <div class="title row-0">
      <h2 class="flex">{{ lect }}</h2>
      <p v-for="g in graphemes" :key="g" class="text-dot">{{ g }}</p>
    </div>
    <div class="col-0">
      <button
        v-for="(s, i) in fullSamples"
        :key="i"
        class="row flex seeker"
        :disabled="!urls[i]"
        @click="player.play(null, [urls[i]], urls[i])"
      >
        <Seeker :check="urls[i] === player.key" :seek="player.seek" />
        <span class="icon">
          {{ urls[i] ? "play_arrow" : "arrow_right" }}
        </span>
        <Notes class="word flex" :notes="[words[i]]" />
        <Notes :notes="[ipas[i]]" />
        <btn icon="copy" @click.stop="copy(i)" />
      </button>
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
      return text.includes("*") ? text : text.replaceAll(target, `*${target}*`);
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

    const urls = ref([] as string[]);
    watch(
      fullSamples,
      (samples) =>
        player.canPlay(
          urls,
          props.lect,
          samples
            .map(({ word, ipa }) => word?.replaceAll("*", "") ?? ipa)
            .map((f) => "phonology/" + (f ?? ""))
        ),
      { immediate: true }
    );

    function copy(i: number) {
      navigator.clipboard.writeText(
        [words, ipas]
          .map(({ value }) => value[i])
          .map((t) => t.replaceAll("*", ""))
          .filter((t) => t)
          .join(" ")
      );
    }

    return {
      player,
      urls,
      ipas,
      words,
      fullSamples,
      graphemes,
      copy,
    };
  },
});
</script>

<style lang="scss" scoped>
.col-0 {
  $margin: -1 * map-get($margins, "normal");
  margin-left: $margin;
  margin-right: $margin;
  border-radius: 0;
  &:last-child {
    margin-bottom: $margin;
    border-radius: 0 0 $border-radius $border-radius;
  }
}
.seeker {
  padding-right: 0;
  &:disabled {
    opacity: 1;
  }
}
</style>
