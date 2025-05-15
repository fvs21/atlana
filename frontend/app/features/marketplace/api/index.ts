import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Category, Listing } from "~/types/listings";

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

export function useFetchListing(id: number) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["listing", id],
        queryFn: async () => {
            const request = await api.get<ResponseBody<Listing>>(`/listing/${id}`);
            return request.data;
        }
    });

    return {
        data,
        isLoading
    }
}

export function useFetchListingsByCategory(category: Category) {
    const { data, isLoading } = useQuery({
        queryKey: ["listings", category],
        queryFn: async () => {
            const request = await api.get<ResponseBody<{listings: Listing[]}>>(`/marketplace/category/${category}`);
            return request.data;
        }
    });

    return {
        data,
        isLoading
    }
}

export function useSendMessage() {
    const { mutateAsync: sendMessage, isPending, isError } = useMutation({
        mutationFn: async (receiver_id: number) => {
            const res = await api.post<ResponseBody<{chat_id: number}>>("/chat/create", {
                receiver_id
            });

            return res.data.data;
        }
    });

    return {
        sendMessage,
        isPending,
        sendMessageDisabled: isPending && !isError,
    }
}