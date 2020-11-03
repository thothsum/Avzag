<template>
  <div class="section panel-sparse small">
    <div class="panel-horizontal-dense wrap card">
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
        <div class="panel-dense">
          <h2 class="flex">Phrases</h2>
          <List
            :value.sync="selected"
            :items="phrasebook"
            indexed="true"
            display="preview"
          />
        </div>
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Blocks</h2>
            <Button @click.native="addBlock" icon="add" />
          </div>
          <List
            v-if="translation"
            :value.sync="block"
            :items="translation.blocks"
            display="text"
          />
        </div>
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Notes</h2>
            <Button @click.native="addNote" icon="add" />
          </div>
          <p class="text-caption text-faded">
            You can add notes, for example, to explain grammar.
          </p>
          <div
            class="panel-horizontal-dense"
            :key="i"
            v-for="(_, i) in translation.notes"
          >
            <textarea v-model="translation.notes[i]" class="flex note" />
            <Button @click.native="deleteNote(i)" icon="delete" />
          </div>
        </div>
      </div>
      <div class="panel-sparse" v-if="block">
        <div class="panel-horizontal-dense">
          <h2 class="flex">Requirements</h2>
          <Button
            @click.native="editBlockRequirements"
            :class="{ highlight: conditions == block.requirements }"
            icon="edit"
          />
        </div>
        <div class="panel-sparse">
          <div class="panel-horizontal-dense">
            <h2 class="flex">States</h2>
            <Button @click.native="addState(null)" icon="add" />
          </div>
          <div class="panel-dense wrap" :key="i" v-for="(s, i) in block.states">
            <div class="panel-horizontal-dense">
              <Button @click.native="addState(i)" icon="vertical_align_top" />
              <input type="text" v-model="s.text" />
              <Button @click.native="deleteState(i)" icon="clear" />
            </div>
            <p class="text-caption text-faded">IPA & glossing.</p>
            <div class="panel-horizontal-dense flex-content">
              <input type="text" v-model="s.ipa" />
              <input type="text" v-model="s.glossing" />
            </div>
            <p class="text-caption text-faded">
              Transition: "next" or best of "0 1 ...".
            </p>
            <input type="text" v-model="s.transition" />
            <div class="panel-horizontal-dense flex-content">
              <Button
                v-model="s.implicit"
                icon="visibility_off"
                text="Implicit"
              />
              <Button
                @click.native="editStateConditions(i)"
                :class="{ highlight: conditions == s.conditions }"
                icon="format_list_bulleted"
                text="Conditions"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="panel-dense" v-if="conditionsProperty && conditions">
        <div class="panel-horizontal-dense">
          <h2 class="flex">{{ conditionsProperty }}</h2>
          <Button @click.native="addCondition()" icon="add" />
        </div>
        <div
          class="panel-horizontal-dense"
          :key="i"
          v-for="(c, i) in conditions"
        >
          <Button @click.native="addCondition(i)" icon="vertical_align_top" />
          <Button
            v-model="c.passive"
            v-if="conditionsProperty == 'conditions'"
            icon="link_off"
          />
          <Select class="flex" :value.sync="c.entity" :items="entities" />
          <p class="icon">west</p>
          <Select
            v-if="context[c.entity]"
            class="flex"
            :value.sync="c.tag"
            :items="context[c.entity]"
          />
          <Button @click.native="deleteCondition(i)" icon="clear" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import List from "@/components/List";
// import PhraseBlock from "@/components/PhraseBlock";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    Select,
    List,
    // PhraseBlock,
  },
  data() {
    return {
      file: [],
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
    phrase() {
      return this.phrasebook ? this.phrasebook[this.selected] : null;
    },
    translation() {
      return this.file[this.selected];
    },
    entities() {
      return Object.keys(this.context);
    },
  },
  watch: {
    phrase: {
      handler() {
        this.context =
          this.phrase?.context?.reduce((acc, s) => {
            acc[s.entity] = s.tags.split(" ");
            return acc;
          }, {}) ?? {};
      },
      immediate: true,
    },
    selected: {
      handler() {
        if (!this.file[this.selected]) {
          while ((this, this.file.length < this.selected)) this.file.push({});
          this.$set(this.file, this.selected, {});
        }
      },
      immediate: true,
    },
  },
  methods: {
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
    addBlock() {
      if (!this.translation.blocks) this.$set(this.translation, "blocks", []);
      this.$set(this.translation.blocks, this.translation.blocks.length, {
        text: "block " + this.translation.blocks.length,
      });
      this.$forceUpdate();
    },
    addState(i) {
      if (!this.block.states) this.$set(this.block, "states", []);
      if (i == null) i = this.block.states.length;
      this.block.states.splice(i, 0, { transition: "next" });
      this.$forceUpdate();
    },
    deleteState(i) {
      this.block.states.splice(i, 1);
    },
    editStateConditions(i) {
      this.conditionsProperty = "conditions";
      if (!this.block.states[i].conditions)
        this.block.states[i].conditions = [];
      this.conditions = this.block.states[i].conditions;
      this.$forceUpdate();
    },
    editBlockRequirements() {
      this.conditionsProperty = "requirements";
      if (!this.block.requirements) this.block.requirements = [];
      this.conditions = this.block.requirements;
      this.$forceUpdate();
    },
    addCondition(i) {
      if (i == null) i = this.conditions.length;
      this.conditions.splice(i, 0, {});
    },
    deleteCondition(i) {
      this.conditions.splice(i, 1);
    },
    addNote() {
      if (!this.translation.notes) this.$set(this.translation, "notes", []);
      this.$set(this.translation.notes, this.translation.notes.length, "");
    },
    deleteNote(i) {
      this.translation.notes.splice(i, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 256px 256px 1fr;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>
