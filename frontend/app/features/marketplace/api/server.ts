import { ResponseBody } from "~/types/globals";
import { Listing, PropertyListing } from "~/types/listings";

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export const fetchListing = async (id: number, token: string): Promise<ResponseBody<Listing | PropertyListing>> => {
    const response = await fetch(SERVER_BASE_URL + `/listing/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch listing");
    }

    return response.json();
}