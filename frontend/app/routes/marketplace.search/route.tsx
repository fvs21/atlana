import { MetaFunction, useSearchParams } from "@remix-run/react";
import LoadingScreen from "~/components/loading-screen";
import { useSearchListings } from "~/features/marketplace/api";
import ListingsDisplay from "~/features/marketplace/components/ListingsDisplay";
import styles from "./styles.module.scss";

export const meta: MetaFunction = (args) => {
    return [{ title: "Atlana: Resultados de búsqueda" }];
}

export default function Page() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

    const { data, isLoading } = useSearchListings(query);

    if (isLoading) {
        return <LoadingScreen />
    }
    
    return (
        <main>
            <div className={styles.searchResultsHeader}>
                <h1 className={styles.title}>Resultados de búsqueda para: <span>{query}</span></h1>
            </div>
            <ListingsDisplay listings={data?.data?.listings || []} />
        </main>
    )
}