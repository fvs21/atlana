import { MetaFunction } from "@remix-run/node";
import ListingCard from "~/components/listing-card";
import Navbar from "~/components/navbar";
import { useFetchListings } from "~/features/marketplace/api";

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
            <Navbar />
            <main style={{marginTop: "111px"}}>
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
            </main>
        </>
    )
}