import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useUser } from "~/api/client.auth";
import { SidebarProvider } from "~/components/ui/sidebar";
import NoStoreCreated from "~/features/seller-dashboard/components/NoStoreCreated";
import SellerDashboardSidebar from "~/features/seller-dashboard/components/SellerDashboardSidebar";

export const meta: MetaFunction = () => {
    return [
        {
            title: "Tradenal: Configura tu tienda"
        }
    ]
}

export default function Page() {
    const { user, isLoading } = useUser();

    return (
        <SidebarProvider>
            <SellerDashboardSidebar />
            <main className="w-full">
                {!isLoading && (
                    !user?.has_store_created ? (
                        <NoStoreCreated />
                    ) : (
                        <Outlet />
                    )
                )}
            </main>
        </SidebarProvider>
    )
}