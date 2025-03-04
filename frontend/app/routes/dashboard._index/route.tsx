import { data } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import TransactionSummary from "~/features/dashboard/components/TransactionSummary"
import StatCard from "~/features/dashboard/components/StatCard"
import { getRecentOrders, getRecentTransactions } from "~/features/dashboard/utils"
import styles from "./styles.module.scss"
import OrderSummary from "~/features/dashboard/components/OrderSummary"

export async function loader() {
  const recentOrders = await getRecentOrders(5)
  const recentTransactions = await getRecentTransactions(5)

  return data({
    recentOrders,
    recentTransactions,
    stats: {
      totalSpent: "$1,245.50",
      totalOrders: "12",
      pendingDeliveries: "3",
      savedItems: "8",
    },
  })
}

export default function Dashboard() {
  const { recentOrders, recentTransactions, stats } = useLoaderData<typeof loader>()

  return (
    <div className={styles.dashboardHome}>
      <h1>My Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatCard title="Total Spent" value={stats.totalSpent} trend="up" percentage="5.2%" />
        <StatCard title="Orders Placed" value={stats.totalOrders} trend="up" percentage="8.2%" />
        <StatCard title="Pending Deliveries" value={stats.pendingDeliveries} trend="down" percentage="3.1%" />
        <StatCard title="Saved Items" value={stats.savedItems} trend="up" percentage="12.4%" />
      </div>

      <div className={styles.summaryGrid}>
        <OrderSummary orders={recentOrders} />
        <TransactionSummary transactions={recentTransactions} />
      </div>
    </div>
  )
}


