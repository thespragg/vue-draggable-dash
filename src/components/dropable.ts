import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue' // Type declarations
import { isDraggableComponent, currentDrag } from '../utils';

export default {
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
            if (item.groups.length != 0 && props.groups.filter((value: String) => item.groups.includes(value)).length == 0) return;

            var dragged = document.getElementById(item.elementId)
            if (item.mode == "move") dropcontainer.value.appendChild(dragged)
            if (item.mode == "copy") dropcontainer.value.appendChild(dragged?.cloneNode(true))
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