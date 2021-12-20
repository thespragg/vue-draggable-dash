<script setup lang="ts">
import { h, useSlots, ref } from 'vue'

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    }
})

const slots = useSlots();
const dropcontainer : any = ref(null);
const dropable = () => {
    let el = h(props.element, {
        ref: dropcontainer,
        ondrop: (ev : any) => {
            ev.preventDefault();
            let item = JSON.parse(ev.dataTransfer.getData("dragged"))
            if(dropcontainer.value == null) return;
            console.log(item.el)
            let node = document.getElementById(item.el);
            dropcontainer.value.appendChild(node)
        },
        ondragover: (e : any) => e.preventDefault()
    }, slots)
    return el
}
</script>

<template>
    <dropable />
</template>