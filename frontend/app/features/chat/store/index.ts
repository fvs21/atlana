import { useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { ChatListItem, GetChatResponse, Message, ReplyToListing } from "../types";

const userChatsSocket = atom<WebSocket>();
const chatSocket = atom<WebSocket>();

const replyToListing = atom<ReplyToListing | null>(null);

const useReplyToListing = () => {
    return useAtom(replyToListing);
}

const useUserChatsSocket = () => {
    return useAtom(userChatsSocket);
}

const useChatMutations = () => {
    const queryClient = useQueryClient();

    const chatNotification = (data: Message, user_id: number, userInChat: boolean) => {
        const chat = queryClient.getQueryData(["chat", data.chat_id]) as GetChatResponse;

        if (!!chat) {
            queryClient.setQueryData(["chat", data.chat_id], {
                ...chat,
                messages: [data, ...chat.messages]
            });
        }
        
        queryClient.setQueryData(["chats"], (oldData: { chats: ChatListItem[] }) => {
            const chatIndex = oldData.chats.findIndex((chat: any) => chat.id === data.chat_id);

            if (chatIndex === -1) {
                return {
                    ...oldData,
                    chats: [
                        {
                            id: data.chat_id,
                            participants: [!!chat ? chat.chat.participants[0] : data.sender],
                            last_message: {
                                id: data.id,
                                sender: data.sender.id,
                                content: data.content,
                                timestamp: data.timestamp,
                            },
                            unread_messages: !userInChat && data.sender.id !== user_id ? 1 : 0
                        },
                        ...oldData.chats
                    ]
                }
            }

            const oldChat = oldData.chats[chatIndex];

            return {
                ...oldData,
                chats: [
                    {
                        ...oldChat,
                        last_message: {
                            ...oldChat.last_message,
                            id: data.id,
                            content: data.content,
                            timestamp: data.timestamp,
                        },
                        unread_messages: !userInChat && data.sender.id !== user_id ? oldChat.unread_messages + 1 : oldChat.unread_messages
                    },
                    ...oldData.chats.filter((_: any, index: number) => index !== chatIndex)
                ]
            }
        });
    }   

    const chatRead = (chat_id: number) => {
        const chat = queryClient.getQueryData(["chat", chat_id]) as GetChatResponse;

        queryClient.setQueryData(["chat", chat_id], {
            ...chat,
            messages: chat.messages.map((message) => {
                if (message.sender.id !== chat.chat.participants[0].id) {
                    return {
                        ...message,
                        seen_at: (new Date()).toUTCString()
                    };
                }
                return message;
            })
        });
    }

    const cleanUnreadMessages = (chat_id: number) => {
        queryClient.setQueryData(["chats"], (oldData: { chats: ChatListItem[] }) => {
            const chats = [...oldData.chats];

            const chatIndex = chats.findIndex((chat: any) => chat.id === chat_id);

            chats[chatIndex] = {
                ...chats[chatIndex],
                unread_messages: 0
            }

            return {chats};
        });
    }

    return {
        chatNotification,
        chatRead,
        cleanUnreadMessages
    };
}

export {
    useUserChatsSocket,
    userChatsSocket,
    chatSocket,
    useChatMutations,
    replyToListing,
    useReplyToListing
}
