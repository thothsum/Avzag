<template>
  <div class="row text-caption wrap">
    <div class="icon">info</div>
    <template v-if="any">
      <template v-for="(tags, i) of translated" :key="i">
        <template v-if="tags.length" class="row-0 wrap">
          <p
            v-for="tag in tags"
            :key="tag + '--' + i"
            :class="'colored-dot-' + i"
          >
            {{ tag }}
          </p>
        </template>
      </template>
    </template>
    <template v-else>…</template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, PropType } from "vue";
import { Context, ContextTranslation, BlockSnapshot } from "../types";

export default defineComponent({
  name: "Context",
  props: {
    translation: {
      type: Object as PropType<ContextTranslation>,
      default: () => ({}),
    },
    blocks: { type: Array as PropType<BlockSnapshot[]>, default: () => [] },
  },
  setup(props) {
    const context = inject("context", {} as Ref<Context>);

    const explicit = computed(() => {
      const result = {} as Context;
      for (const { state } of props.blocks) {
        const condition = state?.conditions;
        if (!condition) continue;
        Object.entries(condition).forEach(([entity, tags]) =>
          Object.entries(tags).forEach(([tag]) => {
            if (!result[entity]) result[entity] = new Set();
            result[entity].add(tag);
          })
        );
      }
      return result;
    });

    function translate(d: undefined | Record<string, string>, k: string) {
      return d?.[k] || k;
    }
    const translated = computed(() =>
      Object.entries(context.value).map(([entity, tags]) =>
        [...tags]
          .filter((tag) => !explicit.value[entity]?.has(tag))
          .map((tag) => translate(props.translation?.[entity], tag))
      )
    );
    const any = computed(() => translated.value.some((tags) => tags?.length));

    return { translated, any };
  },
});
</script>

<style lang="scss" scoped>
div.icon {
  font-size: map-get($font-sizes, "small");
}
p:not(:last-child)::after {
  content: ",";
}
</style>
