<template>
  <div id="root">
    <div id="map"></div>
    <div id="ui" class="panel-sparse">
      <div id="header" class="panel-horizontal card">
        <Button icon="info" v-model="about" />
        <input
          type="text"
          v-model="search"
          placeholder="Search languages ..."
        />
        <Button
          icon="arrow_forward"
          @click.native="load"
          :disabled="!canLoad"
          :class="{ highlight: canLoad }"
        />
      </div>
      <div v-show="about" id="about" class="panel card">
        <h1>Ævzag</h1>
        <div class="panel-horizontal">
          <router-link to="/editor/phonology">Editors</router-link>
          <span class="text-dot"></span>
          <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
          <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
          <span class="text-dot"></span>
          <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
        </div>
      </div>
      <div class="panel scroll">
        <LectCard
          :key="i"
          v-for="(l, i) in catalogue"
          :lect="l"
          :selected="selected[i]"
          :query="query"
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
      about: false,
      map: undefined,
      markers: undefined,
      search: "",
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
    query() {
      return this.search ? this.search.toLowerCase().split(" ") : null;
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
              html: `<h2 class='highlight' style="width:0">${l.name}</h2>`,
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
$margin: -1 * map-get($margins, "normal");

#root {
  position: relative;
  width: 100%;
  height: 100%;
  > * {
    left: $margin;
    top: $margin;
  }
}
#map {
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: absolute;
}
#ui {
  padding: -$margin;
  height: 100vh;
  width: 0.75 * $mobile-width;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
  > .scroll {
    max-height: 100%;
    padding: -1 * $margin;
    margin: $margin;
  }
}
input {
  flex: 1;
}
#about {
  > * {
    text-align: center;
    justify-content: center;
  }
  h1 {
    font-size: 32px;
  }
}

@media only screen and (max-width: $mobile-width) {
  #ui {
    width: 100vw;
  }
}
</style>
