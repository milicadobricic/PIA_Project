import {UserResponse} from "../model/UserResponse";

class ApiService {
    private static endpoint: string = "http://localhost:4000/"

    private static loginEndpoint: string = ApiService.endpoint + "login";

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
}

export default ApiService;
