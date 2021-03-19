<template>
  <div v-if="notes.length" class="col">
    <p v-for="(ps, i) in pieces" :key="i">
      <template v-for="({ text, display }, j) in ps" :key="j">
        <span v-if="display === 'plain'">{{ text }}</span>
        <span v-else-if="display === 'highlight'" class="highlight-font">
          {{ text }}
        </span>
        <b v-else-if="display === 'bold'">{{ text }}</b>
        <i v-else-if="display === 'italic'">{{ text }}</i>
        <span v-else class="text-ipa">{{ text }}</span>
      </template>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, PropType, defineComponent, watchEffect } from "vue";
import { PieceDisplay, Piece } from "./types";

export default defineComponent({
  name: "Notes",
  props: {
    notes: { type: Array as PropType<string[]>, default: () => [] },
  },
  emits: ["texts"],
  setup(props, { emit }) {
    function toPiece(text: string): Piece {
      const syntax = [
        ["^", "highlight"],
        ["/", "phoneme"],
        ["*", "bold"],
        ["_", "italic"],
      ] as [string, PieceDisplay][];

      for (const [mark, display] of syntax) {
        if (text.startsWith(mark) && text.endsWith(mark))
          return { text: text.slice(1, -1), display };
      }
      return { text, display: "plain" };
    }
    const pieces = computed(() => {
      const separator = /(\/[^/]+\/|\^[^^]+\^|\*[^*]+\*|_[^_]+_)/g;
      return props.notes
        .map((n) =>
          n
            .split(separator)
            .filter((n) => n)
            .map((n) => toPiece(n))
        )
        .filter((n) => n.length);
    });
    watchEffect(() =>
      emit(
        "texts",
        pieces.value.map((p) => p.map(({ text }) => text).join(""))
      )
    );

    return { pieces };
  },
});
</script>
