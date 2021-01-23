<template>
  <div class="display row" :class="{ glossed: canGloss }">
    <div class="segments">
      <p v-for="(type, i) in types" :key="type" :class="'text-' + type">
        <span v-for="(text, j) in texts[i]" :key="j" :class="textColors[j]">
          {{ text }}
        </span>
      </p>
    </div>
    <div class="row dashes">
      <p v-for="(c, i) in dashColors" :key="i" :class="c" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref, watch } from "vue";
import { Context, State } from "../types";

export default defineComponent({
  name: "State",
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
        props.state.texts.some(({ ipa, gloss }) => ipa || gloss)
    );

    const types = computed<("plain" | "ipa" | "gloss")[]>(() =>
      canGloss.value ? ["ipa", "gloss"] : ["plain"]
    );
    const texts = computed(() =>
      types.value.map((type) => props.state.texts?.map((text) => text[type]))
    );
    watch(texts, (texts) => {
      if (!texts) return;
      const lines = texts.map((t) => t?.join(""));
      const text = lines.length === 1 ? lines[0] : lines.join("\n");
      emit("text", text);
    });

    const textColors = computed(() =>
      props.state.texts
        .map(({ entity }) => entity ?? "")
        .map((e) => entities.value.indexOf(e))
        .map((i) => "colored-" + i)
    );
    const dashColors = computed(() =>
      props.state.transition && props.state.conditions
        ? Object.entries(props.state.conditions)
            .filter(([, tags]) =>
              Object.values(tags).some(({ provide }) => provide)
            )
            .map(([entity]) => entities.value.indexOf(entity))
            .map((i) => "colored-back-" + i)
        : []
    );

    return { types, texts, canGloss, textColors, dashColors };
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
.segments {
  display: flex;
  flex-direction: column;
  p {
    display: flex;
    place-content: center;
  }
}
.dashes {
  overflow: hidden;
  border-radius: 0 0 $border-radius $border-radius;
  height: $border-radius;
  width: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  bottom: 0;
  > * {
    height: 100%;
    width: 4 * $border-radius;
  }
}
</style>
