export type User = {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    profile_picture_url: string;

    has_email_verified: boolean;

    information: UserInformation;
}

export type UserInformation = {
    major?: string;
    semester?: number;
    instagram?: string;
    bio?: string;
    university: string;
}

export type ResponseBody<T> = {
    data?: T;
    code?: string;
    details?: string;
}

export type Universities = 'Anáhuac Mayab' | 'EBC';