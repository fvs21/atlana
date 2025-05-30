import { ResponseBody } from "~/types/globals";
import { Profile } from "../types";

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export async function getProfileInformation({ id, token }: { id: number, token: string }): Promise<ResponseBody<{profile: Profile}>> {
    const req = await fetch(SERVER_BASE_URL + "/user/profile/" + id, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
        }
    });

    if (!req.ok) {
        throw new Error("Failed to fetch profile");
    }

    return req.json();
}