import styles from "./styles.module.scss";

export default function Header({ pfp_url, name }: { pfp_url?: string; name?: string }) {
    return (
        <div className={styles.header}>
            <div className={styles.pfp}>
                <img src={pfp_url} alt="Profile" />
            </div>
            <div className={styles.fullNameContainer}>
                <h1 className={styles.fullName}>{name}</h1>
            </div>
        </div>
    );
}