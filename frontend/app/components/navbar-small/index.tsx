import styles from "./NavbarSmall.module.scss";
import { Menu } from "lucide-react";
import NavbarActions from "../navbar-actions";
import Logo from "../logo";

export default function NavbarSmall() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo width={90} />
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