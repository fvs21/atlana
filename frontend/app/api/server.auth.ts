import { ResponseBody } from "~/types/globals";
import { BASE_URL } from ".";

export const authTokenExists = ({ request }: { request: Request }): boolean => {
    const cookies = request.headers.get("Cookie");

    return cookies?.split(";").some(cookie => cookie.trim().startsWith("user_r")) || false;
}

/**
 * server function
 */
export const refreshToken = async ({ request }: { request: Request }) => {
    const response = await fetch(BASE_URL + "/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
            "Cookie": request.headers.get("Cookie") || "",
        }
    });

    if(response.ok) {
        return response.json() as Promise<ResponseBody<{ access_token: string }>>;
    }

    return null;
}