<template>
  <EditorCard button="" icon="tune" header="conditions">
    <template v-if="conditions" #header
      ><btn icon="clear" @click="conditions = {}"
    /></template>
    <template #caption>TODO brief explanation</template>
    <div class="row wrap">
      <div
        v-for="{ entity, tag, color, filter } in tags"
        :key="entity + '--' + tag"
        class="row"
      >
        <div class="row-0">
          <toggle v-model="filter.provide" icon="attachment" />
          <toggle v-model="filter.require" icon="flag" />
        </div>
        <p :class="color">{{ tag }}</p>
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import { computed, defineComponent, PropType, inject, ComputedRef } from "vue";
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
    const tags = computed({
      get: () =>
        (context.value ?? []).reduce(
          (arr, { entity, tags }, i) => {
            tags.forEach((tag) =>
              arr.push({
                tag,
                entity,
                color: "colored-dot-" + i,
                filter: conditions.value[entity]?.[tag] ?? {},
              })
            );
            return arr;
          },
          [] as {
            tag: string;
            entity: string;
            color: string;
            filter: ConditionFilter;
          }[]
        ),
      set: (tags) =>
        (conditions.value = tags.reduce(
          (conditions, { tag, entity, filter }) => {
            if (filter.provide || filter.require) {
              if (!conditions[entity]) conditions[entity] = {};
              conditions[entity][tag] = filter;
            }
            return conditions;
          },
          {} as Conditions
        )),
    });

    return { context, conditions, tags };
  },
});
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
