<template>
  <button :class="{in: value===1, ex: value===-1}" @click="update">
    <span class="material-icons-outlined">
      <template v-if="value===-1">remove</template>
      <template v-else-if="value===1">add</template>
      <template v-else>arrow_right</template>
    </span>
    <p>{{text}}</p>
  </button>
</template>

<script>
export default {
  name: "QueryParam",
  props: ["text", "value"],
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

<style lang="scss" scoped>
button {
  border: var(--border-width) solid transparent;
}
.in,
.in * {
  border-color: var(--color-select);
}
.ex,
.ex * {
  border-color: var(--color-alert);
}
</style>
