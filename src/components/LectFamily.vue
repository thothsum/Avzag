<template>
  <div class="panel">
    <div class="panel-horizontal">
      <h2>{{family.name}}</h2>
      <Toggle v-model="expanded" :icons="['expand_more', 'expand_less']" />
    </div>
    <div class="panel-horizontal-sparse wrap" v-show="expanded">
      <div class="panel-dense branch" :key="i" v-for="(b, i) in family.branches">
        <h3>{{b.name}}</h3>
        <Button
          :key="i"
          v-for="(l, i) in b.lects"
          :text="l.name"
          :icon="selected.has(l.name)?'check':null"
          @click.native="toggle(l.name)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import Toggle from "./Toggle";

export default {
  name: "LectFamily",
  components: {
    Button,
    Toggle,
  },
  props: ["family"],
  data() {
    return {
      expanded: false,
      selected: new Set(),
    };
  },
  methods: {
    toggle(lect) {
      if (this.selected.has(lect)) this.selected.delete(lect);
      else this.selected.add(lect);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.branch {
  width: 256px;
}
</style>
