export class NotificationFile {
    public id!: string;
    public name!: string;
    public content!: string;
    public mimeType!: string;
}

export class Notification {
    public id!: string;
    public title!: string;
    public content!: string;
    public date!: string;
    public classes!: Array<string>;
    public userId!: string;
    public files?: Array<NotificationFile>
}
