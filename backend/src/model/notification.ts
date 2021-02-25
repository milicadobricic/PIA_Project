import {prop} from '@typegoose/typegoose';

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
}
