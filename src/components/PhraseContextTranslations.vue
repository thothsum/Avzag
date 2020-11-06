<template>
  <div class="panel-dense">
    <h2>Context Translations</h2>
    <div class="panel-horizontal-dense" :key="i" v-for="(t, i) in translations">
      <Select class="flex" :value.sync="t[0]" :items="keys" />
      <p class="icon">east</p>
      <input class="flex" type="text" v-model="t[1]" />
      <Button @click.native="remove(i)" icon="clear" />
    </div>
    <Button class="center" @click.native="add" icon="add" />
  </div>
</template>

<script>
import Button from "./Button";
import Select from "./Select";

export default {
  name: "PhraseContextTranslations",
  components: {
    Button,
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
