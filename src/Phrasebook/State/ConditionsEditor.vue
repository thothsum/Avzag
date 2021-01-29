<template>
  <EditorCard icon="tune" header="conditions">
    <template v-if="conditions" #header>
      <btn icon="clear" @click="conditions = {}" />
    </template>
    <template #caption>TODO brief explanation</template>
    <div class="row-1 block-editor wrap">
      <button
        v-for="({ entity, tag, color, icon, flag }, i) in tags"
        :key="entity + '--' + tag"
        @click="toggle(i)"
      >
        <p class="icon" :class="{ ['colored-' + color]: flag !== undefined }">
          {{ icon }}
        </p>
        <p :class="'colored-dot-' + color">{{ tag }}</p>
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
        icon: string;
        color: number;
        flag?: boolean;
      }[]
    );
    watch(
      [context, conditions],
      ([context, conditions]) => {
        if (!context || !conditions) return;
        tags.value = context.flatMap(({ entity, tags }, i) =>
          tags.map((tag) => {
            const flag = conditions[entity]?.[tag];
            const icon =
              flag === undefined ? "arrow_right" : flag ? "send" : "lock";

            return {
              tag,
              entity,
              icon,
              color: i,
              flag: flag,
            };
          })
        );
      },
      { immediate: true, deep: true }
    );
    function toggle(index: number) {
      if (!tags.value) return;
      const { flag, entity, tag } = tags.value[index];
      if (flag === undefined) {
        if (!conditions.value[entity]) conditions.value[entity] = {};
        conditions.value[entity][tag] = true;
      } else if (flag) conditions.value[entity][tag] = false;
      else {
        delete conditions.value[entity][tag];
        if (!Object.keys(conditions.value[entity]).length)
          delete conditions.value[entity];
      }
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
