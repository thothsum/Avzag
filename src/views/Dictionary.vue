<template>
  <div class="section" v-if="dictionary">
    vaya shyas chyo budet
  </div>
</template>

<script>
export default {
  name: "Dictionary",
  components: {},
  data() {
    return {};
  },
  computed: {
    dictionary() {
      return this.$store.state.dictionary;
    }
  },
  methods: {}
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
}
</style>
