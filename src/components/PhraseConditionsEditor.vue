<template>
  <div class="conditions panel-dense">
    <div class="panel-horizontal-dense">
      <Button @click.native="addCondition" icon="add" />
      <slot />
    </div>
    <div class="scroll panel-dense">
      <div class="panel-horizontal-dense" :key="i" v-for="(c, i) in conditions">
        <Button
          :value.sync="c.passive"
          v-if="allowPassive"
          icon="call_missed"
        />
        <Select class="flex" :value.sync="c.entity" :items="entities" />
        <p class="icon">west</p>
        <Select
          v-if="context[c.entity]"
          class="flex"
          :value.sync="c.tag"
          :items="context[c.entity]"
        />
        <Button @click.native="deleteCondition(i)" icon="clear" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";

export default {
  name: "PhraseConditionsEditor",
  components: {
    Button,
    Select,
  },
  props: ["conditions", "context", "allowPassive"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
  },
  methods: {
    addCondition() {
      let c = this.conditions;
      if (!c) this.$emit("update:conditions", (c = []));
      c.push({});
    },
    deleteCondition(i) {
      this.$delete(this.conditions, i);
    },
  },
};
</script>

<style lang="scss" scoped>
.conditions {
  max-height: 256px;
}
</style>
