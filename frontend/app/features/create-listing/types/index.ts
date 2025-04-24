import { Category } from "~/types/listings";

export type CreateListingBody = {
    title: string;
    description: string;
    category: Category;
    images: File[];
    price: number;
    used: boolean;
}

export type CreatePropertyListingBody = CreateListingBody & {
    sell: boolean;
    aproximate_location: boolean;
    location: {
        latitude: number;
        longitude: number;
    }
    property_type: string;
    bedrooms: number;
    bathrooms: number;
}

export type LocationQueryResult = {
    lat: number;
    lon: number;
    display_name: string;
    place_id: string;
}