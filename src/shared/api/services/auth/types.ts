export interface LogInParams {
    email: string,
    password: string,
}

export interface SignUpParams {
    email: string,
    password: string,
}

export interface LogInResponse {
    token: string
}

export interface SignUpResponse {
    token: string
}