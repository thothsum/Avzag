<template>
  <EditorCard icon="format_color_text" header="texts">
    <template #header>
      <ArrayControl v-model="texts" :default-item="{}" />
    </template>
    <div class="col">
      <div v-for="(t, i) in texts" :key="i" class="row">
        <btn icon="palette" @click="toggle(i)" />
        <div class="row" :class="colors[i]">
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
    const colors = computed(() =>
      texts.value
        ?.map(({ entity }) => entities.value.indexOf(entity ?? ""))
        .map((i) => "colored-" + i)
    );

    function toggle(i: number) {
      const text = texts.value[i];
      const e = entities.value.indexOf(text.entity ?? "");
      text.entity = entities.value[e + 1];
    }

    return { texts, colors, toggle };
  },
});
</script>
