<template>
  <div class="section panel-sparse small">
    <div id="header" class="panel-horizontal-dense wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <Button @click.native="loadFromLect" text="load from lect" />
      <Button @click.native="loadFromJson" text="load from JSON" />
      <Button @click.native="saveToJson" text="save JSON to clipboard" />
      <Button @click.native="reset" text="reset" />
    </div>
    <div class="grid small" v-if="phrasebook">
      <div class="panel-sparse">
        <div class="panel wrap card">
          <div class="panel-horizontal">
            <h2>Category</h2>
            <Select class="flex" :value.sync="category" :items="categories" />
          </div>
          <div class="panel-horizontal" v-if="category">
            <h2>Phrase</h2>
            <Select
              class="flex"
              :value.sync="selected"
              :items="phrases"
              display="preview"
              :indexed="true"
            />
          </div>
          <div class="panel-horizontal-dense wrap" v-if="phrase">
            <PhraseBlock
              :id="selected"
              :context.sync="context"
              :interactive="true"
              :block="b"
              :key="i"
              v-for="(b, i) in phrase.blocks"
            />
          </div>
          <PhraseContext :context="context" />
        </div>
        <div class="panel wrap card" v-if="translation">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Translation</h2>
            <Button
              @click.native="editNotes"
              :class="{ highlight: conditionsProperty == 'Notes' }"
              icon="sticky_note_2"
              text="Notes"
            />
            <Button
              @click.native="editLocalizedContext"
              :class="{ highlight: conditionsProperty == 'Localized context' }"
              icon="format_list_bulleted"
              text="Context"
            />
          </div>
          <div class="panel-horizontal wrap">
            <div
              class="panel-horizontal-solid"
              :key="i"
              v-for="(b, i) in translation.blocks"
            >
              <PhraseBlock
                :id="selected"
                :context.sync="context"
                :interactive="true"
                :block="b"
              />
              <Button
                @click.native="block = b"
                icon="edit"
                :class="{ highlight: block == b }"
              />
            </div>
            <Button @click.native="addBlock" icon="add" />
          </div>
          <PhraseContext
            v-if="translation.context"
            :context="context"
            :translation="translation.context"
          />
        </div>
        <div class="panel-dense" v-if="conditionsProperty && conditions">
          <div class="panel-horizontal-dense">
            <h2 class="flex">{{ conditionsProperty }}</h2>
            <Button @click.native="addCondition(null)" icon="add" />
          </div>
          <template v-if="conditionsProperty == 'Notes'">
            <div
              class="panel-horizontal-dense"
              :key="i"
              v-for="(_, i) in translation.notes"
            >
              <input type="text" v-model="translation.notes[i]" class="flex" />
              <Button @click.native="deleteCondition(i)" icon="delete" />
            </div>
          </template>
          <template v-else-if="conditionsProperty == 'Localized context'">
            <div
              class="panel-horizontal-dense"
              :key="i"
              v-for="(c, i) in conditions"
            >
              <Select
                class="flex"
                :value.sync="c[0]"
                :items="fullContextKeys"
              />
              <p class="icon">east</p>
              <input class="flex" type="text" v-model="c[1]" />
              <Button @click.native="deleteCondition(i)" icon="clear" />
            </div>
          </template>
          <template v-else>
            <div
              class="panel-horizontal-dense"
              :key="i"
              v-for="(c, i) in conditions"
            >
              <Button
                @click.native="addCondition(i)"
                icon="vertical_align_top"
              />
              <Button
                :value.sync="c.passive"
                v-if="conditionsProperty == 'conditions'"
                icon="link_off"
              />
              <Select class="flex" :value.sync="c.entity" :items="entities" />
              <p class="icon">west</p>
              <Select
                v-if="fullContext[c.entity]"
                class="flex"
                :value.sync="c.tag"
                :items="fullContext[c.entity]"
              />
              <Button @click.native="deleteCondition(i)" icon="clear" />
            </div>
          </template>
        </div>
      </div>
      <div class="panel-sparse" v-if="translation.blocks && block">
        <div class="panel-horizontal-dense">
          <h2 class="flex">Block</h2>
          <Button @click.native="addState(null)" icon="add" text="State" />
          <Button
            @click.native="editBlockRequirements"
            :class="{ highlight: conditions == block.requirements }"
            icon="lock"
            text="Requirements"
          />
          <Button @click.native="deleteBlock" icon="delete" />
        </div>
        <PhraseBlockEditor :block.sync="block" :context="fullContext" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    Select,
    PhraseBlock,
    PhraseContext,
    PhraseBlockEditor,
  },
  data() {
    return {
      file: [],
      category: "",
      selected: 0,
      context: {},
      block: null,
      conditionsProperty: "",
      conditions: {},
    };
  },
  computed: {
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    categories() {
      return Object.keys(this.phrasebook);
    },
    phrases() {
      return this.phrasebook ? this.phrasebook[this.category] : null;
    },
    phrase() {
      return this.phrases ? this.phrases[this.selected] : null;
    },
    translation() {
      return this.file[this.category][this.selected];
    },
    states() {
      return this.block?.states;
    },
    entities() {
      return Object.keys(this.fullContext);
    },
    fullContext() {
      return (
        this.phrase?.context?.reduce((acc, s) => {
          acc[s.entity] = s.tags.split(" ");
          return acc;
        }, {}) ?? {}
      );
    },
    fullContextKeys() {
      return this.entities.concat(Object.values(this.fullContext).flat());
    },
  },
  watch: {
    phrase: {
      handler() {
        this.context =
          this.phrase?.context?.reduce((acc, s) => {
            acc[s.entity] = new Set();
            return acc;
          }, {}) ?? {};
      },
      immediate: true,
    },
    category: {
      handler() {
        this.selected = 0;
        this.fillMissing();
      },
      immediate: true,
    },
    selected: {
      handler() {
        this.fillMissing();
      },
      immediate: true,
    },
  },
  methods: {
    fillMissing() {
      if (!this.file[this.category]) this.file[this.category] = [];
      let cat = this.file[this.category];
      if (!cat[this.selected]) {
        while (cat.length < this.selected) cat.push({});
        this.$set(cat, this.selected, {});
      }
    },
    loadFromLect() {
      fetch(
        this.$store.state.root +
          window.prompt("Enter lect name") +
          "/phrasebook.json"
      )
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j;
        });
    },
    loadFromJson() {
      const file = JSON.parse(window.prompt("Enter JSON"));
      if (file) this.file = file;
    },
    saveToJson() {
      navigator.clipboard.writeText(JSON.stringify(this.file));
    },
    reset() {
      this.file = [];
      this.selected = 0;
    },
    addBlock() {
      if (!this.translation.blocks) this.$set(this.translation, "blocks", []);
      this.$set(this.translation.blocks, this.translation.blocks.length, {
        states: [{ text: "new state", transition: "next" }],
      });
      this.$forceUpdate();
    },
    deleteBlock() {
      let phrase = this.file[this.category][this.selected];
      const i = phrase.blocks.indexOf(this.block);
      if (i < 0) return;
      this.$delete(phrase.blocks, i);
    },
    addState(i) {
      if (i == null) i = this.states.length;
      this.states.splice(i, 0, { text: "new state", transition: "next" });
    },
    deleteState(i) {
      this.$delete(this.states, i);
    },
    editStateConditions(i) {
      this.conditionsProperty = "conditions";
      if (!this.states[i].conditions) this.states[i].conditions = [];
      this.conditions = this.states[i].conditions;
    },
    editBlockRequirements() {
      this.conditionsProperty = "requirements";
      if (!this.block.requirements) this.block.requirements = [];
      this.conditions = this.block.requirements;
    },
    editLocalizedContext() {
      if (!this.translation.context) this.translation.context = [];
      this.conditionsProperty = "Localized context";
      this.conditions = this.translation.context;
    },
    editNotes() {
      if (!this.translation.notes) this.translation.notes = [];
      this.conditionsProperty = "Notes";
      this.conditions = this.translation.notes;
    },
    addCondition(i) {
      if (i == null) i = this.conditions.length;
      let val = {};
      if (this.conditionsPropert == "Localized context") {
        val = ["", ""];
      }
      if (this.conditionsPropert == "Notes") {
        val = "";
      }
      this.conditions.splice(i, 0, val);
    },
    deleteCondition(i) {
      this.conditions.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 416px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
