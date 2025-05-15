import { SendHorizonal } from "lucide-react";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";

type ChatInputProps = {
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
}

export default function ChatInput({ message, setMessage, sendMessage }: ChatInputProps) {
    return (
        <div className={styles.inputContainer}>
            <form className={styles.inputWrapper} onSubmit={(e) => e.preventDefault()}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {!!message.length && (
                    <Button className={styles.sendButton} onClick={sendMessage}>
                        <SendHorizonal size={22} />
                    </Button>
                )}
            </form>
        </div>
    )

}