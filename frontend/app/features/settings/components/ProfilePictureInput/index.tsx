import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export default function ProfilePictureInput() {
    const { user, isLoading } = useUser();

    return (
        <div className={styles.profilePictureInput}>
            <div className={styles.profilePictureContainer}>
                {!isLoading ? (
                    <img
                        src={user?.profile_picture_url}
                        alt="Profile Picture"
                        className={styles.profilePicture}
                    />
                ) : (
                    <Skeleton className={styles.profilePicture} />
                )}
                <div className={styles.name}>
                    {!isLoading && (
                        `${user?.full_name}`
                    )}
                </div>
            </div>
            <Button className={styles.changePictureButton}>
                Cambiar foto
            </Button>
        </div>
    )
}