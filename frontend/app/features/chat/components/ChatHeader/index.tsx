import { Link } from "@remix-run/react";
import styles from "./styles.module.scss";
import { ChevronLeft } from "lucide-react";

type ChatHeaderProps = {
    chat_name: string;
    chat_picture: string;
    chat_id: number;
    receiver_id: number;
}

export default function ChatHeader({ chat_name, chat_picture, chat_id, receiver_id }: ChatHeaderProps) {
    return (
        <div className={styles.header}>
            <Link className={styles.backButton} to={`/direct`}>
                <ChevronLeft size={20}/>
            </Link>
            <img 
                className={styles.chatPicture}
                src={chat_picture}
                alt={chat_name}
            />
            <Link className={styles.chatName} to={`/profile/${receiver_id}`}>
                {chat_name}
            </Link>
        </div>
    )
}