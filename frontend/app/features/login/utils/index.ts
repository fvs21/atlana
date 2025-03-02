import { LoginBody, LoginErrors } from "../types";

export function validateLoginForm(loginBody: LoginBody): LoginErrors {
    const errors: LoginErrors = {};

    if(!loginBody.email.length) {
        errors.email = "Ingresa tu correo";
    }

    if(!loginBody.password.length) {
        errors.password = "Ingresa tu contraseña";
    }

    return errors;
}