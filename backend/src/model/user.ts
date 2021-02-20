import { prop } from '@typegoose/typegoose';

export class EmployeeInfo {
    @prop({ required: true })
    public address!: string;

    @prop({ default: null })
    public phoneNumber?: string;

    @prop({ default: null })
    public webSite?: string;

    @prop({ default: null })
    public biography?: string;

    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public officeNumber!: string;

    @prop({ default: null })
    public profilePicture?: Buffer;
}

export class StudentInfo {
    @prop({ required: true })
    public idNumber!: string;

    @prop({ required: true })
    public level!: string;

    @prop({required: true})
    public approved!: boolean;
}

export class User {
    @prop({ required: true })
    public id!: string;

    @prop({ required: true })
    public username!: string;

    @prop({ required: true })
    public password!: string;

    @prop({ default: null })
    public firstName?: string;

    @prop({ default: null })
    public lastName?: string;

    @prop({ default: null })
    public status?: string;

    @prop({ required: true })
    public userType!: string;

    @prop({ required: true })
    public isValidPassword!: boolean;

    @prop({ default: null })
    public employeeInfo?: EmployeeInfo;

    @prop({ default: null })
    public studentInfo?: StudentInfo;
}
