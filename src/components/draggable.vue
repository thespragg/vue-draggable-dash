<script setup lang="ts">
import { h, useSlots, ref, Ref, defineEmits } from 'vue'

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    }
})

const isBeingDragged : Ref<Boolean> = ref(false);

const slots = useSlots();
const emit = defineEmits(["drag-start", "drag-end"])

const draggable = () => {
    return h(props.element, {
        draggable: true,
        class: [isBeingDragged.value ? 'dragging' : ''],
        ondragstart: () => {
            isBeingDragged.value = true;
            emit("drag-start")
        },
        ondragend: () => {
            isBeingDragged.value = false;
            emit("drag-end")
        }
    }, slots);
}
</script>

<template>
  <draggable/>
</template>