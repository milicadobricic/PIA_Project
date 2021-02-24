import {prop} from '@typegoose/typegoose';

export class Code {
    @prop({required: true})
    public department!: string;

    @prop({required: true})
    public year!: number;

    @prop({required: true})
    public semester!: number;

    @prop({required: true})
    public subject!: string;
}

export class Class {
    @prop({ required: true })
    public id!: string;

    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public mandatory!: boolean;

    @prop({ required: true })
    public codes!: [Code];

    @prop({ required: true })
    public classesPerWeek!: number;

    @prop({required: true})
    public credits!: number;

    @prop({required: true})
    public requirements!: string;

    @prop({required: true})
    public goal!: string;

    @prop({default: null})
    public description?: string;
}
