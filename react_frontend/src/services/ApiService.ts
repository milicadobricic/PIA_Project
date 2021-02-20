import {UserResponse} from "../model/UserResponse";
import {RegisterResponse} from "../model/RegisterResponse";

class ApiService {
    private static endpoint: string = "http://localhost:4000/"

    private static loginEndpoint: string = ApiService.endpoint + "login";
    private static registerEndpoint: string = ApiService.endpoint + "register";

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
}

export default ApiService;
