import { Category, PropertyTimeUnit } from "~/types/listings";

export type CreateListingBody = {
    title: string;
    description: string;
    category: Category;
    images: File[];
    price: number;
    used?: boolean;
}

export type CreatePropertyListingBody = CreateListingBody & {
    sell: boolean;
    location: {
        latitude: number;
        longitude: number;
        radius: number;
    }
    time_unit: PropertyTimeUnit;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    air_conditioning: boolean;
    furnished: boolean;
}

export type LocationQueryResult = {
    lat: number;
    lon: number;
    display_name: string;
    place_id: string;
}