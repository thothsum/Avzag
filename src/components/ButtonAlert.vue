<template>
  <div class="row-0">
    <template v-if="prompt">
      <Button @click.native="emit" class="alert" icon="delete_forever" />
      <Button @click.native="prompt = false" icon="check" />
    </template>
    <Button
      v-else
      @click.native="prompt = true"
      class="alert"
      icon="delete"
      :text="text"
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

<style lang="scss" >
.alert * {
  color: var(--color-alert);
}
</style>
