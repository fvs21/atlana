import { Link } from "@remix-run/react"
import { ShoppingCart, Menu } from "lucide-react"
import styles from "./navbar.module.scss"
import Searchbar from "~/features/searchbar/components/searchbar"

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>tradenal.com</h1>
          </Link>
        </div>
        <div className={styles.menu}>
          <Searchbar />
        </div>
        <div className={styles.actions}>
            <button className={styles.iconButton} aria-label="Cart">
                <ShoppingCart />
            </button>
            <button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label="Menu">
                <Menu />
            </button>
        </div>
      </div>
    </nav>
  )
}

