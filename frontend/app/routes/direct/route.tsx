import { MetaFunction, Outlet, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useToken } from "~/api/client.auth";
import NavbarSmall from "~/components/navbar-small";
import { useUserChatsMutations, useUserChatsSocket } from "~/features/chat/store";
import styles from "./styles.module.scss";
import { useGetChats } from "~/features/chat/api";
import ChatListItem from "~/features/chat/components/ChatListItem";
import { ChatNotification } from "~/features/chat/types";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import { cn } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });
    return null;
}

export const meta: MetaFunction = () => (
    [
        { title: "Atlana: Mensajes" }
    ]
)

export default function Page() {
    const [, setSocket] = useUserChatsSocket();
    const [token] = useToken();

    const { data, isLoading } = useGetChats();
    const { chatNotification } = useUserChatsMutations(); 

    const { chat_id } = useParams();

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/api/ws/chats/?token=" + token);
        setSocket(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === "chat_notification") {
                chatNotification(data.data as ChatNotification);
            }
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
                    <div className={cn(styles.chatsList, chat_id ? styles.hide : styles.show)}>
                        <div className={styles.chatsListHeader}>
                            <h2 className={styles.chatsListTitle}>Mensajes</h2>
                        </div>
                        <div className={styles.chatListBody}>
                            {data?.chats.map((chat) => (
                                <ChatListItem 
                                    key={chat.id}
                                    chat={chat}
                                />
                            ))}
                        </div>
                    </div>
                    <Outlet />
                </div>
            )}
        </div>
    )
}