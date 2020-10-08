<template>
  <div id="root">
    <div id="map">
      <LectsMap :catalogue="catalogue" :selected="selected" />
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
      return this.catalogue?.map((l) => this.lects.includes(l));
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
