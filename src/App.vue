<template>
  <div>
    <p>Category 1</p>
    <dropable class="container" ref="drop1" :groups="['group1']">
      <dragable class="draggable" :data="{ key: '1' }" :groups="['group1']" :locked="true">
        <p>Group1</p>
      </dragable>
      <dragable class="draggable" :data="{ key: '2' }" :groups="['group1']">
        <p>Group1</p>
      </dragable>
    </dropable>
  </div>
  <div>
    <p>Category 2</p>
    <dropable class="container" ref="drop2" :groups="['group2']">
      <dragable class="draggable" :data="{ key: '3' }" :groups="['group2']">
        <p>Group2</p>
      </dragable>
      <dragable class="draggable" :data="{ key: '4' }" :groups="['group2']">
        <p>Group2</p>
      </dragable>
    </dropable>
  </div>
  <div class="container">
    <p>Categories 1 &amp; 2</p>
    <dropable ref="drop3" :groups="['group1', 'group2']">
      <dragable class="draggable" :data="{ key: '5' }" :groups="['group1', 'group2']">
        <p>Both</p>
      </dragable>
      <dragable class="draggable" :data="{ key: '6' }" :groups="['group2', 'group1']">
        <p>Both</p>
      </dragable>
    </dropable>
  </div>
  <div>
    <p>{{ JSON.stringify(items1) }}</p>
    <p>{{ JSON.stringify(items2) }}</p>
    <p>{{ JSON.stringify(items3) }}</p>
  </div>
</template>

<script setup lang="ts">
import { dragable, dropable } from './components'
import { ref } from 'vue'

const drop1: any = ref(null)
const drop2: any = ref(null)
const drop3: any = ref(null)

const items1: any = ref([])
const items2: any = ref([])
const items3: any = ref([])

setInterval(() => {
  try {
    items1.value = drop1.value.items
    items2.value = drop2.value.items
    items3.value = drop3.value.items
  } catch { }
}, 1000)
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
  color: white;
}

.draggable {
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  color: black;
}

.dragging {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
