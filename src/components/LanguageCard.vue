<template>
  <div
    class="card panel-dense"
    @click="$router.push({ name: 'Phonology', params: { lang: language } })"
  >
    <img :src="flag" draggable="false" alt="flag" />
    <h2>{{ language }}</h2>
    <div class="list">
      <p :key="i" v-for="(lc, i) in lects">{{ lc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageCard",
  props: ["language"],
  computed: {
    flag() {
      return this.$store.state.root + this.language + "/flag.png";
    },
    info() {
      return this.$store.state.catalogue[this.language];
    },
    lects() {
      return Object.values(this.info.lects).sort((a, b) => a.localeCompare(b));
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 150px;
  height: 175px;
  position: relative;
  overflow: hidden;
  text-shadow: var(--shadow);
  user-select: none;
  &:hover {
    cursor: pointer;
    box-shadow: var(--shadow-elevated);
    img {
      opacity: 0.6;
    }
  }
  * {
    z-index: 1;
  }
}
img {
  z-index: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  opacity: 0.4;
  transform: translate(30%, 30%) rotate(-45deg);
  mask-image: linear-gradient(transparent, white);
}
</style>
