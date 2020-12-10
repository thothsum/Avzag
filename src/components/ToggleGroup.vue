<template>
  <div class="row">
    <Button
      v-for="(ic, i) in icons"
      :icon="ic"
      :class="{ highlight: i == value }"
      @click="$emit('update:value', i)"
    />
  </div>
</template>
    
<script>
import Button from "./Button";

export default {
  name: "ToggleGroup",
  components: { Button },
  props: ["icons", "value"],
};
</script>
