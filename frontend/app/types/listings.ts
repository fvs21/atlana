
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
    created_at: string;
}

export type ListingCard = {
    id: number;
    title: string;
    description: string;
    price: number;
    images_urls: string[];
    creator: {
        id: number;
        name: string;
        profile_picture: string;
    }
}