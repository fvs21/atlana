export type ChatParticipant = {
    id: number;
    full_name: string;
    profile_picture_url: string;
}

export type ChatListItem = {
    id: number;
    participants: ChatParticipant[];
    last_message: Message;
};

export type Message = {
    id: number;
    sender: number;
    content: string;
    seen_at: string;
}

export type Chat = {
    id: number;
    participants: ChatParticipant[];
}

export type GetChatResponse = {
    chat: Chat;
    messages: Message[];
}

export type ChatNotification = {
    id: number;
    sender: ChatParticipant;
    content: string;
    timestamp: string;
    chat_id: number;
}

export type ChatSeenEvent = {
    user: number;
}

export type ChatEvent = {
    type: "chat_notification" | "chat_message" | "chat_read";
    data: ChatNotification | Message | ChatSeenEvent;
}