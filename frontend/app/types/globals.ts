export type User = {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    user_type: 'buyer' | 'seller' | 'both';
    profile_picture_url: string;
    country_code: string;
    phone_number: string;

    phone_verified: boolean;
    email_verified: boolean;
}

export type ResponseBody<T> = {
    data?: T;
    code?: string;
    details?: string;
}