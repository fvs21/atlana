import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ChatInput from "../ChatInput";
import { ChatEvent, Message as MessageType } from "../../types";
import Message from "../Message";
import { useChatMutations } from "../../store";
import { useParams } from "@remix-run/react";
import { useToken, useUser } from "~/api/client.auth";

export default function Chat({ messages }: { messages: MessageType[] }) {
    const { chat_id } = useParams();
    const { user } = useUser();

    const [message, setMessage] = useState<string>("");
    
    const { newMessage } = useChatMutations(Number(chat_id));
    const socket = useRef<WebSocket>();
    const [token] = useToken();

    const sendMessage = (message: string) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                message: message
            }));
        }
    }

    useEffect(() => {
        socket.current = new WebSocket(`ws://atlana-lb-501671792.us-east-2.elb.amazonaws.com/api/ws/chat/${chat_id}/?token=${token}`);

        socket.current.onopen = () => {
            console.log("Connected to chat");
        }

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data) as ChatEvent;    

            newMessage(data.data as MessageType);
        }

        return () => {
            socket.current?.close();
        }
    }, []);

    return (
        <div className={styles.chat}>
            <div className={styles.chatBody}>
                {messages.map((message) => (
                    <Message 
                        key={message.id}
                        content={message.content}
                        own={message.sender === user?.id}
                        timestamp={message.timestamp}
                    />
                ))}
            </div>
            <ChatInput
                message={message}
                setMessage={setMessage}
                sendMessage={() => {sendMessage(message); setMessage("")}}
            />
        </div>
    )
}