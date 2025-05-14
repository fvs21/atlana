import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Chat } from "../types";

export function useGetChats() {
    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ chats: Chat[] }>>("/chat/all");
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    return { 
        data,
        isLoading
     }
}