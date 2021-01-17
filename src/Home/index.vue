<template>
  <div v-if="catalogue" id="root">
    <div class="map-container">
      <div id="map" />
      <Marker
        v-for="l in catalogue"
        :key="l.name"
        :lect="l"
        :search="search"
        @click="toggleLect(l.name)"
      />
    </div>
    <div id="ui" class="col-1">
      <div id="top" class="col-1 card">
        <div class="row-1">
          <toggle v-model="about" icon="info" />
          <InputQuery v-model="query" placeholder="Search languages..." />
          <btn icon="arrow_forward" :disabled="empty" @click="load" />
        </div>
        <div class="row scroll-hidden">
          <p v-if="empty" id="placeholder">
            Click on the map or use the input field above.
          </p>
          <btn
            v-for="n in search.selected"
            :key="n"
            :text="n"
            class="small round"
            @click="toggleLect(n)"
          />
        </div>
      </div>
      <div class="col-1 scroll">
        <div v-if="about" id="about" class="col-1 card text-center">
          <h1>Ævzag</h1>
          <div class="row-1 wrap center">
            <router-link to="/editor/phonology">Editor tools</router-link>
            <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
            <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
            <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
          </div>
        </div>
        <Card
          v-for="l in catalogue"
          :key="l.name"
          :lect="l"
          :search="search"
          @click="toggleLect(l.name)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Marker from "./Marker.vue";
import Card from "./Card.vue";
import InputQuery from "@/components/Query/InputQuery.vue";

import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";
import { setupStore } from "@/store";
import { initialize, catalogue, search, query } from "./main";
import { createMap } from "./map";

export default defineComponent({
  components: { Marker, Card, InputQuery },
  setup() {
    const router = useRouter();
    initialize();
    onMounted(() => createMap());

    const empty = computed(() => !search.selected.size);
    const about = ref(false);

    function toggleLect(name: string) {
      if (search.selected.has(name)) search.selected.delete(name);
      else search.selected.add(name);
    }
    function load() {
      setupStore([...search.selected]);
      router.push({ name: "Phonology" });
    }

    watch(
      catalogue,
      () =>
        (search.selected = new Set(
          JSON.parse(localStorage.lects ?? "[]") as string[]
        )),
      { immediate: true }
    );
    onUnmounted(
      () => (localStorage.lects = JSON.stringify([...search.selected]))
    );

    return { catalogue, query, search, empty, about, toggleLect, load };
  },
});
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
.map-container,
#map {
  width: 100vw;
  height: 100vh;
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
