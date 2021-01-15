<template>
  <div v-if="phrase" class="col-1 card">
    <div class="row-1 small wrap" style="width: 100%">
      <template v-if="lect">
        <btn icon="content_copy" @click="copy" />
        <btn v-model="glossed" icon="layers" />
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

import { Phrase } from "./types";

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks = reactive([] as any[]);
    const text = computed(() =>
      blocks
        .filter(({ visible }) => visible)
        .map((b) => b.$refs.display.text)
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
