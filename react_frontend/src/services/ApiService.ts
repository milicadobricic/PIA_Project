import {UserResponse} from "../model/UserResponse";
import {RegisterResponse} from "../model/RegisterResponse";
import {User} from "../model/User";
import {UpdateUserResponse} from "../model/UpdateUserResponse";
import {AddUpdateApproveResponse} from "../model/AddUpdateApproveResponse";
import {Class} from "../model/Class";

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

    public static async updateUser(username: string, address: string, phoneNumber: string, officeNumber: string, biography: string): Promise<UpdateUserResponse> {
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

    public static async classes(department: string): Promise<Class[]> {
        let response: Response = await fetch(ApiService.classesEndpoint + "/?department=" + department, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }
}

export default ApiService;
