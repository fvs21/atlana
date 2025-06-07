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
import LabeledSelect from "~/components/labeled-select";
import { MAJORS_LIST } from "~/constants/majors";
import LoadingScreen from "~/components/loading-screen";

export default function Page() {
    const { user, isLoading } = useUser();

    const { editProfile, isPending, editProfileDisabled } = useEditProfile();

    if (isLoading) {
        return <LoadingScreen />;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data: UserInformation = {
            bio: formData.get("bio") as string,
            major: (formData.get("major") as string) == "unassign" ? "" : formData.get("major") as string,
            semester: Number(formData.get("semester")),
            instagram: formData.get("instagram") as string,
        };                

        if (Object.keys(data).every(key => {
            if(!user?.information)
                return false;

            if (!(key in user?.information))
                return false;

            return user?.information[key as keyof UserInformation] === data[key as keyof UserInformation];
        })) {
            return;
        }
        
        try {
            await editProfile(data);
            toast.success("Perfil actualizado");
        } catch(error) {

        }
    }
    
    return (
        <main className="h-full overflow-y-auto">
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
                <LabeledSelect
                    label="Carrera"
                    name="major"
                    className={styles.profileInput}
                    placeholder="Agrega tu carrera"
                    defaultValue={user?.information?.major || ""}
                    options={MAJORS_LIST}
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
                    <Button 
                        isFetching={isPending} 
                        className={cn("primaryButton", styles.submitButton)} 
                        type="submit" 
                        disabled={editProfileDisabled}
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </main>
    )
}