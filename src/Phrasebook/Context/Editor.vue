/* eslint-disable vue/no-mutating-props */
<template>
  <EditorCard icon="widgets" header="context" @action="add">
    <div class="col scroll">
      <div v-for="(c, i) in context" :key="i" class="row">
        <input
          v-model="c.entity"
          class="entity"
          :class="'colored-' + i"
          type="text"
        />
        <input v-model="c.tags" class="flex" type="text" />
        <btn icon="clear" @click="remove(i)" />
      </div>
    </div>
  </EditorCard>
</template>

<script>
import EditorCard from "@/components/EditorCard";

export default {
  name: "PhraseContextEditor",
  components: {
    EditorCard,
  },
  props: ["context"],
  methods: {
    add() {
      this.context.push({
        entity: "new entity",
        tags: "tags",
      });
    },
    remove(i) {
      this.$delete(this.context, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.entity {
  width: 96px;
}
.scroll {
  max-height: 128px;
}
</style>
