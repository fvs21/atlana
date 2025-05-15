import { useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { ChatListItem, ChatNotification, Message } from "../types";

const userChatsSocket = atom<WebSocket>();
const chatSocket = atom<WebSocket>();

const useUserChatsSocket = () => {
    return useAtom(userChatsSocket);
}

const useUserChatsMutations = () => {
    const queryClient = useQueryClient();

    const chatNotification = (data: ChatNotification) => {
        queryClient.setQueryData(["chats"], (oldData: {chats: ChatListItem[]}) => {
            const chatIndex = oldData.chats.findIndex((chat: any) => chat.id === data.chat_id);

            if (chatIndex === -1) {
                return {
                    ...oldData,
                    chats: [
                        {
                            id: data.chat_id,
                            participants: [data.sender],
                            last_message: {
                                id: data.id,
                                sender: data.sender.id,
                                content: data.content,
                                timestamp: data.timestamp,
                            }
                        },
                        ...oldData.chats
                    ]
                }
            }

            const chat = oldData.chats[chatIndex];

            return {
                ...oldData,
                chats: [
                    {
                        ...chat,
                        last_message: {
                            ...chat.last_message,
                            id: data.id,
                            content: data.content,
                            timestamp: data.timestamp,
                        }
                    },
                    ...oldData.chats.filter((_: any, index: number) => index !== chatIndex)
                ]
            }
        });
    }

    return {
        chatNotification
    };
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

        queryClient.setQueryData(["chats"], (oldData: {chats: ChatListItem[]}) => {
            const chatIndex = oldData.chats.findIndex((chat: any) => chat.id === chat_id);
            const chat = oldData.chats[chatIndex];

            return {
                ...oldData,
                chats: [
                    {
                        ...chat,
                        last_message: message
                    },
                    ...oldData.chats.filter((_: any, index: number) => index !== chatIndex)
                ]
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
    useUserChatsMutations
}
