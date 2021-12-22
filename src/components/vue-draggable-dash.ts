import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations
import { makeid, isDraggableComponent } from '../../Legacy/src/utils';
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

        groups: {
            type: Array,
            required: false,
            default: () => []
        },
    
        locked: {
            type: Boolean,
            required: false,
            default: () => false
        }
    },

    emits: ["drag-start", "drag-end"],

    setup(props: any, context: any) {
        const isBeingDragged: Ref<Boolean> = ref(false);
        const instance = getCurrentInstance();

        const onDragStart = (ev: any) => {
            isBeingDragged.value = true;
            let data = {
                data: props.data,
                groups: props.groups,
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
            ondragstart: (ev: any) => !props.locked ? onDragStart(ev) :  ev.preventDefault(),
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

        groups: {
            type: Array,
            required: false,
            default: () => []
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
            if (!item.groups || props.groups.filter((value: String) => item.groups.includes(value)).length == 0) return;

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

        return () => {
            items.value.length = 0;
            return h(props.element, {
                ref: dropcontainer,
                ondrop: (ev: any) => onDrop(ev),
                ondragover: (e: any) => e.preventDefault(),
                ondragleave: () => onDragLeave()
            }, getChildren())
        }
    }
}