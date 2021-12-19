<script setup lang="ts">
import { h, useSlots, ref, defineEmits } from 'vue'
import { Ref } from 'vue' // Type declarations
import DragEvent from '@/utils/VueDragEvent'

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    },

    data:{
        type: Object,
        default: () => {}
    }
})

const isBeingDragged: Ref<Boolean> = ref(false);

const slots = useSlots();
const emit = defineEmits(["drag-start", "drag-end", "drag-event"])

const draggable = () => {
    let el = h(props.element, {
        draggable: true,
        class: [isBeingDragged.value ? 'dragging' : '']
    }, slots)
    el.props!.ondragstart = () => {
        isBeingDragged.value = true;
        emit("drag-start", el)
        emit("drag-event", new DragEvent("start", props.data, el))
    };
    el.props!.ondragend = () => {
        isBeingDragged.value = false;
        emit("drag-end", el)
        emit("drag-event", new DragEvent("stop", props.data, el))
    };
    return el;
}
</script>

<template>
    <draggable />
</template>