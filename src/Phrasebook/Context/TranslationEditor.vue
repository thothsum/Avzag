<template>
  <EditorCard
    :button="translation ? '' : 'queue'"
    icon="format_list_bulleted"
    header="context translation"
    @action="create"
  >
    <template #caption>
      Translate the context tags to show localized hints when needed.
    </template>
    <template v-if="translation" #header>
      <ButtonAlert @confirm="translation = undefined" />
    </template>
    <template v-if="translation">
      <div
        v-for="({ entity, tags }, i) in context"
        :key="entity"
        class="col"
        :class="'colored-dot-' + i"
      >
        <h2 class="text-caption">{{ entity }}</h2>
        <div class="row wrap">
          <input
            v-for="tag in tags"
            :key="tag"
            v-model="translation[entity][tag]"
            :placeholder="tag"
            type="text"
          />
        </div>
      </div>
    </template>
  </EditorCard>
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";
import EditorCard from "@/components/EditorCard.vue";

import { computed, defineComponent, inject, PropType, ComputedRef } from "vue";
import { ContextSource, ContextTranslation } from "../types";

export default defineComponent({
  name: "TranslationEditor",
  components: {
    ButtonAlert,
    EditorCard,
  },
  props: {
    modelValue: {
      type: Object as PropType<undefined | ContextTranslation>,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const translation = computed({
      get: () => props.modelValue,
      set: (t) => emit("update:modelValue", t),
    });
    const context = inject(
      "contextSource",
      {} as ComputedRef<undefined | ContextSource[]>
    );
    function create() {
      if (!context?.value) return;
      translation.value = context.value.reduce((t, { entity }) => {
        t[entity] = {};
        return t;
      }, {} as ContextTranslation);
    }

    return { translation, context, create };
  },
});
</script>

<style lang="scss" scoped>
input {
  width: 64px;
}
</style>
