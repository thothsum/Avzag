<template>
  <EditorCard icon="tune" header="conditions">
    <template #caption>TODO brief explanation</template>
    <div class="scroll col">
      <div
        v-for="({ entity, tags }, i) in context"
        :key="entity"
        class="scroll row"
        :class="'colored-dot-' + i"
      >
        <btn
          v-for="tag in tags"
          :key="tag"
          :text="tag"
          :class="getColor(entity, tag)"
          @click="toggle(entity, tag)"
        />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import { computed, defineComponent, PropType, inject } from "vue";
import { ContextSource, Conditions } from "../types";

export default defineComponent({
  components: { EditorCard },
  props: {
    modelValue: { type: Object as PropType<Conditions>, default: () => ({}) },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // TODO make reactive Ref<>
    const context = inject("contextSource", [] as ContextSource[]);
    const entityColors = computed(() =>
      context.map((s, i) => "colored-dot-" + i)
    );

    const conditions = computed({
      get: () => props.modelValue,
      set: (c) => emit("update:modelValue", c),
    });

    function toggle(entity: string, tag: string) {
      if (!conditions.value[entity]) conditions.value[entity] = {};
      const condition = conditions.value[entity];

      if (condition[tag]) {
        condition[tag] -= 1;
        if (condition[tag] < -1) {
          delete condition[tag];
          if (!Object.keys(condition).length) delete conditions.value[entity];
        }
      } else condition[tag] = 1;
    }
    function getColor(entity: string, tag: string) {
      const flag = conditions.value[entity]?.[tag];
      if (flag === undefined) return "";
      return "colored-border-" + (flag + 1);
    }
    return { context, conditions, entityColors, toggle, getColor };
  },
});
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
btn {
  border: transparent $border-width;
}
</style>
