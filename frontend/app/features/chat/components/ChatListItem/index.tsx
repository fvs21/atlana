import { Link, useParams } from "@remix-run/react";
import { ChatListItem as ChatListItemType } from "../../types";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { cn } from "~/lib/utils";

export default function ChatListItem({ chat }: { chat: ChatListItemType }) {
    const params = useParams();

    const currentChat = params?.chat_id || "";    
    
    return (
        <Link to={`/direct/${chat.id}`} className="w-full">
            <button className={cn(styles.chatListItem, Number(currentChat) === chat.id ? styles.active : "")}>
                <div className={styles.profilePictureContainer}>
                    <img 
                        src={chat.participants[0].profile_picture_url}
                        alt={chat.participants[0].full_name}
                        className={styles.profilePicture}
                    />
                </div>
                <div className={styles.chatListItemContent}>
                    <div className={styles.chatListName}>
                        {chat.participants[0].full_name}
                    </div>
                    <div className={styles.chatListLastMessageContainer}>
                        <span className={styles.message}>
                            {chat.last_message.content}
                        </span>
                        <span className={styles.message}>
                            {dayjs(chat.last_message.timestamp).format("HH:mm")}
                        </span>
                    </div>
                </div>
            </button>
        </Link>
    )
}