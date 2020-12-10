<template>
  <ActionHeader @action="add" :icon="icon" :header="header">
    <template #caption><slot /></template>
    <div class="scroll col">
      <div class="row" v-for="(c, i) in conditions">
        <Button
          v-model:value="c.passive"
          v-if="allowPassive"
          icon="call_missed"
        />
        <Select class="flex" v-model:value="c.entity" :items="entities" />
        <p class="icon">west</p>
        <Select
          v-if="context[c.entity]"
          class="flex"
          v-model:value="c.tag"
          :items="context[c.entity]"
        />
        <Button @click="remove(i)" icon="clear" />
      </div>
    </div>
  </ActionHeader>
</template>

<script>
import Button from "@/components/Button";
import ActionHeader from "@/components/ActionHeader";
import Select from "@/components/Select";

export default {
  name: "PhraseConditionsEditor",
  components: {
    Button,
    ActionHeader,
    Select,
  },
  props: ["conditions", "context", "allowPassive", "header", "icon"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
  },
  methods: {
    add() {
      let c = this.conditions;
      if (!c) this.$emit("update:conditions", (c = []));
      c.push({});
    },
    remove(i) {
      this.$delete(this.conditions, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>
