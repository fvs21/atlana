import { ResponseBody } from "~/types/globals";
import { Listing, PropertyListing } from "~/types/listings";

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export const fetchListing = async (id: number, token: string): Promise<ResponseBody<{ listing: Listing | PropertyListing }> | undefined> => {
    const response = await fetch(SERVER_BASE_URL + `/marketplace/listing/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) {
        return;
    }

    return response.json();
}