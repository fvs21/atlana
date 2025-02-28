export type RegisterBody = {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    password: string;
    userType: string;
    confirmPassword: string;
}

export type RegisterErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyName?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
    agreeToTerms?: string;
}