<template>
  <div v-if="classes" class="row line" :class="{ passive }">
    <div class="dash" :class="c" v-for="c in classes" />
  </div>
</template>

<script>
export default {
  name: "IndexedColor",
  props: ["indexes", "passive"],
  computed: {
    classes() {
      return this.indexes.map((i) => "colored-back-" + i);
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-radius;
  width: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  .dash {
    height: 100%;
    width: 4 * $border-radius;
  }
  &.passive {
    top: 0;
  }
  &:not(.passive) {
    bottom: 0;
    .dash {
      flex: 1;
    }
  }
}
</style>
