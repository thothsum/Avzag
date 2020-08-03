<template>
  <div class="card panel-dense no-select" @click="open">
    <div id="flag">
      <img :src="flag" draggable="false" alt="flag" />
    </div>
    <div class="panel-horizontal">
      <h2>{{language}}</h2>
      <div v-if="info.wip" class="panel-solid text-faded wip">
        <span class="icon">construction</span>
        <span class="text-caption">work in progress</span>
      </div>
    </div>
    <div id="lects" class="panel-solid">
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
    },
  },
  methods: {
    open() {
      this.$router.push({ name: "Phonology", params: { lang: this.language } });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: map-get($shadows, "elevated");
    img {
      opacity: 0.75;
    }
  }
  &:active img {
    opacity: 1;
  }
  * {
    z-index: 1;
  }
}
.wip {
  align-content: flex-end;
  width: min-content;
  text-align: right;
  position: absolute;
  right: map-get($margins, "normal");
  top: map-get($margins, "normal");
}
#lects {
  flex-wrap: wrap;
  place-content: flex-start;
  column-gap: 10px;
  > * {
    width: min-content;
  }
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
  pointer-events: none;
  z-index: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  opacity: 0.5;
  transform: translate(30%, 25%) rotate(-45deg);
  mask-image: linear-gradient(transparent, white);
}
</style>
