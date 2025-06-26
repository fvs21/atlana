import { Category } from "~/types/listings";

export function validateStepOne(title: string, description: string, category: Category | undefined, used: boolean): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (!title) {
        errors.title = "El título es requerido";
    }

    if (!description) {
        errors.description = "La descripción es requerida";
    }

    if (!category) {
        errors.category = "La categoría es requerida";
    }

    if(category && !["property_rentals", "food"].includes(category)) {
        if (used == null) {
            errors.used = "La condición del producto es requerida";
        }
    }

    if(description.length > 500) {
        errors.description = "La descripción no puede exceder los 500 caracteres";
    }

    return errors;
}