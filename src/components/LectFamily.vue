<template>
  <div class="panel">
    <div class="panel-horizontal">
      <h1>{{ family.name }}</h1>
      <Toggle v-model="expanded" :icons="['expand_more', 'expand_less']" />
    </div>
    <div class="panel-horizontal family scroll" v-show="expanded">
      <div class="panel branch" :key="b.name" v-for="b in family.branches">
        <h2>{{ b.name }}</h2>
        <div class="panel-horizontal groups">
          <div :key="i" v-for="(g, i) in b.groups" class="panel group">
            <h3 v-if="g.name">{{ g.name }}</h3>
            <div class="lects">
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
.family {
  max-height: 512px;
}
.groups,
.family {
  align-items: flex-start;
}
.lects {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(5, 1fr);
  gap: map-get($margins, "half");
  & > * {
    width: 192px;
  }
}
.lects {
  border: 1px gray dashed;
}
</style>
