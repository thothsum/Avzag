<template>
  <div class="panel-dense">
    <div class="panel-horizontal-dense">
      <p class="flex">{{ header }}</p>
      <Button @click.native="addCondition" icon="add" />
    </div>
    <div class="panel-horizontal-dense" :key="i" v-for="(c, i) in conditions">
      <Button @click.native="addCondition(i)" icon="vertical_align_top" />
      <Select :value.sync="c.entity" :items="entities" />
      <input class="flex" type="text" v-model="c.tags" />
      <Button
        v-model="c.passive"
        v-if="enablePassive"
        icon="link_off"
        text="passive"
      />
      <Button @click.native="deleteCondition(i)" icon="clear" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";

export default {
  name: "ConditionEditor",
  components: {
    Button,
    Select,
  },
  props: ["header", "conditions", "context", "enablePassive"],
  computed: {
    entities() {
      return Object.keys(this.context);
    },
  },
  methods: {
    addCondition(i) {
      let conditions = this.conditions;
      if (!conditions) conditions = [];
      if (i == null) i = conditions.length;
      conditions.splice(i, 0, {});
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
