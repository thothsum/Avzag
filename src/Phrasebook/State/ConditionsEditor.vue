<template>
  <EditorCard icon="tune" header="conditions">
    <template #header>
      <btn icon="clear" @click="conditions = undefined" />
    </template>
    <template #caption>TODO brief explanation</template>
    <div class="row wrap">
      <button
        v-for="({ entity, tag, color, select }, i) in tags"
        :key="entity + '--' + tag"
        :class="'select-' + select"
        @click="toggle(i)"
      >
        <span :class="color">{{ tag }}</span>
      </button>
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
    const tags = ref(
      [] as {
        tag: string;
        entity: string;
        color: string;
        select: string;
        flag?: boolean;
      }[]
    );
    watch(
      [context, conditions],
      ([context, conditions]) => {
        if (!context) return;
        tags.value = context.flatMap(({ entity, tags }, i) =>
          tags.map((tag) => {
            const flag = conditions?.[entity]?.[tag];
            return {
              tag,
              entity,
              color: "colored-dot-" + i,
              select:
                flag === undefined ? "false" : (flag ? "" : "alt-") + "true",
              flag,
            };
          })
        );
      },
      { immediate: true, deep: true }
    );
    function toggle(index: number) {
      if (!tags.value) return;
      const { flag, entity, tag } = tags.value[index];
      const cnd = conditions.value ?? ({} as Conditions);

      if (flag === undefined) {
        if (!cnd[entity]) cnd[entity] = {};
        cnd[entity][tag] = true;
      } else if (flag) cnd[entity][tag] = false;
      else {
        delete cnd[entity][tag];
        if (!Object.keys(cnd[entity]).length) delete cnd[entity];
      }
      conditions.value = cnd;
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
