import { apiGuest } from "~/api";
import { RegisterBody } from "../types";

export async function register(body: RegisterBody) {
    return await apiGuest.post('/register', body);
}