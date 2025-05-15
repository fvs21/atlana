import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import { Link, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSendMessage } from "~/features/marketplace/api";

export default function Header({ user_id, pfp_url, name, bio }: { user_id: number, pfp_url: string; name: string, bio?: string }) {
    const { user, isLoading } = useUser();
    
    const { sendMessage, sendMessageDisabled } = useSendMessage();
    const navigate = useNavigate();

    const handleSendMessage = async () => {
        try {
            const res = await sendMessage(user_id);
            if (res) {
                navigate(`/direct/${res?.chat_id}`);
            }
        } catch(error) {
            console.error("Error sending message:", error);
        }
    }
    
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.pfp}>
                    <img src={pfp_url} alt="Profile" />
                </div>
                <div className="w-full">
                    <div className={styles.fullNameContainer}>
                        <h1 className={styles.fullName}>{name}</h1>
                        {!isLoading && (
                            user_id == user?.id && (
                                <Link to={"/settings/edit"}>
                                    <button className={styles.actionButton}>
                                        Editar perfil
                                    </button>
                                </Link>
                            )
                        )}
                    </div>
                    <div className={styles.bio}>
                        {bio}
                    </div>
                    {!isLoading && (
                        user_id != user?.id && (
                            <Button className={cn(styles.sendMessageButton)} onClick={handleSendMessage} disabled={sendMessageDisabled}>
                                Enviar Mensaje
                            </Button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}