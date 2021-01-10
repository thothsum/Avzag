<template>
  <input v-model="input" :placeholder="placeholder" type="text" />
</template>

<script lang="ts">
import { ref, PropType, computed, watchEffect, defineComponent } from "vue";
import { Query } from "./types";

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<Query>, default: {} },
    placeholder: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const input = ref("");
    const query = computed({
      get: () => props.modelValue,
      set: (q) => emit("update:modelValue", q),
    });

    watchEffect(
      () =>
        (query.value = input.value
          .toLowerCase()
          .split(" ")
          .filter((s) => s)
          .reduce((q, t) => {
            if (t[0] === "-") q[t.substr(1)] = false;
            else q[t] = true;
            return q;
          }, {} as Query))
    );

    return { input };
  },
});
</script>

<style lang="scss" scoped>
input {
  width: 350px;
}
@media only screen and (max-width: $mobile-width) {
  input {
    width: 100%;
  }
}
</style>
