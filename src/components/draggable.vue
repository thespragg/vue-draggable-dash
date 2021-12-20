<script setup lang="ts">
import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations

const props = defineProps({
    element: {
        type: String,
        default: () => "div"
    },

    data: {
        type: Object,
        default: () => { }
    }
})

const makeid = (len: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const isBeingDragged: Ref<Boolean> = ref(false);
const slots = useSlots();
const id = makeid(10)

const draggable = () => {
    let el = h(props.element, {
        draggable: true,
        class: [isBeingDragged.value ? 'dragging' : ''],
        id: id
    }, slots)
    el.props!.ondragstart = (ev: any) => {
        isBeingDragged.value = true;
        let res = {
            data: props.data,
            el: id
        }
        ev.dataTransfer.setData("dragged", JSON.stringify(res));
    };
    el.props!.ondragend = (ev: any) => {
        isBeingDragged.value = false;
    };
    return el;
}
</script>

<template>
    <draggable />
</template>