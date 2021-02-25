import {prop} from '@typegoose/typegoose';

export class Group {
    @prop({required: true})
    public id: string;

    @prop({required: true})
    public userId: string;

    @prop({required: true})
    public classId: string;

    @prop({required: true})
    public type: string;

    @prop({required: true})
    public name: string;

    @prop({required: true})
    public time: string;
}
