<template>
  <div class="panel">
    <div class="panel-horizontal">
      <h1>{{ family.name }}</h1>
      <Toggle v-model="expanded" :icons="['expand_more', 'expand_less']" />
    </div>
    <div class="panel-horizontal-sparse family" v-show="expanded">
      <div
        class="panel-dense branch"
        :key="b.name"
        v-for="b in family.branches"
      >
        <h2>{{ b.name }}</h2>
        <div class="panel-horizontal group-parent">
          <div :key="i" v-for="(g, i) in b.groups">
            <h3>{{ g.name }}</h3>
            <div class="panel-dense wrap group">
              <Button
                :key="l"
                v-for="l in g.lects"
                :text="l"
                :icon="selected.has(l) ? 'check' : null"
                @click.native="toggle(l)"
              />
            </div>
          </div>
        </div>
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
// .group {
//   // displa
//   max-height: 100px;
//   * > {
//     height: map-get($button-height, "normal");
//   }
// }
.family {
  max-height: 512px;
}
.group-parent,
.family {
  place-items: start;
  overflow-x: auto;
  overflow-y: visible;
}
.group {
  flex-direction: column;
  max-height: 192px;
  & > * {
    width: 192px;
  }
}
.group,
.branch {
  border: 1px gray dashed;
}
</style>
