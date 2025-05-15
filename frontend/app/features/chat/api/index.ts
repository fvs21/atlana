import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Chat, ChatListItem, GetChatResponse, Message } from "../types";

export function useGetChats() {
    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ chats: ChatListItem[] }>>("/chat/all");
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });

    return { 
        data,
        isLoading
    };
}


export function useGetChat(chat_id: number) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["chat", chat_id],
        queryFn: async () => {
            const res = await api.get<ResponseBody<GetChatResponse>>(`/chat/${chat_id}`);
            return res.data.data;
        },
        refetchOnWindowFocus: false,
    });

    return { 
        data,
        isLoading,
        isError
    };
}