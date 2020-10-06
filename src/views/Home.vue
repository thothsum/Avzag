<template>
  <div id="root">
    <div id="map"></div>
    <div id="ui" class="panel-sparse scroll">
      <div id="header" class="panel-horizontal card">
        <Button icon="info" v-model="showAbout" />
        <input type="text" placeholder="search lects by name, family" />
        <Button icon="arrow_forward" @click.native="load" />
      </div>
      <div v-show="showAbout" class="panel card" id="about">
        <h1>Ævzag</h1>
        <div class="panel-horizontal">
          <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
          <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
          <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
        </div>
      </div>
      <div class="panel">
        <LectCard
          :key="i"
          v-for="(l, i) in catalogue"
          :lect="l"
          :selected="selected[i]"
          @click.native="toggleLect(l)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import LectCard from "@/components/LectCard";
import Button from "@/components/Button";

export default {
  name: "Home",
  components: {
    LectCard,
    Button,
  },
  data() {
    return {
      showAbout: false,
      map: undefined,
      markers: undefined,
      lects: [],
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
    canLoad() {
      return this.lects.length > 0;
    },
    selected() {
      return this.catalogue.map((l) => this.lects.includes(l));
    },
  },
  watch: {
    lects() {
      console.log("adding markers");
      this.markers.clearLayers();

      this.lects
        .filter((l) => l.coordinates)
        .map((l) =>
          L.marker(l.coordinates, {
            icon: L.divIcon({
              className: "text-labels", // Set class for CSS styling
              html: `<h3 class='highlight' style="width:0">${l.name}</h3>`,
            }),
            zIndexOffset: 1000, // Make appear above other map features
          })
        )
        .forEach((m) => m.addTo(this.markers));
    },
  },
  mounted() {
    this.map = L.map("map", { zoomControl: false });
    this.map.setView([43.711379, 41.406538], 7);

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
    ).addTo(this.map);

    this.markers = L.layerGroup().addTo(this.map);
  },
  methods: {
    toggleLect(lect) {
      const i = this.lects.indexOf(lect);
      if (i < 0) this.lects.push(lect);
      else this.lects.splice(i, 1);
    },
    load() {
      this.$store.dispatch(
        "loadLects",
        this.lects.map((l) => l.name)
      );
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
  > div {
    left: -1 * map-get($margins, "normal");
    top: -1 * map-get($margins, "normal");
  }
}
#map {
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: absolute;
}
#ui {
  height: 100vh;
  padding: map-get($margins, "normal");
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
  input {
    flex: 1;
  }
}
#about * {
  text-align: center;
  justify-content: center;
}

@media only screen and (max-width: $mobile-width) {
  #header {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
