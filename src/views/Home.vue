<template>
  <div v-if="catalogue" id="root">
    <div id="map">
      <LectsMap
        :catalogue="catalogue"
        :selected="selected"
        :visible="visible"
        @toggle="toggleLect"
      />
    </div>
    <div id="ui" class="col-1">
      <div id="top" class="col-1 card">
        <div class="row-1">
          <Button v-model:value="about" icon="info" />
          <input
            v-model="search"
            class="flex"
            type="text"
            placeholder="Search languages..."
          />
          <Button icon="arrow_forward" :disabled="empty" @click="load" />
        </div>
        <div class="row scroll-hidden">
          <p v-if="empty" id="placeholder">
            Click on the map or use the input field above.
          </p>
          <Button
            v-for="(l, i) in lects"
            :key="i"
            class="small round"
            :text="l.name"
            @click="toggleLect(l)"
          />
        </div>
      </div>
      <div class="col-1 scroll">
        <div v-if="about" id="about" class="col-1 card text-center">
          <h1>Ævzag</h1>
          <p v-show="quote">{{ quote }}</p>
          <div class="row-1 wrap center">
            <router-link to="/editor/phonology">Editor tools</router-link>
            <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
            <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
            <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
          </div>
        </div>
        <LectCard
          v-for="(l, i) in catalogue"
          :key="i"
          :lect="l"
          :selected="selected[i]"
          :query="query"
          @click="toggleLect(l)"
          @visible="setVisibility(l, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LectsMap from "@/components/LectsMap";
import LectCard from "@/components/LectCard";
import Button from "@/components/Button";

export default {
  name: "Home",
  components: {
    LectsMap,
    LectCard,
    Button,
  },
  data() {
    return {
      about: false,
      search: "",
      lects: undefined,
      visible: [],
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
    empty() {
      return !this.lects?.length;
    },
    query() {
      return this.search ? this.search.toLowerCase().split(" ") : null;
    },
    selected() {
      return this.catalogue?.map((l) => this.lects.includes(l));
    },
    quote() {
      return this.lects[this.lects.length - 1]?.quote;
    },
  },
  watch: {
    catalogue: {
      handler() {
        if (this.catalogue) {
          try {
            this.lects = JSON.parse(localStorage.lects)?.map((n) =>
              this.catalogue.find((l) => l.name === n)
            );
          } catch (_) {
            this.lects = [];
          }
        }
      },
      immediate: true,
    },
  },
  unmounted() {
    localStorage.lects = JSON.stringify(this.lects.map((l) => l.name));
  },
  methods: {
    toggleLect(lect) {
      const i = this.lects.indexOf(lect);
      if (i < 0) this.lects.push(lect);
      else this.lects.splice(i, 1);
    },
    setVisibility(lect, value) {
      const i = this.visible.indexOf(lect);
      if (i < 0) {
        if (value) this.visible.push(lect);
      } else if (!value) this.visible.splice(i, 1);
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
#placeholder {
  line-height: map-get($button-height, "small");
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
