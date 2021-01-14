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
        ref="blocks"
        v-model="context"
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

import { computed, defineComponent, PropType, ref } from "vue";

import { DynamicContext, Phrase } from "./types";

export default defineComponent({
  components: { Block, Notes },
  props: {
    lect: { type: String, default: "" },
    phrase: { type: Object as PropType<Phrase>, default: undefined },
    modelValue: {
      type: Object as PropType<DynamicContext>,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const glossed = ref(false);
    const context = computed({
      get: () => props.modelValue,
      set: (c) => emit("update:modelValue", c),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks = ref([] as any[]);
    function setBlock(el: object) {
      blocks.value.push(el);
    }

    const text = computed(() =>
      blocks.value
        .filter(({ visible }) => visible)
        .map((b) => b.$refs.display.text)
        .join(" ")
    );
    function copy() {
      navigator.clipboard.writeText(text.value);
    }

    return { glossed, context, blocks, setBlock, copy };
  },
});
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
