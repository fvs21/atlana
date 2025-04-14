import { ListingPrice } from "~/types/listings";

export function validateStepOne(title: string, description: string, category: string) {
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

    return errors;
}

export const validatePrices = (prices: ListingPrice[]) => {
    
}