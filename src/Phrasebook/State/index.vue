<template>
  <div
    class="display row"
    :class="{ glossed: canGloss, 'text-faded': state?.implicit }"
  >
    <Notes
      v-for="(type, i) in types"
      :key="type"
      :class="'text-' + type"
      :notes="[texts[i]]"
    />
    <div class="row dashes">
      <p v-for="(c, i) in dashColors" :key="i" :class="c" />
    </div>
  </div>
</template>

<script lang="ts">
import Notes from "@/components/Notes/index.vue";
import { computed, defineComponent, inject, PropType, Ref, watch } from "vue";
import { Context, State } from "../types";

export default defineComponent({
  name: "State",
  components: { Notes },
  props: {
    state: { type: Object as PropType<State>, default: () => ({}) },
    glossed: { type: Boolean, default: false },
  },
  emits: ["text"],
  setup(props, { emit }) {
    const context = inject("context", {} as Ref<Context>);
    const entities = computed(() => Object.keys(context.value));
    const canGloss = computed(
      () =>
        props.glossed &&
        props.state &&
        (props.state.text.ipa || props.state.text.glossed)
    );

    const types = computed<("plain" | "ipa" | "glossed")[]>(() =>
      canGloss.value ? ["ipa", "glossed"] : props.state?.text ? ["plain"] : []
    );
    const texts = computed(() =>
      types.value.map((type) => props.state.text[type])
    );
    watch(
      texts,
      (texts) => {
        if (!texts) return;
        const text = texts.length === 1 ? texts[0] : texts.join("\n");
        emit("text", text?.replaceAll("*", ""));
      },
      { immediate: true, deep: true }
    );

    const dashColors = computed(() =>
      props.state.transition && props.state.conditions
        ? Object.entries(props.state.conditions)
            .filter(([, tags]) => Object.values(tags).some((flag) => flag))
            .map(([entity]) => entities.value.indexOf(entity))
            .map((i) => "colored-back-" + i)
        : []
    );

    return { types, texts, canGloss, dashColors };
  },
});
</script>

<style lang="scss" scoped>
.display {
  height: map-get($button-height, "small");
  position: relative;
  &.glossed {
    height: map-get($button-height, "normal") + map-get($margins, "normal");
  }
}
.dashes {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-width;
  width: 100%;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  > * {
    height: 100%;
    width: 4 * $border-width;
  }
}
</style>
