export const makeid = (len: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const isDraggableComponent = (el: any) => {
    try {
        if (el.type.name === "dragable") return true;
        return false;
    } catch {
        return false;
    }
}

export let currentDragData: any = null;
export const setDragData = (data: any) => currentDragData = data;

class stateApi {
    currentDragObject: any;

    constructor() {
        this.currentDragObject = null;
    }

    setDragData = (data: any) => this.currentDragObject = data;
    getDragData = () => this.currentDragObject;
}

export const api = new stateApi();