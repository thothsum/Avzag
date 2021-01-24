<template>
  <div v-if="file" class="section col-2 small grid">
    <div class="col-2">
      <EditorCard icon="text_snippet" header="Sample Text">
        <template #caption>
          Text that will be displayed to demonstrate the converter.
        </template>
        <textarea v-model="file.sample" />
        <textarea v-model="converted" readonly />
      </EditorCard>
      <EditorCard icon="call_merge" header="Mappings">
        <template #header>
          <ArrayControl
            v-model="file.mappings"
            v-model:item="mapping"
            :default-item="{}"
            shift
            remove
          />
        </template>
        <template #caption>
          The 1st mapping should be the same as the caption. Default conversion
          is from the 1st into the 2nd mappings in the order.
        </template>
        <div v-for="(m, i) in file.mappings" :key="i" class="row">
          <btn icon="edit" :is-on="mapping === m" @click="mapping = m" />
          <input v-model="m.name" type="text" :placeholder="'mapping #' + i" />
        </div>
      </EditorCard>
    </div>
    <EditorCard v-if="mapping" icon="format_list_numbered" header="Pairs">
      <template #header>
        <ArrayControl v-model="mapping.pairs" :default-item="[]" />
      </template>
      <template #caption>
        During conversion system will consuquently go over these pairs,
        replacing text from the left with the text from the right or vise versa
        (right with left) if conversion is reversed.</template
      >
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
import { Mapping, Converter } from "./types";
import { setupEditor } from "@/editor";
import convert from "./convert";

export default defineComponent({
  components: { ArrayControl, EditorCard },
  setup() {
    const file = setupEditor<Converter>({
      defaultFile: { default: [0, 0], mappings: [] },
      filename: "converter",
      storage: "editor.converter",
    });
    const mapping = ref<Mapping>();

    const pairs = computed(() => file.value?.mappings?.[0]?.pairs);
    const converted = computed(() => {
      const source = file.value?.sample ?? "";
      if (!pairs.value) return source;
      const intermediate = convert(source, pairs.value);
      return mapping.value?.pairs === pairs.value
        ? intermediate
        : convert(
            intermediate,
            pairs.value.map(([l, r]) => [r, l])
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
