<template>
  <div v-if="file" class="section small grid">
    <div class="col">
      <p v-if="entry && !validEntry" class="highlight-font-alert">
        Entry must have at least form or meaning to be saved.
      </p>
      <div class="row">
        <btn class="flex" icon="add" text="New word" @click="newEntry" />
        <ConfirmButton
          :disabled="!entry"
          class="flex"
          text="Delete"
          @click="() => deleteEntry(entry, true)"
        />
      </div>
      <hr />
      <div class="row seeker">
        <Seeker :seek="progress['l']" />
        <input
          v-model="query"
          type="text"
          placeholder="Meanings, tags, forms..."
        />
      </div>
      <div class="scroll long col">
        <div
          v-for="(es, m) in results"
          :key="m"
          scholar
          :meaning="m"
          :entries="es"
          class="col"
        >
          <i class="text-faded" v-text="m" />
          <btn
            v-for="(e, i) in es['editor']"
            :key="i"
            :text="e.forms[0].plain"
            :is-on="entry === e"
            @click="entry = e"
          />
        </div>
      </div>
    </div>
    <template v-if="entry">
      <div class="col-2">
        <EditorCard icon="tag" header="Tags">
          <TagsInput v-model="entry.tags" placeholder="Grammatical tags" />
        </EditorCard>
        <NotesEditor v-model="entry.notes" />
        <EditorCard icon="tune" header="Forms">
          <template #header>
            <ArrayControl
              v-model="entry.forms"
              v-model:item="form"
              :add="() => ({ plain: '' })"
              shift-two
              remove
            />
          </template>
          <div class="col scroll">
            <btn
              v-for="(f, i) in entry.forms"
              :key="i"
              :text="f.plain"
              :is-on="form === f"
              @click="form = f"
            />
          </div>
        </EditorCard>
        <EditorCard v-if="form" icon="segment" header="Form Texts">
          <input v-model="form.plain" type="text" placeholder="plain" />
          <input v-model="form.ipa" type="text" placeholder="ipa" />
          <input v-model="form.glossed" type="text" placeholder="glossed" />
        </EditorCard>
      </div>
      <div class="col-2">
        <EditorCard icon="textsms" header="Uses">
          <template #header>
            <ArrayControl
              v-model="entry.uses"
              v-model:item="usecase"
              :add="() => ({ meaning: '' })"
              shift-two
              remove
            />
          </template>
          <div class="col scroll">
            <btn
              v-for="(u, i) in entry.uses"
              :key="i"
              :text="u.meaning"
              :is-on="usecase === u"
              @click="usecase = u"
            />
          </div>
        </EditorCard>
        <template v-if="usecase">
          <EditorCard icon="lightbulb" header="Concept">
            <div class="row">
              <input
                v-model="usecase.meaning"
                placeholder="Meaning"
                style="flex: 0.5"
                type="text"
              />
              <TagsInput
                v-model="usecase.tags"
                placeholder="Semantic tags"
                class="flex"
              />
            </div>
          </EditorCard>
          <NotesEditor v-model="usecase.notes" />
          <EditorCard icon="format_list_numbered" header="Samples">
            <template #header>
              <ArrayControl
                v-model="usecase.samples"
                v-model:item="sample"
                :add="() => ({ plain: 'sample #' + usecase.samples.length })"
                shift-two
                remove
              />
            </template>
            <div class="col">
              <btn
                v-for="(s, i) in usecase.samples"
                :key="i"
                :text="s.plain"
                :is-on="sample === s"
                @click="sample = s"
              />
            </div>
          </EditorCard>
          <EditorCard v-if="sample" icon="segment" header="Sample Texts">
            <input v-model="sample.plain" type="text" placeholder="plain" />
            <input v-model="sample.ipa" type="text" placeholder="ipa" />
            <input v-model="sample.glossed" type="text" placeholder="glossed" />
            <input
              v-model="sample.translation"
              type="text"
              placeholder="translation"
            />
          </EditorCard>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch } from "vue";
import { configure, file, lect } from "@/editor";
import { Entry } from "./types";
import Searcher from "./search";

export default defineComponent({
  setup() {
    configure({ default: [], filename: "dictionary" });
    const searcher = new Searcher(
      computed(() => ({
        editor: file.value as Entry[],
      }))
    );

    const query = ref("");
    watch([query], () => searcher.search("editor", query.value));
    watch(lect, () => {
      entry.value = undefined;
      query.value = "";
    });

    const entry = ref();
    watch(file, () => {
      entry.value = undefined;
    });
    const validEntry = computed(() => {
      const e = entry.value as Entry;
      return e?.forms.some((f) => f.plain) || e?.uses.some((u) => u.meaning);
    });
    watch([entry, validEntry], ([entry, valid], [oEntry, oValid]) => {
      if (entry && entry === oEntry && valid !== oValid)
        if (valid) (file.value as Entry[]).push(entry);
        else deleteEntry(entry);
    });

    const form = ref();
    watch(entry, () => {
      if (!entry.value) form.value = undefined;
    });
    const usecase = ref();
    watch(entry, () => {
      if (!entry.value) usecase.value = undefined;
    });
    const sample = ref();
    watch(usecase, () => {
      if (!usecase.value) sample.value = undefined;
    });

    function newEntry() {
      entry.value = {
        forms: [{ plain: "" }],
        uses: [{ meaning: "" }],
      };
    }
    function deleteEntry(ent: Entry, del = false) {
      const arr = file.value as Entry[];
      arr.splice(arr.indexOf(ent), 1);
      if (del) {
        entry.value = undefined;
        searcher.search("editor", query.value);
      }
    }

    return {
      file,
      entry,
      validEntry,
      usecase,
      form,
      sample,
      results: searcher.results,
      progress: searcher.progress,
      query,
      newEntry,
      deleteEntry,
    };
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 208px minmax(0, 1fr) minmax(0, 1fr);
  gap: map-get($margins, "double");
}
.sample input {
  width: 64px;
}
.scroll {
  max-height: 192px;
  &.long {
    max-height: 512px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>
