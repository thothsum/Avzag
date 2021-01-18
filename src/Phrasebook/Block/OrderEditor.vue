<template>
  <EditorCard v-if="mphrase" icon="account_tree" header="Blocks" @action="add">
    <template v-if="block" #header>
      <ArrayShift v-model="blocks" :item="block" />
      <p class="text-dot" />
      <ButtonAlert @confirm="remove" />
    </template>
    <Context />
    <div class="row-1 wrap block-editor">
      <div v-for="(b, i) in blocks" :key="keys[i]" class="row">
        <btn icon="edit" :is-on="block === b" @click="block = b" />
        <VBlock :block="b" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import ArrayShift from "@/components/ArrayShift.vue";
import ButtonAlert from "@/components/ButtonAlert.vue";
import Context from "../Context/index.vue";
import VBlock from "./index.vue";

import { computed, defineComponent, PropType, toRaw, watch } from "vue";
import { CorpusPhrase, Block } from "../types";

export default defineComponent({
  components: { EditorCard, ArrayShift, ButtonAlert, Context, VBlock },
  props: {
    modelValue: { type: Object as PropType<Block>, default: undefined },
    phrase: { type: Object as PropType<CorpusPhrase>, default: () => ({}) },
  },
  emits: ["update:modelValue", "update:phrase"],
  setup(props, { emit }) {
    const mphrase = computed({
      get: () => props.phrase,
      set: (p) => emit("update:modelValue", p),
    });
    const blocks = computed({
      get: () => mphrase.value.blocks,
      set: (bs) => (mphrase.value.blocks = bs),
    });
    const block = computed({
      get: () => props.modelValue,
      set: (b) => emit("update:modelValue", b),
    });
    const keys = computed(() =>
      blocks.value.map(
        (_, i) => mphrase.value.id + "--" + i + "--" + Math.random()
      )
    );

    function pickLast() {
      if (blocks.value) block.value = blocks.value[blocks.value.length - 1];
    }
    watch(blocks, pickLast, {
      immediate: true,
    });

    function add() {
      blocks.value.push({
        states: [{ display: [{ text: "new state" }], transition: "next" }],
      });
      pickLast();
    }
    function remove() {
      const index = toRaw(blocks.value).indexOf(toRaw(block.value));
      blocks.value.splice(index, 1);
      pickLast();
    }

    return { mphrase, blocks, block, add, remove, keys };
  },
});
</script>
