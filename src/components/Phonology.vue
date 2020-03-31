<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <div class="table" :key="ctg" v-for="ctg in ['Vowel', 'Consonant']">
        <h3>{{ctg}}s</h3>
        <PhonemeItem
          :phoneme="phn"
          :key="phn.i"
          v-for="phn in sortBy(ctg)"
          @click.native="selected=phn.i"
        />
      </div>
    </div>
    <PhonemeDetails :langRoot="langRoot" :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import PhonemeItem from "./PhonemeItem";
import PhonemeDetails from "./PhonemeDetails";

export default {
  name: "Phonology",
  props: ["langRoot"],
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "phonemes.json");
        let data = await res.json();
        data.sort((a, b) => a.str - b.str);
        data.forEach((p, i) => (p.i = i));
        this.phonemes = data;
      },
      immediate: true
    }
  },
  data() {
    return {
      phonemes: undefined,
      selected: 0
    };
  },
  components: {
    PhonemeItem,
    PhonemeDetails
  },
  methods: {
    sortBy(tag) {
      if (!this.phonemes) return;

      tag = tag.toLowerCase();
      return this.phonemes.filter(p => p.tags.includes(tag));
    }
  }
};
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 20px;
}

.section #phonemes {
  display: grid;
  gap: 20px;
}

.table {
  display: flex;
  flex-wrap: wrap;
  padding: -5px;
}

.table > * {
  margin: 5px;
}

h3 {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  .table {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    margin: -5px;
  }

  h3 {
    text-align: center;
  }
}
</style>
