<template>
  <button
    class="small"
    :class="{ 'text-faded': implicit, glossed }"
    :disabled="disabled"
    v-show="valid"
    @click="move"
  >
    <template v-if="interactive">
      <IndexedColor :passive="true" :indexes="passiveColors" />
      <IndexedColor :indexes="activeColors" />
    </template>
    <div v-if="glosses" class="glosses">
      <p class="text-ipa">{{ glosses[0] }}</p>
      <p>{{ glosses[1] }}</p>
    </div>
    <p v-else>{{ text }}</p>
  </button>
</template>

<script>
import IndexedColor from "./IndexedColor";

export default {
  name: "PhraseBlock",
  components: {
    IndexedColor,
  },
  props: ["id", "context", "requirements", "states", "interactive", "glossed"],
  data() {
    return {
      state: undefined,
      valid: false,
    };
  },
  computed: {
    transition() {
      return this.state?.transition;
    },
    implicit() {
      return this.state?.implicit;
    },
    text() {
      return this.state?.text;
    },
    glosses() {
      return this.glossed ? this.state?.glosses : null;
    },
    conditions() {
      return this.state?.conditions;
    },
    disabled() {
      return !(this.interactive && this.transition);
    },
    display() {
      return this.glosses ? this.glosses.join("\n") + "\n" : this.text + " ";
    },
    entities() {
      return Object.keys(this.context);
    },
    passiveColors() {
      let conditions = [];

      if (this.requirements) conditions = conditions.concat(this.requirements);
      if (this.conditions)
        conditions = conditions.concat(
          this.transition
            ? this.conditions.filter((c) => c.passive)
            : this.conditions
        );

      return this.getConditionColors(conditions);
    },
    activeColors() {
      return this.transition && this.conditions
        ? this.getConditionColors(this.conditions.filter((c) => !c.passive))
        : [];
    },
  },
  watch: {
    id: {
      handler() {
        this.valid = false;
      },
      immediate: true,
    },
    context: {
      handler() {
        const valid =
          this.context &&
          (!this.requirements ||
            this.normalizeConditions(this.requirements)[0] == 1);

        if (valid) {
          const state = this.findBestState();
          if (this.valid) this.state = state;
          else this.applyState(state);
        } else if (this.state) {
          this.applyState(null);
          this.state = null;
        }

        this.valid = valid;
      },
      immediate: true,
    },
  },
  methods: {
    getConditionColors(conditions) {
      const entities = new Set(conditions.map((c) => c.entity));
      return [...entities].map((e) => this.entities.indexOf(e));
    },
    checkTag({ entity, tag }) {
      if (!this.context) return [0, 0];
      if (!tag) return [1, 0];
      return [this.context[entity].has(tag), 1];
    },
    normalizeConditions(conditions) {
      let f = 0;
      let l = 0;
      conditions.forEach((c) => {
        const [_f, _l] = this.checkTag(c);
        f += _f;
        l += _l;
      });
      return [f / conditions.length, l];
    },
    findBestState(indexes) {
      let state = null;
      let fit = 0;
      let len = false;

      const states = indexes?.map((i) => this.states[i]) ?? this.states;
      states
        .filter((s) => s.conditions)
        .forEach((s) => {
          const [f, l] = this.normalizeConditions(s.conditions);

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
        ?.filter((c) => !c.passive && c.tag)
        .forEach(({ entity, tag }) => {
          if (positive) context[entity]?.add(tag);
          else context[entity]?.delete(tag);
        });
    },
    applyState(state) {
      let context = Object.assign({}, this.context);

      this.applyConditions(context, this.state?.conditions, false);
      this.applyConditions(context, state?.conditions, true);

      this.$emit("update:context", context);
    },
    move() {
      if (typeof this.transition == "string") {
        if (this.transition == "next") {
          const i = this.states.indexOf(this.state);
          const state = this.states[(i + 1) % this.states.length];
          this.applyState(state);
        } else {
          const i = this.transition.split(" ").map((i) => Number(i));
          this.applyState(this.findBestState(i));
        }
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
    height: map-get($button-height, "normal") + 8px;
  }
}
.glosses {
  text-align: left;
  > :nth-child(2) {
    font-variant-caps: unicase;
  }
}
:disabled {
  padding: 0;
  background-color: transparent;
  cursor: default;
  p:not(.text-faded) {
    color: var(--color-text);
  }
  &:hover,
  &:active {
    background-color: transparent;
  }
}
</style>
