import { SearchIcon } from "lucide-react";
import styles from "./styles.module.scss";

export default function Searchbar() {
    return (
        <div className={styles.searchbar}>
            <SearchIcon color="gray"/>
            <input className={styles.searchbarInput} placeholder="Busca a un profesor..."/>
        </div>
    )
}