<template>
  <button>
    <p class="icon" v-if="icon">{{icon}}</p>
    <p v-if="text">{{text}}</p>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["icon", "text"],
};
</script>
