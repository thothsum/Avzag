<template>
  <button class="small" :disabled="disabled" v-show="visible" @click="move">
    <template v-if="interactive">
      <IndexedColor :indexes="indexEntity" />
      <IndexedColor :indexes="indexConditions" />
    </template>
    <p :class="{ 'text-ipa': canShowIpa, 'text-faded': implicit }">
      {{ displayedText }}
    </p>
  </button>
</template>

<script>
import IndexedColor from "./IndexedColor";

export default {
  name: "PhraseBlock",
  components: {
    IndexedColor,
  },
  props: ["entities", "requirements", "states", "interactive", "phonemic"],
  data() {
    return {
      state: undefined,
    };
  },
  computed: {
    valid() {
      return (
        !this.requirements ||
        this.requirements.every((r) => this.checkTags(r)[0] == 1)
      );
    },
    transition() {
      return this.state.transition;
    },
    disabled() {
      return !(this.interactive && this.transition);
    },
    implicit() {
      return this.state.implicit;
    },
    visible() {
      return this.valid && (this.interactive || !this.implicit);
    },
    canShowIpa() {
      return this.phonemic && this.variant?.ipa;
    },
    displayedText() {
      return this.canShowIpa ? this.state?.ipa : this.state?.text;
    },
    // passiveColors() {
    //   return this.transition?[]:;
    // },
    // indexEntity() {
    //   return this.getEntityIndex(this.locked ? "" : this.entity);
    // },
    // indexConditions() {
    //   return this.block.conditions?.map((c) => this.getEntityIndex(c.entity));
    // },
  },
  watch: {
    valid(to, from) {
      if (to && !from) this.applyState(this.findBestState());
    },
    entities() {
      if (this.valid) this.state = this.findBestState();
    },
  },
  methods: {
    getEntityIndex(entity) {
      const i = Object.keys(this.entities).indexOf(entity);
      return i >= 0 ? i : null;
    },
    checkTags({ entity, tags }) {
      if (!this.entities) return [0, 0];
      if (!tags) return [1, 0];

      tags = tags.split(" ");
      const fit = tags.filter((t) => this.entities[entity].has(t)).length;
      const len = tags.length;

      return [fit / len, len];
    },
    findBestState(indexes) {
      let state = 0;
      let fit = 0;
      let len = false;

      (this.indexes?.map((i) => this.states[i]) ?? this.states).forEach((s) => {
        const [f, l] = this.checkTags(s.conditions);
        if (fit == 1 ? f == 1 && l > len : f > fit) {
          state = s;
          fit = f;
          len = l;
        }
      });

      return state;
    },
    applyConditions(entities, conditions, positive) {
      conditions?.forEach(({ entity, tags }) =>
        tags.split(" ").forEach((t) => {
          if (positive) entities[entity]?.add(t);
          else entities[entity]?.delete(t);
        })
      );
    },
    applyState(state) {
      let entities = Object.assign({}, this.entities);

      this.applyConditions(entities, this.state?.conditions, false);
      this.applyConditions(entities, state?.conditions, true);

      this.state = state;
      this.$emit("update:entities", entities);
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
