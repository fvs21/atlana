import ListingCard from "~/components/listing-card";
import styles from "./styles.module.scss";
import { useFetchListings } from "~/features/marketplace/api";
import { useFetchUserListings } from "../../api";

type ListingsProps = {
    user_id: number;
}

export default function Listings({ user_id }: ListingsProps) {
    const { data, isLoading } = useFetchUserListings(user_id);

    return (
        <div className={styles.listingsContainer}>
            <h1 className={styles.title}>Listados</h1>
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