import { SendHorizonal, X } from "lucide-react";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { useReplyToListing } from "../../store";
import { cn } from "~/lib/utils";
import { ChatInputMessage } from "../../types";
import { useEffect, useRef } from "react";

type ChatInputProps = {
    message: ChatInputMessage;
    setMessage: (message: ChatInputMessage) => void;
    sendMessage: () => void;
}

export default function ChatInput({ message, setMessage, sendMessage }: ChatInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const isReplying = !!message.reply_to_listing || !!message.reply_to;

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, [message.reply_to, message.reply_to_listing]);

    return (
        <div className={styles.inputContainer}>
            <form className={cn(styles.inputWrapper, isReplying ? styles.replyInputWrapper : "")} onSubmit={(e) => e.preventDefault()}>
                {message.reply_to_listing && (
                    <MessageReply removeReply={() => setMessage({
                        ...message,
                        reply_to_listing: undefined
                    })}>
                        <div className={styles.replyToListing}>
                            <div className={styles.listingTitle}>
                                {message.reply_to_listing.title}
                            </div>
                            <div className={styles.listingImageContainer}>
                                <img
                                    src={message.reply_to_listing.first_image}
                                    alt={message.reply_to_listing.title}
                                    className={styles.image}
                                />
                            </div>
                        </div>
                    </MessageReply>
                )}
                {message.reply_to && (
                    <MessageReply removeReply={() => setMessage({
                        ...message,
                        reply_to: undefined
                    })}>
                        <div className={styles.replyToMessage}>
                            {message.reply_to.content}
                        </div>
                    </MessageReply>
                )}
                <div className={styles.messageInput}>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={message.content}
                        onChange={(e) => setMessage({
                            ...message,
                            content: e.target.value
                        })}
                        autoFocus
                        spellCheck="true"

                    />
                    {!!message.content.trimEnd().length && (
                        <Button className={styles.sendButton} onClick={sendMessage}>
                            <SendHorizonal size={22} />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

function MessageReply({ children, removeReply }: { children: React.ReactNode, removeReply: () => void }) {
    return (
        <div className={styles.replyTo}>
            <div className={styles.replyToContent}>
                {children}
                <div className={styles.removeReply}>
                    <button
                        className={styles.removeReplyButton}
                        onClick={removeReply}
                        type="button"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}