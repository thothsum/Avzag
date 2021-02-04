<template>
  <button
    v-show="text"
    v-if="state"
    class="small"
    :class="{ disabled, glossed }"
    @click="move"
  >
    <VState :glossed="glossed" :state="state" @text="text = $event" />
  </button>
</template>

<script lang="ts">
import VState from "../State/index.vue";

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
import { Context, State } from "../types";
import { applyConditions, findBestState, checkConditions } from "../utils";

export default defineComponent({
  name: "Block",
  components: { VState },
  props: {
    block: { type: Array as PropType<State[]>, default: undefined },
    glossed: Boolean,
  },
  emits: ["update"],
  setup(props, { emit }) {
    const state = ref<State>();
    const text = ref("");
    watch(
      [state, text],
      ([state, text]) =>
        emit("update", {
          state,
          text,
        }),
      { immediate: true }
    );
    const disabled = computed(() => !state.value?.transition);
    const context = inject("context", {} as Ref<Context>);

    function switchState(nextState: undefined | State) {
      if (toRaw(nextState) === toRaw(state.value)) return;
      applyConditions(context, state.value?.conditions, false);
      applyConditions(context, nextState?.conditions, true);
      state.value = nextState;
    }

    const entities = computed(() => {
      const entities = props.block.flatMap(({ conditions }) =>
        Object.keys(conditions)
      );
      return [...new Set(entities)].map((e) => context.value[e]);
    });
    watch(
      entities,
      () => switchState(findBestState(undefined, props.block, context.value)),
      { immediate: true, deep: true }
    );

    function move() {
      if (disabled.value) return;
      const transition = state.value?.transition;
      const states = props.block;
      let nextState;

      if (transition === "next") {
        const i = state.value ? states.indexOf(toRaw(state.value)) : -1;
        nextState = states[(i + 1) % states.length];
      } else if (transition)
        nextState = findBestState(transition, states, context.value);

      switchState(nextState);
      if (checkConditions(nextState?.conditions, context.value)[0] < 0)
        state.value = undefined;
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
  &.disabled {
    padding: 0;
    background-color: transparent;
    &:hover,
    &:active {
      background-color: transparent;
    }
    cursor: default;
  }
}
</style>
