<template>
  <div id="root">
    <button class="panel-horizontal card">
      <div class="text">
        <h2 class="panel-horizontal">
          {{ lect.name }}
          <p v-if="selected" class="icon highlight">check</p>
        </h2>
        <p class="text-caption">{{ family }}</p>
      </div>
      <div class="flag" v-if="flag">
        <img :src="flag" />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "LectCard",
  props: ["lect", "selected"],
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
}
#root {
  background-color: var(--color-background);
}
button {
  position: relative;
  width: 100%;
  height: 100%;
}
.flag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    user-select: none;
    pointer-events: none;
    z-index: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2 * 100%;
    opacity: 0.5;
    transform: translate(30%, 25%) rotate(-45deg);
    mask-image: linear-gradient(transparent, white);
  }
}
</style>
