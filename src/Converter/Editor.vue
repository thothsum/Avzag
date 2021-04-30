<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard icon="text_snippet" header="Sample Text">
        <textarea v-model="file.sample" />
        <textarea v-model="converted" readonly />
      </EditorCard>
      <EditorCard icon="call_merge" header="Mappings">
        <template #header>
          <ArrayControl
            v-model="file.mappings"
            v-model:item="mapping"
            :add="{}"
            shift-two
            remove
          />
        </template>
        <input
          v-for="(m, i) in file.mappings"
          :key="i"
          v-model="m.name"
          class="selectable"
          type="text"
          :placeholder="'mapping #' + i"
          :readonly="mapping !== m"
          @click="mapping = m"
        />
      </EditorCard>
    </div>
    <EditorCard v-if="mapping" icon="format_list_numbered" header="Pairs">
      <template #header>
        <ArrayControl v-model="mapping.pairs" :add="[]" />
      </template>
      <template #default>
        <div v-for="(p, i) in mapping.pairs" :key="i" class="row">
          <btn icon="add" @click="mapping.pairs.splice(i, 0, [])" />
          <input v-model="p[0]" type="text" placeholder="from" />
          <input v-model="p[1]" type="text" placeholder="to" />
          <btn icon="clear" @click="mapping.pairs.splice(i, 1)" />
        </div>
      </template>
    </EditorCard>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";

import { computed, ref, defineComponent } from "vue";
import { Mapping } from "./types";
import { config, file } from "@/editor";
import convert from "./convert";

export default defineComponent({
  components: { ArrayControl, EditorCard },
  setup() {
    config.value = {
      default: { default: [0, 0], mappings: [] },
      filename: "converter",
    };
    const mapping = ref<Mapping>();

    const pairs = computed(() => file.value?.mappings?.[0]?.pairs);
    const converted = computed(() => {
      const source = file.value?.sample ?? "";
      if (!pairs.value) return source;
      const intermediate = convert(source, pairs.value);
      return !mapping.value?.pairs
        ? intermediate
        : convert(
            intermediate,
            mapping.value.pairs.map(([l, r]) => [r, l])
          );
    });

    return { file, mapping, converted };
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
