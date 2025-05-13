import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import { Link } from "@remix-run/react";

export default function Header({ user_id, pfp_url, name, bio }: { user_id: number, pfp_url: string; name: string, bio?: string }) {
    const { user, isLoading } = useUser();
    
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.pfp}>
                    <img src={pfp_url} alt="Profile" />
                </div>
                <div>
                    <div className={styles.fullNameContainer}>
                        <h1 className={styles.fullName}>{name}</h1>
                        {!isLoading && (
                            user_id == user?.id && (
                                <Link to={"/settings"}>
                                    <button className={styles.actionButton}>
                                        Editar perfil
                                    </button>
                                </Link>
                            )
                        )}
                    </div>
                    <div className={styles.bio}>
                        {bio}
                    </div>

                </div>
            </div>
        </div>
    );
}