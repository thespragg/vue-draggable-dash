import { h, useSlots, ref } from 'vue'
import { Ref } from 'vue'

export default {
    name: "dropable",
    props: {
        element: {
            type: String,
            default: () => "div"
        }
    },
    setup: (props: any, context: any) => {
        const dropcontainer: any = ref(null);
        const items: Ref<Array<object>> = ref([])

        const onDrop = (ev: any) => {
            ev.preventDefault();
            let item = JSON.parse(ev.dataTransfer.getData("dragged"))
            dropcontainer.value.appendChild(document.getElementById(item.el))
            items.value.push(item.data)
        }

        const isDraggableComponent = (el: any) => {
            try {
                if (!el || !el.type || !el.type.name) return false;
                if (el.type.name === "draggable") return true;
                return false;
            } catch {
                return false;
            }
        }

        const slots = useSlots();
        const getChildren = () => {
            if (!slots.default) return;
            let els = slots.default();
            for (let i = 0; i < els.length; i++) {
                if (isDraggableComponent(els[i])) {
                    if (!els[i].props) els[i].props = {}
                    items.value.push(els[i].props!.data);
                    els[i].props!.onInternalDragStart = (ev: any) => {
                        let index = items.value.findIndex((x: any) => x.key == ev)
                        items.value.splice(index, 1);
                    }
                }
            }
            return els;
        }

        let children = getChildren();
        return () => h(props.element, {
            ref: dropcontainer,
            ondrop: onDrop,
            ondragover: (e: any) => e.preventDefault()
        }, children)
    }
}