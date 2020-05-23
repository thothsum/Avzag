<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <QueryList
        class="space"
        :title="'Lects'"
        :tags="lects"
        :big="true"
        :locked="true"
        v-show="lects.length>0"
        @query="lectQuery=$event"
      />
      <QueryList :title="'Vowels'" :tags="vowelFeatures" @query="vowelQuery=$event" />
      <PhoneticTable
        class="space"
        :phonemes="vowels"
        :featureQuery="vowelQuery"
        :lectQuery="lectQuery"
        @phoneme="selected=$event"
      />
      <QueryList :title="'Consonants'" :tags="consonantFeatures" @query="consonantQuery=$event" />
      <PhoneticTable
        class="space"
        :phonemes="consonants"
        :featureQuery="consonantQuery"
        :lectQuery="lectQuery"
        @phoneme="selected=$event"
      />
    </div>
    <PhonemeDetails :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryList from "@/components/QueryList";
import PhoneticTable from "@/components/PhoneticTable";
import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  data() {
    return {
      phonemes: undefined,
      lectQuery: {},
      vowelQuery: {},
      consonantQuery: {},
      selected: 0
    };
  },
  components: {
    PhoneticTable,
    PhonemeDetails,
    QueryList
  },
  computed: {
    lects: function() {
      return this.collectTags(
        this.phonemes.flatMap(p => p.lects.map(l => l.name))
      );
    },
    vowels: function() {
      return this.categorize("vowel");
    },
    vowelFeatures: function() {
      return this.collectTags(
        this.vowels.flatMap(p => p.features),
        ["vowel"]
      );
    },
    consonants: function() {
      return this.categorize("consonant");
    },
    consonantFeatures: function() {
      return this.collectTags(
        this.consonants.flatMap(p => p.features),
        ["consonant"]
      );
    }
  },
  watch: {
    "$route.params.lang": async function() {
      await this.load();
    }
  },
  async created() {
    await this.load();
  },
  methods: {
    async load() {
      const langRoot = this.$getPath(this.$route.params.lang);
      console.log("phonology", langRoot);

      let data = await fetch(langRoot + "phonology.json").then(r => r.json());
      data.sort((a, b) => a.ipa.localeCompare(b.ipa));
      data.forEach((p, i) => {
        p.i = i;
        p.lects.sort((a, b) => a.name.localeCompare(b.name));
      });

      this.phonemes = data;
      this.selected = 0;
    },
    categorize(category) {
      return this.phonemes.filter(p => p.features.includes(category));
    },
    collectTags(tags, exclude = []) {
      let result = new Set();
      tags.filter(t => !exclude.includes(t)).forEach(t => result.add(t));
      return [...result];
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
  margin-bottom: 10px;
}
#phonemes {
  display: flex;
  flex-direction: column;
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
