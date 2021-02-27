import {prop} from '@typegoose/typegoose';

export class NotificationFile {
    @prop({required: true})
    public id: string;

    @prop({required: true})
    public name: string;

    @prop({required: true})
    public content: string;

    @prop({required: true})
    public mimeType: string;
}

export class Notification {
    @prop({required: true})
    public id: string;

    @prop({required: true})
    public title: string;

    @prop({required: true})
    public content: string;

    @prop({required: true})
    public date: string;

    @prop({required: true})
    public classes: string[];

    @prop({required: true})
    public userId: string;

    @prop({default: []})
    public files: NotificationFile[];
}
