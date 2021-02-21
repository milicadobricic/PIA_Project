import {User} from "./User";

export class UpdateUserResponse {
    public success!: boolean;
    public message!: string;
    public user?: User;
}
