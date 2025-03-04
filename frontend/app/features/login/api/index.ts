import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginBody, LoginResponse } from "../types"
import { apiGuest } from "~/api"
import { ResponseBody } from "~/types/globals";

export const useLogin = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: login, isPending, isError } = useMutation({
        mutationFn: async (body: LoginBody) => {
            const request = await apiGuest.post<ResponseBody<LoginResponse>>("/auth/login", body);
            return request.data.data as LoginResponse;
        },
        onSuccess: (data: LoginResponse) => {
            queryClient.setQueryData(["user"], data.user);
            queryClient.setQueryData(["access-token"], data.access_token);
        }
    });

    return { login, isPending, loginDisabled: isPending && !isError };
}