<template>
  <ActionHeader @action="add" icon="widgets" header="context">
    <div class="col scroll">
      <div class="row" :key="i" v-for="(c, i) in context">
        <input
          class="entity"
          :class="'colored-' + i"
          type="text"
          v-model="c.entity"
        />
        <input class="flex" type="text" v-model="c.tags" />
        <Button icon="clear" @click.native="remove(i)" />
      </div>
    </div>
  </ActionHeader>
</template>

<script>
import Button from "./Button";
import ActionHeader from "./ActionHeader";

export default {
  name: "PhraseContextEditor",
  components: {
    Button,
    ActionHeader,
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
