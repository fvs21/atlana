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

export type ReplyToListing = {
    id: number;
    title: string;
    first_image: string;
}

export type ReplyToMessage = {
    id: number;
    content: string;
}

export type Message = {
    id: number;
    sender: number;
    content: string;
    seen_at: string;
    timestamp: string;
    reply_to_listing?: ReplyToListing;
    reply_to?: ReplyToMessage;
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

export type ChatInputMessage = {
    content: string;
    reply_to?: ReplyToMessage;
    reply_to_listing?: ReplyToListing;
}