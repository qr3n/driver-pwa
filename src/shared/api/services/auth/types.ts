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