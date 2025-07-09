import styles from "./NavbarSmall.module.scss";
import NavbarActions from "../navbar-actions";
import Logo from "../logo";
import NavbarLinks from "../navbar-links";
import { useUser } from "~/api/client.auth";

export default function NavbarSmall() {
    const { user, isLoading } = useUser();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Logo width={90} />
                </div>
                {!isLoading && user && (
                    <div className={styles.navbarLinks}>
                        <NavbarLinks />
                    </div>
                )}
                <div className={styles.actions}>
                    <NavbarActions />
                </div>
            </div>
        </nav>
    )
}