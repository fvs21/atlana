import { Link } from "@remix-run/react"
import { ShoppingCart, Menu } from "lucide-react"
import styles from "./navbar.module.scss"
import Searchbar from "~/features/searchbar/components/searchbar"
import { Button } from "../ui/button"
import { useNavigate } from "@remix-run/react"
import NavbarFilters from "../navbar-filters"

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>poopy.com</h1>
                    </Link>
                </div>
                <div className={styles.menu}>
                    <Searchbar />
                </div>
                <div className={styles.actions}>
                    <button className={`${styles.iconButton} ${styles.dissapearingActionButtons}`} aria-label="Cart">
                        <ShoppingCart />
                    </button>
                    <Link to="/login" className={styles.loginButton}>
                        Inicia sesión
                    </Link>
                    <Button onClick={() => navigate("/register")} className={`${styles.registerButton} ${styles.dissapearingActionButtons}`}>
                        Registrate
                    </Button>
                    <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                        <Menu />
                    </button>
                </div>
            </div>
            <NavbarFilters />
        </nav>
    )
}

