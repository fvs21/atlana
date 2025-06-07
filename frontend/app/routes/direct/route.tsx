import { MetaFunction, Outlet, useParams } from "@remix-run/react";
import { useEffect } from "react";
import { useToken, useUser } from "~/api/client.auth";
import NavbarSmall from "~/components/navbar-small";
import { useChatMutations, useUserChatsSocket } from "~/features/chat/store";
import styles from "./styles.module.scss";
import { useGetChats } from "~/features/chat/api";
import ChatListItem from "~/features/chat/components/ChatListItem";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import { cn } from "~/lib/utils";
import { WS_URL } from "~/api";
import { Message } from "~/features/chat/types";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });
    return {};
}

export const meta: MetaFunction = () => (
    [
        { title: "Atlana: Mensajes" }
    ]
)

export default function Page() {
    const [socket, setSocket] = useUserChatsSocket();
    const [token] = useToken();

    const { data, isLoading } = useGetChats();
    const { chatNotification } = useChatMutations(); 

    const { chat_id } = useParams();
    const { user } = useUser();

    useEffect(() => {
        const socket = new WebSocket(`${WS_URL}/chats/?token=${token}`);
        setSocket(socket);

        return () => {
            socket.close();
            setSocket(undefined);
        }
    }, [token]);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === "chat_message") {
                const message = data.data as Message;
                chatNotification(message, user?.id!, !!chat_id && Number(chat_id) === message.chat_id);
            }
        }

    }, [chat_id, socket, user?.id]);


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