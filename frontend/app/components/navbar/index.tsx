import { Link } from "@remix-run/react";
import { Menu } from "lucide-react";
import styles from "./navbar.module.scss";
import Searchbar from "~/features/searchbar/components/searchbar";
import NavbarFilters from "../navbar-filters";
import NavbarActions from "../navbar-actions";
import Logo from "../logo";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo width={90} />
                </div>
                <div className={styles.menu}>
                    <Searchbar />
                </div>
                <div>
                    <NavbarActions />
                    <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                        <Menu />
                    </button>
                </div>
            </div>
            <NavbarFilters />
        </nav>
    )
}

