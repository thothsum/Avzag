<template>
  <div class="panel">
    <div class="panel-horizontal">
      <Toggle v-model="expanded" :icons="['expand_more', 'expand_less']" />
      <h1>{{ family.name }}</h1>
    </div>
    <div class="panel" v-show="expanded">
      <div class="panel" :key="b.name" v-for="b in family.branches">
        <h2>{{ b.name }}</h2>
        <div class="panel-horizontal-sparse scroll groups">
          <div :key="i" v-for="(g, i) in b.groups" class="panel group">
            <h3 v-if="g.name">{{ g.name }}</h3>
            <div class="lects card">
              <div class="flag" v-if="g.flag">
                <img :src="$store.state.root + '../flags/' + g.flag + '.png'" />
              </div>
              <Button
                :key="l"
                v-for="l in g.lects"
                :text="l"
                :class="{ highlight: selected.has(l) }"
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
.groups,
.family {
  align-items: flex-end;
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
.groups {
  padding: 2px;
}
.lects {
  position: relative;
  * {
    z-index: 1;
  }
}
h3 {
  border-bottom: 2px solid var(--color-text);
}
.flag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    user-select: none;
    pointer-events: none;
    z-index: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    opacity: 0.5;
    transform: translate(30%, 25%) rotate(-45deg);
    mask-image: linear-gradient(transparent, white);
  }
}
</style>
