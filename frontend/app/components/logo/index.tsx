import styles from "./Logo.module.scss";

export default function Logo({width}: {width: number}) {
    return (
        <div className={styles.logoContainer}>
            <div style={{fontSize: width}} className={styles.logo}>
                Tradenal
            </div>
        </div>
    )
}