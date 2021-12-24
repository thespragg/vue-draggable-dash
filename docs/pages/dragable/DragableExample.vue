<template>
  <div style="margin-bottom: 16px">
    <dragable class="dragable" :data="{key:1}">
      <p>Hi! I'm a dragable component</p>
    </dragable>
  </div>
</template>

<script setup>
import { Dragable } from '../../../src/index'
</script>

<style scoped>
.dragable{
  background-color:#f7f7f7;
  display:flex;
  justify-content: center;
  align-items:center;
  border-radius:10px;
  border: 1px solid #ccc;
  height: 200px;
  width:200px;
  text-align:center;
} 
</style>