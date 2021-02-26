import {prop} from '@typegoose/typegoose';

export class File {
    @prop({required: true})
    public id: string;

    @prop({required: true})
    public content: string;

    @prop({required: true})
    public name: string;

    @prop({required: true})
    public classId: string;

    @prop({required: true})
    public type: string;

    @prop({required: true})
    public date: string;

    @prop({required: true})
    public size: string;

    @prop({required: true})
    public professorName: string;

    @prop({required: true})
    public professorId: string;

    @prop({default: null})
    public optionalText: string;
}
