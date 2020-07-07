<template>
  <div class="section panel-sparse">
    <div class="map">
      <div id="menu" class="panel-solid">
        <button @mouseenter="selected=l" :key="i" v-for="(l, i) in lects">{{l}}</button>
      </div>
      <div id="content"></div>
      <div class="images">
        <img
          :class="{highlight1: selected===l}"
          :src="root+'map/'+l+'.png'"
          :key="i"
          v-for="(l, i) in lects"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Map",
  components: {},
  data() {
    return {
      selected: ""
    };
  },
  computed: {
    root() {
      return this.$store.getters.languageRoot;
    },
    lects() {
      return this.$store.getters.languageInfo?.lects;
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  display: grid;
  grid-template-columns: 150px 300px 1fr;
}
.images {
  min-width: 100%;
  height: auto;
  position: relative;
  &::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.25;
    &.highlight1 {
      z-index: 1;
      opacity: 1;
    }
  }
}
</style>
