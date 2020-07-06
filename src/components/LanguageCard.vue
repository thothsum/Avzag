<template>
  <div class="card panel-dense no-select" @click="open">
    <div id="flag">
      <img :src="flag" draggable="false" alt="flag" />
    </div>
    <div class="panel-horizontal">
      <h2>{{language}}</h2>
      <p class="panel" tooltip="work in progress">
        <span class="icon" v-if="info.wip">construction</span>
      </p>
    </div>
    <div class="panel-solid scroll">
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
  },
  methods: {
    open() {
      this.$router.push({ name: "Map", params: { lang: this.language } });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: map-get($shadows, "elevated");
    img {
      opacity: 0.7;
    }
  }
  &:active img {
    opacity: 0.9;
  }
  * {
    z-index: 1;
  }
}
.scroll {
  padding-bottom: map-get($margins, "half");
}
#flag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
img {
  filter: blur(1px);
  pointer-events: none;
  z-index: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  opacity: 0.5;
  transform: translate(30%, 30%) rotate(-20deg);
  mask-image: linear-gradient(transparent, white);
}
</style>
