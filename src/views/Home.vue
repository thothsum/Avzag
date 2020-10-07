<template>
  <div id="root">
    <div id="map">
      <l-map ref="map" :center="mapData.center" :zoom="7" :maxZoom="11">
        <l-tile-layer :url="mapData.layerUrl" :options="mapData.layerOptions" />
        <template v-for="(l, i) in catalogue">
          <l-marker v-if="l.coordinates" :lat-lng="l.coordinates" :key="i">
            <l-icon class-name="marker">
              <h2 :class="{ highlight: selected[i] }">
                {{ l.name }}
              </h2>
            </l-icon>
          </l-marker></template
        >
      </l-map>
    </div>
    <div id="ui" class="panel-sparse">
      <div class="panel card">
        <div class="panel-horizontal">
          <Button icon="info" v-model="about" />
          <input
            class="flex"
            type="text"
            v-model="search"
            placeholder="Search languages ..."
          />
          <Button icon="arrow_forward" @click.native="load" :disabled="empty" />
        </div>
        <div
          id="about"
          class="panel-horizontal scroll-hidden"
          v-if="empty || about"
        >
          <template v-if="about">
            <router-link to="/editor/phonology">Editors</router-link>
            <span class="text-dot"></span>
            <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
            <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
            <span class="text-dot"></span>
            <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
          </template>
          <h1 v-else>Ævzag</h1>
        </div>
        <div class="panel-horizontal-dense scroll-hidden" v-else>
          <Button
            class="small round"
            :key="i"
            v-for="(l, i) in lects"
            :text="l.name"
            @click.native="toggleLect(l)"
          />
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
      mapData: {
        center: [43.711379, 41.406538],
        options: { zoomControl: false },
        layerUrl:
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        layerOptions: {
          // attribution:
          //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 12,
          id: "mapbox/light-v10",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.VUE_APP_MAP_TOKEN,
        },
      },
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
    empty() {
      return this.lects.length == 0;
    },
    query() {
      return this.search ? this.search.toLowerCase().split(" ") : null;
    },
    selected() {
      return this.catalogue.map((l) => this.lects.includes(l));
    },
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
#about {
  justify-content: center;
  h1 {
    line-height: map-get($button-height, "small");
  }
}
.marker {
  h2 {
    text-shadow: map-get($shadows, "elevated");
  }
}
@media only screen and (max-width: $mobile-width) {
  #ui {
    width: 100vw;
  }
}
</style>
