<template>
  <ActionHeader icon="format_list_bulleted" header="Context Translations">
    <template #action>
      <Button v-if="empty" @click.native="add" icon="add" />
      <Button v-else :value.sync="visible" icon="visibility" />
    </template>
    <template #caption><slot /></template>
    <template v-if="!empty" #header><ButtonAlert @confirm="remove" /></template>
    <template v-if="visible">
      <div
        class="panel-horizontal-dense"
        :key="i"
        v-for="(t, i) of translations"
      >
        <div class="key flex panel-horizontal">
          <p class="color">
            {{ t[0] }}
            <IndexedColor
              v-if="entities.includes(t[0])"
              :indexes="[entities.indexOf(t[0])]"
            />
          </p>
        </div>
        <p class="icon">east</p>
        <input class="flex" type="text" v-model="t[1]" />
      </div>
    </template>
  </ActionHeader>
</template>

<script>
import Button from "./Button";
import ButtonAlert from "./ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import IndexedColor from "@/components/IndexedColor";

export default {
  name: "PhraseContextTranslations",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    IndexedColor,
  },
  props: ["translations", "context"],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    entities() {
      return Object.keys(this.context);
    },
    tags() {
      return Object.values(this.context);
    },
    keys() {
      return this.entities.map((e, i) => [e].concat(this.tags[i])).flat(1);
    },
    empty() {
      return !this.translations?.length;
    },
  },
  methods: {
    add() {
      this.$emit(
        "update:translations",
        this.keys.map((k) => [k])
      );
      this.visible = true;
    },
    remove() {
      this.$emit("update:translations", []);
    },
  },
};
</script>

<style lang="scss" scoped>
.key {
  justify-content: flex-end;
}
.color {
  position: relative;
}
</style>
