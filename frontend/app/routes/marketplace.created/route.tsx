import { MetaFunction } from "@remix-run/react"
import { Loader } from "lucide-react";
import LoadingScreen from "~/components/loading-screen";
import { useCreatedListings } from "~/features/marketplace/api"
import ListingsDisplay from "~/features/marketplace/components/ListingsDisplay";

export const meta: MetaFunction = () => [
    { title: "Atlana: Tus listados" }
]

export default function Page() {
    const { data, isLoading } = useCreatedListings();

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <ListingsDisplay
            listings={data?.data?.listings || []}
        />
    )
}