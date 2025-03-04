import { Link, useLocation } from "@remix-run/react"
import styles from "./MenuBar.module.scss"

export default function Menubar() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : ""
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navLinks}>
          <li className={`${styles.navItem} ${isActive("/")}`}>
            <Link to="/">Principal</Link>
          </li>
          <li className={`${styles.navItem} ${isActive("/products")}`}>
            <Link to="/products">Productos</Link>
          </li>
          <li className={`${styles.navItem} ${isActive("/profile")}`}>
            <Link to="/profile">Perfil</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

