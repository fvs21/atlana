export type ResetPasswordBody = {
    new_password: string;
    token: string;
    confirm_password: string;
    email: string;
}