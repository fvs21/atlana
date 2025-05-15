import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

type MessageProps = {
    content: string;
    own: boolean;
    timestamp: string;
}

export default function Message({ content, own, timestamp }: MessageProps) {
    return (
        <div className={cn(styles.messageContainer, own ? "justify-end" : "justify-start")}>
            <div className={cn(styles.message, own ? styles.yourMessage : styles.otherMessage)}>
               <div>{content}</div>
               {/**
                * <div className={styles.timestamp}>
                    {dayjs(timestamp).format("hh:mm a")}
                </div>
                */}
            </div>
        </div>
    )
}