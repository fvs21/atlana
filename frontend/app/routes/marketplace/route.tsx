import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import ListingCard from "~/components/listing-card";
import NavbarSmall from "~/components/navbar-small";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useFetchListings } from "~/features/marketplace/api";
import MarketplaceSidebar from "~/features/marketplace/components/MarketplaceSidebar";
import styles from "./styles.module.scss";
import { onlyAuthenticated } from "~/api/server.auth";

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
    const { data, isLoading } = useFetchListings();
    
    return (
        <div className={styles.container}>
            <NavbarSmall />
            <SidebarProvider style={{
                '--sidebar-width': "350px",
            } as React.CSSProperties}>
                <main className={styles.marketplaceContainer}>
                    <MarketplaceSidebar />
                    <div className={styles.listingsContainer}>
                        {data?.data?.listings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                id={listing.id}
                                title={listing.title}
                                description={listing.description}
                                price={listing.price}
                                images_urls={listing.images_urls}
                                creator={listing.creator}
                            />
                        ))}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}