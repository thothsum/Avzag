<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <div class="table" :key="ctg" :set="phn=sortBy([ctg])" v-for="ctg in ['vowel', 'consonant']">
        <h3>{{ctg}}s</h3>
        <div class="query">
          <QueryItem
            :key="i"
            :tag="tag"
            @query="addQuery(tag, $event)"
            v-for="(tag, i) in tags(phn)"
          />
        </div>
        <PhonemeItem
          :phoneme="phonemes[i]"
          :faded="!queried.includes(i)"
          :key="i"
          v-for="i in phn"
          @click.native="selected=i"
        />
      </div>
    </div>
    <PhonemeDetails :langRoot="langRoot" :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryItem from "./QueryItem";
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
        this.queried = this.phonemes.map(p => p.i);
      },
      immediate: true
    }
  },
  data() {
    return {
      phonemes: undefined,
      selected: 0,
      query: new Set(),
      queried: []
    };
  },
  components: {
    PhonemeItem,
    PhonemeDetails,
    QueryItem
  },
  computed: {
    idioms: function() {
      let set = new Set();
      this.phonemes.forEach(p => p.idioms?.forEach(t => set.add(t)));
      return set;
    }
  },
  methods: {
    sortBy(tags) {
      let results = this.phonemes.map(p => p.i);
      tags.forEach(
        t => (results = results.filter(i => this.phonemes[i].tags.includes(t)))
      );
      return results;
    },
    tags: function(phn) {
      let set = new Set();
      phn.forEach(i => this.phonemes[i].tags?.forEach(t => set.add(t)));
      set.delete("vowel");
      set.delete("consonant");
      return set;
    },
    addQuery(tag, mode) {
      if (mode == 0) this.query.delete(tag);
      else if (mode == 1) this.query.add(tag);
      this.queried = this.sortBy(this.query);
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
