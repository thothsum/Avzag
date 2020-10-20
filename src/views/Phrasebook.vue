<template>
  <div class="section panel" v-if="entities">
    <div class="panel-horizontal card" :key="i" v-for="(t, i) in translations">
      <h2>{{ t.lect }}</h2>
      <p class="text-dot"></p>
      <div class="panel-horizontal-dense wrap flex">
        <PhraseBlock
          v-model="entities"
          :block="b"
          :key="j"
          v-for="(b, j) in t.blocks"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PhraseBlock from "@/components/PhraseBlock";

export default {
  name: "Phrasebook",
  components: {
    PhraseBlock,
  },
  data() {
    return {
      entities: undefined,
      translations: undefined,
    };
  },
  async mounted() {
    const phrasebook = await fetch(
      process.env.BASE_URL + "lects/phrasebook.json"
    ).then((r) => r.json());

    this.entities = {};
    phrasebook.entities.forEach(
      (e) => (this.entities[e.id] = new Set(e.tags.split(" ")))
    );

    this.translations = phrasebook.translations;
  },
};
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>
