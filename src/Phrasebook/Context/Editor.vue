<template>
  <EditorCard icon="widgets" header="context" @action="add">
    <div class="col scroll">
      <div v-for="(c, i) in context" :key="i" class="row">
        <input
          v-model="c.entity"
          class="entity"
          :class="'colored-' + i"
          type="text"
          placeholder="entity"
        />
        <input v-model="tags[i]" class="flex" type="text" placeholder="tags" />
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import { computed, defineComponent, PropType, watch, ref } from "vue";
import { ContextSource } from "../types";

export default defineComponent({
  components: { EditorCard },
  props: {
    modelValue: { type: Array as PropType<ContextSource[]>, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const context = computed({
      get: () => props.modelValue,
      set: (c) => emit("update:modelValue", c),
    });
    const tags = computed({
      get: () => context.value.map(({ tags }) => tags.join(" ")),
      set: (ts) => {
        console.log("updaring tags");
        context.value.forEach((c, i) => (c.tags = ts[i].split(" ")));
      },
    });

    function add() {
      context.value.push({
        entity: "entity #" + context.value.length,
        tags: [],
      });
    }
    function remove(i: number) {
      context.value.splice(i, 1);
    }
    return { context, tags, add, remove };
  },
});
</script>

<style lang="scss" scoped>
.entity {
  width: 96px;
}
.scroll {
  max-height: 128px;
}
</style>
