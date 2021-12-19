<script setup lang="ts">
import { h, useSlots, ref } from 'vue'
import DragEvent from '@/utils/VueDragEvent'

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    }
})

const isDraggableComponent = (el: any) => {
    try {
        if (!el || !el.type || !el.type.emits || el.type.emits.length == 0) return false;
        if (el.type.emits.includes("drag-event")) return true;
        return false;
    } catch {
        return false;
    }
}

const currentDragged = ref(null);
const handleDrag = (ev: DragEvent) => {
    if (ev.type == "start") {
        currentDragged.value = ev.sender;
    } else if (ev.type == "stop") {
        currentDragged.value = null;
    }
    console.log(currentDragged.value)
}

const slots = useSlots();
const dropcontainer = ref(null);

const getChildren = () => {
    if (!slots.default) return;
    let els = slots.default();
    for (let i = 0; i < els.length; i++) {
        if (isDraggableComponent(els[i])) {
            if (!els[i].props) els[i].props = {}
            els[i].props!.onDragEvent = (ev: any) => handleDrag(ev)
        }
    }
    return els;
}

const dropable = () => {
    let children = getChildren();
    let el = h(props.element, { ref: dropcontainer }, children)
    return el
}
</script>

<template>
    <dropable />
</template>