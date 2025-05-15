import { UserInformation } from "~/types/globals";

export type Profile = {
    id: number;
    full_name: string;
    profile_picture_url: string;
    information: UserInformation;
}