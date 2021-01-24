<template>
  <div class="row">
    <btn v-if="defaultItem" icon="add" @click="action.add" />
    <template v-if="array && item">
      <btn v-if="copy" icon="queue" @click="action.copy" />
      <div class="row-0">
        <btn icon="keyboard_arrow_up" @click="action.shift(-1)" />
        <btn icon="keyboard_arrow_down" @click="action.shift(1)" />
      </div>
      <ConfirmButton @click="action.remove" />
    </template>
  </div>
</template>

<script lang="ts">
import ConfirmButton from "@/components/ConfirmButton.vue";
import { defineComponent, toRaw, computed, watch, PropType } from "vue";

export default defineComponent({
  name: "ArrayControl",
  components: { ConfirmButton },
  props: {
    modelValue: { type: Array, default: () => undefined },
    item: { type: Object, default: undefined },
    defaultItem: {
      type: Object as PropType<undefined | unknown | (() => unknown)>,
      default: undefined,
    },
    copy: Boolean,
    shift: Boolean,
    remove: Boolean,
  },
  emits: ["update:modelValue", "update:item"],
  setup(props, { emit }) {
    const array = computed({
      get: () => props.modelValue,
      set: (i) => emit("update:modelValue", i),
    });
    const item = computed<unknown>({
      get: () => props.item,
      set: (a) => emit("update:item", a),
    });
    watch(
      [array, item],
      () => {
        if (array.value && !item.value)
          item.value = array.value[array.value.length - 1];
      },
      { immediate: true }
    );

    function add() {
      const defaultItem: undefined | unknown | (() => unknown) =
        props.defaultItem;
      if (!defaultItem) return;
      if (!array.value) array.value = [];
      const newItem =
        typeof defaultItem === "function"
          ? defaultItem()
          : JSON.parse(JSON.stringify(defaultItem));
      array.value.push(newItem);
      item.value = newItem;
    }
    function copy() {
      const copy = JSON.parse(JSON.stringify(toRaw(props.item)));
      array.value.push(copy);
      item.value = copy;
    }
    function shift(shift: number) {
      const length = array.value.length;
      const from = toRaw(array.value).indexOf(toRaw(item.value));
      const to = (from + shift + length) % length;
      array.value.splice(to, 0, array.value.splice(from, 1)[0]);
    }
    function remove() {
      const target = toRaw(props.item);
      const index = toRaw(array.value).indexOf(target);
      array.value.splice(index, 1);
      item.value = array.value[array.value.length - 1];
    }
    return { array, action: { add, copy, shift, remove } };
  },
});
</script>
