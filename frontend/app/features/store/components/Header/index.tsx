import styles from "./Header.module.scss"

type HeaderProps = {
  companyName: string
}

export default function Header({ companyName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.companyName}>
          {companyName}
        </h1>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📞</span>
            <span>(555) 123-4567</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>✉️</span>
            <span>info@precisionmfg.com</span>
          </div>
        </div>
      </div>
    </header>
  )
}

