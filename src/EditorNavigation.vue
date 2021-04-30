<template>
  <div id="root" class="small">
    <div class="section row scroll">
      <div class="row">
        <router-link to="/home">
          <btn icon="arrow_back" />
        </router-link>
        <select v-model="menu">
          <option
            v-for="{ text, name } in menus"
            :key="name"
            :value="name"
            v-text="text"
          />
        </select>
      </div>
      <div class="row">
        <template v-if="menu !== 'phrasebookCorpusEditor'">
          <select :modelValue="lect" @change="changeLect($event.target)">
            <option value="" v-text="'[Custom]'" />
            <option v-for="l in lects" :key="l" :value="l" v-text="l" />
          </select>
          <template v-if="lect">
            <btn icon="download" @click="pullLect(true)" />
            <btn icon="cloud_upload" @click="pushLect" />
          </template>
        </template>
        <btn icon="file_upload" @click="uploadJSON" />
        <btn icon="file_download" @click="downloadJSON" />
        <ConfirmButton message="Reset file?" @confirm="resetFile" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import ConfirmButton from "@/components/ConfirmButton.vue";

import { ref, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadJSON } from "@/store";
import { lect, resetFile, pullLect, uploadJSON, downloadJSON } from "@/editor";
import { Lect } from "./Home/types";

export default defineComponent({
  components: { ConfirmButton },
  setup() {
    const route = useRoute();
    const router = useRouter();

    loadJSON("catalogue", []).then(
      (c) => (lects.value = c.map((l: Lect) => l.name))
    );
    const lects = ref([] as string[]);
    function changeLect(target: { value: string }) {
      if (window.confirm("Changing language will discard all local edits!"))
        lect.value = target.value;
      else target.value = lect.value;
    }

    const menus = [
      {
        text: "Phonology",
        name: "phonologyEditor",
      },
      {
        text: "Converter",
        name: "converterEditor",
      },
      {
        text: "Phrasebook",
        name: "phrasebookEditor",
      },
      {
        text: "Phrasebook Corpus",
        name: "phrasebookCorpusEditor",
      },
    ];
    const menu = ref((route.name ?? menus[0].name) as string);
    watch(menu, (menu) => router.push({ name: menu }));

    function pushLect() {
      console.log("not yet");
    }

    return {
      menu,
      menus,
      pullLect,
      pushLect,
      uploadJSON,
      downloadJSON,
      resetFile,
      lect,
      lects,
      changeLect,
    };
  },
});
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "half") map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
  :not(.icon) {
    font-weight: bold;
  }
}
.section {
  justify-content: space-between;
}
</style>
