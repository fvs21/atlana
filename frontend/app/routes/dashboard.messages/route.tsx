import { data } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MessageList from "~/features/dashboard/components/MessageList";
import { getAllMessages } from "~/features/dashboard/utils";
import styles from "./styles.module.scss"

export async function loader() {
    const messages = await getAllMessages()
    return data({ messages })
}

export default function Messages() {
    const { messages } = useLoaderData<typeof loader>()

    return (
        <div className={styles.messagesPanel}>
            <h1>Messages</h1>
            <MessageList messages={messages} />
        </div>
    )
}

