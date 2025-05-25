import { useMutation } from "@tanstack/react-query";
import { apiGuest } from "~/api";
import { ResponseBody } from "~/types/globals";
import { ResetPasswordBody } from "../types";

export function useForgotPassword() {
    const { mutateAsync: forgotPassword, isPending, isError } = useMutation({
        mutationFn: async (email: string) => {
            const res = await apiGuest.post<ResponseBody<null>>("/auth/forgot-password", {
                email
            });
        }
    });

    return {
        forgotPassword,
        isPending,
        forgotPasswordDisabled: isPending && !isError,
    };
}

export function useResetPassword() {
    const { mutateAsync: resetPassword, isPending, isError } = useMutation({
        mutationFn: async (data: ResetPasswordBody) => {
            const res = await apiGuest.post<ResponseBody<null>>("/auth/reset-password", data);
            return res.data.data;
        }
    });

    return {
        resetPassword,
        isPending,
        resetPasswordDisabled: isPending && !isError,
    };
}