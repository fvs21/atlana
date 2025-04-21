import { PropertyType } from "~/types/listings";

type PropertyTypeObject = {
    name: string;
    value: PropertyType;
}

export const PropertyTypes = [
    {
        name: "Apartamento",
        value: "apartment"
    },
    {
        name: "Casa",
        value: "house"
    },
    {
        name: "Casa de campo",
        value: "townhouse"
    },
    {
        name: "Villa",
        value: "villa"
    },
    {
        name: "Estudio",
        value: "studio"
    },
    {
        name: "Habitación individual",
        value: "room_only"
    }
]