<template>
  <div v-if="classes" class="row line" :class="{ passive }">
    <p v-for="(c, i) in classes" :key="i" class="dash" :class="c" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "IndexedColor",
  props: {
    indexes: { type: Array as PropType<number[]>, default: () => [] },
    passive: Boolean,
  },
  setup(props) {
    const classes = computed(() =>
      props.indexes.map((i) => "colored-back-" + i)
    );
    return { classes };
  },
});
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
  }
}
</style>
