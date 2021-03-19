<template>
  <div class="display row" :class="{ glossed: canGloss }">
    <Notes
      class="col-0"
      :notes="texts"
      @texts="emit('text', $event.join('\n'))"
    />
    <div class="row dashes">
      <p v-for="(c, i) in dashColors" :key="i" :class="c" />
    </div>
  </div>
</template>

<script lang="ts">
import Notes from "@/components/Notes/index.vue";
import { computed, defineComponent, inject, PropType, Ref } from "vue";
import { Context, State } from "../types";

export default defineComponent({
  name: "State",
  components: { Notes },
  props: {
    state: { type: Object as PropType<State>, default: () => ({}) },
    glossed: { type: Boolean, default: false },
  },
  emits: ["text"],
  setup(props, { emit }) {
    const context = inject("context", {} as Ref<Context>);
    const entities = computed(() => Object.keys(context.value));
    const canGloss = computed(
      () =>
        props.glossed &&
        props.state &&
        (props.state.text.ipa || props.state.text.glossed)
    );

    const texts = computed(() => {
      const texts = [] as string[];
      if (canGloss.value) {
        if (props.state.text.ipa) texts.push("/" + props.state.text.ipa + "/");
        if (props.state.text.glossed) texts.push(props.state.text.glossed);
      } else texts.push(props.state.text.plain);
      return texts;
    });

    const dashColors = computed(() =>
      (!props.state.transition || props.state.transition.length) &&
      props.state.conditions
        ? Object.entries(props.state.conditions)
            .filter(([, tags]) => Object.values(tags).some((flag) => flag))
            .map(([entity]) => entities.value.indexOf(entity))
            .map((i) => "colored-back-" + i)
        : []
    );

    return { texts, canGloss, dashColors, emit };
  },
});
</script>

<style lang="scss" scoped>
.display {
  height: map-get($button-height, "small");
  position: relative;
  &.glossed {
    height: map-get($button-height, "normal") + map-get($margins, "normal");
  }
}
.dashes {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-width;
  width: 100%;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  > * {
    height: 100%;
    width: 4 * $border-width;
  }
}
</style>
