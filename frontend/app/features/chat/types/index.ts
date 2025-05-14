export type ChatParticipant = {
    id: number;
    full_name: string;
    profile_picture_url: string;
}

export type Chat = {
    id: number;
    participants: ChatParticipant[];
    created_at: string;
    last_message: {
        id: number;
        sender: "you" | "other";
        content: string;
        timestamp: string;
    }
};

export type Message = {
    id: number;
    chat: number;
    sender: ChatParticipant;
    content: string;
    timestamp: string;
}