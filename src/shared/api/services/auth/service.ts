import {
    LogInParams,
    LogInResponse,
    ResetPasswordParams,
    ResetPasswordResponse, SendResetPasswordCodeRequest,
    SignUpParams,
    SignUpResponse
} from "./types";
import { baseApi } from "@/shared/api";

class AuthService {
    async login(params: LogInParams) {
        return baseApi.post<LogInResponse>("/auth/login", params);
    }

    async signUp(params: SignUpParams) {
        return baseApi.post<SignUpResponse>("/auth/signup", params);
    }

    async sendResetPasswordCode(params: SendResetPasswordCodeRequest) {
        return baseApi.post<ResetPasswordResponse>('/auth/reset_password/code', params)
    }

    async resetPassword(params: ResetPasswordParams) {
        return baseApi.post<ResetPasswordResponse>('/auth/reset_password', params)
    }
}

export const authService = new AuthService();
