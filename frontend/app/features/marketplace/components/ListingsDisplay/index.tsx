import styles from "./styles.module.scss";
import ListingCard from "~/components/listing-card";
import { ListingCard as ListingCardType, PropertyListingCard } from "~/types/listings";

export default function ListingsDisplay({ listings }: { listings: ListingCardType[] }) {
    return (
        <div className={styles.listingsContainer}>
            {listings.map((listing) => (
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
    )
}

export function PropertyListingsDisplay({ listings }: { listings: PropertyListingCard[] }) {
    if (!listings[0])
        return <></>;
    
    return (
        <div className={styles.propertyListingsContainer}>
            {listings.map((listing) => (
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
    )
}