<template>
  <button
    v-if="state"
    class="small"
    :class="{ disabled, glossed }"
    @click="move"
  >
    <Display :glossed="glossed" :state="state" @text="text = $event" />
  </button>
</template>

<script lang="ts">
import Display from "./Display.vue";
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  Ref,
  toRaw,
  watch,
} from "vue";
import { Context, Block, State } from "../types";
import { applyConditions, findBestState, checkConditions } from "./condition";

export default defineComponent({
  components: { Display },
  props: {
    block: { type: Object as PropType<Block>, default: () => ({}) },
    glossed: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props) {
    const state = ref<State>();
    const requirements = computed(
      () => checkConditions(props.block.requirements, context.value)[0] === 1
    );
    const disabled = computed(() => !state.value?.transition);
    const text = ref("");

    const context = inject("context", () => ({} as Ref<Context>));

    function switchState(nextState: undefined | State) {
      applyConditions(state.value?.conditions, context, false);
      applyConditions(nextState?.conditions, context, true);
      state.value = nextState;
    }
    watch(
      context,
      (context) => {
        if (requirements.value) {
          const nextState = findBestState(
            undefined,
            props.block.states,
            context
          );
          if (toRaw(nextState) !== toRaw(state.value)) switchState(nextState);
        } else if (state.value) switchState(undefined);
      },
      { immediate: true, deep: true }
    );

    function move() {
      if (disabled.value) return;
      const states = props.block.states;
      const transition = state.value?.transition;
      let nextState;

      if (transition === "next") {
        const i = state.value ? states.indexOf(toRaw(state.value)) : -1;
        nextState = states[(i + 1) % states.length];
      } else if (transition) {
        const i = transition.split(" ").map((i) => Number(i));
        nextState = findBestState(i, states, context.value);
      }
      switchState(nextState);
      if (!requirements.value) state.value = undefined;
    }

    return {
      move,
      state,
      disabled,
      text,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  height: fit-content;
  padding: 0;
  &.disabled {
    padding: 0;
    background-color: transparent;
    &:hover,
    &:active {
      background-color: transparent;
    }
    cursor: default;
  }
  &:not(.disabled) > * {
    padding: 0 map-get($margins, "normal");
  }
}
</style>
