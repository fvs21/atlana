import { Link } from "@remix-run/react"
import { ShoppingCart, Search, Menu } from "lucide-react"
import styles from "./navbar.module.scss"

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
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/about">About</Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <Search />
          </button>
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

