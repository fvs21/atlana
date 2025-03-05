import { Link, useLoaderData, useLocation, useMatches, useParams } from "@remix-run/react";
import styles from "./MenuBar.module.scss";

export default function Menubar() {
  const location = useLocation();

  const params = useParams();
  const id = params.id;

  const isActive = (path: string) => {
    return location.pathname === path ? styles.active : ""
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navLinks}>
          <li className={`${styles.navItem} ${isActive("/store/" + id)}`}>
            <Link to={"/store/" + id}>Principal</Link>
          </li>
          <li className={`${styles.navItem} ${isActive(`/store/${id}/products`)}`}>
            <Link to={`/store/${id}/products`}>Productos</Link>
          </li>
          <li className={`${styles.navItem} ${isActive(`/store/${id}/profile`)}`}>
            <Link to={`/store/${id}/profile`}>Perfil de la empresa</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

