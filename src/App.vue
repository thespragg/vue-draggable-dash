<template>
  <dropable>
    <draggable>
      <p>Hello world.</p>
    </draggable>
    <draggable>
      <p>Hello world 2.</p>
    </draggable>
  </dropable>
</template>

<script setup lang="ts">
import { Draggable, Dropable } from './components'
</script>
