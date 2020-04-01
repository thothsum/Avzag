<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <div
        class="table"
        :key="ctg"
        :set="phn=sortBy(ctg)"
        v-for="ctg in ['Vowel', 'Consonant']"
      >
        <h3>{{ctg}}s</h3>
        <div class="query">
          <p :key="i" v-for="(v, i) in tags(phn)">{{v}}</p>
        </div>
        <PhonemeItem
          :phoneme="p"
          :faded="!p.tags.includes('ejective')"
          :key="p.i"
          v-for="p in phn"
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
  computed: {
    idioms: function() {
      let set = new Set();
      this.phonemes.forEach(p => p.idioms?.forEach(t => set.add(t)));
      return set;
    }
  },
  methods: {
    sortBy(tag) {
      if (!this.phonemes) return;
      tag = tag.toLowerCase();
      return this.phonemes.filter(p => p.tags.includes(tag));
    },
    tags: function(phn) {
      let set = new Set();
      phn.forEach(p => p.tags?.forEach(t => set.add(t)));
      set.delete("vowel");
      set.delete("consonant");
      return set;
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

.table {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.table > * {
  margin: 5px;
}

h3 {
  width: 100%;
}

.query {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
}

.query > p {
  margin: 0 5px;
  font-style: italic;
  font-size: 12px;
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
