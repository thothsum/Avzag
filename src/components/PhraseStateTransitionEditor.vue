<template>
  <ActionHeader button="" icon="alt_route" header="transition">
    <template #header>
      <ToggleGroup
        :icons="['block', 'arrow_forward', 'star_outline']"
        :value.sync="mode"
      />
    </template>
  </ActionHeader>
</template>
    
<script>
import ToggleGroup from "./ToggleGroup";
import ActionHeader from "./ActionHeader";

export default {
  name: "PhraseStateTransitionEditor",
  components: { ToggleGroup, ActionHeader },
  props: ["transition", "states"],
  data() {
    return {
      mode: 0,
    };
  },
  watch: {
    value: {
      handler() {
        if (this.value) this.mode = 1;
        else this.mode = 0;
      },
      immediate: true,
    },
    mode: {
      handler() {
        let transition = "";
        if (this.mode) transition = "next";
        this.$emit("update:transition", transition);
      },
      immediate: true,
    },
  },
};
</script>
