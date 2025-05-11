import ListingCard from "~/components/listing-card";
import styles from "./styles.module.scss";
import { useFetchListings } from "~/features/marketplace/api";

type ListingsProps = {
    id: number;
}

export default function Listings({ id }: ListingsProps) {
    const { data, isLoading } = useFetchListings();

    return (
        <div className={styles.listingsContainer}>
            <h1 className={styles.title}>Mis publicaciones</h1>
            <div className={styles.listings}>
                {!isLoading && (
                    data?.data?.listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            id={listing.id}
                            title={listing.title}
                            price={listing.price}
                            images_urls={listing.images_urls}
                            creator={listing.creator}
                        />
                    ))
                )}
            </div>
        </div>
    )

}