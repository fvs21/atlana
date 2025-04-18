import { useMutation } from "@tanstack/react-query";
import { apiMultiPart } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Listing } from "~/types/listings";

export function useCreateListing() {
    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async (body: FormData) => {
            const request = await apiMultiPart.post<ResponseBody<Listing>>("/listing/create", body);
            return request.data
        }
    });

    return {
        create,
        isPending,
        createDisabled: isPending && !isError,
    };
}