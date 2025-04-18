import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Listing } from "~/types/listings";

export function useFetchListings() {
    const { data, isLoading } = useQuery({
        queryKey: ["listings"],
        queryFn: async () => {
            const request = await api.get<ResponseBody<{listings: Listing[]}>>("/marketplace/all");
            return request.data;
        }
    });

    return {
        data, 
        isLoading
    }
}