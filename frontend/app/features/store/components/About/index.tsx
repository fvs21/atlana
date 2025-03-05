import styles from "./About.module.scss";

export default function About() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutContent}>
                    <h2>Acerca de Precision Manufacturing Co.</h2>
                    <p>
                        For over 25 years, Precision Manufacturing Co. has been at the forefront of industrial manufacturing
                        excellence. We specialize in creating high-quality, precision-engineered components and systems for a wide
                        range of industries.
                    </p>
                    <p>
                        Our state-of-the-art facilities and expert team of engineers and technicians ensure that every product we
                        deliver meets the highest standards of quality and performance. We pride ourselves on innovation,
                        reliability, and exceptional customer service.
                    </p>
                    <div className={styles.aboutStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>25+</span>
                            <span className={styles.statLabel}>Years of Experience</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>1000+</span>
                            <span className={styles.statLabel}>Clients Worldwide</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Countries Served</span>
                        </div>
                    </div>
                </div>
                <div className={styles.aboutImage}>
                    <img src="/placeholder.svg?height=400&width=600" alt="Manufacturing facility" />
                </div>
            </div>
        </section>
    )
}

