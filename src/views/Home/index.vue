<template>
  <div v-if="catalogue" id="root">
    <div id="map">
      <LectMap
        :catalogue="catalogue"
        :selected="selected"
        :visible="visible"
        @toggle="toggleLect"
      />
    </div>
    <div id="ui" class="col-1">
      <div id="top" class="col-1 card">
        <div class="row-1">
          <Button v-model="about" icon="info" />
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

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import LectMap from "./LectMap";
import LectCard from "./LectCard";
import Button from "@/components/Button";
import Lect from "./lect";
import { computed, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const catalogue = computed(() => store.state.catalogue as Lect[]);
const lects = ref([] as Lect[]);
const visible = ref([] as Lect[]);
const selected = computed(() =>
  catalogue.value.map((l) => lects.value.includes(l))
);
const names = computed(() => lects.value.map((l) => l.name));

const search = ref("");
const query = computed(() =>
  search.value ? search.value.toLowerCase().split(" ") : null
);

const empty = computed(() => !lects.value.length);
const about = ref(false);
const quote = computed(() => lects.value[lects.value.length - 1]?.quote);

function toggleLect(lect: Lect) {
  const i = lects.value.indexOf(lect);
  if (i < 0) lects.value.push(lect);
  else lects.value.splice(i, 1);
}
function setVisibility(lect: Lect, value: boolean) {
  const i = visible.value.indexOf(lect);
  if (i < 0) {
    if (value) visible.value.push(lect);
  } else if (!value) visible.value.splice(i, 1);
}
function load() {
  store.dispatch("loadLects", names.value);
  router.push({ name: "Phonology" });
}

watch(
  catalogue,
  () => {
    try {
      lects.value = ((JSON.parse(localStorage.lects) as string[])?.map((n) =>
        catalogue.value.find(({ name }) => name === n)
      ) ?? []) as Lect[];
    } catch {
      lects.value = [];
    }
  },
  { immediate: true }
);
onUnmounted(() => JSON.stringify(names.value));
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
