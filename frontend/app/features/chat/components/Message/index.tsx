import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { memo } from "react";

type MessageProps = {
    content: string;
    own: boolean;
    seen_at: string;
    display_seen?: boolean;
}

function Message({ content, own, seen_at, display_seen = false }: MessageProps) {
    return (
        <div className={cn(styles.messageContainer, own ? "items-end" : "items-start")}>
            <div className={cn(styles.message, own ? styles.yourMessage : styles.otherMessage)}>
                <div>{content}</div>
            </div>
            {display_seen &&
                (
                    <div className={styles.seenAt}>
                        Leido: {dayjs(seen_at).format("hh:mm a")}
                    </div>
                )
            }
        </div>
    )
}

export default memo(Message);