import styles from "./styles.module.scss";

type ChatHeaderProps = {
    chat_name: string;
    chat_picture: string;
    chat_id: number;
    receiver_id: number;
}

export default function ChatHeader({ chat_name, chat_picture, chat_id, receiver_id }: ChatHeaderProps) {
    return (
        <div className={styles.header}>
            <img 
                className={styles.chatPicture}
                src={chat_picture}
                alt={chat_name}
            />
            <div className={styles.chatName}>
                {chat_name}
            </div>
        </div>
    )
}