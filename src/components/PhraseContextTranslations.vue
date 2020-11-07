<template>
  <ActionHeader
    @action="add"
    :button="empty ? 'queue' : ''"
    icon="format_list_bulleted"
    header="Context Translations"
  >
    <template #caption><slot /></template>
    <template v-if="!empty" #header><ButtonAlert @confirm="remove" /></template>
    <div class="panel-horizontal-dense" :key="i" v-for="(t, i) of translations">
      <div class="key flex panel-horizontal">
        <p class="color">
          {{ t[0] }}
          <IndexedColor
            v-if="entities.includes(t[0])"
            :indexes="[entities.indexOf(t[0])]"
          />
        </p>
      </div>
      <p class="icon">east</p>
      <input class="flex" type="text" v-model="t[1]" />
    </div>
  </ActionHeader>
</template>

<script>
import ButtonAlert from "./ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import IndexedColor from "@/components/IndexedColor";

export default {
  name: "PhraseContextTranslations",
  components: {
    ButtonAlert,
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
    empty() {
      return !this.translations?.length;
    },
  },
  methods: {
    add() {
      this.$emit(
        "update:translations",
        this.keys.map((k) => [k])
      );
    },
    remove() {
      this.$emit("update:translations", []);
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
