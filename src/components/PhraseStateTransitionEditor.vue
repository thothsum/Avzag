<template>
  <ActionHeader button="" icon="alt_route" header="transition">
    <template #header>
      <ToggleGroup
        :icons="['block', 'arrow_forward', 'star_outline']"
        :value.sync="mode"
      />
    </template>
    <div class="row-1 wrap block-editor" v-if="mode == 2">
      <div class="row" :key="i" v-for="(s, i) in states">
        <Button
          @click="toggle(i)"
          icon="check"
          :class="{ highlight: present[i] }"
        />
        <PhraseStateDisplay :state="s" :context="context" />
      </div>
    </div>
  </ActionHeader>
</template>
    
<script>
import Button from "./Button";
import ToggleGroup from "./ToggleGroup";
import ActionHeader from "./ActionHeader";
import PhraseStateDisplay from "./PhraseStateDisplay";

export default {
  name: "PhraseStateTransitionEditor",
  components: {
    Button,
    ToggleGroup,
    ActionHeader,
    PhraseStateDisplay,
  },
  props: ["state", "states", "context"],
  data() {
    return {
      mode: 0,
    };
  },
  computed: {
    ints() {
      return (
        this.state.transition
          ?.split(" ")
          .map((t) => Number(t))
          .filter((n) => !isNaN(n)) ?? []
      );
    },
    present() {
      return this.states.map((s, i) => this.ints.includes(i));
    },
  },
  watch: {
    state: {
      handler() {
        if (this.state.transition == "next") this.mode = 1;
        else if (this.state.transition) this.mode = 2;
        else this.mode = 0;
      },
      immediate: true,
    },
    mode() {
      if (this.mode == 1) this.$set(this.state, "transition", "next");
      else if (!this.mode) this.$set(this.state, "transition");
    },
  },
  methods: {
    toggle(i) {
      let ints = this.ints;
      if (ints.includes(i)) ints.splice(ints.indexOf(i), 1);
      else ints.push(i);

      if (this.mode == 2) this.$set(this.state, "transition", ints.join(" "));
    },
  },
};
</script>
