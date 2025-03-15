import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterStoreBody, RegisterStoreResponse } from "../types";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";

export function useRegisterStore() {
    const queryClient = useQueryClient();

    const { mutateAsync: register, isPending, isError } = useMutation({
        mutationFn: async (store: RegisterStoreBody) => {
            const request = await api.post<ResponseBody<RegisterStoreResponse>>("/store/create", store);
            return request.data;
        },
        onSuccess: (body) => {
            queryClient.setQueryData(['store', body.data?.store.id], body.data?.store);
        }
    });

    return {
        register,
        isPending,
        registerDisabled: isPending && !isError
    }
}