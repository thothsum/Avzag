<template>
  <div class="row text-caption wrap">
    <div class="icon">info</div>
    <template v-if="any">
      <template v-for="(ts, i) of tags" :key="i">
        <template v-if="ts.length" class="row-0 wrap">
          <p v-for="t in ts" :key="t + '--' + i" :class="'colored-dot-' + i">
            {{ t }}
          </p>
        </template>
      </template>
    </template>
    <template v-else>…</template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, PropType } from "vue";
import { Context, ContextTranslation, Condition, BlockVue } from "../types";

export default defineComponent({
  props: {
    translation: {
      type: Object as PropType<ContextTranslation[]>,
      default: () => [],
    },
    blocks: { type: Array as PropType<BlockVue[]>, default: () => [] },
  },
  setup(props) {
    const context = inject("context", {} as Ref<Context>);

    const dictionary = computed(() => {
      const translation = {
        entities: {} as Record<string, string>,
        tags: {} as Record<string, Record<string, string>>,
      };
      if (props.translation)
        props.translation.forEach(({ entity, tags }) => {
          translation.entities[entity[0]] = entity[1];
          translation.tags[entity[0]] = (tags ?? []).reduce((d, t) => {
            d[t[0]] = t[1];
            return d;
          }, {} as Record<string, string>);
        });
      return translation;
    });

    const explicitContext = computed(
      () =>
        props.blocks
          ?.filter(({ state }) => state)
          .map(({ block, state }) => {
            let all = [] as Condition[];
            if (block.requirements) all = all.concat(block.requirements);
            if (state?.conditions) all = all.concat(state.conditions);
            return all;
          })
          .flat()
          .reduce((c, { entity, tag }) => {
            if (!c[entity]) c[entity] = new Set();
            if (tag) c[entity].add(tag);
            return c;
          }, {} as Context) ?? {}
    );

    function translate(d: undefined | Record<string, string>, k: string) {
      if (d) {
        const t = d[k];
        if (t) return t;
      }
      return k;
    }
    const tags = computed(() =>
      Object.entries(context.value).map(([e, ts]) =>
        [...(ts ?? [])]
          .filter((t) => !explicitContext.value[e]?.has(t))
          .map((t) => translate(dictionary.value.tags[e], t))
      )
    );
    const any = computed(() => tags.value.some((t) => t?.length));

    return { tags, any, explicitContext };
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
