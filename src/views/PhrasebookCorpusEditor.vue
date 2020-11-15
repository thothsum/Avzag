<template>
  <div class="grid small" v-if="phrasebook && file">
    <div class="panel-sparse">
      <ActionHeader @action="addSection" header="sections">
        <template #header v-if="section">
          <ButtonAlert @confirm="removeSection" />
        </template>
        <div class="panel-horizontal-dense" :key="s.id" v-for="s in file">
          <Button
            icon="list"
            @click.native="section = s"
            :class="{ highlight: section == s }"
          />
          <input class="flex" type="text" v-model="s.name" />
        </div>
      </ActionHeader>
      <ActionHeader @action="addPhrase" header="phrases" v-if="section">
        <template v-if="phrase">
          <ButtonAlert @confirm="removePhrase" />
        </template>
        <div
          class="panel-horizontal-dense"
          :key="p.id"
          v-for="p in section.phrases"
        >
          <Button
            icon="list"
            @click.native="phrase = p"
            :class="{ highlight: phrase == p }"
          />
          <input class="flex" type="text" v-model="p.preview" />
        </div>
      </ActionHeader>
    </div>
    <div class="panel-sparse"></div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";

export default {
  name: "PhrasebookCorpusEditor",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
  },
  data() {
    return {
      file: [],
      section: undefined,
    };
  },
  methods: {
    addSection() {
      this.file.push({
        id: String(Math.random),
        name: "New section",
        phrases: [],
      });
    },
    removeSection() {
      this.$delete(this.file, this.file.indexOf(this.section));
    },
    addPhrase() {
      this.section.phrases.push({
        id: String(Math.random),
        preview: "New phrase",
        context: [],
        blocks: [],
      });
    },
    removePhrase() {
      this.$delete(
        this.section.phrases,
        this.section.phrases.indexOf(this.phrase)
      );
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>


<style lang="scss">
.block-editor {
  gap: 4px 8px;
}
</style>
