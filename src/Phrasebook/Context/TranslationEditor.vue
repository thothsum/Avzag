<template>
  <EditorCard
    :button="translation ? '' : 'queue'"
    icon="format_list_bulleted"
    header="context translation"
    @action="add"
  >
    <template #caption><slot /></template>
    <template v-if="translation" #header>
      <ButtonAlert @confirm="remove" />
    </template>
    <template v-if="translation">
      <div v-for="(e, i) in entities" :key="i" class="row wrap">
        <div class="row wrap block-editor">
          <div class="col">
            <h2 class="text-caption" :class="colors[i]">{{ e[0] }}</h2>
            <input v-model="e[1]" :size="sizes[i].entity" type="text" />
          </div>
          <div v-for="(t, j) in tags[i]" :key="t[0]" class="col">
            <p class="text-caption">{{ t[0] }}</p>
            <input v-model="t[1]" :size="sizes[i].tags[j]" type="text" />
          </div>
        </div>
      </div>
    </template>
  </EditorCard>
</template>

<script>
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";

export default {
  name: "PhraseContextTranslationEditor",
  components: {
    ButtonAlert,
    EditorCard,
  },
  props: ["translation", "context"],
  computed: {
    entities() {
      return this.translation.map((t) => t.entity);
    },
    tags() {
      return this.translation.map((t) => t.tags);
    },
    sizes() {
      return this.translation.map(({ entity, tags }) => ({
        entity: Math.max(entity[1].length, 1),
        tags: tags.map((t) => Math.max(t[1].length, 1)),
      }));
    },
    colors() {
      return this.entities.map((_, i) => "colored-dot-" + i);
    },
  },
  methods: {
    add() {
      this.$emit(
        "update:translation",
        Object.entries(this.context).map(([e, ts]) => ({
          entity: [e, ""],
          tags: ts.map((t) => [t, ""]),
        }))
      );
    },
    remove() {
      this.$emit("update:translation");
    },
  },
};
</script>
