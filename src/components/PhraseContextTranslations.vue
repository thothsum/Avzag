<template>
  <ActionHeader
    @action="add"
    :button="empty ? 'queue' : ''"
    icon="format_list_bulleted"
    header="Context Translations"
  >
    <template #caption><slot /></template>
    <template v-if="!empty" #header><ButtonAlert @confirm="remove" /></template>
    <div class="panel-horizontal wrap">
      <div class="panel-dense" :key="i" v-for="(t, i) of translations">
        <p class="text-caption" :class="colors[i]">{{ t[0] }}</p>
        <input :size="sizes[i]" type="text" v-model="t[1]" />
      </div>
    </div>
  </ActionHeader>
</template>

<script>
import ButtonAlert from "./ButtonAlert";
import ActionHeader from "@/components/ActionHeader";

export default {
  name: "PhraseContextTranslations",
  components: {
    ButtonAlert,
    ActionHeader,
  },
  props: ["translations", "context"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    sizes() {
      return this.translations.map((t) => Math.max(t[1]?.length, 1));
    },
    tags() {
      return Object.values(this.context);
    },
    keys() {
      return this.entities.map((e, i) => [e].concat(this.tags[i])).flat(1);
    },
    empty() {
      return !this.translations?.length;
    },
    colors() {
      return this.keys.map((k) => "colored-dot-" + this.entities.indexOf(k));
    },
  },
  methods: {
    add() {
      this.$emit(
        "update:translations",
        this.keys.map((k) => [k, ""])
      );
    },
    remove() {
      this.$emit("update:translations", []);
    },
  },
};
</script>

<style lang="scss" scoped>
p:not(.colored-dot--1) {
  font-weight: bold;
}
</style>
