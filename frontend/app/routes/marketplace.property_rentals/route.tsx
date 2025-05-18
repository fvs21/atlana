import styles from "./styles.module.scss";
import PropertiesMap from "~/features/marketplace/components/PropertiesMap/index.client";
import { ClientOnly } from "remix-utils/client-only";
import { useFilterListingsInsideBounds } from "~/features/marketplace/api";
import { PropertyListingsDisplay } from "~/features/marketplace/components/ListingsDisplay";
import { PropertyMapBounds } from "~/features/marketplace/types";
import { useState } from "react";

export default function Page() {
    const [bounds, setBounds] = useState<PropertyMapBounds>({
        northeast: {
            lat: 21.24554236107254,
            lng: -89.43626403808595
        },
        southwest: {
            lat: 20.975224870396257,
            lng: -89.78679656982422
        }
    });

    const { data, isLoading } = useFilterListingsInsideBounds(bounds);

    return (
        <div className={styles.container}>
            <div className={styles.mapContainer}>
                <ClientOnly>
                    {() => <PropertiesMap
                        setBounds={setBounds}
                        listings={data?.listings || []}
                        isLoading={isLoading}
                    />}
                </ClientOnly>
            </div>
            <div className={styles.listingsContainer}>
                <PropertyListingsDisplay
                    listings={data?.listings || []}
                />
            </div>
        </div>
    )
}