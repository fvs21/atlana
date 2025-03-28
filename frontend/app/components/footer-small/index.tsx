import styles from "./footerSmall.module.scss"
import { Link } from "@remix-run/react"

export default function FooterSmall() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} Tradenal.</p>
                <div className={styles.footerLinks}>
                    <Link to="/terms">Términos</Link>
                    <Link to="/privacy">Privacidad</Link>
                    <Link to="/contact">Contacto</Link>
                </div>
            </div>
        </footer>
    )
}