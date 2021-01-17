<template>
  <EditorCard button="" icon="alt_route" header="transition">
    <template #header>
      <div class="row">
        <btn
          v-for="(ic, i) in icons"
          :key="ic"
          :icon="ic"
          :is-on="mode === i"
          @click="mode = i"
        />
      </div>
    </template>
    <div v-if="mode === 2" class="row-1 wrap block-editor">
      <div v-for="(s, i) in states" :key="i" class="row">
        <btn icon="check" :is-on="present[i]" @click="toggle(i)" />
        <Display :state="s" />
      </div>
    </div>
  </EditorCard>
</template>

<script>
import EditorCard from "@/components/EditorCard";
import Display from "./Display";

export default {
  name: "PhraseStateTransitionEditor",
  components: {
    EditorCard,
    Display,
  },
  props: ["state", "states"],
  data() {
    return {
      mode: 0,
      icons: ["block", "arrow_forward", "star_outline"],
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
        if (this.state.transition === "next") this.mode = 1;
        else if (this.state.transition) this.mode = 2;
        else this.mode = 0;
      },
      immediate: true,
    },
    mode() {
      if (this.mode === 1) this.$set(this.state, "transition", "next");
      else if (!this.mode) this.$set(this.state, "transition");
    },
  },
  methods: {
    toggle(i) {
      const ints = this.ints;
      if (ints.includes(i)) ints.splice(ints.indexOf(i), 1);
      else ints.push(i);

      if (this.mode === 2) this.$set(this.state, "transition", ints.join(" "));
    },
  },
};
</script>
