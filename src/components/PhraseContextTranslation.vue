<template>
  <ActionHeader
    @action="add"
    :button="translation ? '' : 'queue'"
    icon="format_list_bulleted"
    header="context translation"
  >
    <template #caption><slot /></template>
    <template v-if="translation" #header>
      <ButtonAlert @confirm="remove" />
    </template>
    <template v-if="translation">
      <div
        class="panel-horizontal-dense wrap"
        :key="i"
        v-for="(e, i) in entities"
      >
        <div class="panel-horizontal-dense wrap block-editor">
          <div class="panel-dense">
            <h2 class="text-caption" :class="colors[i]">{{ e[0] }}</h2>
            <input :size="sizes[i].entity" type="text" v-model="e[1]" />
          </div>
          <div class="panel-dense" :key="t[0]" v-for="(t, j) in tags[i]">
            <p class="text-caption">{{ t[0] }}</p>
            <input :size="sizes[i].tags[j]" type="text" v-model="t[1]" />
          </div>
        </div>
      </div>
    </template>
  </ActionHeader>
</template>

<script>
import ButtonAlert from "./ButtonAlert";
import ActionHeader from "@/components/ActionHeader";

export default {
  name: "PhraseContextTranslation",
  components: {
    ButtonAlert,
    ActionHeader,
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
