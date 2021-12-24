import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations
import { makeid, api } from '../utils';
import { getCurrentInstance } from "vue";

import { DragData } from '../vue-draggable-dash.d.js';

export default {
    name: "dragable",

    props: {
        element: {
            type: String,
            default: () => "div"
        },

        data: {
            type: Object,
            required: true
        },

        groups: {
            type: Array,
            required: false,
            default: () => []
        },

        locked: {
            type: Boolean,
            required: false,
            default: () => false
        },

        mode: {
            type: String,
            required: false,
            default: () => "move",
            validator: (value: string) => ['copy', 'move'].includes(value)
        }
    },

    emits: ["drag-start", "drag-end"],

    setup(props: any, context: any) {
        const isBeingDragged: Ref<Boolean> = ref(false);
        const instance = getCurrentInstance();

        const onDragStart = (ev: any) => {
            isBeingDragged.value = true;
            let data: DragData = {
                data: props.data,
                groups: props.groups,
                mode: props.mode,
                elementId: id
            }
            
            api.setDragData(props.data);
            ev.dataTransfer.setData("dragged", JSON.stringify(data));
        }

        const onDragEnd = (ev: any) => {
            isBeingDragged.value = false;
            if (api.getDragData() != null) {
                try {
                    let exposed = instance?.parent?.exposed;
                    if (!exposed || !Object.prototype.hasOwnProperty.call(exposed, "items")) return;
                    exposed.items.value.push(api.getDragData());

                }
                finally {
                    api.setDragData(null);
                }
            }
        }

        const slots = useSlots();
        const id = makeid(10)
        return () => h(props.element, {
            draggable: true,
            class: [isBeingDragged.value ? 'dragging' : ''],
            style: [{ cursor: 'grab' }],
            ondragstart: (ev: any) => !props.locked ? onDragStart(ev) : ev.preventDefault(),
            ondragend: (ev: any) => onDragEnd(ev),
            id: id
        }, slots);
    }
}