import { useFetchListings } from "~/features/marketplace/api";
import ListingsDisplay from "~/features/marketplace/components/ListingsDisplay";

export default function Page() {
    const { data, isLoading } = useFetchListings();

    return (
        <ListingsDisplay
            listings={data?.data?.listings || []}
        />
    )
}