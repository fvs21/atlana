import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiMultiPart } from "~/api";
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

export const useUpdateProfilePicture = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: updatePfp, isPending, isError } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);

            const res = await apiMultiPart.patch<ResponseBody<{ user: User }>>("/user/pfp/update", formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data?.user);
        },
    });

    return {
        updatePfp,
        isPending,
        updatePfpDisabled: isPending && !isError,
    }
}

export const useDeleteProfilePicture = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: deletePfp, isPending, isError } = useMutation({
        mutationFn: async () => {
            const res = await api.delete<ResponseBody<{ user: User }>>("/user/pfp");
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.data?.user);
        },
    });

    return {
        deletePfp,
        isPending,
        deletePfpDisabled: isPending && !isError,
    }
}