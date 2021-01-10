<template>
  <div v-if="notes.length" class="col">
    <p v-for="(ps, i) in pieces" :key="i">
      <template v-for="({ text, display }, j) in ps" :key="j">
        <span v-if="display === 'plain'">{{ text }}</span>
        <span v-else-if="display === 'highlight'" class="highlight-font">{{
          text
        }}</span>
        <b v-else-if="display === 'grapheme'">{{ text }}</b>
        <span v-else class="text-ipa">{{ text }}</span>
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineProps, computed, PropType } from "vue";
import { PieceDisplay, Piece } from "./types";

const props = defineProps({
  notes: { type: Array as PropType<string[]>, default: [] },
});

function isWrapped(text: string, start: string, end: string) {
  return text[0] === start && text[text.length - 1] === end;
}
function toPiece(text: string): Piece {
  const patterns = [
    ["*", "*", "highlight"],
    ["/", "/", "phoneme"],
    ["<", ">", "grapheme"],
  ] as [string, string, PieceDisplay][];

  for (const [start, end, display] of patterns) {
    if (isWrapped(text, start, end))
      return { text: text.slice(1, -1), display };
  }
  return { text, display: "plain" };
}
const pieces = computed(() => {
  const separator = /(\/[^/]+\/|<[^<>]+>|\*[^*]+\*)/g;
  return props.notes.map((n) => n.split(separator).map((n) => toPiece(n)));
});
</script>
