<template>
  <button
    class="inline"
    :class="{large:large, 'txt-faded': value===0, in: value===1, ex: value===-1}"
    @click="update"
  >
    <span class="material-icons-outlined">
      <template v-if="value===-1">remove</template>
      <template v-else-if="value===1">add</template>
      <template v-else>arrow_right</template>
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
  margin: var(--padding);
  font-style: italic;
}
.large {
  font-style: normal;
  font-size: var(--font-size);
  height: var(--control-height);
}
.in,
.in * {
  color: var(--color-select);
}
.ex,
.ex * {
  color: var(--color-alert);
}
</style>
