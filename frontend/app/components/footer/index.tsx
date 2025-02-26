import { Link } from "@remix-run/react"
import styles from "./footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>About Us</h4>
          <p>
            Discover the latest fashion trends with ShopStyle. We bring you carefully curated collections from the best
            brands.
          </p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns">Returns</Link>
        </div>

        <div className={styles.section}>
          <h4>Customer Service</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/size-guide">Size Guide</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/support">Support</Link>
        </div>

        <div className={styles.section}>
          <h4>Newsletter</h4>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button className={`${styles.button} ${styles.buttonPrimary}`}>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} ShopStyle. All rights reserved.</p>
      </div>
    </footer>
  )
}

