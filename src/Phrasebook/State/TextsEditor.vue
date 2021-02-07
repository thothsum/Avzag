<template>
  <EditorCard icon="format_color_text" header="texts">
    <template #header>
      <ArrayControl v-model="texts" :add="{}" />
    </template>
    <div class="col">
      <div v-for="(t, i) in texts" :key="i" class="row">
        <btn icon="palette" @click="toggle(i)" />
        <div class="row" :class="highlights[i]">
          <input v-model="t.plain" type="text" placeholder="plain" />
          <input
            v-model="t.ipa"
            class="text-ipa"
            type="text"
            placeholder="ipa"
          />
          <input v-model="t.gloss" type="text" placeholder="gloss" />
        </div>
        <btn icon="clear" @click="texts.splice(i, 1)" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import ArrayControl from "@/components/ArrayControl.vue";

import { computed, defineComponent, PropType, inject, Ref } from "vue";
import { Text, Context } from "../types";

export default defineComponent({
  name: "TextsEditor",
  components: { EditorCard, ArrayControl },
  props: {
    modelValue: { type: Array as PropType<Text[]>, default: undefined },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const context = inject("context", {} as Ref<Context>);
    const entities = computed(() => Object.keys(context.value));

    const texts = computed({
      get: () => props.modelValue,
      set: (t) => emit("update:modelValue", t),
    });
    const highlights = computed(() =>
      texts.value?.map(({ highlight }) =>
        highlight === true
          ? "b"
          : "colored-" + entities.value.indexOf(highlight ?? "")
      )
    );

    function toggle(i: number) {
      const text = texts.value[i];
      if (text.highlight === true) text.highlight = entities.value[0];
      else if (text.highlight) {
        const j = entities.value.indexOf(text.highlight ?? "");
        text.highlight = entities.value[j + 1];
        if (!text.highlight) delete text.highlight;
      } else text.highlight = true;
    }

    return { texts, highlights, toggle };
  },
});
</script>
