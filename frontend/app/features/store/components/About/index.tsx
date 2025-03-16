import { useMatches } from "@remix-run/react";
import styles from "./About.module.scss";
import { Store } from "~/types/globals";

export default function About() {
    const matches = useMatches();
    const data = matches.find(match => match.id === "routes/store.$id")?.data as Store;

    return (
        <section className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutContent}>
                    <h2>
                        Acerca de {data.name}
                    </h2>
                    <p className="whitespace-pre-line">
                        {data.about}
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
                    {/**<img src="/placeholder.svg?height=400&width=600" alt="Manufacturing facility" /> */}
                </div>
            </div>
        </section>
    )
}

