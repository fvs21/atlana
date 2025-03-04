import { data } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
            
        </div>
    )
}

