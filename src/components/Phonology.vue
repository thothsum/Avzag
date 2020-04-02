<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <PhoneticTable
        :key="ctg"
        :category="ctg"
        :phonemes="categorize(ctg)"
        @phoneme="selected=$event"
        v-for="ctg in ['vowel', 'consonant']"
      />
    </div>
    <PhonemeDetails :langRoot="langRoot" :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import PhoneticTable from "./PhoneticTable";
import PhonemeDetails from "./PhonemeDetails";

export default {
  name: "Phonology",
  props: ["langRoot"],
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "phonemes.json");
        let data = await res.json();
        data.sort((a, b) => a.str.localeCompare(b.str));
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
    PhoneticTable,
    PhonemeDetails
  },
  computed: {
    idioms: function() {
      let set = new Set();
      this.phonemes.forEach(p => p.idioms?.forEach(t => set.add(t)));
      return set;
    }
  },
  methods: {
    categorize(category) {
      return this.phonemes.filter(p => p.tags.includes(category));
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

#phonemes {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
