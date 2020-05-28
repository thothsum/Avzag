<template>
  <button :class="{large:large, 'txt-faded': value===0}" @click="update">
    <span class="material-icons-outlined">
      <template v-if="value===-1">remove</template>
      <template v-else-if="value===1">add</template>
      <template v-else>add</template>
    </span>
    {{text}}
  </button>
</template>

<script>
export default {
  name: "QueryParam",
  props: ["large", "text", "value"],
  model: {
    prop: "value",
    event: "update"
  },
  methods: {
    update() {
      this.$emit("update", ((this.value + 2) % 3) - 1);
    }
  }
};
</script>

<style scoped>
button {
  margin: 5px;
}
</style>