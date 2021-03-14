<template>
  <button
    v-show="show"
    v-if="state"
    ref="button"
    class="small"
    :class="{ disabled, glossed, flash }"
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
    const show = computed(() => state.value && text.value);
    watch(
      [state, text],
      ([state, text]) => emit("update", { state, text, show }),
      { immediate: true }
    );
    const transition = computed(() => state.value?.transition);
    const disabled = computed(
      () =>
        props.block.length < 2 || (transition.value && !transition.value.length)
    );
    const context = inject("context", {} as Ref<Context>);

    function switchState(nextState: undefined | State) {
      if (toRaw(nextState) === toRaw(state.value)) return;
      applyConditions(context, state.value?.conditions, false);
      applyConditions(context, nextState?.conditions, true);
      state.value = nextState;
    }

    const entities = computed(() => {
      const entities = props.block.flatMap(({ conditions }) =>
        conditions ? Object.keys(conditions) : []
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
      const states = props.block;
      let nextState;

      if (transition.value)
        nextState = findBestState(transition.value, states, context.value);
      else {
        const i = state.value ? states.indexOf(toRaw(state.value)) : -1;
        nextState = states[(i + 1) % states.length];
      }

      switchState(nextState);
      if (checkConditions(nextState?.conditions, context.value)[0] < 0)
        state.value = undefined;
    }

    const flash = ref(false);
    watch(state, () => {
      flash.value = false;
      setTimeout(() => (flash.value = true), 50);
    });

    return { flash, move, state, disabled, text, show };
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
.flash {
  animation: flash 2 * $transition;
}
@keyframes flash {
  50% {
    background-color: var(--color-press);
  }
}
</style>
