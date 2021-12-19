export default class VueDragEvent {
    type : String;
    data: Object;
    sender: Object;

    constructor(_type: string, _data: object, _sender : object) {
        this.type = _type;
        this.data = _data;
        this.sender = _sender;
    }
}