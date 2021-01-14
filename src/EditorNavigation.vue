<template>
  <div id="root" class="small">
    <div class="section scroll row-1">
      <div class="row-1">
        <router-link v-slot="{ navigate }" custom :to="{ name: 'Home' }">
          <btn icon="arrow_back" @click="navigate" />
        </router-link>
        <select v-model="menu">
          <option v-for="{ text, name } in menus" :key="name" :value="name">
            {{ text }}
          </option>
        </select>
      </div>
      <div class="row-1 controls">
        <btn icon="language" @click="loadLect" />
        <btn icon="code" @click="loadJSON" />
        <btn icon="integration_instructions" @click="saveJSON" />
        <p class="text-dot" />
        <ButtonAlert @confirm="resetFile" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";

import { ref, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadJSON as loadDBJSON } from "@/store";
import { config, file, resetFile } from "@/editor";

export default defineComponent({
  components: { ButtonAlert },
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
    const menu = ref((route.name ?? menus[0].name) as string);
    watch(menu, (menu) => router.push({ name: menu }));

    async function loadLect() {
      const lect = window.prompt("Enter lect name");
      if (!lect) return;
      const json = await loadDBJSON(lect + "/" + config.filename);
      if (json) file.value = json;
    }
    function loadJSON() {
      const f = JSON.parse(window.prompt("Enter JSON") ?? "0");
      if (f) file.value = f;
    }
    function saveJSON() {
      navigator.clipboard.writeText(JSON.stringify(file.value));
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
select {
  flex: 0;
}
@media only screen and (max-width: $mobile-width) {
  #root .section {
    flex-flow: column;
  }
}
</style>
