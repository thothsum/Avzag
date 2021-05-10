<template>
  <EditorCard v-if="mphrase" icon="widgets" header="Blocks">
    <template #header>
      <ArrayControl
        v-model="blocks"
        v-model:item="block"
        :add="() => [newState()]"
        copy
        shift
        remove
      />
    </template>
    <Context :translation="phrase.id ? null : phrase.context" />
    <div class="row-1 wrap blocks">
      <div v-for="(b, i) in blocks" :key="i + '--' + Math.random()" class="row">
        <btn icon="edit" :is-on="block === b" @click="block = b" />
        <Block :block="b" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import Context from "../Context/index.vue";
import Block from "./index.vue";

import { computed, defineComponent, PropType } from "vue";
import { Phrase, CorpusPhrase, State } from "../types";
import { newState } from "../utils";

export default defineComponent({
  name: "OrderEditor",
  components: { Context, Block },
  props: {
    modelValue: {
      type: Array as PropType<State[] | undefined>,
      default: undefined,
    },
    phrase: {
      type: Object as PropType<Phrase | CorpusPhrase>,
      default: undefined,
    },
  },
  emits: ["update:modelValue", "update:phrase"],
  setup(props, { emit }) {
    const block = computed({
      get: () => props.modelValue,
      set: (b) => emit("update:modelValue", b),
    });
    const mphrase = computed({
      get: () => props.phrase,
      set: (p) => emit("update:modelValue", p),
    });
    const blocks = computed({
      get: () => mphrase.value.blocks,
      set: (bs) => (mphrase.value.blocks = bs),
    });

    return { mphrase, blocks, block, newState };
  },
});
</script>

<style lang="scss" scoped>
.blocks {
  gap: 4px 8px;
}
</style>
