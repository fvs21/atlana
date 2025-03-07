import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { DashboardSidebar } from "~/features/dashboard/components/DashboardSidebar";
import SellerDashboardSidebar from "~/features/seller-dashboard/components/SellerDashboardSidebar";

export const meta: MetaFunction = () => {
    return [
        {
            title: "Tradenal: Configura tu tienda"
        }
    ]
}

export default function Page() {
    return (
        <SidebarProvider>
            <SellerDashboardSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}