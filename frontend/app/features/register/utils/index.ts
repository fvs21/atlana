import { RegisterBody, RegisterErrors } from "../types";

export function validatePassword(password: string): boolean {
    return password.length >= 8;
}

export function validateEmail(email: string): boolean {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }

    const domain = email.split("@")[1];
    

    if (domain !== "anahuacmayab.edu.mx") {
        return false;
    }

    return true;
}

export function validateRegisterBody(body: RegisterBody): RegisterErrors {
    let errors: RegisterErrors = {}

    if (!validateEmail(body.email)) {
        errors.email = "Correo electrónico invalido. Asegúrate de usar tu correo institucional";
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

    return errors;
}