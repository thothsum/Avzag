<template>
  <img v-if="lect" :src="src" class="no-select" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { root } from "src/store";

export default defineComponent({
  props: { lect: { type: String, default: "" } },
  setup(props) {
    const src = computed(() => root + props.lect + "/flag.png");
    return { src };
  },
});
</script>

<style lang="scss">
.flag {
  position: relative;
  overflow: hidden;
  *:not(img) {
    z-index: 1;
  }
}
</style>

<style lang="scss" scoped>
img {
  pointer-events: none;
  z-index: 0;
  position: absolute;
  right: 0;
  opacity: 0.4;
  mask-image: linear-gradient(transparent, white);
  bottom: -30%;
  height: 112px;
  transform: translate(30%) rotate(-45deg);
  filter: blur(1.5px);
}
</style>
