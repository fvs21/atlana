export type LoginBody = {
    email: string;
    password: string;
}

export type LoginErrors = {
    email?: string;
    password?: string;
}