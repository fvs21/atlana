import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { toast } from "sonner";
import { SidebarProvider } from "~/components/ui/sidebar";
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
                <Outlet />
            </main>
        </SidebarProvider>
    )
}