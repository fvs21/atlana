import { useMutation } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";

export function useVerifyEmail() {
    const { mutateAsync: verifyEmail, isPending, isError } = useMutation({
        mutationFn: async (code: string) => {
            const res = await api.post<ResponseBody<void>>("/auth/verify-email", {
                code
            });
            return res.data.data;
        }
    });

    return {
        verifyEmail,
        isPending,
        verifyEmailDisabled: isPending && !isError,
    };
}

export function useResendVerificationEmail() {
    const { mutateAsync: resendCode, isPending, isError } = useMutation({
        mutationFn: async () => {
            const res = await api.post<ResponseBody<void>>("/auth/verify-email/resend");
            return res.data.data;
        }
    });

    return {
        resendCode,
        isPending,
        resendCodeDisabled: isPending && !isError
    };
}