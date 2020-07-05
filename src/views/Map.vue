<template>
  <div class="section panel-sparse">
    <div class="map">
      <div class="panel">
        <button @mouseenter="selected=l" :key="i" v-for="(l, i) in lects">{{l}}</button>
      </div>
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
  grid-template-columns: 200px 1fr;
}
.images {
  width: 512px;
  position: relative;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    filter: grayscale(75%);
    &.highlight1 {
      z-index: 1;
      filter: grayscale(0%);
    }
  }
}
</style>
