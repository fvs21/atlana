export type User = {
    first_name: string;
    last_name: string;
    email: string;
    profile_picture_url: string;
    country_code: string;
    phone_number: string;

    has_phone_verified: boolean;
    has_email_verified: boolean;
}

export type ResponseBody<T> = {
    data?: T;
    code?: string;
    details?: string;
}