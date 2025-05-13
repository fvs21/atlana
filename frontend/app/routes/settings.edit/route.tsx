import ProfilePictureInput from "~/features/settings/components/ProfilePictureInput";
import styles from "./styles.module.scss";
import TextArea from "~/components/text-area";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Page() {
    return (
        <main>
            <form className={styles.editProfileContainer}>
                <h1 className={styles.title}>
                    Editar perfil
                </h1>
                <ProfilePictureInput />
                <TextArea
                    label="Bio"
                    name="bio"
                    className={styles.profileInput}
                />
                <ValidatedInput
                    label="Carrera"
                    name="major"
                    type="text"
                    className={styles.profileInput}
                    placeholder="Agrega tu carrera"
                />
                <ValidatedInput
                    label="Semestre"
                    name="semester"
                    type="number"
                    className={styles.profileInput}
                    placeholder="Agrega tu semestre"
                />
                <ValidatedInput
                    label="Instagram"
                    name="instagram"
                    type="text"
                    className={styles.profileInput}
                    placeholder="Agrega tu usuario de Instagram"
                />
                <div className={styles.submitButtonContainer}>
                    <Button className={cn("primaryButton", styles.submitButton)}>
                        Guardar
                    </Button>
                </div>
            </form>
        </main>
    )
}