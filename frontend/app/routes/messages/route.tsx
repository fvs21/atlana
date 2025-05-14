import { MetaFunction } from "@remix-run/react";
import { useEffect } from "react";
import { useToken } from "~/api/client.auth";
import NavbarSmall from "~/components/navbar-small";
import { useUserChatsSocket } from "~/features/chat/store";
import styles from "./styles.module.scss";
import { useGetChats } from "~/features/chat/api";
import ChatListItem from "~/features/chat/components/ChatListItem";

export const meta: MetaFunction = () => (
    [
        { title: "Marketplace: Mensajes" }
    ]
)

export default function Page() {
    const [socket, setSocket] = useUserChatsSocket();
    const [token] = useToken();

    const { data, isLoading } = useGetChats();

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/chats/?token=" + token);
        setSocket(socket);

        socket.onopen = () => {
            console.log("WebSocket connection opened");
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
        }

        return () => {
            socket.close();
            setSocket(undefined);
        }
    }, [token]);


    return (
        <div className="flexColContainer">
            <NavbarSmall />
            {!isLoading && (
                <div className={styles.chatsContainer}>
                    <div className={styles.chatsList}>
                        <div className={styles.chatsListHeader}>
                            <h2 className={styles.chatsListTitle}>Mensajes</h2>
                        </div>
                        <div className={styles.chatListBody}>
                            {data?.data?.chats.map((chat) => (
                                <ChatListItem 
                                    chat={chat}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}