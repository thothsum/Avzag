<template>
  <div class="section" v-if="entities">
    <div class="panel-horizontal" :key="i" v-for="(t, i) in translations">
      <b>{{ t.lect }}</b>
      <PhraseBlock
        @update="updateEntity"
        :entities="entities"
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
  watch: {
    entities: {
      handler() {
        console.log("changed entities");
      },
      deep: true,
    },
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
  methods: {
    updateEntity(vNew, vOld) {
      if (vOld) {
        let tOld = new Set(this.entities[vOld.entity]);
        vOld.tags.split(" ").forEach((t) => tOld.delete(t));
        this.entities = Object.assign({}, this.entities, {
          [vOld.entity]: tOld,
        });
      }

      let tNew = this.entities[vNew.entity];
      vNew.tags.split(" ").forEach((t) => tNew.add(t));
      this.entities = Object.assign({}, this.entities, {
        [vNew.entity]: tNew,
      });

      // this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
