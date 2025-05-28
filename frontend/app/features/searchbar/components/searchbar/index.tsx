import { Search } from "lucide-react";
import styles from "./searchbar.module.scss";

export default function Searchbar() {
    return (
        <form className={styles.searchbarContainer} action="/marketplace/search" method="get">
            <input 
                className={styles.searchbar} 
                placeholder="Busca productos"
                name="query"
            />
            <div className={styles.searchIcon}>
                <Search color="white" size={20}/>
            </div>
        </form>
    )
}