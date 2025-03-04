import { Link, useNavigate } from "@remix-run/react";
import styles from "./NavbarSmall.module.scss";
import { useUser } from "~/api/client.auth";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";

export default function NavbarSmall() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Tradenal.com</h1>
                    </Link>
                </div>
                <div className={styles.actions}>
                    {!isLoading && (
                        <>
                            <button className={`${styles.iconButton} ${styles.dissapearingActionButtons}`} aria-label="Cart">
                                <ShoppingCart />
                                {user && <div className={styles.iconText}>Carrito</div>}
                            </button>
                            {user ? (
                                <>
                                    <button className={`${styles.iconButton}`} onClick={() => navigate("/dashboard")}>
                                        <User />
                                        <div className={styles.iconText}>Mi cuenta</div>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className={styles.loginButton}>
                                        Inicia sesión
                                    </Link>
                                    <Button onClick={() => navigate("/register")} className={`${styles.registerButton} ${styles.dissapearingActionButtons}`}>
                                        Registrate
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                    <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                        <Menu />
                    </button>
                </div>
            </div>
        </nav>
    )
}