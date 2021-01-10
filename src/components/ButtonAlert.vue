<template>
  <div class="row-0">
    <template v-if="prompt">
      <control
        class="highlight-font-alert"
        icon="delete_forever"
        @click="confirm"
      />
      <control icon="check" @click="prompt = false" />
    </template>
    <control
      v-else
      class="highlight-font-alert"
      icon="delete"
      :text="text"
      @click="prompt = true"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  props: {
    text: { type: String, default: "" },
  },
  emits: ["confirm"],
  setup(props, { emit }) {
    const prompt = ref(false);
    function confirm() {
      prompt.value = false;
      emit("confirm");
    }
    return { prompt, confirm };
  },
});
</script>
