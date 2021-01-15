<template>
  <div v-if="phrase" class="col-1 card">
    <div v-if="lect" class="row-1 small">
      <btn icon="content_copy" @click="copy" />
      <btn v-model="glossed" icon="layers" />
      <h2>{{ lect }}</h2>
    </div>
    <!-- <Context
      :context="context"
      :translation="phrase.context"
      :blocks="blocks"
    /> -->
    <div class="row wrap flex">
      <Block
        v-for="(b, i) in phrase.blocks"
        :key="i"
        :glossed="glossed"
        :block="b"
      />
    </div>
    <Notes class="text-caption" :notes="phrase.notes" />
  </div>
</template>

<script lang="ts">
// import Context from "./Context/index.vue";
import Block from "./Block/index.vue";
import Notes from "@/components/Notes/index.vue";

import { computed, defineComponent, PropType, ref, inject } from "vue";

import { Context, Phrase } from "./types";

export default defineComponent({
  components: { Block, Notes },
  props: {
    lect: { type: String, default: "" },
    phrase: { type: Object as PropType<Phrase>, default: undefined },
  },
  setup() {
    const context: Context = inject("context", {});

    const glossed = ref(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const blocks = ref([] as any[]);
    // function setBlock(el: object) {
    //   blocks.value.push(el);
    // }

    // const text = computed(() =>
    //   blocks.value
    //     .filter(({ visible }) => visible)
    //     .map((b) => b.$refs.display.text)
    //     .join(" ")
    // );
    function copy() {
      // navigator.clipboard.writeText(text.value);
    }

    return { glossed, context, copy };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
