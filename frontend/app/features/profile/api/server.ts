import { BASE_URL } from "~/api";
import { ResponseBody } from "~/types/globals";

export async function getProfileInformation({ id, token }: { id: number, token: string }): Promise<ResponseBody<{profile: Profile}>> {
    const req = await fetch(BASE_URL + "/user/profile/" + id, {
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