import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody, Store } from "~/types/globals";

type StoreResponse = {
    store: Store;
}

export function useStore() {
    const { data, isLoading } = useQuery({
        queryKey: ['store'],
        queryFn: async () => {
            const request = await api.get<ResponseBody<StoreResponse>>("/store/get");
            return request.data.data?.store;
        }
    });

    return { data, isLoading };
}

export function useUpdateAbout() {
    const queryClient = useQueryClient();

    const { mutateAsync: update, isPending, isError } = useMutation({
        mutationFn: async (body: { about: string }) => {
            const request = await api.patch<ResponseBody<Store>>("/store/about", body);
            return request.data;
        },
        onSuccess: (response) => {
            queryClient.setQueryData(['store'], response.data);
        }
    });

    return {
        update,
        isPending,
        updateDisabled: isPending && !isError
    };
}