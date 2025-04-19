import { MetaFunction } from "@remix-run/node";
import ListingCard from "~/components/listing-card";
import NavbarSmall from "~/components/navbar-small";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useFetchListings } from "~/features/marketplace/api";
import MarketplaceSidebar from "~/features/marketplace/components/MarketplaceSidebar";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => {
    return [
        { title: "Marketplace: Compra y venta de segunda mano" },
    ];
}

export default function Page() {
    const { data, isLoading } = useFetchListings();

    console.log(data?.data);
    
    return (
        <>
            <NavbarSmall />
            <SidebarProvider>
                <main className={styles.marketplaceContainer}>
                    <MarketplaceSidebar />
                    <div className={styles.listingsContainer}>
                        {data?.data?.listings.map((listing) => (
                            <ListingCard
                                key={listing.id}
                                id={listing.id}
                                title={listing.title}
                                price={listing.price}
                                images_urls={listing.images_urls}
                                creator={listing.creator}
                            />
                        ))}
                    </div>
                </main>
            </SidebarProvider>
        </>
    )
}