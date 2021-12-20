<template>
  <dropable class="container">
    <draggable class="draggable" :data="{ key: '1' }">
      <p>1.</p>
    </draggable>
    <draggable class="draggable" :data="{ key: '2' }">
      <p>2.</p>
    </draggable>
  </dropable>
  <dropable class="container">
    <draggable class="draggable" :data="{ key: '3' }">
      <p>3.</p>
    </draggable>
    <draggable class="draggable" :data="{ key: '4' }">
      <p>4.</p>
    </draggable>
  </dropable>
</template>

<script setup lang="ts">
import { Draggable, Dropable } from './components'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  background-color: #333;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.draggable {
  background-color: white;
  margin-top: 10px;
  padding: 10px;
}

.dragging {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
