import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody, User, UserInformation } from "~/types/globals";

export function useEditProfile() {
    const queryClient = useQueryClient();

    const { mutateAsync: editProfile, isPending, isError } = useMutation({
        mutationFn: async (data: UserInformation) => {
            const res = await api.put<ResponseBody<{ user: User }>>("/user/edit", data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data?.user);
        }   
    });

    return {
        editProfile,
        isPending,
        editProfileDisabled: isPending && !isError,
    };
}