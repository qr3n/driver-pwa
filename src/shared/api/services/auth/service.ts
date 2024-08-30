import { LogInParams, LogInResponse, SignUpParams, SignUpResponse } from "./types";
import { driverApi } from "@/shared/api";

class AuthService {
    async login(params: LogInParams) {
        return driverApi.post<LogInResponse>("/login", params);
    }

    async signUp(params: SignUpParams) {
        return driverApi.post<SignUpResponse>("/sign-up", params);
    }
}

export const authService = new AuthService();
