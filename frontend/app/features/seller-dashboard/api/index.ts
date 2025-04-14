import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UpdatePhoneNumber } from "../types"
import { api } from "~/api"
import { ResponseBody, User } from "~/types/globals";
import { Listing } from "~/types/listings";

type UpdatePhoneNumberResponse = {
    user: User;
}

export function useUpdatePhoneNumber() {
    const queryClient = useQueryClient();

    const { mutateAsync: update, isPending, isError } = useMutation({
        mutationFn: async (body: UpdatePhoneNumber) => {
            const request = await api.patch<ResponseBody<UpdatePhoneNumberResponse>>("/auth/phone/update", body);
            
            return request.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data?.user);
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

    const { mutateAsync: verify, isPending, isError } = useMutation({
        mutationFn: async (body: { code: string }) => {
            const request = await api.post<ResponseBody<UpdatePhoneNumberResponse>>("/auth/verify-phone", body);

            return request.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data?.user);
        }
    });

    return {
        verify,
        isPending,
        verifyDisabled: isPending && !isError
    }
}

export function useResendPhoneCode() {
    const { mutateAsync: resend, isPending, isError } = useMutation({
        mutationFn: async () => {
            const request = await api.post<ResponseBody<User>>("/auth/phone/code");
            return request.data;
        }
    });

    return {
        resend,
        isPending,
        resendDisabled: isPending && !isError
    }
}

export function useFetchCreatedListings() {
    const { data, isLoading } = useQuery({
        queryKey: ["created-listings"],
        queryFn: async () => {
            const request = await api.get<ResponseBody<Listing[]>>("/seller/listings");
            return request.data;
        }
    });

    return {
        data,
        isLoading
    }
}