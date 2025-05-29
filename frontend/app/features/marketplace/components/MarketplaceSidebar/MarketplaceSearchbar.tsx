import { Search } from "lucide-react";
import styles from "./styles.module.scss";
import { useSearchParams } from "@remix-run/react";

export default function MarkeplaceSearchbar() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") || "";

    return (
        <form className={styles.searchBarContainer} action="/marketplace/search" method="get">
            <Search className={styles.searchIcon} size={15} />
            <input
                name="query"
                type="text"
                className={styles.searchBar}
                placeholder="Buscar..."
                defaultValue={query}
                autoFocus={false}
            />
        </form>
    )
}