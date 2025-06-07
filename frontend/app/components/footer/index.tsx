import { Link } from "@remix-run/react"
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>Acerca de nosotros</h4>
          <p>
            Unete a nuestro marketplace para buscar y vender artículos en tu comunidad universitaria.
          </p>
        </div>
        <div className={styles.section}>
          <h4>Links</h4>
          <Link to="/contact">Contacto</Link>
          <Link to="/terms">Términos y condiciones</Link>
          <Link to="/privacy">Política de privacidad</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Atlana.</p>
      </div>
    </footer>
  )
}

