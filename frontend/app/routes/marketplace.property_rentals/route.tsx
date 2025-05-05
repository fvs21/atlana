import styles from "./styles.module.scss";
import PropertiesMap from "~/features/marketplace/components/PropertiesMap/index.client";
import { ClientOnly } from "remix-utils/client-only";
import { useFetchListingsByCategory } from "~/features/marketplace/api";
import { PropertyListingsDisplay } from "~/features/marketplace/components/ListingsDisplay";

export default function Page() {
    const { data, isLoading } = useFetchListingsByCategory("property_rentals");
    
    return (
        <div className={styles.container}>
            <div className={styles.mapContainer}>
                <ClientOnly>
                    {() => <PropertiesMap />}
                </ClientOnly>
            </div>
            <div className={styles.listingsContainer}>
                <PropertyListingsDisplay listings={data?.data?.listings || []} />
            </div>
        </div>
    )
}