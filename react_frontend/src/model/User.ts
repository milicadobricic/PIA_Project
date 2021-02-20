export class EmployeeInfo {
    public address!: string;
    public phoneNumber?: string;
    public webSite?: string;
    public biography?: string;
    public title!: string;
    public officeNumber!: string;
    public profilePicture?: Buffer;
}

export class StudentInfo {
    public idNumber!: string;
    public level!: string;
}

export class User {
    public id!: string;
    public username!: string;
    public firstName?: string;
    public lastName?: string;
    public status?: string;
    public userType!: string;
    public isValidPassword!: boolean;
    public employeeInfo?: EmployeeInfo;
    public studentInfo?: StudentInfo;
}
