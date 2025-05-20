import { useMutation } from "@tanstack/react-query";
import { apiGuest } from "~/api";
import { ResponseBody } from "~/types/globals";

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