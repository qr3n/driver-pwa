export interface LogInParams {
    email: string,
    password: string,
}

export interface SignUpParams {
    email: string,
    password: string,
}

export interface LogInResponse {
    access_token: string
}

export interface SignUpResponse {
    access_token: string
}

export interface SendResetPasswordCodeRequest {
    email: string
}


export interface ResetPasswordParams {
    email: string
    code: string
    new_password: string
}

export interface ResetPasswordResponse {
    access_token: string

}