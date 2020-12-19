<template>
  <div class="row-0">
    <template v-if="prompt">
      <Button class="alert" icon="delete_forever" @click="confirm" />
      <Button icon="check" @click="toggle" />
    </template>
    <Button v-else class="alert" icon="delete" :text="text" @click="toggle" />
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import Button from "./Button";

export default defineComponent({
  components: { Button },
  props: {
    text: { type: String, default: "" },
  },
  emits: ["confirm"],
  setup(props, { emit }) {
    const prompt = ref(false);
    const toggle = () => (prompt.value = !prompt.value);
    const confirm = () => {
      toggle();
      emit("confirm");
    };
    return { prompt, toggle, confirm };
  },
});
</script>

<style lang="scss">
.alert * {
  color: var(--color-alert);
}
</style>
