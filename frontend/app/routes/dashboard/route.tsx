import { MetaFunction, Outlet } from "@remix-run/react"
import { SidebarProvider } from "~/components/ui/sidebar"
import { DashboardSidebar } from "~/features/dashboard/components/DashboardSidebar"
import styles from "./styles.module.scss";
import { onlyAuthenticated } from "~/api/server.auth";

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Mi panel"}
    ]
}

export async function loader({ request }: { request: Request }) {
  onlyAuthenticated({request});

  return {};
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