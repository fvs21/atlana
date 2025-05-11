import styles from "./styles.module.scss";

export default function Header({ pfp_url, name, bio, edit }: { pfp_url: string; name: string, bio?: string, edit: boolean }) {
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.pfp}>
                    <img src={pfp_url} alt="Profile" />
                </div>
                <div>
                    <div className={styles.fullNameContainer}>
                        <h1 className={styles.fullName}>{name}</h1>
                        {edit ? (
                            <button className={styles.actionButton}>Editar perfil</button>
                        ) : (
                            <button className={styles.actionButton}>Enviar mensaje</button>
                        )}
                    </div>
                    <div className={styles.bio}>
                        Estudiante de ingeniería en Yapington University. Amante de la cerveza y la música. Buscando un lugar donde pueda aprender y crecer como profesional.
                    </div>
                </div>
            </div>
        </div>
    );
}