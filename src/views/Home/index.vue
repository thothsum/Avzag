<template>
  <div v-if="catalogue" id="root">
    <div id="map">
      <Map :catalogue="catalogue" :search="search" @toggle="toggleLect" />
    </div>
    <div id="ui" class="col-1">
      <div id="top" class="col-1 card">
        <div class="row-1">
          <toggle v-model="about" icon="info" />
          <InputQuery v-model="query" placeholder="Search languages..." />
          <control icon="arrow_forward" :disabled="empty" @click="load" />
        </div>
        <div class="row scroll-hidden">
          <p v-if="empty" id="placeholder">
            Click on the map or use the input field above.
          </p>
          <control
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

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Map from "./Map";
import Card from "./Card";
import InputQuery from "@/components/Query/InputQuery";
import { Query, EvaluateQuery } from "@/components/Query/types";
import { SearchState } from "./types";
import { computed, onUnmounted, reactive, ref, watch, watchEffect } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const catalogue = computed(() => store.state.catalogue);
const search = reactive({
  selected: new Set<string>(),
  visible: new Set<string>(),
} as SearchState);

const query = ref({} as Query);
const tags = computed(
  () =>
    catalogue.value?.map(({ name, tags, family }) =>
      [name, tags ?? "", family].flat().join(" ").toLowerCase()
    ) ?? []
);

const empty = computed(() => !search.selected.size);
const about = ref(false);

watchEffect(() =>
  tags.value.forEach((t, i) => {
    const name = catalogue.value[i].name;
    if (EvaluateQuery(t, query.value, true)) search.visible.add(name);
    else search.visible.delete(name);
  })
);
function toggleLect(name: string) {
  if (search.selected.has(name)) search.selected.delete(name);
  else search.selected.add(name);
}
function load() {
  store.dispatch("loadLects", [...search.selected]);
  router.push({ name: "Phonology" });
}

watch(
  catalogue,
  () => {
    try {
      search.selected = new Set(
        (JSON.parse(localStorage.lects) ?? []) as string[]
      );
    } catch {
      console.log("error loading lect names from last save");
    }
  },
  { immediate: true }
);
onUnmounted(() => (localStorage.lects = JSON.stringify([...search.selected])));
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
  width: 100vw;
  height: 100vh;
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
