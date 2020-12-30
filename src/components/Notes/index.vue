<template>
  <div v-if="notes?.length" class="col text-caption">
    <p v-for="(ps, i) in pieces" :key="i">
      <template v-for="{ text, type } in ps" :key="text">
        <span v-if="type === 'text'">{{ text }}</span>
        <b v-else-if="type === 'grapheme'">{{ text }}</b>
        <span v-else class="text-ipa">{{ text }}</span>
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineProps, computed, PropType } from "vue";

const props = defineProps({
  notes: { type: Array as PropType<string[]>, default: [] },
});

interface Piece {
  text: string;
  type: "text" | "grapheme" | "phoneme";
}

const isWrapped = (text: string, start: string, end: string) =>
  text[0] === start && text[text.length - 1] === end;

const toPiece = (text: string): Piece =>
  isWrapped(text, "/", "/")
    ? { text: text.slice(1, -1), type: "phoneme" }
    : isWrapped(text, "<", ">")
    ? { text: text.slice(1, -1), type: "grapheme" }
    : { text, type: "text" };

const pieces = computed(() =>
  props.notes.map((n) => n.split(/(\/[^/<>]+\/|<.+>)/g).map((n) => toPiece(n)))
);
</script>
