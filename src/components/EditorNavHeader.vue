<template>
  <NavHeader :menus="menus" />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import NavHeader from "./NavHeader";

const menus = [
  {
    icon: "arrow_back",
    name: "Home",
  },
  {
    icon: "audiotrack",
    text: "Phonology",
    name: "PhonologyEditor",
  },
  {
    icon: "sync_alt",
    text: "Converter",
    name: "ConverterEditor",
  },
  {
    icon: "book",
    text: "Phrasebook",
    name: "PhrasebookEditor",
  },
  {
    icon: "bookmark",
    text: "Phrasebook Corpus",
    name: "PhrasebookCorpusEditor",
  },
];
</script>
