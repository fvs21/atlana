import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ChatInput from "../ChatInput";
import { ChatEvent, ChatSeenEvent, Message as MessageType } from "../../types";
import Message from "../Message";
import { useChatMutations } from "../../store";
import { useParams } from "@remix-run/react";
import { useToken, useUser } from "~/api/client.auth";

export default function Chat({ messages }: { messages: MessageType[] }) {
    const { chat_id } = useParams();
    const { user } = useUser();

    const [message, setMessage] = useState<string>("");

    const { newMessage, chatRead } = useChatMutations(Number(chat_id));
    const socket = useRef<WebSocket>();
    const [token] = useToken();

    const lastReadMessageIndex = messages.findIndex((message) => {
            return message.seen_at && message.sender === user?.id;
        }
    );

    const sendMessage = (message: string) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                type: "send_message",
                message: message
            }));
        }
    }

    const readChat = () => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                type: "read_chat"
            }));
        }
    }

    useEffect(() => {
        socket.current = new WebSocket(`ws://localhost:8000/api/ws/chat/${chat_id}/?token=${token}`);

        socket.current.onopen = () => {
            if(messages.some((message) => message.seen_at && message.sender !== user?.id)) 
                readChat();
        }

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data) as ChatEvent;

            switch (data.type) {
                case "chat_message":
                    newMessage(data.data as MessageType);
                    readChat();
                    return;
                case "chat_read":
                    if ((data.data as ChatSeenEvent).user !== user?.id)
                        chatRead();

                    return;
            }
        }

        return () => {
            socket.current?.close();
        }
    }, []);

    return (
        <div className={styles.chat}>
            <div className={styles.chatBody}>
                {messages.map((message, i) => {
                    const ownMessage = message.sender === user?.id;

                    if (i === lastReadMessageIndex) {
                        return (
                            <Message
                                key={message.id}
                                content={message.content}
                                own={ownMessage}
                                seen_at={message.seen_at}
                                display_seen={true}
                            />
                        )
                    }

                    return (
                        <Message
                            key={message.id}
                            content={message.content}
                            own={message.sender === user?.id}
                            seen_at={message.seen_at}
                        />
                    )
                })}
            </div>
            <ChatInput
                message={message}
                setMessage={setMessage}
                sendMessage={() => { sendMessage(message); setMessage("") }}
            />
        </div>
    )
}