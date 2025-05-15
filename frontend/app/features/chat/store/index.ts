import { useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { Message } from "../types";

const userChatsSocket = atom<WebSocket>();
const chatSocket = atom<WebSocket>();

const useUserChatsSocket = () => {
    return useAtom(userChatsSocket);
}

const useChatMutations = (chat_id: number) => {
    const queryClient = useQueryClient();

    const newMessage = (message: Message) => {
        queryClient.setQueryData(["chat", chat_id], (oldData: any) => {
            return {
                ...oldData,
                messages: [message, ...oldData.messages]
            }
        });
    }

    return {
        newMessage
    };
}

export {
    useUserChatsSocket,
    userChatsSocket,
    chatSocket,
    useChatMutations,
}
