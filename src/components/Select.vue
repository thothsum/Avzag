<template>
  <select v-model="index">
    <option v-for="(l, i) in labels" :key="i" :value="i">{{ l }}</option>
  </select>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  ref,
  PropType,
  defineEmit,
  onMounted,
  watch,
} from "vue";

type Item = { [index: string]: string };
type Value = number | string | Item;

const props = defineProps({
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
});
const emit = defineEmit(["update:modelValue"]);

const labels = computed(() =>
  props.items.map((i) =>
    typeof i === "string" ? i : (i as Item)[props.labelKey]
  )
);
const index = ref(0);
//  computed({
//   const value = props.modelValue;
//   if (props.type === "item") return props.items.indexOf(value as Item);
//   if (props.type === "label") {
//     const key = props.labelKey;
//     return props.items.findIndex((i) => (i as Item)[key] === value);
//   }
//   return value as number;
// });

function select(index = 0) {
  let value: object | string | number = props.items[index];
  if (props.type === "label") value = (value as Item)[props.labelKey];
  else if (props.type === "index") value = index;
  emit("update:modelValue", value);
}

watch(index, (index) => select(index));
onMounted(() => select());

//   values() {
//     return this.indexed ? this.items.map((_, i) => i) : this.items;
//   },
// },

// watch: {
//   value: {
//     handler(v) {
//       const i = this.values?.indexOf(v) ?? 0;
//       this.index = i < 0 ? 0 : i;
//     },
//     immediate: true,
//   },
//   index: {
//     handler(i) {
//       this.$emit("update:value", this.values[i]);
//     },
//     immediate: true,
//   },
// },
</script>
