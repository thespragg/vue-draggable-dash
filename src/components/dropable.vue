<script setup lang="ts">
import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue'

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    }
})

const slots = useSlots();
const isDraggableComponent = (el: any) => {
    try {
        if (!el || !el.type || !el.type.emits || el.type.emits.length == 0) return false;
        if (el.type.emits.includes("internal-drag-start")) return true;
        return false;
    } catch {
        return false;
    }
}

const getChildren = () => {
    if (!slots.default) return;
    let els = slots.default();
    for (let i = 0; i < els.length; i++) {
        if (isDraggableComponent(els[i])) {
            if (!els[i].props) els[i].props = {}
            items.value.push(els[i].props!.data);
            els[i].props!.onInternalDragStart = (ev: any) => {
                let index = items.value.findIndex(x => (x as any).key == ev)
                items.value.splice(index, 1);
            }
        }
    }
    return els;
}

const dropcontainer: any = ref(null);
const items: Ref<Array<object>> = ref([])

const onDrop = (ev: any) => {
    ev.preventDefault();
    let item = JSON.parse(ev.dataTransfer.getData("dragged"))
    dropcontainer.value.appendChild(document.getElementById(item.el))
    items.value.push(item.data)
}

const dropable = () => {
    let items = getChildren();
    let el = h(props.element, {
        ref: dropcontainer,
        ondrop: onDrop,
        ondragover: (e: any) => e.preventDefault()
    }, items)
    return el
}
</script>

<template>
    <dropable />
</template>