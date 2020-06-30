<template>
  <button
    class="small round"
    :class="{'highlight-confirm': value===1, 'highlight-alert': value===-1}"
    @click="update"
  >
    <p>{{text}}</p>
  </button>
</template>

<script>
export default {
  name: "QueryParam",
  props: ["text", "value"],
  model: {
    prop: "value",
    event: "update"
  },
  methods: {
    update() {
      this.$emit("update", ((this.value + 2) % 3) - 1);
    }
  }
};
</script>
