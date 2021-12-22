<template>
    <div style="margin-bottom: 16px">
        <div>
            <dragable mode="copy">
                <p>Drag me into the container</p>
            </dragable>
        </div>
        <div class="container">
            <p class="header">DROP CONTAINER</p>
            <dropable class="dropable">

            </dropable>
        </div>
    </div>
</template>

<script setup>
import { Dropable, Dragable } from '../../../src/index'
</script>

<style scoped>
.container {
    border: 1px solid #ccc;
}

.dropable{
    height: 150px;
}

.header {
    color: white;
    margin:0;
    padding: 5px;
    background-color: #333;
}
</style>