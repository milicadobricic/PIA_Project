import {UserResponse} from "../model/UserResponse";
import {RegisterResponse} from "../model/RegisterResponse";
import {User} from "../model/User";
import {UpdateUserResponse} from "../model/UpdateUserResponse";
import {AddUpdateApproveResponse} from "../model/AddUpdateApproveResponse";
import {Class} from "../model/Class";
import {Notification} from "../model/Notification";
import {Group} from "../model/Group";
import {Attendance} from "../model/Attendance";
import {File} from "../model/FIle";

class ApiService {
    private static endpoint: string = "http://localhost:4000/"

    private static loginEndpoint: string = ApiService.endpoint + "login";
    private static registerEndpoint: string = ApiService.endpoint + "register";
    private static employeesEndpoint: string = ApiService.endpoint + "employees";
    private static userEndpoint: string = ApiService.endpoint + "users";
    private static updateUserEndpoint: string = ApiService.endpoint + "update-user";
    private static addUpdateStudentEndpoint: string = ApiService.endpoint + "add-update-student";
    private static studentsEndpoint: string = ApiService.endpoint + "students";
    private static deleteUserEndpoint: string = ApiService.endpoint + "delete-user";
    private static approveStudentEndpoint: string = ApiService.endpoint + "approve-student";
    private static addUpdateEmployeeEndpoint: string = ApiService.endpoint + "add-update-employee";
    private static classesEndpoint: string = ApiService.endpoint + "classes";
    private static addUpdateClassEndpoint: string = ApiService.endpoint + "add-update-class";
    private static classEndpoint: string = ApiService.endpoint + "class";
    private static deleteClassEndpoint: string = ApiService.endpoint + "delete-class";
    private static addUpdateNotificationEndpoint: string = ApiService.endpoint + "add-update-notification";
    private static notificationEndpoint: string = ApiService.endpoint + "notification";
    private static notificationsEndpoint: string = ApiService.endpoint + "notifications";
    private static deleteNotificationEndpoint: string = ApiService.endpoint + "delete-notification";
    private static updatePasswordEndpoint: string = ApiService.endpoint + "update-password";
    private static groupsEndpoint: string = ApiService.endpoint + "groups";
    private static attendancesEndpoint: string = ApiService.endpoint + "attendances";
    private static filesEndpoint: string = ApiService.endpoint + "files";
    private static addUpdateFileEndpoint: string = ApiService.endpoint + "add-update-file";
    private static deleteFileEndpoint: string = ApiService.endpoint + "delete-file";

    public static async login(username: string, password: string): Promise<UserResponse> {
        let response: Response = await fetch(ApiService.loginEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        });

        return await response.json();
    }

    public static async register(firstName: string, lastName: string, studyLevel: string): Promise<RegisterResponse> {
        let response: Response = await fetch(ApiService.registerEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                studyLevel
            }),
        });

        return await response.json();
    }

    public static async employees(): Promise<Array<User>> {
        let response: Response = await fetch(ApiService.employeesEndpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async user(username: string, id: string = ''): Promise<User> {
        let response: Response = await fetch(ApiService.userEndpoint + "/?username=" + username + '&id=' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async updateUser(username: string, address: string, phoneNumber: string, officeNumber: string, biography: string, profilePicture?: string): Promise<UpdateUserResponse> {
        let response: Response = await fetch(ApiService.updateUserEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                address,
                phoneNumber,
                officeNumber,
                biography,
                profilePicture
            }),
        });

        return await response.json();
    }

    public static async addUpdateStudent(student: User): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.addUpdateStudentEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student
            }),
        });

        return await response.json();
    }

    public static async students(): Promise<User[]> {
        let response: Response = await fetch(ApiService.studentsEndpoint, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async deleteUser(user: User): Promise<boolean> {
        let response: Response = await fetch(ApiService.deleteUserEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            }),
        });

        return await response.json();
    }

    public static async approveStudent(student: User): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.approveStudentEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student
            }),
        });

        return await response.json();
    }

    public static async addUpdateEmployee(employee: User): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.addUpdateEmployeeEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee
            }),
        });

        return await response.json();
    }

    public static async classes(group?: string): Promise<Class[]> {
        let api: string = ApiService.classesEndpoint;
        if (group) {
            api += "/?group=" + group;
        }

        let response: Response = await fetch(api, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async addUpdateClass(classInfo: Class): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.addUpdateClassEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "class": classInfo
            }),
        });

        return await response.json();
    }

    public static async class(id: string): Promise<Class> {
        let response: Response = await fetch(ApiService.classEndpoint + "/?id=" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async deleteClass(classInfo: Class): Promise<boolean> {
        let response: Response = await fetch(ApiService.deleteClassEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                class: classInfo
            }),
        });

        return await response.json();
    }

    public static async addUpdateNotification(notification: Notification): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.addUpdateNotificationEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notification
            }),
        });

        return await response.json();
    }

    public static async notification(id: string): Promise<Notification> {
        let response: Response = await fetch(ApiService.notificationEndpoint + "/?id=" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async notifications(classIds: Array<string>): Promise<Array<Notification>> {
        let response: Response = await fetch(ApiService.notificationsEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classIds
            }),
        });

        return await response.json();
    }

    public static async deleteNotification(notification: Notification): Promise<boolean> {
        let response: Response = await fetch(ApiService.deleteNotificationEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notification
            }),
        });

        return await response.json();
    }

    public static async updatePassword(userId: string, oldPassword: string, password: string): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.updatePasswordEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                oldPassword,
                password
            }),
        });

        return await response.json();
    }

    public static async groups(userId?: string): Promise<Array<Group>> {
        let api: string = ApiService.groupsEndpoint;
        if (userId) {
            api += "/?userId=" + userId;
        }

        let response: Response = await fetch(api, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async attendances(userId?: string): Promise<Array<Attendance>> {
        let api: string = ApiService.attendancesEndpoint;
        if (userId) {
            api += "/?userId=" + userId;
        }

        let response: Response = await fetch(api, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async files(classId: string, type: string): Promise<Array<File>> {
        let response: Response = await fetch(ApiService.filesEndpoint + "/?classId=" + classId + '&type=' + type, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    public static async addUpdateFile(file: File): Promise<AddUpdateApproveResponse> {
        let response: Response = await fetch(ApiService.addUpdateFileEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file
            }),
        });

        return await response.json();
    }

    public static async deleteFile(file: File): Promise<boolean> {
        let response: Response = await fetch(ApiService.deleteFileEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file
            }),
        });

        return await response.json();
    }
}

export default ApiService;
