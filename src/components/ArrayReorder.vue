<template>
  <div class="row-0">
    <btn icon="keyboard_arrow_up" @click="shiftMapping(-1)" />
    <btn icon="keyboard_arrow_down" @click="shiftMapping(1)" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRaw } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: Array, default: () => [] },
    item: { type: Object, default: undefined },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const array = computed({
      get: () => props.modelValue,
      set: (a) => emit("update:modelValue", a),
    });
    function shift(shift: number) {
      const length = array.value.length;
      const from = toRaw(array.value).indexOf(toRaw(props.item));
      const to = (from + shift + length) % length;
      array.value.splice(to, 0, array.value.splice(from, 1)[0]);
    }
    return { shift };
  },
});
</script>
