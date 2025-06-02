import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";
import { Bookmark, MessageCircle } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { useSendMessage } from "~/features/chat/api";
import { toast } from "sonner";
import { useReplyToListing } from "~/features/chat/store";

type ListingActionsProps = {
    listing_id: number;
    creator_id: number;
    title: string;
    first_image: string;
}

export default function ListingActions({ listing_id, creator_id, title, first_image }: ListingActionsProps) {
    const { sendMessage, sendMessageDisabled } = useSendMessage();
    const navigate = useNavigate();

    const [, setReplyToListing] = useReplyToListing();

    const handleSendMessage = async () => {
        try {
            const res = await sendMessage(creator_id);
            setReplyToListing({
                id: listing_id,
                title,
                first_image,
            });
            navigate(`/direct/${res?.chat_id}`);
        } catch (error) {
            toast.error("Error inesperado. Inténtalo de nuevo más tarde.");
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