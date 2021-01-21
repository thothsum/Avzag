<template>
  <EditorCard icon="visibility" header="display" @action="add">
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
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";

import { computed, defineComponent, PropType, inject, Ref } from "vue";
import { Text, Context } from "../types";

export default defineComponent({
  components: { EditorCard },
  props: { modelValue: { type: Array as PropType<Text[]>, default: () => [] } },
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
        .map(({ entity }) => entities.value.indexOf(entity))
        .map((i) => "colored-" + i)
    );

    function add() {
      texts.value.push({ entity: "", plain: "" });
    }
    function remove(i: number) {
      texts.value.splice(i, 1);
    }
    function toggle(i: number) {
      const text = texts.value[i];
      const e = entities.value.indexOf(text.entity);
      text.entity = entities.value[e + 1];
    }

    return { texts, colors, add, remove, toggle };
  },
});
</script>
