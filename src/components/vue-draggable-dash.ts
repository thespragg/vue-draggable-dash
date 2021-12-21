import { h, useSlots, ref, watch } from 'vue'
import { Ref } from 'vue' // Type declarations
import { makeid, isDraggableComponent } from '../utils';
import { getCurrentInstance } from "vue";

let currentDrag: any = ref(null);

export const dragable = {
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

        prop: {
            type: String,
            required: false,
            default: () => "key"
        },
    },

    emits: ["drag-start", "drag-end"],

    setup(props: any, context: any) {
        const isBeingDragged: Ref<Boolean> = ref(false);
        const instance = getCurrentInstance();

        const onDragStart = (ev: any) => {
            isBeingDragged.value = true;
            let data = {
                data: props.data,
                el: id
            }
            currentDrag.value = props.data;
            ev.dataTransfer.setData("dragged", JSON.stringify(data));
        }

        const onDragEnd = (ev: any) => {
            isBeingDragged.value = false;
            if (currentDrag.value != null) {
                try {
                    let exposed = instance?.parent?.exposed;
                    if (!exposed) return;
                    exposed.items.value.push(currentDrag.value);
                    
                }
                finally {
                    currentDrag.value = null;
                }
            }
        }

        const slots = useSlots();
        const id = makeid(10)

        return () => h(props.element, {
            draggable: true,
            class: [isBeingDragged.value ? 'dragging' : ''],
            ondragstart: (ev: any) => onDragStart(ev),
            ondragend: (ev: any) => onDragEnd(ev),
            id: id
        }, slots);
    }
}

export const dropable = {
    name: "dropable",

    props: {
        element: {
            type: String,
            required: false,
            default: () => "div"
        },
    },

    setup: (props: any, context: any) => {
        const dropcontainer: any = ref(null);
        const items: Ref<Array<object>> = ref([])

        context.expose({
            items
        })

        const onDrop = (ev: any) => {
            ev.preventDefault();
            let item = JSON.parse(ev.dataTransfer.getData("dragged"))
            var dragged = document.getElementById(item.el)
            dropcontainer.value.appendChild(dragged)
            items.value.push(currentDrag.value);
            currentDrag.value = null;
        }

        const onDragLeave = () => {
            var index = items.value.findIndex((x: any) => x.key == currentDrag.value.key)
            if (index == -1) return;
            items.value.splice(index, 1);
        }

        const slots = useSlots();
        const getChildren = () => {
            if (!slots.default) return;
            let els = slots.default();
            for (let i = 0; i < els.length; i++) {
                if (isDraggableComponent(els[i])) {
                    if (!els[i].props) els[i].props = {}
                    items.value.push(els[i].props!.data);
                }
            }
            return els;
        }

        return () => h(props.element, {
            ref: dropcontainer,
            ondrop: (ev: any) => onDrop(ev),
            ondragover: (e: any) => e.preventDefault(),
            ondragleave: () => onDragLeave()
        }, getChildren())
    }
}