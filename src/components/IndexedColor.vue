<template>
  <div v-if="classes" class="panel-horizontal-dense line" :class="{ passive }">
    <div class="dash" :class="c" :key="i" v-for="(c, i) in classes" />
  </div>
</template>

<script>
export default {
  name: "IndexedColor",
  props: ["indexes", "passive"],
  computed: {
    classes() {
      return this.indexes.map((i) => "colored-" + i);
    },
  },
};
</script>

<style lang="scss" scoped>
$colors: #81c784, #e57373, #64b5f6, #ffb74d #9575cd, #a1887f;
@for $i from 0 through 4 {
  .colored-#{$i} {
    background-color: nth($colors, $i + 1);
  }
}
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
