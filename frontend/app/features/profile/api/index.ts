import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Listing, PropertyListing } from "~/types/listings";

export function useFetchUserListings(user_id: number) {
    const { data, isLoading } = useQuery({
        queryKey: ["user-listings", user_id],
        queryFn: async () => {
            const req = await api.get<ResponseBody<{listings: Listing[] | PropertyListing[]}>>(`/user/profile/${user_id}/listings/`);
            return req.data;
        }
    });

    return {
        data,
        isLoading
    }
}