<template>
  <button
    v-show="visible"
    v-if="state"
    class="small"
    :class="{ disabled, glossed }"
    @click="move"
  >
    <!-- <IndexedColor :passive="true" :indexes="passiveIndexes" /> -->
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
  Ref,
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
    const requirements = computed(() => props.block.requirements);
    const conditions = computed(() => state.value?.conditions);
    const transition = computed(() => state.value?.transition);
    const disabled = computed(() => !transition.value);
    const visible = ref(false);
    const display = ref();

    const context = inject("context", {} as Ref<Context>);

    function switchState(nextState: undefined | State) {
      applyConditions(state.value?.conditions, context, false);
      applyConditions(nextState?.conditions, context, true);
      state.value = nextState;
    }
    watch(
      context,
      (context) => {
        const nextVisible =
          context && checkConditions(requirements.value, context)[0] === 1;

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
      { immediate: true, deep: true }
    );

    const entities = computed(() => Object.keys(context.value));
    const passiveIndexes = computed(() => {
      let _conditions: Condition[] = [];

      if (requirements.value)
        _conditions = _conditions.concat(requirements.value);
      if (conditions.value) {
        _conditions = _conditions.concat(
          transition.value
            ? conditions.value.filter((c) => c.passive)
            : conditions.value
        );
      }

      return getEntityIndexes(_conditions, entities.value);
    });
    const activeIndexes = computed(() => {
      return transition.value && conditions.value
        ? getEntityIndexes(
            conditions.value.filter(({ passive }) => !passive),
            entities.value
          )
        : [];
    });

    function move() {
      if (disabled.value) return;
      const states = props.block.states;
      if (typeof transition.value === "string") {
        let nextState;
        if (transition.value === "next") {
          const i = state.value ? states.indexOf(toRaw(state.value)) : -1;
          nextState = states[(i + 1) % states.length];
        } else if (transition.value) {
          const i = transition.value.split(" ").map((i) => Number(i));
          nextState = findBestState(i, states, context.value);
        }
        switchState(nextState);
      } else if (transition.value) {
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
      display,
      conditions,
      requirements,
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
