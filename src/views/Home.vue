<template>
  <div id="root">
    <div id="map"></div>
    <div id="ui" class="panel-sparse">
      <div id="header" class="panel-horizontal wrap card">
        <div class="panel-horizontal-sparse" id="title">
          <h1>Ævzag</h1>
          <button v-if="!empty" @click="load" class="highlight">
            <h1 class="icon">arrow_forward</h1>
          </button>
        </div>
        <div class="panel-horizontal">
          <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
          <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
          <span class="text-dot"></span>
          <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
        </div>
      </div>
      <div class="panel">
        <LectCard :key="i" v-for="(l, i) in catalogue" :lect="l" />
      </div>
    </div>
    <!-- <LectFamilyF
      @select="select"
      :key="i"
      v-for="(f, i) in catalogue"
      :family="f"
    /> -->
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import LectCard from "@/components/LectCard";

export default {
  name: "Home",
  components: {
    LectCard,
  },
  data() {
    return {
      selected: new Set(),
      empty: true,
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
  },
  mounted() {
    var map = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        // attribution:
        //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_MAP_TOKEN,
      }
    ).addTo(map);
  },
  methods: {
    select(lect, incl) {
      if (incl) this.selected.add(lect);
      else this.selected.delete(lect);
      this.empty = !this.selected.size;
    },
    load() {
      this.$store.dispatch("loadLects", this.selected);
      this.$router.push({ name: "Phonology" });
    },
  },
};
</script>

<style lang="scss" scoped>
#root {
  position: relative;
  width: 100%;
  height: 100%;
}

#map {
  height: 100vh;
  width: 100vw;
  left: -1 * map-get($margins, "normal");
  top: -1 * map-get($margins, "normal");
  z-index: 1;
  position: absolute;
}
#ui {
  width: 0.75 * $mobile-width;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
}
#header {
  background-color: var(--color-background);
}

@media only screen and (max-width: $mobile-width) {
  #header {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
