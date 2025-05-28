import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";
import { Bookmark, MessageCircle } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { useSendMessage } from "~/features/chat/api";

type ListingActionsProps = {
    listing_id: number;
    creator_id: number;
}

export default function ListingActions({ listing_id, creator_id }: ListingActionsProps) {
    const { sendMessage, sendMessageDisabled } = useSendMessage();
    const navigate = useNavigate();

    const handleSendMessage = async () => {
        try {
            const res = await sendMessage(creator_id);
            navigate(`/direct/${res?.chat_id}`);
        } catch (error) {

        }
    }
    return (
        <div className={styles.actionsContainer}>
            <Button size="default2" className="primaryButton" onClick={handleSendMessage} disabled={sendMessageDisabled}>
                <MessageCircle />
                Enviar mensaje
            </Button>
        </div>
    )
}