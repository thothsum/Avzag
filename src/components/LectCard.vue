<template>
  <div class="panel-horizontal card">
    <div class="text">
      <h2 class="panel-horizontal">
        {{ lect.name }}
        <p v-if="selected" class="icon highlight">check</p>
      </h2>
      <p class="text-caption">{{ family }}</p>
    </div>
    <img :src="flag" />
  </div>
</template>

<script>
export default {
  name: "LectCard",
  props: ["lect", "selected", "query"],
  computed: {
    family() {
      return this.lect.family.join(" › ");
    },
    flag() {
      return this.lect.flag
        ? this.$store.state.root + "../flags/" + this.lect.flag + ".png"
        : null;
    },
    tags() {
      return this.lect.tags + " " + this.lect.family.join(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  user-select: none;
}
.card {
  background-color: var(--color-background);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &:hover img {
    transform: translate(25%, 30%) rotate(-45deg);
  }
  &:active img {
    opacity: 1;
  }
  img {
    pointer-events: none;
    z-index: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2.5 * 100%;
    opacity: 0.5;
    transform: translate(30%, 30%) rotate(-45deg);
    mask-image: linear-gradient(transparent, white);
  }
}
</style>
