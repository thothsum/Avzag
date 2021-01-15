<template>
  <button
    v-show="visible"
    v-if="state"
    class="small"
    :class="{ disabled, glossed }"
    @click="move"
  >
    <IndexedColor :passive="true" :indexes="passiveIndexes" />
    <IndexedColor :indexes="activeIndexes" />
    <Display
      ref="display"
      :glossed="glossed"
      :colored="true"
      :state="state"
      :context="context"
    />
  </button>
</template>

<script lang="ts">
import IndexedColor from "./IndexedColor.vue";
import Display from "./Display.vue";
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  toRaw,
  watch,
} from "vue";
import { Context, Block, State, Condition } from "../types";
import {
  applyConditions,
  findBestState,
  checkConditions,
  getEntityIndexes,
} from "./condition";

export default defineComponent({
  components: { IndexedColor, Display },
  props: {
    block: { type: Object as PropType<Block>, default: () => ({}) },
    glossed: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props) {
    const state = ref<State>();
    const visible = ref(false);
    const disabled = computed(() => !state.value?.transition);

    const context = inject("context", {} as Context);

    function switchState(nextState: undefined | State) {
      applyConditions(state.value?.conditions, context, false);
      applyConditions(nextState?.conditions, context, true);
      state.value = nextState;
    }
    watch(
      context,
      (context) => {
        const nextVisible =
          context &&
          checkConditions(props.block.requirements, context)[0] === 1;

        if (nextVisible) {
          const nextState = findBestState(
            undefined,
            props.block.states,
            context
          );
          if (toRaw(nextState) !== toRaw(state.value)) switchState(nextState);
        } else if (state.value) switchState(undefined);

        visible.value = nextVisible;
      },
      { immediate: true }
    );

    const entities = computed(() => Object.keys(context));
    const passiveIndexes = computed(() => {
      let conditions: Condition[] = [];

      if (props.block.requirements)
        conditions = conditions.concat(props.block.requirements);
      if (state.value?.conditions) {
        conditions = conditions.concat(
          state.value.transition
            ? state.value.conditions.filter((c) => c.passive)
            : state.value.conditions
        );
      }

      return getEntityIndexes(conditions, entities.value);
    });
    const activeIndexes = computed(() => {
      return state.value?.transition && state.value?.conditions
        ? getEntityIndexes(
            state.value?.conditions.filter(({ passive }) => !passive),
            entities.value
          )
        : [];
    });

    function move() {
      if (disabled.value) return;
      const transition = state.value?.transition;
      const states = props.block.states;
      if (typeof transition === "string") {
        let nextState;
        if (transition === "next") {
          const i = state.value ? states.indexOf(toRaw(state.value)) : -1;
          nextState = states[(i + 1) % states.length];
        } else if (transition) {
          const i = transition.split(" ").map((i) => Number(i));
          nextState = findBestState(i, states, context);
        }
        switchState(nextState);
      } else if (transition) {
        // directly modify global environment
      }
    }

    return {
      passiveIndexes,
      activeIndexes,
      move,
      context,
      state,
      visible,
      disabled,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  position: relative;
  &.glossed {
    height: map-get($button-height, "normal") + map-get($margins, "normal");
  }
}
.disabled {
  padding: 0;
  background-color: transparent;
  &:hover,
  &:active {
    background-color: transparent;
  }
  cursor: default;
}
</style>
