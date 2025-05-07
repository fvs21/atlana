import styles from "./styles.module.scss";

export default function Header({ pfp_url, name, edit }: { pfp_url?: string; name?: string, edit: boolean }) {
    return (
        <div className={styles.header}>
            <div className={styles.pfp}>
                <img src={pfp_url} alt="Profile" />
            </div>
            <div>
                <div className={styles.fullNameContainer}>
                    <h1 className={styles.fullName}>{name}</h1>
                    {edit ? (
                        <button className={styles.actionButton}>Editar perfil</button>
                    ) : (
                        <button>Mensaje</button>
                    )}
                </div>
                <div className={styles.bio}>
                    mfdksla
                </div>
            </div>
        </div>
    );
}