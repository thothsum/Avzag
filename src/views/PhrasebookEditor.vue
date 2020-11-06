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
            <h2>Source</h2>
            <Select
              class="flex"
              :value.sync="selected"
              :items="phrasebook"
              display="preview"
              :indexed="true"
            />
          </div>
          <div class="panel-horizontal-dense wrap">
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
        <div class="panel wrap card">
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
              v-for="(b, i) in blocks"
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
      <div class="panel-sparse" v-if="blocks && block">
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
        <div class="panel-dense wrap" :key="i" v-for="(s, i) in states">
          <div class="panel-horizontal-dense">
            <Button @click.native="addState(i)" icon="vertical_align_top" />
            <h2 class="flex">#_{{ i }}</h2>
            <input type="text" v-model="s.text" />
            <Button @click.native="deleteState(i)" icon="clear" />
          </div>
          <p class="text-caption text-faded">Advanced data: IPA & glossing.</p>
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
              :value.sync="s.implicit"
              icon="visibility_off"
              text="Implicit"
            />
            <Button
              @click.native="editStateConditions(i)"
              :class="{ highlight: conditions == s.conditions }"
              icon="widgets"
              text="Conditions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseContext from "@/components/PhraseContext";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    Select,
    PhraseBlock,
    PhraseContext,
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
    blocks() {
      return this.translation?.blocks;
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
    reset() {
      this.file = [];
      this.selected = 0;
    },
    addBlock() {
      if (!this.blocks) this.$set(this.translation, "blocks", []);
      this.$set(this.blocks, this.blocks.length, {
        states: [{ text: "new state", transition: "next" }],
      });
    },
    deleteBlock() {
      const i = this.blocks.indexOf(this.block);
      if (i < 0) return;
      this.$delete(this.blocks, i);
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
      this.$forceUpdate();
    },
    editBlockRequirements() {
      this.conditionsProperty = "requirements";
      if (!this.block.requirements) this.block.requirements = [];
      this.conditions = this.block.requirements;
      this.$forceUpdate();
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
