import { data } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import styles from "./styles.module.scss"
import { getAllOrders } from "~/features/dashboard/utils"


export async function loader() {
    const orders = await getAllOrders();
    return data({ orders });
}

export default function Orders() {
    const { orders } = useLoaderData<typeof loader>();

    return (
        <div className={styles.ordersPanel}>
            <h1>Purchase History</h1>
            
        </div>
    )
}

