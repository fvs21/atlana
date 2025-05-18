import { ResponseBody } from "~/types/globals";
import { BASE_URL } from ".";
import { redirect } from "@remix-run/node";

export const authTokenExists = ({ request }: { request: Request }) => {
    return getAuthToken({ request }) != null;
}

export const getAuthToken = ({ request }: { request: Request }): string | null => {
    const cookies = request.headers.get("Cookie");
    const token = cookies?.split(";").find(cookie => cookie.trim().startsWith("user_r"))?.split("=")[1];
    
    if(!token) return null;

    return token;
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

export const onlyGuests = ({ request }: { request: Request }) => {
    const token = getAuthToken({ request });

    if(token != null) {
        throw redirect("/dashboard");
    }
}

const parseJwt = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export const onlyAuthenticated = ({ request }: { request: Request }) => {
    const token = getAuthToken({ request });

    if(token == null) {
        throw redirect("/login");
    }

    const payload = parseJwt(token);
    
    if(!payload.verified && false) {
        throw redirect("/verify-email");
    }
}