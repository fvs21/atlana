import { Logs, Trophy } from "lucide-react";
import styles from "./navbar-filters.module.scss";

export default function NavbarFilters() {
    return (
        <div className={styles.container}>
            <button className={styles.filter}>
                <Logs size={20}/>
                Categorias
            </button>
            <button className={styles.filter}>
                <Trophy size={18}/>
                Más vendidos
            </button>
        </div>
    )
}