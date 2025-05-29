import LoadingScreen from "~/components/loading-screen";
import { useFetchListings } from "~/features/marketplace/api";
import ListingsDisplay from "~/features/marketplace/components/ListingsDisplay";

export default function Page() {
    const { data, isLoading } = useFetchListings();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <ListingsDisplay
            listings={data?.data?.listings || []}
        />
    )
}