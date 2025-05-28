import { ResponseBody } from "~/types/globals";
import { BASE_URL } from ".";
import { redirect } from "@remix-run/node";

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

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

export const onlyGuests = ({ request }: { request: Request }): void => {
    const token = getAuthToken({ request });

    if(token != null) {
        throw redirect("/dashboard");
    }
}

const parseJwt = (token: string) => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

const parsePath = (url: string): string => {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search;
}

export const onlyAuthenticated = ({ request }: { request: Request }): void => {
    const token = getAuthToken({ request });

    const path = parsePath(request.url);

    if(token == null) {
        throw redirect("/login?redirect=" + encodeURIComponent(path));
    }

    const payload = parseJwt(token);
    
    if(!payload.verified) {
        throw redirect("/verify-email");
    }
}

export const onlyAuthenticatedNotVerified = ({ request }: { request: Request }): void => {
    const token = getAuthToken({ request });  
    
    const path = parsePath(request.url);

    if(token == null) {
        throw redirect("/login?redirect=" + encodeURIComponent(path));
    }

    const payload = parseJwt(token);
    
    if(payload.verified) {
        throw redirect("/marketplace");
    }
}

/**
 * Allows all requests, but check if the user is authenticated and verified
 * and redirects to the verify email page if not
 */
export const allowAll = ({ request }: { request: Request }): void => {
    const token = getAuthToken({ request });

    if(token == null) {
        return;
    }

    const payload = parseJwt(token);
    
    if(!payload.verified) {
        throw redirect("/verify-email");
    }
}