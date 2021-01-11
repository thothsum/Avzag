<template>
  <div v-if="translation" class="col-1 card">
    <div class="row-1 small">
      <control icon="content_copy" @click="copy" />
      <h2>{{ lect }}</h2>
    </div>
    <Context
      v-if="interactive"
      :context="context"
      :translation="translation.context"
      :blocks="$refs.blocks"
    />
    <div class="row wrap flex">
      <Block
        v-for="(b, i) in translation.blocks"
        :id="id"
        :key="i"
        ref="blocks"
        :context="context"
        :interactive="options.interactive"
        :glossed="options.glossed"
        :block="b"
        @update:context="$emit('update:context', $event)"
      />
    </div>
    <Notes v-if="showNotes" class="text-caption" :notes="translation.notes" />
  </div>
</template>

<script setup lang="ts">
import Context from "./Context";
import Block from "./Block";
import Notes from "@/components/Notes";

import { computed, defineProps, onBeforeUpdate, PropType, ref } from "vue";
import * as Types from "./types";

const props = defineProps({
  id: { type: String, default: "" },
  lect: { type: String, default: "" },
  context: { type: Object as PropType<Types.DynamicContext>, default: {} },
  options: {
    type: Object as PropType<Types.PhraseTranslationOptions>,
    default: {},
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blocks = ref([] as any[]);
const text = computed(() =>
  blocks.value
    .filter(({ visible }) => visible)
    .map((b) => b.$refs.display.text)
    .join(" ")
);
onBeforeUpdate(() => (blocks.value = []));
function setBlock(el: object) {
  blocks.value.push(el);
}
function copy() {
  navigator.clipboard.writeText(text.value);
}
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
