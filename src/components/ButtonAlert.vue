<template>
  <div class="row-0">
    <template v-if="prompt">
      <Button class="alert" icon="delete_forever" @click="emit" />
      <Button icon="check" @click="prompt = false" />
    </template>
    <Button
      v-else
      class="alert"
      icon="delete"
      :text="text"
      @click="prompt = true"
    />
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "ButtonAlert",
  components: {
    Button,
  },
  props: ["text"],
  data() {
    return {
      prompt: false,
    };
  },
  methods: {
    emit() {
      this.prompt = false;
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss">
.alert * {
  color: var(--color-alert);
}
</style>
