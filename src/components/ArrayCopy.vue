<template>
  <btn icon="add_box" @click="copy" />
</template>

<script lang="ts">
import { defineComponent, toRaw, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: { type: Array, default: () => undefined },
    item: { type: Object, default: undefined },
  },
  emits: ["update:modelValue", "update:item"],
  setup(props, { emit }) {
    const array = computed({
      get: () => props.modelValue,
      set: (a) => emit("update:modelValue", a),
    });
    function copy() {
      const copy = JSON.parse(JSON.stringify(toRaw(props.item)));
      array.value.push(copy);
      emit("update:item", copy);
    }
    return { copy };
  },
});
</script>
