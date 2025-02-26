import { Search } from "lucide-react";
import styles from "./searchbar.module.scss";

export default function Searchbar() {
    return (
        <div className={styles.searchbarContainer}>
            <input className={styles.searchbar} placeholder="Busca productos"/>
            <div className={styles.searchIcon}>
                <Search color="white" />
            </div>
        </div>
    )
}