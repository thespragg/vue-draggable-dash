<script setup lang="ts">
import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations
import { makeid } from '../utils';

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    },

    data: {
        type: Object,
        required: true
    },

    prop: {
        type: String,
        required: true
    }
})

const emits = defineEmits(["internal-drag-start"])
const onDragStart = (ev: any) => {
    isBeingDragged.value = true;
    let res = {
        data: props.data,
        el: id
    }
    let prop = props.data[props.prop]
    emits("internal-drag-start", prop)
    ev.dataTransfer.setData("dragged", JSON.stringify(res));
}

const isBeingDragged: Ref<Boolean> = ref(false);
const slots = useSlots();
const id = makeid(10)

const draggable = () => {
    let el = h(props.element, {
        draggable: true,
        class: [isBeingDragged.value ? 'dragging' : ''],
        ondragstart: onDragStart,
        ondragend: () => isBeingDragged.value = false,
        id: id
    }, slots)
    return el;
}
</script>

<template>
    <draggable :data="props.data" :prop="props.prop"/>
</template>