import {User} from "./User";

export class UserResponse {
    public success!: boolean;
    public message?: string;
    public user?: User;
}
