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
  useSidebar,
} from "~/components/ui/sidebar"
import Logo from "~/components/logo";
import UserDropdown from "./UserDropdown";

export function DashboardSidebar() {
  const location = useLocation();
  const sidebar = useSidebar();
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className={styles.headerContent}>
          {(sidebar.open || sidebar.openMobile) && <Logo width={28} />}
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
            <UserDropdown dashboard="buyer"/>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}