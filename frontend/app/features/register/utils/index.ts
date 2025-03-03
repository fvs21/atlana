import { RegisterBody, RegisterErrors } from "../types";

export function validatePassword(password: string): boolean {
    return password.length >= 8;
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRegisterBody(body: RegisterBody): RegisterErrors {
    let errors: RegisterErrors = {}

    if (!validateEmail(body.email)) {
        errors.email = "Correo electrónico invalido";
    }

    if (!validatePassword(body.password)) {
        errors.password = "Escribe una contraseña";
    }

    if (body.first_name.length < 3) {
        errors.first_name = "Escribe tu nombre";
    }

    if (body.last_name.length < 3) {
        errors.last_name = "Escribe tu apellido";
    }

    if (body.company_name.length == 0) {
        errors.company_name = "Escribe el nombre de tu empresa";
    }

    return errors;
}