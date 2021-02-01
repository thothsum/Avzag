<template>
  <div class="row">
    <btn v-if="add !== undefined" icon="add" @click="action.add" />
    <template v-if="array && item">
      <btn v-if="copy" icon="queue" @click="action.copy" />
      <div v-if="shiftTwo" class="row-0">
        <btn icon="keyboard_arrow_up" @click="action.shift(-1)" />
        <btn icon="keyboard_arrow_down" @click="action.shift(1)" />
      </div>
      <btn
        v-else-if="shift"
        icon="keyboard_arrow_right"
        @click="action.shift(1)"
      />
      <ConfirmButton v-if="remove" @confirm="action.remove" />
    </template>
  </div>
</template>

<script lang="ts">
import ConfirmButton from "@/components/ConfirmButton.vue";
import { defineComponent, toRaw, computed, watch, nextTick } from "vue";

export default defineComponent({
  name: "ArrayControl",
  components: { ConfirmButton },
  props: {
    modelValue: { type: Array, default: () => undefined },
    item: { type: Object, default: undefined },
    add: {
      type: [Number, String, Object, Function],
      default: undefined,
    },
    copy: Boolean,
    shift: Boolean,
    shiftTwo: Boolean,
    remove: Boolean,
  },
  emits: ["update:modelValue", "update:item"],
  setup(props, { emit }) {
    const array = computed({
      get: () => props.modelValue,
      set: (i) => emit("update:modelValue", i),
    });
    watch(array, last, { immediate: true });
    function last() {
      emit(
        "update:item",
        array.value ? array.value[array.value.length - 1] : undefined
      );
    }
    async function add() {
      let item: unknown = props.add;
      if (!item === undefined) return;
      if (!array.value) {
        array.value = [];
        await nextTick();
      }
      item =
        typeof item === "function"
          ? item()
          : typeof item === "object"
          ? JSON.parse(JSON.stringify(item))
          : item;
      array.value.push(item);
      last();
    }
    function copy() {
      const copy = JSON.parse(JSON.stringify(toRaw(props.item)));
      array.value.push(copy);
      last();
    }
    function shift(shift: number) {
      const length = array.value.length;
      const item = props.item;
      const from = array.value.indexOf(toRaw(item));
      const to = (from + shift + length) % length;
      array.value.splice(from, 1);
      array.value.splice(to, 0, item);
    }
    function remove() {
      const index = array.value.indexOf(toRaw(props.item));
      array.value.splice(index, 1);
      last();
    }
    return { array, action: { add, copy, shift, remove } };
  },
});
</script>
