type DragEvents = {
    type: EventType,
    data: Object,
}

type DragData = {
    data: Object,
    groups: Array<String>,
    mode: DropAction,
    elementId: String
}

export enum DropAction {
    move,
    copy,
}

export enum EventType {
    dragEnter,
    dragLeave,
    dragOver,
    dragStart,
    dragEnd,
    drag,
    drop
}