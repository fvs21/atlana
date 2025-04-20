import { Search } from "lucide-react";
import styles from "./styles.module.scss";

export default function MarkeplaceSearchbar() {
    return (
        <form className={styles.searchBarContainer} action="/marketplace" method="get">
            <Search className={styles.searchIcon} size={15} />
            <input
                name="search"
                type="text"
                className={styles.searchBar}
                placeholder="Buscar..."
            />
        </form>
    )
}