import { Label } from "~/components/ui/label";
import styles from "../settings/styles.module.scss";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import DeleteAccountModal from "~/features/settings/components/DeleteAccountModal";
import { cn } from "~/lib/utils";
import { ChevronRight } from "lucide-react";
import ChangePasswordModal from "~/features/settings/components/ChangePasswordModal";

export default function Page() {
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);

    return (
        <>
            <main className="h-full overflow-y-auto">
                <div className={styles.editProfileContainer}>
                    <h1 className={styles.title}>
                        Seguridad de tu perfil
                    </h1>
                    <div className={styles.securityContent}>
                        <div className={styles.sectionContainer}>
                            <Button 
                                className={styles.changePasswordBtn}
                                size="default2" 
                                onClick={() => setChangePasswordModal(true)}
                            >
                                Cambiar contraseña
                                <ChevronRight />
                            </Button>
                        </div>
                        <hr className="my-8"/>
                        <div className={cn(styles.deleteAccountContainer, styles.sectionContainer)}>
                            <Label className={styles.label}>
                                Eliminar cuenta
                            </Label>
                            <span>Haz click aqui para eliminar tu cuenta</span>
                            <Button className={styles.deleteAccountBtn} variant="secondary" size="default2" onClick={() => setDeleteAccountModal(true)}>
                                Eliminar cuenta
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <DeleteAccountModal open={deleteAccountModal} close={() => setDeleteAccountModal(false)} />
            <ChangePasswordModal open={changePasswordModal} close={() => setChangePasswordModal(false)} />
        </>

    )
}