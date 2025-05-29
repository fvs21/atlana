import styles from "./NavbarSmall.module.scss";
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
                </div>
            </div>
        </nav>
    )
}