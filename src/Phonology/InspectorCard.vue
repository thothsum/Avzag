<template>
  <div class="col-1 card small">
    <div class="title">
      <h2 class="flex">{{ lect }}</h2>
      <p v-for="g in graphemes" :key="g" class="text-dot">{{ g }}</p>
    </div>
    <div class="col-0">
      <button
        v-for="(s, i) in fullSamples"
        :key="i"
        class="row"
        @click="play(i)"
      >
        <span class="icon">{{
          playable[i] ? "play_arrow" : "arrow_right"
        }}</span>
        <Notes class="word" :notes="[words[i]]" />
        <Notes :notes="[ipas[i]]" />
      </button>
    </div>
    <Notes class="text-caption" :notes="use.notes" />
  </div>
</template>

<script lang="ts">
import Notes from "@/components/Notes/index.vue";
import { computed, defineComponent, ref, watch, PropType } from "vue";
import { lects } from "@/store";
import { PhonemeUse } from "./types";

export default defineComponent({
  components: { Notes },
  props: {
    lect: { type: String, default: "" },
    use: { type: Object as PropType<PhonemeUse>, default: {} },
  },
  emits: ["play"],
  setup(props, { emit }) {
    const root = computed(
      () => lects.value.find(({ name }) => name === props.lect)?.root + "audio/"
    );
    const graphemes = computed(() => {
      const set = new Set(props.use.samples?.map(({ grapheme }) => grapheme));
      set.delete(undefined);
      return set;
    });
    const fullSamples = computed(() =>
      props.use.samples?.filter(({ word, ipa }) => word || ipa)
    );
    const urls = computed(() =>
      fullSamples.value
        ?.map(({ word, ipa }) => word?.replaceAll("*", "") ?? ipa)
        .map((n) => root.value + n + ".mp3")
    );

    function highlight(text: string, target: string) {
      return text.includes("*") ? text : text.replaceAll(target, `*${target}*`);
    }
    const words = computed(() =>
      fullSamples.value?.map(({ word, grapheme }) =>
        highlight(word as string, grapheme as string)
      )
    );
    const ipas = computed(() =>
      fullSamples.value?.map(({ ipa }) =>
        highlight(ipa as string, props.use.phoneme)
      )
    );

    const playable = ref([] as boolean[]);
    function play(index: number) {
      if (playable.value[index] && urls.value) emit("play", urls.value[index]);
    }
    watch(
      urls,
      (urls) => {
        if (!urls) return;
        playable.value = new Array(urls.length);
        urls.forEach((u, i) =>
          fetch(u, { method: "HEAD" }).then(
            ({ ok }) => (playable.value[i] = ok)
          )
        );
      },
      { immediate: true }
    );

    return {
      play,
      ipas,
      words,
      fullSamples,
      graphemes,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
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
.word {
  flex: 1;
  text-align: left;
}
</style>
