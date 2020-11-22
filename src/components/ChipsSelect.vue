<template>
  <div class="row scroll" v-if="many">
    <Button
      class="small round"
      :class="{ highlight: value == items[i] }"
      @click.native="select(i)"
      :text="k"
      :key="i"
      v-for="(k, i) in keys"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "ChipsSelect",
  components: { Button },
  props: ["value", "items", "itemKey"],
  model: {
    prop: "value",
    event: "select",
  },
  computed: {
    keys() {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items;
    },
    many() {
      return this.keys.length > 1;
    },
  },
  watch: {
    value: {
      handler() {
        if (!this.value) this.select(0);
      },
      immediate: true,
    },
  },
  methods: {
    select(i) {
      this.$emit("select", this.items[i]);
    },
  },
};
</script>
