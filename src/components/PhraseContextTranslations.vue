<template>
  <ActionHeader
    @action="add"
    icon="format_list_bulleted"
    header="Context Translations"
  >
    <template #caption><slot /></template>
    <div class="panel-horizontal-dense" :key="i" v-for="(t, i) in translations">
      <Select class="flex" :value.sync="t[0]" :items="keys" />
      <p class="icon">east</p>
      <input class="flex" type="text" v-model="t[1]" />
      <Button @click.native="remove(i)" icon="clear" />
    </div>
  </ActionHeader>
</template>

<script>
import Button from "./Button";
import ActionHeader from "@/components/ActionHeader";
import Select from "./Select";

export default {
  name: "PhraseContextTranslations",
  components: {
    Button,
    ActionHeader,
    Select,
  },
  props: ["translations", "context"],
  computed: {
    keys() {
      return Object.keys(this.context).concat(
        Object.values(this.context).flat()
      );
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
