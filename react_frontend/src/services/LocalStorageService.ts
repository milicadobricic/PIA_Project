import {User} from "../model/User";

class LocalStorageService {
    public static getUser(): User {
        let value = localStorage.getItem("user");
        return value ? JSON.parse(value) : null;
    }

    public static setUser(user: User) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    public static removeUser() {
        localStorage.removeItem("user");
    }
}

export default LocalStorageService;
