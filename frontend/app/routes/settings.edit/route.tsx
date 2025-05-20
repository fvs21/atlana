import ProfilePictureInput from "~/features/settings/components/ProfilePictureInput";
import styles from "./styles.module.scss";
import TextArea from "~/components/text-area";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useUser } from "~/api/client.auth";
import { useEditProfile } from "~/features/settings/api";
import { UserInformation } from "~/types/globals";
import { toast } from "sonner";

export default function Page() {
    const { user } = useUser();

    const { editProfile, isPending, editProfileDisabled } = useEditProfile();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data: UserInformation = {
            bio: formData.get("bio") as string,
            major: formData.get("major") as string,
            semester: Number(formData.get("semester")),
            instagram: formData.get("instagram") as string,
        };

        if (Object.keys(data).every(key => user?.information[key as keyof UserInformation] === data[key as keyof UserInformation])) {
            return;
        }
        
        try {
            await editProfile(data);
            toast.success("Perfil actualizado");
        } catch(error) {

        }
    }
    
    return (
        <main className="overflow-y-auto">
            <form className={styles.editProfileContainer} onSubmit={handleSubmit}>
                <h1 className={styles.title}>
                    Editar perfil
                </h1>
                <ProfilePictureInput />
                <TextArea
                    label="Bio"
                    name="bio"
                    className={styles.profileInput}
                    defaultValue={user?.information?.bio || ""}
                />
                <ValidatedInput
                    label="Carrera"
                    name="major"
                    type="text"
                    className={styles.profileInput}
                    placeholder="Agrega tu carrera"
                    defaultValue={user?.information?.major || ""}
                />
                <ValidatedInput
                    label="Semestre"
                    name="semester"
                    type="number"
                    className={styles.profileInput}
                    placeholder="Agrega tu semestre"
                    defaultValue={user?.information?.semester || ""}
                />
                <ValidatedInput
                    label="Instagram"
                    name="instagram"
                    type="text"
                    className={styles.profileInput}
                    placeholder="Agrega tu usuario de Instagram"
                    defaultValue={user?.information?.instagram || ""}
                />
                <div className={styles.submitButtonContainer}>
                    <Button className={cn("primaryButton", styles.submitButton)} type="submit" disabled={editProfileDisabled}>
                        Guardar
                    </Button>
                </div>
            </form>
        </main>
    )
}