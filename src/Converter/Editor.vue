<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard button="" icon="text_snippet" header="Sample Text">
        <template #caption>
          Text that will be displayed to demonstrate the converter.
        </template>
        <textarea v-model="file.sample" />
      </EditorCard>
      <EditorCard icon="call_merge" header="Mappings" @action="addMapping">
        <template v-if="mapping" #header>
          <control icon="keyboard_arrow_up" @click="shiftMapping(-1)" />
          <control icon="keyboard_arrow_down" @click="shiftMapping(1)" />
          <p class="text-dot" />
          <ButtonAlert @confirm="deleteMapping" />
        </template>
        <template #caption>
          The 1st mapping should be the same as the caption. Default conversion
          is from the 1st into the 2nd mappings in the order.
        </template>
        <div v-for="(m, i) in mappings" :key="i" class="row">
          <control
            :class="{ highlight: mapping == m }"
            icon="edit"
            @click="mapping = m"
          />
          <input v-model="m.name" type="text" />
        </div>
      </EditorCard>
    </div>
    <EditorCard
      v-if="mapping"
      icon="format_list_numbered"
      header="Pairs"
      @action="addPair(pairs.length)"
    >
      <template #caption>
        During conversion system will consuquently go over these pairs,
        replacing text from the left with the text from the right or vise versa
        (right with left) if conversion is reversed.</template
      >
      <template #default>
        <div v-for="(p, i) in pairs" :key="i" class="row">
          <control icon="add" @click="addPair(i)" />
          <input v-model="p[0]" type="text" placeholder="from" />
          <input v-model="p[1]" type="text" placeholder="to" />
          <control icon="clear" @click="deletePair(i)" />
        </div>
      </template>
    </EditorCard>
  </div>
</template>

<script lang="ts">
import ButtonAlert from "@/components/ButtonAlert.vue";
import EditorCard from "@/components/EditorCard.vue";

import { computed, ref, Ref, defineComponent } from "vue";
import { Mapping, Converter } from "./types";
import { setupEditor } from "@/editor";

export default defineComponent({
  components: { ButtonAlert, EditorCard },
  setup() {
    const mapping = ref({} as Mapping);
    const file: Ref<Converter> = setupEditor({
      defaultFile: { default: [0, 0], mappings: [] },
      filename: "/converter.json",
      storage: "editor.converter",
      onReset: () => (mapping.value = file.value.mappings[0]),
    });

    const mappings = computed(() => file.value?.mappings ?? []);
    const pairs = computed(() => mapping.value.pairs ?? []);

    function shiftMapping(shift: number) {
      const length = mappings.value.length;
      const from = mappings.value.indexOf(mapping.value);
      const to = (from + shift + length) % length;
      mappings.value.splice(to, 0, mappings.value.splice(from, 1)[0]);
    }
    function addMapping() {
      mapping.value = { name: "newMapping", pairs: [] };
      mappings.value.push(mapping.value);
    }
    function deleteMapping() {
      mappings.value.splice(mappings.value.indexOf(mapping.value), 1);
      mapping.value = mappings.value[mappings.value.length - 1];
    }
    function addPair(index: number) {
      mapping.value.pairs.splice(index, 0, ["", ""]);
    }
    function deletePair(index: number) {
      mapping.value.pairs.splice(index, 1);
    }

    return {
      file,
      mappings,
      mapping,
      pairs,
      shiftMapping,
      addMapping,
      deleteMapping,
      addPair,
      deletePair,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 352px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
