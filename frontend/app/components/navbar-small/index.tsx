import { Link, useNavigate } from "@remix-run/react";
import styles from "./NavbarSmall.module.scss";
import { Menu } from "lucide-react";
import NavbarActions from "../navbar-actions";

export default function NavbarSmall() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Marketplace</h1>
                    </Link>
                </div>
                <div className={styles.actions}>
                    <NavbarActions />
                    <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    )
}