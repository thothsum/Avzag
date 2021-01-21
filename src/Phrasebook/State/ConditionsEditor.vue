<template>
  <EditorCard icon="tune" header="conditions">
    <template #caption>TODO brief explanation</template>
    <div class="row wrap">
      <template v-for="(cs, i) in colors">
        <btn
          v-for="(c, j) in cs"
          :key="i + '--' + j"
          :text="context[i].tags[j]"
          :class="c"
          @click="toggle(i, j)"
        />
      </template>
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
} from "vue";
import { ContextSource, Conditions } from "../types";

export default defineComponent({
  components: { EditorCard },
  props: {
    modelValue: { type: Object as PropType<Conditions>, default: () => ({}) },
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

    function toggle(ei: number, ti: number) {
      if (!context.value) return;
      const entity = context.value[ei].entity;
      const tag = context.value[ei].tags[ti];

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
      refreshColors();
    }

    const colors = ref([] as string[][]);
    function refreshColors() {
      if (!context.value) return;
      colors.value = [] as string[][];
      context.value.forEach(({ entity, tags }, i) => {
        colors.value.push([]);
        tags.forEach((tag) => {
          let flag = conditions.value[entity]?.[tag] as number;
          flag = flag === undefined ? -1 : flag + 1;
          colors.value[i].push(`colored-dot-${i} colored-border-${flag}`);
        });
      });
    }
    refreshColors();

    return { context, conditions, colors, toggle };
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
