import { Link } from "@remix-run/react"
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>Acerca de nosotros</h4>
          <p>
            Unete a nuestro marketplace para buscar y vender productos de segunda mano en tu comunidad universitaria.
          </p>
        </div>

        <div className={styles.section}>
          <h4>Links</h4>
          <Link to="/about">Acerca</Link>
          <Link to="/contact">Contacto</Link>
          <Link to="/shipping">Envíos</Link>
          <Link to="/returns">Devoluciones</Link>
        </div>

        <div className={styles.section}>
          <h4>Servicio al cliente</h4>
          <Link to="/faq">Preguntas frecuentes</Link>
          <Link to="/size-guide">Size Guide</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/support">Soporte</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Marketplace.</p>
      </div>
    </footer>
  )
}

