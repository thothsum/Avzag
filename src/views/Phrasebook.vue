<template>
  <div class="section" v-if="entites">
    <div :key="i" v-for="(t, i) in translations">
      <h3>{{ t.lect }}</h3>
      <PhraseBlock
        v-model="entites"
        :block="b"
        :key="j"
        v-for="(b, j) in t.blocks"
      />
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
  mounted() {
    console.log(process.env.BASE_URL);
    const phrasebook = fetch(
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
#header {
  select {
    font-weight: bold;
  }
  > *:nth-child(2) {
    flex: 1;
  }
}
.section {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: map-get($margins, "double");
}
.panel-solid {
  h3 {
    margin-bottom: map-get($margins, "normal");
    &:not(:first-child) {
      margin-top: map-get($margins, "normal");
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
  }
  .panel-solid {
    max-height: 7 * map-get($button-height, "normal");
  }
}
</style>
