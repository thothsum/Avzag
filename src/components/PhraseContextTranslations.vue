<template>
  <ActionHeader
    @action="add"
    icon="format_list_bulleted"
    header="Context Translations"
  >
    <template #caption><slot /></template>
    <!-- <template #header></template> -->
    <div class="panel-horizontal-dense" :key="k" v-for="(k, i) of keys">
      <div class="key flex panel-horizontal">
        <p class="color">
          {{ k }}
          <IndexedColor
            v-if="entities.includes(k)"
            :indexes="[entities.indexOf(k)]"
          />
        </p>
      </div>
      <p class="icon">east</p>
      <input class="flex" type="text" v-model="translations[i][1]" />
    </div>
  </ActionHeader>
</template>

<script>
// import Button from "./Button";
import ActionHeader from "@/components/ActionHeader";
import IndexedColor from "@/components/IndexedColor";

export default {
  name: "PhraseContextTranslations",
  components: {
    // Button,
    ActionHeader,
    IndexedColor,
  },
  props: ["translations", "context"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    tags() {
      return Object.values(this.context);
    },
    keys() {
      return this.entities.map((e, i) => [e].concat(this.tags[i])).flat(1);
    },
  },
  watch: {
    keys: {
      handler() {
        this.$emit(
          "update:translations",
          this.keys.map((k) => [k])
        );
      },
      immediate: true,
    },
  },
  methods: {
    add() {
      if (this.translations) this.translations.push([]);
      else this.$emit("update:translations", [[]]);
    },
    remove(i) {
      this.$delete(this.translations, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.key {
  justify-content: flex-end;
}
.color {
  position: relative;
}
</style>
