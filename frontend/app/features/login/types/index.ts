import { User } from "~/types/globals";

export type LoginBody = {
    email: string;
    password: string;
}

export type LoginErrors = {
    email?: string;
    password?: string;
}

export type LoginResponse = {
    access_token: string;
    user: User;
}