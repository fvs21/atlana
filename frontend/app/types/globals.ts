export type User = {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
    user_type: 'buyer' | 'seller' | 'both';
}

export type ResponseBody<T> = {
    data?: T;
    code?: string;
    details?: string;
}