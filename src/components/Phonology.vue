<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <QueryList
        class="space"
        :title="'Idioms'"
        :tags="idioms"
        :big="true"
        :locked="true"
        v-show="idioms.length>0"
        @query="idiomQuery=$event"
      />
      <QueryList :title="'Vowels'" :tags="vowelTags" @query="vowelQuery=$event" />
      <PhoneticTable
        class="space"
        :phonemes="vowels"
        :query="{...vowelQuery, ...idiomQuery}"
        @phoneme="selected=$event"
      />
      <QueryList :title="'Consonants'" :tags="consonantTags" @query="consonantQuery=$event" />
      <PhoneticTable
        class="space"
        :phonemes="consonants"
        :query="{...consonantQuery, ...idiomQuery}"
        @phoneme="selected=$event"
      />
    </div>
    <PhonemeDetails :langRoot="langRoot" :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryList from "./QueryList";
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
        data
          .sort((a, b) => a.str.localeCompare(b.str))
          .forEach(function(p, i) {
            p.i = i;
            p._all = p.tags.concat(p.idioms);
          });
        this.phonemes = data;
      },
      immediate: true
    }
  },
  data() {
    return {
      phonemes: undefined,
      idiomQuery: undefined,
      vowelQuery: undefined,
      consonantQuery: undefined,
      selected: 0
    };
  },
  components: {
    PhoneticTable,
    PhonemeDetails,
    QueryList
  },
  computed: {
    idioms: function() {
      return this.getTags(this.phonemes, "idioms");
    },
    vowels: function() {
      return this.categorize("vowel");
    },
    vowelTags: function() {
      return this.getTags(this.vowels, "tags", ["vowel"]);
    },
    consonants: function() {
      return this.categorize("consonant");
    },
    consonantTags: function() {
      return this.getTags(this.consonants, "tags", ["consonant"]);
    }
  },
  methods: {
    categorize(category) {
      return this.phonemes.filter(p => p.tags.includes(category));
    },
    getTags(phonemes, source, exclude = []) {
      let tags = new Set();
      phonemes.forEach(p => p[source]?.forEach(t => tags.add(t)));
      exclude.forEach(t => tags.delete(t));
      return [...tags];
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
.space:not(:last-child) {
  margin-bottom: 20px;
}
#phonemes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
#phonemes > * {
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>
