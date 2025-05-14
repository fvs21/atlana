import { Link } from "@remix-run/react";
import { Chat } from "../../types";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

export default function ChatListItem({ chat }: { chat: Chat }) {
    return (
        <Link to={`/messages/${chat.id}`} className="w-full">
            <button className={styles.chatListItem}>
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