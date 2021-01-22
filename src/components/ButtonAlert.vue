<template>
  <btn
    class="highlight-font-alert"
    :icon="icon"
    :text="text"
    @click="confirm"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: { type: String, default: "Delete?" },
    icon: { type: String, default: "delete" },
    text: { type: String, default: "" },
  },
  emits: ["confirm"],
  setup(props, { emit }) {
    function confirm() {
      if (window.confirm(props.message)) emit("confirm");
    }
    return { confirm };
  },
});
</script>
