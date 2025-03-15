export type User = {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    user_type: 'buyer' | 'seller' | 'both';
    profile_picture_url: string;
    country_code: string;
    phone_number: string;

    has_phone_verified: boolean;
    has_email_verified: boolean;
    has_store_created: boolean;
}

export type ResponseBody<T> = {
    data?: T;
    code?: string;
    details?: string;
}

export type Store = {
    id: number;
    name: string;
    store_location: Location;
    creator: number;
    about: string;
    banner: string; //url
}

