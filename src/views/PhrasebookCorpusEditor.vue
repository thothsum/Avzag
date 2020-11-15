<template>
  <div class="grid small" v-if="file">
    <div class="panel-sparse">
      <ActionHeader @action="addSection" icon="topic" header="sections">
        <template #header v-if="section">
          <ButtonAlert @confirm="removeSection" />
        </template>
        <div class="panel-dense scroll">
          <div class="panel-horizontal-dense" :key="s.id" v-for="s in file">
            <Button
              icon="edit"
              @click.native="section = s"
              :class="{ highlight: section == s }"
            />
            <input class="flex" type="text" v-model="s.name" />
          </div>
        </div>
      </ActionHeader>
      <ActionHeader
        @action="addPhrase"
        icon="short_text"
        header="phrases"
        v-if="section"
      >
        <template #header v-if="phrase">
          <ButtonAlert @confirm="removePhrase" />
        </template>
        <div class="panel-dense scroll">
          <div
            class="panel-horizontal-dense"
            :key="p.id"
            v-for="p in section.phrases"
          >
            <Button
              icon="edit"
              @click.native="phrase = p"
              :class="{ highlight: phrase == p }"
            />
            <input class="flex" type="text" v-model="p.preview" />
          </div>
        </div>
      </ActionHeader>
      <ActionHeader
        v-if="phrase"
        @action="addBlock"
        icon="account_tree"
        header="Blocks"
      >
        <template #header v-if="block">
          <ButtonAlert @confirm="removeBlock" />
        </template>
        <PhraseContext :context="context" />
        <div class="panel-horizontal wrap block-editor">
          <div
            class="panel-horizontal-dense"
            :key="phrase.id + i"
            v-for="(b, i) in blocks"
          >
            <Button
              @click.native="block = b"
              icon="edit"
              :class="{ highlight: block == b }"
            />
            <PhraseBlock
              :id="phrase.id"
              :context.sync="context"
              :interactive="true"
              :block="b"
            />
          </div>
        </div>
      </ActionHeader>
      <PhraseContextEditor :context="contextSource" v-if="phrase" />
    </div>
    <PhraseBlockEditor
      v-if="phrase && block"
      @remove="removeBlock"
      :block="block"
      :context="fullContext"
    />
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import PhraseContext from "@/components/PhraseContext";
import PhraseContextEditor from "@/components/PhraseContextEditor";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseBlockEditor from "@/components/PhraseBlockEditor";

export default {
  name: "PhrasebookCorpusEditor",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    PhraseContext,
    PhraseContextEditor,
    PhraseBlock,
    PhraseBlockEditor,
  },
  data() {
    return {
      file: [],
      section: undefined,
      phrase: undefined,
      block: undefined,
      context: undefined,
    };
  },
  computed: {
    contextSource() {
      return this.phrase?.context;
    },
    fullContext() {
      return this.contextSource?.reduce((c, { entity, tags }) => {
        c[entity] = tags.split(" ");
        return c;
      }, {});
    },
    blocks() {
      return this.phrase?.blocks;
    },
  },
  watch: {
    phrase: {
      handler() {
        this.context =
          this.contextSource?.reduce((c, { entity }) => {
            c[entity] = this.context[entity] ?? new Set();
            return c;
          }, {}) ?? {};
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addSection() {
      const s = {
        id: String(Math.random()),
        name: "New section",
        phrases: [],
      };
      this.file.push(s);
      this.section = s;
    },
    removeSection() {
      this.$delete(this.file, this.file.indexOf(this.section));
    },
    addPhrase() {
      const p = {
        id: String(Math.random()),
        preview: "New phrase",
        context: [],
        blocks: [],
      };
      this.section.phrases.push(p);
      this.phrase = p;
    },
    removePhrase() {
      this.$delete(
        this.section.phrases,
        this.section.phrases.indexOf(this.phrase)
      );
    },
    addBlock() {
      const b = {};
      this.blocks.push(b);
      this.block = b;
    },
    removeBlock() {
      this.$delete(this.blocks, this.blocks.indexOf(this.block));
      this.block = this.blocks[this.blocks.length - 1];
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
.scroll {
  max-height: 128px;
}
</style>
