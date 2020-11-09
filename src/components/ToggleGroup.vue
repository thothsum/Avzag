<template>
  <div class="panel-horizontal-dense">
    <Button
      :key="i"
      v-for="(ic, i) in icons"
      :icon="ic"
      :class="{ highlight: i == value }"
      @click.native="$emit('update:value', i)"
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
