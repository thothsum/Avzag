<template>
  <ActionHeader button="" icon="alt_route" header="transition">
    <template #header>
      <ToggleGroup
        :icons="['block', 'arrow_forward', 'star_outline']"
        :value.sync="mode"
      />
    </template>
    <div class="panel-horizontal wrap" v-if="mode == 2">
      <div class="panel-horizontal-dense" :key="i" v-for="(s, i) in states">
        <Button
          @click.native="toggle(i)"
          icon="check"
          :class="{ highlight: bestOf[i] }"
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
  props: ["transition", "states", "context"],
  data() {
    return {
      mode: 0,
      bestOf: undefined,
    };
  },
  watch: {
    mode() {
      if (this.mode == 1) this.$emit("update:transition", "next");
      else if (this.mode == 2) this.calculateBestOf();
      else this.$emit("update:transition", null);
    },
    bestOf() {
      if (this.mode == 2) this.calculateBestOf();
    },
  },
  mounted() {
    console.log("updtas");
    if (!this.transition) this.mode = 0;
    else if (this.transition == "next") this.mode = 1;
    else {
      this.mode = 2;
      this.bestOf = [];
    }
  },
  methods: {
    calculateBestOf() {
      if (!this.bestOf) this.bestOf = [];
      this.$emit(
        "update:transition",
        this.bestOf
          .map((b, i) => [b, i])
          .filter((p) => p[0])
          .map((p) => p[1])
          .join(" ")
      );
    },
    toggle(i) {
      this.$set(this.bestOf, i, !this.bestOf[i]);
    },
  },
};
</script>
