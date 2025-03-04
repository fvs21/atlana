import { NavLink, useLocation } from "@remix-run/react"
import { Home, MessageSquare, ShoppingBag, CreditCard, User } from "lucide-react"
import styles from "./DashboardSidebar.module.scss"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"

export function DashboardSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className={styles.headerContent}>
          <ShoppingBag className={styles.headerIcon} />
          <h1 className={styles.headerTitle}>ShopDash</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard"}>
                  <NavLink to="/dashboard">
                    <Home className={styles.menuIcon} />
                    <span>Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/messages")}>
                  <NavLink to="/dashboard/messages">
                    <MessageSquare className={styles.menuIcon} />
                    <span>Messages</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/orders")}>
                  <NavLink to="/dashboard/orders">
                    <ShoppingBag className={styles.menuIcon} />
                    <span>Orders</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/transactions")}>
                  <NavLink to="/dashboard/transactions">
                    <CreditCard className={styles.menuIcon} />
                    <span>Transactions</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <User className={styles.userIcon} />
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>John Doe</span>
                  <span className={styles.userRole}>Admin</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}