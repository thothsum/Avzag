<template>
  <div id="root" class="small">
    <div class="section scroll row-1">
      <div class="row-1">
        <router-link v-slot="{ navigate }" custom :to="{ name: 'Home' }">
          <control icon="arrow_back" @click="navigate" />
        </router-link>
        <Select v-model="menu" :items="menus" label-key="text" />
      </div>
      <div class="row-1 controls">
        <control icon="language" @click="loadLect" />
        <control icon="code" @click="loadJSON" />
        <control icon="integration_instructions" @click="saveJSON" />
        <p class="text-dot" />
        <ButtonAlert @confirm="resetFile" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";
import Select from "@/components/Select.vue";

import { ref, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { root } from "@/store";
import { config, setFile, resetFile } from "@/editor";

export default defineComponent({
  components: { ButtonAlert, Select },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const menus = [
      {
        text: "Phonology",
        name: "PhonologyEditor",
      },
      {
        text: "Converter",
        name: "ConverterEditor",
      },
      {
        text: "Phrasebook",
        name: "PhrasebookEditor",
      },
      {
        text: "Phrasebook Corpus",
        name: "PhrasebookCorpusEditor",
      },
    ];
    const menu = ref(menus.find(({ name }) => name === route.name) ?? menus[0]);
    watch(menu, ({ name }) => router.push({ name }));

    function loadLect() {
      const filename =
        root +
        (typeof config.filename === "string"
          ? window.prompt("Enter lect name") + config.filename
          : config.filename());

      fetch(filename)
        .then((response) => response.json())
        .then((file) => setFile(file));
    }
    function loadJSON() {
      setFile(JSON.parse(window.prompt("Enter JSON") ?? "0"));
    }
    function saveJSON() {
      navigator.clipboard.writeText(JSON.stringify(config.file.value));
    }

    return { menu, menus, loadLect, loadJSON, saveJSON, resetFile };
  },
});
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
  :not(.icon) {
    font-weight: bold;
  }
}
.controls {
  flex: 1;
  justify-content: flex-end;
}
@media only screen and (max-width: $mobile-width) {
  #root .section {
    flex-flow: column;
  }
}
</style>
