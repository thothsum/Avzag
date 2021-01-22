<template>
  <EditorCard button="" icon="tune" header="conditions">
    <template v-if="conditions" #header
      ><btn icon="clear" @click="conditions = {}"
    /></template>
    <template #caption>TODO brief explanation</template>
    <div class="row wrap">
      <btn
        v-for="{ entity, tag, color } in tags"
        :key="entity + '--' + tag"
        :text="tag"
        :class="color"
        @click="toggle(entity, tag)"
      />
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
} from "vue";
import { ContextSource, Conditions } from "../types";

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
    const tags = ref([] as { tag: string; entity: string; color: string }[]);

    watch([context, conditions], refreshColors, {
      immediate: true,
      deep: true,
    });

    function toggle(entity: string, tag: string) {
      if (!conditions.value[entity]) conditions.value[entity] = {};
      const condition = conditions.value[entity];

      if (condition[tag] === undefined) condition[tag] = 1;
      else {
        condition[tag] -= 1;
        if (condition[tag] < -1) {
          delete condition[tag];
          if (!Object.keys(condition).length) delete conditions.value[entity];
        }
      }
    }

    function refreshColors() {
      if (!context?.value) return;
      tags.value = [];
      context.value.forEach(({ entity, tags: ts }, i) => {
        ts.forEach((tag) => {
          let flag = conditions.value[entity]?.[tag] as number;
          flag = flag === undefined ? -1 : flag + 1;
          tags.value.push({
            tag,
            entity,
            color: `colored-dot-${i} colored-border-${flag}`,
          });
        });
      });
    }

    return { context, conditions, tags, toggle };
  },
});
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
