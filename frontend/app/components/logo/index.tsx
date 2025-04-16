import { Link } from "@remix-run/react";
import styles from "./Logo.module.scss";

export default function Logo({width}: {width: number}) {
    return (
        <div className={styles.logoContainer}>
            <Link to="/" style={{fontSize: width}} className={styles.logo}>
                Marketplace
            </Link>
        </div>
    )
}