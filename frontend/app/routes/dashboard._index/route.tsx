import { data } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import TransactionSummary from "~/features/dashboard/components/TransactionSummary"
import StatCard from "~/features/dashboard/components/StatCard"
import { getRecentOrders, getRecentTransactions } from "~/features/dashboard/utils"
import styles from "./styles.module.scss"
import OrderSummary from "~/features/dashboard/components/OrderSummary"
import { useUser } from "~/api/client.auth"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { toast } from "sonner"

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
  const { user, isLoading } = useUser();

  return (
    <div className={styles.dashboardHome}>
      <div className={styles.welcomeBanner}>
        <SidebarTrigger />
        <h1 className={styles.welcome}>Bienvenido, {user?.first_name}</h1>
      </div>
      <div className={styles.statsGrid}>
        <StatCard title="Total de ordenes" value={stats.totalOrders} trend="up" percentage="8.2%" />
        <StatCard title="Entregas pendientes" value={stats.pendingDeliveries} trend="down" percentage="3.1%" />
      </div>
      <div className={styles.summaryGrid}>
        <OrderSummary orders={recentOrders} />
        <TransactionSummary transactions={recentTransactions} />
      </div>
    </div>
  )
}


