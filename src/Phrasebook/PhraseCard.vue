<template>
  <div v-if="phrase" class="col-1 card">
    <div class="row-1 small wrap" style="width: 100%">
      <template v-if="lect">
        <btn icon="content_copy" @click="copy" />
        <toggle v-model="glossed" icon="layers" />
        <h2 class="flex">{{ lect }}</h2>
      </template>
      <Context :translation="contextTranslation" :blocks="blocks" />
    </div>
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

import { Phrase, BlockVue } from "./types";

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

    const blocks = reactive([] as BlockVue[]);
    const text = computed(() =>
      blocks
        .filter(({ state }) => state)
        .map(({ text }) => text)
        .join(" ")
    );
    function copy() {
      navigator.clipboard.writeText(text.value);
    }

    return { glossed, blocks, copy, contextTranslation };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
