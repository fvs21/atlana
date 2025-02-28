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

    if (body.password !== body.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (body.firstName.length < 3) {
        errors.firstName = "Escribe tu nombre";
    }

    if (body.lastName.length < 3) {
        errors.lastName = "Escribe tu apellido";
    }

    if (body.companyName.length == 0) {
        errors.companyName = "Escribe el nombre de tu empresa";
    }

    return errors;
}