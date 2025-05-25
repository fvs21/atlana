import { Link } from "@remix-run/react";
import styles from "./Logo.module.scss";

export default function Logo({ width }: { width: number }) {
    return (
        <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Logo" width={width} height={width} />
        </Link>
    )
}