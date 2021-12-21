import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations
import { makeid } from '../utils';

export default {
    name: "draggable",
    props: {
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
            required: false,
            default: () => "key"
        }
    },
    setup(props : any, context : any) {
        const onDragStart = (ev: any) => {
            isBeingDragged.value = true;
            let res = {
                data: props.data,
                el: id
            }
            let prop = props.data[props.prop]
            context.emit("internal-drag-start", prop)
            ev.dataTransfer.setData("dragged", JSON.stringify(res));
        }

        const isBeingDragged: Ref<Boolean> = ref(false);
        const slots = useSlots();
        const id = makeid(10)

        return () => h(props.element, {
            draggable: true,
            class: [isBeingDragged.value ? 'dragging' : ''],
            ondragstart: onDragStart,
            ondragend: () => isBeingDragged.value = false,
            id: id
        }, slots)
    }
}