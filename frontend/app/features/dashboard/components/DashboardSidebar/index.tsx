import { NavLink, useLocation } from "@remix-run/react"
import { Home, MessageSquare, ShoppingBag, CreditCard } from "lucide-react"
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
import Logo from "~/components/logo";
import UserDropdown from "./UserDropdown";

export function DashboardSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className={styles.headerContent}>
          <Logo width={20} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard"}>
                  <NavLink to="/dashboard">
                    <Home className={styles.menuIcon} />
                    <span>Principal</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/messages")}>
                  <NavLink to="/dashboard/messages">
                    <MessageSquare className={styles.menuIcon} />
                    <span>Mensajes</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/orders")}>
                  <NavLink to="/dashboard/orders">
                    <ShoppingBag className={styles.menuIcon} />
                    <span>Ordenes</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/transactions")}>
                  <NavLink to="/dashboard/transactions">
                    <CreditCard className={styles.menuIcon} />
                    <span>Transacciones</span>
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
            <UserDropdown />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}