import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UpdatePhoneNumber } from "../types"
import { api } from "~/api"
import { ResponseBody, User } from "~/types/globals";

export function useUpdatePhoneNumber() {
    const queryClient = useQueryClient();

    const { mutateAsync: update, isPending, isError } = useMutation({
        mutationFn: async (body: UpdatePhoneNumber) => {
            const request = await api.put<ResponseBody<User>>("/auth/phone/update", body);
            
            return request.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data);
        }
    });

    return {
        update,
        isPending,
        updateDisabled: isPending && !isError
    };
}

export function useVerifyPhone() {
    const queryClient = useQueryClient();


}