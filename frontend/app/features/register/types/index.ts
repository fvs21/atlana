import { User } from "~/types/globals";

export type RegisterBody = {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    password: string;
    user_type: string;
}

export type RegisterErrors = {
    first_name?: string;
    last_name?: string;
    email?: string;
    company_name?: string;
    password?: string;
    user_type?: string;
    confirm_password?: string;
    agree_to_terms?: string;
}

export type RegistrationResponse = {
    access_token: string;
    user: User;
}