<script setup lang="ts">
import { h } from 'vue'
import { Draggable } from './components'
const app = () => h(Draggable, {}, () => h("div", {}, "Hello world"));
</script>

<template>
  <app />
</template>
