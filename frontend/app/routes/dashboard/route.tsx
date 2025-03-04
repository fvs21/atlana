import { MetaFunction, Outlet } from "@remix-run/react"
import type { LinksFunction } from "@remix-run/node"
import { SidebarProvider } from "~/components/ui/sidebar"
import { DashboardSidebar } from "~/features/dashboard/components/DashboardSidebar"
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Mi panel"}
    ]
}

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className={styles.dashboardLayout}>
        <DashboardSidebar />
        <main className={styles.dashboardContent}>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}