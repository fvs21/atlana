import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { memo, useRef, useState } from "react";
import { Message as MessageType } from "../../types";
import { Link } from "@remix-run/react";
import { Reply } from "lucide-react";

type MessageProps = Omit<MessageType, "sender" | "timestamp"> & {
    own: boolean;
    display_seen?: boolean;
    reply: () => void;
}

function Message({ id, content, own, seen_at, reply_to_listing, reply, display_seen = false }: MessageProps) {
    const messageActionsRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.messageContainer}>
            <div
                className={cn(styles.messageWrapper, own ? "justify-start flex-row-reverse" : "justify-start")}
                onMouseEnter={() => {
                    if (messageActionsRef.current)
                        messageActionsRef.current.classList.remove("invisible");
                }}
                onMouseLeave={() => {
                    if (messageActionsRef.current)
                        messageActionsRef.current.classList.add("invisible");
                }}
            >
                <div className={cn(styles.message, own ? styles.yourMessage : styles.otherMessage)}>
                    {reply_to_listing && (
                        <MessageListingCard
                            id={reply_to_listing.id}
                            title={reply_to_listing.title}
                            image={reply_to_listing.first_image}
                            own={own}
                        />
                    )}
                    <div className={styles.content}>
                        {content}
                    </div>
                </div>
                <div className={cn(styles.messageActions, "invisible")} ref={messageActionsRef}>
                    <button className={styles.messageAction} onClick={reply}>
                        <Reply size={17} />
                    </button>
                </div>
            </div>
            {display_seen &&
                (
                    <span className={styles.seenAt}>
                        Leido: {dayjs(seen_at).format("hh:mm a")}
                    </span>
                )
            }
        </div>
    )
}

function MessageListingCard({ id, title, image, own }: { id: number; title: string; image: string, own: boolean }) {
    return (
        <Link className={cn(styles.replyToListing)} target="_blank" rel="noopener noreferrer" to={`/listing/${id}`}>
            <div className={cn(styles.replyToListingContent, own ? styles.yourListingMsg : styles.otherListingMsg)}>
                <img
                    className={styles.listingImage}
                    src={image}
                    alt={title}
                />
                <div className={styles.listingTitle}>
                    <span>{title}</span>
                </div>
            </div>
        </Link>
    )
}

export default memo(Message);