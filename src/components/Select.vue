<template>
  <select v-model="index">
    <option v-for="(l, i) in labels" :key="i" :value="i">{{ l }}</option>
  </select>
</template>

<script lang="ts">
import { computed, PropType, onMounted, toRaw, defineComponent } from "vue";

type Item = { [index: string]: string };
type Value = number | string | Item;

export default defineComponent({
  props: {
    modelValue: {
      type: [Number, String, Object as () => Item],
      default: "",
    },
    items: { type: Object as PropType<(string | Item)[]>, default: [] },
    labelKey: { type: [Number, String], default: "name" },
    type: {
      type: String as PropType<"item" | "label" | "index">,
      default: "item",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const labels = computed(() =>
      props.items.map((i) =>
        typeof i === "string" ? i : (i as Item)[props.labelKey]
      )
    );

    const index = computed({
      get: () => {
        const value = toRaw(props.modelValue);
        if (props.type === "item")
          return props.items.map((i) => toRaw(i)).indexOf(value as Item);
        if (props.type === "label") {
          const key = props.labelKey;
          return props.items.findIndex((i) => (i as Item)[key] === value);
        }
        return value as number;
      },
      set: (index) => {
        let value: Value = props.items[index];
        if (props.type === "label") value = (value as Item)[props.labelKey];
        else if (props.type === "index") value = index;
        emit("update:modelValue", value);
      },
    });

    onMounted(() => {
      if (index.value < 0) index.value = 0;
    });

    return { labels };
  },
});
</script>
