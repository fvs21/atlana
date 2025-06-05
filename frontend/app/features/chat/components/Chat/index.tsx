import { SyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ChatInput from "../ChatInput";
import { ChatEvent, ChatInputMessage, ChatSeenEvent, Message as MessageType } from "../../types";
import Message from "../Message";
import { useChatMutations, useReplyToListing } from "../../store";
import { useParams } from "@remix-run/react";
import { useToken, useUser } from "~/api/client.auth";
import { ChevronDown } from "lucide-react";
import { WS_URL } from "~/api";

export default function Chat({ messages }: { messages: MessageType[] }) {
    const { chat_id } = useParams();
    const { user } = useUser();

    const [replyToListing, setReplyToListing] = useReplyToListing();
    const [message, setMessage] = useState<ChatInputMessage>({
        content: "",
        reply_to_listing: replyToListing || undefined
    });

    const { chatRead, cleanUnreadMessages } = useChatMutations();
    const socket = useRef<WebSocket>();
    const [token] = useToken();

    const chatRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState<number>(0);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: 1,
                behavior: "smooth"
            });
        }
    }

    const handleScroll = (e: SyntheticEvent) => {
        const target = e.target as HTMLDivElement;
        setScrollTop(target.scrollTop);
    }

    const lastReadMessageIndex = messages.findIndex((message) => {
        return message.seen_at && message.sender.id === user?.id;
    }
    );

    const sendMessage = (message: ChatInputMessage) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            if (message.reply_to_listing) {
                socket.current.send(JSON.stringify({
                    type: "send_message",
                    data: {
                        content: message.content,
                        reply_to_listing: message.reply_to_listing.id
                    }
                }));
                setReplyToListing(null);
            } else if (message.reply_to) {
                socket.current.send(JSON.stringify({
                    type: "send_message",
                    data: {
                        content: message.content,
                        reply_to: message.reply_to.id
                    }
                }));
            }
            else {
                socket.current.send(JSON.stringify({
                    type: "send_message",
                    data: {
                        content: message.content
                    }
                }));
            }
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
        socket.current = new WebSocket(`${WS_URL}/chat/${chat_id}/?token=${token}`);

        socket.current.onopen = () => {
            if (messages.some((message) => !message.seen_at && message.sender.id !== user?.id))
                readChat();
        }

        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data) as ChatEvent;

            switch (data.type) {
                case "chat_message":
                    readChat();
                    break;
                case "chat_read":
                    if ((data.data as ChatSeenEvent).user !== user?.id) chatRead(Number(chat_id));
                    else cleanUnreadMessages(Number(chat_id));

                    break;
            }
        }

        return () => {
            if (socket.current)
                socket.current.close();

            setReplyToListing(null);
        }
    }, [chat_id]);

    useEffect(() => {
        if(messages[0]?.sender.id === user?.id) {
            scrollToBottom();
            return;
        }

        if(chatRef.current && chatRef.current?.scrollTop > -60)
            scrollToBottom();

    }, [messages, user?.id]);

    return (
        <div className={styles.chat}>
            <div className={styles.chatBody} ref={chatRef} onScroll={handleScroll}>
                {messages.map((message, i) => {
                    return (
                        <Message
                            key={message.id}
                            id={message.id}
                            content={message.content}
                            own={message.sender.id === user?.id}
                            seen_at={message.seen_at}
                            display_seen={i === lastReadMessageIndex}
                            reply_to_listing={message.reply_to_listing}
                            reply_to={message.reply_to}
                            add_reply={() => {
                                setMessage((prev) => ({
                                    ...prev,
                                    reply_to: {
                                        id: message.id,
                                        content: message.content,
                                    },
                                    reply_to_listing: undefined
                                }));
                            }}
                        />
                    )
                })}
                {scrollTop < 0 && (
                    <button className={styles.scrollToBottom} onClick={() => {
                        if (chatRef.current) {
                            chatRef.current.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }
                    }}>
                        <ChevronDown />
                    </button>
                )}
            </div>
            <ChatInput
                message={message}
                setMessage={setMessage}
                sendMessage={() => {
                    sendMessage(message);
                    setMessage({
                        content: "",
                        reply_to: undefined
                    });
                }}
            />
        </div>
    )
}