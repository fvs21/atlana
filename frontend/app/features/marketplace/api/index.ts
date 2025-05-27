import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Category, Listing, ListingCard, PropertyListingCard } from "~/types/listings";
import { PropertyMapBounds } from "../types";

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
    const { data, isLoading } = useQuery({
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

export function useFilterListingsInsideBounds(bounds: PropertyMapBounds) {
    const { data, isLoading } = useQuery({
        queryKey: ["property-listings", bounds],
        queryFn: async () => {
            const query = new URLSearchParams({
                northeast: `${bounds.northeast.lat},${bounds.northeast.lng}`,
                southwest: `${bounds.southwest.lat},${bounds.southwest.lng}`
            });

            const res = await api.get<ResponseBody<{listings: PropertyListingCard[]}>>(`/marketplace/property/bounds?${query.toString()}`);
            return res.data.data;
        }
    });

    return {
        data,
        isLoading
    }
}

export function useDeleteListing(listingId: number) {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteListing, isPending, isError } = useMutation({
        mutationFn: async () => {
            const response = await api.delete<ResponseBody<null>>(`/listing/${listingId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["listing", listingId]
            });
            queryClient.invalidateQueries({
                queryKey: ["listings"]
            });
        }   
    });

    return {
        deleteListing,
        isPending,
        isError
    }
}