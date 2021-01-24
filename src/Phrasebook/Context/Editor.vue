<template>
  <EditorCard icon="list_alt" header="context">
    <template #header>
      <ArrayControl v-model="context" :add="{}" />
    </template>
    <div class="col scroll">
      <div v-for="(c, i) in context" :key="i" class="row">
        <input
          v-model="c.entity"
          class="entity"
          :class="'colored-' + i"
          type="text"
          placeholder="entity"
        />
        <input
          v-model="tags[i]"
          class="flex"
          type="text"
          placeholder="tags"
          @change="update(i)"
        />
        <btn icon="clear" @click="context.splice(i, 1)" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import ArrayControl from "@/components/ArrayControl.vue";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { ContextSource } from "../types";

export default defineComponent({
  name: "ContextEditor",
  components: { EditorCard, ArrayControl },
  props: {
    modelValue: {
      type: Array as PropType<ContextSource[]>,
      default: undefined,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const context = computed({
      get: () => props.modelValue,
      set: (c) => emit("update:modelValue", c),
    });
    const tags = ref([] as string[]);
    watch(
      context,
      (context) =>
        (tags.value = context?.map(({ tags }) => tags?.join(" ") ?? "") ?? []),
      { immediate: true, deep: true }
    );

    function add() {
      if (!context.value) context.value = [];
      context.value.push({
        entity: "entity #" + context.value.length,
        tags: [],
      });
    }
    function update(i: number) {
      context.value[i].tags = tags.value[i].split(" ").filter((t) => t);
    }

    return { context, tags, add, update };
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
