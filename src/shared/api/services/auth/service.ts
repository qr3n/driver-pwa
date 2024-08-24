import { LogInParams, LogInResponse, SignUpParams, SignUpResponse } from "./types";
import { api } from "@/shared/api";

class AuthService {
    async login(params: LogInParams) {
        return api.post<LogInResponse>("/login", params);
    }

    async signUp(params: SignUpParams) {
        return api.post<SignUpResponse>("/sign-up", params);
    }
}

export const authService = new AuthService();
