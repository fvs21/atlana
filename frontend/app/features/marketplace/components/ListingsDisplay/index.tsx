import styles from "./styles.module.scss";
import ListingCard from "~/components/listing-card";
import { ListingCard as ListingCardType } from "~/types/listings";

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

export function PropertyListingsDisplay({ listings }: { listings: ListingCardType[] }) {
    if (!listings[0])
        return <></>;

    const test = (() => {
        let l = [];

        for(let i = 0; i < 50; i++) {
            l.push(listings[0]);
        };

        return l;
    })();
    
    return (
        <div className={styles.propertyListingsContainer}>
            {test.map((listing) => (
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