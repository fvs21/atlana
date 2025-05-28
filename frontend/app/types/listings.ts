import { Location } from "./location";

export type Category = "" | "electronics" | "clothing" | "scholar" | "sports" | "food" | "furniture" | "vehicles" | "property_rentals";

export type PropertyType = "" | "apartment" | "house" | "townhouse" | "villa" | "studio" | "room_only";

export type Listing = {
    id: number;
    creator: {
        id: number;
        name: string;
        profile_picture: string;
    }
    title: string;
    description: string;
    category: string;
    images_urls: string[];
    price: number;
    used: boolean;
    archived: boolean;
    created_at: string;
}

export type PropertyListing = Listing & {
    property: {
        sell: boolean;
        location: Location;
        property_type: PropertyType;
        bedrooms: number;
        bathrooms: number;
        time_unit: PropertyTimeUnit;
    }
}

export type ListingCard = {
    id: number;
    title: string;
    price: number;
    images_urls: string[];
    archived?: boolean;
    creator: {
        id: number;
        name: string;
        profile_picture: string;
    }
}

export type PropertyListingCard = ListingCard & {
    property: {
        location: Location;
    }
}

export type PropertyTimeUnit = "day" | "week" | "month";