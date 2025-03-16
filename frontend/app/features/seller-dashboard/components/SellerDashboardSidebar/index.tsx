import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar";
import styles from "./styles.module.scss";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { Box, CreditCard, Edit, ReceiptText, Store } from "lucide-react";
import UserDropdown from "~/features/dashboard/components/DashboardSidebar/UserDropdown";

export default function SellerDashboardSidebar() {
    const location = useLocation();
    const sidebar = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                {(sidebar.open || sidebar.openMobile) && (
                    <span className={styles.titleContainer}>
                        <h1 className={styles.title}>
                            Panel de vendedor
                        </h1>
                    </span>
                )}
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Navegación
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/seller"}>
                                    <NavLink to="/seller">
                                        <Store />
                                        <span>Principal</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname.includes("/seller/products")}>
                                    <NavLink to="/seller/products">
                                        <Box />
                                        <span>Productos</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname.includes("/seller/orders")}>
                                    <NavLink to="/seller/orders">
                                        <ReceiptText />
                                        <span>Ordenes</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname.includes("/seller/settings")}>
                                    <NavLink to="/seller/transactions">
                                        <CreditCard />
                                        <span>Transacciones</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink to="/store/setup">
                                        <Edit />
                                        <span>Configuración</span>
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
                        <UserDropdown dashboard="seller" />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}