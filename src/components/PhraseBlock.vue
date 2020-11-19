<template>
  <button
    class="small"
    :class="{ disabled, glossed }"
    v-show="visible"
    @click="move"
    v-if="state"
  >
    <template v-if="interactive">
      <IndexedColor :passive="true" :indexes="passiveIndexes" />
      <IndexedColor :indexes="activeIndexes" />
    </template>
    <PhraseStateDisplay
      ref="display"
      :glossed="glossed"
      :colored="this.interactive"
      :state="state"
      :context="context"
    />
  </button>
</template>

<script>
import IndexedColor from "./IndexedColor";
import PhraseStateDisplay from "./PhraseStateDisplay";

export default {
  name: "PhraseBlock",
  components: {
    IndexedColor,
    PhraseStateDisplay,
  },
  props: ["id", "context", "block", "interactive", "glossed"],
  data() {
    return {
      state: undefined,
      visible: false,
    };
  },
  computed: {
    requirements() {
      return this.block.requirements;
    },
    states() {
      return this.block.states;
    },
    transition() {
      return this.state?.transition;
    },
    conditions() {
      return this.state?.conditions;
    },
    disabled() {
      return !(this.interactive && this.transition);
    },
    entities() {
      return Object.keys(this.context);
    },
    passiveIndexes() {
      let conditions = [];

      if (this.requirements) conditions = conditions.concat(this.requirements);
      if (this.conditions)
        conditions = conditions.concat(
          this.transition
            ? this.conditions.filter((c) => c.passive)
            : this.conditions
        );

      return this.getConditionIndexes(conditions);
    },
    activeIndexes() {
      return this.transition && this.conditions
        ? this.getConditionIndexes(this.conditions.filter((c) => !c.passive))
        : [];
    },
  },
  watch: {
    id: {
      handler() {
        this.visible = false;
      },
      immediate: true,
    },
    context: {
      handler() {
        const visible =
          this.context && this.checkConditions(this.requirements)[0] == 1;

        if (visible) {
          const state = this.findBestState();
          if (state != this.state) this.switchState(state);
        } else if (this.state) {
          this.switchState(null);
        }

        this.visible = visible;
      },
      immediate: true,
    },
  },
  methods: {
    getConditionIndexes(conditions) {
      const entities = new Set(conditions.map((c) => c.entity));
      return [...entities].map((e) => this.entities.indexOf(e));
    },
    checkConditions(conditions) {
      return conditions?.length
        ? [
            conditions.reduce((f, { entity, tag }) => {
              return f + (tag ? this.context[entity]?.has(tag) : 1);
            }, 0) / conditions.length,
            conditions.length,
          ]
        : [1, 0];
    },
    findBestState(indexes) {
      let state = null;
      let fit = 0;
      let len = false;

      const states = indexes?.map((i) => this.states[i]) ?? this.states ?? [];
      states
        ?.filter((s) => s.conditions)
        .forEach((s) => {
          const [f, l] = this.checkConditions(s.conditions);

          if (fit == 1 ? f == 1 && l > len : f > fit) {
            state = s;
            fit = f;
            len = l;
          }
        });

      return state ?? states[0];
    },
    applyConditions(context, conditions, positive) {
      conditions
        ?.filter(({ passive, tag }) => !passive && tag)
        .forEach(({ entity, tag }) => {
          if (positive) context[entity]?.add(tag);
          else context[entity]?.delete(tag);
        });
    },
    switchState(state) {
      let context = Object.assign({}, this.context);

      this.applyConditions(context, this.state?.conditions, false);
      this.applyConditions(context, state?.conditions, true);

      this.state = state;
      this.$emit("update:context", context);
    },
    move() {
      if (this.disabled) return;
      if (typeof this.transition == "string") {
        let state;
        if (this.transition == "next") {
          const i = this.states.indexOf(this.state);
          state = this.states[(i + 1) % this.states.length];
        } else if (this.transition) {
          const i = this.transition.split(" ").map((i) => Number(i));
          state = this.findBestState(i);
        }
        this.switchState(state);
      } else if (this.transition) {
        // directly modify global environment
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  &.glossed {
    height: map-get($button-height, "normal") + map-get($margins, "normal");
  }
}
.disabled {
  padding: 0;
  background-color: transparent;
  &:hover,
  &:active {
    background-color: transparent;
  }
  cursor: default;
}
</style>
