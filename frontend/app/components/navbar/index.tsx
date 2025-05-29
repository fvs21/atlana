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
                </div>
            </div>
            <NavbarFilters />
        </nav>
    )
}

