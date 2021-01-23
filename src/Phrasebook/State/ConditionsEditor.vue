<template>
  <EditorCard button="" icon="tune" header="conditions">
    <template v-if="conditions" #header
      ><btn icon="clear" @click="conditions = {}"
    /></template>
    <template #caption>TODO brief explanation</template>
    <div class="row-1 block-editor wrap">
      <div
        v-for="({ entity, tag, color, filter }, i) in tags"
        :key="entity + '--' + tag"
        class="row"
      >
        <div class="row-0">
          <toggle
            v-model="filter.provide"
            icon="send"
            class="row-0"
            @update:modelValue="apply(i)"
          />
          <toggle
            v-model="filter.require"
            icon="lock"
            class="row-0"
            @update:modelValue="apply(i)"
          />
        </div>
        <p :class="color">{{ tag }}</p>
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import {
  computed,
  defineComponent,
  PropType,
  inject,
  ComputedRef,
  ref,
  watch,
  nextTick,
} from "vue";
import { ContextSource, Conditions, ConditionFilter } from "../types";

export default defineComponent({
  name: "ConditionsEditor",
  components: { EditorCard },
  props: {
    modelValue: { type: Object as PropType<Conditions>, default: undefined },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const context = inject(
      "contextSource",
      {} as ComputedRef<undefined | ContextSource[]>
    );
    const conditions = computed({
      get: () => props.modelValue,
      set: (c) => emit("update:modelValue", c),
    });
    const tags = ref(
      [] as {
        tag: string;
        entity: string;
        color: string;
        filter: ConditionFilter;
      }[]
    );
    watch(
      [context, conditions],
      ([context, conditions]) => {
        if (!context || !conditions) return;
        tags.value = context.flatMap(({ entity, tags }, i) =>
          tags.map((tag) => ({
            tag,
            entity,
            color: "colored-dot-" + i,
            filter: conditions[entity]?.[tag] ?? {},
          }))
        );
      },
      { immediate: true, deep: true }
    );
    function apply(index: number) {
      nextTick(() => {
        if (!tags.value) return;
        const { filter, entity, tag } = tags.value[index];
        if (filter.provide || filter.require) {
          if (!conditions.value[entity]) conditions.value[entity] = {};
          conditions.value[entity][tag] = filter;
        } else {
          delete conditions.value[entity][tag];
          if (!Object.keys(conditions.value[entity]).length)
            delete conditions.value[entity];
        }
      });
    }

    return { context, conditions, tags, apply };
  },
});
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
