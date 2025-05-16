import { ResponseBody, User } from "~/types/globals";
import { apiGuest, api } from "."
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const refreshToken = async (): Promise<string | null> => {
    try {
        const request = await apiGuest.get<ResponseBody<{ access_token: string }>>("/auth/refresh");
        return request.data.data?.access_token as string;
    } catch {
        return null;
    }
}

export const useToken = (): [ string, (token: string | null) => void ] => {
    const queryClient = useQueryClient();

    const token = queryClient.getQueryData<string>(["access-token"]) || "";

    const setToken = (token: string | null) => {
        queryClient.setQueryData(["access-token"], token);
    }

    return [
        token,
        setToken
    ]
}

export const useUser = () => {
    const { data: user, isLoading, isError } = useQuery({
        queryFn: async () => {
            const request = await api.get<ResponseBody<{ user: User }>>("/auth/session");
            
            return request.data.data?.user;
        },
        queryKey: ['user'],
        retry: false
    });

    return {
        user,
        isLoading,
        isError
    }
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: logout, isPending } = useMutation({
        mutationFn: async () => {
            await api.post<ResponseBody<null>>("/auth/logout");
        },
        onSuccess: () => {
            queryClient.removeQueries();
        }
    });

    return {
        logout,
        isPending
    }
}