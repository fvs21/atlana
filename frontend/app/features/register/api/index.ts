import { apiGuest } from "~/api";
import { RegisterBody, RegistrationResponse } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResponseBody } from "~/types/globals";

export function useRegister() {
    const queryClient = useQueryClient();

    const { mutateAsync: register, isPending, isError } = useMutation({
        mutationFn: async (body: RegisterBody): Promise<RegistrationResponse> => {
            const request = await apiGuest.post<ResponseBody<RegistrationResponse>>("/auth/register", body);

            return request.data.data as RegistrationResponse;
        },
        onSuccess: (response: RegistrationResponse) => {
            queryClient.setQueryData(['access-token'], response.access_token);
            queryClient.setQueryData(['user'], response.user);
        }
    });

    return {
        register,
        isPending,
        registerDisabled: isPending && !isError
    }
}