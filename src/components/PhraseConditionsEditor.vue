<template>
  <div class="conditions scroll panel-dense">
    <div class="panel-horizontal-dense" :key="i" v-for="(c, i) in conditions">
      <Button :value.sync="c.passive" v-if="allowPassive" icon="link_off" />
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
    <Button class="center" @click.native="addCondition" icon="add" />
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
      let conditions = this.conditions ?? [];
      conditions.splice(conditions.length, 0, {});
      this.$emit("update:conditions", conditions);
    },
    deleteCondition(i) {
      let conditions = this.conditions;
      conditions.splice(i, 1);
      this.$emit("update:conditions", conditions);
    },
  },
};
</script>

<style lang="scss" scoped>
.conditions {
  max-height: 256px;
}
</style>
