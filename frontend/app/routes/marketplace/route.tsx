import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import NavbarSmall from "~/components/navbar-small";
import { SidebarProvider, useSidebar } from "~/components/ui/sidebar";
import MarketplaceSidebar from "~/features/marketplace/components/MarketplaceSidebar";
import styles from "./styles.module.scss";
import { onlyAuthenticated } from "~/api/server.auth";
import { Link, Outlet } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import MarkeplaceSearchbar from "~/features/marketplace/components/MarketplaceSidebar/MarketplaceSearchbar";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });

    return null;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Marketplace: Compra y venta de segunda mano" },
    ];
}

export default function Page() {
    return (
        <div className={styles.container}>
            <NavbarSmall />
            <SidebarProvider style={{
                '--sidebar-width': "350px",
            } as React.CSSProperties}>
                <main className={styles.marketplaceContainer}>
                    <MarketplaceSidebar />
                    <div className="h-full">
                        <ClosedSidebarSection />
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}

function ClosedSidebarSection() {
    const sidebar = useSidebar();

    const openSidebar = () => {
        if (sidebar.isMobile) {
            sidebar.setOpenMobile(!sidebar.openMobile);
        } else {
            sidebar.setOpen(!sidebar.open);
        }
    }

    if (!sidebar.open || sidebar.isMobile) {
        return (
            <div className={styles.closedSidebarSection}>
                <div className={styles.closedSidebarSectionHeader}>
                    <MarkeplaceSearchbar />
                </div>
                <div className={styles.closedSidebarSectionBody}>
                    <Button onClick={openSidebar} className={styles.closedSidebarSectionButton}>
                        Categorías
                    </Button>
                    <Link to={"/create-listing"}>
                        <Button className={styles.closedSidebarSectionButton}>
                            Vender
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return <></>;
}