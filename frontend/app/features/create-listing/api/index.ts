import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiMultiPart } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Listing } from "~/types/listings";
import { LocationQueryResult } from "../types";

export function useCreateListing() {
    const queryClient = useQueryClient();

    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async (body: FormData) => {
            const request = await apiMultiPart.post<ResponseBody<Listing>>("/listing/create", body);
            return request.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["listings"] });
        }
    });

    return {
        create,
        isPending,
        createDisabled: isPending && !isError,
    };
}

export function useCreatePropertyListing() {
    const queryClient = useQueryClient();

    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async (body: FormData) => {
            const request = await apiMultiPart.post<ResponseBody<Listing>>("/listing/create/property", body);
            return request.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["listings"] });
        }
    });

    return {
        create,
        isPending,
        createDisabled: isPending && !isError,
    };
}

export function useQueryLocation() {
    const queryClient = useQueryClient();

    const { mutateAsync: queryLocation, isPending } = useMutation({
        mutationFn: async (query: string) => {
            const request = await api.get<ResponseBody<{ locations: LocationQueryResult[] }>>("/location/search?q=" + query);
            return request.data;
        },
        onSuccess: (data) => {
            data.data?.locations.forEach((location) => {
                queryClient.setQueryData(["location", location.display_name], location);
            });
        }
    });

   return {
        queryLocation,
        isPending,
   } 
}