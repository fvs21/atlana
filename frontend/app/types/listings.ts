export type Listing = {
    id: number;
    store: number;
    title: string;
    description: string;
    customizable: boolean;
    ready_to_ship: boolean;
    images: string[];
    prices: ListingPrice[];
    created_at: string;
}

export type ListingCard = {
    id: number;
    title: string;
    prices: ListingPrice[];
    images: string[];
}

export type ListingPrice = {
    listing_id: number;
    price: number;
    min_units: number;
    max_units: number;
}
