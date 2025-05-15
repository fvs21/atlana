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
    timestamp: string;
}

export type Chat = {
    id: number;
    participants: ChatParticipant[];
}

export type GetChatResponse = {
    chat: Chat;
    messages: Message[];
}