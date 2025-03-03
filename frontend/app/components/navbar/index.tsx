import { Link } from "@remix-run/react"
import { ShoppingCart, Menu, User } from "lucide-react"
import styles from "./navbar.module.scss"
import Searchbar from "~/features/searchbar/components/searchbar"
import { Button } from "../ui/button"
import { useNavigate } from "@remix-run/react"
import NavbarFilters from "../navbar-filters"
import { useUser } from "~/api/client.auth"

export default function Navbar() {
    const navigate = useNavigate();

    const { user, isLoading } = useUser();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Tradenal.com</h1>
                    </Link>
                </div>
                <div className={styles.menu}>
                    <Searchbar />
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
            <NavbarFilters />
        </nav>
    )
}

