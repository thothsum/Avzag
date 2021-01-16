<template>
  <EditorCard
    :button="translation ? '' : 'queue'"
    icon="format_list_bulleted"
    header="context translation"
    @action="add"
  >
    <template #caption><slot /></template>
    <template v-if="translation" #header>
      <ButtonAlert @confirm="translation = null" />
    </template>
    <template v-if="translation">
      <div v-for="(e, i) in entities" :key="i" class="row wrap">
        <div class="row wrap block-editor">
          <div class="col">
            <h2 class="text-caption" :class="colors[i]">{{ e[0] }}</h2>
            <input v-model="e[1]" :size="sizes[i].entity" type="text" />
          </div>
          <div v-for="(t, j) in tags[i]" :key="t[0]" class="col">
            <p class="text-caption">{{ t[0] }}</p>
            <input v-model="t[1]" :size="sizes[i].tags[j]" type="text" />
          </div>
        </div>
      </div>
    </template>
  </EditorCard>
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";
import EditorCard from "@/components/EditorCard.vue";
import { computed, defineComponent, PropType } from "vue";
import { ContextSource, ContextTranslation } from "../types";

export default defineComponent({
  name: "PhraseContextTranslationEditor",
  components: {
    ButtonAlert,
    EditorCard,
  },
  props: {
    modelValue: {
      type: Object as PropType<ContextTranslation[]>,
      default: () => [],
    },
    context: { type: Object as PropType<ContextSource[]>, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const translation = computed({
      get: () => props.modelValue,
      set: (t) => emit("update:modelValue", t),
    });

    const entities = computed(() => translation.value.map((t) => t.entity));
    const tags = computed(() => translation.value.map((t) => t.tags));
    const sizes = computed(() =>
      translation.value.map(({ entity, tags }) => ({
        entity: Math.max(entity[1].length, 1),
        tags: tags.map((t) => Math.max(t[1].length, 1)),
      }))
    );
    const colors = computed(() =>
      entities.value.map((_, i) => "colored-dot-" + i)
    );

    function add() {
      translation.value = props.context.map(({ entity, tags }) => ({
        entity: [entity, ""],
        tags: tags.split(" ").map((t) => [t, ""]),
      }));
    }

    return { add, entities, tags, sizes, colors };
  },
});
</script>
