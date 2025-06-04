import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { useDeleteProfilePicture, useUpdateProfilePicture } from "../../api";
import { ChevronLeft, Loader } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePictureInput() {
    const { user, isLoading } = useUser();
    const [updatePfpModal, setUpdatePfpModal] = useState(false);

    const { updatePfp, isPending, updatePfpDisabled } = useUpdateProfilePicture();
    const { deletePfp, isPending: isDeletePfpPending, deletePfpDisabled } = useDeleteProfilePicture();

    const [image, setImage] = useState<File>();
    const inputRef = useRef<HTMLInputElement>(null);

    const onOpenChange = (open: boolean) => {
        setUpdatePfpModal(open);
        if(image) 
            setImage(undefined);
    }

    const handleUpdatePfp = async () => {
        if (updatePfpDisabled) return;

        try {
            await updatePfp(image as File);
            onOpenChange(false);
            toast.success("Foto de perfil actualizada");
        } catch(error) {

        }
    }

    const handleDeletePfp = async () => {
        if (deletePfpDisabled) return;

        try {
            await deletePfp();
            onOpenChange(false);
            toast.success("Foto de perfil eliminada");
        } catch (error) {
            
        }
    }

    return (
        <>
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
                <Button className={styles.changePictureButton} onClick={() => setUpdatePfpModal(true)}>
                    Cambiar foto
                </Button>
            </div>
            <Dialog open={updatePfpModal} onOpenChange={onOpenChange}>
                {image ? (
                    <DialogContent className={styles.updatePfpModal2}>
                        <div className={styles.updatePfpHeader2}>
                            <button className={styles.returnButton} onClick={() => setImage(undefined)}>
                                <ChevronLeft color="gray" size={20} />
                            </button>
                        </div>
                        <div className={styles.updatePfpPreviewContainer}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Profile Picture"
                                className={styles.updatePfpPreview}
                            />
                        </div>
                        <div className={styles.updatePfpContainer}>
                            <Button 
                                className={cn(styles.updatePfpButton, "primaryButton")} 
                                onClick={handleUpdatePfp}
                            >
                                {isPending ? (
                                    <Loader className="animate-spin" color="black" />
                                ) : (
                                    "Actualizar foto"
                                )}
                            </Button>
                        </div>
                    </DialogContent>
                ) : (
                    <DialogContent className={styles.updatePfpModal}>
                        <DialogHeader className={styles.updatePfpHeader}>
                            <DialogTitle>
                                Cambiar foto de perfil
                            </DialogTitle>
                        </DialogHeader>
                        <div className={styles.updatePfpOptions}>
                            <button
                                className={cn(styles.updatePfpOption, styles.changePfpOption)}
                                onClick={() => inputRef.current?.click()}
                            >
                                Subir foto
                            </button>
                            <button 
                                className={cn(styles.updatePfpOption, styles.removePfpOption)}
                                onClick={handleDeletePfp}
                            >
                                {isDeletePfpPending ? (
                                    <Loader className="animate-spin" color="black" />
                                ) : (
                                    "Eliminar foto de perfil"
                                )}
                            </button>
                            <button 
                                className={cn(styles.updatePfpOption, styles.cancelOption)} 
                                onClick={() => setUpdatePfpModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                        <input
                            ref={inputRef}
                            hidden
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImage(e.target.files[0]);
                                }
                            }}
                        />
                    </DialogContent>
                )}
            </Dialog>
        </>
    )
}