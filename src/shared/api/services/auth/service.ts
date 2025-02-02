import { LogInParams, LogInResponse, SignUpParams, SignUpResponse } from "./types";
import { baseApi } from "@/shared/api";

class AuthService {
    async login(params: LogInParams) {
        return baseApi.post<LogInResponse>("/auth/login", params);
    }

    async signUp(params: SignUpParams) {
        return baseApi.post<SignUpResponse>("/auth/signup", params);
    }
}

export const authService = new AuthService();
