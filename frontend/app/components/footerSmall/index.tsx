import styles from "./footerSmall.module.scss"
import { Link } from "@remix-run/react"

export default function FooterSmall() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} Poopy. All rights reserved.</p>
                <div className={styles.footerLinks}>
                    <Link to="/terms">Terms</Link>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </footer>
    )
}