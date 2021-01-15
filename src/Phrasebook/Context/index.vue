<template>
  <div v-if="any" class="row text-caption text-faded wrap">
    <template v-for="(ts, i) of tags" :key="i">
      <div v-if="ts.length" class="row wrap">
        <h2 :class="'colored-dot-' + i">{{ entities[i] }}</h2>
        <p v-for="t in ts" :key="t">{{ t }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import { Context, ContextTranslation, Condition } from "../types";

type BlockVue = {
  visible: boolean;
  requirements?: Condition[];
  conditions?: Condition[];
};

export default defineComponent({
  props: {
    translation: {
      type: Object as PropType<ContextTranslation>,
      default: () => [],
    },
    blocks: { type: Array as PropType<BlockVue[]>, default: () => [] },
  },
  setup(props) {
    const context = inject("context", {} as Context);

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
          ?.filter(({ visible }) => visible)
          .map(({ requirements, conditions }) => {
            let all = [] as Condition[];
            if (requirements) all = all.concat(requirements);
            if (conditions) all = all.concat(conditions);
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
    const entities = computed(() =>
      Object.keys(context).map((e) => translate(dictionary.value.entities, e))
    );
    const tags = computed(() =>
      Object.entries(context).map(([e, ts]) =>
        [...(ts ?? [])]
          .filter((t) => !explicitContext.value[e]?.has(t))
          .map((t) => translate(dictionary.value.tags[e], t))
      )
    );
    const any = computed(() => tags.value.some((t) => t?.length));

    return { entities, tags, any, explicitContext };
  },
});
</script>

<style lang="scss" scoped>
h2::after {
  content: ":";
}
p::after {
  content: ",";
}
p:last-child::after {
  content: ".";
}
</style>
