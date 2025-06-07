import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Chat, ChatListItem, GetChatResponse, Message } from "../types";

export function useSendMessage() {
    const { mutateAsync: sendMessage, isPending, isError } = useMutation({
        mutationFn: async (receiver_id: number) => {
            const res = await api.post<ResponseBody<{chat_id: number}>>("/chat/create", {
                receiver_id
            });

            return res.data.data;
        }
    });

    return {
        sendMessage,
        isPending,
        sendMessageDisabled: isPending && !isError,
    }
}

export function useGetChats() {
    const { data, isLoading } = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ chats: ChatListItem[] }>>("/chat/all");
            return res.data.data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: "always"
    });

    return { 
        data,
        isLoading
    };
}


export function useGetChat(chat_id: number) {
    const queryClient = useQueryClient();
    
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["chat", chat_id],
        queryFn: async () => {
            const res = await api.get<ResponseBody<GetChatResponse>>(`/chat/${chat_id}`);
            return res.data.data;
        },
        refetchOnWindowFocus: false,
        placeholderData: () => {
            const chats = queryClient.getQueryData<{ chats: ChatListItem[] }>(["chats"]);
            const chat = chats?.chats.find(chat => chat.id === chat_id);

            if (chat) {
                return {
                    chat: {
                        id: chat.id,
                        participants: chat.participants,
                    },
                    messages: []
                } as GetChatResponse;
            }

        }
    });

    return { 
        data,
        isLoading,
        isError,
        isFetching,
    };
}